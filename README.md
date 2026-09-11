# [AP Practice](https://jaukg9.github.io/APUSH-practice/practice.html)

Browser-based practice quizzes with four subjects, playable solo or as a
multiplayer match. No build step and no dependencies — open `practice.html`.

## Modes

| Subject | Content | Filter by |
| --- | --- | --- |
| APUSH | 232 questions | Period 1–9 |
| AP Gov | 257 questions | The nine required foundational documents |
| AP Gov: Interactions Among Branches | 129 questions over 95 key terms | Institution and difficulty |
| Prefix & Suffix Practice | 115 questions over 62 affixes | Difficulty and prefix/suffix focus |

**Single player** runs at your own pace: answer, read the feedback, continue.
**Multiplayer** is peer-to-peer over WebRTC — one player hosts and shares a
four-letter room code, and everyone answers the same question each round with a
shop of powerups between rounds.

Scoring is shared across all four subjects. With the timer on, a correct answer
is worth 60–100 points depending on speed; with it off, every correct answer is
worth 100. Streaks count consecutive correct answers, and your best streak per
subject is remembered locally.

## Files

```
practice.html          markup and screens
styles.css             all styling
app.js                 the game engine: selection, timing, scoring, multiplayer
questions.js           APUSH + AP Gov banks
gov-branches-data.js   AP Gov Unit 2 key terms and question bank
affix-data.js          prefix/suffix vocabulary and question bank
prefix_suffix_vocabulary.csv   source of truth for the affix vocabulary
tools/validate-content.js      content checker
```

Content and engine stay separate: no question text lives in `app.js`, and no
game logic lives in the banks.

## Adding questions

**APUSH / AP Gov** — append a row to the matching array in `questions.js`. The
correct answer is always written first; the engine shuffles the options at
runtime.

```js
[3, "Question text?", "Correct answer", "Wrong 1", "Wrong 2", "Wrong 3"]
```

**AP Gov: Interactions Among Branches** — append an object to `govBranchesBank`
in `gov-branches-data.js`.

```js
{
  id: "gb130", term: "filibuster", branch: "congress", topic: "2.2",
  questionType: "definition", difficulty: "easy",
  question: "Which of the following best describes a filibuster?",
  options: ["A senator holding the floor at length ...", "...", "...", "..."],
  answer: "A senator holding the floor at length ...",
  explanation: "The filibuster is a Senate procedure, not a constitutional power ..."
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
Government & Politics, AP Edition* (2022), pages 108–187 — Topics 2.1 through
2.8. Edit that list first if the source changes.

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

It checks that every question has exactly four distinct options, that the answer
is among them, that ids and question stems are unique, and that every affix or
key term referenced actually exists — then prints coverage by difficulty,
question type, affix and institution. It also warns if any institution and
difficulty combination has no questions, since that filter pairing would hand
the setup screen an empty pool.
