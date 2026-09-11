# [AP Practice](https://jaukg9.github.io/APUSH-practice/practice.html)

Browser-based practice quizzes with four subjects, playable solo or as a
multiplayer match. No build step and no dependencies — open `practice.html`.

## Modes

| Subject | Content | Filter by |
| --- | --- | --- |
| APUSH | 232 questions | Period 1–9 |
| AP Gov | 257 questions | The nine required foundational documents |
| AP Gov: 2.3-2.8 | 98 questions over 56 key terms | Institution and difficulty |
| Prefix & Suffix Practice | 115 questions over 62 affixes | Difficulty and prefix/suffix focus |

**Single player** runs at your own pace: answer, read the feedback, continue.

**Multiplayer** is peer-to-peer over WebRTC — no server, no accounts. One
player hosts and shares a five-character room code or an invite link; everyone
answers the same question each round, sees who has locked in, and gets a
standings board and a powerup shop between rounds. Players can join a match
already in progress, and a dropped connection reconnects into the same seat
with its score intact.

Scoring is shared across all four subjects. With the timer on, a correct answer
is worth 60–100 points depending on speed; with it off, every correct answer is
worth 100. Streaks count consecutive correct answers, and your best streak per
subject is remembered locally.

## Files

```
practice.html          markup and screens
styles.css             all styling
app.js                 screens, solo play, and the multiplayer client
match.js               the authoritative match rules: phases, scoring, powerups
net.js                 transport: room codes, heartbeats, clock sync, reconnects
questions.js           APUSH + AP Gov banks
gov-branches-data.js   AP Gov 2.3-2.8 key terms and question bank
affix-data.js          prefix/suffix vocabulary and question bank
prefix_suffix_vocabulary.csv   source of truth for the affix vocabulary
tools/validate-content.js      content checker
tools/test-match.js            match rule tests
```

Content and engine stay separate: no question text lives in `app.js`, and no
game logic lives in the banks. `match.js` and `net.js` keep that going — rules
with no DOM, transport with no rules.

The `<script>` and `<link>` tags carry a `?v=` stamp. There is no build step,
so bump it whenever markup, styling and scripts change together, or a browser
holding one of them from cache will mix old and new.

## How multiplayer works

The host is the only authority. It runs a `Match` from `match.js` and is the
single place scores, phase changes and powerups are decided. Everyone —
including the host — then draws from the snapshots it publishes:

```
client --{answer | buy}--> host --> Match --> {sync | event} --> every client
```

That shape is what keeps four browsers agreeing. A few consequences worth
knowing:

- **Nobody scores themselves.** A client reports which option it picked and how
  much time its own clock showed; the host caps that against what it actually
  observed and works out the points. Two players cannot drift apart.
- **The answer key is withheld.** A question snapshot carries the options but
  not the answer or the explanation; both appear only once the round is
  revealed. Powerups that grey out wrong options are resolved host-side for the
  same reason.
- **Deadlines are absolute and clock-corrected.** The host stamps a deadline in
  its own time; clients estimate the offset from ping round trips (keeping the
  lowest-latency sample) and re-sync on every snapshot, so a slow link loses
  latency rather than accumulating drift.
- **Nothing waits forever.** A round ends when every connected player has
  answered or the deadline passes. A player who disconnects is dropped from the
  count within a few seconds, and one who joins mid-question sits that round out
  instead of holding it open.
- **Identity survives a reconnect.** Players are keyed by a per-tab id, not by
  the WebRTC peer id, which changes on every reconnect. Coming back restores the
  same seat and score. Two tabs of one browser count as two players, which is
  the easiest way to try a match on your own.

`net.js` handles the wire: namespaced room codes on the public PeerJS broker,
heartbeats, reconnection with backoff, and a TURN relay fallback — without one,
a fair share of networks (school Wi-Fi especially) cannot establish a peer
connection at all. To use your own relay instead of the public one, replace the
credentials in `ICE_SERVERS` at the top of that file.

The rules are testable because they have no DOM and no network, and take the
clock as an argument:

```bash
node tools/test-match.js
```

That covers scoring and speed bonuses, timeouts, mid-match joins, disconnects
and reconnects, every powerup, the purchase cap, and the guarantee that a
question snapshot never contains its own answer.

## Adding questions

**APUSH / AP Gov** — append a row to the matching array in `questions.js`. The
correct answer is always written first; the engine shuffles the options at
runtime.

```js
[3, "Question text?", "Correct answer", "Wrong 1", "Wrong 2", "Wrong 3"]
```

**AP Gov: 2.3-2.8** — append an object to `govBranchesBank`
in `gov-branches-data.js`.

```js
{
  id: "gb143", term: "gridlock", branch: "congress", topic: "2.3",
  questionType: "definition", difficulty: "medium",
  question: "As the AMSCO text uses the term, gridlock refers to ...",
  options: ["opposing forces congesting the process ...", "...", "...", "..."],
  answer: "opposing forces congesting the process ...",
  explanation: "Gridlock describes the jam itself rather than any single rule ..."
}
```

- `branch` is `congress`, `presidency`, `judiciary`, or `mixed` for items that
  turn on two or three institutions at once. It drives the Institution filter,
  and a session is drawn round-robin across branches so no one institution
  dominates.
- `difficulty` is `easy`, `medium`, or `hard`; a session ramps easy → hard.
- `questionType` is one of `definition`, `application`, `scenario`, `compare`,
  `document`, `case`, `process`. The engine spreads types out inside each
  difficulty band so consecutive questions do not feel identical.
- `term` must match an entry in `govBranchesVocab` (use `mixed` for items that
  compare several terms), and `topic` is the AMSCO topic number.

`govBranchesVocab` is the key-term list, taken from AMSCO *United States
Government & Politics, AP Edition* (2022), pages 124–187 — Topic 2.3
(congressional behavior) through Topic 2.8 (the judiciary). Edit that list
first if the source changes.

Question ids are not contiguous. They are identity keys, and the gaps are where
Topics 2.1 and 2.2 used to sit; reusing a number would collide with the
recently-seen list a returning player already has stored, so keep counting up.

**Prefix & Suffix** — append an object to `affixBank` in `affix-data.js`.

```js
{
  id: "af116", affix: "ante", type: "prefix",
  questionType: "meaning", difficulty: "easy",
  question: "What does `ante-` most closely mean?",
  options: ["before", "after", "against", "around"],
  answer: "before",
  explanation: "`ante-` means \"before\" ..."
}
```

- `type` is `prefix`, `suffix`, or `mixed`, and drives the Focus filter.
- `difficulty` is `easy`, `medium`, or `hard`; a session ramps easy → hard.
- `affix` must match an entry in `affixVocab` (use `mixed` for review items).
- Text in `backticks` renders as inline code. Question data holds no HTML.

The vocabulary in `affixVocab` is generated from
`prefix_suffix_vocabulary.csv`; edit the CSV first if the word list changes.

After editing any bank:

```bash
node tools/validate-content.js
```

(and after touching `match.js`, `node tools/test-match.js`.)

It checks that every question has exactly four distinct options, that the answer
is among them, that ids and question stems are unique, and that every affix or
key term referenced actually exists — then prints coverage by difficulty,
question type, affix and institution. It also warns if any institution and
difficulty combination has no questions, since that filter pairing would hand
the setup screen an empty pool.
