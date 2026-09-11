/**
 * Match engine tests.
 *
 *   node tools/test-match.js
 *
 * The multiplayer rules used to live inside DOM callbacks and network
 * handlers, which meant the only way to find out whether scoring, powerups or
 * a mid-game disconnect actually worked was to open four browsers and hope.
 * match.js has no DOM and no network and takes the clock as an argument, so
 * every rule below is checked here instead. Exits non-zero on failure.
 */

const path = require('path');
const Match = require(path.join(__dirname, '..', 'match.js'));

let passed = 0;
const failures = [];

function check(label, condition, detail) {
  if (condition) { passed++; return; }
  failures.push(label + (detail ? ' -> ' + detail : ''));
}
function eq(label, actual, expected) {
  check(label, actual === expected, 'got ' + JSON.stringify(actual) + ', expected ' + JSON.stringify(expected));
}
function test(name, fn) {
  try { fn(); } catch (err) { failures.push(name + ' threw: ' + err.message); }
}

/** Deterministic RNG so powerup targeting and gambles are reproducible. */
function seeded(seed) {
  let s = seed >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}

function questions(n) {
  const out = [];
  for (let i = 0; i < n; i++) {
    out.push({
      id: 'q' + i,
      badges: [{ text: 'Test' }],
      question: 'Question ' + i + '?',
      options: ['right' + i, 'wrong' + i + 'a', 'wrong' + i + 'b', 'wrong' + i + 'c'],
      answer: 'right' + i,
      explanation: 'Because ' + i + '.'
    });
  }
  return out;
}

function makeMatch(opts) {
  opts = opts || {};
  return Match.create({
    questions: questions(opts.rounds || 3),
    useTimer: opts.useTimer !== false,
    timerSeconds: opts.timerSeconds || 20,
    subject: 'TEST',
    revealMs: opts.revealMs || 8000,
    rng: seeded(opts.seed || 1)
  });
}

const T0 = 1000000;
const LEAD = Match.LEAD_MS;

// =========================================================================
test('lobby and start', () => {
  const m = makeMatch();
  m.addPlayer('h', 'Host', true);
  m.addPlayer('a', 'Ada');

  eq('starts in lobby', m.phase, 'lobby');
  eq('roster holds both', m.snapshotFor('h', T0).players.length, 2);
  check('lobby hides the question', m.snapshotFor('a', T0).question === null);

  m.start(T0);
  eq('start moves to question', m.phase, 'question');
  eq('first round is 0', m.round, 0);

  const snap = m.snapshotFor('a', T0);
  check('question is sent', snap.question !== null);
  eq('four options travel', snap.question.options.length, 4);
  check('answer key withheld during the question', snap.question.answer === undefined);
  check('explanation withheld during the question', snap.question.explanation === undefined);
  check('no reveal block yet', snap.reveal === null);
  eq('timer deadline is lead plus duration', snap.deadline, T0 + LEAD + 20000);
});

// =========================================================================
test('scoring rewards speed and the reveal exposes the key', () => {
  const m = makeMatch();
  m.addPlayer('h', 'Host', true);
  m.addPlayer('a', 'Ada');
  m.start(T0);

  const deadline = T0 + LEAD + 20000;
  // Ada answers with 18s left, the host with 2s left.
  m.submitAnswer('a', 0, 'right0', 18000, deadline - 18000);
  eq('still waiting on the host', m.phase, 'question');
  m.submitAnswer('h', 0, 'right0', 2000, deadline - 2000);
  eq('everyone answered ends the round', m.phase, 'reveal');

  const snap = m.snapshotFor('a', deadline);
  eq('reveal carries the answer', snap.reveal.answer, 'right0');
  eq('reveal carries the explanation', snap.reveal.explanation, 'Because 0.');

  const byId = {};
  snap.players.forEach((p) => { byId[p.id] = p; });
  eq('fast answer scores 96', byId.a.score, 96);
  eq('slow answer scores 64', byId.h.score, 64);
  check('faster beats slower', byId.a.score > byId.h.score);
  eq('correct count tracked', byId.a.correctCount, 1);
  eq('streak tracked', byId.a.streak, 1);
});

