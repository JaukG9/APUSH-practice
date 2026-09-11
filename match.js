/* =========================================================================
   AP Practice - match engine
   -------------------------------------------------------------------------
   The host runs one of these and is the only authority in a match: scores,
   phase changes, timing and powerups are all decided here. Clients never
   compute state, they send intents ("I picked B", "I want to buy STEAL") and
   render whatever snapshot comes back. That is what keeps four browsers
   agreeing with each other.

   There is no DOM and no network in this file, and every method takes the
   current time as an argument, so the whole rule set runs headlessly:

       node tools/test-match.js

   Phase machine:

       lobby --start--> question --everyone answered or deadline--> reveal
                            ^                                          |
                            |                                          |
                            +---------- deadline or host skip ---------+
                                                 |
                                       last round -> over

   A question snapshot deliberately omits the correct answer and the
   explanation; both only appear once the round is revealed, so the answer
   key is never sitting in a player's memory while they are still choosing.
   ========================================================================= */

'use strict';

var Match = (function () {

  // Bumped when the wire format changes in a way older clients cannot read.
  const PROTOCOL = 3;

  // A short lead-in before the clock starts, so a player on a slow link is
  // not already behind by the time their question has finished rendering.
  const LEAD_MS = 800;

  // How long the reveal (answer + standings + shop) stays up. The host can
  // cut it short for everyone with the Next button.
  const REVEAL_MS = 8000;

  const MAX_BUYS_PER_ROUND = 3;

  // A late answer is still credited at the speed the player's own clock
  // reported, but never more than the host saw, plus one grace allowance for
  // the trip over the wire.
  const LATENCY_GRACE_MS = 400;

  const POWERUPS = {
    ELIM2:       { cost: 50,  blurb: 'Elim. 2 Wrong',      attack: false },
    AUTOCORRECT: { cost: 150, blurb: 'Auto-Correct',       attack: false },
    DOUBLE:      { cost: 50,  blurb: 'Double Points',      attack: false },
    BLOCK:       { cost: 100, blurb: 'Block 1 Attack',     attack: false },
    GAMBLE:      { cost: 75,  blurb: 'Win 200 / Lose 100', attack: false },
    NUKE:        { cost: 150, blurb: 'Nuke 1st Place',     attack: true },
    STEAL:       { cost: 150, blurb: 'Steal 100 Pts',      attack: true },
    ZERO:        { cost: 200, blurb: 'Opponent gets 0',    attack: true }
  };

  const POWERUP_ORDER = ['ELIM2', 'AUTOCORRECT', 'DOUBLE', 'BLOCK', 'GAMBLE', 'NUKE', 'STEAL', 'ZERO'];

  const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));

  function shuffled(list, rng) {
    const out = list.slice();
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      const tmp = out[i]; out[i] = out[j]; out[j] = tmp;
    }
    return out;
  }

  function newPlayer(id, name, isHost) {
    return {
      id: id,
      name: name,
      isHost: !!isHost,
      score: 0,
      connected: true,

      // per round
      answer: null,
      answered: false,
      lockedMs: 0,
      gained: 0,
      wasCorrect: false,
      watching: false,   // joined mid-question, sitting this one out
      buysThisRound: 0,

      // running totals
      correctCount: 0,
      answeredCount: 0,
      streak: 0,
      bestStreak: 0,

      // Which option indexes to grey out this round. The host works this out,
      // because a client that could compute it would also know the answer.
      eliminate: [],

      buffs: {
        elim2: false, autocorrect: false,        // active this round
        pendingElim2: false, pendingAuto: false, // bought, apply next round
        double: false, zero: false, block: 0
      }
    };
  }

  /**
   * @param config.questions  normalized questions, each { id, badges, question,
   *                          options[4], answer, explanation }
   * @param config.rng        injectable for tests; defaults to Math.random
   */
  function create(config) {
    const cfg = {
      questions: config.questions || [],
      useTimer: !!config.useTimer,
      timerSeconds: config.timerSeconds || 20,
      subject: config.subject || null,
      revealMs: config.revealMs || REVEAL_MS,
      previewCount: config.previewCount || 0,
      rng: config.rng || Math.random
    };

    const players = new Map();
    const order = [];
    let events = [];

    const M = {
      phase: 'lobby',
      round: -1,
      startsAt: 0,
      deadline: 0,
      seq: 0,
      results: [],
      now: 0
    };

    const bump = () => { M.seq++; };
    const active = () => order.map((id) => players.get(id)).filter((p) => p && p.connected);
    const totalMs = () => cfg.timerSeconds * 1000;

    function emit(kind, fields, audience) {
      events.push(Object.assign({ k: kind, audience: audience === undefined ? null : audience }, fields));
    }

    function leaderOf(list) {
      let best = null;
      list.forEach((p) => { if (!best || p.score > best.score) best = p; });
      return best;
    }

    function pick(list) {
      return list[Math.floor(cfg.rng() * list.length)];
    }

    // --- roster ----------------------------------------------------------

    function addPlayer(id, name, isHost) {
      const existing = players.get(id);
      if (existing) {                       // a reconnect keeps the same score
        existing.connected = true;
        if (name) existing.name = name;
        emit('rejoin', { name: existing.name });
        bump();
        return existing;
      }

      const player = newPlayer(id, name || 'Player', isHost);
      // Someone arriving mid-question must not hold that round open for the
      // rest of the room; they watch it and start scoring on the next one.
      if (M.phase === 'question') { player.answered = true; player.watching = true; }
      players.set(id, player);
      order.push(id);
      emit('join', { name: player.name });
      bump();
      return player;
    }

    function setConnected(id, connected, now) {
      const player = players.get(id);
      if (!player || player.connected === connected) return false;
      player.connected = connected;
      emit(connected ? 'rejoin' : 'leave', { name: player.name });
      bump();
      // A player who vanished must not keep everyone else waiting.
      if (!connected) maybeAdvance(now);
      return true;
    }

    function removePlayer(id) {
      if (M.phase !== 'lobby' || !players.has(id)) return false;
      emit('leave', { name: players.get(id).name });
      players.delete(id);
      const at = order.indexOf(id);
      if (at !== -1) order.splice(at, 1);
      bump();
      return true;
    }

    // --- phases ----------------------------------------------------------

    function start(now) {
      if (M.phase !== 'lobby' || !cfg.questions.length) return false;
      beginRound(0, now);
      return true;
    }

    function beginRound(index, now) {
      M.round = index;
      M.phase = 'question';
      M.results = [];
      M.startsAt = now + LEAD_MS;
      M.deadline = cfg.useTimer ? M.startsAt + totalMs() : 0;

      players.forEach((p) => {
        p.answer = null;
        p.answered = false;
        p.lockedMs = 0;
        p.gained = 0;
        p.wasCorrect = false;
        p.watching = false;
        // Reveal-bought sight powerups apply to exactly the round after the
        // purchase, then expire whether or not they were useful.
        p.buffs.elim2 = p.buffs.pendingElim2;
        p.buffs.autocorrect = p.buffs.pendingAuto;
        p.buffs.pendingElim2 = false;
        p.buffs.pendingAuto = false;
        p.eliminate = eliminationsFor(p, cfg.questions[index]);
      });
      bump();
    }

    /** Option indexes to grey out for one player, resolved host-side. */
    function eliminationsFor(player, question) {
      if (!question || (!player.buffs.elim2 && !player.buffs.autocorrect)) return [];
      const wrong = [];
      question.options.forEach((option, i) => { if (option !== question.answer) wrong.push(i); });
      const order = shuffled(wrong, cfg.rng);
      return player.buffs.autocorrect ? order : order.slice(0, 2);
    }

    /** Lobby-only: the host wiring its settings into the match before start. */
    function configure(next) {
      if (M.phase !== 'lobby') return false;
      if (next.questions) cfg.questions = next.questions;
      if (next.useTimer !== undefined) cfg.useTimer = !!next.useTimer;
      if (next.timerSeconds) cfg.timerSeconds = next.timerSeconds;
      if (next.subject !== undefined) cfg.subject = next.subject;
      if (next.previewCount !== undefined) cfg.previewCount = next.previewCount;
      bump();
      return true;
    }

    function toReveal(now) {
      const question = cfg.questions[M.round];
      M.results = [];

      players.forEach((p) => {
        if (p.watching) {
          M.results.push({ id: p.id, choice: null, correct: false, gained: 0, watching: true });
          return;
        }

        const correct = p.answer !== null && p.answer === question.answer;
        let gained = 0;

        if (correct) {
          gained = 100;
          if (cfg.useTimer) gained = 60 + Math.floor((p.lockedMs / totalMs()) * 40);
          if (p.buffs.double) gained *= 2;
          if (p.buffs.zero) gained = 0;
          p.correctCount++;
          p.streak++;
          if (p.streak > p.bestStreak) p.bestStreak = p.streak;
        } else {
          p.streak = 0;
        }

        // One-shot scoring buffs burn on the round they were aimed at, so a
        // wrong answer does not bank a Double Points for later.
        if (p.buffs.double) { p.buffs.double = false; emit('buff', { item: 'DOUBLE', used: correct }, p.id); }
        if (p.buffs.zero) { p.buffs.zero = false; if (correct) emit('buff', { item: 'ZERO', used: true }, p.id); }

        p.answeredCount++;
        p.score += gained;
        p.gained = gained;
        p.wasCorrect = correct;
        M.results.push({ id: p.id, choice: p.answer, correct: correct, gained: gained });
      });

      players.forEach((p) => { p.buysThisRound = 0; });
      M.phase = 'reveal';
      M.startsAt = now;
      M.deadline = now + cfg.revealMs;
      bump();
    }

    function nextRound(now) {
      if (M.round + 1 >= cfg.questions.length) {
        M.phase = 'over';
        M.startsAt = now;
        M.deadline = 0;
        bump();
        return;
      }
      beginRound(M.round + 1, now);
    }

    function maybeAdvance(now) {
      if (M.phase === 'question') {
        const waiting = active().filter((p) => !p.answered);
        if (!waiting.length) return toReveal(now);
        if (cfg.useTimer && now >= M.deadline) return toReveal(now);
      } else if (M.phase === 'reveal') {
        if (now >= M.deadline) return nextRound(now);
      }
    }

    /** Drives deadlines. Returns true when the phase actually moved on. */
    function tick(now) {
      M.now = now;
      const before = M.seq;
      maybeAdvance(now);
      return M.seq !== before;
    }

    /** The host's Next button: end the current phase early for everybody. */
    function skip(now) {
      if (M.phase === 'question') { toReveal(now); return true; }
      if (M.phase === 'reveal') { nextRound(now); return true; }
      return false;
    }

    // --- answering -------------------------------------------------------

    function submitAnswer(id, round, choice, claimedRemainingMs, now) {
      if (M.phase !== 'question' || round !== M.round) return false;
      const player = players.get(id);
      if (!player || player.answered) return false;

      player.answered = true;
      player.answer = choice === null || choice === undefined ? null : String(choice);

      if (cfg.useTimer) {
        const observed = M.deadline - now;
        const claimed = Number(claimedRemainingMs);
        player.lockedMs = clamp(
          Math.min(isFinite(claimed) ? claimed : 0, observed + LATENCY_GRACE_MS),
          0, totalMs()
        );
      }

      bump();
      maybeAdvance(now);
      return true;
    }

    // --- powerups --------------------------------------------------------

    /** Applies damage unless the target has a Block stacked. */
    function strike(target, item, from, amount) {
      const hit = (dealt, blocked) => emit('attack', {
        item: item,
        from: from.name, fromId: from.id,
        to: target.name, toId: target.id,
        amount: dealt, blocked: blocked
      });

      if (target.buffs.block > 0) {
        target.buffs.block--;
        hit(0, true);
        return 0;
      }
      if (item === 'ZERO') {
        target.buffs.zero = true;
        hit(0, false);
        return 0;
      }
      const dealt = Math.min(amount, target.score);
      target.score -= dealt;
      hit(dealt, false);
      return dealt;
    }

    function buy(id, item, now) {
      const player = players.get(id);
      const spec = POWERUPS[item];
      if (!player || !spec) return { ok: false, reason: 'Unknown powerup.' };
      if (M.phase !== 'reveal') return { ok: false, reason: 'The shop is only open between rounds.' };
      if (player.buysThisRound >= MAX_BUYS_PER_ROUND) {
        return { ok: false, reason: 'Limit reached: ' + MAX_BUYS_PER_ROUND + ' powerups per round.' };
      }
      if (player.score < spec.cost) return { ok: false, reason: 'Not enough points.' };

      const opponents = active().filter((p) => p.id !== id);
      if (spec.attack && !opponents.length) return { ok: false, reason: 'No opponents to target.' };

      let target = null;
      if (item === 'NUKE') {
        target = leaderOf(active());
        if (!target || target.id === id) return { ok: false, reason: 'You are already in first place.' };
      } else if (item === 'STEAL' || item === 'ZERO') {
        target = pick(opponents);
      }

      player.score -= spec.cost;
      player.buysThisRound++;

      if (item === 'ELIM2') player.buffs.pendingElim2 = true;
      if (item === 'AUTOCORRECT') player.buffs.pendingAuto = true;
      if (item === 'DOUBLE') player.buffs.double = true;
      if (item === 'BLOCK') player.buffs.block++;

      if (item === 'GAMBLE') {
        if (cfg.rng() > 0.5) {
          player.score += 200;
          emit('gamble', { won: true, amount: 200 }, player.id);
        } else {
          const lost = Math.min(player.score, 100);
          player.score -= lost;
          emit('gamble', { won: false, amount: lost }, player.id);
        }
      }

      if (item === 'NUKE') strike(target, item, player, 200);
      if (item === 'ZERO') strike(target, item, player, 0);
      if (item === 'STEAL') {
        // Stealing moves points rather than destroying them, and only the
        // amount that actually landed is credited.
        player.score += strike(target, item, player, 100);
      }

      // Attacks announce themselves through the attack event, which says who
      // was hit and for how much; a second "you bought it" toast is just noise.
      if (!spec.attack) emit('buy', { item: item, target: null }, player.id);
      bump();
      return { ok: true, target: target ? target.name : null };
    }

    // --- snapshots -------------------------------------------------------

    function publicPlayer(p) {
      return {
        id: p.id, name: p.name, score: p.score, connected: p.connected, isHost: p.isHost,
        answered: p.answered, watching: p.watching, gained: p.gained, wasCorrect: p.wasCorrect,
        correctCount: p.correctCount, answeredCount: p.answeredCount,
        streak: p.streak, bestStreak: p.bestStreak
      };
    }

    function snapshotFor(id, now) {
      const question = cfg.questions[M.round] || null;
      const revealed = M.phase === 'reveal' || M.phase === 'over';
      const me = players.get(id);

      return {
        v: PROTOCOL,
        seq: M.seq,
        phase: M.phase,
        round: M.round,
        total: cfg.questions.length,
        now: now === undefined ? M.now : now,
        startsAt: M.startsAt,
        deadline: M.deadline,
        settings: {
          useTimer: cfg.useTimer,
          timerSeconds: cfg.timerSeconds,
          subject: cfg.subject,
          count: cfg.questions.length || cfg.previewCount
        },
        // The answer key is withheld until the round is over.
        question: (M.phase === 'lobby' || !question) ? null : {
          id: question.id,
          badges: question.badges,
          question: question.question,
          options: question.options
        },
        reveal: revealed && question ? {
          answer: question.answer,
          explanation: question.explanation,
          results: M.results
        } : null,
        players: order.map((pid) => publicPlayer(players.get(pid))),
        you: me ? {
          id: me.id,
          answer: me.answer,
          answered: me.answered,
          watching: me.watching,
          buysThisRound: me.buysThisRound,
          maxBuys: MAX_BUYS_PER_ROUND,
          eliminate: M.phase === 'question' ? me.eliminate.slice() : [],
          buffs: {
            elim2: me.buffs.elim2, autocorrect: me.buffs.autocorrect,
            double: me.buffs.double, zero: me.buffs.zero, block: me.buffs.block
          }
        } : null
      };
    }

    function drainEvents() {
      const drained = events;
      events = [];
      return drained;
    }

    function standings() {
      return order.map((id) => publicPlayer(players.get(id))).sort((a, b) => b.score - a.score);
    }

    return {
      configure: configure,
      addPlayer: addPlayer,
      setConnected: setConnected,
      removePlayer: removePlayer,
      start: start,
      tick: tick,
      skip: skip,
      submitAnswer: submitAnswer,
      buy: buy,
      snapshotFor: snapshotFor,
      drainEvents: drainEvents,
      standings: standings,
      playerIds: () => order.slice(),
      get phase() { return M.phase; },
      get round() { return M.round; },
      get seq() { return M.seq; }
    };
  }

  return {
    create: create,
    PROTOCOL: PROTOCOL,
    POWERUPS: POWERUPS,
    POWERUP_ORDER: POWERUP_ORDER,
    MAX_BUYS_PER_ROUND: MAX_BUYS_PER_ROUND,
    REVEAL_MS: REVEAL_MS,
    LEAD_MS: LEAD_MS
  };
})();

if (typeof module !== 'undefined') module.exports = Match;
