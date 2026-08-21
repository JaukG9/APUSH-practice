// =========================================================================
// PREFIX & SUFFIX PRACTICE - CONTENT MODULE
// =========================================================================
// Two exports:
//   affixVocab - the vocabulary list, generated from prefix_suffix_vocabulary.csv
//                (that CSV stays the source of truth; regenerate this list if
//                 the CSV changes). Every entry keeps its affix, type, meaning
//                 and any source note.
//   affixBank  - the question bank. Content only: no markup, no game logic.
//
// Question shape:
//   { id, affix, type, questionType, difficulty, question, options, answer, explanation }
//     affix        - the affix under test; "mixed" for multi-affix review items
//     type         - "prefix" | "suffix" | "mixed"
//     questionType - see QUESTION_TYPE_LABELS in app.js
//     difficulty   - "easy" | "medium" | "hard"
//     options      - exactly four distinct strings; one equals `answer`
//                    (the engine shuffles them, so stored order is irrelevant)
//
// Text convention: `backticks` mark an affix or word part. The renderer turns
// them into <code> elements, so question data never contains HTML.
// =========================================================================

const affixVocab = [
  { id: "p-ante", affix: "ante", display: "ante-", type: "prefix", meaning: "before", senses: ["before"] },
  { id: "p-ab", affix: "ab", display: "ab-", type: "prefix", meaning: "from; away", senses: ["from","away"] },
  { id: "p-ad", affix: "ad", display: "ad-", type: "prefix", meaning: "to; toward", senses: ["to","toward"] },
  { id: "p-anti", affix: "anti", display: "anti-", type: "prefix", meaning: "against", senses: ["against"] },
  { id: "p-auto", affix: "auto", display: "auto-", type: "prefix", meaning: "self", senses: ["self"] },
  { id: "p-be-1", affix: "be", display: "be-", type: "prefix", meaning: "thoroughly; make", senses: ["thoroughly","make"] },
  { id: "p-circum", affix: "circum", display: "circum-", type: "prefix", meaning: "around", senses: ["around"] },
  { id: "p-com", affix: "com", display: "com-", type: "prefix", meaning: "with; together", senses: ["with","together"] },
  { id: "p-contra", affix: "contra", display: "contra-", type: "prefix", meaning: "against", senses: ["against"] },
  { id: "p-de", affix: "de", display: "de-", type: "prefix", meaning: "down; from; away; off", senses: ["down","from","away","off"] },
  { id: "p-di", affix: "di", display: "di-", type: "prefix", meaning: "away; apart; not", senses: ["away","apart","not"], notes: "Grouped in source with dif/dis(L)" },
  { id: "p-dif", affix: "dif", display: "dif-", type: "prefix", meaning: "away; apart; not", senses: ["away","apart","not"], notes: "Grouped in source with di/dis(L)" },
  { id: "p-dis", affix: "dis", display: "dis-", type: "prefix", meaning: "away; apart; not", senses: ["away","apart","not"], notes: "(L) in source; grouped with di/dif" },
  { id: "p-ex", affix: "ex", display: "ex-", type: "prefix", meaning: "out of; from", senses: ["out of","from"] },
  { id: "p-extra", affix: "extra", display: "extra-", type: "prefix", meaning: "outside; beyond", senses: ["outside","beyond"] },
  { id: "p-fore", affix: "fore", display: "fore-", type: "prefix", meaning: "before", senses: ["before"] },
  { id: "p-hetero", affix: "hetero", display: "hetero-", type: "prefix", meaning: "other", senses: ["other"] },
  { id: "p-homo", affix: "homo", display: "homo-", type: "prefix", meaning: "same", senses: ["same"], notes: "(G) in source" },
  { id: "p-hyper", affix: "hyper", display: "hyper-", type: "prefix", meaning: "over; beyond; above", senses: ["over","beyond","above"] },
  { id: "p-hypo", affix: "hypo", display: "hypo-", type: "prefix", meaning: "under; beneath", senses: ["under","beneath"], notes: "(G) in source" },
  { id: "p-in", affix: "in", display: "in-", type: "prefix", meaning: "in; within; not", senses: ["in","within","not"], notes: "(L) in source" },
  { id: "p-inter", affix: "inter", display: "inter-", type: "prefix", meaning: "between", senses: ["between"] },
  { id: "p-intra", affix: "intra", display: "intra-", type: "prefix", meaning: "within; inside", senses: ["within","inside"], notes: "Source groups intra and intro together" },
  { id: "p-intro", affix: "intro", display: "intro-", type: "prefix", meaning: "within; inside", senses: ["within","inside"], notes: "Source groups intra and intro together" },
  { id: "p-macro", affix: "macro", display: "macro-", type: "prefix", meaning: "long; large", senses: ["long","large"] },
  { id: "p-mal", affix: "mal", display: "mal-", type: "prefix", meaning: "bad; evil; wrong", senses: ["bad","evil","wrong"] },
  { id: "p-be-2", affix: "be", display: "be-", type: "prefix", meaning: "good; well", senses: ["good","well"], notes: "Source lists 'be, bon'; duplicate be preserved exactly" },
  { id: "p-bon", affix: "bon", display: "bon-", type: "prefix", meaning: "good; well", senses: ["good","well"] },
  { id: "p-meta", affix: "meta", display: "meta-", type: "prefix", meaning: "after; beyond; over", senses: ["after","beyond","over"] },
  { id: "p-micro", affix: "micro", display: "micro-", type: "prefix", meaning: "small", senses: ["small"] },
  { id: "p-mis", affix: "mis", display: "mis-", type: "prefix", meaning: "wrong; bad", senses: ["wrong","bad"] },
  { id: "p-multi", affix: "multi", display: "multi-", type: "prefix", meaning: "many", senses: ["many"] },
  { id: "p-non", affix: "non", display: "non-", type: "prefix", meaning: "not", senses: ["not"] },
  { id: "p-orth", affix: "orth", display: "orth-", type: "prefix", meaning: "straight", senses: ["straight"] },
  { id: "p-post", affix: "post", display: "post-", type: "prefix", meaning: "after", senses: ["after"] },
  { id: "p-pre", affix: "pre", display: "pre-", type: "prefix", meaning: "before", senses: ["before"] },
  { id: "p-pro", affix: "pro", display: "pro-", type: "prefix", meaning: "before; forward; forth", senses: ["before","forward","forth"] },
  { id: "p-proto", affix: "proto", display: "proto-", type: "prefix", meaning: "first", senses: ["first"] },
  { id: "p-re", affix: "re", display: "re-", type: "prefix", meaning: "back; again", senses: ["back","again"] },
  { id: "p-retro", affix: "retro", display: "retro-", type: "prefix", meaning: "backward; back", senses: ["backward","back"] },
  { id: "p-se", affix: "se", display: "se-", type: "prefix", meaning: "aside; away; apart", senses: ["aside","away","apart"] },
  { id: "p-semi", affix: "semi", display: "semi-", type: "prefix", meaning: "half", senses: ["half"] },
  { id: "p-sub", affix: "sub", display: "sub-", type: "prefix", meaning: "under; beneath", senses: ["under","beneath"], notes: "(L) in source" },
  { id: "p-super", affix: "super", display: "super-", type: "prefix", meaning: "above; over; beyond", senses: ["above","over","beyond"] },
  { id: "p-tele", affix: "tele", display: "tele-", type: "prefix", meaning: "far", senses: ["far"] },
  { id: "p-trans", affix: "trans", display: "trans-", type: "prefix", meaning: "across", senses: ["across"] },
  { id: "p-ultra", affix: "ultra", display: "ultra-", type: "prefix", meaning: "beyond; excessive", senses: ["beyond","excessive"] },
  { id: "s-able", affix: "-able", display: "-able", type: "suffix", meaning: "able to be", senses: ["able to be"] },
  { id: "s-ible", affix: "-ible", display: "-ible", type: "suffix", meaning: "able to be", senses: ["able to be"], notes: "Source groups -able and -ible together" },
  { id: "s-eer", affix: "-eer", display: "-eer", type: "suffix", meaning: "one who", senses: ["one who"] },
  { id: "s-fic", affix: "-fic", display: "-fic", type: "suffix", meaning: "making; causing", senses: ["making","causing"], notes: "Source groups -fic and -fy together" },
  { id: "s-fy", affix: "-fy", display: "-fy", type: "suffix", meaning: "making; causing", senses: ["making","causing"], notes: "Source groups -fic and -fy together" },
  { id: "s-ful", affix: "-ful", display: "-ful", type: "suffix", meaning: "full of", senses: ["full of"] },
  { id: "s-hood", affix: "-hood", display: "-hood", type: "suffix", meaning: "state; quality of", senses: ["state","quality of"] },
  { id: "s-ine", affix: "-ine", display: "-ine", type: "suffix", meaning: "like; related to", senses: ["like","related to"] },
  { id: "s-ious", affix: "-ious", display: "-ious", type: "suffix", meaning: "characterized by; full of", senses: ["characterized by","full of"] },
  { id: "s-ish", affix: "-ish", display: "-ish", type: "suffix", meaning: "like", senses: ["like"] },
  { id: "s-ism", affix: "-ism", display: "-ism", type: "suffix", meaning: "state; quality of", senses: ["state","quality of"] },
  { id: "s-ity", affix: "-ity", display: "-ity", type: "suffix", meaning: "state; quality", senses: ["state","quality"] },
  { id: "s-less", affix: "-less", display: "-less", type: "suffix", meaning: "without", senses: ["without"] },
  { id: "s-ous", affix: "-ous", display: "-ous", type: "suffix", meaning: "having quality of", senses: ["having quality of"] },
  { id: "s-tude", affix: "-tude", display: "-tude", type: "suffix", meaning: "state; quality of", senses: ["state","quality of"] }
];