// =========================================================================
test('wrong answers and timeouts', () => {
  const m = makeMatch();
  m.addPlayer('h', 'Host', true);
  m.addPlayer('a', 'Ada');
  m.start(T0);
  const deadline = T0 + LEAD + 20000;

  m.submitAnswer('a', 0, 'wrong0a', 15000, deadline - 15000);
  eq('a wrong answer does not end the round alone', m.phase, 'question');

  // The host never answers; the deadline closes the round.
  m.tick(deadline - 1);
  eq('round is still open before the deadline', m.phase, 'question');
  m.tick(deadline);
  eq('deadline ends the round', m.phase, 'reveal');

  const players = {};
  m.snapshotFor('h', deadline).players.forEach((p) => { players[p.id] = p; });
  eq('wrong answer scores nothing', players.a.score, 0);
  eq('timeout scores nothing', players.h.score, 0);
  eq('wrong answer counts as answered', players.a.answeredCount, 1);
  eq('streak reset', players.a.streak, 0);

  const results = m.snapshotFor('h', deadline).reveal.results;
  const host = results.filter((r) => r.id === 'h')[0];
  check('timeout recorded as no choice', host.choice === null);
  eq('timeout marked incorrect', host.correct, false);
});

// =========================================================================
test('no timer means the round waits for everyone', () => {
  const m = makeMatch({ useTimer: false });
  m.addPlayer('h', 'Host', true);
  m.addPlayer('a', 'Ada');
  m.start(T0);

  eq('no deadline without a timer', m.snapshotFor('h', T0).deadline, 0);
  m.tick(T0 + 10 * 60 * 1000);
  eq('time alone never ends the round', m.phase, 'question');

  m.submitAnswer('h', 0, 'right0', 0, T0);
  m.submitAnswer('a', 0, 'right0', 0, T0);
  eq('both answers end it', m.phase, 'reveal');
  eq('untimed correct answers are worth a flat 100',
    m.snapshotFor('h', T0).players.filter((p) => p.id === 'h')[0].score, 100);
});

// =========================================================================
test('a player who joins mid-question does not block the round', () => {
  const m = makeMatch();
  m.addPlayer('h', 'Host', true);
  m.start(T0);

  m.addPlayer('late', 'Latecomer');
  const snap = m.snapshotFor('late', T0 + 500);
  eq('late joiner is watching', snap.you.watching, true);
  eq('late joiner counts as answered', snap.you.answered, true);

  m.submitAnswer('h', 0, 'right0', 19000, T0 + LEAD + 1000);
  eq('the host alone can close the round', m.phase, 'reveal');

  const results = m.snapshotFor('late', T0).reveal.results;
  const lateResult = results.filter((r) => r.id === 'late')[0];
  eq('watcher is not scored', lateResult.gained, 0);
  eq('watcher is flagged', lateResult.watching, true);

  // Next round they are a full participant.
  m.tick(T0 + 60000);
  eq('moved to the next question', m.phase, 'question');
  eq('round advanced', m.round, 1);
  eq('no longer watching', m.snapshotFor('late', T0).you.watching, false);
  m.submitAnswer('h', 1, 'right1', 10000, T0 + 60000 + LEAD);
  eq('now the late player is waited for', m.phase, 'question');
});

// =========================================================================
test('a disconnect releases the round, and reconnecting keeps the score', () => {
  const m = makeMatch();
  m.addPlayer('h', 'Host', true);
  m.addPlayer('a', 'Ada');
  m.start(T0);

  m.submitAnswer('h', 0, 'right0', 19000, T0 + LEAD);
  m.submitAnswer('a', 0, 'right0', 19000, T0 + LEAD);
  m.tick(T0 + 60000);
  eq('round two', m.round, 1);

  m.submitAnswer('h', 1, 'right1', 19000, T0 + 60000 + LEAD);
  eq('waiting on Ada', m.phase, 'question');

  m.setConnected('a', false, T0 + 61000);
  eq('dropping Ada closes the round', m.phase, 'reveal');

  const before = m.snapshotFor('h', T0).players.filter((p) => p.id === 'a')[0];
  check('Ada keeps her points while away', before.score > 0);
  eq('Ada shows as disconnected', before.connected, false);

  m.addPlayer('a', 'Ada');
  const after = m.snapshotFor('h', T0).players.filter((p) => p.id === 'a')[0];
  eq('reconnect restores the same score', after.score, before.score);
  eq('reconnect marks her back', after.connected, true);
  eq('reconnect does not duplicate the roster', m.snapshotFor('h', T0).players.length, 2);
});

