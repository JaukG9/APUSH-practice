/**
 * Content validator for the question banks.
 *
 *   node tools/validate-content.js
 *
 * Run this after editing affix-data.js, gov-branches-data.js or questions.js.
 * It checks the things that quietly break gameplay - a missing option, an
 * answer that is not among the options, a duplicate question - and prints a
 * coverage report so you can see which topics and difficulties are thin
 * before adding more content. Exits non-zero if anything is wrong, so it can
 * be wired into CI later.
 */

const path = require('path');
const root = path.join(__dirname, '..');
const { affixVocab, affixBank } = require(path.join(root, 'affix-data.js'));
const { govBranchesVocab, govBranchesBank } = require(path.join(root, 'gov-branches-data.js'));
const { apushBank, apGovBank } = require(path.join(root, 'questions.js'));

const errors = [];
const warnings = [];
const fail = (msg) => errors.push(msg);
const warn = (msg) => warnings.push(msg);

// --- Vocabularies ---------------------------------------------------------

/**
 * Checks a vocabulary list and returns a Set of the lookup keys a question
 * bank is allowed to reference.
 */
function checkVocab(name, list, spec) {
  const ids = new Set();
  const keys = new Set();
  list.forEach((entry, i) => {
    const where = `${name}[${i}] (${entry[spec.keyField] || 'no key'})`;
    if (!entry.id) fail(`${where}: missing id`);
    if (ids.has(entry.id)) fail(`${where}: duplicate id "${entry.id}"`);
    ids.add(entry.id);
    spec.required.forEach((field) => {
      if (typeof entry[field] !== 'string' || !entry[field].trim()) {
        fail(`${where}: missing or empty "${field}"`);
      }
    });
    Object.keys(spec.enums || {}).forEach((field) => {
      if (!spec.enums[field].includes(entry[field])) {
        fail(`${where}: bad ${field} "${entry[field]}"`);
      }
    });
    if (spec.senses && (!Array.isArray(entry.senses) || !entry.senses.length)) {
      fail(`${where}: missing senses`);
    }
    keys.add(spec.key(entry));
  });
  return keys;
}

const affixKeys = checkVocab('affixVocab', affixVocab, {
  keyField: 'affix',
  required: ['affix', 'meaning'],
  enums: { type: ['prefix', 'suffix'] },
  senses: true,
  key: (entry) => `${entry.type}:${entry.affix}`
});

const govKeys = checkVocab('govBranchesVocab', govBranchesVocab, {
  keyField: 'term',
  required: ['term', 'display', 'topic', 'meaning'],
  enums: { branch: ['congress', 'presidency', 'judiciary'] },
  key: (entry) => entry.term
});

// --- Object question banks ------------------------------------------------

/**
 * Shared checks for the object-shaped banks (affix and AP Gov branches).
 * `spec.vocabKey` maps a question to the vocabulary key it must reference,
 * or returns null for review items that deliberately span several entries.
 */
