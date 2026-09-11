/* =========================================================================
   AP Practice - game engine
   -------------------------------------------------------------------------
   One engine drives every subject. A subject supplies its metadata (title,
   filter groups, powerup names) and a question bank; everything below is
   shared - selection, timing, scoring, feedback, results and multiplayer.

   Question banks live in questions.js (APUSH / AP Gov), gov-branches-data.js
   (AP Gov 2.3-2.8) and affix-data.js (Prefix & Suffix). No question text
   appears in this file.
   ========================================================================= */

'use strict';

(function () {

  // =======================================================================
  // CONFIG
  // =======================================================================

  // The powerup economy is defined in match.js, because the host has to be
  // able to enforce it; this file only needs the names and the ordering.
  const POWERUP_ORDER = Match.POWERUP_ORDER;
  const MAX_POWERUPS_PER_ROUND = Match.MAX_BUYS_PER_ROUND;
  const REVEAL_SECONDS = Math.round(Match.REVEAL_MS / 1000);

  // How a session is described back to the player after answering.
  const CATEGORY_LABELS = { prefix: 'Prefix', suffix: 'Suffix', mixed: 'Mixed Review' };
  const BRANCH_LABELS = {
    congress: 'Congress', presidency: 'The Presidency',
    judiciary: 'The Judiciary', mixed: 'Cross-Branch'
  };
  const DIFFICULTY_LABELS = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };
  const DIFFICULTY_ORDER = { easy: 0, medium: 1, hard: 2 };

  /** Every object bank filters on difficulty; only the hints differ. */
  function difficultyFilter(hints) {
    return {
      id: 'difficulty', label: 'Difficulty', field: 'difficulty',
      options: ['easy', 'medium', 'hard'].map((value) => ({
        value: value, label: DIFFICULTY_LABELS[value], title: hints[value]
      }))
    };
  }

  /** Shared with both legacy subjects, whose setup screens read identically. */
  const LEGACY_BRIEF = [
    'Choose the units you want to study, how many questions you want, and whether the timer is on.',
    'You will see the correct answer immediately after each question, then move on when you are ready.'
  ];

  const APUSH_PERIODS = [
    [1, 'Per 1', '1491-1607'], [2, 'Per 2', '1607-1754'], [3, 'Per 3', '1754-1800'],
    [4, 'Per 4', '1800-1848'], [5, 'Per 5', '1844-1877'], [6, 'Per 6', '1865-1898'],
    [7, 'Per 7', '1890-1945'], [8, 'Per 8', '1945-1980'], [9, 'Per 9', '1980-present']
  ];

  const APGOV_DOCUMENTS = [
    [1, '1. Dec of Ind.', 'Declaration of Independence'],
    [2, '2. Articles', 'Articles of Confederation'],
    [3, '3. Brutus 1', 'Brutus No. 1'],
    [4, '4. Fed 10', 'Federalist No. 10'],
    [5, '5. Fed 70', 'Federalist No. 70'],
    [6, '6. Fed 51', 'Federalist No. 51'],
    [7, '7. Fed 78', 'Federalist No. 78'],
    [8, '8. Constitution', 'The Constitution'],
    [9, '9. Birmingham', 'Letter from Birmingham Jail']
  ];

  const GOV_BRANCHES = [
    ['congress', 'Congress', 'Topic 2.3: partisanship, voting models, redistricting and gerrymandering'],
    ['presidency', 'The Presidency', 'Topics 2.4-2.7: presidential powers, the checks on them, and communication'],
    ['judiciary', 'The Judiciary', 'Topic 2.8: the federal courts, Federalist No. 78, and judicial review'],
    ['mixed', 'Cross-Branch', 'Items that turn on how two or three institutions check each other']
  ];

  const SUBJECTS = {
    APUSH: {
      title: 'APUSH Practice',
      blurb: 'Multiple choice review across the nine College Board periods.',
      format: 'legacy',
      unitLabel: 'Period',
      brief: LEGACY_BRIEF,
      getBank: () => (typeof apushBank === 'undefined' ? null : apushBank),
      filterGroups: [{
        id: 'unit',
        label: 'Select Periods / Units',
        selectAll: true,
        defaultOn: false,
        options: APUSH_PERIODS.map(([id, short, span]) => ({
          value: String(id), label: short, title: 'Period ' + id + ' (' + span + ')',
          badge: 'Period ' + id + ' · ' + span
        }))
      }],
      powerups: {
        ELIM2: 'Abraham Lincoln', AUTOCORRECT: 'George Washington', DOUBLE: 'Manifest Destiny',
        BLOCK: 'Monroe Doctrine', GAMBLE: 'Gilded Age', NUKE: 'Trustbusting',
        STEAL: 'Spoils System', ZERO: 'Embargo Act'
      }
    },

    APGOV: {
      title: 'AP Gov Practice',
      blurb: 'Questions drawn from the nine required foundational documents.',
      format: 'legacy',
      unitLabel: 'Document',
      brief: LEGACY_BRIEF,
      getBank: () => (typeof apGovBank === 'undefined' ? null : apGovBank),
      filterGroups: [{
        id: 'unit',
        label: 'Select Foundational Documents',
        selectAll: true,
        defaultOn: false,
        options: APGOV_DOCUMENTS.map(([id, short, name]) => ({
          value: String(id), label: short, title: name, badge: name
        }))
      }],
      powerups: {
        ELIM2: 'Executive Privilege', AUTOCORRECT: 'Judicial Review', DOUBLE: 'Landslide Election',
        BLOCK: 'Filibuster', GAMBLE: 'Swing State', NUKE: 'Impeachment',
        STEAL: 'Pork Barrel', ZERO: 'Gridlock'
      }
    },

    AFFIX: {
      title: 'Prefix & Suffix Practice',
      blurb: 'Learn what word parts mean, then use them to decode unfamiliar words.',
      format: 'tagged',
      unitLabel: 'Level',
      getBank: () => (typeof affixBank === 'undefined' ? null : affixBank),
      emptyMessage: 'Select at least one difficulty and one focus.',
      // A session draws round-robin across affixes so no single word part
      // dominates, then spreads question styles out inside each difficulty.
      groupBy: (q) => q.affix || 'mixed',
      spreadBy: (q) => q.questionType,
      badges: (q) => [
        { text: DIFFICULTY_LABELS[q.difficulty] || q.difficulty, className: 'level-' + q.difficulty },
        { text: CATEGORY_LABELS[q.type] || q.type }
      ],
      howToPlayNote: 'A prefix goes on the front of a word and a suffix goes on the end. Both change what the word means, so knowing a few dozen of them lets you decode words you have never seen. Questions get harder as a session goes on.',
      brief: [
        'Every question is multiple choice with one clearly best answer. Read the affix, not just the word: distractors are usually real affixes with a different meaning.',
        'Pick your difficulty and focus below. A session mixes prefixes, suffixes and question styles, and ramps from easier items to harder ones.',
        'After you answer you will see why the answer is right, so take a second to read it before moving on.'
      ],
      filterGroups: [
        difficultyFilter({
          easy: 'Name the meaning of an affix directly',
          medium: 'Read an affix inside a familiar word',
          hard: 'Decode unfamiliar words and separate lookalikes'
        }),
        {
          id: 'category',
          label: 'Focus',
          field: 'type',
          options: [
            { value: 'prefix', label: 'Prefixes', title: 'Word parts added to the front' },
            { value: 'suffix', label: 'Suffixes', title: 'Word parts added to the end' },
            { value: 'mixed', label: 'Mixed Review', title: 'Items that compare several affixes' }
          ]
        }
      ],
      powerups: {
        ELIM2: 'Semi-Reveal', AUTOCORRECT: 'Autocorrect', DOUBLE: 'Multiplier',
        BLOCK: 'Antibody', GAMBLE: 'Ultra Wager', NUKE: 'Demotion',
        STEAL: 'Abduction', ZERO: 'Nullify'
      }
    },

    APGOV_BRANCHES: {
      title: 'AP Gov: 2.3-2.8',
      blurb: 'Congressional behavior, the presidency and the courts, and how they check each other.',
      format: 'tagged',
      unitLabel: 'Institution',
      getBank: () => (typeof govBranchesBank === 'undefined' ? null : govBranchesBank),
      emptyMessage: 'Select at least one institution and one difficulty.',
      // Round-robin across the three institutions so a session never turns
      // into twenty questions about committees.
      groupBy: (q) => q.branch || 'mixed',
      spreadBy: (q) => q.questionType,
      badges: (q) => [
        { text: DIFFICULTY_LABELS[q.difficulty] || q.difficulty, className: 'level-' + q.difficulty },
        { text: BRANCH_LABELS[q.branch] || q.branch },
        { text: 'Topic ' + q.topic }
      ],
      howToPlayNote: 'These topics are about how the three branches actually work on each other: how congressional behavior is shaped by elections and partisanship, what a president can do without Congress, and what a court can undo. Questions get harder as a session goes on, and many ask you to recognize a concept in a real situation rather than define it.',
      brief: [
        'Every question is multiple choice with one clearly best answer, drawn from AMSCO Topics 2.3 through 2.8.',
        'Pick the institutions you want to study and how hard you want the questions. Cross-Branch items ask you to compare two or three institutions at once.',
        'Distractors are usually real terms from the same unit, so read carefully: a delegate is not a trustee, and an executive order is not an executive agreement. The feedback after each question explains why.'
      ],
      filterGroups: [
        {
          id: 'branch',
          label: 'Select Institutions',
          field: 'branch',
          selectAll: true,
          options: GOV_BRANCHES.map(([value, label, title]) => ({
            value: value, label: label, title: title
          }))
        },
        difficultyFilter({
          easy: 'Name a term or identify a basic power',
          medium: 'Apply a concept or tell two similar ones apart',
          hard: 'Reason through a case, a document, or a real scenario'
        })
      ],
      powerups: {
        ELIM2: 'Cloture', AUTOCORRECT: 'Judicial Review', DOUBLE: 'Omnibus',
        BLOCK: 'Executive Privilege', GAMBLE: 'Swing District', NUKE: 'Veto',
        STEAL: 'Pork Barrel', ZERO: 'Filibuster'
      }
    }
  };

  const STORE_KEY = 'ap-practice.v1';
  const RECENT_MEMORY = 60; // question ids kept so back-to-back sessions differ

  // =======================================================================
  // STATE
  // =======================================================================

  const state = {
    subject: 'APUSH',
    playerName: 'Player',

    questions: [],
    index: 0,
    score: 0,
    correctCount: 0,
    answeredCount: 0,
    streak: 0,
    bestStreak: 0,
    misses: [],

    // per-question. `answered` is tracked separately from `myAnswer` because a
    // timeout is a real submission whose value happens to be null.
    answered: false,
    myAnswer: null,
    lockedTime: 0,
    roundResolved: false,

    useTimer: true,
    timerSeconds: 20,
    timerEndsAt: 0,
    rafId: null,
    expiryTimeout: null,
    breakInterval: null,
    advanceTimeout: null,

    lastSettings: null,  // reused by "Play Again" so a rematch keeps your choices

    total: 0,            // questions in this session; a guest learns it from the host
    timerTotal: 0,
    onTimerExpired: null,
    boardTimer: null,

    // multiplayer. The host additionally owns `match`; everyone renders from
    // `snap`, and `shownRound` / `shownPhase` are what the screen currently
    // shows, so a repeated snapshot does not redraw the question underneath a
    // player who is mid-answer.
    isMultiplayer: false,
    isHost: false,
    net: null,
    match: null,
    myId: null,
    snap: null,
    shownRound: -1,
    shownPhase: null,
    hostTicker: null,
    roomCode: null
  };

  // =======================================================================
  // SMALL HELPERS
  // =======================================================================

  const $ = (id) => document.getElementById(id);
  const subject = () => SUBJECTS[state.subject];
  const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));

  /** Fisher-Yates. Array.prototype.sort with a random comparator is biased. */
  function shuffle(list) {
    const out = list.slice();
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = out[i]; out[i] = out[j]; out[j] = tmp;
    }
    return out;
  }

  /**
   * Renders text into an element, turning `backtick spans` into <code>.
   * Everything goes through text nodes, so question data - including data
   * relayed by another player in a multiplayer match - can never inject HTML.
   */
  function renderText(target, text) {
    target.textContent = '';
    const parts = String(text == null ? '' : text).split('`');
    parts.forEach((part, i) => {
      if (!part) return;
      if (i % 2 === 1) {
        const code = document.createElement('code');
        code.textContent = part;
        target.appendChild(code);
      } else {
        target.appendChild(document.createTextNode(part));
      }
    });
    return target;
  }

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  // --- persistence (never fatal: private browsing can throw) --------------
  function readStore() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; }
  }
  function writeStore(patch) {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(Object.assign(readStore(), patch)));
    } catch (e) { /* storage unavailable - preferences simply will not persist */ }
  }

  function showToast(msg, type) {
    const container = $('toast-container');
    const toast = el('div', 'toast' + (type ? ' ' + type : ''), msg);
    container.appendChild(toast);
    while (container.children.length > 4) container.removeChild(container.firstChild);
    setTimeout(() => toast.remove(), 3000);
  }

  function setError(id, message) {
    const node = $(id);
    if (node) node.textContent = message || '';
  }

  // =======================================================================
  // NAVIGATION
  // =======================================================================

  function showScreen(screenId) {
    document.querySelectorAll('.app-screen').forEach((s) => s.classList.toggle('active', s.id === screenId));
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  // =======================================================================
  // SUBJECT UI
  // =======================================================================

  function applySubject() {
    state.subject = $('subject-dropdown').value;
    const config = subject();

    document.title = config.title;
    $('main-title').textContent = config.title;
    $('subject-blurb').textContent = config.blurb;
    renderHowToPlay();
    renderFilterGroups();
    renderBrief();
    writeStore({ subject: state.subject });
  }

  function renderHowToPlay() {
    const config = subject();
    const body = $('how-to-play-body');
    body.textContent = '';

    const scoring = el('p');
    scoring.appendChild(el('strong', null, 'Scoring: '));
    scoring.appendChild(document.createTextNode(
      'With the timer on, a faster correct answer is worth more (60-100 points). With it off, every correct answer is worth 100. Wrong answers score nothing, and your streak counts consecutive correct answers.'
    ));
    body.appendChild(scoring);

    if (config.howToPlayNote) {
      const intro = el('p');
      intro.appendChild(el('strong', null, 'This mode: '));
      intro.appendChild(document.createTextNode(config.howToPlayNote));
      body.appendChild(intro);
    }

    const shop = el('p');
    shop.appendChild(el('strong', null, 'The Shop (multiplayer only): '));
    shop.appendChild(document.createTextNode(
      'After each question you get about ' + REVEAL_SECONDS +
      ' seconds to read the explanation, check the standings and spend points. The host can skip ahead.'));
    body.appendChild(shop);

    const list = el('ul');
    POWERUP_ORDER.forEach((key) => {
      const item = el('li');
      item.appendChild(el('span', 'powerup-name', config.powerups[key]));
      item.appendChild(document.createTextNode(
        ' (Cost: ' + Match.POWERUPS[key].cost + ') - ' + Match.POWERUPS[key].blurb + '.'
      ));
      list.appendChild(item);
    });
    const limit = el('li');
    limit.style.color = 'var(--rust)';
    limit.appendChild(el('strong', null, 'Limit: '));
    limit.appendChild(document.createTextNode(MAX_POWERUPS_PER_ROUND + ' powerups per round.'));
    list.appendChild(limit);
    body.appendChild(list);
  }

  /** The short brief shown above the options on the setup screen. */
  function renderBrief() {
    const brief = $('sp-brief');
    brief.textContent = '';
    brief.appendChild(el('h3', null, subject().title));

    (subject().brief || LEGACY_BRIEF).forEach((line) => brief.appendChild(el('p', null, line)));
  }

  function renderFilterGroups() {
    const host = $('filter-groups');
    host.textContent = '';

    subject().filterGroups.forEach((group) => {
      const section = el('div', 'filter-group');
      section.appendChild(el('h4', null, group.label));

      const grid = el('div', 'filter-grid');
      grid.setAttribute('role', 'group');
      grid.setAttribute('aria-label', group.label);
      grid.dataset.groupId = group.id;

      group.options.forEach((option) => {
        const btn = el('button', null, option.label);
        btn.type = 'button';
        btn.dataset.value = option.value;
        if (option.title) btn.title = option.title;
        // Most filters start switched on; the legacy unit pickers start empty
        // so the player consciously chooses what to study, as before.
        const on = group.defaultOn !== false;
        btn.setAttribute('aria-pressed', String(on));
        btn.addEventListener('click', () => {
          btn.setAttribute('aria-pressed', btn.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
          updatePoolHint();
        });
        grid.appendChild(btn);
      });

      section.appendChild(grid);

      if (group.selectAll) {
        const all = el('button', null, 'Select All');
        all.type = 'button';
        all.addEventListener('click', () => {
          const buttons = Array.from(grid.querySelectorAll('button'));
          const turnOn = buttons.some((b) => b.getAttribute('aria-pressed') !== 'true');
          buttons.forEach((b) => b.setAttribute('aria-pressed', String(turnOn)));
          all.textContent = turnOn ? 'Clear All' : 'Select All';
          updatePoolHint();
        });
        section.appendChild(all);
      }

      host.appendChild(section);
    });

    updatePoolHint();
  }

  function readFilters() {
    const filters = {};
    document.querySelectorAll('#filter-groups .filter-grid').forEach((grid) => {
      filters[grid.dataset.groupId] = Array.from(grid.querySelectorAll('button[aria-pressed="true"]'))
        .map((b) => b.dataset.value);
    });
    return filters;
  }

  function updatePoolHint() {
    const pool = matchingQuestions(readFilters());
    const hint = $('pool-hint');
    if (!hint) return;
    hint.textContent = pool.length ? pool.length + ' available' : 'none selected';
    const count = $('q-count');
    if (count) count.max = String(Math.max(1, pool.length));
  }

  // =======================================================================
  // QUESTION SELECTION
  // =======================================================================

  /** Everything in the current subject's bank that passes the filters. */
  function matchingQuestions(filters) {
    const config = subject();
    const bank = config.getBank();
    if (!Array.isArray(bank)) return [];

    if (config.format === 'legacy') {
      const units = new Set(filters.unit || []);
      if (!units.size) return [];
      return bank.filter((row) => Array.isArray(row) && row.length === 6 && units.has(String(row[0])));
    }

    // Object banks declare which question field each filter group reads, so
    // one pass covers difficulty, focus, institution or anything added later.
    const groups = config.filterGroups.map((group) => ({
      field: group.field,
      chosen: new Set(filters[group.id] || [])
    }));
    if (groups.some((group) => !group.chosen.size)) return [];

    return bank.filter((q) =>
      q && Array.isArray(q.options) && q.options.length === 4 &&
      groups.every((group) => group.chosen.has(q[group.field]))
    );
  }

  /** Normalises a bank entry into the shape the quiz screen renders. */
  function normalize(entry) {
    const config = subject();
    if (config.format === 'legacy') {
      const option = config.filterGroups[0].options.find((o) => o.value === String(entry[0]));
      return {
        id: config.unitLabel + entry[0] + '|' + entry[1],
        badges: [{ text: option ? option.badge : config.unitLabel + ' ' + entry[0] }],
        question: entry[1],
        options: shuffle([entry[2], entry[3], entry[4], entry[5]]),
        answer: entry[2],
        explanation: null
      };
    }
    return {
      id: entry.id,
      badges: config.badges(entry),
      question: entry.question,
      options: shuffle(entry.options),
      answer: entry.answer,
      explanation: entry.explanation || null
    };
  }

  /** Greedy reorder so the same key does not appear twice in a row. */
  function spread(items, keyOf) {
    const remaining = items.slice();
    const out = [];
    let lastKey = null;
    while (remaining.length) {
      let pick = remaining.findIndex((item) => keyOf(item) !== lastKey);
      if (pick === -1) pick = 0;
      const chosen = remaining.splice(pick, 1)[0];
      lastKey = keyOf(chosen);
      out.push(chosen);
    }
    return out;
  }

  /**
   * Builds one session.
   *
   * Legacy banks are simply shuffled. An object bank is drawn round-robin
   * across whatever the subject groups by - an affix, an institution - so no
   * single topic dominates, preferring questions the player has not seen
   * recently, then ordered easy -> medium -> hard with question types spread
   * out so consecutive items do not feel identical.
   */
  function buildSession(filters, limit) {
    const config = subject();
    const pool = matchingQuestions(filters);
    if (!pool.length) return [];

    if (config.format === 'legacy') {
      return shuffle(pool).slice(0, limit).map(normalize);
    }

    const recent = new Set(readStore().recent || []);
    const groups = new Map();
    shuffle(pool).forEach((q) => {
      const key = config.groupBy(q);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(q);
    });
    // Inside each group, unseen questions come first.
    groups.forEach((list) => list.sort((a, b) => (recent.has(a.id) ? 1 : 0) - (recent.has(b.id) ? 1 : 0)));

    const order = shuffle(Array.from(groups.keys()));
    const picked = [];
    let exhausted = false;
    while (picked.length < limit && !exhausted) {
      exhausted = true;
      for (const key of order) {
        if (picked.length >= limit) break;
        const list = groups.get(key);
        if (list && list.length) { picked.push(list.shift()); exhausted = false; }
      }
    }

    const ramped = [];
    ['easy', 'medium', 'hard'].forEach((level) => {
      const band = picked.filter((q) => q.difficulty === level);
      ramped.push.apply(ramped, spread(shuffle(band), config.spreadBy));
    });
    // Anything with an unexpected difficulty still gets played rather than lost.
    picked.filter((q) => DIFFICULTY_ORDER[q.difficulty] === undefined).forEach((q) => ramped.push(q));

    rememberQuestions(ramped);
    return ramped.map(normalize);
  }

  function rememberQuestions(list) {
    const previous = readStore().recent || [];
    const ids = list.map((q) => q.id).concat(previous);
    writeStore({ recent: ids.slice(0, RECENT_MEMORY) });
  }

  // =======================================================================
  // SETUP SCREENS
  // =======================================================================

  function mountSettings(targetId) {
    const module = $('game-settings-module');
    module.classList.remove('hidden');
    $(targetId).appendChild(module);
    updatePoolHint();
  }

  function readSettings(errorId) {
    const config = subject();
    if (!config.getBank()) {
      setError(errorId, 'Question data failed to load. Check that the content files next to practice.html are all present, then reload.');
      return null;
    }

    const filters = readFilters();
    const pool = matchingQuestions(filters);
    if (!pool.length) {
      setError(errorId, config.emptyMessage
        || 'Select at least one ' + config.unitLabel.toLowerCase() + ' to study.');
      return null;
    }

    const requested = parseInt($('q-count').value, 10);
    const count = clamp(isNaN(requested) ? 10 : requested, 1, pool.length);
    if (!isNaN(requested) && requested > pool.length) {
      showToast('Only ' + pool.length + ' questions match - using all of them.');
    }
    $('q-count').value = String(count);

    const useTimer = $('timer-toggle').checked;
    const seconds = clamp(parseInt($('timer-seconds').value, 10) || 20, 5, 300);
    $('timer-seconds').value = String(seconds);

    setError(errorId, '');
    writeStore({ count: count, useTimer: useTimer, seconds: seconds });
    return { filters: filters, count: count, useTimer: useTimer, seconds: seconds };
  }

  function requireName() {
    const value = $('player-name-input').value.trim();
    if (!value) {
      setError('name-error', 'Enter a name so other players can see your score.');
      $('player-name-input').focus();
      return false;
    }
    setError('name-error', '');
    state.playerName = value;
    writeStore({ name: value });
    return true;
  }

  function startSinglePlayer() {
    const settings = readSettings('sp-error');
    if (!settings) return;

    state.questions = buildSession(settings.filters, settings.count);
    if (!state.questions.length) return setError('sp-error', 'No questions matched those settings.');

    state.isMultiplayer = false;
    state.isHost = false;
    state.useTimer = settings.useTimer;
    state.timerSeconds = settings.seconds;
    state.lastSettings = settings;
    startSoloGame();
  }

  // =======================================================================
  // GAME FLOW - SINGLE PLAYER
  // =======================================================================
  //
  // Solo keeps its own tally because there is nobody to disagree with. A
  // multiplayer round is decided by the host instead, further down.

  function startSoloGame() {
    state.isMultiplayer = false;
    state.isHost = false;
    state.index = 0;
    state.total = state.questions.length;
    state.score = 0;
    state.correctCount = 0;
    state.answeredCount = 0;
    state.streak = 0;
    state.bestStreak = 0;
    state.misses = [];

    document.body.dataset.mode = 'solo';
    $('chip-players-connected').classList.add('hidden');
    $('chip-rank').classList.add('hidden');
    $('answer-tracker').classList.add('hidden');
    $('shop-container').style.display = 'none';
    $('timer-wrapper').style.display = state.useTimer ? 'block' : 'none';
    $('keyboard-hint').textContent = 'Keyboard: press 1-4 to answer, Enter to continue.';
    closeBoard();

    showScreen('screen-quiz');
    loadSoloQuestion();
  }

  function loadSoloQuestion() {
    if (state.index >= state.questions.length) return endSoloGame();

    state.answered = false;
    state.myAnswer = null;
    state.roundResolved = false;

    renderQuestion(state.questions[state.index], { onPick: soloPick });
    updateStats();
    startTimer(state.timerSeconds * 1000, state.timerSeconds * 1000, soloTimeout);
  }

  function soloPick(option, btn) {
    if (state.answered) return;
    state.answered = true;
    state.myAnswer = option;
    state.lockedTime = remainingTime();
    stopTimer();
    lockOptions();
    if (btn) btn.classList.add('selected');
    resolveSoloRound();
  }

  function soloTimeout() {
    if (state.answered) return;
    state.answered = true;
    state.myAnswer = null;
    state.lockedTime = 0;
    lockOptions();
    resolveSoloRound();
  }

  function resolveSoloRound() {
    if (state.roundResolved) return;
    state.roundResolved = true;
    stopTimer();

    const question = state.questions[state.index];
    const correctAnswer = question.answer;
    const wasCorrect = state.myAnswer === correctAnswer;
    const timedOut = state.myAnswer === null;

    state.answeredCount++;
    if (wasCorrect) {
      let earned = 100;
      if (state.useTimer) earned = 60 + Math.floor((state.lockedTime / (state.timerSeconds * 1000)) * 40);
      state.score += earned;
      state.correctCount++;
      state.streak++;
      if (state.streak > state.bestStreak) state.bestStreak = state.streak;
    } else {
      state.streak = 0;
      recordMiss(question.question, correctAnswer, timedOut ? null : state.myAnswer, question.explanation);
    }

    paintAnswers(correctAnswer);
    showFeedback(question.question, question.explanation, correctAnswer, wasCorrect, timedOut);
    updateStats();

    const next = $('btn-next');
    next.textContent = state.index + 1 >= state.questions.length ? 'See Results' : 'Next Question';
    next.classList.remove('hidden');
    next.focus();
  }

  function nextSoloQuestion() {
    state.index++;
    loadSoloQuestion();
  }

  // =======================================================================
  // SHARED QUIZ RENDERING
  // =======================================================================

  /**
   * Paints one question. Both modes come through here; what differs is who
   * owns the answer key - this tab in solo, the host in a match - and so who
   * decides what a click means. `eliminate` arrives from the host in a match,
   * because a client able to work out which options are wrong would also know
   * which one is right.
   */
  function renderQuestion(question, opts) {
    $('waiting-msg').classList.add('hidden');
    $('feedback-panel').classList.add('hidden');
    $('btn-next').classList.add('hidden');

    const meta = $('question-meta');
    meta.textContent = '';
    (question.badges || []).forEach((badge) => {
      meta.appendChild(el('span', 'unit-badge ' + (badge.className || ''), badge.text));
    });

    renderText($('question-text'), question.question);

    const grid = $('options-grid');
    grid.textContent = '';
    grid.classList.remove('locked');

    const eliminated = opts.eliminate || [];
    question.options.forEach((option, i) => {
      const btn = el('button', 'option-btn');
      btn.type = 'button';
      btn.dataset.value = option;
      btn.appendChild(el('span', 'key', String.fromCharCode(65 + i)));
      btn.appendChild(renderText(el('span', 'label'), option));
      if (eliminated.indexOf(i) !== -1) btn.classList.add('eliminated');
      btn.addEventListener('click', () => opts.onPick(option, btn));
      grid.appendChild(btn);
    });

    if (opts.locked) lockOptions(opts.chosen);
  }

  /** Freezes the options, optionally re-marking what this player picked. */
  function lockOptions(chosen) {
    const grid = $('options-grid');
    grid.classList.add('locked');
    grid.querySelectorAll('.option-btn').forEach((b) => {
      b.disabled = true;
      if (chosen != null && b.dataset.value === chosen) b.classList.add('selected');
    });
  }

  function remainingTime() {
    if (!state.useTimer) return 0;
    return Math.max(0, state.timerEndsAt - performance.now());
  }

  function stopTimer() {
    if (state.rafId !== null) { cancelAnimationFrame(state.rafId); state.rafId = null; }
    clearTimeout(state.expiryTimeout);
    state.expiryTimeout = null;
    state.onTimerExpired = null;
  }

  /**
   * Two clocks on purpose. A timeout owns expiry because it keeps running when
   * the tab is in the background; requestAnimationFrame only paints the bar,
   * and browsers stop calling it on hidden tabs. Elapsed time is always read
   * from performance.now(), so a backgrounded tab can never gain extra time.
   *
   * `remaining` is separate from `total` so a match client can start the bar
   * partway down: the deadline belongs to the host, and someone who joined
   * late or reconnected mid-question picks the clock up wherever it already is.
   */
  function startTimer(total, remaining, onExpire) {
    stopTimer();
    if (!state.useTimer || total <= 0) return;

    state.timerTotal = total;
    state.onTimerExpired = onExpire || null;

    const bar = $('timer-bar');
    const text = $('timer-text');
    bar.className = 'timer-fill';
    armTimer(remaining);

    let lastShown = -1;
    const paint = () => {
      const left = remainingTime();
      bar.style.transform = 'scaleX(' + (left / state.timerTotal) + ')';
      const tenths = Math.ceil(left / 100);
      if (tenths !== lastShown) { text.textContent = (tenths / 10).toFixed(1) + 's'; lastShown = tenths; }
      if (left <= state.timerTotal * 0.25) bar.classList.add('warning');
      state.rafId = left > 0 ? requestAnimationFrame(paint) : null;
    };
    state.rafId = requestAnimationFrame(paint);
  }

  function armTimer(remaining) {
    const left = Math.max(0, remaining);
    state.timerEndsAt = performance.now() + left;
    clearTimeout(state.expiryTimeout);
    state.expiryTimeout = setTimeout(() => {
      const expired = state.onTimerExpired;
      state.onTimerExpired = null;
      if (expired) expired();
    }, left);
  }

  /**
   * Nudges the bar back onto the host's deadline without restarting it. Called
   * on every snapshot, so latency corrects itself continuously instead of
   * accumulating over a match.
   */
  function syncTimer(remaining) {
    if (!state.useTimer) return;
    if (Math.abs(remaining - remainingTime()) > 300) armTimer(remaining);
  }

  function paintAnswers(correctAnswer) {
    $('options-grid').querySelectorAll('.option-btn').forEach((b) => {
      b.disabled = true;
      b.classList.remove('eliminated');
      if (b.dataset.value === correctAnswer) b.classList.add('correct-ans');
      else if (b.classList.contains('selected')) b.classList.add('wrong-ans');
    });
  }

  function showFeedback(questionText, explanation, correctAnswer, wasCorrect, timedOut, verdict) {
    const panel = $('feedback-panel');
    panel.textContent = '';
    panel.className = 'feedback-panel ' + (wasCorrect ? 'correct' : 'wrong');

    panel.appendChild(el('span', 'feedback-verdict',
      verdict || (wasCorrect ? 'Correct' : (timedOut ? "Time's up" : 'Not quite'))));

    if (!wasCorrect) {
      const line = el('p');
      line.appendChild(document.createTextNode('The answer is: '));
      const strong = el('strong');
      renderText(strong, correctAnswer);
      line.appendChild(strong);
      panel.appendChild(line);
    }
    if (explanation) renderText(panel.appendChild(el('p')), explanation);
    panel.classList.remove('hidden');
  }

  function recordMiss(questionText, answer, chosen, explanation) {
    state.misses.push({
      question: questionText, answer: answer, chosen: chosen, explanation: explanation
    });
  }

  function updateStats() {
    const total = state.total || state.questions.length || 1;

    $('chip-score').textContent = state.isMultiplayer
      ? 'Score: ' + state.score
      : 'Correct: ' + state.correctCount + ' / ' + state.answeredCount;

    const streakChip = $('chip-streak');
    streakChip.textContent = 'Streak: ' + state.streak;
    streakChip.dataset.cold = String(state.streak === 0);

    const shown = Math.min(state.index + 1, total);
    $('chip-remaining').textContent = 'Q ' + shown + ' / ' + total;
    $('progress-fill').style.width = ((state.index + (state.roundResolved ? 1 : 0)) / total * 100) + '%';
  }

  // =======================================================================
  // RESULTS
  // =======================================================================

  function endSoloGame() {
    showResults(null);
  }

  function showResults(standings) {
    stopTimer();
    clearTimeout(state.advanceTimeout);
    closeBoard();
    showScreen('screen-results');

    const answered = state.answeredCount || state.total || state.questions.length || 1;
    const accuracy = Math.round((state.correctCount / answered) * 100);

    const outcome = $('final-outcome');
    const summary = $('final-summary');
    const board = $('final-lb-container');

    if (standings) {
      renderFinalStandings(board, standings);
      board.classList.remove('hidden');
      const place = standings.map((p) => p.id).indexOf(state.myId) + 1;
      const won = place === 1 && standings.length > 1;
      outcome.textContent = standings.length < 2 ? 'Match Over' : (won ? 'Victory' : 'Good Game');
      outcome.style.color = won ? 'var(--correct)' : 'var(--navy)';
      summary.textContent = subject().title + ' - ' +
        (place ? ordinal(place) + ' of ' + standings.length : 'match complete') +
        ', ' + state.correctCount + ' of ' + answered + ' correct';
    } else {
      board.classList.add('hidden');
      outcome.textContent = gradeFor(accuracy);
      outcome.style.color = accuracy >= 70 ? 'var(--correct)' : accuracy >= 50 ? 'var(--sepia-dk)' : 'var(--rust)';
      summary.textContent = subject().title + ' - ' + state.correctCount + ' of ' + answered + ' correct';
    }

    const cards = [
      ['Score', state.score],
      ['Correct', state.correctCount + '/' + answered],
      ['Accuracy', accuracy + '%'],
      ['Best Streak', state.bestStreak]
    ];
    const grid = $('final-score-grid');
    grid.textContent = '';
    cards.forEach(([label, value]) => {
      const card = el('div', 'score-card');
      card.appendChild(el('span', 'value', String(value)));
      card.appendChild(el('span', 'label', label));
      grid.appendChild(card);
    });

    saveBestStreak();
    renderReview();

    const solo = !state.isMultiplayer;
    $('btn-play-again').classList.toggle('hidden', !solo);
    $('btn-change-settings').classList.toggle('hidden', !solo);
  }

  function renderFinalStandings(host, standings) {
    host.textContent = '';
    standings.forEach((player, i) => {
      const row = el('div', 'standing' + (i === 0 ? ' first' : '') + (player.id === state.myId ? ' me' : ''));
      row.appendChild(el('span', 'place', ordinal(i + 1)));
      row.appendChild(el('span', 'name', player.name + (player.connected ? '' : ' (left)')));
      row.appendChild(el('span', 'detail', player.correctCount + '/' + (player.answeredCount || 0) + ' correct'));
      row.appendChild(el('span', 'points', String(player.score)));
      host.appendChild(row);
    });
  }

  function ordinal(n) {
    const tens = n % 100;
    if (tens >= 11 && tens <= 13) return n + 'th';
    return n + (['th', 'st', 'nd', 'rd'][n % 10] || 'th');
  }

  function gradeFor(accuracy) {
    if (accuracy >= 90) return 'Excellent';
    if (accuracy >= 75) return 'Strong';
    if (accuracy >= 60) return 'Getting There';
    return 'Keep Practicing';
  }

  function saveBestStreak() {
    const store = readStore();
    const streaks = store.bestStreaks || {};
    if (state.bestStreak > (streaks[state.subject] || 0)) {
      streaks[state.subject] = state.bestStreak;
      writeStore({ bestStreaks: streaks });
      if (state.bestStreak >= 3) showToast('New best streak: ' + state.bestStreak + '!', 'good');
    }
  }

  function renderReview() {
    const block = $('review-block');
    const list = $('review-list');
    list.textContent = '';

    if (!state.misses.length) {
      block.classList.add('hidden');
      block.open = false;
      return;
    }

    $('review-summary').textContent = 'Review what you missed (' + state.misses.length + ')';
    state.misses.forEach((miss) => {
      const item = el('div', 'review-item');
      renderText(item.appendChild(el('span', 'q')), miss.question);
      const correct = el('span', 'a');
      correct.appendChild(document.createTextNode('Correct: '));
      renderText(correct.appendChild(el('span')), miss.answer);
      item.appendChild(correct);
      if (miss.chosen) {
        const yours = el('span', 'yours');
        yours.appendChild(document.createTextNode('You chose: '));
        renderText(yours.appendChild(el('span')), miss.chosen);
        item.appendChild(yours);
      } else {
        item.appendChild(el('span', 'yours', 'You ran out of time.'));
      }
      if (miss.explanation) renderText(item.appendChild(el('span', 'why')), miss.explanation);
      list.appendChild(item);
    });
    block.classList.remove('hidden');
  }

  function playAgain() {
    if (!state.lastSettings) return showScreen('screen-main-menu');
    state.questions = buildSession(state.lastSettings.filters, state.lastSettings.count);
    if (!state.questions.length) return showScreen('screen-main-menu');
    startSoloGame();
  }

  // =======================================================================
  // MULTIPLAYER
  // =======================================================================
  //
  // The host runs a Match (match.js) and is the only place scores, phases and
  // powerups are decided. Everybody - the host included - then renders from
  // the snapshots it produces, so there is one drawing path on screen and no
  // separate "the host is also a player" bookkeeping to drift out of sync.
  //
  //   client --{answer|buy}--> host --> Match --> {sync|ev} --> every client
  //
  // net.js owns the wire: room codes, identity that survives a dropped
  // connection, heartbeats, clock offset and reconnection.

  const HOST_TICK_MS = 200;
  const RESYNC_MS = 2000;

  /** The host's clock. On the host that is just the clock. */
  function hostNow() {
    return (state.net && !state.isHost) ? state.net.now() : Date.now();
  }

  const playerIn = (snap, id) => snap.players.filter((p) => p.id === id)[0] || null;
  const rank = (snap) => snap.players.slice().sort((a, b) => b.score - a.score);

  function resultFor(snap, id) {
    if (!snap.reveal) return null;
    return snap.reveal.results.filter((r) => r.id === id)[0] || null;
  }

  // --- hosting -----------------------------------------------------------

  function startHosting() {
    if (!requireName()) return;
    teardownNet();

    state.isMultiplayer = true;
    state.isHost = true;
    state.myId = Net.clientId();
    state.roomCode = null;

    // The match exists from the moment the lobby opens, so arriving players
    // are real roster entries rather than a second list to reconcile later.
    state.match = Match.create({
      questions: [],
      useTimer: $('timer-toggle').checked,
      timerSeconds: clamp(parseInt($('timer-seconds').value, 10) || 20, 5, 300),
      subject: state.subject
    });
    state.match.addPlayer(state.myId, state.playerName, true);

    enterLobby(true);
    $('room-code').textContent = '.....';

    state.net = Net.hostMatch({
      protocol: Match.PROTOCOL,
      onReady: (code) => {
        state.roomCode = code;
        $('room-code').textContent = code;
        publish();
      },
      onJoin: (session) => {
        state.match.addPlayer(session.id, session.name, false);
        publish();
      },
      onLeave: (id) => {
        state.match.setConnected(id, false, Date.now());
        publish();
      },
      onMessage: handleClientMessage,
      onError: (message) => {
        setError('lobby-error', message);
        showToast(message, 'bad');
      }
    });

    syncHostSettings();
    startHostTicker();
  }

  function startHostTicker() {
    clearInterval(state.hostTicker);
    let lastPublish = 0;
    state.hostTicker = setInterval(() => {
      if (!state.match || !state.net) return;
      const now = Date.now();
      const moved = state.match.tick(now);
      // Republish on a slow heartbeat even when nothing moved, so a client
      // that missed a packet is never more than a couple of seconds stale.
      if (moved || now - lastPublish > RESYNC_MS) { lastPublish = now; publish(); }
    }, HOST_TICK_MS);
  }

  function handleClientMessage(id, msg) {
    if (!state.match || !msg || typeof msg.t !== 'string') return;

    if (msg.t === 'answer') {
      if (state.match.submitAnswer(id, msg.round, msg.choice, msg.remaining, Date.now())) publish();
    } else if (msg.t === 'buy') {
      const result = state.match.buy(id, String(msg.item), Date.now());
      if (!result.ok) state.net.send(id, { t: 'nope', reason: result.reason });
      publish();
    }
  }

  /** Pushes a personalized snapshot to every client, and to this tab. */
  function publish() {
    if (!state.match || !state.net || !state.isHost) return;
    const now = Date.now();
    state.net.broadcast((id) => ({ t: 'sync', s: state.match.snapshotFor(id, now) }));
    routeEvents(state.match.drainEvents());
    applySnapshot(state.match.snapshotFor(state.myId, now));
  }

  /** Public events go to the room; private ones only to the player concerned. */
  function routeEvents(events) {
    events.forEach((event) => {
      if (event.audience) {
        if (event.audience === state.myId) announce(event);
        else state.net.send(event.audience, { t: 'ev', e: event });
        return;
      }
      state.net.broadcast({ t: 'ev', e: event });
      announce(event);
    });
  }

  /** Mirrors the host's settings controls into the match while in the lobby. */
  function syncHostSettings() {
    if (!state.isHost || !state.match || state.match.phase !== 'lobby') return;
    const requested = parseInt($('q-count').value, 10);
    state.match.configure({
      subject: state.subject,
      useTimer: $('timer-toggle').checked,
      timerSeconds: clamp(parseInt($('timer-seconds').value, 10) || 20, 5, 300),
      previewCount: isNaN(requested) ? 10 : requested
    });
    publish();
  }

  function hostStartMatch() {
    const settings = readSettings('lobby-error');
    if (!settings) return;

    const questions = buildSession(settings.filters, settings.count);
    if (!questions.length) return setError('lobby-error', 'No questions matched those settings.');

    state.questions = questions;
    state.total = questions.length;
    state.misses = [];
    state.lastSettings = settings;

    state.match.configure({
      questions: questions,
      useTimer: settings.useTimer,
      timerSeconds: settings.seconds,
      subject: state.subject
    });
    if (!state.match.start(Date.now())) return setError('lobby-error', 'Could not start the match.');
    publish();
  }

  function hostSkipAhead() {
    if (!state.isHost || !state.match) return;
    if (state.match.skip(Date.now())) publish();
  }

  // --- joining -----------------------------------------------------------

  function joinRoom() {
    if (!requireName()) return showScreen('screen-main-menu');
    const code = Net.normalizeCode($('join-code-input').value);
    if (code.length !== Net.CODE_LENGTH) {
      $('join-status-msg').textContent = 'Room codes are ' + Net.CODE_LENGTH + ' characters long.';
      return;
    }

    teardownNet();
    state.isMultiplayer = true;
    state.isHost = false;
    state.roomCode = code;
    state.misses = [];

    $('join-btn').disabled = true;
    $('join-status-msg').textContent = 'Connecting to ' + code + '...';

    state.net = Net.joinMatch(code, {
      protocol: Match.PROTOCOL,
      name: () => state.playerName,
      onOpen: (welcome) => {
        state.myId = welcome.id;
        $('join-btn').disabled = false;
        $('join-status-msg').textContent = '';
        enterLobby(false);
        $('room-code').textContent = code;
      },
      onMessage: (msg) => {
        if (!msg || typeof msg.t !== 'string') return;
        if (msg.t === 'sync') applySnapshot(msg.s);
        else if (msg.t === 'ev') announce(msg.e);
        else if (msg.t === 'nope') showToast(String(msg.reason || 'That is not allowed.'), 'bad');
        else if (msg.t === 'bye') matchEndedEarly(String(msg.reason || 'The host ended the match.'));
      },
      onStatus: setNetStatus,
      onFatal: (message) => {
        setNetStatus(null);
        $('join-btn').disabled = false;
        $('join-status-msg').textContent = message;
        // Mid-match, the standings already in hand beat dumping them to the
        // menu with nothing to show for the game they just played.
        if (state.snap && state.snap.phase !== 'lobby') return matchEndedEarly(message);
        showToast(message, 'bad');
        teardownNet();
        showScreen('screen-mp-lobby');
      }
    });
  }

  function matchEndedEarly(reason) {
    const snap = state.snap;
    const playedSomething = snap && snap.phase !== 'lobby';
    teardownNet();
    showToast(reason, 'bad');
    if (playedSomething) return showResults(rank(snap));
    showScreen('screen-mp-lobby');
  }

  // --- lobby -------------------------------------------------------------

  function enterLobby(isHost) {
    document.body.dataset.mode = isHost ? 'host' : 'guest';
    document.querySelectorAll('.host-only').forEach((node) => { node.hidden = !isHost; });
    document.querySelectorAll('.guest-only').forEach((node) => { node.hidden = isHost; });
    $('lobby-readout').hidden = isHost;

    $('lobby-roster').textContent = '';
    $('roster-count').textContent = '';
    setError('lobby-error', '');
    if (isHost) mountSettings('lobby-settings-target');
    showScreen('screen-lobby');
  }

  function renderLobby(snap) {
    if (!$('screen-lobby').classList.contains('active')) showScreen('screen-lobby');
    renderRoster($('lobby-roster'), snap.players);

    const live = snap.players.filter((p) => p.connected).length;
    $('roster-count').textContent = live + (live === 1 ? ' player' : ' players') + ' connected';

    if (state.isHost) {
      $('btn-start-match').textContent = live > 1
        ? 'Start Match (' + live + ' players)'
        : 'Start Match (just you)';
    } else {
      renderSettingsReadout(snap.settings);
    }
  }

  function renderRoster(host, players) {
    host.textContent = '';
    if (!players.length) {
      host.appendChild(el('div', 'roster-empty', 'Waiting for players to join...'));
      return;
    }
    players.forEach((p) => {
      const card = el('div', 'player-card'
        + (p.id === state.myId ? ' is-me' : '')
        + (p.isHost ? ' is-host' : '')
        + (p.connected ? '' : ' is-gone'));
      card.appendChild(el('span', 'dot'));
      card.appendChild(el('span', 'who', p.name));

      let tag = '';
      if (!p.connected) tag = 'Away';
      else if (p.isHost && p.id === state.myId) tag = 'You, host';
      else if (p.isHost) tag = 'Host';
      else if (p.id === state.myId) tag = 'You';
      if (tag) card.appendChild(el('span', 'tag', tag));

      host.appendChild(card);
    });
  }

  function renderSettingsReadout(settings) {
    const box = $('lobby-readout');
    box.textContent = '';
    const list = el('dl');
    const add = (term, value) => {
      list.appendChild(el('dt', null, term));
      list.appendChild(el('dd', null, value));
    };
    const config = SUBJECTS[settings.subject];
    add('Subject', config ? config.title : 'Waiting...');
    add('Questions', settings.count ? String(settings.count) : 'Waiting...');
    add('Timer', settings.useTimer ? settings.timerSeconds + ' seconds per question' : 'Off');
    box.appendChild(list);
  }

  function copyToClipboard(text, okMessage) {
    const fallback = () => {
      const scratch = document.createElement('textarea');
      scratch.value = text;
      scratch.setAttribute('readonly', '');
      scratch.style.position = 'fixed';
      scratch.style.opacity = '0';
      document.body.appendChild(scratch);
      scratch.select();
      let worked = false;
      try { worked = document.execCommand('copy'); } catch (e) { worked = false; }
      document.body.removeChild(scratch);
      showToast(worked ? okMessage : 'Could not copy - the code is on screen.', worked ? 'good' : 'bad');
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => showToast(okMessage, 'good'), fallback);
    } else {
      fallback();
    }
  }

  function inviteLink() {
    return location.origin + location.pathname + '#join=' + (state.roomCode || '');
  }

  // --- snapshot rendering ------------------------------------------------

  /** The one entry point for match state. Everything on screen follows it. */
  function applySnapshot(snap) {
    if (!snap || !state.isMultiplayer) return;
    if (state.snap && snap.seq < state.snap.seq) return;    // arrived out of order
    state.snap = snap;

    // A guest adopts the host's subject so badges and powerup names match.
    if (snap.settings.subject && snap.settings.subject !== state.subject && SUBJECTS[snap.settings.subject]) {
      $('subject-dropdown').value = snap.settings.subject;
      applySubject();
      if (state.shownPhase) renderShop();
    }
    state.useTimer = !!snap.settings.useTimer;
    state.timerSeconds = snap.settings.timerSeconds || 20;

    if (snap.phase === 'lobby') return renderLobby(snap);
    if (snap.phase === 'question') return showQuestionPhase(snap);
    if (snap.phase === 'reveal') return showRevealPhase(snap);
    if (snap.phase === 'over') return endMatch(snap);
  }

  function enterMatchScreen() {
    $('chip-players-connected').classList.remove('hidden');
    $('chip-rank').classList.remove('hidden');
    $('shop-container').style.display = 'block';
    $('keyboard-hint').textContent = 'Keyboard: press 1-4 to answer.';
    renderShop();
    showScreen('screen-quiz');
  }

  function showQuestionPhase(snap) {
    const fresh = state.shownRound !== snap.round || state.shownPhase !== 'question';

    if (fresh) {
      state.shownRound = snap.round;
      state.shownPhase = 'question';
      closeBoard();
      if (!$('screen-quiz').classList.contains('active')) enterMatchScreen();
      $('timer-wrapper').style.display = snap.settings.useTimer ? 'block' : 'none';

      renderQuestion(snap.question, {
        onPick: sendAnswer,
        eliminate: snap.you ? snap.you.eliminate : [],
        locked: !!(snap.you && snap.you.answered),
        chosen: snap.you ? snap.you.answer : null
      });

      if (snap.settings.useTimer) {
        startTimer(snap.settings.timerSeconds * 1000, snap.deadline - hostNow(), () => lockOptions());
      } else {
        stopTimer();
      }
    }

    if (snap.settings.useTimer) syncTimer(snap.deadline - hostNow());

    if (snap.you && snap.you.watching) {
      $('waiting-msg').textContent = 'You joined mid-question, so you are sitting this one out.';
      $('waiting-msg').classList.remove('hidden');
    } else if (snap.you && snap.you.answered) {
      $('waiting-msg').textContent = 'Answer locked in.';
      $('waiting-msg').classList.remove('hidden');
      lockOptions(snap.you.answer);
    }

    renderTracker(snap);
    adoptSnapshotStats(snap);
  }

  /** Who has locked in. Replaces the old blank "waiting for players" box. */
  function renderTracker(snap) {
    const track = $('answer-tracker');
    track.textContent = '';

    const live = snap.players.filter((p) => p.connected && !p.watching);
    const done = live.filter((p) => p.answered).length;
    track.appendChild(el('span', 'tracker-label', done + ' of ' + live.length + ' answered'));

    snap.players.forEach((p) => {
      const pip = el('span', 'tracker-pip'
        + (p.answered && p.connected && !p.watching ? ' done' : '')
        + (p.connected ? '' : ' gone')
        + (p.watching ? ' watching' : ''), p.name);
      pip.title = p.connected
        ? (p.watching ? 'Watching this round' : (p.answered ? 'Answered' : 'Still thinking'))
        : 'Disconnected';
      track.appendChild(pip);
    });

    track.classList.remove('hidden');
  }

  function sendAnswer(option, btn) {
    const snap = state.snap;
    if (!snap || snap.phase !== 'question') return;
    if (snap.you && (snap.you.answered || snap.you.watching)) return;

    const remaining = Math.round(remainingTime());
    lockOptions();
    if (btn) btn.classList.add('selected');
    $('waiting-msg').textContent = 'Answer locked in.';
    $('waiting-msg').classList.remove('hidden');

    if (state.isHost) {
      if (state.match.submitAnswer(state.myId, snap.round, option, remaining, Date.now())) publish();
    } else {
      state.net.send({ t: 'answer', round: snap.round, choice: option, remaining: remaining });
    }
  }

  function showRevealPhase(snap) {
    const fresh = state.shownPhase !== 'reveal' || state.shownRound !== snap.round;

    if (fresh) {
      state.shownPhase = 'reveal';
      state.shownRound = snap.round;
      stopTimer();
      $('answer-tracker').classList.add('hidden');
      $('waiting-msg').classList.add('hidden');

      const mine = resultFor(snap, state.myId);
      lockOptions(mine ? mine.choice : null);
      paintAnswers(snap.reveal.answer);

      if (mine && mine.watching) {
        showFeedback(snap.question.question, snap.reveal.explanation, snap.reveal.answer,
          false, false, 'You sat this one out');
      } else {
        const correct = !!(mine && mine.correct);
        showFeedback(snap.question.question, snap.reveal.explanation, snap.reveal.answer,
          correct, !!(mine && mine.choice === null));
        if (!correct) {
          recordMiss(snap.question.question, snap.reveal.answer,
            mine ? mine.choice : null, snap.reveal.explanation);
        }
      }

      clearTimeout(state.advanceTimeout);
      state.advanceTimeout = setTimeout(openBoard, 1400);
    }

    renderBoard(snap);
    adoptSnapshotStats(snap);
  }

  function openBoard() { $('leaderboard-modal').classList.add('open'); }

  function closeBoard() {
    clearInterval(state.boardTimer);
    state.boardTimer = null;
    $('leaderboard-modal').classList.remove('open');
  }

  function renderBoard(snap) {
    $('lb-title').textContent = snap.round + 1 >= snap.total
      ? 'Final Round'
      : 'Round ' + (snap.round + 1) + ' of ' + snap.total;

    const results = {};
    (snap.reveal ? snap.reveal.results : []).forEach((r) => { results[r.id] = r; });

    const container = $('lb-list-container');
    container.textContent = '';
    rank(snap).forEach((player, i) => {
      const result = results[player.id];
      const row = el('div', 'lb-row'
        + (player.id === state.myId ? ' me' : '')
        + (player.connected ? '' : ' gone'));

      const who = el('div', 'lb-who');
      who.appendChild(el('span', 'lb-place', (i + 1) + '.'));
      if (result && !result.watching) {
        who.appendChild(el('span', 'lb-mark ' + (result.correct ? 'hit' : 'miss'), result.correct ? '✓' : '✗'));
      }
      who.appendChild(el('span', 'lb-name', player.name));
      row.appendChild(who);

      const tally = el('div', 'lb-tally');
      const gained = result ? result.gained : 0;
      tally.appendChild(el('span', 'lb-delta' + (gained ? '' : ' zero'), gained ? '+' + gained : '—'));
      tally.appendChild(el('span', null, String(player.score)));
      row.appendChild(tally);

      container.appendChild(row);
    });

    // One countdown, read off the host's deadline, so nobody is left staring
    // at a zero that never advances.
    clearInterval(state.boardTimer);
    const paintCountdown = () => {
      $('lb-timer').textContent = String(Math.max(0, Math.ceil((snap.deadline - hostNow()) / 1000)));
    };
    paintCountdown();
    state.boardTimer = setInterval(paintCountdown, 250);

    renderShopState(snap);
  }

  function adoptSnapshotStats(snap) {
    const me = playerIn(snap, state.myId);
    state.total = snap.total;
    state.index = snap.round;
    state.roundResolved = snap.phase !== 'question';
    state.score = me ? me.score : 0;
    state.streak = me ? me.streak : 0;
    state.correctCount = me ? me.correctCount : 0;
    state.answeredCount = me ? me.answeredCount : 0;
    state.bestStreak = me ? me.bestStreak : 0;

    const live = snap.players.filter((p) => p.connected).length;
    $('chip-players-connected').textContent = 'Players: ' + live;

    const ranked = rank(snap);
    const place = ranked.map((p) => p.id).indexOf(state.myId) + 1;
    $('chip-rank').textContent = place ? ordinal(place) + ' of ' + ranked.length : '-';

    updateStats();
  }

  function endMatch(snap) {
    if (state.shownPhase === 'over') return;
    state.shownPhase = 'over';
    clearInterval(state.hostTicker);
    state.hostTicker = null;
    adoptSnapshotStats(snap);
    showResults(rank(snap));
  }

  // --- powerups ----------------------------------------------------------

  function renderShop() {
    const grid = $('dynamic-shop-grid');
    const names = subject().powerups;
    grid.textContent = '';
    POWERUP_ORDER.forEach((key) => {
      const spec = Match.POWERUPS[key];
      const btn = el('button', 'shop-item');
      btn.type = 'button';
      btn.dataset.item = key;
      btn.appendChild(el('strong', null, names[key]));
      btn.appendChild(document.createTextNode(spec.blurb));
      btn.appendChild(document.createElement('br'));
      btn.appendChild(el('span', 'cost', 'Cost: ' + spec.cost));
      btn.addEventListener('click', () => buyPowerup(key));
      grid.appendChild(btn);
    });
  }

  /** Greys out what this player cannot currently afford or is capped out of. */
  function renderShopState(snap) {
    const me = playerIn(snap, state.myId);
    const budget = me ? me.score : 0;
    const spent = snap.you ? snap.you.buysThisRound : 0;
    const cap = snap.you ? snap.you.maxBuys : MAX_POWERUPS_PER_ROUND;

    $('shop-budget').textContent = budget + ' points, ' + Math.max(0, cap - spent) + ' of ' + cap + ' buys left';
    $('dynamic-shop-grid').querySelectorAll('.shop-item').forEach((btn) => {
      const spec = Match.POWERUPS[btn.dataset.item];
      btn.disabled = spent >= cap || budget < spec.cost;
    });
  }

  /**
   * Purchases are intents, not actions: the host validates the wallet, the
   * per-round cap and the target, then the resulting snapshot says what
   * actually happened. That is what keeps two people spending the same points
   * from both getting their money's worth.
   */
  function buyPowerup(item) {
    if (!state.isMultiplayer || !state.snap || state.snap.phase !== 'reveal') return;
    if (state.isHost) {
      const result = state.match.buy(state.myId, item, Date.now());
      if (!result.ok) return showToast(result.reason, 'bad');
      publish();
    } else {
      state.net.send({ t: 'buy', item: item });
    }
  }

  // --- chatter -----------------------------------------------------------

  function announce(event) {
    if (!event || !event.k) return;
    const label = (key) => subject().powerups[key] || key;

    if (event.k === 'join') return showToast(event.name + ' joined.', 'good');
    if (event.k === 'leave') return showToast(event.name + ' dropped out.', 'bad');
    if (event.k === 'rejoin') return showToast(event.name + ' reconnected.', 'good');

    if (event.k === 'buy') {
      return showToast(event.target
        ? 'Launched ' + label(event.item) + ' at ' + event.target + '.'
        : 'Bought ' + label(event.item) + '.', 'good');
    }

    if (event.k === 'gamble') {
      return showToast(event.won
        ? label('GAMBLE') + ' paid off: +' + event.amount + '!'
        : label('GAMBLE') + ' lost ' + event.amount + ' points.', event.won ? 'good' : 'bad');
    }

    if (event.k === 'buff') {
      if (event.item === 'DOUBLE' && event.used) return showToast('Double points!', 'good');
      if (event.item === 'ZERO' && event.used) return showToast('Silenced - that correct answer scored 0.', 'bad');
      return;
    }

    if (event.k === 'attack') {
      const mine = event.toId === state.myId;
      const theirs = event.fromId === state.myId;
      if (event.blocked) {
        if (mine) return showToast('Blocked ' + event.from + "'s " + label(event.item) + '!', 'good');
        if (theirs) return showToast(event.to + ' blocked your ' + label(event.item) + '.', 'bad');
        return showToast(event.to + ' blocked ' + event.from + "'s " + label(event.item) + '.');
      }
      if (event.item === 'ZERO') {
        if (mine) return showToast(event.from + ' silenced you - your next correct answer scores 0.', 'bad');
        if (theirs) return showToast('Silenced ' + event.to + '.', 'good');
        return showToast(event.from + ' silenced ' + event.to + '.');
      }
      if (mine) return showToast(event.from + ' hit you for ' + event.amount + ' points.', 'bad');
      if (theirs) return showToast(label(event.item) + ' hit ' + event.to + ' for ' + event.amount + '.', 'good');
      return showToast(event.from + ' hit ' + event.to + ' for ' + event.amount + '.');
    }
  }

  function setNetStatus(kind, detail) {
    const bar = $('net-status');
    if (!kind || kind === 'online') { bar.hidden = true; return; }
    bar.hidden = false;
    bar.dataset.kind = kind;
    bar.textContent = kind === 'connecting'
      ? 'Connecting to the room...'
      : 'Connection lost - reconnecting' + (detail ? ' (attempt ' + detail + ')' : '') + '...';
  }

  // --- leaving -----------------------------------------------------------

  function teardownNet() {
    clearInterval(state.hostTicker);
    clearInterval(state.boardTimer);
    clearTimeout(state.advanceTimeout);
    stopTimer();
    state.hostTicker = null;
    state.boardTimer = null;

    if (state.net) { try { state.net.close(); } catch (e) { /* already gone */ } }
    state.net = null;
    state.match = null;
    state.snap = null;
    state.isMultiplayer = false;
    state.isHost = false;
    state.shownRound = -1;
    state.shownPhase = null;
    state.roomCode = null;

    setNetStatus(null);
    closeBoard();
    document.body.dataset.mode = 'solo';
    $('join-btn').disabled = false;
  }

  function leaveMatch() {
    // Tell the room before hanging up, so guests land on their standings
    // instead of a bare "connection lost".
    if (state.isHost && state.net) {
      const net = state.net;
      net.broadcast({ t: 'bye', reason: 'The host ended the match.' });
      state.net = null;
      setTimeout(() => { try { net.close(); } catch (e) { /* already gone */ } }, 250);
    }
    teardownNet();
    $('join-status-msg').textContent = '';
    setError('lobby-error', '');
    showScreen('screen-main-menu');
  }

  function quitToMenu() {
    const inMatch = state.isMultiplayer || $('screen-quiz').classList.contains('active');
    if (inMatch && !window.confirm('Quit this session and return to the main menu?')) return;
    leaveMatch();
  }

  // =======================================================================
  // KEYBOARD
  // =======================================================================

  function onKeyDown(event) {
    const tag = event.target.tagName;
    if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA' || event.metaKey || event.ctrlKey || event.altKey) return;
    if (!$('screen-quiz').classList.contains('active')) return;

    if (event.key === 'Escape') { event.preventDefault(); return quitToMenu(); }

    // Whether an answer is still open is a property of the buttons, not of a
    // flag: in a match the host decides when the round closes.
    const index = '1234'.indexOf(event.key) !== -1
      ? Number(event.key) - 1
      : 'abcd'.indexOf(event.key.toLowerCase());
    if (index >= 0) {
      const button = $('options-grid').children[index];
      if (button && !button.disabled && !button.classList.contains('eliminated')) {
        event.preventDefault();
        button.click();
      }
      return;
    }

    if (event.key === 'Enter' && !$('btn-next').classList.contains('hidden')) {
      event.preventDefault();
      nextSoloQuestion();
    }
  }

  // =======================================================================
  // INIT
  // =======================================================================

  function restorePreferences() {
    const store = readStore();
    if (store.name) $('player-name-input').value = store.name;
    if (store.subject && SUBJECTS[store.subject]) $('subject-dropdown').value = store.subject;
    if (store.count) $('q-count').value = String(store.count);
    if (typeof store.useTimer === 'boolean') $('timer-toggle').checked = store.useTimer;
    if (store.seconds) $('timer-seconds').value = String(store.seconds);
    $('timer-seconds').disabled = !$('timer-toggle').checked;
  }

  /** Lets an invite link drop someone straight onto the join screen. */
  function readInviteCode() {
    const match = /[#&?]join=([A-Za-z0-9]+)/.exec(location.hash || '');
    return match ? Net.normalizeCode(match[1]) : null;
  }

  function init() {
    restorePreferences();
    applySubject();

    $('subject-dropdown').addEventListener('change', applySubject);
    $('timer-toggle').addEventListener('change', function () {
      $('timer-seconds').disabled = !this.checked;
      syncHostSettings();
    });
    $('player-name-input').addEventListener('input', () => setError('name-error', ''));
    $('join-code-input').addEventListener('keydown', (e) => { if (e.key === 'Enter') joinRoom(); });

    // While the host is in the lobby, its settings are part of the match, so
    // guests can see what they are about to play.
    const settingsModule = $('game-settings-module');
    settingsModule.addEventListener('input', syncHostSettings);
    settingsModule.addEventListener('click', syncHostSettings);

    $('btn-single').addEventListener('click', () => {
      if (!requireName()) return;
      mountSettings('sp-settings-target');
      showScreen('screen-sp-setup');
    });
    $('btn-multi').addEventListener('click', () => {
      if (!requireName()) return;
      showScreen('screen-mp-lobby');
    });

    $('btn-start-sp').addEventListener('click', startSinglePlayer);
    $('btn-host').addEventListener('click', startHosting);
    $('join-btn').addEventListener('click', joinRoom);
    $('btn-start-match').addEventListener('click', hostStartMatch);
    $('btn-host-next').addEventListener('click', hostSkipAhead);
    $('btn-next').addEventListener('click', nextSoloQuestion);

    $('btn-copy-code').addEventListener('click', () => {
      if (state.roomCode) copyToClipboard(state.roomCode, 'Room code copied.');
    });
    $('btn-copy-link').addEventListener('click', () => {
      if (state.roomCode) copyToClipboard(inviteLink(), 'Invite link copied.');
    });

    $('btn-play-again').addEventListener('click', playAgain);
    $('btn-change-settings').addEventListener('click', () => {
      mountSettings('sp-settings-target');
      showScreen('screen-sp-setup');
    });
    $('btn-results-menu').addEventListener('click', leaveMatch);

    document.querySelectorAll('[data-nav]').forEach((btn) => {
      btn.addEventListener('click', () => showScreen(btn.dataset.nav));
    });
    document.querySelectorAll('[data-quit]').forEach((btn) => {
      btn.addEventListener('click', quitToMenu);
    });

    document.addEventListener('keydown', onKeyDown);

    // Closing the tab mid-match should read as leaving, not as a mystery
    // timeout everyone else has to wait out.
    window.addEventListener('pagehide', () => {
      if (state.net) { try { state.net.close(); } catch (e) { /* going away anyway */ } }
    });

    const invite = readInviteCode();
    if (invite) {
      $('join-code-input').value = invite;
      showScreen('screen-mp-lobby');
      $('join-status-msg').textContent = 'Enter your name on the menu first, then join room ' + invite + '.';
      if ($('player-name-input').value.trim()) joinRoom();
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

})();