// =========================================================================
test('the shop is closed during a question and capped during a reveal', () => {
  const m = makeMatch();
  m.addPlayer('h', 'Host', true);
  m.addPlayer('a', 'Ada');
  m.start(T0);

  eq('shop shut mid-question', m.buy('h', 'DOUBLE', T0).ok, false);

  m.submitAnswer('h', 0, 'right0', 20000, T0 + LEAD);
  m.submitAnswer('a', 0, 'right0', 20000, T0 + LEAD);
  eq('now revealing', m.phase, 'reveal');

  // Give the host a workable balance by playing an honest round is slow, so
  // buy what is affordable and confirm the cap and the wallet both bite.
  const wallet = m.snapshotFor('h', T0).players.filter((p) => p.id === 'h')[0].score;
  check('a correct answer funds a cheap powerup', wallet >= 50);

  eq('first buy lands', m.buy('h', 'DOUBLE', T0).ok, true);
  eq('purchase deducted the cost',
    m.snapshotFor('h', T0).players.filter((p) => p.id === 'h')[0].score, wallet - 50);

  const second = m.buy('h', 'DOUBLE', T0);
  const third = m.buy('h', 'DOUBLE', T0);
  const fourth = m.buy('h', 'DOUBLE', T0);
  check('buying stops at the cap or the wallet, whichever comes first',
    !fourth.ok, JSON.stringify([second.ok, third.ok, fourth.ok]));
  check('the refusal explains itself', typeof fourth.reason === 'string' && fourth.reason.length > 0);
});

// =========================================================================
test('double points, and a zero that survives to the next round', () => {
  const m = makeMatch({ rounds: 4, useTimer: false });
  m.addPlayer('h', 'Host', true);
  m.addPlayer('a', 'Ada');
  m.start(T0);

  const answerAll = (round, at) => {
    m.submitAnswer('h', round, 'right' + round, 0, at);
    m.submitAnswer('a', round, 'right' + round, 0, at);
  };

  answerAll(0, T0);                              // both on 100
  eq('host banked 100', m.snapshotFor('h', T0).players.filter((p) => p.id === 'h')[0].score, 100);

  eq('host buys Double', m.buy('h', 'DOUBLE', T0).ok, true);   // 100 -> 50
  eq('buff is visible to its owner', m.snapshotFor('h', T0).you.buffs.double, true);
  check('buff is not leaked to opponents', m.snapshotFor('a', T0).you.buffs.double === false);

  m.tick(T0 + 60000);
  answerAll(1, T0 + 60000);
  eq('doubled round pays 200 on top of 50', m.snapshotFor('h', T0).players.filter((p) => p.id === 'h')[0].score, 250);
  eq('double is spent', m.snapshotFor('h', T0).you.buffs.double, false);

  // Ada is on 200 and buys a silence against the host.
  const silence = m.buy('a', 'ZERO', T0);
  eq('Zero lands on the only opponent', silence.ok, true);
  eq('Zero targeted the host', silence.target, 'Host');
  eq('victim sees the debuff', m.snapshotFor('h', T0).you.buffs.zero, true);

  m.tick(T0 + 120000);
  const beforeZeroed = m.snapshotFor('h', T0).players.filter((p) => p.id === 'h')[0].score;
  answerAll(2, T0 + 120000);
  eq('a silenced correct answer scores nothing',
    m.snapshotFor('h', T0).players.filter((p) => p.id === 'h')[0].score, beforeZeroed);
  eq('the silence expires after one round', m.snapshotFor('h', T0).you.buffs.zero, false);
});

