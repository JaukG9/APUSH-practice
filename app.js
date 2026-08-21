/* =========================================================================
   AP Practice - game engine
   -------------------------------------------------------------------------
   One engine drives every subject. A subject supplies its metadata (title,
   filter groups, powerup names) and a question bank; everything below is
   shared - selection, timing, scoring, feedback, results and multiplayer.

   Question banks live in questions.js (APUSH / AP Gov) and affix-data.js
   (Prefix & Suffix). No question text appears in this file.
   ========================================================================= */

'use strict';

(function () {

  // =======================================================================
  // CONFIG
  // =======================================================================

  const POWERUP_COSTS = {
    ELIM2: 50, AUTOCORRECT: 150, DOUBLE: 50, BLOCK: 100,
    GAMBLE: 75, NUKE: 150, STEAL: 150, ZERO: 200
  };

  const POWERUP_DESCRIPTIONS = {
    ELIM2: 'Elim. 2 Wrong', AUTOCORRECT: 'Auto-Correct', DOUBLE: 'Double Points',
    BLOCK: 'Block 1 Attack', GAMBLE: 'Win 200 / Lose 100', NUKE: 'Nuke 1st Place',
    STEAL: 'Steal 100 Pts', ZERO: 'Opponent gets 0'
  };

  const POWERUP_ORDER = ['ELIM2', 'AUTOCORRECT', 'DOUBLE', 'BLOCK', 'GAMBLE', 'NUKE', 'STEAL', 'ZERO'];
  const MAX_POWERUPS_PER_ROUND = 3;
  const ROUND_BREAK_SECONDS = 5;

  // How a session is described back to the player after answering.
  const CATEGORY_LABELS = { prefix: 'Prefix', suffix: 'Suffix', mixed: 'Mixed Review' };
  const DIFFICULTY_LABELS = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };
  const DIFFICULTY_ORDER = { easy: 0, medium: 1, hard: 2 };

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

  const SUBJECTS = {
    APUSH: {
      title: 'APUSH Practice',
      blurb: 'Multiple choice review across the nine College Board periods.',
      format: 'legacy',
      unitLabel: 'Period',
      getBank: () => (typeof apushBank === 'undefined' ? null : apushBank),
      filterGroups: [{
        id: 'unit',
        label: 'Select Periods / Units',
        selectAll: true,
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
      getBank: () => (typeof apGovBank === 'undefined' ? null : apGovBank),
      filterGroups: [{
        id: 'unit',
        label: 'Select Foundational Documents',
        selectAll: true,
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
      format: 'affix',
      unitLabel: 'Level',
      getBank: () => (typeof affixBank === 'undefined' ? null : affixBank),
      filterGroups: [
        {
          id: 'difficulty',
          label: 'Difficulty',
          options: [
            { value: 'easy', label: 'Easy', title: 'Name the meaning of an affix directly' },
            { value: 'medium', label: 'Medium', title: 'Read an affix inside a familiar word' },
            { value: 'hard', label: 'Hard', title: 'Decode unfamiliar words and separate lookalikes' }
          ]
        },
        {
          id: 'category',
          label: 'Focus',
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

    buffs: { doublePoints: false, blockAttacks: 0, elim2: false, autocorrect: false, zeroPoints: false },

    // multiplayer
    isMultiplayer: false,
    isHost: false,
    peer: null,
    conn: null,
    players: {},
    playerCount: 1,
    hostAnswer: null,
    hostHasAnswered: false,
    currentLeader: null,
    powerupsUsedThisRound: 0
  };

  const PEER_CONFIG = {
    config: {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' }
      ]
    }
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

    if (state.subject === 'AFFIX') {
      const intro = el('p');
      intro.appendChild(el('strong', null, 'This mode: '));
      intro.appendChild(document.createTextNode(
        'A prefix goes on the front of a word and a suffix goes on the end. Both change what the word means, so knowing a few dozen of them lets you decode words you have never seen. Questions get harder as a session goes on.'
      ));
      body.appendChild(intro);
    }

    const shop = el('p');
    shop.appendChild(el('strong', null, 'The Shop (multiplayer only): '));
    shop.appendChild(document.createTextNode('Between rounds you have ' + ROUND_BREAK_SECONDS + ' seconds to spend points on powerups.'));
    body.appendChild(shop);

    const list = el('ul');
    POWERUP_ORDER.forEach((key) => {
      const item = el('li');
      item.appendChild(el('span', 'powerup-name', config.powerups[key]));
      item.appendChild(document.createTextNode(
        ' (Cost: ' + POWERUP_COSTS[key] + ') - ' + POWERUP_DESCRIPTIONS[key] + '.'
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

    const lines = state.subject === 'AFFIX'
      ? ['Every question is multiple choice with one clearly best answer. Read the affix, not just the word: distractors are usually real affixes with a different meaning.',
         'Pick your difficulty and focus below. A session mixes prefixes, suffixes and question styles, and ramps from easier items to harder ones.',
         'After you answer you will see why the answer is right, so take a second to read it before moving on.']
      : ['Choose the units you want to study, how many questions you want, and whether the timer is on.',
         'You will see the correct answer immediately after each question, then move on when you are ready.'];

    lines.forEach((line) => brief.appendChild(el('p', null, line)));
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
        // Difficulty/focus filters start switched on; unit filters start empty
        // so the player consciously picks what to study, as before.
        const on = group.id !== 'unit';
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

    const levels = new Set(filters.difficulty || []);
    const categories = new Set(filters.category || []);
    if (!levels.size || !categories.size) return [];
    return bank.filter((q) =>
      q && Array.isArray(q.options) && q.options.length === 4 &&
      levels.has(q.difficulty) && categories.has(q.type)
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
      badges: [
        { text: DIFFICULTY_LABELS[entry.difficulty] || entry.difficulty, className: 'level-' + entry.difficulty },
        { text: CATEGORY_LABELS[entry.type] || entry.type }
      ],
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
   * Legacy banks are simply shuffled. The affix bank is drawn round-robin
   * across affixes so no single word part dominates, preferring questions the
   * player has not seen recently, then ordered easy -> medium -> hard with
   * question types spread out so consecutive items do not feel identical.
   */
  function buildSession(filters, limit) {
    const pool = matchingQuestions(filters);
    if (!pool.length) return [];

    if (subject().format === 'legacy') {
      return shuffle(pool).slice(0, limit).map(normalize);
    }

    const recent = new Set(readStore().recent || []);
    const groups = new Map();
    shuffle(pool).forEach((q) => {
      const key = q.affix || 'mixed';
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(q);
    });
    // Inside each affix, unseen questions come first.
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
      ramped.push.apply(ramped, spread(shuffle(band), (q) => q.questionType));
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
      setError(errorId, 'Question data failed to load. Check that questions.js and affix-data.js are present, then reload.');
      return null;
    }

    const filters = readFilters();
    const pool = matchingQuestions(filters);
    if (!pool.length) {
      setError(errorId, config.format === 'legacy'
        ? 'Select at least one ' + config.unitLabel.toLowerCase() + ' to study.'
        : 'Select at least one difficulty and one focus.');
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
    startGame();
  }

  // =======================================================================
  // GAME FLOW
  // =======================================================================

  function startGame() {
    state.index = 0;
    state.score = 0;
    state.correctCount = 0;
    state.answeredCount = 0;
    state.streak = 0;
    state.bestStreak = 0;
    state.misses = [];
    state.hostAnswer = null;
    state.hostHasAnswered = false;
    state.buffs = { doublePoints: false, blockAttacks: 0, elim2: false, autocorrect: false, zeroPoints: false };
    state.powerupsUsedThisRound = 0;

    $('chip-players-connected').classList.toggle('hidden', !state.isMultiplayer);
    $('shop-container').style.display = state.isMultiplayer ? 'block' : 'none';
    if (state.isMultiplayer) renderShop();
    $('timer-wrapper').style.display = state.useTimer ? 'block' : 'none';
    $('keyboard-hint').textContent = state.isMultiplayer
      ? 'Keyboard: press 1-4 to answer.'
      : 'Keyboard: press 1-4 to answer, Enter to continue.';
    closeLeaderboard();

    showScreen('screen-quiz');
    loadQuestion();
  }

  function loadQuestion() {
    if (state.index >= state.questions.length) return endGame();

    state.answered = false;
    state.myAnswer = null;
    state.lockedTime = 0;
    state.roundResolved = false;
    if (state.isHost) {
      state.hostAnswer = null;
      state.hostHasAnswered = false;
      Object.keys(state.players).forEach((id) => {
        state.players[id].answer = null;
        state.players[id].hasAnswered = false;
      });
    }

    const question = state.questions[state.index];

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

    const buttons = question.options.map((option, i) => {
      const btn = el('button', 'option-btn');
      btn.type = 'button';
      btn.dataset.value = option;
      btn.appendChild(el('span', 'key', String.fromCharCode(65 + i)));
      btn.appendChild(renderText(el('span', 'label'), option));
      btn.addEventListener('click', () => handleAnswer(option, btn));
      grid.appendChild(btn);
      return btn;
    });

    applyBuffs(buttons, question.answer);
    updateStats();
    startTimer();
  }

  function applyBuffs(buttons, correctAnswer) {
    const wrong = shuffle(buttons.filter((b) => b.dataset.value !== correctAnswer));
    if (state.buffs.autocorrect) {
      state.buffs.autocorrect = false;
      wrong.forEach((b) => b.classList.add('eliminated'));
    } else if (state.buffs.elim2) {
      state.buffs.elim2 = false;
      wrong.slice(0, 2).forEach((b) => b.classList.add('eliminated'));
    }
  }

  // --- timer -------------------------------------------------------------

  /** Milliseconds left, read from the clock rather than from the last frame. */
  function remainingTime() {
    if (!state.useTimer) return 0;
    return Math.max(0, state.timerEndsAt - performance.now());
  }

  function stopTimer() {
    if (state.rafId !== null) { cancelAnimationFrame(state.rafId); state.rafId = null; }
    clearTimeout(state.expiryTimeout);
    state.expiryTimeout = null;
  }

  /**
   * Two clocks on purpose. A timeout owns expiry because it keeps running when
   * the tab is in the background; requestAnimationFrame only paints the bar,
   * and browsers stop calling it on hidden tabs. Elapsed time is always read
   * from performance.now(), so a backgrounded tab can never gain extra time.
   */
  function startTimer() {
    stopTimer();
    if (!state.useTimer) return;

    const total = state.timerSeconds * 1000;
    const bar = $('timer-bar');
    const text = $('timer-text');

    state.timerEndsAt = performance.now() + total;
    bar.className = 'timer-fill';
    bar.style.transform = 'scaleX(1)';
    text.textContent = state.timerSeconds.toFixed(1) + 's';

    state.expiryTimeout = setTimeout(handleTimeout, total);

    let lastShown = -1;
    const paint = () => {
      const remaining = remainingTime();
      bar.style.transform = 'scaleX(' + (remaining / total) + ')';

      const tenths = Math.ceil(remaining / 100);
      if (tenths !== lastShown) { text.textContent = (tenths / 10).toFixed(1) + 's'; lastShown = tenths; }
      if (remaining <= total * 0.25) bar.classList.add('warning');

      state.rafId = remaining > 0 ? requestAnimationFrame(paint) : null;
    };
    state.rafId = requestAnimationFrame(paint);
  }

  function handleTimeout() {
    if (!state.answered) handleAnswer(null, null);
    // The single-player path already resolved inside handleAnswer; only the
    // host still needs to close the round out for everybody else.
    if (state.isHost) resolveRound(state.questions[state.index].answer, true);
  }

  // --- answering ---------------------------------------------------------

  function handleAnswer(selected, btn) {
    if (state.answered || state.roundResolved) return;

    state.answered = true;
    state.myAnswer = selected;
    state.lockedTime = remainingTime();

    const grid = $('options-grid');
    grid.classList.add('locked');
    grid.querySelectorAll('.option-btn').forEach((b) => { b.disabled = true; });
    if (btn) btn.classList.add('selected');

    if (!state.isMultiplayer) {
      stopTimer();
      resolveRound(state.questions[state.index].answer);
      return;
    }

    $('waiting-msg').classList.remove('hidden');
    if (state.isHost) { state.hostAnswer = selected; state.hostHasAnswered = true; checkAllAnswered(); }
    else if (state.conn && state.conn.open) { state.conn.send({ type: 'ANSWER_SUBMITTED', answer: selected }); }
  }

  function checkAllAnswered() {
    if (!state.isHost || state.roundResolved || !state.hostHasAnswered) return;
    if (Object.values(state.players).every((p) => p.hasAnswered)) {
      resolveRound(state.questions[state.index].answer, true);
    }
  }

  /**
   * Ends the round exactly once. Both the timer and the last submitted answer
   * can race to get here, so the guard matters: without it the session would
   * advance twice and silently skip a question.
   */
  function resolveRound(correctAnswer, broadcastToPeers) {
    if (state.roundResolved) return;
    state.roundResolved = true;
    stopTimer();

    if (broadcastToPeers && state.isMultiplayer) broadcast({ type: 'ROUND_RESULTS', correctAnswer: correctAnswer });

    state.powerupsUsedThisRound = 0;
    $('waiting-msg').classList.add('hidden');

    const question = state.questions[state.index];
    const wasCorrect = state.myAnswer === correctAnswer;
    const timedOut = state.myAnswer === null;

    state.answeredCount++;
    if (wasCorrect) {
      let earned = 100;
      if (state.useTimer) earned = 60 + Math.floor((state.lockedTime / (state.timerSeconds * 1000)) * 40);
      if (state.buffs.doublePoints) { earned *= 2; state.buffs.doublePoints = false; showToast('Double Points!', 'good'); }
      if (state.buffs.zeroPoints) { earned = 0; state.buffs.zeroPoints = false; showToast('Silenced - 0 points.', 'bad'); }
      state.score += earned;
      state.correctCount++;
      state.streak++;
      if (state.streak > state.bestStreak) state.bestStreak = state.streak;
    } else {
      state.streak = 0;
      state.misses.push({
        question: question.question,
        answer: correctAnswer,
        chosen: timedOut ? null : state.myAnswer,
        explanation: question.explanation
      });
    }

    paintAnswers(correctAnswer);
    showFeedback(question, correctAnswer, wasCorrect, timedOut);
    updateStats();

    if (state.isMultiplayer) {
      if (state.isHost) setTimeout(renderDynamicLeaderboard, 400);
      else if (state.conn && state.conn.open) state.conn.send({ type: 'SCORE_SYNC', score: state.score });
      state.advanceTimeout = setTimeout(openLeaderboard, 2000);
    } else {
      const next = $('btn-next');
      next.textContent = state.index + 1 >= state.questions.length ? 'See Results' : 'Next Question';
      next.classList.remove('hidden');
      next.focus();
    }
  }

  function paintAnswers(correctAnswer) {
    $('options-grid').querySelectorAll('.option-btn').forEach((b) => {
      b.disabled = true;
      b.classList.remove('eliminated');
      if (b.dataset.value === correctAnswer) b.classList.add('correct-ans');
      else if (b.classList.contains('selected')) b.classList.add('wrong-ans');
    });
  }

  function showFeedback(question, correctAnswer, wasCorrect, timedOut) {
    const panel = $('feedback-panel');
    panel.textContent = '';
    panel.className = 'feedback-panel ' + (wasCorrect ? 'correct' : 'wrong');

    panel.appendChild(el('span', 'feedback-verdict',
      wasCorrect ? 'Correct' : (timedOut ? "Time's up" : 'Not quite')));

    if (!wasCorrect) {
      const line = el('p');
      line.appendChild(document.createTextNode('The answer is: '));
      const strong = el('strong');
      renderText(strong, correctAnswer);
      line.appendChild(strong);
      panel.appendChild(line);
    }
    if (question.explanation) renderText(panel.appendChild(el('p')), question.explanation);
    panel.classList.remove('hidden');
  }

  function nextQuestion() {
    clearTimeout(state.advanceTimeout);
    closeLeaderboard();
    state.index++;
    loadQuestion();
  }

  function updateStats() {
    $('chip-score').textContent = state.isMultiplayer
      ? 'Score: ' + state.score
      : 'Correct: ' + state.correctCount + ' / ' + state.answeredCount;

    const streakChip = $('chip-streak');
    streakChip.textContent = 'Streak: ' + state.streak;
    streakChip.dataset.cold = String(state.streak === 0);

    const total = state.questions.length || 1;
    const shown = Math.min(state.index + 1, total);
    $('chip-remaining').textContent = 'Q ' + shown + ' / ' + total;
    $('progress-fill').style.width = ((state.index + (state.roundResolved ? 1 : 0)) / total * 100) + '%';

    if (state.isMultiplayer) {
      const count = state.isHost ? Object.keys(state.players).length + 1 : state.playerCount;
      $('chip-players-connected').textContent = 'Players: ' + count;
    }
  }

  // =======================================================================
  // RESULTS
  // =======================================================================

  function endGame() {
    stopTimer();
    clearTimeout(state.advanceTimeout);
    closeLeaderboard();
    showScreen('screen-results');

    const answered = state.answeredCount || state.questions.length || 1;
    const accuracy = Math.round((state.correctCount / answered) * 100);

    const outcome = $('final-outcome');
    const summary = $('final-summary');
    const lb = $('final-lb-container');

    if (state.isMultiplayer) {
      lb.textContent = '';
      Array.from($('lb-list-container').children).forEach((row) => lb.appendChild(row.cloneNode(true)));
      lb.classList.remove('hidden');
      const top = lb.firstElementChild;
      const won = !!(top && top.classList.contains('me'));
      outcome.textContent = won ? 'Victory' : 'Good Game';
      outcome.style.color = won ? 'var(--correct)' : 'var(--navy)';
      summary.textContent = subject().title + ' - ' + state.questions.length + ' questions';
    } else {
      lb.classList.add('hidden');
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
    startGame();
  }

  // =======================================================================
  // MULTIPLAYER
  // =======================================================================

  let peerLibrary = null;
  function loadPeerLibrary() {
    if (window.Peer) return Promise.resolve();
    if (!peerLibrary) {
      peerLibrary = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/peerjs@1.5.1/dist/peerjs.min.js';
        script.onload = resolve;
        script.onerror = () => { peerLibrary = null; reject(new Error('PeerJS failed to load')); };
        document.head.appendChild(script);
      });
    }
    return peerLibrary;
  }

  /**
   * Calls `onLost` when a peer really goes away.
   *
   * PeerJS only emits 'close' on a graceful hang-up, so a player who closes
   * the tab or drops off the network would otherwise leave everyone else
   * waiting forever. Watching the underlying ICE state catches that case. A
   * brief 'disconnected' is often just a network hiccup, so it gets a grace
   * period; 'failed' and 'closed' are terminal.
   */
  function watchConnection(conn, onLost) {
    let done = false;
    let graceTimer = null;
    const lost = () => {
      if (done) return;
      done = true;
      clearTimeout(graceTimer);
      onLost();
    };

    conn.on('close', lost);
    conn.on('error', lost);

    const attach = () => {
      const pc = conn.peerConnection;
      if (!pc) return setTimeout(attach, 500);
      const check = () => {
        const status = pc.iceConnectionState;
        if (status === 'failed' || status === 'closed') return lost();
        if (status === 'disconnected') graceTimer = setTimeout(() => {
          if (pc.iceConnectionState !== 'connected' && pc.iceConnectionState !== 'completed') lost();
        }, 5000);
        else clearTimeout(graceTimer);
      };
      pc.addEventListener('iceconnectionstatechange', check);
      pc.addEventListener('connectionstatechange', () => {
        if (pc.connectionState === 'failed' || pc.connectionState === 'closed') lost();
      });
      check();
    };
    attach();
  }

  function generateRoomCode() {
    const chars = 'BCDFGHJKLMNPQRSTVWXYZ';
    let code = '';
    for (let i = 0; i < 4; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
    return code;
  }

  function broadcast(data) {
    Object.values(state.players).forEach((p) => { if (p.conn && p.conn.open) p.conn.send(data); });
  }

  function startHosting() {
    mountSettings('host-settings-target');
    showScreen('screen-mp-host');
    $('room-code').textContent = '....';
    state.isHost = true;
    state.players = {};
    updateHostRoster();

    loadPeerLibrary()
      .then(() => openHostPeer(0))
      .catch(() => {
        setError('host-error', 'Could not load the multiplayer library. Check your connection and try again.');
        $('room-code').textContent = '----';
      });
  }

  function openHostPeer(attempt) {
    if (state.peer) { state.peer.destroy(); state.peer = null; }
    const peer = new Peer(generateRoomCode(), PEER_CONFIG);
    state.peer = peer;

    peer.on('open', (id) => { $('room-code').textContent = id; updateHostRoster(); });

    peer.on('error', (err) => {
      // A taken room code is worth retrying silently with a fresh one.
      if (err && err.type === 'unavailable-id' && attempt < 3) return openHostPeer(attempt + 1);
      setError('host-error', 'Network error: ' + ((err && err.type) || 'unknown'));
      showToast('Network error: ' + ((err && err.type) || 'unknown'), 'bad');
    });

    peer.on('connection', (connection) => {
      connection.on('data', (msg) => handleHostMessage(connection, msg));
      watchConnection(connection, () => {
        if (!state.players[connection.peer]) return;
        const name = state.players[connection.peer].name;
        delete state.players[connection.peer];
        updateHostRoster();
        updateStats();
        renderDynamicLeaderboard();
        showToast(name + ' left the match.', 'bad');
        // A departing player must not hold the round open for everyone else.
        checkAllAnswered();
      });
    });
  }

  function handleHostMessage(connection, msg) {
    if (!msg || typeof msg.type !== 'string') return;

    if (msg.type === 'JOIN') {
      state.players[connection.peer] = {
        conn: connection,
        name: String(msg.name || 'Player').slice(0, 15),
        score: 0,
        answer: null,
        // A player who joins mid-round is not blocking the current question.
        hasAnswered: state.roundResolved || !state.isMultiplayer
      };
      updateHostRoster();
    } else if (msg.type === 'ANSWER_SUBMITTED') {
      const player = state.players[connection.peer];
      if (player) { player.answer = msg.answer; player.hasAnswered = true; }
      checkAllAnswered();
    } else if (msg.type === 'ATTACK') {
      processAttackFromClient(connection.peer, msg.attackType);
    } else if (msg.type === 'ATTACK_SUCCESS') {
      creditAttacker(msg.attacker, Number(msg.amount) || 0);
    } else if (msg.type === 'SCORE_SYNC') {
      if (state.players[connection.peer]) {
        state.players[connection.peer].score = Number(msg.score) || 0;
        renderDynamicLeaderboard();
      }
    }
  }

  function creditAttacker(attackerId, amount) {
    if (amount <= 0) return;
    if (attackerId === 'HOST') {
      state.score += amount;
      updateStats();
      showToast('You stole ' + amount + ' points!', 'good');
    } else if (state.players[attackerId]) {
      state.players[attackerId].score += amount;
      sendTo(attackerId, { type: 'TOAST', msg: 'You stole ' + amount + ' points!', t: 'good' });
      sendTo(attackerId, { type: 'SCORE_SYNC', score: state.players[attackerId].score });
    }
    renderDynamicLeaderboard();
  }

  function sendTo(playerId, payload) {
    const player = state.players[playerId];
    if (player && player.conn && player.conn.open) player.conn.send(payload);
  }

  function updateHostRoster() {
    const roster = $('host-roster');
    roster.textContent = '';
    roster.appendChild(el('div', 'roster-item is-host', state.playerName + ' (Host)'));
    const names = Object.values(state.players).map((p) => p.name);
    names.forEach((name) => roster.appendChild(el('div', 'roster-item', name)));
    if (!names.length) roster.appendChild(el('div', 'roster-item subtle', 'Waiting for players to join...'));
    broadcast({ type: 'ROSTER_UPDATE', names: names, hostName: state.playerName });
  }

  function hostStartGame() {
    const settings = readSettings('host-error');
    if (!settings) return;

    state.questions = buildSession(settings.filters, settings.count);
    if (!state.questions.length) return setError('host-error', 'No questions matched those settings.');

    state.isMultiplayer = true;
    state.useTimer = settings.useTimer;
    state.timerSeconds = settings.seconds;
    state.lastSettings = settings;

    broadcast({
      type: 'START',
      data: state.questions,
      useTimer: settings.useTimer,
      timerSeconds: settings.seconds,
      subject: state.subject
    });
    startGame();
  }

  function joinGame() {
    if (!requireName()) return showScreen('screen-main-menu');
    const code = $('join-code-input').value.trim().toUpperCase();
    if (code.length !== 4) {
      $('join-status-msg').textContent = 'Room codes are four letters.';
      return;
    }

    $('join-btn').disabled = true;
    $('join-status-msg').textContent = 'Connecting...';

    loadPeerLibrary().then(() => {
      state.isHost = false;
      state.peer = new Peer(PEER_CONFIG);

      state.peer.on('open', () => {
        state.conn = state.peer.connect(code);
        setupClientConnection();
      });

      state.peer.on('error', (err) => {
        const missing = err && err.type === 'peer-unavailable';
        $('join-status-msg').textContent = missing ? 'No room found with that code.' : 'Connection failed.';
        showToast(missing ? 'Room not found.' : 'Network error.', 'bad');
        $('join-btn').disabled = false;
      });
    }).catch(() => {
      $('join-status-msg').textContent = 'Could not load the multiplayer library.';
      $('join-btn').disabled = false;
    });
  }

  function setupClientConnection() {
    const conn = state.conn;

    conn.on('open', () => {
      state.isMultiplayer = true;
      $('joined-room-code').textContent = conn.peer;
      $('join-btn').disabled = false;
      $('join-status-msg').textContent = '';
      showScreen('screen-mp-join');
      conn.send({ type: 'JOIN', name: state.playerName });
    });

    conn.on('data', (msg) => {
      if (!msg || typeof msg.type !== 'string') return;

      if (msg.type === 'ROSTER_UPDATE') {
        const roster = $('join-roster');
        roster.textContent = '';
        roster.appendChild(el('div', 'roster-item is-host', String(msg.hostName || 'Host') + ' (Host)'));
        (msg.names || []).forEach((name) => {
          const mine = name === state.playerName;
          roster.appendChild(el('div', 'roster-item' + (mine ? ' is-me' : ''), name + (mine ? ' (You)' : '')));
        });
        state.playerCount = (msg.names || []).length + 1;
        updateStats();
      } else if (msg.type === 'START') {
        if (!Array.isArray(msg.data) || !msg.data.length) return;
        if (SUBJECTS[msg.subject]) {
          $('subject-dropdown').value = msg.subject;
          applySubject();
        }
        state.questions = msg.data;
        state.useTimer = !!msg.useTimer;
        state.timerSeconds = clamp(Number(msg.timerSeconds) || 20, 5, 300);
        state.isMultiplayer = true;
        startGame();
      } else if (msg.type === 'ROUND_RESULTS') {
        resolveRound(msg.correctAnswer);
      } else if (msg.type === 'NEXT_QUESTION') {
        nextQuestion();
      } else if (msg.type === 'LB_SYNC') {
        state.currentLeader = msg.leader;
        state.playerCount = (msg.lb || []).length;
        renderLeaderboardRows(msg.lb || []);
        updateStats();
      } else if (msg.type === 'ATTACK_RECEIVED') {
        handleIncomingAttack(msg.attackType, msg.attacker);
      } else if (msg.type === 'TOAST') {
        showToast(String(msg.msg || ''), msg.t);
      } else if (msg.type === 'SCORE_SYNC') {
        state.score = Number(msg.score) || 0;
        updateStats();
      }
    });

    watchConnection(conn, () => {
      if (!state.isMultiplayer) return;
      leaveMatch();
      showToast('Lost connection to the host.', 'bad');
    });
  }

  /** Tears the match down without prompting - used when the host vanishes. */
  function leaveMatch() {
    stopTimer();
    clearInterval(state.breakInterval);
    clearTimeout(state.advanceTimeout);
    if (state.conn) { try { state.conn.close(); } catch (e) { /* already gone */ } state.conn = null; }
    if (state.peer) { try { state.peer.destroy(); } catch (e) { /* already gone */ } state.peer = null; }
    state.isMultiplayer = false;
    state.isHost = false;
    state.players = {};
    closeLeaderboard();
    $('join-btn').disabled = false;
    $('join-status-msg').textContent = '';
    setError('host-error', '');
    showScreen('screen-main-menu');
  }

  function quitToMenu() {
    const inMatch = state.isMultiplayer || $('screen-quiz').classList.contains('active');
    if (inMatch && !window.confirm('Quit this session and return to the main menu?')) return;
    leaveMatch();
  }

  // --- round break / leaderboard ----------------------------------------

  function openLeaderboard() {
    $('leaderboard-modal').classList.add('open');
    $('lb-timer').textContent = String(ROUND_BREAK_SECONDS);

    let countdown = ROUND_BREAK_SECONDS;
    clearInterval(state.breakInterval);
    state.breakInterval = setInterval(() => {
      countdown--;
      $('lb-timer').textContent = String(Math.max(0, countdown));
      if (countdown <= 0) {
        clearInterval(state.breakInterval);
        // Only the host drives the clock; clients wait for NEXT_QUESTION so
        // everyone stays on the same question even with uneven latency.
        if (state.isHost) { broadcast({ type: 'NEXT_QUESTION' }); nextQuestion(); }
      }
    }, 1000);
  }

  function closeLeaderboard() {
    clearInterval(state.breakInterval);
    $('leaderboard-modal').classList.remove('open');
  }

  function renderDynamicLeaderboard() {
    if (!state.isHost) return;
    const rows = [{ id: 'HOST', name: state.playerName, score: state.score }];
    Object.keys(state.players).forEach((id) => {
      rows.push({ id: id, name: state.players[id].name, score: state.players[id].score });
    });
    rows.sort((a, b) => b.score - a.score);
    state.currentLeader = rows[0].name;
    renderLeaderboardRows(rows);
    broadcast({ type: 'LB_SYNC', lb: rows, leader: state.currentLeader });
  }

  function renderLeaderboardRows(rows) {
    const container = $('lb-list-container');
    container.textContent = '';
    rows.forEach((player, i) => {
      const mine = state.isHost ? player.id === 'HOST' : player.name === state.playerName;
      const row = el('div', 'lb-row' + (mine ? ' me' : ''));
      row.appendChild(el('span', null, (i + 1) + '. ' + player.name));
      row.appendChild(el('span', null, String(player.score)));
      container.appendChild(row);
    });
  }

  // --- powerups ----------------------------------------------------------

  function renderShop() {
    const grid = $('dynamic-shop-grid');
    const names = subject().powerups;
    grid.textContent = '';
    POWERUP_ORDER.forEach((key) => {
      const btn = el('button', 'shop-item');
      btn.type = 'button';
      btn.appendChild(el('strong', null, names[key]));
      btn.appendChild(document.createTextNode(POWERUP_DESCRIPTIONS[key]));
      btn.appendChild(document.createElement('br'));
      btn.appendChild(el('span', 'cost', 'Cost: ' + POWERUP_COSTS[key]));
      btn.addEventListener('click', () => buyPowerup(key));
      grid.appendChild(btn);
    });
  }

  function buyPowerup(type) {
    const cost = POWERUP_COSTS[type];
    if (state.powerupsUsedThisRound >= MAX_POWERUPS_PER_ROUND) {
      return showToast('Limit reached: ' + MAX_POWERUPS_PER_ROUND + ' powerups per round.', 'bad');
    }
    if (state.score < cost) return showToast('Not enough points.', 'bad');
    if (['NUKE', 'STEAL', 'ZERO'].indexOf(type) !== -1 && !state.isMultiplayer) {
      return showToast('Attacks only work in multiplayer.', 'bad');
    }

    state.score -= cost;
    state.powerupsUsedThisRound++;
    const name = subject().powerups[type];

    if (type === 'ELIM2') { state.buffs.elim2 = true; showToast('Bought ' + name + ' (50/50).'); }
    if (type === 'AUTOCORRECT') { state.buffs.autocorrect = true; showToast('Bought ' + name + '.'); }
    if (type === 'DOUBLE') { state.buffs.doublePoints = true; showToast('Bought ' + name + '.'); }
    if (type === 'BLOCK') { state.buffs.blockAttacks++; showToast('Bought ' + name + ' (' + state.buffs.blockAttacks + ' stacked).'); }

    if (type === 'GAMBLE') {
      if (Math.random() > 0.5) { state.score += 200; showToast(name + ': won 200 points!', 'good'); }
      else { const lost = Math.min(state.score, 100); state.score -= lost; showToast(name + ': lost ' + lost + ' points.', 'bad'); }
    }

    if (['NUKE', 'STEAL', 'ZERO'].indexOf(type) !== -1) {
      showToast('Launched ' + name + '.');
      if (state.isHost) processAttackFromHost(type);
      else if (state.conn && state.conn.open) state.conn.send({ type: 'ATTACK', attackType: type });
    }

    updateStats();
    if (state.isHost) renderDynamicLeaderboard();
    else if (state.conn && state.conn.open) state.conn.send({ type: 'SCORE_SYNC', score: state.score });
  }

  function processAttackFromHost(type) {
    const targets = Object.keys(state.players);
    if (!targets.length) return showToast('No opponents to target.', 'bad');

    if (type === 'STEAL' || type === 'ZERO') {
      const target = targets[Math.floor(Math.random() * targets.length)];
      sendTo(target, { type: 'ATTACK_RECEIVED', attackType: type, attacker: 'HOST' });
    } else {
      targets.forEach((id) => sendTo(id, { type: 'ATTACK_RECEIVED', attackType: type, attacker: 'HOST' }));
    }
  }

  function processAttackFromClient(attackerId, type) {
    if (type === 'STEAL' || type === 'ZERO') {
      const targets = Object.keys(state.players).filter((id) => id !== attackerId).concat('HOST');
      const target = targets[Math.floor(Math.random() * targets.length)];
      if (target === 'HOST') handleIncomingAttack(type, attackerId);
      else sendTo(target, { type: 'ATTACK_RECEIVED', attackType: type, attacker: attackerId });
    } else {
      Object.keys(state.players).forEach((id) => {
        if (id !== attackerId) sendTo(id, { type: 'ATTACK_RECEIVED', attackType: type, attacker: attackerId });
      });
      handleIncomingAttack(type, attackerId);
    }
  }

  function handleIncomingAttack(type, attackerId) {
    if (state.buffs.blockAttacks > 0) {
      state.buffs.blockAttacks--;
      return showToast('Blocked an attack! (' + state.buffs.blockAttacks + ' left)', 'good');
    }

    let damage = 0;
    if (type === 'NUKE') {
      if (state.playerName === state.currentLeader) {
        damage = Math.min(state.score, 200);
        showToast('Nuked! You lost ' + damage + ' points.', 'bad');
      }
    } else if (type === 'STEAL') {
      damage = Math.min(state.score, 100);
      showToast('Robbed of ' + damage + ' points.', 'bad');
    } else if (type === 'ZERO') {
      state.buffs.zeroPoints = true;
      showToast('Silenced - your next correct answer scores 0.', 'bad');
    }

    if (damage > 0) {
      state.score -= damage;
      updateStats();
      if (state.isHost) creditAttacker(attackerId, damage);
      else if (state.conn && state.conn.open) {
        state.conn.send({ type: 'ATTACK_SUCCESS', amount: damage, attacker: attackerId });
        state.conn.send({ type: 'SCORE_SYNC', score: state.score });
      }
    }
  }

  // =======================================================================
  // KEYBOARD
  // =======================================================================

  function onKeyDown(event) {
    const tag = event.target.tagName;
    if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA' || event.metaKey || event.ctrlKey || event.altKey) return;
    if (!$('screen-quiz').classList.contains('active')) return;

    if (event.key === 'Escape') { event.preventDefault(); return quitToMenu(); }

    if (!state.answered) {
      const index = '1234'.indexOf(event.key) !== -1
        ? Number(event.key) - 1
        : 'abcd'.indexOf(event.key.toLowerCase());
      if (index >= 0) {
        const button = $('options-grid').children[index];
        if (button && !button.disabled && !button.classList.contains('eliminated')) {
          event.preventDefault();
          button.click();
        }
      }
      return;
    }

    if (event.key === 'Enter' && !$('btn-next').classList.contains('hidden')) {
      event.preventDefault();
      nextQuestion();
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

  function init() {
    restorePreferences();
    applySubject();

    $('subject-dropdown').addEventListener('change', applySubject);
    $('timer-toggle').addEventListener('change', function () { $('timer-seconds').disabled = !this.checked; });
    $('player-name-input').addEventListener('input', () => setError('name-error', ''));
    $('join-code-input').addEventListener('keydown', (e) => { if (e.key === 'Enter') joinGame(); });

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
    $('join-btn').addEventListener('click', joinGame);
    $('start-mp-btn').addEventListener('click', hostStartGame);
    $('btn-next').addEventListener('click', nextQuestion);

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
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

})();
