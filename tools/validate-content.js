/**
 * Content validator for the question banks.
 *
 *   node tools/validate-content.js
 *
 * Run this after editing affix-data.js or questions.js. It checks the things
 * that quietly break gameplay - a missing option, an answer that is not among
 * the options, a duplicate question - and prints a coverage report so you can
 * see which affixes and difficulties are thin before adding more content.
 * Exits non-zero if anything is wrong, so it can be wired into CI later.
 */

const path = require('path');
const root = path.join(__dirname, '..');
const { affixVocab, affixBank } = require(path.join(root, 'affix-data.js'));
const { apushBank, apGovBank } = require(path.join(root, 'questions.js'));

const errors = [];
const warnings = [];
const fail = (msg) => errors.push(msg);
const warn = (msg) => warnings.push(msg);

// --- Vocabulary -----------------------------------------------------------
const vocabIds = new Set();
const vocabByAffix = new Map();
affixVocab.forEach((entry, i) => {
  const where = `vocab[${i}] (${entry.affix})`;
  if (!entry.id) fail(`${where}: missing id`);
  if (vocabIds.has(entry.id)) fail(`${where}: duplicate id "${entry.id}"`);
  vocabIds.add(entry.id);
  if (!['prefix', 'suffix'].includes(entry.type)) fail(`${where}: bad type "${entry.type}"`);
  if (!entry.meaning) fail(`${where}: missing meaning`);
  if (!Array.isArray(entry.senses) || entry.senses.length === 0) fail(`${where}: missing senses`);
  const key = `${entry.type}:${entry.affix}`;
  if (!vocabByAffix.has(key)) vocabByAffix.set(key, []);
  vocabByAffix.get(key).push(entry);
});

// --- Affix question bank --------------------------------------------------
const seenIds = new Set();
const seenQuestions = new Map();
const affixUse = new Map();
const byDifficulty = {};
const byType = {};

affixBank.forEach((q, i) => {
  const where = `affixBank[${i}] (${q.id || 'no id'})`;

  if (!q.id) fail(`${where}: missing id`);
  if (seenIds.has(q.id)) fail(`${where}: duplicate id`);
  seenIds.add(q.id);

  ['question', 'answer', 'explanation', 'questionType', 'difficulty', 'affix', 'type'].forEach((f) => {
    if (typeof q[f] !== 'string' || !q[f].trim()) fail(`${where}: missing or empty "${f}"`);
  });

  if (!['easy', 'medium', 'hard'].includes(q.difficulty)) fail(`${where}: bad difficulty "${q.difficulty}"`);
  if (!['prefix', 'suffix', 'mixed'].includes(q.type)) fail(`${where}: bad type "${q.type}"`);

  if (!Array.isArray(q.options) || q.options.length !== 4) {
    fail(`${where}: needs exactly 4 options, has ${q.options ? q.options.length : 0}`);
  } else {
    const normalized = q.options.map((o) => String(o).trim().toLowerCase());
    if (new Set(normalized).size !== 4) fail(`${where}: duplicate options`);
    q.options.forEach((o, j) => {
      if (typeof o !== 'string' || !o.trim()) fail(`${where}: option ${j} is empty`);
    });
    if (!q.options.includes(q.answer)) fail(`${where}: answer is not one of the options`);
  }

  // Backtick spans must be balanced or the renderer will show a stray marker.
  [q.question, q.explanation, ...(q.options || [])].forEach((text) => {
    if (typeof text === 'string' && (text.match(/`/g) || []).length % 2 !== 0) {
      fail(`${where}: unbalanced backticks in "${String(text).slice(0, 50)}..."`);
    }
  });

  // The affix under test must exist in the vocabulary (except review items).
  if (q.type !== 'mixed') {
    if (!vocabByAffix.has(`${q.type}:${q.affix}`)) {
      fail(`${where}: affix "${q.affix}" (${q.type}) is not in the vocabulary`);
    }
  } else if (q.affix !== 'mixed') {
    warn(`${where}: type "mixed" but affix is "${q.affix}"`);
  }

  const stem = q.question.trim().toLowerCase();
  if (seenQuestions.has(stem)) fail(`${where}: same question text as ${seenQuestions.get(stem)}`);
  seenQuestions.set(stem, q.id);

  if (q.explanation && q.explanation.length > 260) {
    warn(`${where}: explanation is ${q.explanation.length} chars - keep it readable mid-game`);
  }

  affixUse.set(q.affix, (affixUse.get(q.affix) || 0) + 1);
  byDifficulty[q.difficulty] = (byDifficulty[q.difficulty] || 0) + 1;
  byType[q.questionType] = (byType[q.questionType] || 0) + 1;
});

// --- Legacy banks (arrays: [unit, question, correct, w1, w2, w3]) ----------
function checkLegacy(name, bank) {
  const stems = new Map();
  bank.forEach((row, i) => {
    const where = `${name}[${i}]`;
    if (!Array.isArray(row) || row.length !== 6) return fail(`${where}: expected 6 fields, got ${row.length}`);
    if (typeof row[0] !== 'number') fail(`${where}: unit id is not a number`);
    const opts = row.slice(2).map((o) => String(o).trim());
    if (new Set(opts).size !== 4) fail(`${where}: duplicate options`);
    if (opts.some((o) => !o)) fail(`${where}: empty option`);
    const stem = `${row[0]}|${String(row[1]).trim().toLowerCase()}`;
    if (stems.has(stem)) fail(`${where}: duplicates ${name}[${stems.get(stem)}]`);
    stems.set(stem, i);
  });
}
checkLegacy('apushBank', apushBank);
checkLegacy('apGovBank', apGovBank);

// --- Report ---------------------------------------------------------------
const uncovered = affixVocab
  .filter((v) => !affixUse.has(v.affix))
  .map((v) => v.display);

console.log('Affix vocabulary : %d entries (%d prefixes, %d suffixes)',
  affixVocab.length,
  affixVocab.filter((v) => v.type === 'prefix').length,
  affixVocab.filter((v) => v.type === 'suffix').length);
console.log('Affix questions  : %d', affixBank.length);
console.log('  by difficulty  : %s', JSON.stringify(byDifficulty));
console.log('  by type        : %s', JSON.stringify(byType));
console.log('  affixes tested : %d of %d distinct', affixUse.size - (affixUse.has('mixed') ? 1 : 0),
  new Set(affixVocab.map((v) => v.affix)).size);
if (uncovered.length) console.log('  never tested   : %s', uncovered.join(', '));
console.log('APUSH questions  : %d', apushBank.length);
console.log('AP Gov questions : %d', apGovBank.length);

if (warnings.length) {
  console.log('\n%d warning(s):', warnings.length);
  warnings.forEach((w) => console.log('  - ' + w));
}
if (errors.length) {
  console.log('\n%d ERROR(S):', errors.length);
  errors.forEach((e) => console.log('  - ' + e));
  process.exit(1);
}
console.log('\nAll content checks passed.');