// =========================================================================
test('steal moves points, and block absorbs exactly one hit', () => {
  const m = makeMatch({ rounds: 4, useTimer: false });
  m.addPlayer('h', 'Host', true);
  m.addPlayer('a', 'Ada');
  m.start(T0);

  // Three clean rounds so both have a real balance.
  for (let r = 0; r < 3; r++) {
    m.submitAnswer('h', r, 'right' + r, 0, T0);
    m.submitAnswer('a', r, 'right' + r, 0, T0);
    if (r < 2) m.tick(T0 + (r + 1) * 60000);
  }
  const score = (id) => m.snapshotFor('h', T0).players.filter((p) => p.id === id)[0].score;
  eq('host on 300', score('h'), 300);
  eq('ada on 300', score('a'), 300);

  eq('ada blocks', m.buy('a', 'BLOCK', T0).ok, true);          // 300 -> 200
  eq('block is stacked', m.snapshotFor('a', T0).you.buffs.block, 1);

  eq('host steals', m.buy('h', 'STEAL', T0).ok, true);         // 300 -> 150
  eq('the block ate the steal', score('a'), 200);
  eq('a blocked steal credits nothing', score('h'), 150);
  eq('block is consumed', m.snapshotFor('a', T0).you.buffs.block, 0);

  eq('host steals again', m.buy('h', 'STEAL', T0).ok, true);   // 150 -> 0
  eq('victim lost 100', score('a'), 100);
  eq('thief gained the same 100', score('h'), 100);
});

// =========================================================================
test('nuke finds the real leader and refuses the leader who buys it', () => {
  const m = makeMatch({ rounds: 4, useTimer: false });
  m.addPlayer('h', 'Host', true);
  m.addPlayer('a', 'Ada');
  m.addPlayer('b', 'Ben');
  m.start(T0);

  // Ada takes a commanding lead: she answers all three, the others miss.
  for (let r = 0; r < 3; r++) {
    m.submitAnswer('a', r, 'right' + r, 0, T0);
    m.submitAnswer('h', r, 'right' + r, 0, T0);
    m.submitAnswer('b', r, 'wrong' + r + 'a', 0, T0);
    if (r < 2) m.tick(T0 + (r + 1) * 60000);
  }
  // Top the leader up so the ordering is unambiguous.
  m.buy('h', 'GAMBLE', T0);
  const score = (id) => m.snapshotFor('h', T0).players.filter((p) => p.id === id)[0].score;

  const leaderId = score('a') >= score('h') ? 'a' : 'h';
  const trailerId = leaderId === 'a' ? 'h' : 'a';
  const leaderBefore = score(leaderId);

  const selfNuke = m.buy(leaderId, 'NUKE', T0);
  eq('the leader cannot nuke themselves', selfNuke.ok, false);
  check('and is told why', /first place/i.test(selfNuke.reason), selfNuke.reason);

  if (score(trailerId) >= 150) {
    const hit = m.buy(trailerId, 'NUKE', T0);
    eq('a trailing player can nuke', hit.ok, true);
    check('the nuke landed on the leader, by identity not by name',
      score(leaderId) < leaderBefore, 'leader went ' + leaderBefore + ' -> ' + score(leaderId));
  }

  eq('a broke player cannot buy', m.buy('b', 'NUKE', T0).ok, false);
});

// =========================================================================
test('scores never go negative', () => {
  const m = makeMatch({ rounds: 4, useTimer: false, seed: 7 });
  m.addPlayer('h', 'Host', true);
  m.addPlayer('a', 'Ada');
  m.start(T0);
  m.submitAnswer('h', 0, 'right0', 0, T0);
  m.submitAnswer('a', 0, 'wrong0a', 0, T0);

  for (let i = 0; i < 40; i++) { m.buy('h', 'GAMBLE', T0); m.buy('a', 'STEAL', T0); }
  m.snapshotFor('h', T0).players.forEach((p) => {
    check('score stays at or above zero for ' + p.name, p.score >= 0, String(p.score));
  });
});

// =========================================================================
test('duplicate and stale answers are rejected', () => {
  const m = makeMatch();
  m.addPlayer('h', 'Host', true);
  m.addPlayer('a', 'Ada');
  m.start(T0);
  const at = T0 + LEAD + 1000;

  eq('first answer accepted', m.submitAnswer('a', 0, 'right0', 19000, at), true);
  eq('second answer rejected', m.submitAnswer('a', 0, 'wrong0a', 19000, at), false);
  eq('answer for another round rejected', m.submitAnswer('h', 5, 'right0', 19000, at), false);
  eq('answer from a stranger rejected', m.submitAnswer('ghost', 0, 'right0', 19000, at), false);

  m.submitAnswer('h', 0, 'right0', 19000, at);
  eq('answering during a reveal is rejected', m.submitAnswer('a', 1, 'right1', 19000, at), false);
});