const affixBank = [

  // ---------------------------------------------------------------------
  // MEANING IDENTIFICATION - name the meaning an affix carries
  // ---------------------------------------------------------------------
  {
    id: "af001", affix: "ante", type: "prefix",
    questionType: "meaning", difficulty: "easy",
    question: "Which meaning does the prefix `ante-` add to a word?",
    options: ["before", "after", "against", "around"],
    answer: "before",
    explanation: "`ante-` means \"before\" - an anteroom is the smaller room you pass through before the main one. \"After\" belongs to `post-`, and \"against\" to `anti-`."
  },
  {
    id: "af002", affix: "auto", type: "prefix",
    questionType: "meaning", difficulty: "easy",
    question: "Which meaning does the prefix `auto-` add to a word?",
    options: ["self", "same", "other", "many"],
    answer: "self",
    explanation: "`auto-` means \"self\" - an autobiography is a life story written by the person themselves. \"Same\" is `homo-` and \"other\" is `hetero-`."
  },
  {
    id: "af003", affix: "circum", type: "prefix",
    questionType: "meaning", difficulty: "easy",
    question: "Which meaning does the prefix `circum-` add to a word?",
    options: ["around", "across", "between", "beyond"],
    answer: "around",
    explanation: "`circum-` means \"around\" - think of a circle. \"Across\" is `trans-`, \"between\" is `inter-`, and \"beyond\" is `ultra-`."
  },
  {
    id: "af004", affix: "-less", type: "suffix",
    questionType: "meaning", difficulty: "easy",
    question: "Which meaning does the suffix `-less` add to a word?",
    options: ["without", "full of", "able to be", "one who"],
    answer: "without",
    explanation: "`-less` means \"without,\" so a careless driver is one without care. \"Full of\" is `-ful`, which is its exact opposite."
  },
  {
    id: "af005", affix: "semi", type: "prefix",
    questionType: "meaning", difficulty: "easy",
    question: "Which meaning does the prefix `semi-` add to a word?",
    options: ["half", "many", "first", "small"],
    answer: "half",
    explanation: "`semi-` means \"half\" - a semicircle is half a circle. Note that half is about proportion, not size: \"small\" is `micro-`."
  },
  {
    id: "af006", affix: "tele", type: "prefix",
    questionType: "meaning", difficulty: "easy",
    question: "Which meaning does the prefix `tele-` add to a word?",
    options: ["far", "near", "around", "after"],
    answer: "far",
    explanation: "`tele-` means \"far\" - a telescope lets you see far away, and a telephone carries a voice over distance. It points away from you, not toward you."
  },
  {
    id: "af007", affix: "-eer", type: "suffix",
    questionType: "meaning", difficulty: "easy",
    question: "Which meaning does the suffix `-eer` add to a word?",
    options: ["one who", "without", "full of", "making or causing"],
    answer: "one who",
    explanation: "`-eer` names a person: an auctioneer is one who runs auctions, and an engineer is one who works with engines."
  },
  {
    id: "af008", affix: "hetero", type: "prefix",
    questionType: "meaning", difficulty: "medium",
    question: "Which meaning does the prefix `hetero-` add to a word?",
    options: ["other", "same", "self", "equal"],
    answer: "other",
    explanation: "`hetero-` means \"other\" or different. Its partner `homo-` means \"same,\" so the two are routinely confused - keep them paired in your memory."
  },
  {
    id: "af009", affix: "hypo", type: "prefix",
    questionType: "meaning", difficulty: "medium",
    question: "Which meaning does the prefix `hypo-` add to a word?",
    options: ["under or beneath", "over or above", "around", "apart"],
    answer: "under or beneath",
    explanation: "`hypo-` means \"under\" - a hypodermic needle goes under the skin. The near-twin `hyper-` means the opposite: over or above."
  },
  {
    id: "af010", affix: "intra", type: "prefix",
    questionType: "meaning", difficulty: "medium",
    question: "Which meaning does the prefix `intra-` add to a word?",
    options: ["within", "between", "outside", "after"],
    answer: "within",
    explanation: "`intra-` means \"within\" or inside a single thing. `inter-` means \"between\" two or more things - one letter, opposite scope."
  },
  {
    id: "af011", affix: "retro", type: "prefix",
    questionType: "meaning", difficulty: "medium",
    question: "Which meaning does the prefix `retro-` add to a word?",
    options: ["backward", "forward", "around", "downward"],
    answer: "backward",
    explanation: "`retro-` means \"backward\" or back - retrospect is looking back. \"Forward\" belongs to `pro-` and \"down\" to `de-`."
  },
  {
    id: "af012", affix: "ultra", type: "prefix",
    questionType: "meaning", difficulty: "medium",
    question: "Which meaning does the prefix `ultra-` add to a word?",
    options: ["beyond or excessive", "not enough", "equal to", "underneath"],
    answer: "beyond or excessive",
    explanation: "`ultra-` means \"beyond\" - ultraviolet light lies past the violet end of the visible spectrum. It always overshoots a limit rather than falling short of one."
  },
  {
    id: "af013", affix: "-ine", type: "suffix",
    questionType: "meaning", difficulty: "hard",
    question: "In `canine` (`can-` = dog), what does the suffix `-ine` contribute?",
    options: ["like or related to", "without", "full of", "one who"],
    answer: "like or related to",
    explanation: "`-ine` means \"like\" or related to, so canine means doglike. It describes a resemblance rather than a quantity - \"full of\" would be `-ful`."
  },
  {
    id: "af014", affix: "-ious", type: "suffix",
    questionType: "meaning", difficulty: "medium",
    question: "`Spacious` describes a room with plenty of space. What does the suffix `-ious` contribute?",
    options: ["characterized by or full of", "without", "able to be", "before"],
    answer: "characterized by or full of",
    explanation: "`-ious` means \"characterized by\" or full of. A spacious room is characterized by space; a cautious person is full of caution."
  },
  {
    id: "af015", affix: "super", type: "prefix",
    questionType: "meaning", difficulty: "medium",
    question: "In `superstructure`, what does the prefix `super-` contribute?",
    options: ["above or over", "beneath", "around", "between"],
    answer: "above or over",
    explanation: "`super-` means \"above, over, beyond\" - a superstructure is the part built on top of a base. \"Beneath\" would be `sub-` or `hypo-`."
  },

  // ---------------------------------------------------------------------
  // SENTENCE INTERPRETATION - what the affix contributes inside a real word
  // ---------------------------------------------------------------------
  {
    id: "af016", affix: "pre", type: "prefix",
    questionType: "sentence", difficulty: "easy",
    question: "Every applicant must pass the prerequisite course. What does `pre-` contribute to `prerequisite`?",
    options: ["required before", "required afterward", "required instead", "required repeatedly"],
    answer: "required before",
    explanation: "`pre-` means \"before,\" so a prerequisite is required before you may go on. \"Repeatedly\" would come from `re-`."
  },
  {
    id: "af017", affix: "re", type: "prefix",
    questionType: "sentence", difficulty: "easy",
    question: "The committee will reconvene on Monday. What does `re-` contribute to `reconvene`?",
    options: ["again", "before", "against", "instead"],
    answer: "again",
    explanation: "`re-` means \"back\" or \"again\" - the committee meets again. It never signals a first time; that idea belongs to `proto-`."
  },
  {
    id: "af018", affix: "ante", type: "prefix",
    questionType: "sentence", difficulty: "medium",
    question: "The lawyer produced an antenuptial agreement. What does `ante-` tell you about when it was signed?",
    options: ["before the marriage", "after the marriage", "during the marriage", "instead of a marriage"],
    answer: "before the marriage",
    explanation: "`ante-` means \"before,\" so the agreement predates the wedding. The commoner spelling of the same idea is prenuptial, built on `pre-`."
  },
  {
    id: "af019", affix: "circum", type: "prefix",
    questionType: "sentence", difficulty: "medium",
    question: "The crew circumnavigated the globe. What does `circum-` contribute to `circumnavigated`?",
    options: ["sailed around it", "sailed straight across it", "sailed beneath it", "sailed halfway"],
    answer: "sailed around it",
    explanation: "`circum-` means \"around,\" so they sailed the whole way round. Sailing across would need `trans-`, as in transatlantic."
  },
  {
    id: "af020", affix: "sub", type: "prefix",
    questionType: "sentence", difficulty: "medium",
    question: "Researchers mapped a submarine canyon off the coast. What does `sub-` contribute here?",
    options: ["beneath the sea", "beyond the sea", "beside the sea", "between two seas"],
    answer: "beneath the sea",
    explanation: "`sub-` means \"under,\" so the canyon lies below the water. \"Between\" would call for `inter-`."
  },
  {
    id: "af021", affix: "trans", type: "prefix",
    questionType: "sentence", difficulty: "medium",
    question: "The nurse applied a transdermal patch (`derm-` = skin). What does `trans-` say about how the medicine travels?",
    options: ["across the skin", "beneath the skin", "around the wound", "against the infection"],
    answer: "across the skin",
    explanation: "`trans-` means \"across,\" so the dose passes across and through the skin. A hypodermic needle, by contrast, delivers it under the skin."
  },
  {
    id: "af022", affix: "mal", type: "prefix",
    questionType: "sentence", difficulty: "medium",
    question: "The family sued the clinic for malpractice. What does `mal-` contribute to `malpractice`?",
    options: ["bad or wrongful", "repeated", "partial", "self-directed"],
    answer: "bad or wrongful",
    explanation: "`mal-` means \"bad, evil, wrong,\" so malpractice is bad practice. Its opposite on this list is `bon-`, meaning good or well."
  },
  {
    id: "af023", affix: "inter", type: "prefix",
    questionType: "sentence", difficulty: "medium",
    question: "The treaty regulates intercontinental flights. What does `inter-` contribute?",
    options: ["between continents", "within one continent", "above the continents", "against a continent"],
    answer: "between continents",
    explanation: "`inter-` means \"between,\" so the flights run from one continent to another. A flight staying inside one continent would be intracontinental."
  },
  {
    id: "af024", affix: "de", type: "prefix",
    questionType: "sentence", difficulty: "medium",
    question: "The company voted to decentralize its offices. What does `de-` contribute to `decentralize`?",
    options: ["away from a center", "toward a center", "around a center", "within a center"],
    answer: "away from a center",
    explanation: "`de-` means \"down, from, away, off,\" so decentralizing pushes authority away from the center. \"Toward\" would be `ad-`."
  },
  {
    id: "af025", affix: "ab", type: "prefix",
    questionType: "sentence", difficulty: "medium",
    question: "The film opens with an abduction (`duct-` = to lead). What does `ab-` contribute?",
    options: ["led away", "led toward", "led together", "led again"],
    answer: "led away",
    explanation: "`ab-` means \"from\" or \"away,\" so an abduction is a leading away. Swap in `ad-` (\"toward\") and you get adduct, to draw toward the body."
  },
  {
    id: "af026", affix: "-ous", type: "suffix",
    questionType: "sentence", difficulty: "medium",
    question: "A sign warned that the fumes were noxious. What does `-ous` contribute to `noxious`?",
    options: ["having that quality", "without that quality", "one who does that", "able to be done"],
    answer: "having that quality",
    explanation: "`-ous` means \"having the quality of,\" so noxious fumes carry the quality of harm. \"Able to be\" would be `-able` or `-ible`."
  },
  {
    id: "af027", affix: "hypo", type: "prefix",
    questionType: "sentence", difficulty: "hard",
    question: "A lab report labels a solution hypotonic. What does `hypo-` indicate about its concentration?",
    options: ["below the reference level", "above the reference level", "exactly at the reference level", "changing unpredictably"],
    answer: "below the reference level",
    explanation: "`hypo-` means \"under,\" so a hypotonic solution sits below the comparison concentration. A hypertonic one sits above it - the prefix carries the entire distinction."
  },
  {
    id: "af028", affix: "se", type: "prefix",
    questionType: "sentence", difficulty: "hard",
    question: "The judge ordered the jury sequestered for three weeks. What does `se-` contribute to `sequestered`?",
    options: ["set apart from others", "brought together with others", "questioned repeatedly", "released early"],
    answer: "set apart from others",
    explanation: "`se-` means \"aside, away, apart,\" so a sequestered jury is kept apart. `com-` does the reverse: to convene is to come together."
  },
  {
    id: "af029", affix: "meta", type: "prefix",
    questionType: "sentence", difficulty: "hard",
    question: "Critics call the novel a work of metafiction. What does `meta-` contribute?",
    options: ["it goes beyond ordinary fiction to comment on fiction itself", "it argues against the value of fiction", "it was written before the modern novel", "it contains no invented material"],
    answer: "it goes beyond ordinary fiction to comment on fiction itself",
    explanation: "`meta-` means \"after, beyond, over,\" so metafiction stands over its own storytelling and comments on it. Arguing against would need `anti-` or `contra-`."
  },
  {
    id: "af030", affix: "pro", type: "prefix",
    questionType: "sentence", difficulty: "medium",
    question: "The engine propels the boat (`pel-` = to drive). What does `pro-` contribute to `propels`?",
    options: ["drives forward", "drives backward", "drives apart", "drives under"],
    answer: "drives forward",
    explanation: "`pro-` means \"before, forward, forth.\" Its mirror image is `retro-`, meaning backward - compare proactive with retroactive."
  },

  // ---------------------------------------------------------------------
  // WORD-PART IDENTIFICATION - locate the part that carries a given meaning
  // ---------------------------------------------------------------------
  {
    id: "af031", affix: "-hood", type: "suffix",
    questionType: "wordpart", difficulty: "easy",
    question: "Which part of `nationhood` carries the meaning \"state or quality of\"?",
    options: ["`-hood`", "`nation-`", "`-ion`", "`-tude`"],
    answer: "`-hood`",
    explanation: "`-hood` means \"state or quality of,\" so nationhood is the state of being a nation. `-tude` means the same thing but does not appear in this word."
  },
  {
    id: "af032", affix: "micro", type: "prefix",
    questionType: "wordpart", difficulty: "easy",
    question: "Which part of `microscope` carries the meaning \"small\"?",
    options: ["`micro-`", "`-scope`", "`macro-`", "`-ope`"],
    answer: "`micro-`",
    explanation: "`micro-` means \"small\" and `-scope` means to look, so a microscope looks at small things. `macro-` is its opposite: long or large."
  },
  {
    id: "af033", affix: "sub", type: "prefix",
    questionType: "wordpart", difficulty: "medium",
    question: "Which part of `subterranean` carries the meaning \"under\"?",
    options: ["`sub-`", "`terra-`", "`-ean`", "`hypo-`"],
    answer: "`sub-`",
    explanation: "`sub-` means \"under\" and `terra-` means earth, so subterranean means underground. `hypo-` also means under, but it is not part of this word."
  },
  {
    id: "af034", affix: "contra", type: "prefix",
    questionType: "wordpart", difficulty: "medium",
    question: "Which part of `contradiction` carries the meaning \"against\"?",
    options: ["`contra-`", "`dict-`", "`-ion`", "`anti-`"],
    answer: "`contra-`",
    explanation: "`contra-` means \"against\" and `dict-` means to speak, so a contradiction speaks against something. `anti-` shares the meaning but not this word."
  },
  {
    id: "af035", affix: "-tude", type: "suffix",
    questionType: "wordpart", difficulty: "medium",
    question: "Which part of `multitude` carries the meaning \"state or quality of\"?",
    options: ["`-tude`", "`multi-`", "`-it-`", "`-hood`"],
    answer: "`-tude`",
    explanation: "`-tude` supplies \"state or quality of\" while `multi-` supplies \"many\" - together, the state of being many. Both are real affixes, so read the position carefully."
  },
  {
    id: "af036", affix: "-ity", type: "suffix",
    questionType: "wordpart", difficulty: "medium",
    question: "Which part of `clarity` carries the meaning \"state or quality\"?",
    options: ["`-ity`", "`clar-`", "`-ar-`", "`-hood`"],
    answer: "`-ity`",
    explanation: "`-ity` means \"state or quality,\" so clarity is the quality of being clear. `-hood` expresses the same idea in other words, such as likelihood."
  },
  {
    id: "af037", affix: "intro", type: "prefix",
    questionType: "wordpart", difficulty: "hard",
    question: "Which part of `introspection` carries the meaning \"within\"?",
    options: ["`intro-`", "`-spect-`", "`-ion`", "`intra-`"],
    answer: "`intro-`",
    explanation: "`intro-` means \"within\" and `-spect-` means to look, so introspection is looking inward. `intra-` carries the same meaning but is not the part used here."
  },
  {
    id: "af038", affix: "dis", type: "prefix",
    questionType: "wordpart", difficulty: "hard",
    question: "Which part of `dissect` carries the meaning \"apart\"?",
    options: ["`dis-`", "`sect-`", "`-ct`", "`se-`"],
    answer: "`dis-`",
    explanation: "`dis-` means \"away, apart, not\" and `sect-` means to cut, so dissecting is cutting apart. `se-` also means apart, which makes it a tempting but absent option."
  },
  {
    id: "af039", affix: "anti", type: "prefix",
    questionType: "wordpart", difficulty: "hard",
    question: "`Antipathy` and `sympathy` share the root `path-` (\"feeling\"). Which part makes `antipathy` the hostile one?",
    options: ["`anti-`", "`path-`", "`-y`", "`ante-`"],
    answer: "`anti-`",
    explanation: "`anti-` means \"against,\" so antipathy is feeling against something. Watch the vowel: `ante-` means \"before\" and would change the word entirely."
  },

  // ---------------------------------------------------------------------
  // DEFINITION TO AFFIX - given a meaning, pick the affix that carries it
  // ---------------------------------------------------------------------
  {
    id: "af040", affix: "-less", type: "suffix",
    questionType: "definition", difficulty: "easy",
    question: "Which affix means \"without\"?",
    options: ["`-less`", "`-ful`", "`-ous`", "`-eer`"],
    answer: "`-less`",
    explanation: "`-less` means \"without\": a penniless traveler has no money. `-ful` and `-ous` both point the other way, toward having something."
  },
  {
    id: "af041", affix: "auto", type: "prefix",
    questionType: "definition", difficulty: "easy",
    question: "Which affix means \"self\"?",
    options: ["`auto-`", "`homo-`", "`hetero-`", "`multi-`"],
    answer: "`auto-`",
    explanation: "`auto-` means \"self,\" as in autopilot. `homo-` means same and `hetero-` means other - similar-sounding territory, different idea."
  },
  {
    id: "af042", affix: "semi", type: "prefix",
    questionType: "definition", difficulty: "easy",
    question: "Which affix means \"half\"?",
    options: ["`semi-`", "`multi-`", "`micro-`", "`sub-`"],
    answer: "`semi-`",
    explanation: "`semi-` means \"half.\" A half is a fraction of a whole, not a size, so `micro-` (small) does not fit."
  },
  {
    id: "af043", affix: "multi", type: "prefix",
    questionType: "definition", difficulty: "easy",
    question: "Which affix means \"many\"?",
    options: ["`multi-`", "`macro-`", "`semi-`", "`meta-`"],
    answer: "`multi-`",
    explanation: "`multi-` means \"many\" - a number of things. `macro-` also feels big, but it means large in size rather than many in count."
  },
  {
    id: "af044", affix: "bon", type: "prefix",
    questionType: "definition", difficulty: "easy",
    question: "Which affix means \"good; well\"?",
    options: ["`bon-`", "`mal-`", "`mis-`", "`non-`"],
    answer: "`bon-`",
    explanation: "`bon-` means \"good; well.\" `mal-` and `mis-` both mean bad or wrong, and `non-` simply means not."
  },
  {
    id: "af045", affix: "circum", type: "prefix",
    questionType: "definition", difficulty: "medium",
    question: "Which affix means \"around\"?",
    options: ["`circum-`", "`trans-`", "`inter-`", "`extra-`"],
    answer: "`circum-`",
    explanation: "`circum-` means \"around.\" `trans-` cuts across, `inter-` sits between, and `extra-` goes outside - all movement, but none of them circular."
  },
  {
    id: "af046", affix: "-eer", type: "suffix",
    questionType: "definition", difficulty: "medium",
    question: "Which affix names a person - \"one who\"?",
    options: ["`-eer`", "`-ish`", "`-ine`", "`-ity`"],
    answer: "`-eer`",
    explanation: "`-eer` means \"one who,\" as in mountaineer. `-ish` and `-ine` describe resemblance, and `-ity` names a state or quality."
  },
  {
    id: "af047", affix: "proto", type: "prefix",
    questionType: "definition", difficulty: "hard",
    question: "Which affix means \"first\"?",
    options: ["`proto-`", "`pre-`", "`ante-`", "`fore-`"],
    answer: "`proto-`",
    explanation: "`proto-` means \"first\" - a prototype is the original model. The other three all mean \"before,\" which is close but not the same: a prerace meal comes before the race without being the first race."
  },
  {
    id: "af048", affix: "orth", type: "prefix",
    questionType: "definition", difficulty: "hard",
    question: "Which affix means \"straight\"?",
    options: ["`orth-`", "`pro-`", "`retro-`", "`di-`"],
    answer: "`orth-`",
    explanation: "`orth-` means \"straight\" - orthodontics straightens teeth. `pro-` and `retro-` give direction (forward, backward) rather than straightness."
  },
  {
    id: "af049", affix: "se", type: "prefix",
    questionType: "definition", difficulty: "hard",
    question: "Which affix means \"aside; apart\"?",
    options: ["`se-`", "`com-`", "`ad-`", "`sub-`"],
    answer: "`se-`",
    explanation: "`se-` means \"aside, away, apart,\" as in secede. `com-` is its opposite - with or together - while `ad-` means toward."
  },
  {
    id: "af050", affix: "hetero", type: "prefix",
    questionType: "definition", difficulty: "hard",
    question: "Which affix means \"other,\" as opposed to \"same\"?",
    options: ["`hetero-`", "`homo-`", "`auto-`", "`intra-`"],
    answer: "`hetero-`",
    explanation: "`hetero-` means \"other\" and `homo-` means \"same.\" A heterogeneous crowd is mixed; a homogeneous one is uniform."
  },

  // ---------------------------------------------------------------------
  // AFFIX IN CONTEXT - use morphology to read an unfamiliar word
  // ---------------------------------------------------------------------
  {
    id: "af051", affix: "non", type: "prefix",
    questionType: "context", difficulty: "easy",
    question: "A relief agency ships nonperishable food (`perishable` = likely to spoil). What is it shipping?",
    options: ["food that will not spoil", "food that spoils very quickly", "food that is only half prepared", "food that has already spoiled"],
    answer: "food that will not spoil",
    explanation: "`non-` simply means \"not,\" so nonperishable food is food that will not spoil. `semi-` would have given you \"half.\""
  },
  {
    id: "af052", affix: "mis", type: "prefix",
    questionType: "context", difficulty: "medium",
    question: "A manual warns against misapplication of the sealant. What is it warning about?",
    options: ["applying it wrongly", "applying far too much", "never applying it", "applying it a second time"],
    answer: "applying it wrongly",
    explanation: "`mis-` means \"wrong; bad.\" Too much would be `hyper-` or `ultra-`, not applying at all would be `non-`, and a second coat would be `re-`."
  },
  {
    id: "af053", affix: "intra", type: "prefix",
    questionType: "context", difficulty: "medium",
    question: "A biologist measures intracellular fluid (`cellular` = of cells). Where is that fluid?",
    options: ["inside the cells", "between the cells", "around the outside of the cells", "flowing across cell walls"],
    answer: "inside the cells",
    explanation: "`intra-` means \"within,\" so the fluid is inside the cells. Fluid between them would be intercellular, and fluid crossing the wall would be transcellular."
  },
  {
    id: "af054", affix: "-ible", type: "suffix",
    questionType: "context", difficulty: "medium",
    question: "An engineer designs a submersible craft (`mers-` = to dip or plunge). What do the word parts tell you it can do?",
    options: ["it can be taken under the water", "it can float no matter how heavy it is", "it can travel across the water quickly", "it can be steered without a crew"],
    answer: "it can be taken under the water",
    explanation: "`sub-` means \"under\" and `-ible` means \"able to be,\" so a submersible is able to be plunged under. Crewless steering would need `auto-`."
  },
  {
    id: "af055", affix: "contra", type: "prefix",
    questionType: "context", difficulty: "hard",
    question: "A pharmacist says the drug is contraindicated (`indicate` = to point to as advisable). What does that mean?",
    options: ["there is a reason not to use it", "it is strongly recommended", "it has only recently been approved", "it should be taken in half doses"],
    answer: "there is a reason not to use it",
    explanation: "`contra-` means \"against,\" so the evidence points against use. Read the prefix and the word reverses its plain meaning."
  },
  {
    id: "af056", affix: "proto", type: "prefix",
    questionType: "context", difficulty: "hard",
    question: "A linguist reconstructs a protolanguage. What is she reconstructing?",
    options: ["the earliest ancestor of a family of languages", "a language spoken by the largest number of people", "a simplified language used only for trade", "a language that borrows heavily from its neighbors"],
    answer: "the earliest ancestor of a family of languages",
    explanation: "`proto-` means \"first,\" so a protolanguage is the original form later languages descend from. Popularity would call for `multi-`, not `proto-`."
  },
  {
    id: "af057", affix: "extra", type: "prefix",
    questionType: "context", difficulty: "hard",
    question: "A report describes an extrajudicial action (`judicial` = of the courts). What kind of action is it?",
    options: ["one taken outside the court system", "one that overturns a court ruling", "one taken before a trial begins", "one shared between two courts"],
    answer: "one taken outside the court system",
    explanation: "`extra-` means \"outside; beyond,\" so the action happens outside normal court process. Against a ruling would be `contra-`, before trial `pre-`, and between courts `inter-`."
  },
  {
    id: "af058", affix: "circum", type: "prefix",
    questionType: "context", difficulty: "hard",
    question: "An architect adds a circumambulatory path (`ambulat-` = to walk). What is it for?",
    options: ["walking around a central space", "walking straight through the building", "walking below ground level", "waiting before entering the hall"],
    answer: "walking around a central space",
    explanation: "`circum-` means \"around,\" so the path encircles something. Straight through would be `trans-`, below ground `sub-`, and waiting beforehand `ante-`, as in anteroom."
  },
  {
    id: "af059", affix: "ultra", type: "prefix",
    questionType: "context", difficulty: "hard",
    question: "A columnist mocks a critic as ultracrepidarian - someone who judges beyond a proper limit. Which prefix meaning is doing that work?",
    options: ["`ultra-` meaning beyond or excessive", "`ultra-` meaning under or beneath", "`ultra-` meaning against", "`ultra-` meaning repeatedly"],
    answer: "`ultra-` meaning beyond or excessive",
    explanation: "`ultra-` always means \"beyond; excessive\" - here, opining beyond one's competence. \"Under\" would be `hypo-` or `sub-`, and \"against\" `anti-`."
  },

  // ---------------------------------------------------------------------
  // COMPARE TWO WORDS - what distinction do the affixes create?
  // ---------------------------------------------------------------------
  {
    id: "af060", affix: "-less", type: "suffix",
    questionType: "compare", difficulty: "easy",
    question: "`Careless` and `careful` share the root `care`. What distinction do the suffixes create?",
    options: ["careless is without care; careful is full of care", "careless is full of care; careful is without care", "careless describes people; careful describes objects", "careless is the past tense of careful"],
    answer: "careless is without care; careful is full of care",
    explanation: "`-less` means \"without\" and `-ful` means \"full of.\" One root, two suffixes, and the meaning flips completely."
  },
  {
    id: "af061", affix: "ex", type: "prefix",
    questionType: "compare", difficulty: "easy",
    question: "`Exhale` and `inhale` share the root `hal-` (\"to breathe\"). What distinction do the prefixes create?",
    options: ["exhale sends breath out; inhale draws it in", "exhale draws breath in; inhale sends it out", "exhale is slow; inhale is fast", "exhale is voluntary; inhale is not"],
    answer: "exhale sends breath out; inhale draws it in",
    explanation: "`ex-` means \"out of\" and `in-` means \"in; within.\" Speed and control are not part of what either prefix says."
  },
  {
    id: "af062", affix: "homo", type: "prefix",
    questionType: "compare", difficulty: "medium",
    question: "`Homogeneous` and `heterogeneous` share the root `gen-` (\"kind, type\"). What distinction do the prefixes create?",
    options: ["homogeneous is all of one kind; heterogeneous is of mixed kinds", "homogeneous is of mixed kinds; heterogeneous is all of one kind", "homogeneous means large; heterogeneous means small", "homogeneous means natural; heterogeneous means artificial"],
    answer: "homogeneous is all of one kind; heterogeneous is of mixed kinds",
    explanation: "`homo-` means \"same\" and `hetero-` means \"other.\" Milk is homogenized so that every part is the same as every other part."
  },
  {
    id: "af063", affix: "hypo", type: "prefix",
    questionType: "compare", difficulty: "medium",
    question: "`Hypothermia` and `hyperthermia` share the root `therm-` (\"heat\"). What distinction do the prefixes create?",
    options: ["hypothermia is body heat below normal; hyperthermia is above normal", "hypothermia is body heat above normal; hyperthermia is below normal", "hypothermia happens quickly; hyperthermia happens slowly", "hypothermia affects the skin; hyperthermia affects the organs"],
    answer: "hypothermia is body heat below normal; hyperthermia is above normal",
    explanation: "`hypo-` means \"under\" and `hyper-` means \"over.\" Two letters separate the two words, and they name opposite emergencies."
  },
  {
    id: "af064", affix: "pre", type: "prefix",
    questionType: "compare", difficulty: "medium",
    question: "`Preview` and `review` share the root `view`. What distinction do the prefixes create?",
    options: ["a preview comes before; a review looks back at it", "a preview looks back; a review comes before", "a preview is short; a review is long", "a preview is written; a review is spoken"],
    answer: "a preview comes before; a review looks back at it",
    explanation: "`pre-` means \"before\" and `re-` means \"back; again.\" Length and format have nothing to do with either prefix."
  },
  {
    id: "af065", affix: "macro", type: "prefix",
    questionType: "compare", difficulty: "medium",
    question: "`Microcosm` and `macrocosm` share the root `cosm-` (\"world\"). What distinction do the prefixes create?",
    options: ["a microcosm is a world in miniature; a macrocosm is the whole large system", "a microcosm is the whole large system; a macrocosm is a world in miniature", "a microcosm is real; a macrocosm is imaginary", "a microcosm is ancient; a macrocosm is modern"],
    answer: "a microcosm is a world in miniature; a macrocosm is the whole large system",
    explanation: "`micro-` means \"small\" and `macro-` means \"long; large.\" A village can be a microcosm of a whole country."
  },
  {
    id: "af066", affix: "intra", type: "prefix",
    questionType: "compare", difficulty: "hard",
    question: "A school runs intramural games and intermural games (`mur-` = wall). What distinction do the prefixes create?",
    options: ["intramural games stay inside one school; intermural games are played between schools", "intramural games are between schools; intermural games stay inside one school", "intramural games are indoors; intermural games are outdoors", "intramural games are for beginners; intermural games are for experts"],
    answer: "intramural games stay inside one school; intermural games are played between schools",
    explanation: "`intra-` means \"within\" and `inter-` means \"between\" - literally, inside the walls versus across them. Indoor versus outdoor is a coincidence of the metaphor, not the meaning."
  },
  {
    id: "af067", affix: "retro", type: "prefix",
    questionType: "compare", difficulty: "hard",
    question: "`Proactive` and `retroactive` share the root `act-`. What distinction do the prefixes create?",
    options: ["proactive acts ahead of time; retroactive reaches back to earlier cases", "proactive reaches back to earlier cases; retroactive acts ahead of time", "proactive is optional; retroactive is required", "proactive applies to people; retroactive applies to machines"],
    answer: "proactive acts ahead of time; retroactive reaches back to earlier cases",
    explanation: "`pro-` means \"forward\" and `retro-` means \"backward.\" A retroactive pay raise applies to work already done."
  },
  {
    id: "af068", affix: "sub", type: "prefix",
    questionType: "compare", difficulty: "hard",
    question: "`Subscribe` and `transcribe` share the root `scrib-` (\"to write\"). What distinction do the prefixes create?",
    options: ["subscribing is writing your name underneath; transcribing is writing something across into another form", "subscribing is copying a text; transcribing is signing your name", "subscribing is writing quickly; transcribing is writing carefully", "subscribing is done by hand; transcribing is done by machine"],
    answer: "subscribing is writing your name underneath; transcribing is writing something across into another form",
    explanation: "`sub-` means \"under\" - originally you signed your name under a document - and `trans-` means \"across,\" carrying speech across into writing."
  },

  // ---------------------------------------------------------------------
  // CORRECT / INCORRECT INTERPRETATION - diagnose the misreading
  // ---------------------------------------------------------------------
  {
    id: "af069", affix: "anti", type: "prefix",
    questionType: "judge", difficulty: "medium",
    question: "A student reads `antisocial` as \"before being social.\" What went wrong?",
    options: ["`anti-` means against, not before; `ante-` is the one that means before", "`anti-` means before, but the root was misread", "`anti-` means without, so the reading is close enough", "Nothing went wrong; the reading is correct"],
    answer: "`anti-` means against, not before; `ante-` is the one that means before",
    explanation: "Antisocial behavior works against other people. The lookalike `ante-` is the \"before\" prefix, as in antechamber."
  },
  {
    id: "af070", affix: "semi", type: "prefix",
    questionType: "judge", difficulty: "medium",
    question: "A student says `semiannual` means \"once every two years.\" What is the correct reading?",
    options: ["`semi-` means half, so it happens twice a year", "`semi-` means double, so it happens every other year", "`semi-` means many, so it happens monthly", "The student is right; semiannual means every two years"],
    answer: "`semi-` means half, so it happens twice a year",
    explanation: "`semi-` divides rather than multiplies: a semiannual report arrives every half year. The student turned a half into a double."
  },
  {
    id: "af071", affix: "mis", type: "prefix",
    questionType: "judge", difficulty: "medium",
    question: "A student reads `misinform` as \"to inform again.\" Which correction is right?",
    options: ["`mis-` means wrong or bad; `re-` is the prefix that means again", "`mis-` means again, but the root was misread", "`mis-` means not, so it means failing to inform", "The student is right; misinform means to repeat information"],
    answer: "`mis-` means wrong or bad; `re-` is the prefix that means again",
    explanation: "To misinform is to give wrong information. Reinform would be the word for informing a second time."
  },
  {
    id: "af072", affix: "hyper", type: "prefix",
    questionType: "judge", difficulty: "hard",
    question: "A student interprets `hypercritical` as \"barely critical.\" What is the misunderstanding?",
    options: ["`hyper-` means over or excessive, so it means far too critical", "`hyper-` means under, so the reading is correct", "`hyper-` means against, so it means opposed to criticism", "`hyper-` means half, so it means partly critical"],
    answer: "`hyper-` means over or excessive, so it means far too critical",
    explanation: "The student swapped `hyper-` (over) for `hypo-` (under). A hypercritical reviewer finds far too much fault, not too little."
  },
  {
    id: "af073", affix: "in", type: "prefix",
    questionType: "judge", difficulty: "hard",
    question: "Assuming every `in-` means \"not,\" a student reads `invaluable` as \"worthless.\" What does the word actually mean?",
    options: ["extremely valuable - too valuable to be measured", "worth very little", "valued only by its owner", "valuable for a short time only"],
    answer: "extremely valuable - too valuable to be measured",
    explanation: "`in-` can mean \"not\" (inactive) but it can also mean \"in; within,\" where it strengthens the word instead of negating it. Always sanity-check the whole word against the sentence."
  },
  {
    id: "af074", affix: "be", type: "prefix",
    questionType: "judge", difficulty: "hard",
    question: "A student claims `bemoan` means \"to moan well\" because `be-` can mean \"good; well.\" What is the better reading?",
    options: ["Here `be-` carries its other sense, \"thoroughly\" - to bemoan is to lament something thoroughly", "The student is right; bemoan means to complain skillfully", "`be-` means without, so bemoan means to stop moaning", "`be-` means again, so bemoan means to moan repeatedly"],
    answer: "Here `be-` carries its other sense, \"thoroughly\" - to bemoan is to lament something thoroughly",
    explanation: "`be-` is listed twice on the vocabulary sheet: \"thoroughly; make\" and \"good; well.\" When an affix has two senses, the surrounding word decides which one applies."
  },
  {
    id: "af075", affix: "fore", type: "prefix",
    questionType: "judge", difficulty: "medium",
    question: "A student thinks a book's `foreword` is a closing note added by the author. Which correction is right?",
    options: ["`fore-` means before, so a foreword is an introductory note placed before the text", "`fore-` means after, so the student is right", "`fore-` means outside, so a foreword sits apart from the book", "`fore-` means four, so it refers to the fourth section"],
    answer: "`fore-` means before, so a foreword is an introductory note placed before the text",
    explanation: "`fore-` means \"before\" - the same prefix as forecast and forewarn. A closing note is an afterword, built on the opposite idea."
  },

  // ---------------------------------------------------------------------
  // BEST-FIT WORD - choose the word whose affix matches the meaning needed
  // ---------------------------------------------------------------------
  {
    id: "af076", affix: "anti", type: "prefix",
    questionType: "bestfit", difficulty: "easy",
    question: "Protesters opposed to the fighting organized an ______ rally. Which word fits?",
    options: ["antiwar", "postwar", "prewar", "interwar"],
    answer: "antiwar",
    explanation: "`anti-` means \"against,\" which is what opposing the fighting requires. The other three place the rally in time instead: after, before, or between wars."
  },
  {
    id: "af077", affix: "inter", type: "prefix",
    questionType: "bestfit", difficulty: "medium",
    question: "Historians studying 1918 to 1939 call it the ______ period, because it falls between two world wars. Which word fits?",
    options: ["interwar", "antiwar", "prewar", "postwar"],
    answer: "interwar",
    explanation: "`inter-` means \"between,\" so the interwar years sit between the two conflicts. `pre-` and `post-` would each name only one side of that gap."
  },
  {
    id: "af078", affix: "post", type: "prefix",
    questionType: "bestfit", difficulty: "medium",
    question: "The surgeon checked the patient two weeks after surgery, at the ______ appointment. Which word fits?",
    options: ["postoperative", "preoperative", "intraoperative", "nonoperative"],
    answer: "postoperative",
    explanation: "`post-` means \"after.\" `pre-` would put the visit before surgery and `intra-` would put it during the operation itself."
  },
  {
    id: "af079", affix: "inter", type: "prefix",
    questionType: "bestfit", difficulty: "medium",
    question: "Two departments met so staff from both could coordinate - an ______ meeting. Which word fits?",
    options: ["interdepartmental", "intradepartmental", "extradepartmental", "subdepartmental"],
    answer: "interdepartmental",
    explanation: "`inter-` means \"between,\" and the meeting joins two departments. `intra-` would describe a meeting held inside just one of them."
  },
  {
    id: "af080", affix: "intra", type: "prefix",
    questionType: "bestfit", difficulty: "medium",
    question: "A rule that applies only inside a single state's borders is an ______ regulation. Which word fits?",
    options: ["intrastate", "interstate", "extrastate", "antistate"],
    answer: "intrastate",
    explanation: "`intra-` means \"within,\" so the rule stays inside one state. Interstate commerce, by contrast, crosses between states."
  },
  {
    id: "af081", affix: "pre", type: "prefix",
    questionType: "bestfit", difficulty: "easy",
    question: "The carvings were made before writing was invented, so archaeologists call them ______. Which word fits?",
    options: ["prehistoric", "posthistoric", "antihistoric", "semihistoric"],
    answer: "prehistoric",
    explanation: "`pre-` means \"before,\" so prehistoric means before the written record. `post-` would place the carvings after it."
  },
  {
    id: "af082", affix: "meta", type: "prefix",
    questionType: "bestfit", difficulty: "hard",
    question: "Researchers pooled the results of forty earlier studies into one study that stands over all of them. What is that called?",
    options: ["a meta-analysis", "a microanalysis", "a retroanalysis", "a subanalysis"],
    answer: "a meta-analysis",
    explanation: "`meta-` means \"beyond; over,\" so a meta-analysis is an analysis of other analyses. A subanalysis would sit under a single study, not above many."
  },
  {
    id: "af083", affix: "circum", type: "prefix",
    questionType: "bestfit", difficulty: "hard",
    question: "A witness talks endlessly around the point instead of answering (`locut-` = to speak). What is that habit called?",
    options: ["circumlocution", "elocution", "interlocution", "prolocution"],
    answer: "circumlocution",
    explanation: "`circum-` means \"around,\" so circumlocution is speaking around a subject. `inter-` would make it speech between people - a conversation."
  },

  // ---------------------------------------------------------------------
  // WORD BUILDING - what does the root become once the affix is added?
  // ---------------------------------------------------------------------
  {
    id: "af084", affix: "-less", type: "suffix",
    questionType: "build", difficulty: "easy",
    question: "`Thoughtful` means full of thought. What would `thoughtless` mean?",
    options: ["without thought", "full of thought", "able to be thought about", "one who thinks"],
    answer: "without thought",
    explanation: "`-less` means \"without,\" the exact opposite of `-ful`. A thoughtless remark is made without thinking."
  },
  {
    id: "af085", affix: "-fy", type: "suffix",
    questionType: "build", difficulty: "easy",
    question: "`-fy` means \"making; causing.\" What does `simplify` mean?",
    options: ["to make something simple", "the state of being simple", "one who prefers simple things", "able to be made simple"],
    answer: "to make something simple",
    explanation: "`-fy` turns a quality into an action: simplify, clarify, purify. \"The state of being simple\" would need `-ity`, giving simplicity."
  },
  {
    id: "af086", affix: "-ful", type: "suffix",
    questionType: "build", difficulty: "easy",
    question: "Adding `-ful` to `event` gives `eventful`. What does the suffix contribute?",
    options: ["full of events", "without events", "one who plans events", "able to be scheduled"],
    answer: "full of events",
    explanation: "`-ful` means \"full of,\" so an eventful week is packed with happenings. Drop in `-less` and you get the empty week instead."
  },
  {
    id: "af087", affix: "-ish", type: "suffix",
    questionType: "build", difficulty: "easy",
    question: "Adding `-ish` to `child` gives `childish`. What does the suffix contribute?",
    options: ["like or resembling", "without", "full of", "one who"],
    answer: "like or resembling",
    explanation: "`-ish` means \"like,\" so childish behavior resembles a child's. `-hood` would give childhood - the state of being a child instead."
  },
  {
    id: "af088", affix: "-able", type: "suffix",
    questionType: "build", difficulty: "medium",
    question: "Adding `-able` to `enforce` gives `enforceable`. What does the suffix contribute?",
    options: ["able to be enforced", "one who enforces", "without enforcement", "the state of being enforced"],
    answer: "able to be enforced",
    explanation: "`-able` means \"able to be,\" and its twin `-ible` does the same job on other roots, as in legible."
  },
  {
    id: "af089", affix: "-ism", type: "suffix",
    questionType: "build", difficulty: "medium",
    question: "Adding `-ism` to `hero` gives `heroism`. What does the suffix contribute?",
    options: ["the state or quality of being a hero", "a person who behaves like a hero", "the act of harming a hero", "something that merely resembles a hero"],
    answer: "the state or quality of being a hero",
    explanation: "`-ism` names a state or quality. A person who acts heroically would need a person-naming suffix such as `-eer`."
  },
  {
    id: "af090", affix: "-hood", type: "suffix",
    questionType: "build", difficulty: "medium",
    question: "`-hood` means \"state; quality of.\" What does `falsehood` name?",
    options: ["the quality of being false", "a person who lies often", "the act of correcting a lie", "a story that is only partly false"],
    answer: "the quality of being false",
    explanation: "`-hood` names a state, not a person or an action. A habitual liar would need a person suffix, and \"partly\" would need `semi-`."
  },
  {
    id: "af091", affix: "-fic", type: "suffix",
    questionType: "build", difficulty: "hard",
    question: "`Terrific` and `horrific` both end in `-fic`. What does that suffix contribute?",
    options: ["making or causing the feeling named by the root", "lacking the feeling named by the root", "one who feels it", "able to feel it"],
    answer: "making or causing the feeling named by the root",
    explanation: "`-fic` means \"making; causing,\" so horrific means causing horror. Its partner `-fy` turns the same idea into a verb, as in horrify."
  },
  {
    id: "af092", affix: "ad", type: "prefix",
    questionType: "build", difficulty: "hard",
    question: "The root `her-` means \"to stick.\" What does `adhere` literally describe?",
    options: ["sticking to something", "sticking apart from something", "sticking underneath something", "sticking a second time"],
    answer: "sticking to something",
    explanation: "`ad-` means \"to; toward,\" so adhesive tape sticks to a surface. `dis-` reverses it - to dissipate is to scatter apart."
  },
  {
    id: "af093", affix: "com", type: "prefix",
    questionType: "build", difficulty: "hard",
    question: "The root `ven-` means \"to come.\" What does `convene` literally describe?",
    options: ["coming together", "coming back", "coming between two sides", "coming out"],
    answer: "coming together",
    explanation: "`com-` means \"with; together\" and softens to con- before some roots. Coming back would be `re-`, as in revenue's older sense of returning income."
  },
  {
    id: "af094", affix: "re", type: "prefix",
    questionType: "build", difficulty: "hard",
    question: "The root `voc-` means \"to call.\" What does `revoke` literally describe?",
    options: ["calling something back", "calling people together", "calling out loudly", "calling for the first time"],
    answer: "calling something back",
    explanation: "`re-` means \"back; again,\" so revoking a license calls it back. Calling together would be convoke, built on `com-`."
  },
  {
    id: "af095", affix: "dif", type: "prefix",
    questionType: "build", difficulty: "hard",
    question: "The root `fus-` means \"to pour.\" What does `diffuse` literally describe?",
    options: ["poured apart, so it spreads out", "poured together, so it thickens", "poured back into its container", "poured underneath something"],
    answer: "poured apart, so it spreads out",
    explanation: "`dif-` is a spelling variant of `dis-`, meaning \"away; apart.\" Diffused light is scattered light."
  },

  // ---------------------------------------------------------------------
  // MIXED REVIEW - tell easily confused affixes apart
  // ---------------------------------------------------------------------
  {
    id: "af096", affix: "mixed", type: "mixed",
    questionType: "mixed", difficulty: "medium",
    question: "Which pair of affixes are opposites rather than near-synonyms?",
    options: ["`hyper-` and `hypo-`", "`di-` and `dis-`", "`intra-` and `intro-`", "`-able` and `-ible`"],
    answer: "`hyper-` and `hypo-`",
    explanation: "`hyper-` means over and `hypo-` means under - genuine opposites. Each of the other pairs is two spellings of one meaning."
  },
  {
    id: "af097", affix: "mixed", type: "mixed",
    questionType: "mixed", difficulty: "easy",
    question: "Three of these prefixes can mean \"before.\" Which one cannot?",
    options: ["`post-`", "`ante-`", "`fore-`", "`pre-`"],
    answer: "`post-`",
    explanation: "`ante-`, `fore-` and `pre-` all point backward in time; `post-` means \"after\" and points the other way."
  },
  {
    id: "af098", affix: "mixed", type: "mixed",
    questionType: "mixed", difficulty: "medium",
    question: "Which prefix means the opposite of `macro-`?",
    options: ["`micro-`", "`multi-`", "`meta-`", "`mal-`"],
    answer: "`micro-`",
    explanation: "`macro-` means long or large, so `micro-` (small) is its opposite. The other three only look similar - they mean many, beyond, and bad."
  },
  {
    id: "af099", affix: "mixed", type: "mixed",
    questionType: "mixed", difficulty: "medium",
    question: "`Homo-` is to \"same\" as `hetero-` is to ______.",
    options: ["other", "self", "many", "half"],
    answer: "other",
    explanation: "`homo-` and `hetero-` are a fixed pair: same versus other. \"Self\" is `auto-`, \"many\" is `multi-`, and \"half\" is `semi-`."
  },
  {
    id: "af100", affix: "mixed", type: "mixed",
    questionType: "mixed", difficulty: "hard",
    question: "Three of these prefixes suggest movement away or apart. Which one suggests the opposite?",
    options: ["`com-`", "`ab-`", "`se-`", "`dis-`"],
    answer: "`com-`",
    explanation: "`ab-`, `se-` and `dis-` all pull things away or apart; `com-` means \"with; together\" and pulls them in."
  },
  {
    id: "af101", affix: "in", type: "prefix",
    questionType: "mixed", difficulty: "hard",
    question: "A word begins with `in-`. Which meaning is NOT one this prefix can carry?",
    options: ["around", "not", "in", "within"],
    answer: "around",
    explanation: "`in-` can mean \"in; within\" or \"not,\" which is why context matters so much. \"Around\" belongs to `circum-`."
  },
  {
    id: "af102", affix: "mixed", type: "mixed",
    questionType: "mixed", difficulty: "hard",
    question: "Which group of suffixes all mean roughly \"state or quality of\"?",
    options: ["`-hood`, `-ism`, `-ity`, `-tude`", "`-less`, `-ful`, `-ous`, `-ish`", "`-eer`, `-fy`, `-fic`, `-ine`", "`-able`, `-ible`, `-ous`, `-ity`"],
    answer: "`-hood`, `-ism`, `-ity`, `-tude`",
    explanation: "Those four all turn a word into an abstract state: childhood, heroism, clarity, solitude. Because they overlap, the word you are given - not the meaning alone - tells you which to use."
  },
  {
    id: "af103", affix: "di", type: "prefix",
    questionType: "mixed", difficulty: "hard",
    question: "The vocabulary list groups `di-`, `dif-` and `dis-` together. What does that grouping tell you?",
    options: ["They are spelling variants of one prefix meaning \"away; apart; not\"", "They are three unrelated prefixes that happen to look alike", "They form a sequence meaning first, second and third", "They mean away, toward and around respectively"],
    answer: "They are spelling variants of one prefix meaning \"away; apart; not\"",
    explanation: "The spelling shifts to suit the root that follows - divert, diffuse, dissect - but the meaning stays the same."
  },
  {
    id: "af104", affix: "be", type: "prefix",
    questionType: "mixed", difficulty: "medium",
    question: "The vocabulary list gives `be-` two separate meanings. Which pair is correct?",
    options: ["\"thoroughly; make\" and \"good; well\"", "\"before\" and \"after\"", "\"without\" and \"full of\"", "\"again\" and \"against\""],
    answer: "\"thoroughly; make\" and \"good; well\"",
    explanation: "`be-` appears twice on the sheet, once meaning \"thoroughly; make\" (bedazzle) and once alongside `bon-` meaning \"good; well.\" Let the whole word decide which sense applies."
  },
  {
    id: "af105", affix: "post", type: "prefix",
    questionType: "mixed", difficulty: "medium",
    question: "Which prefix would you add to `mortem` (\"death\") to name an examination carried out after death?",
    options: ["`post-`", "`ante-`", "`pre-`", "`pro-`"],
    answer: "`post-`",
    explanation: "`post-` means \"after,\" giving postmortem. `ante-` would produce antemortem - the period before death - which is a real but opposite term."
  },
  {
    id: "af106", affix: "-ible", type: "suffix",
    questionType: "mixed", difficulty: "medium",
    question: "`Readable` and `edible` end differently but share one meaning. What is it?",
    options: ["able to be", "full of", "one who", "without"],
    answer: "able to be",
    explanation: "`-able` and `-ible` are two spellings of the same suffix: readable means able to be read, edible means able to be eaten."
  },
  {
    id: "af107", affix: "tele", type: "prefix",
    questionType: "mixed", difficulty: "medium",
    question: "`Telescope`, `telephone` and `television` all begin with `tele-`. What do their meanings have in common?",
    options: ["Each one works across a distance", "Each one makes something look larger", "Each one is operated by a single person", "Each one was invented in the same decade"],
    answer: "Each one works across a distance",
    explanation: "`tele-` means \"far,\" so all three carry sight or sound over distance. Magnification belongs to the roots, not the prefix - a telephone magnifies nothing."
  },

  // ---------------------------------------------------------------------
  // HARDER SUFFIX WORK - keeps the suffix-only filters worth replaying
  // ---------------------------------------------------------------------
  {
    id: "af108", affix: "-ous", type: "suffix",
    questionType: "compare", difficulty: "hard",
    question: "The root `grace` gives both `graceful` and `gracious`. What distinction do the two suffixes draw?",
    options: ["`-ful` means full of grace; `-ous` means having the quality of grace", "`-ful` means without grace; `-ous` means full of grace", "`-ful` describes people; `-ous` describes objects", "`-ful` is the plural of `-ous`"],
    answer: "`-ful` means full of grace; `-ous` means having the quality of grace",
    explanation: "Both suffixes are positive, which is what makes them easy to blur: `-ful` says the quality is present in quantity, `-ous` simply says the thing has it."
  },
  {
    id: "af109", affix: "-tude", type: "suffix",
    questionType: "context", difficulty: "hard",
    question: "A pilot reports her `altitude` (`alt-` = high). Using the suffix, what is she reporting?",
    options: ["the state of how high she is", "a device that measures height", "someone who flies at height", "whether the plane can be raised"],
    answer: "the state of how high she is",
    explanation: "`-tude` names a state or quality, so altitude is the state of being high. A measuring device would need a tool suffix, and a person would need one like `-eer`."
  },
  {
    id: "af110", affix: "-ible", type: "suffix",
    questionType: "compare", difficulty: "hard",
    question: "`Credible` and `incredible` share the root `cred-` (\"to believe\"). What are the affixes doing?",
    options: ["`-ible` means able to be believed, and `in-` reverses it", "`-ible` means unable to be believed, and `in-` strengthens it", "`-ible` names a believer, and `in-` makes it plural", "`-ible` means full of belief, and `in-` means half"],
    answer: "`-ible` means able to be believed, and `in-` reverses it",
    explanation: "Read suffix and prefix separately: `-ible` supplies \"able to be,\" then `in-` supplies \"not.\" Stack them and an incredible story is one that cannot be believed."
  },
  {
    id: "af111", affix: "-ism", type: "suffix",
    questionType: "judge", difficulty: "hard",
    question: "A student assumes `-ism` always names a political movement, so reads `heroism` as an organised cause. What does the suffix actually contribute?",
    options: ["the state or quality of being a hero", "a group of people who admire heroes", "someone who behaves heroically", "the act of naming a hero"],
    answer: "the state or quality of being a hero",
    explanation: "`-ism` means \"state; quality of.\" It does often attach to belief systems, but the suffix itself only names a state - heroism is simply heroic quality."
  },
  {
    id: "af112", affix: "-eer", type: "suffix",
    questionType: "wordpart", difficulty: "hard",
    question: "`Engineer`, `auctioneer` and `mountaineer` all end in `-eer`. What must therefore be true of all three words?",
    options: ["each one names a person connected with the root", "each one names a place connected with the root", "each one names a tool used on the root", "each one names an action done to the root"],
    answer: "each one names a person connected with the root",
    explanation: "`-eer` means \"one who,\" so the suffix always points at a person. The roots differ wildly - engines, auctions, mountains - but the suffix does the same job every time."
  },
  {
    id: "af113", affix: "-ish", type: "suffix",
    questionType: "sentence", difficulty: "hard",
    question: "A witness described the car as reddish and the driver as fortyish. What single idea does `-ish` add to both?",
    options: ["resembling, without being exactly so", "completely and definitely so", "the opposite of so", "capable of becoming so"],
    answer: "resembling, without being exactly so",
    explanation: "`-ish` means \"like.\" Attached to a colour or a number it softens into \"roughly\" - reddish is like red, fortyish is around forty."
  },

  // ---------------------------------------------------------------------
  // EXTRA REVIEW ITEMS
  // ---------------------------------------------------------------------
  {
    id: "af114", affix: "mixed", type: "mixed",
    questionType: "mixed", difficulty: "easy",
    question: "Which of these word parts is a suffix rather than a prefix?",
    options: ["`-less`", "`pre-`", "`circum-`", "`non-`"],
    answer: "`-less`",
    explanation: "A suffix attaches to the end of a word and a prefix to the front. The hyphen shows you which end is open: `-less` waits for a word before it, `pre-` waits for one after."
  },
  {
    id: "af115", affix: "mixed", type: "mixed",
    questionType: "mixed", difficulty: "medium",
    question: "Three of these pairs are opposites. Which pair means roughly the same thing?",
    options: ["`ante-` and `pre-`", "`hyper-` and `hypo-`", "`macro-` and `micro-`", "`homo-` and `hetero-`"],
    answer: "`ante-` and `pre-`",
    explanation: "`ante-` and `pre-` both mean \"before,\" which is why antenatal and prenatal describe the same period. The other three pairs each split over/under, large/small and same/other."
  },
];

// Export for the Node-based validator (harmless in the browser).
if (typeof module !== "undefined") {
  module.exports = { affixVocab, affixBank };
}