function checkObjectBank(name, bank, spec) {
  const seenIds = new Set();
  const seenQuestions = new Map();
  const coverage = { byDifficulty: {}, byType: {}, byGroup: new Map() };

  bank.forEach((q, i) => {
    const where = `${name}[${i}] (${q.id || 'no id'})`;

    if (!q.id) fail(`${where}: missing id`);
    if (seenIds.has(q.id)) fail(`${where}: duplicate id`);
    seenIds.add(q.id);

    spec.required.forEach((field) => {
      if (typeof q[field] !== 'string' || !q[field].trim()) fail(`${where}: missing or empty "${field}"`);
    });

    if (!['easy', 'medium', 'hard'].includes(q.difficulty)) fail(`${where}: bad difficulty "${q.difficulty}"`);
    Object.keys(spec.enums || {}).forEach((field) => {
      if (!spec.enums[field].includes(q[field])) fail(`${where}: bad ${field} "${q[field]}"`);
    });

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
    [q.question, q.explanation].concat(q.options || []).forEach((text) => {
      if (typeof text === 'string' && (text.match(/`/g) || []).length % 2 !== 0) {
        fail(`${where}: unbalanced backticks in "${String(text).slice(0, 50)}..."`);
      }
    });

    // The term under test must exist in the vocabulary (except review items).
    const key = spec.vocabKey(q);
    if (key !== null && !spec.vocab.has(key)) {
      fail(`${where}: "${key}" is not in the vocabulary`);
    }

    const stem = q.question.trim().toLowerCase();
    if (seenQuestions.has(stem)) fail(`${where}: same question text as ${seenQuestions.get(stem)}`);
    seenQuestions.set(stem, q.id);

    if (q.explanation && q.explanation.length > 320) {
      warn(`${where}: explanation is ${q.explanation.length} chars - keep it readable mid-game`);
    }

    const group = spec.group(q);
    coverage.byGroup.set(group, (coverage.byGroup.get(group) || 0) + 1);
    coverage.byDifficulty[q.difficulty] = (coverage.byDifficulty[q.difficulty] || 0) + 1;
    coverage.byType[q.questionType] = (coverage.byType[q.questionType] || 0) + 1;
  });

  return coverage;
}

const affixCoverage = checkObjectBank('affixBank', affixBank, {
  vocab: affixKeys,
  required: ['question', 'answer', 'explanation', 'questionType', 'difficulty', 'affix', 'type'],
  enums: { type: ['prefix', 'suffix', 'mixed'] },
  vocabKey: (q) => (q.type === 'mixed' ? null : `${q.type}:${q.affix}`),
  group: (q) => q.affix
});

const govCoverage = checkObjectBank('govBranchesBank', govBranchesBank, {
  vocab: govKeys,
  required: ['question', 'answer', 'explanation', 'questionType', 'difficulty', 'term', 'branch', 'topic'],
  enums: { branch: ['congress', 'presidency', 'judiciary', 'mixed'] },
  vocabKey: (q) => (q.term === 'mixed' ? null : q.term),
  group: (q) => q.branch
});

// Every filterable combination needs questions or that filter picks up an
// empty pool and the setup screen refuses to start.
['congress', 'presidency', 'judiciary', 'mixed'].forEach((branch) => {
  ['easy', 'medium', 'hard'].forEach((difficulty) => {
    const n = govBranchesBank.filter((q) => q.branch === branch && q.difficulty === difficulty).length;
    if (!n) warn(`govBranchesBank: no ${difficulty} questions for "${branch}"`);
  });
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
const groupCounts = (coverage) => JSON.stringify(Object.fromEntries(
  Array.from(coverage.byGroup.entries()).sort((a, b) => b[1] - a[1])
));

const uncoveredAffixes = affixVocab
  .filter((v) => !affixCoverage.byGroup.has(v.affix))
  .map((v) => v.display);

const testedTerms = new Set(govBranchesBank.map((q) => q.term));
const untestedTerms = govBranchesVocab
  .filter((v) => !testedTerms.has(v.term))
  .map((v) => v.display);

console.log('Affix vocabulary : %d entries (%d prefixes, %d suffixes)',
  affixVocab.length,
  affixVocab.filter((v) => v.type === 'prefix').length,
  affixVocab.filter((v) => v.type === 'suffix').length);
console.log('Affix questions  : %d', affixBank.length);
console.log('  by difficulty  : %s', JSON.stringify(affixCoverage.byDifficulty));
console.log('  by type        : %s', JSON.stringify(affixCoverage.byType));
console.log('  affixes tested : %d of %d distinct',
  affixCoverage.byGroup.size - (affixCoverage.byGroup.has('mixed') ? 1 : 0),
  new Set(affixVocab.map((v) => v.affix)).size);
if (uncoveredAffixes.length) console.log('  never tested   : %s', uncoveredAffixes.join(', '));

console.log('\nAP Gov 2.3-2.8 vocabulary : %d key terms', govBranchesVocab.length);
console.log('AP Gov 2.3-2.8 questions  : %d', govBranchesBank.length);
console.log('  by difficulty  : %s', JSON.stringify(govCoverage.byDifficulty));
console.log('  by type        : %s', JSON.stringify(govCoverage.byType));
console.log('  by institution : %s', groupCounts(govCoverage));
console.log('  terms tested   : %d of %d', govBranchesVocab.length - untestedTerms.length, govBranchesVocab.length);
if (untestedTerms.length) console.log('  never tested   : %s', untestedTerms.join(', '));

console.log('\nAPUSH questions  : %d', apushBank.length);
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