// =========================================================================
test('a claimed time faster than the host saw is capped', () => {
  const m = makeMatch();
  m.addPlayer('h', 'Host', true);
  m.addPlayer('cheat', 'Cheater');
  m.start(T0);
  const deadline = T0 + LEAD + 20000;

  // Both answer with 1s of real time left; one lies and claims 20s.
  m.submitAnswer('h', 0, 'right0', 1000, deadline - 1000);
  m.submitAnswer('cheat', 0, 'right0', 20000, deadline - 1000);

  const byId = {};
  m.snapshotFor('h', deadline).players.forEach((p) => { byId[p.id] = p; });
  eq('the honest player scores on real time', byId.h.score, 62);
  eq('the inflated claim is capped to what the host observed', byId.cheat.score, 62);
});

// =========================================================================
test('the host can skip, and the match ends with sorted standings', () => {
  const m = makeMatch({ rounds: 2 });
  m.addPlayer('h', 'Host', true);
  m.addPlayer('a', 'Ada');
  m.start(T0);

  m.submitAnswer('a', 0, 'right0', 19000, T0 + LEAD);
  m.submitAnswer('h', 0, 'wrong0a', 19000, T0 + LEAD);
  eq('revealing', m.phase, 'reveal');

  eq('skip works during a reveal', m.skip(T0 + 100), true);
  eq('skipping moved to round two', m.round, 1);
  eq('and back to a question', m.phase, 'question');

  m.submitAnswer('a', 1, 'right1', 19000, T0 + LEAD);
  m.submitAnswer('h', 1, 'right1', 5000, T0 + LEAD);
  m.tick(T0 + 10 * 60 * 1000);
  eq('past the last round the match is over', m.phase, 'over');

  const table = m.standings();
  eq('two finishers', table.length, 2);
  check('standings are sorted high to low', table[0].score >= table[1].score);
  eq('the winner is Ada', table[0].name, 'Ada');
  check('final snapshot still carries the last reveal', m.snapshotFor('a', T0).reveal !== null);
});

// =========================================================================
test('events are emitted and drained once', () => {
  const m = makeMatch({ rounds: 3, useTimer: false });
  m.addPlayer('h', 'Host', true);
  m.addPlayer('a', 'Ada');

  const joins = m.drainEvents().filter((e) => e.k === 'join');
  eq('two joins reported', joins.length, 2);
  eq('draining empties the queue', m.drainEvents().length, 0);

  m.start(T0);
  // Two clean rounds so the host can afford a 150-point attack.
  m.submitAnswer('h', 0, 'right0', 0, T0);
  m.submitAnswer('a', 0, 'right0', 0, T0);
  m.tick(T0 + 60000);
  m.submitAnswer('h', 1, 'right1', 0, T0 + 60000);
  m.submitAnswer('a', 1, 'right1', 0, T0 + 60000);
  eq('the steal is affordable', m.buy('h', 'STEAL', T0 + 60000).ok, true);

  const attacks = m.drainEvents().filter((e) => e.k === 'attack');
  eq('one attack event', attacks.length, 1);
  eq('attack names the attacker', attacks[0].from, 'Host');
  eq('attack names the victim', attacks[0].to, 'Ada');

  m.setConnected('a', false, T0);
  eq('a drop is announced', m.drainEvents().filter((e) => e.k === 'leave').length, 1);
});

// =========================================================================
test('private events are addressed to one player', () => {
  const m = makeMatch({ rounds: 2, useTimer: false, seed: 3 });
  m.addPlayer('h', 'Host', true);
  m.addPlayer('a', 'Ada');
  m.start(T0);
  m.submitAnswer('h', 0, 'right0', 0, T0);
  m.submitAnswer('a', 0, 'right0', 0, T0);
  m.drainEvents();

  m.buy('h', 'GAMBLE', T0);
  const gambles = m.drainEvents().filter((e) => e.k === 'gamble');
  eq('one gamble event', gambles.length, 1);
  eq('addressed to the buyer only', gambles[0].audience, 'h');
});

