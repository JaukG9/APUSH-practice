# [AP Practice](https://jaukg9.github.io/APUSH-practice/practice.html)

Browser-based practice quizzes with three subjects, playable solo or as a
multiplayer match. No build step and no dependencies — open `practice.html`.

## Modes

| Subject | Content | Filter by |
| --- | --- | --- |
| APUSH | 232 questions | Period 1–9 |
| AP Gov | 257 questions | The nine required foundational documents |
| Prefix & Suffix Practice | 115 questions over 62 affixes | Difficulty and prefix/suffix focus |

**Single player** runs at your own pace: answer, read the feedback, continue.
**Multiplayer** is peer-to-peer over WebRTC — one player hosts and shares a
four-letter room code, and everyone answers the same question each round with a
shop of powerups between rounds.

Scoring is shared across all three subjects. With the timer on, a correct answer
is worth 60–100 points depending on speed; with it off, every correct answer is
worth 100. Streaks count consecutive correct answers, and your best streak per
subject is remembered locally.

## Files

```
practice.html          markup and screens
styles.css             all styling
app.js                 the game engine: selection, timing, scoring, multiplayer
questions.js           APUSH + AP Gov banks
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

After editing either bank:

```bash
node tools/validate-content.js
```

It checks that every question has exactly four distinct options, that the answer
is among them, that ids and question stems are unique, and that every affix
referenced actually exists — then prints coverage by difficulty, question type,
and affix.
