/* =========================================================================
   AP Practice - transport
   -------------------------------------------------------------------------
   Everything about getting bytes between browsers lives here, so match.js can
   stay pure and app.js can stay about screens. WebRTC via PeerJS, because the
   game is a static page with no server behind it.

   What this layer is responsible for:

     * room codes, namespaced so they cannot collide with other people's
       projects on the shared PeerJS broker
     * a stable player identity that survives a dropped connection, so a
       reconnecting player resumes their own score instead of joining as a
       stranger
     * a heartbeat, so a browser that was closed or went to sleep is noticed
       in a few seconds rather than holding a round open forever
     * clock offset estimation, so a deadline set on the host means the same
       instant on every client regardless of latency
     * automatic reconnection with backoff
     * a TURN relay fallback, because plain STUN fails on the restrictive
       networks schools tend to have

   Host and client both speak the same envelope. Anything with a `__` field is
   this layer talking to itself; everything else is handed to the app.
   ========================================================================= */

'use strict';

var Net = (function () {

  const LIB_URL = 'https://cdn.jsdelivr.net/npm/peerjs@1.5.4/dist/peerjs.min.js';

  // The public PeerJS broker is one global namespace shared by every project
  // that uses it. Prefixing keeps a four letter room code from colliding with
  // a stranger's peer - the old build asked the broker for "WXYZ" directly.
  const ROOM_PREFIX = 'ap-practice-v3-';

  // No O/0, I/1/L, S/5, B/8, Z/2: codes get read aloud across a classroom.
  const CODE_ALPHABET = 'ACDEFGHJKMNPQRTUVWXY34679';
  const CODE_LENGTH = 5;

  const PING_MS = 1500;
  const DEAD_MS = 6000;
  const SWEEP_MS = 1500;
  const MAX_RECONNECTS = 6;
  const CLOCK_SAMPLES = 8;

  const ICE_SERVERS = [
    { urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302'] },
    // Free public relay. Without a TURN server roughly one network pair in
    // five cannot establish a direct connection at all; port 443 over TCP is
    // the one that survives school and office firewalls. Swap in your own
    // credentials here if you would rather not depend on a public relay.
    { urls: 'turn:openrelay.metered.ca:80', username: 'openrelayproject', credential: 'openrelayproject' },
    { urls: 'turn:openrelay.metered.ca:443', username: 'openrelayproject', credential: 'openrelayproject' },
    { urls: 'turn:openrelay.metered.ca:443?transport=tcp', username: 'openrelayproject', credential: 'openrelayproject' }
  ];

  const ID_KEY = 'ap-practice.client-id';

  let libPromise = null;

  // --- helpers -----------------------------------------------------------

  function load() {
    if (window.Peer) return Promise.resolve();
    if (!libPromise) {
      libPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = LIB_URL;
        script.onload = resolve;
        script.onerror = () => { libPromise = null; reject(new Error('library')); };
        document.head.appendChild(script);
      });
    }
    return libPromise;
  }

  function peerOptions() {
    return { debug: 0, config: { iceServers: ICE_SERVERS } };
  }

  function roomCode() {
    let code = '';
    for (let i = 0; i < CODE_LENGTH; i++) {
      code += CODE_ALPHABET.charAt(Math.floor(Math.random() * CODE_ALPHABET.length));
    }
    return code;
  }

  function normalizeCode(raw) {
    return String(raw || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, CODE_LENGTH);
  }

  /**
   * A per-tab id that outlives a dropped connection. The peer id changes every
   * time PeerJS reconnects, so it cannot be the thing a player's score hangs
   * on; this is what the host keys the roster by.
   *
   * sessionStorage rather than localStorage on purpose. It survives a reload
   * and a network blip, which is what reconnection needs, but it is scoped to
   * one tab - so two tabs of the same browser are two players, which is how
   * anyone tries the feature out before wheeling in a second device.
   */
  function clientId() {
    let id = null;
    try { id = sessionStorage.getItem(ID_KEY); } catch (e) { id = null; }
    if (!id) {
      id = 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
      try { sessionStorage.setItem(ID_KEY, id); } catch (e) { /* private mode: id lives for this page only */ }
    }
    return id;
  }

  function safeId(raw) {
    return String(raw || '').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 40) || ('anon' + Math.random().toString(36).slice(2, 8));
  }

  function safeName(raw) {
    return String(raw == null ? '' : raw).trim().slice(0, 15) || 'Player';
  }

  function describeError(err) {
    const type = err && err.type;
    if (type === 'browser-incompatible') return 'This browser cannot do peer-to-peer connections.';
    if (type === 'network' || type === 'socket-error' || type === 'server-error') {
      return 'Lost contact with the matchmaking server.';
    }
    if (type === 'ssl-unavailable') return 'A secure connection could not be made.';
    if (type === 'unavailable-id') return 'That room code is already taken.';
    if (type === 'webrtc') return 'The connection failed to negotiate.';
    return 'Connection error' + (type ? ' (' + type + ')' : '') + '.';
  }

  const noop = () => {};

  // =======================================================================
  // HOST
  // =======================================================================

  /**
   * handlers: { onReady(code), onJoin(session), onLeave(id), onMessage(id, msg),
   *             onError(message), protocol }
   * A session is { id, name, reconnect }. `id` is the stable client id and is
   * what the match engine keys players by.
   */
  function hostMatch(handlers) {
    handlers = handlers || {};
    const onReady = handlers.onReady || noop;
    const onJoin = handlers.onJoin || noop;
    const onLeave = handlers.onLeave || noop;
    const onMessage = handlers.onMessage || noop;
    const onError = handlers.onError || noop;

    const sessions = new Map();  // stable id -> { id, name, conn, lastSeen }
    const byPeer = new Map();    // peer id   -> stable id
    let peer = null;
    let code = null;
    let closed = false;

    function touch(conn) {
      const id = byPeer.get(conn.peer);
      const session = id && sessions.get(id);
      if (session) session.lastSeen = Date.now();
    }

    function greet(conn, msg) {
      const id = safeId(msg.id);
      const name = safeName(msg.name);

      if (msg.v !== handlers.protocol) {
        try { conn.send({ __: 'refused', reason: 'version' }); } catch (e) { /* gone */ }
        setTimeout(() => { try { conn.close(); } catch (e) { /* gone */ } }, 250);
        return;
      }

      // Same player, new connection: retire the stale one rather than letting
      // two sockets answer for one person.
      const previous = sessions.get(id);
      if (previous && previous.conn && previous.conn !== conn) {
        byPeer.delete(previous.conn.peer);
        try { previous.conn.close(); } catch (e) { /* already gone */ }
      }

      sessions.set(id, { id: id, name: name, conn: conn, lastSeen: Date.now() });
      byPeer.set(conn.peer, id);

      try { conn.send({ __: 'welcome', id: id, v: handlers.protocol }); } catch (e) { /* gone */ }
      onJoin({ id: id, name: name, reconnect: !!previous });
    }

    function dropPeer(peerId) {
      const id = byPeer.get(peerId);
      byPeer.delete(peerId);
      if (!id) return;
      const session = sessions.get(id);
      // If they already came back on a different socket, this is just the old
      // one finishing its teardown and must not report a departure.
      if (!session || (session.conn && session.conn.peer !== peerId)) return;
      session.conn = null;
      onLeave(id);
    }

    function wire(conn) {
      conn.on('data', (msg) => {
        if (!msg || typeof msg !== 'object') return;
        if (msg.__ === 'hello') return greet(conn, msg);
        if (msg.__ === 'ping') {
          touch(conn);
          try { conn.send({ __: 'pong', c0: msg.c0, h: Date.now() }); } catch (e) { /* gone */ }
          return;
        }
        const id = byPeer.get(conn.peer);
        if (!id) return;                       // never said hello
        touch(conn);
        onMessage(id, msg);
      });
      conn.on('close', () => dropPeer(conn.peer));
      conn.on('error', () => dropPeer(conn.peer));
    }

    // A tab that was closed or a laptop that was shut never sends 'close'.
    // Silence is the only reliable signal, so treat it as one.
    const sweeper = setInterval(() => {
      const now = Date.now();
      sessions.forEach((session) => {
        if (!session.conn) return;
        if (now - session.lastSeen <= DEAD_MS) return;
        const stale = session.conn;
        byPeer.delete(stale.peer);
        session.conn = null;
        try { stale.close(); } catch (e) { /* already gone */ }
        onLeave(session.id);
      });
    }, SWEEP_MS);

    function open(attempt) {
      if (closed) return;
      code = roomCode();
      peer = new Peer(ROOM_PREFIX + code, peerOptions());

      peer.on('open', () => { if (!closed) onReady(code); });
      peer.on('connection', wire);

      peer.on('error', (err) => {
        if (closed) return;
        // Another room already holds this code: pick a new one and retry.
        if (err && err.type === 'unavailable-id' && attempt < 5) {
          try { peer.destroy(); } catch (e) { /* already gone */ }
          return open(attempt + 1);
        }
        // A client that gave up mid-dial is not the host's problem.
        if (err && err.type === 'peer-unavailable') return;
        onError(describeError(err));
      });

      // Losing the broker does not kill live data channels, but it does stop
      // new players from joining, so get it back.
      peer.on('disconnected', () => {
        if (closed) return;
        try { peer.reconnect(); } catch (e) { /* will surface as an error */ }
      });
    }

    load().then(() => open(0)).catch(() => {
      onError('Could not load the multiplayer library. Check your connection and try again.');
    });

    return {
      get code() { return code; },
      send: function (id, msg) {
        const session = sessions.get(id);
        if (session && session.conn && session.conn.open) {
          try { session.conn.send(msg); } catch (e) { /* dropped in flight */ }
        }
      },
      broadcast: function (msgFor) {
        // Snapshots are personalized, so the caller gets to build one per id.
        sessions.forEach((session) => {
          if (!session.conn || !session.conn.open) return;
          try { session.conn.send(typeof msgFor === 'function' ? msgFor(session.id) : msgFor); }
          catch (e) { /* dropped in flight */ }
        });
      },
      connected: function (id) {
        const session = sessions.get(id);
        return !!(session && session.conn && session.conn.open);
      },
      now: () => Date.now(),
      close: function () {
        closed = true;
        clearInterval(sweeper);
        sessions.forEach((session) => { try { session.conn && session.conn.close(); } catch (e) { /* gone */ } });
        sessions.clear();
        byPeer.clear();
        try { peer && peer.destroy(); } catch (e) { /* gone */ }
        peer = null;
      }
    };
  }

  // =======================================================================
  // CLIENT
  // =======================================================================

  /**
   * handlers: { name(), protocol, onOpen(welcome), onMessage(msg),
   *             onStatus(status, detail), onFatal(message) }
   * status is one of 'connecting' | 'online' | 'reconnecting'.
   */
  function joinMatch(rawCode, handlers) {
    handlers = handlers || {};
    const onOpen = handlers.onOpen || noop;
    const onMessage = handlers.onMessage || noop;
    const onStatus = handlers.onStatus || noop;
    const onFatal = handlers.onFatal || noop;

    const code = normalizeCode(rawCode);
    const myId = clientId();

    let peer = null;
    let conn = null;
    let closed = false;
    let attempts = 0;
    let greeted = false;

    let offset = 0;
    let samples = [];
    let lastPong = 0;
    let pinger = null;
    let watchdog = null;

    function status(kind, detail) { if (!closed) onStatus(kind, detail); }

    function fatal(message) {
      if (closed) return;
      teardown();
      closed = true;
      onFatal(message);
    }

    function stopTimers() {
      clearInterval(pinger); pinger = null;
      clearInterval(watchdog); watchdog = null;
    }

    function teardown() {
      stopTimers();
      try { conn && conn.close(); } catch (e) { /* gone */ }
      try { peer && peer.destroy(); } catch (e) { /* gone */ }
      conn = null;
      peer = null;
    }

    function startTimers() {
      stopTimers();
      lastPong = Date.now();
      pinger = setInterval(() => {
        if (conn && conn.open) {
          try { conn.send({ __: 'ping', c0: Date.now() }); } catch (e) { /* gone */ }
        }
      }, PING_MS);
      watchdog = setInterval(() => {
        if (!closed && Date.now() - lastPong > DEAD_MS) retry();
      }, 1000);
    }

    /**
     * Clock offset, NTP style. The sample with the smallest round trip is the
     * least distorted one, so that is the estimate we keep rather than an
     * average that a single slow packet can drag around.
     */
    function absorbPong(msg) {
      const now = Date.now();
      const rtt = now - msg.c0;
      samples.push({ rtt: rtt, offset: msg.h + rtt / 2 - now });
      if (samples.length > CLOCK_SAMPLES) samples.shift();
      let best = samples[0];
      samples.forEach((s) => { if (s.rtt < best.rtt) best = s; });
      offset = best.offset;
      lastPong = now;
      status('online', Math.round(best.rtt));
    }

    function onData(msg) {
      if (!msg || typeof msg !== 'object') return;
      if (msg.__ === 'pong') return absorbPong(msg);
      if (msg.__ === 'refused') {
        return fatal(msg.reason === 'version'
          ? 'That room is running a different version of the game. Both players need to reload the page.'
          : 'The host refused the connection.');
      }
      if (msg.__ === 'welcome') {
        greeted = true;
        attempts = 0;
        status('online');
        return onOpen(msg);
      }
      onMessage(msg);
    }

    function retry() {
      if (closed) return;
      stopTimers();
      try { conn && conn.close(); } catch (e) { /* gone */ }
      try { peer && peer.destroy(); } catch (e) { /* gone */ }
      conn = null;
      peer = null;

      if (attempts >= MAX_RECONNECTS) {
        return fatal(greeted
          ? 'Lost connection to the host and could not get back in.'
          : 'Could not reach that room. Check the code, or ask the host to restart the lobby.');
      }
      attempts++;
      status('reconnecting', attempts);
      setTimeout(connect, Math.min(600 * attempts, 4000));
    }

    function connect() {
      if (closed) return;
      status(greeted ? 'reconnecting' : 'connecting', attempts);

      peer = new Peer(peerOptions());

      peer.on('open', () => {
        if (closed) return;
        conn = peer.connect(ROOM_PREFIX + code, { reliable: true });
        conn.on('open', () => {
          if (closed) return;
          try {
            conn.send({ __: 'hello', id: myId, name: safeName(handlers.name && handlers.name()), v: handlers.protocol });
          } catch (e) { return retry(); }
          startTimers();
        });
        conn.on('data', onData);
        conn.on('close', retry);
        conn.on('error', retry);
      });

      peer.on('error', (err) => {
        if (closed) return;
        // No such room is worth saying plainly the first time, but on a
        // reconnect it usually just means the host is still coming back.
        if (err && err.type === 'peer-unavailable' && !greeted && attempts === 0) {
          return fatal('No room found with code ' + code + '.');
        }
        if (err && err.type === 'browser-incompatible') return fatal(describeError(err));
        retry();
      });
    }

    load().then(connect).catch(() => {
      fatal('Could not load the multiplayer library. Check your connection and try again.');
    });

    return {
      id: myId,
      code: code,
      send: function (msg) {
        if (conn && conn.open) {
          try { conn.send(msg); } catch (e) { /* dropped in flight */ }
        }
      },
      /** The host's clock, as best this client can estimate it. */
      now: () => Date.now() + offset,
      offset: () => offset,
      close: function () { closed = true; teardown(); }
    };
  }

  return {
    load: load,
    hostMatch: hostMatch,
    joinMatch: joinMatch,
    clientId: clientId,
    roomCode: roomCode,
    normalizeCode: normalizeCode,
    CODE_LENGTH: CODE_LENGTH
  };
})();