// =========================================================================
test('snapshots are sequenced so stale ones can be dropped', () => {
  const m = makeMatch();
  m.addPlayer('h', 'Host', true);
  const first = m.snapshotFor('h', T0).seq;
  m.addPlayer('a', 'Ada');
  const second = m.snapshotFor('h', T0).seq;
  check('the sequence advances on change', second > first, first + ' -> ' + second);
  eq('protocol version travels', m.snapshotFor('h', T0).v, Match.PROTOCOL);
});

// =========================================================================
test('attack events identify players by id, not by display name', () => {
  const m = makeMatch({ rounds: 3, useTimer: false });
  m.addPlayer('h', 'Sam', true);
  m.addPlayer('a', 'Sam');          // two players, identical names
  m.start(T0);
  for (let r = 0; r < 2; r++) {
    m.submitAnswer('h', r, 'right' + r, 0, T0);
    m.submitAnswer('a', r, 'right' + r, 0, T0);
    if (r === 0) m.tick(T0 + 60000);
  }
  m.drainEvents();

  eq('steal lands', m.buy('h', 'STEAL', T0).ok, true);
  const attack = m.drainEvents().filter((e) => e.k === 'attack')[0];
  check('the event exists', !!attack);
  eq('attacker id travels', attack.fromId, 'h');
  eq('victim id travels', attack.toId, 'a');
  check('ids disambiguate what the names cannot', attack.fromId !== attack.toId);
});

// =========================================================================
test('a purchase is confirmed privately to the buyer', () => {
  const m = makeMatch({ rounds: 3, useTimer: false });
  m.addPlayer('h', 'Host', true);
  m.addPlayer('a', 'Ada');
  m.start(T0);
  m.submitAnswer('h', 0, 'right0', 0, T0);
  m.submitAnswer('a', 0, 'right0', 0, T0);
  m.drainEvents();

  m.buy('h', 'DOUBLE', T0);
  const buys = m.drainEvents().filter((e) => e.k === 'buy');
  eq('one confirmation', buys.length, 1);
  eq('addressed to the buyer', buys[0].audience, 'h');
  eq('naming what was bought', buys[0].item, 'DOUBLE');
});

// =========================================================================
test('elimination powerups are resolved by the host, never by the client', () => {
  const m = makeMatch({ rounds: 3, useTimer: false });
  m.addPlayer('h', 'Host', true);
  m.addPlayer('a', 'Ada');
  m.start(T0);
  eq('no eliminations by default', m.snapshotFor('h', T0).you.eliminate.length, 0);

  m.submitAnswer('h', 0, 'right0', 0, T0);
  m.submitAnswer('a', 0, 'right0', 0, T0);
  eq('buy the 50/50', m.buy('h', 'ELIM2', T0).ok, true);
  eq('nothing changes until the next round', m.snapshotFor('h', T0).you.eliminate.length, 0);

  m.tick(T0 + 60000);
  const snap = m.snapshotFor('h', T0);
  eq('two options are struck out', snap.eliminate === undefined ? snap.you.eliminate.length : -1, 2);
  check('the answer is still not in the question payload', snap.question.answer === undefined);

  // Every struck index must be a wrong option, which the client could not
  // have worked out for itself.
  const correctIndex = snap.question.options.indexOf('right1');
  check('the right answer is never eliminated', snap.you.eliminate.indexOf(correctIndex) === -1);
  eq('an opponent who bought nothing is unaffected', m.snapshotFor('a', T0).you.eliminate.length, 0);

  // Auto-correct leaves only the answer standing.
  m.submitAnswer('h', 1, 'right1', 0, T0 + 60000);
  m.submitAnswer('a', 1, 'right1', 0, T0 + 60000);
  if (m.buy('a', 'AUTOCORRECT', T0).ok) {
    m.tick(T0 + 120000);
    const auto = m.snapshotFor('a', T0);
    eq('all three wrong options are struck', auto.you.eliminate.length, 3);
    check('leaving exactly the answer',
      auto.you.eliminate.indexOf(auto.question.options.indexOf('right2')) === -1);
  }
});

// =========================================================================
console.log('Match engine: %d checks passed', passed);
if (failures.length) {
  console.log('\n%d FAILURE(S):', failures.length);
  failures.forEach((f) => console.log('  - ' + f));
  process.exit(1);
}
console.log('All match engine tests passed.');
