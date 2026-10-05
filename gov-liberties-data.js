// =========================================================================
// AP GOV: TOPICS 3.1-3.8 - CONTENT MODULE
// =========================================================================
// Source of truth: AMSCO United States Government & Politics, AP Edition
// (2022), Chapters 8-10, book pages 260-328 - Topic 3.1 (the Bill of
// Rights), 3.2 (freedom of religion), 3.3 (freedom of speech), 3.4 (freedom
// of the press), 3.5 (the right to bear arms), 3.6 (balancing individual
// freedom with public order and safety), 3.7 (selective incorporation) and
// 3.8 (due process and the rights of the accused).
//
// Two exports:
//   govLibertiesVocab - every term this mode tests, with the meaning the
//                       AMSCO text gives it, the topic and book page it
//                       appears on, and whether it is one of AMSCO's own
//                       "Key Terms and Names" for that topic (keyTerm: true)
//                       or a supporting case or idea from the same pages.
//                       Update this list first if the source changes.
//   govLibertiesBank  - the question bank. Content only: no markup, no game
//                       logic, no HTML.
//
// Question shape:
//   { id, term, area, topic, questionType, difficulty,
//     question, options, answer, explanation }
//     term         - the vocabulary entry under test; "mixed" for items that
//                    compare several concepts or span areas
//     area         - "rights" | "religion" | "expression" | "safety" |
//                    "dueprocess" | "mixed", and drives the Area filter
//     topic        - the AMSCO topic number the item is drawn from
//     questionType - definition | application | scenario | compare |
//                    document | case | process. The engine spreads types out
//                    so consecutive questions do not feel identical.
//     difficulty   - "easy" | "medium" | "hard"; a session ramps easy -> hard
//     options      - exactly four distinct strings; one equals `answer`
//                    (the engine shuffles them, so stored order is irrelevant)
//
// Ids run gl001 upward and are identity keys, not positions. Never reuse one:
// the "recently seen" list a returning player has stored is keyed by id, so a
// recycled number would hide a brand new question from them.
// =========================================================================

const govLibertiesVocab = [
  // --- The Bill of Rights: Topic 3.1 --------------------------------------
  { id: "l-bill-of-rights", term: "Bill of Rights", display: "the Bill of Rights (1791)", area: "rights", topic: "3.1", page: 262, keyTerm: true,
    meaning: "The first ten amendments, ratified in 1791 to guarantee liberties the original Constitution lacked; they originally restrained only the federal government." },
  { id: "l-civil-liberties", term: "civil liberties", display: "civil liberties", area: "rights", topic: "3.1", page: 261, keyTerm: true,
    meaning: "Personal freedoms protected by constitutional guarantee from arbitrary government interference or deprivation." },
  { id: "l-public-interest", term: "public interest", display: "public interest", area: "rights", topic: "3.1", page: 264, keyTerm: true,
    meaning: "The welfare or well-being of the general public; civil liberties are limited when they seriously impinge on it." },
  { id: "l-madison", term: "James Madison", display: "James Madison", area: "rights", topic: "3.1", page: 261, keyTerm: false,
    meaning: "First opposed a bill of rights as unnecessary and risky, then answered Anti-Federalist demands by narrowing dozens of proposals to twelve; ten were ratified." },
  { id: "l-ninth", term: "Ninth Amendment", display: "the Ninth Amendment", area: "rights", topic: "3.1", page: 262, keyTerm: false,
    meaning: "A closing disclaimer: rights not explicitly listed in the Bill of Rights are still protected and cannot be denied by government." },
  { id: "l-tenth", term: "Tenth Amendment", display: "the Tenth Amendment", area: "rights", topic: "3.1", page: 262, keyTerm: false,
    meaning: "A closing disclaimer: powers not delegated to the federal government remain with the states." },
  { id: "l-barron", term: "Barron v. Baltimore", display: "Barron v. Baltimore (1833)", area: "rights", topic: "3.1", page: 262, keyTerm: false,
    meaning: "The Marshall Court held that states did not have to honor the federal Bill of Rights, a precedent that stood until selective incorporation developed." },

  // --- Freedom of religion: Topic 3.2 --------------------------------------
  { id: "l-establishment", term: "establishment clause", display: "the establishment clause", area: "religion", topic: "3.2", page: 267, keyTerm: true,
    meaning: "First Amendment clause written to bar a national religion; now read to mean no level of government may sanction, recognize, favor or disregard any religion." },
  { id: "l-free-exercise", term: "free exercise clause", display: "the free exercise clause", area: "religion", topic: "3.2", page: 267, keyTerm: true,
    meaning: "First Amendment clause that keeps government from stopping religious practices, unless a practice is illegal or threatens the community's interests." },
  { id: "l-wall", term: "wall of separation", display: "wall of separation", area: "religion", topic: "3.2", page: 267, keyTerm: true,
    meaning: "Jefferson's 1802 phrase, written to Baptists in Danbury, Connecticut, for the separation of church and state that the Court later built on." },
  { id: "l-engel", term: "Engel v. Vitale", display: "Engel v. Vitale (1962)", area: "religion", topic: "3.2", page: 268, keyTerm: true,
    meaning: "Struck down a state-written, nondenominational prayer recited in New York public schools as a violation of the establishment clause, even though participation was voluntary." },
  { id: "l-lemon", term: "Lemon v. Kurtzman", display: "Lemon v. Kurtzman (1971)", area: "religion", topic: "3.2", page: 270, keyTerm: true,
    meaning: "Struck down state pay for parochial teachers of secular subjects as excessive entanglement, and created the three-part Lemon test: secular purpose, neutral effect, no entanglement." },
  { id: "l-yoder", term: "Wisconsin v. Yoder", display: "Wisconsin v. Yoder (1972)", area: "religion", topic: "3.2", page: 271, keyTerm: true,
    meaning: "Held that requiring Amish children to attend school past eighth grade violated their parents' free exercise of religion." },
  { id: "l-everson", term: "Everson v. Board of Education", display: "Everson v. Board of Education (1947)", area: "religion", topic: "3.2", page: 267, keyTerm: false,
    meaning: "Upheld New Jersey's reimbursement of bus fares for parochial students as a neutral service, and signaled that the religion clauses apply to the states." },
  { id: "l-abington", term: "Abington v. Schempp", display: "School District of Abington Township v. Schempp (1963)", area: "religion", topic: "3.2", page: 268, keyTerm: false,
    meaning: "Outlawed daily Bible readings in public schools a year after Engel, because the school was promoting religion." },
  { id: "l-vouchers", term: "school vouchers", display: "school vouchers", area: "religion", topic: "3.2", page: 273, keyTerm: false,
    meaning: "Tuition aid for private schools; Cleveland's program was upheld because money went to parents and it did not distinguish religious from secular schools." },
  { id: "l-lynch", term: "Lynch v. Donnelly", display: "Lynch v. Donnelly (1984)", area: "religion", topic: "3.2", page: 274, keyTerm: false,
    meaning: "Upheld a nativity scene set among other Christmas decor as serving the secular purpose of depicting the holiday's origins." },
  { id: "l-rfra", term: "Religious Freedom Restoration Act", display: "the Religious Freedom Restoration Act (1993)", area: "religion", topic: "3.2", page: 266, keyTerm: false,
    meaning: "Passed in anger at Employment Division v. Smith (1990); says government should not substantially burden religious exercise without compelling justification." },

  // --- Freedom of speech: Topic 3.3 ----------------------------------------
  { id: "l-symbolic", term: "symbolic speech", display: "symbolic speech", area: "expression", topic: "3.3", page: 277, keyTerm: true,
    meaning: "Expression through actions or symbols rather than words, such as armbands or flag burning; it is not a defense for an otherwise illegal act." },
  { id: "l-tinker", term: "Tinker v. Des Moines", display: "Tinker v. Des Moines Independent Community School District (1969)", area: "expression", topic: "3.3", page: 277, keyTerm: true,
    meaning: "Protected students' black armbands as political symbolic speech; students do not shed their rights at the schoolhouse gate absent material, substantial disruption." },
  { id: "l-schenck", term: "Schenck v. United States", display: "Schenck v. United States (1919)", area: "expression", topic: "3.3", page: 281, keyTerm: true,
    meaning: "Unanimously upheld a conviction for mailing anti-draft leaflets during World War I, establishing the clear and present danger test." },
  { id: "l-clear-present", term: "clear and present danger", display: "clear and present danger", area: "expression", topic: "3.3", page: 282, keyTerm: true,
    meaning: "Holmes's test from Schenck: speech may be punished when its nature and circumstances create a clear and present danger of evils Congress may prevent." },
  { id: "l-obscene", term: "obscene speech", display: "obscene speech", area: "expression", topic: "3.3", page: 279, keyTerm: true,
    meaning: "Language or images so offensive the First Amendment does not protect them; no national standard fully defines obscenity." },
  { id: "l-miller", term: "Miller v. California", display: "Miller v. California (1973)", area: "expression", topic: "3.3", page: 280, keyTerm: true,
    meaning: "Reaffirmed that obscenity is unprotected, let local judges or juries apply local community standards, and produced the three-part Miller test." },
  { id: "l-compelling", term: "compelling governmental interest", display: "compelling governmental interest", area: "expression", topic: "3.3", page: 275, keyTerm: false,
    meaning: "A purpose important enough to justify infringing a personal liberty; government must show one to curb speech." },
  { id: "l-seditious-libel", term: "seditious libel", display: "seditious libel", area: "expression", topic: "3.3", page: 275, keyTerm: false,
    meaning: "The colonial-era charge that fined or jailed anyone who criticized public officials or government policies." },
  { id: "l-tpm", term: "time, place, and manner", display: "time, place, and manner regulations", area: "expression", topic: "3.3", page: 276, keyTerm: false,
    meaning: "Limits on how, when and where expression happens; they must be content-neutral, serve a significant interest, be narrowly tailored and leave alternatives." },
  { id: "l-obrien", term: "United States v. O'Brien", display: "United States v. O'Brien (1968)", area: "expression", topic: "3.3", page: 276, keyTerm: false,
    meaning: "Upheld a conviction for burning a draft card, because the law protected Congress's power to raise an army rather than suppressing a message." },
  { id: "l-cohen", term: "Cohen v. California", display: "Cohen v. California (1971)", area: "expression", topic: "3.3", page: 276, keyTerm: false,
    meaning: "Overturned a conviction for wearing a vulgar anti-draft jacket in a courthouse, since the words incited no illegal action." },
  { id: "l-johnson", term: "Texas v. Johnson", display: "Texas v. Johnson (1989)", area: "expression", topic: "3.3", page: 277, keyTerm: false,
    meaning: "Struck down a state flag-desecration law (as United States v. Eichman later did a federal one) because it served only to impose reverence for the flag." },
  { id: "l-fraser", term: "Bethel School District v. Fraser", display: "Bethel School District v. Fraser (1986)", area: "expression", topic: "3.3", page: 278, keyTerm: false,
    meaning: "Upheld suspending a student for a sexually suggestive assembly speech with no real political value." },
  { id: "l-morse", term: "Morse v. Frederick", display: "Morse v. Frederick (2007)", area: "expression", topic: "3.3", page: 278, keyTerm: false,
    meaning: "Upheld punishing a student's \"BONG HITS 4 JESUS\" banner at a school-sponsored event as reasonably read to promote illegal drug use." },
  { id: "l-brandenburg", term: "Brandenburg v. Ohio", display: "Brandenburg v. Ohio (1969)", area: "expression", topic: "3.3", page: 282, keyTerm: false,
    meaning: "Overturned a Klansman's conviction: advocacy may be punished only if meant to incite imminent lawless action and likely to produce it." },

  // --- Freedom of the press: Topic 3.4 -------------------------------------
  { id: "l-free-press", term: "freedom of the press", display: "freedom of the press", area: "expression", topic: "3.4", page: 285, keyTerm: false,
    meaning: "The Court rarely distinguishes speech from press and protects both by the same standards; an average citizen has as much press freedom as a professional journalist." },
  { id: "l-libel", term: "libel", display: "libel", area: "expression", topic: "3.4", page: 285, keyTerm: true,
    meaning: "False statements in print that defame, or damage, a person's reputation; American courts set a high bar before rewarding a suing party." },
  { id: "l-sullivan", term: "New York Times Co. v. Sullivan", display: "New York Times Co. v. Sullivan (1964)", area: "expression", topic: "3.4", page: 285, keyTerm: true,
    meaning: "Sided with the Times over errors in a civil rights ad; public officials must prove actual malice to recover for falsehoods about their official conduct." },
  { id: "l-breathing", term: "breathing space", display: "\"breathing space\"", area: "expression", topic: "3.4", page: 285, keyTerm: true,
    meaning: "Sullivan's phrase for the room free expression needs to survive, which means even some false statements must be protected." },
  { id: "l-malice", term: "malicious intent", display: "malicious intent", area: "expression", topic: "3.4", page: 285, keyTerm: true,
    meaning: "Knowingly or recklessly printing a falsehood in order to defame; along with damage, a libel plaintiff must prove it, and public officials must show actual malice." },
  { id: "l-prior-restraint", term: "prior restraint", display: "prior restraint", area: "expression", topic: "3.4", page: 286, keyTerm: true,
    meaning: "Government stopping spoken or printed expression in advance, which the Court treats with a heavy presumption against its validity." },
  { id: "l-near", term: "Near v. Minnesota", display: "Near v. Minnesota (1931)", area: "expression", topic: "3.4", page: 286, keyTerm: true,
    meaning: "Struck down Minnesota's \"gag law\" against malicious or scandalous newspapers, first declaring the bar on prior restraint and applying free press to the states." },
  { id: "l-nyt-us", term: "New York Times Co. v. United States", display: "New York Times Co. v. United States (1971)", area: "expression", topic: "3.4", page: 286, keyTerm: true,
    meaning: "The Pentagon Papers case: a 6:3 per curiam ruling that the executive branch could not block newspapers from printing classified documents." },

  // --- The right to bear arms: Topic 3.5 -----------------------------------
  { id: "l-second", term: "Second Amendment", display: "the Second Amendment (1791)", area: "safety", topic: "3.5", page: 297, keyTerm: true,
    meaning: "\"A well-regulated militia, being necessary to the security of a free State, the right of the people to keep and bear arms, shall not be infringed.\"" },
  { id: "l-nfa", term: "National Firearms Act", display: "the National Firearms Act (1934)", area: "safety", topic: "3.5", page: 298, keyTerm: true,
    meaning: "The first national gun statute: required registration of certain weapons, taxed their sale and manufacture, and restricted sawed-off shotguns and machine guns." },
  { id: "l-gca", term: "Gun Control Act", display: "the Gun Control Act (1968)", area: "safety", topic: "3.5", page: 298, keyTerm: true,
    meaning: "Ended mail-order sales of firearms and ammunition and banned gun sales to felons, fugitives, illegal drug users and certain others." },
  { id: "l-brady", term: "Brady Handgun Violence Prevention Act", display: "the Brady Handgun Violence Prevention Act (1993)", area: "safety", topic: "3.5", page: 298, keyTerm: true,
    meaning: "Created a five-day waiting period for handgun purchases to allow a background check; later replaced by the National Instant Criminal Background Check System." },
  { id: "l-heller", term: "District of Columbia v. Heller", display: "District of Columbia v. Heller (2008)", area: "safety", topic: "3.5", page: 299, keyTerm: true,
    meaning: "First held that the Second Amendment protects an individual right to own a gun unrelated to militia service, striking down D.C.'s handgun restrictions." },

  // --- Liberty and public order: Topic 3.6 --------------------------------
  { id: "l-eighth", term: "Eighth Amendment", display: "the Eighth Amendment (1791)", area: "safety", topic: "3.6", page: 301, keyTerm: true,
    meaning: "Prohibits excessive bail and fines and cruel and unusual punishments; the center of debate over the death penalty." },
  { id: "l-fourth", term: "Fourth Amendment", display: "the Fourth Amendment (1791)", area: "safety", topic: "3.6", page: 304, keyTerm: true,
    meaning: "Protects against unreasonable searches and seizures; warrants require probable cause, an oath, and a particular description of what is searched." },
  { id: "l-writs", term: "writs of assistance", display: "writs of assistance", area: "safety", topic: "3.6", page: 304, keyTerm: true,
    meaning: "Broad British search warrants that let soldiers search any vessel, warehouse, home or wagon for smuggled goods." },
  { id: "l-metadata", term: "metadata", display: "metadata", area: "safety", topic: "3.6", page: 305, keyTerm: true,
    meaning: "All the information about a phone communication except the conversation itself: who called whom, when, and for how long." },
  { id: "l-probable-cause", term: "probable cause", display: "probable cause", area: "safety", topic: "3.6", page: 304, keyTerm: false,
    meaning: "A reasonable amount of suspicion that a crime has been committed; needed for a search warrant and for an arrest." },
  { id: "l-furman", term: "Furman v. Georgia", display: "Furman v. Georgia (1972)", area: "safety", topic: "3.6", page: 301, keyTerm: false,
    meaning: "Put the death penalty on hold nationally in a 5:4 decision that stressed how randomly and unequally it was applied." },
  { id: "l-gregg", term: "Gregg v. Georgia", display: "Gregg v. Georgia (1976)", area: "safety", topic: "3.6", page: 301, keyTerm: false,
    meaning: "Began reinstating the death penalty under restructured sentencing; no state may make it mandatory, and circumstances are weighed in a separate penalty phase." },
  { id: "l-guantanamo", term: "Guantanamo Bay detention", display: "Guantanamo Bay detention", area: "safety", topic: "3.6", page: 301, keyTerm: false,
    meaning: "The post-9/11 camp for terror suspects, placed outside U.S. borders partly because officials believed that loosened constitutional limits." },

  // --- Selective incorporation: Topic 3.7 ---------------------------------
  { id: "l-selective-inc", term: "selective incorporation", display: "selective incorporation", area: "dueprocess", topic: "3.7", page: 312, keyTerm: true,
    meaning: "Applying selected Bill of Rights provisions to the states, case by case, through the Fourteenth Amendment's due process clause." },
  { id: "l-due-process", term: "due process", display: "due process", area: "dueprocess", topic: "3.7", page: 312, keyTerm: true,
    meaning: "The fundamental fairness that keeps government from arbitrarily or mistakenly taking life, liberty or property without legal cause." },
  { id: "l-fourteenth", term: "Fourteenth Amendment", display: "the Fourteenth Amendment (1868)", area: "dueprocess", topic: "3.7", page: 313, keyTerm: true,
    meaning: "Reconstruction amendment declaring no state may deprive any person of life, liberty or property without due process of law." },
  { id: "l-just-comp", term: "just compensation clause", display: "the just compensation clause", area: "dueprocess", topic: "3.7", page: 314, keyTerm: true,
    meaning: "The Fifth Amendment rule that private property taken for public use must be paid for; the first right incorporated, in 1897." },
  { id: "l-mcdonald", term: "McDonald v. Chicago", display: "McDonald v. Chicago (2010)", area: "dueprocess", topic: "3.7", page: 315, keyTerm: true,
    meaning: "A 5:4 ruling applying the Second Amendment to states and cities through the Fourteenth Amendment, striking Chicago's effective handgun ban." },
  { id: "l-gitlow", term: "Gitlow v. New York", display: "Gitlow v. New York (1925)", area: "dueprocess", topic: "3.7", page: 314, keyTerm: false,
    meaning: "Upheld a socialist's conviction under a criminal anarchy law but assumed free speech and press are liberties states may not impair." },
  { id: "l-timbs", term: "Timbs v. Indiana", display: "Timbs v. Indiana (2019)", area: "dueprocess", topic: "3.7", page: 313, keyTerm: false,
    meaning: "Held that a state's seizure of a convicted drug dealer's vehicle violated the Eighth Amendment's ban on excessive fines." },

  // --- Due process and the rights of the accused: Topic 3.8 ---------------
  { id: "l-procedural", term: "procedural due process", display: "procedural due process", area: "dueprocess", topic: "3.8", page: 319, keyTerm: true,
    meaning: "Due process concerned with how a law is carried out - fair procedures and a chance to be heard - as opposed to whether the law's substance is fair." },
  { id: "l-search-seizure", term: "search and seizure", display: "search and seizure", area: "dueprocess", topic: "3.8", page: 320, keyTerm: true,
    meaning: "Government searching people and property and seizing evidence or persons; the Fourth Amendment bars doing so unreasonably." },
  { id: "l-exclusionary", term: "exclusionary rule", display: "the exclusionary rule", area: "dueprocess", topic: "3.8", page: 320, keyTerm: true,
    meaning: "Evidence obtained in violation of the Fourth Amendment can be excluded from trial; set for federal courts in Weeks v. United States (1914)." },
  { id: "l-mapp", term: "Mapp v. Ohio", display: "Mapp v. Ohio (1961)", area: "dueprocess", topic: "3.8", page: 320, keyTerm: true,
    meaning: "Incorporated the exclusionary rule, so evidence from an unlawful search is inadmissible in state courts too." },
  { id: "l-tlo", term: "New Jersey v. TLO", display: "New Jersey v. TLO (1985)", area: "dueprocess", topic: "3.8", page: 321, keyTerm: true,
    meaning: "School officials may search students on reasonable suspicion rather than the full probable cause police need." },
  { id: "l-fifth", term: "Fifth Amendment", display: "the Fifth Amendment (1791)", area: "dueprocess", topic: "3.8", page: 319, keyTerm: true,
    meaning: "Contains the federal due process clause, the just compensation clause, and the protection against being compelled to be a witness against oneself." },
  { id: "l-miranda", term: "Miranda v. Arizona", display: "Miranda v. Arizona (1966)", area: "dueprocess", topic: "3.8", page: 324, keyTerm: true,
    meaning: "Held that the Fifth Amendment right applies once a suspect is in custody, so police must inform suspects of their rights before interrogation." },
  { id: "l-public-safety", term: "public safety exception", display: "the public safety exception", area: "dueprocess", topic: "3.8", page: 325, keyTerm: true,
    meaning: "Statements made before Miranda warnings may be used when officers' questions aimed to neutralize an immediate danger, as in New York v. Quarles (1984)." },
  { id: "l-sixth", term: "Sixth Amendment", display: "the Sixth Amendment (1791)", area: "dueprocess", topic: "3.8", page: 326, keyTerm: true,
    meaning: "Guarantees the right to counsel, first understood as the right to have a lawyer present at a federal trial." },
  { id: "l-gideon", term: "Gideon v. Wainwright", display: "Gideon v. Wainwright (1963)", area: "dueprocess", topic: "3.8", page: 327, keyTerm: true,
    meaning: "A unanimous ruling that states must provide attorneys to all defendants who cannot afford one, regardless of the severity of the crime." },
  { id: "l-freedom-act", term: "USA FREEDOM Act", display: "the USA FREEDOM Act (2015)", area: "dueprocess", topic: "3.8", page: 323, keyTerm: true,
    meaning: "Left metadata with phone carriers but required the executive branch to obtain a warrant before examining it." },
  { id: "l-good-faith", term: "good faith exception", display: "the good faith exception", area: "dueprocess", topic: "3.8", page: 320, keyTerm: false,
    meaning: "Evidence from a search under a court-issued warrant later found defective is likely admitted, since officers honestly followed the law." },
  { id: "l-inevitable", term: "inevitable discovery exception", display: "the inevitable discovery exception", area: "dueprocess", topic: "3.8", page: 320, keyTerm: false,
    meaning: "Evidence found in an unlawful search is likely admitted if a later, lawful search would eventually have found it." },
  { id: "l-betts", term: "Betts v. Brady", display: "Betts v. Brady (1942)", area: "dueprocess", topic: "3.8", page: 326, keyTerm: false,
    meaning: "Held states need appoint counsel in noncapital cases only under special circumstances such as illiteracy; overruled by Gideon." },
  { id: "l-habeas", term: "habeas corpus", display: "habeas corpus", area: "dueprocess", topic: "3.8", page: 324, keyTerm: false,
    meaning: "The right that keeps government from imprisoning someone arbitrarily without formal charges; the Court extended it to Guantanamo detainees in Rasul v. Bush (2004)." },
  { id: "l-hamdi", term: "Hamdi v. Rumsfeld", display: "Hamdi v. Rumsfeld (2004)", area: "dueprocess", topic: "3.8", page: 324, keyTerm: false,
    meaning: "Required at least a minimal hearing before the government detains a U.S. citizen as an enemy combatant; war is \"not a blank check\" for the president." },
  { id: "l-riley", term: "Riley v. California", display: "Riley v. California (2014)", area: "dueprocess", topic: "3.8", page: 325, keyTerm: false,
    meaning: "Arose from a warrantless search of an arrested man's phone; police need a warrant to look into the cell phone of a suspect or even an arrested defendant." }
];

const govLibertiesBank = [
  // =====================================================================
  // TOPIC 3.1 - THE BILL OF RIGHTS
  // =====================================================================
  {
    id: "gl001", term: "civil liberties", area: "rights", topic: "3.1",
    questionType: "definition", difficulty: "easy",
    question: "In AMSCO's definition, civil liberties are",
    options: ["personal freedoms the Constitution shields from arbitrary government interference", "privileges a legislature grants and may withdraw at any time by passing an ordinary statute", "the powers the Constitution reserves to the states or to the people", "duties citizens owe the government, such as jury service and paying taxes"],
    answer: "personal freedoms the Constitution shields from arbitrary government interference",
    explanation: "Civil liberties are limits on government: things it may not do to you. A privilege a legislature can take back at will is exactly what a constitutional guarantee is meant not to be, and reserved powers belong to the Tenth Amendment."
  },
  {
    id: "gl002", term: "James Madison", area: "rights", topic: "3.1",
    questionType: "process", difficulty: "easy",
    question: "James Madison opposed adding a bill of rights in 1787, yet he drafted one in the First Congress. What changed his course?",
    options: ["Anti-Federalist essays and formal petitions from the states pressed for one", "Washington made a bill of rights a condition of taking the oath of office", "The Supreme Court ruled in Barron v. Baltimore that liberties were unprotected", "Shays' Rebellion convinced him the states could no longer be trusted"],
    answer: "Anti-Federalist essays and formal petitions from the states pressed for one",
    explanation: "Ratification politics did it. Madison sifted the Anti-Federalists' complaints and the states' petitions into twelve proposals; ten were ratified in 1791. Barron came more than forty years later, and Shays' Rebellion fed the case for a stronger national army, not a bill of rights."
  },
  {
    id: "gl003", term: "James Madison", area: "rights", topic: "3.1",
    questionType: "compare", difficulty: "medium",
    question: "Before he became its author, Madison argued against adding a bill of rights. Which concern was part of his reasoning?",
    options: ["Any right left off a written list might later look open to government overreach", "A list of rights would hand the states a veto over every act of Congress", "Rights enforced by unelected judges would make the courts the most dangerous branch of all", "Only state constitutions could legitimately protect a citizen's liberties"],
    answer: "Any right left off a written list might later look open to government overreach",
    explanation: "Madison thought dividing power among three branches already protected liberty, and that an incomplete list would be read as complete. The Ninth Amendment is the eventual answer to his worry: rights not listed are still protected."
  },
  {
    id: "gl004", term: "Ninth Amendment", area: "rights", topic: "3.1",
    questionType: "application", difficulty: "medium",
    question: "A citizen argues that a right is protected even though no amendment names it. Which part of the Bill of Rights most directly supports her?",
    options: ["the Ninth Amendment", "the Tenth Amendment", "the First Amendment", "the Fourth Amendment"],
    answer: "the Ninth Amendment",
    explanation: "The Ninth says listing some rights does not deny others the people keep. The Tenth is the other closing disclaimer, but it is about powers left to the states, not about unlisted rights."
  },
  {
    id: "gl005", term: "Tenth Amendment", area: "rights", topic: "3.1",
    questionType: "compare", difficulty: "medium",
    question: "The Bill of Rights ends with two disclaimers. Which pairing correctly matches each amendment to its job?",
    options: ["Ninth: unlisted rights are still protected. Tenth: undelegated powers stay with the states", "Ninth: undelegated powers stay with the states. Tenth: unlisted rights are still protected", "Ninth: states must follow the Bill of Rights. Tenth: Congress may do what is necessary and proper", "Ninth: no excessive bail or fines. Tenth: no unreasonable searches and seizures"],
    answer: "Ninth: unlisted rights are still protected. Tenth: undelegated powers stay with the states",
    explanation: "The Ninth guards rights the list leaves out; the Tenth codifies the 1787 understanding that federal powers are listed and the rest remain with the states. Bail and fines are the Eighth Amendment, searches the Fourth."
  },
  {
    id: "gl006", term: "Bill of Rights", area: "rights", topic: "3.1",
    questionType: "definition", difficulty: "easy",
    question: "When it was ratified in 1791, the Bill of Rights restrained",
    options: ["the federal government", "the state governments", "federal and state governments equally", "city and county governments only"],
    answer: "the federal government",
    explanation: "The First Amendment literally begins \"Congress shall make no law.\" Some states even required officeholders to belong to a church. Applying these protections to the states came much later, through selective incorporation."
  },
  {
    id: "gl007", term: "Barron v. Baltimore", area: "rights", topic: "3.1",
    questionType: "case", difficulty: "medium",
    question: "In Barron v. Baltimore (1833), the Marshall Court held that",
    options: ["states did not have to honor the protections in the federal Bill of Rights", "states must pay just compensation whenever they take private property", "the Bill of Rights binds states through the Fourteenth Amendment", "Congress may oversee how the states take private property under the commerce clause"],
    answer: "states did not have to honor the protections in the federal Bill of Rights",
    explanation: "Barron confined the Bill of Rights to the national government, and that precedent held until incorporation began. The Fourteenth Amendment did not exist until 1868, and the just compensation rule reached the states only in 1897."
  },
  {
    id: "gl008", term: "public interest", area: "rights", topic: "3.1",
    questionType: "definition", difficulty: "easy",
    question: "AMSCO defines the public interest as",
    options: ["the welfare or well-being of the general public", "whichever liberties a majority of voters currently supports", "the goals of whichever group lobbies government most effectively", "rights that belong to public officials rather than private citizens"],
    answer: "the welfare or well-being of the general public",
    explanation: "The public interest is the counterweight to civil liberty. When a liberty seriously threatens the general welfare - speech that endangers public safety, for instance - government may limit it. It is not a popularity contest among rights."
  },
  {
    id: "gl009", term: "public interest", area: "rights", topic: "3.1",
    questionType: "application", difficulty: "medium",
    question: "Which of these limits a liberty mainly in the name of the public interest, as AMSCO uses the idea?",
    options: ["a state refusing to license drivers until their mid-teens", "a newspaper declining to print a reader's angry letter", "a church requiring all of its members to attend weekly worship services", "a city naming a new public park after a local veteran"],
    answer: "a state refusing to license drivers until their mid-teens",
    explanation: "Holding off on driving until somewhere between 14 and 17 is AMSCO's own example: minors' liberty is limited for their safety and everyone else's. The newspaper and the church are private actors, and naming a park limits nobody."
  },
  {
    id: "gl010", term: "Bill of Rights", area: "rights", topic: "3.1",
    questionType: "compare", difficulty: "medium",
    question: "Even before the Bill of Rights, the 1787 Constitution protected a few liberties. Which was already in the original document?",
    options: ["a ban on ex post facto laws", "freedom of religion", "protection against unreasonable searches", "a ban on cruel and unusual punishment"],
    answer: "a ban on ex post facto laws",
    explanation: "The original text bars bills of attainder and ex post facto laws, limits suspending habeas corpus, and promises jury trials in Article III. Religion, searches and punishment had to wait for the First, Fourth and Eighth Amendments - the gap Anti-Federalists complained about."
  },
  {
    id: "gl011", term: "public interest", area: "rights", topic: "3.1",
    questionType: "scenario", difficulty: "medium",
    question: "During the COVID-19 pandemic, some people wore masks for others' sake while some called mask requirements an infringement of their rights. AMSCO presents this as a clash between",
    options: ["civil liberties and the public interest", "the establishment and free exercise clauses", "prior restraint and the law of libel", "binding and persuasive precedent"],
    answer: "civil liberties and the public interest",
    explanation: "Individual freedom on one side, the general public's well-being on the other: that tension runs through the whole unit. None of the other pairs is about a health rule at all."
  },
  {
    id: "gl012", term: "civil liberties", area: "rights", topic: "3.1",
    questionType: "scenario", difficulty: "hard",
    question: "Protesters gather outside the Supreme Court to denounce a ruling as a miscarriage of justice, and police leave them alone. Which statement best explains why, using the ideas in Topic 3.1?",
    options: ["Criticizing the government is a protected liberty unless it seriously threatens public safety", "Protest is allowed only on federal property, where the Bill of Rights applies", "The Court itself must approve any protest aimed at one of its decisions", "The Tenth Amendment leaves crowd control near federal buildings to the states"],
    answer: "Criticizing the government is a protected liberty unless it seriously threatens public safety",
    explanation: "AMSCO uses exactly this picture: protesters outside the Capitol, the White House and the Court, unafraid of punishment. The freedom has limits - speech that seriously threatens public safety is unprotected - but criticism alone is not a threat."
  },
  {
    id: "gl013", term: "Bill of Rights", area: "rights", topic: "3.1",
    questionType: "definition", difficulty: "easy",
    question: "Which protection appears among the criminal justice rights in the Bill of Rights?",
    options: ["protection against cruel and unusual punishment", "the right to vote regardless of race", "the right to a free public education", "the right to own property free of any state or federal taxation"],
    answer: "protection against cruel and unusual punishment",
    explanation: "The Bill of Rights lists protections for the accused: no searches without probable cause, the right to cross-examine witnesses and refuse to testify, a jury of peers, and no cruel and unusual punishment. Voting rights and education come from other sources entirely."
  },
  {
    id: "gl014", term: "Bill of Rights", area: "rights", topic: "3.1",
    questionType: "application", difficulty: "medium",
    question: "Why have phrases like \"speedy trial\" and \"excessive bail\" kept the courts busy ever since 1791?",
    options: ["Their broad wording leaves exact meanings to be settled case by case", "Congress has rewritten each of them several times since ratification", "The states wrote them, so federal judges must defer to state readings", "They were added after the Civil War and lack any historical record"],
    answer: "Their broad wording leaves exact meanings to be settled case by case",
    explanation: "AMSCO notes the broad phrasing helped win ratification and then guaranteed two centuries of litigation. Through judicial review, courts keep redrawing the line between liberty and public order; none of these phrases has been amended."
  },
  {
    id: "gl015", term: "Barron v. Baltimore", area: "rights", topic: "3.1",
    questionType: "scenario", difficulty: "hard",
    question: "In the 1830s, shortly after Barron v. Baltimore, a state requires its governor to belong to a Protestant church. A challenger cites the First Amendment. What outcome was most likely under the law of the time?",
    options: ["The claim fails, since the Bill of Rights then limited only the federal government", "The claim succeeds, since the establishment clause bound every level of government", "The claim succeeds under the Fourteenth Amendment's due process clause", "The claim fails, since only Congress may enforce the First Amendment"],
    answer: "The claim fails, since the Bill of Rights then limited only the federal government",
    explanation: "AMSCO notes some states did require officeholders to be church members, and Barron confirmed the Bill of Rights did not bind states. The Fourteenth Amendment came in 1868, and the religion clauses reached the states only in the 1940s."
  },

  // =====================================================================
  // TOPIC 3.2 - FREEDOM OF RELIGION
  // =====================================================================
  {
    id: "gl016", term: "establishment clause", area: "religion", topic: "3.2",
    questionType: "definition", difficulty: "easy",
    question: "The First Congress included the establishment clause mainly to",
    options: ["keep the federal government from creating a national religion", "guarantee each person the right to practice any faith they choose", "require public schools to teach about the world's major religions", "let the states fund churches as long as they treated them equally"],
    answer: "keep the federal government from creating a national religion",
    explanation: "That was the original aim; today the clause is read to bar every level of government from sanctioning, favoring or disregarding any religion. Practicing your own faith is the free exercise clause, the establishment clause's partner."
  },
  {
    id: "gl017", term: "free exercise clause", area: "religion", topic: "3.2",
    questionType: "application", difficulty: "easy",
    question: "A state bans a harmless ritual central to a small faith. Members who sue would rely mainly on",
    options: ["the free exercise clause", "the establishment clause", "the just compensation clause", "the Ninth Amendment"],
    answer: "the free exercise clause",
    explanation: "The free exercise clause stops government from preventing religious practice unless the act is illegal or threatens the community. The establishment clause covers the opposite problem: government promoting or favoring religion."
  },
  {
    id: "gl018", term: "wall of separation", area: "religion", topic: "3.2",
    questionType: "document", difficulty: "easy",
    question: "Who popularized the phrase \"wall of separation between church and state,\" and where?",
    options: ["Thomas Jefferson, writing to Baptists in Danbury in 1802", "James Madison, in his notes from the Constitutional Convention", "Justice Hugo Black, in his majority opinion in Engel v. Vitale", "Chief Justice Burger, while describing the Lemon test in 1971"],
    answer: "Thomas Jefferson, writing to Baptists in Danbury in 1802",
    explanation: "As president, Jefferson assured Danbury's Baptists that the First Amendment built a wall between church and state. The Court borrowed the phrase in Everson (1947); Burger later called the line a \"blurred, indistinct, and variable barrier.\""
  },
  {
    id: "gl019", term: "Engel v. Vitale", area: "religion", topic: "3.2",
    questionType: "case", difficulty: "easy",
    question: "In Engel v. Vitale (1962), the Supreme Court struck down",
    options: ["a state-written prayer recited daily in New York public schools", "daily Bible readings in Pennsylvania's public schools", "a Wisconsin law requiring Amish teens to stay in school", "New Jersey's reimbursement of bus fares for students at parochial schools"],
    answer: "a state-written prayer recited daily in New York public schools",
    explanation: "New York's Board of Regents composed a nondenominational prayer for classes to recite. Bible readings fell a year later in Abington v. Schempp; Yoder protected the Amish; and Everson upheld the bus fares."
  },
  {
    id: "gl020", term: "Engel v. Vitale", area: "religion", topic: "3.2",
    questionType: "document", difficulty: "medium",
    question: "Students could stand silent or leave the room during New York's Regents' prayer. Why did the Court still find a violation in Engel?",
    options: ["A state body wrote the prayer for schools that students were required by law to attend", "Teachers were required to record and grade whether each student recited the prayer every morning", "Parents had not been notified before the prayer was introduced", "The state paid local clergy to lead the prayer in each classroom"],
    answer: "A state body wrote the prayer for schools that students were required by law to attend",
    explanation: "Voluntariness did not save it. A government body put its stamp on a prayer for compulsory-attendance schools. Black added that students would hesitate to opt out of a teacher-led exercise, and Douglas called them a \"captive\" audience."
  },
  {
    id: "gl021", term: "Engel v. Vitale", area: "religion", topic: "3.2",
    questionType: "application", difficulty: "hard",
    question: "A public high school plans to let a student lead an official prayer over the loudspeaker before a school-sponsored game. Given what the Court has ruled since Engel, the plan is most likely",
    options: ["struck down, because the Court has rejected student-led prayer at official school events", "upheld, because Engel covered only prayers that a state agency itself composed", "upheld, because Tinker protects student expression on school grounds", "struck down, because students may never discuss religion at a public school"],
    answer: "struck down, because the Court has rejected student-led prayer at official school events",
    explanation: "Who reads the prayer does not matter when the school sponsors the event. But watch the last option: right outcome, wrong reason. Students keep the right to pray privately, wear religious T-shirts and talk about religion."
  },
  {
    id: "gl022", term: "Lemon v. Kurtzman", area: "religion", topic: "3.2",
    questionType: "definition", difficulty: "medium",
    question: "Which of the following is NOT part of the Lemon test?",
    options: ["The policy must be supported by most of the affected community", "The policy must have a secular purpose", "The policy's effect must neither advance nor prohibit religion", "The policy must avoid entangling government and religion"],
    answer: "The policy must be supported by most of the affected community",
    explanation: "Lemon's three prongs are a secular purpose, a neutral effect and no excessive entanglement. Popularity is beside the point: AMSCO notes most Americans have favored school prayer, and the Court has struck it down anyway."
  },
  {
    id: "gl023", term: "Lemon v. Kurtzman", area: "religion", topic: "3.2",
    questionType: "case", difficulty: "medium",
    question: "Pennsylvania and Rhode Island paid parochial school teachers to teach secular subjects such as math and English. Why did the Court strike this down in Lemon v. Kurtzman?",
    options: ["Teachers at religious schools might weave faith into lessons, entangling church and state", "States may not require particular subjects, such as math and English, to be taught in private schools", "Parochial teachers were being paid more than public school teachers", "The money went to parents instead of to the schools themselves"],
    answer: "Teachers at religious schools might weave faith into lessons, entangling church and state",
    explanation: "The danger was excessive entanglement: policing whether a teacher kept religion out of class would tie the state up in the church's affairs. Money routed to parents is what saved Cleveland's voucher program; it was not the issue in Lemon."
  },
  {
    id: "gl024", term: "Lemon v. Kurtzman", area: "religion", topic: "3.2",
    questionType: "application", difficulty: "hard",
    question: "To make sure state aid funds only secular lessons, a state sends inspectors to sit in on classes at religious schools every week. Which part of the Lemon test targets this kind of ongoing government presence inside a religious institution?",
    options: ["the bar on excessive entanglement", "the secular purpose requirement", "the time, place, and manner test", "the rule that aid must go to parents"],
    answer: "the bar on excessive entanglement",
    explanation: "The third prong forbids a relationship that entangles either government or religion in the other's internal affairs, and weekly classroom monitoring is exactly that. The plan's purpose may be secular; its machinery is the problem."
  },
  {
    id: "gl025", term: "Wisconsin v. Yoder", area: "religion", topic: "3.2",
    questionType: "case", difficulty: "easy",
    question: "Wisconsin v. Yoder (1972) held that",
    options: ["Amish parents could keep their teens out of high school", "states may require every child to attend school until age 16, whatever the family's faith", "public schools may not lead students in a state-written prayer", "parents may use state vouchers to pay tuition at religious schools"],
    answer: "Amish parents could keep their teens out of high school",
    explanation: "Requiring Amish children to attend past eighth grade violated their parents' free exercise of religion. Wisconsin had lost on exactly the age-16 argument; school prayer is Engel, and vouchers came up in Cleveland."
  },
  {
    id: "gl026", term: "Wisconsin v. Yoder", area: "religion", topic: "3.2",
    questionType: "document", difficulty: "hard",
    question: "Chief Justice Burger wrote that high school \"takes them away from their community, physically and emotionally, during the crucial and formative adolescent period of life.\" What role does this passage play in the Court's reasoning?",
    options: ["It shows that compulsory high school would seriously burden Amish religious life", "It shows that Amish teens would become burdens on society without more formal schooling", "It shows that Wisconsin wrote its attendance law to target the Amish", "It shows that the state, not parents, had the final word on education"],
    answer: "It shows that compulsory high school would seriously burden Amish religious life",
    explanation: "Burger's point is that the teen years are when Amish children take on the faith and the community's way of life, so forcing them into high school strikes at religious practice itself. The other options restate the state's side or claim targeting the Court never found."
  },
  {
    id: "gl027", term: "Wisconsin v. Yoder", area: "religion", topic: "3.2",
    questionType: "compare", difficulty: "hard",
    question: "Wisconsin argued it had to educate children to age 16 so they would not become burdens on society. How did the Court answer that argument in Yoder?",
    options: ["Informal vocational training at home kept Amish young people self-reliant", "A state's interest in education can never outweigh a religious practice", "Education belongs to the federal government, so Wisconsin lacked authority", "The $5 fines were too small to count as a burden on anyone's religion"],
    answer: "Informal vocational training at home kept Amish young people self-reliant",
    explanation: "The Court weighed the state's interest rather than dismissing it: Amish teens had finished eighth grade and went on to learn trades, so stopping early did not make them dependents. That is far narrower than saying religion always wins."
  },
  {
    id: "gl028", term: "Everson v. Board of Education", area: "religion", topic: "3.2",
    questionType: "case", difficulty: "medium",
    question: "Everson v. Board of Education (1947) upheld New Jersey's reimbursement of bus fares for students at parochial schools. What was the Court's reasoning?",
    options: ["Busing is a neutral public service, like police or fire protection, open to all", "The establishment clause does not apply to state governments at all", "Religious schools are entitled to the same funding as public schools", "The money was paid only to parents who belonged to the church"],
    answer: "Busing is a neutral public service, like police or fire protection, open to all",
    explanation: "The aid went evenly to parents of children at any accredited school and gave the churches nothing. Everson also signaled the opposite of the second option: the religion clauses do reach the states, through the Fourteenth Amendment."
  },
  {
    id: "gl029", term: "Abington v. Schempp", area: "religion", topic: "3.2",
    questionType: "case", difficulty: "medium",
    question: "A year after Engel, the Court applied the same logic in Abington v. Schempp to strike down",
    options: ["daily Bible readings in public schools", "a nativity scene in a city's holiday display", "tuition vouchers usable at religious schools", "a Ten Commandments monument at a state capitol"],
    answer: "daily Bible readings in public schools",
    explanation: "In both Engel and Abington the school was projecting religion, which made it an establishment. The other three were all upheld: Lynch's nativity scene, Cleveland's vouchers and the Texas capitol monument."
  },
  {
    id: "gl030", term: "school vouchers", area: "religion", topic: "3.2",
    questionType: "application", difficulty: "medium",
    question: "Cleveland's tuition voucher program was upheld even though 96 percent of participating private school students attended religious schools. What mattered most to the Court?",
    options: ["Money went to parents, and the program did not favor religious over secular schools", "Participating schools agreed to drop religion from the school day", "Religious schools promised to admit students of any faith", "City voters had approved the program in a referendum"],
    answer: "Money went to parents, and the program did not favor religious over secular schools",
    explanation: "Neutrality and private choice carried the day: the state paid families, families chose schools, and the program never distinguished religious from nonreligious ones. That contrasts with Lemon, where the state paid teachers inside parochial schools directly."
  },
  {
    id: "gl031", term: "Lynch v. Donnelly", area: "religion", topic: "3.2",
    questionType: "case", difficulty: "medium",
    question: "Pawtucket, Rhode Island, set a nativity scene among a Christmas tree, Santa's house and other decorations. Why did the Court uphold it in Lynch v. Donnelly (1984)?",
    options: ["In that setting it served a secular purpose: showing the holiday's origins", "Religious displays on public property are always permitted", "Private donors had paid for every piece of the display", "The free exercise clause requires cities to mark major religious holidays with public displays"],
    answer: "In that setting it served a secular purpose: showing the holiday's origins",
    explanation: "Context decided it. In 1989 the Court struck down a creche standing alone on public property, because without the surrounding holiday decor it read as a Christian-centered display."
  },
  {
    id: "gl032", term: "establishment clause", area: "religion", topic: "3.2",
    questionType: "compare", difficulty: "hard",
    question: "In 2005 the Court upheld a Ten Commandments monument on the Texas capitol grounds but struck down Ten Commandments displays in two Kentucky courthouses. What best explains the split?",
    options: ["Citizens are compelled to attend courtrooms, and the displays there looked mainly religious", "The Texas monument was privately owned, while Kentucky's displays were public", "The Kentucky displays were larger and more prominent than the Texas monument", "Texas had passed a law approving its monument before anyone sued"],
    answer: "Citizens are compelled to attend courtrooms, and the displays there looked mainly religious",
    explanation: "The Texas monument stood among 17 others where passersby might glance at it, serving a historical function. A courtroom is a place some must attend and that should be free of prejudice, and an objective observer would see a religious purpose there."
  },
  {
    id: "gl033", term: "Religious Freedom Restoration Act", area: "religion", topic: "3.2",
    questionType: "process", difficulty: "hard",
    question: "Congress passed the Religious Freedom Restoration Act in 1993 out of anger at which Supreme Court decision?",
    options: ["Employment Division v. Smith (1990)", "Engel v. Vitale (1962)", "Lemon v. Kurtzman (1971)", "Wisconsin v. Yoder (1972)"],
    answer: "Employment Division v. Smith (1990)",
    explanation: "Smith weakened protection for religious practices that conflict with general laws, upsetting liberals and conservatives alike. RFRA says government must not substantially burden religion without compelling justification. Yoder, by contrast, strengthened free exercise rather than weakening it."
  },
  {
    id: "gl034", term: "free exercise clause", area: "religion", topic: "3.2",
    questionType: "definition", difficulty: "medium",
    question: "The free exercise clause is generally upheld, but a religious practice may still be restricted when it",
    options: ["is illegal or threatens the interests of the community", "is followed by less than a majority of local residents", "takes place on privately owned property", "was unknown when the Constitution was ratified"],
    answer: "is illegal or threatens the interests of the community",
    explanation: "Together the religion clauses mean you may practice any faith provided it does not break established law or harm others. Protecting minority faiths is the whole point, so being outnumbered is no reason to lose protection."
  },
  {
    id: "gl035", term: "free exercise clause", area: "religion", topic: "3.2",
    questionType: "scenario", difficulty: "hard",
    question: "In the same public school classroom, a teacher wants to read a devotional passage aloud each morning, and a student wants to wear a T-shirt printed with a Bible verse. How do the religion clauses treat them?",
    options: ["The teacher's reading is restricted because she acts for the state; the shirt is protected", "Both are protected, since each is one person's free exercise of religion", "Both are barred, since the establishment clause keeps every form of religion out of public schools", "The teacher's reading is protected; the shirt may be banned as a distraction"],
    answer: "The teacher's reading is restricted because she acts for the state; the shirt is protected",
    explanation: "AMSCO draws this exact line: students may pray privately, wear religious T-shirts and discuss religion, but public teachers are more restricted because the state employs them, so their religious acts look like government endorsement."
  },
  {
    id: "gl036", term: "establishment clause", area: "religion", topic: "3.2",
    questionType: "compare", difficulty: "medium",
    question: "Which situation raises an establishment clause question rather than a free exercise question?",
    options: ["A state gives repair grants only to one denomination's churches", "A state requires Amish teens to attend high school until age 16", "A school suspends a student for praying silently at lunch", "A city fines a congregation for holding a traditional ritual"],
    answer: "A state gives repair grants only to one denomination's churches",
    explanation: "Favoring one faith with public money is government advancing religion - the establishment problem. The other three are government stopping someone's religious practice, which is the free exercise side."
  },
  {
    id: "gl037", term: "wall of separation", area: "religion", topic: "3.2",
    questionType: "document", difficulty: "hard",
    question: "In Lemon v. Kurtzman, Chief Justice Burger said the line between church and state is, far from being a wall, \"a blurred, indistinct, and variable barrier.\" What was his point?",
    options: ["The line is hard to locate, so courts need a test to apply it case by case", "The establishment clause should no longer be applied to state and local governments", "Church and government should cooperate whenever both benefit", "Only Congress, not the courts, should decide where the line falls"],
    answer: "The line is hard to locate, so courts need a test to apply it case by case",
    explanation: "Burger was not abandoning Jefferson's wall; he was admitting it is hard to see. That is why the Court wrote the Lemon test in the same opinion, to guide lower courts through future disputes."
  },
  {
    id: "gl038", term: "Engel v. Vitale", area: "religion", topic: "3.2",
    questionType: "case", difficulty: "hard",
    question: "In the 1980s Alabama had public schools open each day with a moment of silence for prayer or meditation. What did the Court decide in 1985?",
    options: ["It was an establishment of religion, though an occasional, undefined moment of silence might survive", "It was constitutional, since no student had to pray aloud", "It violated students' free exercise rights by forcing them to be silent", "It was constitutional, since the legislature rather than teachers wrote it"],
    answer: "It was an establishment of religion, though an occasional, undefined moment of silence might survive",
    explanation: "Alabama designed the policy to satisfy community wishes without breaking the Engel line, but tying the silence to prayer made it an establishment. The Court left the door open to a moment of silence that is occasional and not defined as prayer time."
  },
  {
    id: "gl039", term: "Wisconsin v. Yoder", area: "religion", topic: "3.2",
    questionType: "compare", difficulty: "medium",
    question: "What do Engel v. Vitale and Wisconsin v. Yoder have in common?",
    options: ["In each, the Court found that a state policy violated the First Amendment's religion clauses", "Each turned on the establishment clause", "Each upheld the state's authority over public education", "Each involved government money flowing to religious schools"],
    answer: "In each, the Court found that a state policy violated the First Amendment's religion clauses",
    explanation: "Both cases went against the state, but under different clauses: Engel under the establishment clause (government promoting prayer), Yoder under free exercise (government burdening Amish practice). Neither involved funding."
  },

  // =====================================================================
  // TOPIC 3.3 - FREEDOM OF SPEECH
  // =====================================================================
  {
    id: "gl040", term: "symbolic speech", area: "expression", topic: "3.3",
    questionType: "definition", difficulty: "easy",
    question: "Which of these is the clearest example of symbolic speech?",
    options: ["wearing a black armband to protest a war", "publishing an editorial that criticizes the mayor", "signing a petition asking Congress to change a law", "phoning a senator's office to oppose a bill"],
    answer: "wearing a black armband to protest a war",
    explanation: "Symbolic speech carries a message through an act or object rather than words - the Tinkers' armbands, a burned flag. The other three all communicate in words, which is ordinary speech, press or petition."
  },
  {
    id: "gl041", term: "Tinker v. Des Moines", area: "expression", topic: "3.3",
    questionType: "case", difficulty: "easy",
    question: "Tinker v. Des Moines (1969) is best known for holding that",
    options: ["students do not shed their free speech rights at the schoolhouse gate", "schools may ban any student expression that administrators predict might become a distraction", "students may be punished for lewd speech at a school assembly", "speech posing a clear and present danger is not protected"],
    answer: "students do not shed their free speech rights at the schoolhouse gate",
    explanation: "Justice Fortas's line protected students' anti-war armbands. Punishing lewd assembly speech is Bethel v. Fraser, and clear and present danger is Schenck. Fearing a distraction was exactly the reason Tinker rejected."
  },
  {
    id: "gl042", term: "Tinker v. Des Moines", area: "expression", topic: "3.3",
    questionType: "case", difficulty: "medium",
    question: "Which fact did the Court treat as decisive in ruling for the students in Tinker?",
    options: ["The record showed no actual disruption of schoolwork or discipline", "The armbands were worn only after school hours, off school grounds", "The students' parents had signed permission slips for the protest", "The principals had never put their armband policy in writing"],
    answer: "The record showed no actual disruption of schoolwork or discipline",
    explanation: "Fortas wrote that schools may forbid conduct that materially and substantially interferes with discipline, but not the mere discomfort of an unpopular view. The armbands were worn at school, which is why the case mattered at all."
  },
  {
    id: "gl043", term: "time, place, and manner", area: "expression", topic: "3.3",
    questionType: "application", difficulty: "hard",
    question: "AMSCO says the Des Moines suspension failed one criterion of the time, place, and manner test. Which one, and why?",
    options: ["Content neutrality, because the ban targeted the students' anti-war message", "Narrow tailoring, because the ban covered every kind of jewelry and clothing", "Adequate alternatives, because students could not protest anywhere else", "A significant interest, because schools have no stake in keeping order"],
    answer: "Content neutrality, because the ban targeted the students' anti-war message",
    explanation: "Principals wrote the policy specifically to quiet one opinion about Vietnam. A rule aimed at what is being said rather than how or where fails the first criterion, whatever else it gets right."
  },
  {
    id: "gl044", term: "Morse v. Frederick", area: "expression", topic: "3.3",
    questionType: "case", difficulty: "medium",
    question: "As the Olympic torch passed a school-sponsored outing across the street from his school, a student unfurled a \"BONG HITS 4 JESUS\" banner. Why did the Court let the school punish him in Morse v. Frederick?",
    options: ["The event was school-sponsored, and the banner could reasonably be read to promote illegal drug use", "Its religious reference violated the establishment clause at a school event", "Students have no free speech rights at events held off school grounds", "The banner created a clear and present danger of violence"],
    answer: "The event was school-sponsored, and the banner could reasonably be read to promote illegal drug use",
    explanation: "Being across the street did not matter; the outing was the school's, so the school could act. And the problem was the pro-drug message, not religion. Students outside school events keep full rights, which is why the third option is wrong."
  },
  {
    id: "gl045", term: "Bethel School District v. Fraser", area: "expression", topic: "3.3",
    questionType: "compare", difficulty: "medium",
    question: "How did the Court distinguish Matt Fraser's student-assembly speech from the Tinkers' armbands?",
    options: ["Fraser's sexual innuendo had no real political value; the armbands were political", "Fraser spoke off campus, where school rules do not reach", "The armbands caused a disruption, while Fraser's speech caused none", "Fraser's speech was symbolic, and symbolic speech gets less protection"],
    answer: "Fraser's sexual innuendo had no real political value; the armbands were political",
    explanation: "Students keep their rights at the gate, but those rights do not cover lewd or offensive speech designed to entertain a teenage crowd. The armbands were silent, passive and political, and the record showed they disrupted nothing."
  },
  {
    id: "gl046", term: "Tinker v. Des Moines", area: "expression", topic: "3.3",
    questionType: "scenario", difficulty: "hard",
    question: "Applying Tinker, Fraser and Morse together, which student expression is most likely protected?",
    options: ["a button criticizing the school board's budget cuts, worn quietly in class", "a campaign speech for a friend at a school assembly, packed with sexual innuendo", "a banner promoting drug use held up at a school-sponsored parade", "a T-shirt joking about drug use worn on a school field trip"],
    answer: "a button criticizing the school board's budget cuts, worn quietly in class",
    explanation: "Quiet political criticism with no disruption is Tinker. The assembly speech is Fraser, and both drug messages at school-sponsored events are Morse - the field trip counts as the school's event just as the torch relay did."
  },
  {
    id: "gl047", term: "United States v. O'Brien", area: "expression", topic: "3.3",
    questionType: "case", difficulty: "medium",
    question: "David O'Brien burned his draft card outside a Boston courthouse to protest the Vietnam War. Why did the Court uphold his conviction?",
    options: ["The law protected Congress's power to raise an army and did not target his message", "Burning an object can never be a form of protected expression", "Political protest loses all protection while the nation is at war", "He had urged the crowd to attack the courthouse immediately"],
    answer: "The law protected Congress's power to raise an army and did not target his message",
    explanation: "O'Brien was disrupting the draft and encouraging others to follow. The second option is disproved by Texas v. Johnson, where burning a flag was protected, and AMSCO describes no incitement to violence."
  },
  {
    id: "gl048", term: "Texas v. Johnson", area: "expression", topic: "3.3",
    questionType: "compare", difficulty: "hard",
    question: "The Court upheld a ban on burning draft cards in O'Brien but struck down flag-burning bans in Texas v. Johnson and United States v. Eichman. What explains the different results?",
    options: ["The flag laws served no purpose except enforcing a government-approved reverence for the flag", "Draft cards were private property, while flags are government property", "Flag burning is pure speech, while burning a draft card is symbolic speech", "A state passed the draft card law, while Congress passed both flag laws"],
    answer: "The flag laws served no purpose except enforcing a government-approved reverence for the flag",
    explanation: "The draft card law protected a real government function, raising an army, without regard to message. The flag laws existed only to impose a political idea. Both acts were symbolic speech, and draft cards were government-issued documents."
  },
  {
    id: "gl049", term: "time, place, and manner", area: "expression", topic: "3.3",
    questionType: "application", difficulty: "medium",
    question: "A city bans amplified sound in residential neighborhoods after 10 p.m. for every speaker and topic, but allows rallies in a downtown park at any hour. Allowing the park rallies helps the ordinance satisfy which criterion?",
    options: ["adequate alternative ways of expression", "content neutrality", "a significant government interest", "narrow tailoring"],
    answer: "adequate alternative ways of expression",
    explanation: "Government may regulate when, where and how people speak if other times, places and manners remain open. The park is that alternative. Applying the rule to every speaker and topic is what makes it content-neutral - a different criterion."
  },
  {
    id: "gl050", term: "time, place, and manner", area: "expression", topic: "3.3",
    questionType: "scenario", difficulty: "hard",
    question: "Worried about litter on one downtown block, a city bans leafleting everywhere within city limits. Which criterion of the time, place, and manner test does the ban most clearly fail?",
    options: ["narrow tailoring", "content neutrality", "a significant government interest", "the clear and present danger test"],
    answer: "narrow tailoring",
    explanation: "A one-block problem met with a citywide ban spills far past its target. The law upheld in O'Brien was tailored to draft cards, not flags. The leaflet ban is content-neutral and litter is a real interest; clear and present danger is not part of this test."
  },
  {
    id: "gl051", term: "Cohen v. California", area: "expression", topic: "3.3",
    questionType: "document", difficulty: "medium",
    question: "\"One man's vulgarity is another's lyric,\" the majority wrote in Cohen v. California (1971). What principle does that line express?",
    options: ["Government may not punish words just because many people find them offensive", "Obscene material is protected if it has some artistic value", "Symbolic acts get more protection than spoken or written words", "Profanity is protected only when it appears in political advertising"],
    answer: "Government may not punish words just because many people find them offensive",
    explanation: "Cohen's jacket was crude, but it incited no illegal action, so his conviction for offensive conduct fell. Cohen is not an obscenity case at all - that line of cases runs from Roth to Miller."
  },
  {
    id: "gl052", term: "Cohen v. California", area: "expression", topic: "3.3",
    questionType: "compare", difficulty: "medium",
    question: "Both David O'Brien and Paul Cohen protested the Vietnam-era draft. Which statement correctly contrasts their cases?",
    options: ["O'Brien's act obstructed the draft and broke a valid law; Cohen's words only offended", "O'Brien's message was more offensive, so it lost its protection", "Cohen protested in peacetime, while O'Brien protested during the war", "Cohen refused to register for the draft, while O'Brien complied with it"],
    answer: "O'Brien's act obstructed the draft and broke a valid law; Cohen's words only offended",
    explanation: "The Court upheld a law helping Congress conscript troops against O'Brien. Cohen did nothing to incite protest and did not refuse to serve; an ugly phrase on a jacket was all. Both men protested while the Vietnam War was under way."
  },
  {
    id: "gl053", term: "Schenck v. United States", area: "expression", topic: "3.3",
    questionType: "case", difficulty: "easy",
    question: "Schenck v. United States (1919) upheld the conviction of a man who",
    options: ["mailed leaflets urging draftees to resist the World War I draft", "burned his draft card to protest the Vietnam War", "wore a jacket bearing a vulgar anti-draft slogan", "led a Klan rally where he hinted at future action against the government"],
    answer: "mailed leaflets urging draftees to resist the World War I draft",
    explanation: "Charles Schenck, a Socialist Party official, printed 15,000 leaflets calling conscription involuntary servitude. The other three are O'Brien (conviction upheld), Cohen (overturned) and Brandenburg (overturned)."
  },
  {
    id: "gl054", term: "clear and present danger", area: "expression", topic: "3.3",
    questionType: "document", difficulty: "medium",
    question: "Holmes wrote that free speech would not protect \"a man in falsely shouting fire in a theatre and causing a panic.\" What was the analogy meant to show?",
    options: ["The circumstances of speech can make it dangerous enough to punish", "False statements are never protected by the First Amendment", "Speech inside private buildings receives no constitutional protection", "Only speech that causes physical injury may be punished"],
    answer: "The circumstances of speech can make it dangerous enough to punish",
    explanation: "Holmes's point is context: \"the character of every act depends upon the circumstances in which it is done.\" Wartime made Schenck's leaflet dangerous. Not every falsehood loses protection - NYT v. Sullivan protects some false statements."
  },
  {
    id: "gl055", term: "Brandenburg v. Ohio", area: "expression", topic: "3.3",
    questionType: "process", difficulty: "hard",
    question: "Put these steps in the development of the Court's standard for dangerous speech in order.",
    options: ["Schenck's clear and present danger; Holmes's Abrams dissent; Brandenburg's imminent lawless action", "Holmes's Abrams dissent; Schenck's clear and present danger; Brandenburg's imminent lawless action", "Schenck's clear and present danger; Brandenburg's imminent lawless action; Holmes's Abrams dissent", "Brandenburg's imminent lawless action; Schenck's clear and present danger; Holmes's Abrams dissent"],
    answer: "Schenck's clear and present danger; Holmes's Abrams dissent; Brandenburg's imminent lawless action",
    explanation: "Schenck came first in 1919. Months later Holmes reconsidered in his Abrams dissent, asking for clear and imminent danger. Brandenburg (1969) turned that instinct into law fifty years on."
  },
  {
    id: "gl056", term: "Brandenburg v. Ohio", area: "expression", topic: "3.3",
    questionType: "definition", difficulty: "medium",
    question: "Under Brandenburg v. Ohio (1969), advocacy can be punished only if it",
    options: ["is meant to incite imminent lawless action and is likely to produce it", "openly advocates breaking the law at some point in the future to achieve political reform", "expresses hatred toward a racial or religious group", "criticizes the government while the nation is at war"],
    answer: "is meant to incite imminent lawless action and is likely to produce it",
    explanation: "Brandenburg requires both intent and likelihood, and the danger must be imminent. Abstract or future advocacy, hateful views and wartime criticism do not meet that bar on their own."
  },
  {
    id: "gl057", term: "Brandenburg v. Ohio", area: "expression", topic: "3.3",
    questionType: "scenario", difficulty: "hard",
    question: "At a rally, a speaker tells followers the government \"may someday have to answer for its betrayal,\" naming no time, place or plan. Under the modern standard, the speech is most likely",
    options: ["protected, because it does not incite imminent lawless action", "unprotected, because it threatens the government", "unprotected, because Schenck's original test still controls", "protected, because the First Amendment does not apply at rallies"],
    answer: "protected, because it does not incite imminent lawless action",
    explanation: "Vague talk of a reckoning \"someday\" is not a call to break the law now, so Brandenburg protects it. Schenck's test was narrowed by Brandenburg, and the First Amendment limits government wherever the speaker happens to be."
  },
  {
    id: "gl058", term: "obscene speech", area: "expression", topic: "3.3",
    questionType: "definition", difficulty: "easy",
    question: "AMSCO identifies two trends in the law of obscenity. What are they?",
    options: ["The First Amendment does not protect it, and no national standard fully defines it", "It is protected unless it is sent through the mail", "Congress defines it with one national standard", "It is protected for adults but not for minors"],
    answer: "The First Amendment does not protect it, and no national standard fully defines it",
    explanation: "Obscenity is unprotected, but nobody has managed a single nationwide definition - which is why Miller left it to local community standards. The Comstock law did reach the mail, but that was one statute, not the rule."
  },
  {
    id: "gl059", term: "Miller v. California", area: "expression", topic: "3.3",
    questionType: "definition", difficulty: "medium",
    question: "Which of these is one of the three parts of the Miller test for obscenity?",
    options: ["The work lacks serious literary, artistic, political, or scientific value", "The work was produced and sold mainly to earn a profit", "The work offends the standards of the nation as a whole, as defined by federal law", "The work criticizes public officials in an offensive way"],
    answer: "The work lacks serious literary, artistic, political, or scientific value",
    explanation: "Miller asks whether the average person applying contemporary community standards finds it appeals to the prurient interest, whether it depicts sexual conduct in a patently offensive way, and whether it lacks serious value. Community, not national, standards apply."
  },
  {
    id: "gl060", term: "Miller v. California", area: "expression", topic: "3.3",
    questionType: "compare", difficulty: "hard",
    question: "How did Miller v. California (1973) change the approach the Court had taken in Roth v. United States (1957)?",
    options: ["It let local judges and juries apply local community standards", "It declared that obscene material is protected expression", "It replaced community standards with a single national definition", "It limited obscenity laws to material sent through the mail"],
    answer: "It let local judges and juries apply local community standards",
    explanation: "Both cases agree obscenity is unprotected. After Roth's definition produced fifteen years of confusion, Miller handed the judgment to local judges and juries, and its three-part test became the standard."
  },
  {
    id: "gl061", term: "obscene speech", area: "expression", topic: "3.3",
    questionType: "definition", difficulty: "easy",
    question: "In Roth's definition of obscenity, material that \"appeals to the prurient interest\" is material that appeals to",
    options: ["lustful or lewd thoughts or wishes", "hostility toward a religious group", "the use of illegal drugs", "violent resistance to the government"],
    answer: "lustful or lewd thoughts or wishes",
    explanation: "\"Prurient\" means lustful or lewd. Roth defined obscene speech as material the average person, applying contemporary community standards, finds appeals to that interest - wording Miller kept as its first prong."
  },
  {
    id: "gl062", term: "obscene speech", area: "expression", topic: "3.3",
    questionType: "document", difficulty: "medium",
    question: "Justice Potter Stewart's 1964 remark about obscenity, \"I know it when I see it,\" captured which problem?",
    options: ["The Court could not settle on a workable definition of obscenity", "Judges disagreed about whether symbolic speech counted as speech", "Clear and present danger was impossible to prove in peacetime", "Prior restraints could be detected only after publication"],
    answer: "The Court could not settle on a workable definition of obscenity",
    explanation: "Roth's rule created a swamp of ambiguity. Lacking a solid definition, the Court overturned 31 obscenity convictions between 1967 and 1971 before Miller finally offered a usable test."
  },
  {
    id: "gl063", term: "compelling governmental interest", area: "expression", topic: "3.3",
    questionType: "definition", difficulty: "medium",
    question: "Free speech is not absolute, but to curb it government must show a substantial or compelling governmental interest. That means",
    options: ["a purpose important enough to justify infringing a personal liberty", "majority support for the restriction among the people and communities it affects", "a finding by Congress that the speech is false", "proof the speaker intended to commit a crime"],
    answer: "a purpose important enough to justify infringing a personal liberty",
    explanation: "The burden sits on government, and the reason has to be weighty. Popularity, a legislative finding of falsehood or a speaker's bad motive cannot by themselves carry that burden."
  },
  {
    id: "gl064", term: "seditious libel", area: "expression", topic: "3.3",
    questionType: "process", difficulty: "medium",
    question: "The revolutionary generation despised the colonial charge of seditious libel, which helps explain why free speech heads the Bill of Rights. Seditious libel punished people for",
    options: ["criticizing public officials or government policies", "printing false statements about private citizens", "refusing to house and feed British soldiers in their private homes", "importing goods without paying customs duties"],
    answer: "criticizing public officials or government policies",
    explanation: "Seditious libel made dissent itself a crime, with fines or jail. Dissent in assemblies and in print had led to independence, so the First Congress protected it first. False statements about private people are ordinary libel."
  },
  {
    id: "gl065", term: "time, place, and manner", area: "expression", topic: "3.3",
    questionType: "scenario", difficulty: "medium",
    question: "A city grants parade permits freely but denies one to a group because officials dislike its message on immigration. What is the strongest objection?",
    options: ["The denial is not content-neutral, so it fails the time, place, and manner test", "The denial violates the establishment clause", "The denial is a form of libel against the group", "The denial violates the just compensation clause"],
    answer: "The denial is not content-neutral, so it fails the time, place, and manner test",
    explanation: "Permit rules may control when, where and how a parade happens, but not which messages get to march. Singling out one viewpoint is the clearest possible failure of content neutrality."
  },
  {
    id: "gl066", term: "clear and present danger", area: "expression", topic: "3.3",
    questionType: "compare", difficulty: "hard",
    question: "What do Schenck's clear and present danger test and Tinker's \"material and substantial interference\" standard have in common?",
    options: ["Each lets government limit expression only when it threatens serious, concrete harm", "Each applies only while the nation is at war", "Each was later overruled by Brandenburg v. Ohio", "Each holds that symbolic speech is unprotected"],
    answer: "Each lets government limit expression only when it threatens serious, concrete harm",
    explanation: "Both tests let some speech be stopped but require a real danger first: obstructing a wartime draft, or genuinely disrupting school. Mere dislike or a feared distraction is not enough under either."
  },

  // =====================================================================
  // TOPIC 3.4 - FREEDOM OF THE PRESS
  // =====================================================================
  {
    id: "gl067", term: "prior restraint", area: "expression", topic: "3.4",
    questionType: "definition", difficulty: "easy",
    question: "Prior restraint means",
    options: ["government stopping speech or publication before it happens", "punishing a newspaper after it prints a falsehood", "a reporter's refusal to reveal a confidential source to a grand jury", "a court sealing trial records after the verdict"],
    answer: "government stopping speech or publication before it happens",
    explanation: "\"Prior\" is the key word: the restraint comes before the expression. Punishment after publication, as in a libel suit, is a different thing, and the Court is far more hostile to advance censorship."
  },
  {
    id: "gl068", term: "New York Times Co. v. United States", area: "expression", topic: "3.4",
    questionType: "case", difficulty: "easy",
    question: "In New York Times Co. v. United States (1971), the Court ruled that",
    options: ["the government could not block newspapers from publishing the Pentagon Papers", "Daniel Ellsberg could not be prosecuted for leaking the classified documents to reporters", "public officials must prove actual malice to win libel suits", "states may not use nuisance laws to shut down newspapers"],
    answer: "the government could not block newspapers from publishing the Pentagon Papers",
    explanation: "Nixon's lawyers won a lower-court injunction, and the Supreme Court overturned it. Actual malice is NYT v. Sullivan; the nuisance law is Near v. Minnesota. The Court never ruled on Ellsberg's right to leak."
  },
  {
    id: "gl069", term: "New York Times Co. v. United States", area: "expression", topic: "3.4",
    questionType: "application", difficulty: "hard",
    question: "After the Pentagon Papers decision, Daniel Ellsberg was indicted under the 1917 Espionage Act. Why was that consistent with the Court's ruling?",
    options: ["The Court decided only the newspapers' right to publish, not Ellsberg's right to leak", "The ruling protected leaks only after a war has formally ended", "The ruling covered the Washington Post but no individual citizens", "Per curiam opinions do not bind the government in later cases"],
    answer: "The Court decided only the newspapers' right to publish, not Ellsberg's right to leak",
    explanation: "Barring prior restraint of the press says nothing about whether the person who took classified papers broke the law. The two questions were separate, and only the first was before the Court."
  },
  {
    id: "gl070", term: "New York Times Co. v. United States", area: "expression", topic: "3.4",
    questionType: "definition", difficulty: "medium",
    question: "The Pentagon Papers ruling came as a per curiam opinion. That means",
    options: ["no single justice is named as its author", "every justice agreed, making it 9 to 0", "it would expire unless the Court reheard the case", "the chief justice wrote it without the others' input"],
    answer: "no single justice is named as its author",
    explanation: "A per curiam opinion speaks for the Court or its majority without attribution. It need not be unanimous: this one was 6 to 3, and several justices added their own concurrences, including Brennan's."
  },
  {
    id: "gl071", term: "libel", area: "expression", topic: "3.4",
    questionType: "definition", difficulty: "easy",
    question: "Libel is",
    options: ["a false statement in print that damages a person's reputation", "a true but embarrassing story about a public figure", "government censorship of a publication in advance", "a harsh but accurate critique of a government policy published in a newspaper"],
    answer: "a false statement in print that damages a person's reputation",
    explanation: "Falsehood plus damage to reputation is the core. Truth is not libel however embarrassing, harsh opinion is not libel, and advance censorship is prior restraint. American courts set a high bar before rewarding a suing party."
  },
  {
    id: "gl072", term: "malicious intent", area: "expression", topic: "3.4",
    questionType: "definition", difficulty: "medium",
    question: "Under New York Times Co. v. Sullivan, a public official suing over false statements about his official conduct must prove",
    options: ["actual malice: the publisher knew it was false or recklessly disregarded the truth", "only that the statements were false and harmed his reputation", "that the publisher was paid to print the statements", "that the statements were printed without his consent"],
    answer: "actual malice: the publisher knew it was false or recklessly disregarded the truth",
    explanation: "Falsehood and harm are not enough for a public official; he also has to show malicious intent - knowing lies or reckless disregard for the truth. That extra hurdle is why officials rarely win these suits."
  },
  {
    id: "gl073", term: "breathing space", area: "expression", topic: "3.4",
    questionType: "document", difficulty: "medium",
    question: "Sullivan held that freedom of expression needs \"breathing space\" to survive. In context, the phrase means",
    options: ["room for robust debate, which requires tolerating some false statements", "time to correct an error before a newspaper can be sued", "distance protesters must keep from public buildings", "a waiting period before classified material may be printed"],
    answer: "room for robust debate, which requires tolerating some false statements",
    explanation: "If every factual slip invited a ruinous lawsuit, reporters would stop writing hard stories. Sullivan accepted that debate about officials may be \"vehement, caustic, and sometimes unpleasantly sharp\" - and occasionally wrong."
  },
  {
    id: "gl074", term: "New York Times Co. v. Sullivan", area: "expression", topic: "3.4",
    questionType: "scenario", difficulty: "hard",
    question: "A blogger checks two sources, both wrong, and reports that a senator skipped a key vote. The senator had missed a different vote. If the senator sues, she will most likely",
    options: ["lose, because an honest mistake made after some checking is not actual malice", "win, because the statement was false and damaged her reputation", "win, because bloggers are not members of the press", "lose, because senators are barred from suing for libel"],
    answer: "lose, because an honest mistake made after some checking is not actual malice",
    explanation: "The blogger neither knew the claim was false nor recklessly ignored the truth. Ordinary citizens have the same press freedom as journalists, and officials can sue - they just face a high bar."
  },
  {
    id: "gl075", term: "libel", area: "expression", topic: "3.4",
    questionType: "application", difficulty: "medium",
    question: "After Sullivan, the Court widened the \"public figure\" category. Who would most likely face the same demanding libel standard as a public official?",
    options: ["a star professional athlete", "a private citizen targeted by a neighbor's false rumor", "a cashier mentioned once in a local news story", "a juror in a closed criminal trial"],
    answer: "a star professional athlete",
    explanation: "AMSCO lists celebrities such as movie stars, top athletes and business leaders. People who seek public attention can answer back through the press, so they get less protection from criticism than private citizens do."
  },
  {
    id: "gl076", term: "Near v. Minnesota", area: "expression", topic: "3.4",
    questionType: "case", difficulty: "medium",
    question: "Near v. Minnesota (1931) struck down Minnesota's so-called gag law, which",
    options: ["let a judge shut down newspapers deemed malicious, scandalous, or defamatory", "made it a crime to print anti-war leaflets during World War I", "required newspapers to print the government's reply to any criticism of public officials", "taxed newspapers according to how many copies they sold"],
    answer: "let a judge shut down newspapers deemed malicious, scandalous, or defamatory",
    explanation: "J.M. Near's paper was bigoted, yet the ACLU and publisher Robert McCormick backed him on anti-censorship principle. The ruling first declared that government has no general power of prior restraint."
  },
  {
    id: "gl077", term: "freedom of the press", area: "expression", topic: "3.4",
    questionType: "application", difficulty: "medium",
    question: "A retiree publishes an online newsletter criticizing the city council. Compared with a professional journalist, she has",
    options: ["the same freedom of the press", "less protection because no news outlet employs her", "free speech rights but no free press rights", "more protection because private citizens cannot be sued for libel"],
    answer: "the same freedom of the press",
    explanation: "AMSCO is explicit: an average citizen has as much right to a free press as a professional journalist, and the Court rarely distinguishes speech from press. Anyone can be sued for libel, though."
  },
  {
    id: "gl078", term: "prior restraint", area: "expression", topic: "3.4",
    questionType: "document", difficulty: "hard",
    question: "The Pentagon Papers ruling quoted an earlier case: \"Any system of prior restraints of expression comes to this Court bearing a heavy presumption against its constitutional validity.\" For a government trying to block publication, this means",
    options: ["the government must carry a heavy burden to justify the restraint", "the newspaper must prove the material is harmless before printing", "a restraint is automatically valid once national security is invoked", "courts must defer to the executive whenever information is classified"],
    answer: "the government must carry a heavy burden to justify the restraint",
    explanation: "The presumption runs against the censor. The lower courts found the government had not met its burden, and the Court agreed. A \"hasty cry of national security\" was not enough."
  },
  {
    id: "gl079", term: "New York Times Co. v. United States", area: "expression", topic: "3.4",
    questionType: "document", difficulty: "hard",
    question: "Concurring in the Pentagon Papers case, Justice Brennan said that in national defense and foreign affairs the only effective check on the executive \"may lie in an enlightened citizenry.\" Why did that make a free press especially vital there?",
    options: ["Those areas face few other checks, so an informed public depends on the press", "Congress is barred from overseeing military and diplomatic decisions", "Courts have no jurisdiction over cases touching foreign policy", "Classified material becomes public automatically once a war ends"],
    answer: "Those areas face few other checks, so an informed public depends on the press",
    explanation: "Brennan saw the executive's defense and foreign-policy power as relatively unchecked. Where other restraints are weak, a press that is \"alert, aware, and free\" is what lets citizens judge the government."
  },
  {
    id: "gl080", term: "New York Times Co. v. Sullivan", area: "expression", topic: "3.4",
    questionType: "compare", difficulty: "medium",
    question: "Which pairing correctly matches each press case to its main principle?",
    options: ["NYT v. Sullivan: the libel standard for officials. NYT v. United States: no prior restraint", "NYT v. Sullivan: no prior restraint. NYT v. United States: the libel standard for officials", "NYT v. Sullivan: no prior restraint. Near v. Minnesota: the libel standard for officials", "NYT v. United States: the libel standard for officials. Near v. Minnesota: obscenity"],
    answer: "NYT v. Sullivan: the libel standard for officials. NYT v. United States: no prior restraint",
    explanation: "Two Times cases, two different problems. Sullivan (1964) is about punishment after publication for falsehood; the Pentagon Papers case (1971) is about stopping publication beforehand, building on Near (1931)."
  },

  // =====================================================================
  // TOPIC 3.5 - THE RIGHT TO BEAR ARMS
  // =====================================================================
  {
    id: "gl081", term: "Second Amendment", area: "safety", topic: "3.5",
    questionType: "document", difficulty: "easy",
    question: "The Second Amendment opens with a clause about",
    options: ["a well-regulated militia being necessary to the security of a free state", "the right of the people to be secure in their persons, houses, papers, and effects", "excessive bail and cruel and unusual punishments", "Congress making no law respecting an establishment of religion"],
    answer: "a well-regulated militia being necessary to the security of a free state",
    explanation: "The full text joins that militia clause to \"the right of the people to keep and bear arms, shall not be infringed.\" How the two halves relate is the whole modern debate. The other options open the Fourth, Eighth and First Amendments."
  },
  {
    id: "gl082", term: "Second Amendment", area: "safety", topic: "3.5",
    questionType: "compare", difficulty: "medium",
    question: "Which reading of the Second Amendment do gun-control advocates in AMSCO's account tend to emphasize?",
    options: ["It protected the states' ability to keep well-regulated militias", "It guarantees every citizen an unlimited right to own any firearm, anywhere", "It covers only the kinds of weapons that existed in 1791", "It was written so Congress could disarm the state militias"],
    answer: "It protected the states' ability to keep well-regulated militias",
    explanation: "Control advocates stress that militias were \"well regulated\" - trained, drilled and limited in their weapons - and that the founders feared a federal army overpowering the states. Gun-rights advocates read \"the people\" as individuals, though not even Heller called the right unlimited."
  },
  {
    id: "gl083", term: "Second Amendment", area: "safety", topic: "3.5",
    questionType: "process", difficulty: "medium",
    question: "At the 1787 Constitutional Convention, debate about weapons centered mainly on",
    options: ["whether to rely on a national standing army or on state militias", "whether individuals had a right to own guns for hunting and personal self-defense", "whether cities could ban firing guns inside their limits", "whether Congress could tax the manufacture of firearms"],
    answer: "whether to rely on a national standing army or on state militias",
    explanation: "Fresh from Shays' Rebellion, delegates argued over a professional army versus state militias as a check on a runaway central government. Historian Michael Waldman notes private gun ownership \"simply did not come up.\""
  },
  {
    id: "gl084", term: "Second Amendment", area: "safety", topic: "3.5",
    questionType: "application", difficulty: "hard",
    question: "What does AMSCO's account of gun laws in the founding-era states suggest?",
    options: ["Gun ownership was common, and so were rules on storage, firing, and who could own guns", "States almost never regulated firearms until after the Civil War", "Most of the thirteen state constitutions guaranteed an individual right to armed self-defense", "The national government set uniform gun rules that every state followed"],
    answer: "Gun ownership was common, and so were rules on storage, firing, and who could own guns",
    explanation: "States designated where powder was stored, barred firing within city limits and kept guns from people deemed dangerous. Only Pennsylvania's constitution protected arms for individual self-defense; four states tied the right to militia service."
  },
  {
    id: "gl085", term: "National Firearms Act", area: "safety", topic: "3.5",
    questionType: "definition", difficulty: "easy",
    question: "Passed in 1934, in an era of bootleggers and gangsters, the National Firearms Act",
    options: ["required registration of certain weapons and taxed their sale and manufacture", "created a five-day waiting period so dealers could run background checks on handgun buyers", "ended mail-order sales of all firearms and ammunition", "struck down the District of Columbia's handgun restrictions"],
    answer: "required registration of certain weapons and taxed their sale and manufacture",
    explanation: "It was the first national statute on gun possession, aimed at high-risk weapons like sawed-off shotguns and machine guns, and the Court upheld it. The waiting period is the Brady Act, mail order is the Gun Control Act, and the D.C. case is Heller."
  },
  {
    id: "gl086", term: "Gun Control Act", area: "safety", topic: "3.5",
    questionType: "definition", difficulty: "easy",
    question: "Which law, passed after the urban unrest and assassinations of the 1960s, banned gun sales to felons and ended mail-order firearm sales?",
    options: ["the Gun Control Act of 1968", "the National Firearms Act of 1934", "the Brady Handgun Violence Prevention Act of 1993", "the Civil Rights Act of 1866"],
    answer: "the Gun Control Act of 1968",
    explanation: "The 1968 act also barred sales to fugitives, illegal drug users and people dishonorably discharged. AMSCO notes it ended up punishing illegal use more than preventing purchases. The 1866 act appears in McDonald, protecting freedmen's right to bear arms."
  },
  {
    id: "gl087", term: "Brady Handgun Violence Prevention Act", area: "safety", topic: "3.5",
    questionType: "process", difficulty: "medium",
    question: "What was the core mechanism of the Brady Handgun Violence Prevention Act of 1993?",
    options: ["a five-day wait on handgun purchases to allow a background check", "a ban on automatic machine guns and sawed-off shotguns", "a permanent federal registry listing every gun owner and every firearm in the nation", "a requirement that every state allow concealed carry"],
    answer: "a five-day wait on handgun purchases to allow a background check",
    explanation: "Named for Reagan's press secretary, wounded in the 1981 assassination attempt, the law gave time for a check and a cooling-off period. It expired in 1998 and was succeeded by the National Instant Criminal Background Check System."
  },
  {
    id: "gl088", term: "Brady Handgun Violence Prevention Act", area: "safety", topic: "3.5",
    questionType: "application", difficulty: "hard",
    question: "Critics point to gaps in the federal background check system. Which purchase does AMSCO identify as one that could skip a check?",
    options: ["buying from a private collector at a gun show", "buying a handgun from a licensed dealer after the waiting period", "buying a rifle from a licensed dealer with valid identification", "ordering a handgun by mail from a licensed dealer"],
    answer: "buying from a private collector at a gun show",
    explanation: "Private sales at gun shows and some Internet sales could avoid a check, and the database lacked many domestic violence and mental health records. Licensed dealers run checks, and mail-order sales had been banned since 1968."
  },
  {
    id: "gl089", term: "District of Columbia v. Heller", area: "safety", topic: "3.5",
    questionType: "case", difficulty: "easy",
    question: "District of Columbia v. Heller (2008) was the first ruling to hold that the Second Amendment",
    options: ["protects an individual's right to own a gun, unrelated to militia service", "applies to state and city governments", "allows any gun regulation that a state or city legislature considers reasonable", "protects only members of organized state militias"],
    answer: "protects an individual's right to own a gun, unrelated to militia service",
    explanation: "Heller struck down D.C.'s restrictions on keeping a usable handgun at home, 5 to 4. Applying the right to states came two years later in McDonald v. Chicago."
  },
  {
    id: "gl090", term: "District of Columbia v. Heller", area: "safety", topic: "3.5",
    questionType: "document", difficulty: "medium",
    question: "Justice Scalia wrote in Heller that the right to bear arms \"was not unlimited, just as the First Amendment's right to speech is not.\" What did that comparison signal?",
    options: ["Some gun regulations can still be constitutional", "Gun ownership deserves more protection than speech", "Gun laws will be judged by the clear and present danger test", "Owning a handgun is a form of symbolic speech"],
    answer: "Some gun regulations can still be constitutional",
    explanation: "Speech is protected yet can be limited for libel, obscenity or incitement; Scalia was saying arms work the same way. Even the U.S. solicitor general had urged the Court to leave room for reasonable limits."
  },

  // =====================================================================
  // TOPIC 3.6 - BALANCING INDIVIDUAL FREEDOM WITH PUBLIC ORDER AND SAFETY
  // =====================================================================
  {
    id: "gl091", term: "Eighth Amendment", area: "safety", topic: "3.6",
    questionType: "definition", difficulty: "easy",
    question: "The Eighth Amendment prohibits",
    options: ["excessive bail and cruel and unusual punishments", "unreasonable searches and seizures", "compelling people to testify against themselves in criminal cases", "denying the accused a speedy, public trial"],
    answer: "excessive bail and cruel and unusual punishments",
    explanation: "Both phrases came from the English Bill of Rights, written after kings jailed enemies without bail and mistreated them. Searches are the Fourth Amendment, self-incrimination the Fifth, and a speedy trial the Sixth."
  },
  {
    id: "gl092", term: "Furman v. Georgia", area: "safety", topic: "3.6",
    questionType: "case", difficulty: "medium",
    question: "Furman v. Georgia (1972) put the death penalty on hold nationwide. Which concern was central to the decision?",
    options: ["the random and unequal way death sentences were handed out", "the Fifth Amendment's flat ban on depriving anyone of life", "the framers' clear statement that executions were cruel", "evidence that every other nation had abolished executions"],
    answer: "the random and unequal way death sentences were handed out",
    explanation: "Only two justices called the penalty itself unconstitutional. The decision turned on arbitrariness, and some justices noted its weight fell on the poor and racial minorities. The Fifth Amendment actually assumes people can be deprived of life with due process."
  },
  {
    id: "gl093", term: "Gregg v. Georgia", area: "safety", topic: "3.6",
    questionType: "process", difficulty: "medium",
    question: "After Gregg v. Georgia (1976), states could carry out death sentences again, but only if",
    options: ["sentencing weighed each case's circumstances instead of making death mandatory", "the governor personally approved every death sentence", "the crime was treason, espionage or another offense against the federal government itself", "the execution was carried out by lethal injection"],
    answer: "sentencing weighed each case's circumstances instead of making death mandatory",
    explanation: "States restructured their sentencing, and no state may make death automatic. Lethal injection is the most common method, but it was never the condition for reinstatement."
  },
  {
    id: "gl094", term: "Gregg v. Georgia", area: "safety", topic: "3.6",
    questionType: "scenario", difficulty: "hard",
    question: "After a jury convicts a man of murder, his sister testifies about his childhood and character before the sentence is decided. In which stage does this happen, and why does it matter?",
    options: ["the penalty phase, where circumstances and character can affect whether death is imposed", "the appeal, where new witnesses may overturn the guilty verdict", "the arraignment, where the charges are formally read in court", "jury selection, before trial, where the defense screens out jurors who strongly favor execution"],
    answer: "the penalty phase, where circumstances and character can affect whether death is imposed",
    explanation: "Since Gregg, a capital trial has a second phase after the guilty verdict. Character witnesses may testify for the defendant there, because a careful look at the circumstances must come before a death sentence."
  },
  {
    id: "gl095", term: "Eighth Amendment", area: "safety", topic: "3.6",
    questionType: "case", difficulty: "easy",
    question: "Which group has the Court ruled cannot be sentenced to death for murder?",
    options: ["defendants under 18 at the time of the crime", "defendants convicted by a jury rather than a judge", "defendants who confessed to the police", "defendants whose victims were not public officials"],
    answer: "defendants under 18 at the time of the crime",
    explanation: "In recent years the Court has barred the death penalty for juvenile offenders and for mentally handicapped defendants, reading \"cruel and unusual\" in light of who is being punished."
  },
  {
    id: "gl096", term: "Eighth Amendment", area: "safety", topic: "3.6",
    questionType: "application", difficulty: "hard",
    question: "AMSCO's table of murder rates from 1990 to 2018 shows states with the death penalty had higher rates than states without it in every year listed. What can that data alone support?",
    options: ["It gives no support to deterrence, though it cannot prove the penalty has no effect", "It proves the death penalty causes higher murder rates", "It proves the death penalty deters would-be murderers", "It shows murder rates climbed steadily in both groups of states"],
    answer: "It gives no support to deterrence, though it cannot prove the penalty has no effect",
    explanation: "A correlation alone cannot prove causation either way: many other differences separate those states. And rates fell in both groups over the period, from about 9 per 100,000 to roughly 4 or 5."
  },
  {
    id: "gl097", term: "writs of assistance", area: "safety", topic: "3.6",
    questionType: "definition", difficulty: "easy",
    question: "Writs of assistance were",
    options: ["broad British search warrants used to hunt for smuggled goods", "British orders forcing colonists to house and feed soldiers in their homes", "royal pardons granted to loyal colonial merchants", "colonial court orders guaranteeing trial by jury"],
    answer: "broad British search warrants used to hunt for smuggled goods",
    explanation: "They let soldiers search any vessel, warehouse, home or wagon. The memory of them is why the Fourth Amendment demands warrants that particularly describe the place to be searched."
  },
  {
    id: "gl098", term: "Fourth Amendment", area: "safety", topic: "3.6",
    questionType: "document", difficulty: "medium",
    question: "Under the Fourth Amendment's text, a valid search warrant must",
    options: ["rest on probable cause under oath and particularly describe what is searched", "be signed by the president or by a cabinet officer", "let officers search any property the suspect owns", "issue only after the suspect has been formally charged with a crime by a grand jury"],
    answer: "rest on probable cause under oath and particularly describe what is searched",
    explanation: "\"No warrants shall issue but upon probable cause, supported by oath or affirmation, and particularly describing the place to be searched.\" A warrant to search everything the suspect owns is the writ of assistance the amendment was written to forbid."
  },
  {
    id: "gl099", term: "probable cause", area: "safety", topic: "3.6",
    questionType: "definition", difficulty: "easy",
    question: "Probable cause, the standard for a warrant or an arrest, means",
    options: ["a reasonable amount of suspicion that a crime has been committed", "proof beyond a reasonable doubt that the person committed the crime", "an officer's hunch based on how someone looks", "a signed confession from the suspect"],
    answer: "a reasonable amount of suspicion that a crime has been committed",
    explanation: "It sits well below proof of guilt, which is for trial, and well above a hunch. It is needed both to search a home with a warrant and to seize a person by arresting them."
  },
  {
    id: "gl100", term: "Fourth Amendment", area: "safety", topic: "3.6",
    questionType: "application", difficulty: "medium",
    question: "In which situation may police act without a warrant?",
    options: ["an officer sees illegal drugs in plain view on a car seat during a traffic stop", "an officer walks a drug-sniffing dog onto a home's front porch to check for marijuana", "an officer scrolls through an arrested person's cell phone", "officers wiretap a suspect's phone line"],
    answer: "an officer sees illegal drugs in plain view on a car seat during a traffic stop",
    explanation: "Plain view is a recognized exception. AMSCO lists the other three as situations where the Court has said a warrant is required: wiretaps, drug dogs on a porch, and looking into a suspect's cell phone."
  },
  {
    id: "gl101", term: "Fourth Amendment", area: "safety", topic: "3.6",
    questionType: "scenario", difficulty: "medium",
    question: "A homeowner tells an officer at the door, \"Sure, come in and look around.\" The officer finds stolen goods. Was a warrant required?",
    options: ["No, because consent waives the warrant requirement", "Yes, because a home can never be searched without a warrant", "No, because opening the door gives up all expectation of privacy", "Yes, because consent counts only if it is given in writing"],
    answer: "No, because consent waives the warrant requirement",
    explanation: "Someone who agrees to a search waives the protection. The third option reaches the same answer for a bad reason: simply opening the door gives up nothing."
  },
  {
    id: "gl102", term: "Fourth Amendment", area: "safety", topic: "3.6",
    questionType: "compare", difficulty: "hard",
    question: "AMSCO says that as the likelihood of danger or harm rises, the threshold for limiting government search and seizure",
    options: ["falls, which is why searches at airports and borders need no warrant", "rises, so more dangerous situations require more warrants and more judicial review", "stays fixed, because the amendment's text never changes", "shifts from the courts to Congress during emergencies"],
    answer: "falls, which is why searches at airports and borders need no warrant",
    explanation: "When the risk to the public grows, government gets more room to search. Airports and borders allow virtually limitless searches; a home, where danger to others is usually lower, gets the strongest protection."
  },
  {
    id: "gl103", term: "metadata", area: "safety", topic: "3.6",
    questionType: "definition", difficulty: "easy",
    question: "The phone metadata the NSA collected includes",
    options: ["who called whom, when, and for how long", "recordings of what was said on each call", "the text of the callers' emails and messages", "photographs stored on the callers' phones"],
    answer: "who called whom, when, and for how long",
    explanation: "Metadata is everything about a call except the conversation. Even so, critics note it can reveal whether someone called a crisis hotline, a bookie or a political group."
  },
  {
    id: "gl104", term: "metadata", area: "safety", topic: "3.6",
    questionType: "application", difficulty: "hard",
    question: "Why did the government argue it could obtain phone metadata without warrants after 9/11?",
    options: ["Phone companies, as third parties, chose to hand over their records", "The records were stored overseas, outside the Fourth Amendment's reach", "The USA FREEDOM Act authorized warrantless access", "Customers give up all privacy rights when they sign a phone contract"],
    answer: "Phone companies, as third parties, chose to hand over their records",
    explanation: "The government compared it to police asking a suspect's boss or friend about him. The USA FREEDOM Act did the opposite of the third option: it required a warrant to examine the data."
  },
  {
    id: "gl105", term: "Guantanamo Bay detention", area: "safety", topic: "3.6",
    questionType: "scenario", difficulty: "medium",
    question: "Why did officials place the post-9/11 detention camp at the U.S. naval base in Guantanamo Bay, Cuba?",
    options: ["Officials believed holding suspects abroad loosened constitutional limits", "Cuba had agreed to try the detainees in its own national courts under Cuban law", "Treaties require that prisoners of war be held on islands", "The Supreme Court had approved the location in advance"],
    answer: "Officials believed holding suspects abroad loosened constitutional limits",
    explanation: "The base also offered security, little media contact and less access to lawyers. Whether someone who never entered the country had Bill of Rights protections was the open question - and in Rasul v. Bush the Court said the base was covered."
  },
  {
    id: "gl106", term: "Eighth Amendment", area: "safety", topic: "3.6",
    questionType: "document", difficulty: "hard",
    question: "After a 2002 Justice Department memo narrowly defined torture, critics objected to the waterboarding of terror suspects. Which protections did civil libertarians say were being disregarded?",
    options: ["habeas corpus rights and the Eighth Amendment's ban on cruel and unusual punishment", "the Fourth Amendment's warrant requirement and its ban on unreasonable searches and seizures", "the Second Amendment's protection of self-defense", "the Tenth Amendment's reservation of powers to the states"],
    answer: "habeas corpus rights and the Eighth Amendment's ban on cruel and unusual punishment",
    explanation: "The memo defined torture as pain equivalent to organ failure or death, leaving room for harsh methods. The objections were about how detainees were held and treated, not how evidence was gathered. President Obama later reversed many of these policies."
  },
  {
    id: "gl107", term: "Second Amendment", area: "safety", topic: "3.6",
    questionType: "process", difficulty: "hard",
    question: "According to research AMSCO cites, what typically happens to state gun legislation after a mass shooting?",
    options: ["More bills are introduced, and what passes depends on which party controls the legislature", "Nearly every state tightens background checks within a year", "Congress passes a national standard that preempts state laws", "State courts strike down most new restrictions under Heller"],
    answer: "More bills are introduced, and what passes depends on which party controls the legislature",
    explanation: "Republican-dominated states passed 75 percent more permissive laws, while Democrat-controlled ones showed no significant rise in restrictions. National law, AMSCO notes, rarely changes at all."
  },
  {
    id: "gl108", term: "writs of assistance", area: "safety", topic: "3.6",
    questionType: "compare", difficulty: "hard",
    question: "Which modern practice raises the concern most similar to the one colonial writs of assistance raised?",
    options: ["collecting phone records in bulk without suspecting any particular person", "an officer seizing drugs in plain view during a traffic stop", "a judge issuing a warrant to search one named apartment", "a principal searching one student's purse after a classmate reports seeing her smoking"],
    answer: "collecting phone records in bulk without suspecting any particular person",
    explanation: "The writs' sin was breadth: search anything, anywhere, without particular suspicion. Bulk collection shares that feature. The other three are targeted at one place or person, which is what the Fourth Amendment asks for."
  },

  // =====================================================================
  // TOPIC 3.7 - SELECTIVE INCORPORATION
  // =====================================================================
  {
    id: "gl109", term: "selective incorporation", area: "dueprocess", topic: "3.7",
    questionType: "definition", difficulty: "easy",
    question: "Selective incorporation is",
    options: ["applying Bill of Rights protections to the states case by case", "applying the whole Bill of Rights to the states at once in 1868", "reserving all unlisted powers to the states or the people", "Congress adding new rights to the Constitution by statute"],
    answer: "applying Bill of Rights protections to the states case by case",
    explanation: "\"Selective\" because the Court picks out provisions one at a time; \"incorporation\" because it folds them into the Fourteenth Amendment's due process clause. The amendment did not apply everything at once - that took landmark cases over a century."
  },
  {
    id: "gl110", term: "Fourteenth Amendment", area: "dueprocess", topic: "3.7",
    questionType: "document", difficulty: "easy",
    question: "Through which clause of the Fourteenth Amendment has the Court applied the Bill of Rights to the states?",
    options: ["the due process clause", "the citizenship clause", "the equal protection clause", "the necessary and proper clause"],
    answer: "the due process clause",
    explanation: "\"No state shall deprive any person of life, liberty, or property, without due process of law.\" The Court reads \"liberty\" there to include most Bill of Rights freedoms. The necessary and proper clause is in Article I, not the Fourteenth Amendment."
  },
  {
    id: "gl111", term: "due process", area: "dueprocess", topic: "3.7",
    questionType: "definition", difficulty: "medium",
    question: "AMSCO describes due process as",
    options: ["fundamental fairness that keeps government from arbitrarily taking life, liberty, or property", "the right of each state to set its own criminal procedures", "a guarantee that the accused will be acquitted unless guilt is certain", "Congress's power to review decisions made by state courts"],
    answer: "fundamental fairness that keeps government from arbitrarily taking life, liberty, or property",
    explanation: "Due process does not stop government from ever taking life, liberty or property; it requires that government do so only for legal cause and in a fair, prescribed way, avoiding mistaken or abusive deprivations."
  },
  {
    id: "gl112", term: "Fourteenth Amendment", area: "dueprocess", topic: "3.7",
    questionType: "process", difficulty: "medium",
    question: "Why did House Republicans draft the Fourteenth Amendment after the Civil War?",
    options: ["To make Southern states respect the basic rights of freed African Americans", "To give Congress the power to levy a national income tax", "To list, one by one, each Bill of Rights guarantee the states must now follow", "To abolish slavery in the states that had seceded"],
    answer: "To make Southern states respect the basic rights of freed African Americans",
    explanation: "Union leaders doubted the South would give a Black defendant a fair jury or the right not to testify. The amendment guaranteed due process against the states in general terms; it never listed rights, which is why incorporation went case by case. Slavery ended with the Thirteenth."
  },
  {
    id: "gl113", term: "Gitlow v. New York", area: "dueprocess", topic: "3.7",
    questionType: "case", difficulty: "hard",
    question: "Benjamin Gitlow lost his case in 1925, yet Gitlow v. New York is a landmark of incorporation. Why?",
    options: ["The Court assumed free speech and press are liberties the states may not impair", "The Court struck down New York's criminal anarchy law", "The Court applied the entire Bill of Rights to the states", "The Court barred the ACLU from appealing state convictions"],
    answer: "The Court assumed free speech and press are liberties the states may not impair",
    explanation: "The Court upheld Gitlow's conviction as a threat to public safety but put the states on notice that the due process clause protects speech and press. The warning took effect in Near v. Minnesota six years later."
  },
  {
    id: "gl114", term: "just compensation clause", area: "dueprocess", topic: "3.7",
    questionType: "case", difficulty: "easy",
    question: "In the first incorporation case (1897), a railroad sued Chicago for building a street across its tracks. Which protection did the Court apply to the states?",
    options: ["just compensation for private property taken for public use", "the right to remain silent during police questioning after an arrest", "protection against unreasonable searches of property", "the right to a lawyer in a civil lawsuit"],
    answer: "just compensation for private property taken for public use",
    explanation: "The just compensation clause of the Fifth Amendment became the first incorporated right, decades before any First Amendment freedom. Chicago had to pay the railroad for the land it used."
  },
  {
    id: "gl115", term: "just compensation clause", area: "dueprocess", topic: "3.7",
    questionType: "application", difficulty: "medium",
    question: "A county takes part of a family's farm to widen a highway. What must it do, and why does that rule bind a county?",
    options: ["Pay just compensation, a Fifth Amendment rule applied to states through the Fourteenth", "Nothing, because the Bill of Rights limits only the federal government", "Pay just compensation, but only when federal highway money is paying for the widening project", "Hold a jury trial before taking any of the land"],
    answer: "Pay just compensation, a Fifth Amendment rule applied to states through the Fourteenth",
    explanation: "Before 1897, Barron v. Baltimore would have supported the second option. Incorporation changed that: local governments are political subdivisions of the state and must pay when they take property."
  },
  {
    id: "gl116", term: "McDonald v. Chicago", area: "dueprocess", topic: "3.7",
    questionType: "case", difficulty: "easy",
    question: "McDonald v. Chicago (2010) held that",
    options: ["the Second Amendment applies to state and local governments", "the Second Amendment protects an individual right in Washington, D.C.", "cities may ban handguns when their crime rates are high", "the Second Amendment protects only militia members"],
    answer: "the Second Amendment applies to state and local governments",
    explanation: "Otis McDonald argued Chicago's refusal to register handguns left him defenseless in a dangerous neighborhood. The 5:4 ruling extended Heller, which had dealt only with the federal district, to the states."
  },
  {
    id: "gl117", term: "McDonald v. Chicago", area: "dueprocess", topic: "3.7",
    questionType: "document", difficulty: "hard",
    question: "Justice Alito's McDonald opinion pointed to Southern efforts after the Civil War to disarm African Americans. Why was that history relevant?",
    options: ["It showed the Fourteenth Amendment's framers counted bearing arms as a fundamental right", "It showed the Second Amendment was written only for militias", "It proved Chicago's handgun ban was racially motivated", "It showed that Congress, not the courts, should set gun policy"],
    answer: "It showed the Fourteenth Amendment's framers counted bearing arms as a fundamental right",
    explanation: "Congress first passed the Freedmen's Bureau Act and Civil Rights Act of 1866 to protect that right, then judged them insufficient and approved the Fourteenth Amendment. If its framers saw the right as fundamental, it belongs among the liberties states must respect."
  },
  {
    id: "gl118", term: "Timbs v. Indiana", area: "dueprocess", topic: "3.7",
    questionType: "case", difficulty: "medium",
    question: "In Timbs v. Indiana (2019), the Court held that a state's seizure of a convicted drug dealer's vehicle violated the Eighth Amendment's ban on",
    options: ["excessive fines", "cruel and unusual punishment", "excessive bail", "unreasonable seizures"],
    answer: "excessive fines",
    explanation: "The Eighth Amendment bars excessive bail, excessive fines and cruel and unusual punishments; Timbs incorporated the fines clause. \"Unreasonable seizures\" is tempting because of the word seizure, but that is the Fourth Amendment."
  },
  {
    id: "gl119", term: "selective incorporation", area: "dueprocess", topic: "3.7",
    questionType: "compare", difficulty: "medium",
    question: "Which statement about incorporation today is accurate according to AMSCO?",
    options: ["Nearly all, but not every, Bill of Rights protection now binds the states", "Every provision of the Bill of Rights has been incorporated", "Only First Amendment freedoms have been applied to the states", "The Fourteenth Amendment's text completed incorporation all at once in 1868"],
    answer: "Nearly all, but not every, Bill of Rights protection now binds the states",
    explanation: "Case after case has added speech, religion, impartial juries, protection against self-incrimination and more, but a few rights still bind only the federal government. That leftover is what makes the process selective."
  },
  {
    id: "gl120", term: "selective incorporation", area: "dueprocess", topic: "3.7",
    questionType: "document", difficulty: "hard",
    question: "Madison's draft of the Bill of Rights included one amendment that directly limited the states. What did it protect?",
    options: ["the equal rights of conscience and freedom of speech and press", "the right of the people to keep and bear arms in a well-regulated militia", "just compensation for private property taken for public use", "trial by an impartial jury in all criminal cases"],
    answer: "the equal rights of conscience and freedom of speech and press",
    explanation: "\"No state shall infringe on the equal rights of conscience, nor the freedom of speech, or of the press.\" It did not survive, but it shows the founders thought states too should respect these freedoms - fitting, AMSCO says, that the Court incorporated them early."
  },

  // =====================================================================
  // TOPIC 3.8 - DUE PROCESS AND THE RIGHTS OF THE ACCUSED
  // =====================================================================
  {
    id: "gl121", term: "procedural due process", area: "dueprocess", topic: "3.8",
    questionType: "definition", difficulty: "easy",
    question: "Procedural due process is concerned with",
    options: ["how a law is carried out, and whether the procedures were fair", "whether the purpose of a law itself violates a basic right to life, liberty, or property", "whether a particular right has been applied to the states", "how Congress drafts and amends a bill before passage"],
    answer: "how a law is carried out, and whether the procedures were fair",
    explanation: "Procedural due process asks about the manner: a fair trial, an accurate appraisal, a chance to be heard. Whether the point of the law violates a basic right is substantive due process, a separate idea covered in Topic 3.9."
  },
  {
    id: "gl122", term: "procedural due process", area: "dueprocess", topic: "3.8",
    questionType: "application", difficulty: "medium",
    question: "Which question raises a procedural due process issue?",
    options: ["Were suspended students given a chance to tell their side of the story?", "Does a law forbidding a private personal choice violate a basic liberty protected by the Constitution?", "Should a given Bill of Rights protection apply to the states?", "Is a federal statute within Congress's commerce power?"],
    answer: "Were suspended students given a chance to tell their side of the story?",
    explanation: "This is one of AMSCO's own examples: the question is how the school acted, not whether its rule was valid. Questioning what a law forbids is substantive; the incorporation and commerce questions are different issues entirely."
  },
  {
    id: "gl123", term: "procedural due process", area: "dueprocess", topic: "3.8",
    questionType: "document", difficulty: "medium",
    question: "An early Supreme Court opinion said, \"The fundamental requisite of due process of law is the opportunity to be heard.\" Which practice best honors that principle?",
    options: ["A zoning board lets a homeowner contest its appraisal before taking the house", "A legislature passes a law punishing a named person for a crime without any trial", "A judge rules after reading only the prosecution's brief", "A city cuts off a family's water service without any notice"],
    answer: "A zoning board lets a homeowner contest its appraisal before taking the house",
    explanation: "Government may take property, but only in a prescribed, fair way that lets the person respond. The other three deny any hearing; a law punishing a named person without trial is the bill of attainder the original Constitution already forbids."
  },
  {
    id: "gl124", term: "exclusionary rule", area: "dueprocess", topic: "3.8",
    questionType: "definition", difficulty: "easy",
    question: "The exclusionary rule says that",
    options: ["evidence gathered in violation of the Fourth Amendment can be kept out of trial", "suspects must be told of their right to remain silent", "certain people may be excluded from buying firearms", "reporters may be excluded from criminal trials involving national security or classified evidence"],
    answer: "evidence gathered in violation of the Fourth Amendment can be kept out of trial",
    explanation: "The rule protects people from aggressive police by taking away the payoff of an illegal search. The right-to-silence warning is Miranda, and gun-purchase bans come from the Gun Control Act."
  },
  {
    id: "gl125", term: "Mapp v. Ohio", area: "dueprocess", topic: "3.8",
    questionType: "process", difficulty: "medium",
    question: "Which correctly traces the exclusionary rule?",
    options: ["Weeks (1914) applied it to federal courts; Mapp (1961) extended it to the states", "Mapp (1961) applied it to federal courts; Weeks (1914) extended it to the states", "Weeks (1914) applied it to the states; Mapp (1961) applied it to schools", "Weeks (1914) and Mapp (1961) both applied it only to the federal courts"],
    answer: "Weeks (1914) applied it to federal courts; Mapp (1961) extended it to the states",
    explanation: "Weeks protected citizens from federal police; Mapp became the incorporation case for the Fourth Amendment, so state courts must exclude unlawfully seized evidence too. The dates alone rule out the reversed order."
  },
  {
    id: "gl126", term: "Mapp v. Ohio", area: "dueprocess", topic: "3.8",
    questionType: "case", difficulty: "easy",
    question: "What was the constitutional problem with the evidence used to convict Dollree Mapp?",
    options: ["Police found it during an unlawful search of her home", "She confessed without being told of her rights", "She was tried and convicted without a lawyer to represent her", "The jury was chosen from outside her county"],
    answer: "Police found it during an unlawful search of her home",
    explanation: "Officers broke into her Cleveland house looking for a fugitive and gambling equipment, found neither, and seized obscene books instead. The Court ruled they never should have found it. The other options describe Miranda and Gideon."
  },
  {
    id: "gl127", term: "exclusionary rule", area: "dueprocess", topic: "3.8",
    questionType: "document", difficulty: "medium",
    question: "Justice Felix Frankfurter called illegally obtained evidence \"fruit of the poisonous tree.\" What does the metaphor mean?",
    options: ["Evidence that grows out of an illegal search is tainted along with it", "Evidence from paid informants is less reliable than physical evidence found at the scene", "One biased juror is enough to overturn a conviction", "Police misconduct should be punished separately from the trial"],
    answer: "Evidence that grows out of an illegal search is tainted along with it",
    explanation: "The tree is the unconstitutional search; the fruit is whatever it produces. Because the source is poisoned, the justice system rejects what grows from it."
  },
  {
    id: "gl128", term: "good faith exception", area: "dueprocess", topic: "3.8",
    questionType: "scenario", difficulty: "hard",
    question: "Police search a home under a warrant a judge signed. Later, the warrant turns out to have been issued in error. The evidence will most likely be",
    options: ["admitted under the good faith exception", "excluded, because any defect in a warrant taints the search", "admitted under the public safety exception", "admitted under the inevitable discovery exception"],
    answer: "admitted under the good faith exception",
    explanation: "Officers who honestly rely on a court-issued warrant have not abused the Fourth Amendment, so the Burger Court let such evidence in. Inevitable discovery covers evidence a later lawful search would have found; public safety concerns Miranda warnings."
  },
  {
    id: "gl129", term: "inevitable discovery exception", area: "dueprocess", topic: "3.8",
    questionType: "compare", difficulty: "hard",
    question: "How do the inevitable discovery and good faith exceptions to the exclusionary rule differ?",
    options: ["Inevitable discovery: a later lawful search would have found it. Good faith: police relied on a warrant later found defective", "Inevitable discovery: police relied on a warrant later found defective. Good faith: a later lawful search would have found it", "Inevitable discovery covers confessions; good faith covers physical evidence", "Both let police search without a warrant whenever they suspect a crime"],
    answer: "Inevitable discovery: a later lawful search would have found it. Good faith: police relied on a warrant later found defective",
    explanation: "Both came from the Burger Court and both admit evidence despite a flawed search, but for different reasons: one because the evidence was coming anyway, the other because officers honestly followed the law as they understood it."
  },
  {
    id: "gl130", term: "New Jersey v. TLO", area: "dueprocess", topic: "3.8",
    questionType: "case", difficulty: "medium",
    question: "New Jersey v. TLO (1985) set what standard for searches by school officials?",
    options: ["reasonable suspicion, a lower bar than police need", "probable cause plus a warrant from a judge", "none, because students have no Fourth Amendment rights", "written consent from a parent before any search"],
    answer: "reasonable suspicion, a lower bar than police need",
    explanation: "Students keep a \"legitimate expectation of privacy,\" but it is weighed against the school's mission. The assistant principal who searched TLO's purse after a tip about smoking needed only reasonable suspicion, not probable cause."
  },
  {
    id: "gl131", term: "New Jersey v. TLO", area: "dueprocess", topic: "3.8",
    questionType: "scenario", difficulty: "hard",
    question: "A teacher sees a student slip something into her backpack, and two classmates report she is selling vape cartridges. The assistant principal searches the bag. Under TLO, the search is most likely",
    options: ["reasonable, because the official had specific grounds for suspicion", "unconstitutional, because the official had no warrant", "unconstitutional, because breaking a school rule can never justify searching a student's bag", "reasonable, because students give up all privacy at school"],
    answer: "reasonable, because the official had specific grounds for suspicion",
    explanation: "An eyewitness and two reports are reasonable suspicion, which is all TLO requires. The last option has the right result for the wrong reason: students keep a legitimate expectation of privacy; it is just weighed against the school's needs."
  },
  {
    id: "gl132", term: "New Jersey v. TLO", area: "dueprocess", topic: "3.8",
    questionType: "application", difficulty: "hard",
    question: "A student leaves his backpack on a school bus. Officials open it to identify the owner, recall a rumor about him, empty it, and find bullets. Why did Ohio's top court find the search reasonable?",
    options: ["Leaving the bag behind gave up much of his expectation of privacy", "Officials had full probable cause from the moment the driver found the bag", "School searches never require any level of suspicion", "The bus driver, not a school official, conducted the search"],
    answer: "Leaving the bag behind gave up much of his expectation of privacy",
    explanation: "The school also had a public duty to deal with unattended bags. AMSCO notes that a bag left briefly while its owner used the restroom would still carry a high expectation of privacy - abandonment is what changed things."
  },
  {
    id: "gl133", term: "search and seizure", area: "dueprocess", topic: "3.8",
    questionType: "case", difficulty: "medium",
    question: "The government argued that tracking a suspect's car with a GPS device was not even a search, since he drove on public streets. Why did the Court disagree?",
    options: ["Round-the-clock tracking invaded a reasonable expectation of privacy", "A car is treated exactly like a home under the Fourth Amendment", "Police may never follow a suspect's car without a warrant", "The USA FREEDOM Act forbids tracking any vehicle without the owner's written consent"],
    answer: "Round-the-clock tracking invaded a reasonable expectation of privacy",
    explanation: "Drivers know they may be seen, but few expect every movement to be logged for 24-hour cycles. So it was a search - one that might have been reasonable had police first obtained a warrant. Officers can still follow a car on the street."
  },
  {
    id: "gl134", term: "Riley v. California", area: "dueprocess", topic: "3.8",
    questionType: "case", difficulty: "medium",
    question: "Police arrested David Riley and, without a warrant, searched his phone, finding evidence of gang ties. What rule does AMSCO report the Court has set for such searches?",
    options: ["Police generally need a warrant to search an arrested person's phone", "Anything on an arrested person's phone may be searched immediately at the scene", "A phone may be searched without a warrant after any gun arrest", "Only metadata, not photos or videos, requires a warrant"],
    answer: "Police generally need a warrant to search an arrested person's phone",
    explanation: "AMSCO lists looking into the cell phone of a suspect \"or even an arrested defendant\" among the searches that need a warrant. An arrest lets police seize the phone, not freely read it."
  },
  {
    id: "gl135", term: "USA FREEDOM Act", area: "dueprocess", topic: "3.8",
    questionType: "definition", difficulty: "medium",
    question: "The USA FREEDOM Act of 2015 changed the government's access to phone metadata by",
    options: ["requiring the executive branch to get a warrant to examine it", "ordering phone companies to delete all stored metadata", "letting the NSA collect the contents of calls along with their metadata", "moving the program from the NSA to state police agencies"],
    answer: "requiring the executive branch to get a warrant to examine it",
    explanation: "Carriers still collect and store the records; the law did not eliminate them. What changed is that the government lost easy access and now needs a warrant - a response to the NSA's bulk collection of phone records after 9/11."
  },
  {
    id: "gl136", term: "habeas corpus", area: "dueprocess", topic: "3.8",
    questionType: "case", difficulty: "medium",
    question: "Rasul v. Bush (2004) held that detainees at Guantanamo Bay",
    options: ["could challenge their detention, because the U.S. fully controls the base", "had no rights, because they were held outside the United States", "had to be tried in military tribunals rather than in civilian federal courts", "could be held indefinitely once labeled enemy combatants"],
    answer: "could challenge their detention, because the U.S. fully controls the base",
    explanation: "The president said no; the Court said yes. Habeas corpus keeps government from imprisoning people arbitrarily without charges, and complete U.S. authority over the base meant the Constitution applied. Hamdan later rejected Bush's military tribunals."
  },
  {
    id: "gl137", term: "Hamdi v. Rumsfeld", area: "dueprocess", topic: "3.8",
    questionType: "application", difficulty: "hard",
    question: "After Hamdi v. Rumsfeld (2004), what must happen before the government detains a U.S. citizen as an enemy combatant?",
    options: ["at least a minimal hearing to determine the basis for holding him", "a formal declaration of war passed by Congress", "a full jury trial in a federal district court", "approval from the other nations that signed the 1949 Geneva Convention"],
    answer: "at least a minimal hearing to determine the basis for holding him",
    explanation: "Hamdi ended the executive's unchecked discretion to decide a detainee's status: \"a state of war is not a blank check for the president\" when citizens' rights are at stake. The Court required a hearing, not a full criminal trial."
  },
  {
    id: "gl138", term: "Miranda v. Arizona", area: "dueprocess", topic: "3.8",
    questionType: "case", difficulty: "easy",
    question: "Miranda v. Arizona (1966) requires police to",
    options: ["inform suspects in custody of their rights before questioning them", "obtain a warrant before arresting anyone in a public place", "provide a free lawyer at trial to every defendant who cannot afford one", "record every interrogation from beginning to end on video"],
    answer: "inform suspects in custody of their rights before questioning them",
    explanation: "Miranda applied the Fifth Amendment's protection against self-incrimination once a suspect is in custody. A free lawyer at trial is Gideon. Ernesto Miranda got a new trial without his confession - and was convicted again on other evidence."
  },
  {
    id: "gl139", term: "Miranda v. Arizona", area: "dueprocess", topic: "3.8",
    questionType: "document", difficulty: "medium",
    question: "Why did the Miranda Court say warnings are required once a suspect is in custody?",
    options: ["Custody carries built-in pressure that can compel self-incrimination", "Suspects in custody have, in effect, already been found guilty", "Police may question suspects in custody only with a judge's prior written approval", "Confessions can never be used as evidence at a criminal trial"],
    answer: "Custody carries built-in pressure that can compel self-incrimination",
    explanation: "The Court said custodial interrogation carries \"a badge of intimidation.\" Through the 1950s it had seen appeal after appeal claiming coerced confessions, so it set one clear rule: if that pressure exists, suspects must be told their rights."
  },
  {
    id: "gl140", term: "public safety exception", area: "dueprocess", topic: "3.8",
    questionType: "case", difficulty: "medium",
    question: "In New York v. Quarles (1984), police chased an armed suspect into a grocery store, found an empty holster, and asked where the gun was before reading his rights. Why was his answer allowed into evidence?",
    options: ["The question aimed to remove the danger of a loaded gun in a public place", "Quarles had already waived his Miranda rights in writing at the scene of the arrest", "Officers already held a warrant for the gun", "Miranda warnings apply only to written confessions"],
    answer: "The question aimed to remove the danger of a loaded gun in a public place",
    explanation: "Quarles was surrounded but not otherwise coerced, and the question protected the public. That reasoning became the public safety exception, which puts protecting people ahead of a procedural safeguard for the suspect."
  },
  {
    id: "gl141", term: "public safety exception", area: "dueprocess", topic: "3.8",
    questionType: "scenario", difficulty: "hard",
    question: "Which of these situations fits the public safety exception?",
    options: ["Before giving warnings, an officer asks a bombing suspect where the device is planted", "An officer delays warnings to get a quick confession to a months-old burglary", "Detectives question a suspect for hours and read warnings only before he signs", "Officers honestly rely on a warrant that later turns out to be defective"],
    answer: "Before giving warnings, an officer asks a bombing suspect where the device is planted",
    explanation: "The exception is for questions meant to neutralize an immediate danger. A stale burglary poses no such danger, and late warnings cannot cure hours of questioning. Reliance on a defective warrant is the good faith exception, a Fourth Amendment idea."
  },
  {
    id: "gl142", term: "Gideon v. Wainwright", area: "dueprocess", topic: "3.8",
    questionType: "case", difficulty: "easy",
    question: "Gideon v. Wainwright (1963) held that",
    options: ["states must provide a lawyer to criminal defendants who cannot afford one", "suspects must be warned of their right to remain silent", "illegally seized evidence cannot be used in state courts", "states need provide free lawyers only in death penalty cases or for illiterate defendants"],
    answer: "states must provide a lawyer to criminal defendants who cannot afford one",
    explanation: "The unanimous Court said this applies regardless of the severity of the crime. The last option describes the older rule Gideon swept away; silence warnings are Miranda, and excluding evidence in state courts is Mapp."
  },
  {
    id: "gl143", term: "Betts v. Brady", area: "dueprocess", topic: "3.8",
    questionType: "process", difficulty: "medium",
    question: "How did Gideon v. Wainwright change the rule set in Betts v. Brady (1942)?",
    options: ["Betts required counsel only in special circumstances; Gideon required it for all poor defendants", "Betts required counsel for all poor defendants; Gideon limited that to special circumstances only", "Betts covered federal trials; Gideon extended the same rule to Congress", "Betts required counsel at trial; Gideon extended it only to appeals"],
    answer: "Betts required counsel only in special circumstances; Gideon required it for all poor defendants",
    explanation: "Under Betts, states had to appoint lawyers in noncapital cases only for defendants who were illiterate or incompetent. Black's Gideon opinion called that a departure from the Court's own precedents and saw no logical line between capital and noncapital cases."
  },
  {
    id: "gl144", term: "Gideon v. Wainwright", area: "dueprocess", topic: "3.8",
    questionType: "document", difficulty: "hard",
    question: "Justice Black observed that governments spend vast sums on prosecutors and that defendants with money hire the best lawyers they can. What conclusion did he draw?",
    options: ["Lawyers are necessities, so a poor defendant without one cannot get a fair trial", "Prosecutors' budgets should be cut so the savings can fund lawyers for poor defendants", "Only the federal government can afford to provide counsel to the poor", "Poor defendants should be encouraged to represent themselves"],
    answer: "Lawyers are necessities, so a poor defendant without one cannot get a fair trial",
    explanation: "If both government and wealthy defendants treat lawyers as essential, that proves how much a lawyer matters. Black said the ideal of every defendant standing equal before the law \"cannot be realized\" if the poor face their accusers alone."
  },
  {
    id: "gl145", term: "Gideon v. Wainwright", area: "dueprocess", topic: "3.8",
    questionType: "process", difficulty: "medium",
    question: "How did Clarence Earl Gideon's case reach the Supreme Court?",
    options: ["He filed an in forma pauperis petition from prison, and the Court appointed his lawyer", "The ACLU took up his appeal after he finished his sentence", "Florida's attorney general asked the Court to clarify the law", "He hired a private attorney with money he earned in prison"],
    answer: "He filed an in forma pauperis petition from prison, and the Court appointed his lawyer",
    explanation: "In forma pauperis - \"in the form of a pauper\" - lets people who believe they were wrongly convicted appeal without the usual means. The Court receives thousands a year and occasionally takes one; it then appointed an attorney to argue Gideon's case."
  },
  {
    id: "gl146", term: "Sixth Amendment", area: "dueprocess", topic: "3.8",
    questionType: "definition", difficulty: "medium",
    question: "When the Bill of Rights was ratified, the Sixth Amendment's right to counsel was understood to mean",
    options: ["the right to have a lawyer present at trial in federal court", "a free lawyer for every defendant in any court", "the right to remain silent during police questioning without penalty", "the right to consult a lawyer before any search"],
    answer: "the right to have a lawyer present at trial in federal court",
    explanation: "At first it was merely the right to bring a lawyer to a federal trial. Beginning in the 1930s the Court built it out for state cases, ending with Gideon's rule that the state must pay when a defendant cannot."
  },
  {
    id: "gl147", term: "Fifth Amendment", area: "dueprocess", topic: "3.8",
    questionType: "definition", difficulty: "easy",
    question: "Which protection comes from the Fifth Amendment?",
    options: ["not being compelled to be a witness against oneself", "the assistance of counsel for one's defense at trial", "protection against unreasonable searches of one's home and papers", "protection against excessive bail and cruel punishments"],
    answer: "not being compelled to be a witness against oneself",
    explanation: "The Fifth also holds the federal due process clause and the just compensation clause. Counsel is the Sixth Amendment, searches the Fourth, and bail and punishment the Eighth."
  },
  {
    id: "gl148", term: "search and seizure", area: "dueprocess", topic: "3.8",
    questionType: "definition", difficulty: "easy",
    question: "Probable cause is needed both to search and to seize. When police \"seize\" a person under the Fourth Amendment, they",
    options: ["arrest that person", "issue that person a subpoena", "fine that person for a violation", "question that person as a witness"],
    answer: "arrest that person",
    explanation: "Seizure applies to people as well as evidence. Whether it happens in the heat of the moment on the street or with a warrant at the door, an arrest needs probable cause."
  },
  {
    id: "gl149", term: "procedural due process", area: "dueprocess", topic: "3.8",
    questionType: "compare", difficulty: "medium",
    question: "Under Chief Justice Earl Warren (1953-1969), the Court extended liberties and limited state authority mainly in which areas?",
    options: ["search and seizure, the right to counsel, and self-incrimination in interrogations", "gun ownership, school vouchers, and religious holiday displays", "metadata collection, GPS tracking, and cell phone searches", "excessive fines, the death penalty, and Guantanamo detentions"],
    answer: "search and seizure, the right to counsel, and self-incrimination in interrogations",
    explanation: "AMSCO credits the Warren Court with expanding protections in exactly these areas: Mapp (1961), Gideon (1963) and Miranda (1966). The other lists are built from cases decided long after Warren retired, from Gregg and Lynch to Heller and Riley."
  },

  // =====================================================================
  // CROSS-CUTTING - ITEMS THAT SPAN SEVERAL TOPICS
  // =====================================================================
  {
    id: "gl150", term: "mixed", area: "mixed", topic: "3.7",
    questionType: "compare", difficulty: "medium",
    question: "Which statement correctly distinguishes District of Columbia v. Heller (2008) from McDonald v. Chicago (2010)?",
    options: ["Heller recognized an individual gun right in the federal district; McDonald applied it to the states", "Heller applied the individual gun right to the states; McDonald recognized it in the federal district", "Heller struck down a state law; McDonald upheld a city ordinance", "Both upheld handgun bans as reasonable public safety rules"],
    answer: "Heller recognized an individual gun right in the federal district; McDonald applied it to the states",
    explanation: "D.C. is the seat of the federal government, not a state, so Heller left state and local bans untouched. McDonald used the Fourteenth Amendment's due process clause to finish the job. Both were 5:4 rulings against the gun restrictions."
  },
  {
    id: "gl151", term: "mixed", area: "mixed", topic: "3.7",
    questionType: "compare", difficulty: "hard",
    question: "Near v. Minnesota (1931) shows up in AMSCO's coverage of both freedom of the press and selective incorporation. Why?",
    options: ["It rejected prior restraint and applied freedom of the press to the states", "It created the actual malice standard and applied it to state and federal officials", "It upheld a state gag law and relied on the Tenth Amendment to do so", "It allowed prior restraint in wartime and applied the rule to Congress"],
    answer: "It rejected prior restraint and applied freedom of the press to the states",
    explanation: "Near acted on Gitlow's warning: liberty of the press, the Court said, is within the liberty the Fourteenth Amendment protects. In the same stroke it established the presumption against prior restraint that the Pentagon Papers case relied on."
  },
  {
    id: "gl152", term: "mixed", area: "mixed", topic: "3.2",
    questionType: "case", difficulty: "medium",
    question: "Besides upholding New Jersey's bus-fare program, why does Everson v. Board of Education (1947) matter?",
    options: ["It signaled that the religion clauses apply to the states through the Fourteenth Amendment", "It replaced the Lemon test with a simpler standard", "It allowed states to fund parochial schools directly", "It applied the free exercise clause to Congress for the first time"],
    answer: "It signaled that the religion clauses apply to the states through the Fourteenth Amendment",
    explanation: "Nothing changed for New Jersey, but the Court began building the modern wall of separation, and AMSCO lists Everson among the key incorporation cases. The Lemon test came 24 years later, and the First Amendment always bound Congress."
  },
  {
    id: "gl153", term: "mixed", area: "mixed", topic: "3.7",
    questionType: "case", difficulty: "medium",
    question: "Which case is correctly paired with the amendment it applied to the states?",
    options: ["Mapp v. Ohio - Fourth Amendment", "Gideon v. Wainwright - Fifth Amendment", "Timbs v. Indiana - Sixth Amendment", "Chicago, Burlington & Quincy Railway v. Chicago - Fourth Amendment"],
    answer: "Mapp v. Ohio - Fourth Amendment",
    explanation: "Mapp incorporated the Fourth Amendment's exclusionary rule. Gideon is the Sixth (counsel), Timbs the Eighth (excessive fines), and the 1897 railroad case the Fifth (just compensation)."
  },
  {
    id: "gl154", term: "mixed", area: "mixed", topic: "3.3",
    questionType: "compare", difficulty: "easy",
    question: "Which ruling most clearly sided with public order over the individual claiming a right?",
    options: ["Schenck v. United States", "Tinker v. Des Moines", "Gideon v. Wainwright", "New York Times Co. v. United States"],
    answer: "Schenck v. United States",
    explanation: "Schenck upheld a wartime conviction for anti-draft leaflets. In the other three the individual won: students kept their armbands, Gideon got a lawyer, and the Times printed the Pentagon Papers."
  },
  {
    id: "gl155", term: "mixed", area: "mixed", topic: "3.8",
    questionType: "compare", difficulty: "medium",
    question: "Which of these rulings gave school officials more authority over students rather than less?",
    options: ["New Jersey v. TLO", "Tinker v. Des Moines", "Engel v. Vitale", "Wisconsin v. Yoder"],
    answer: "New Jersey v. TLO",
    explanation: "TLO let administrators search on reasonable suspicion instead of probable cause. Tinker limited their power to silence students, Engel barred them from leading prayer, and Yoder limited the state's power to compel attendance."
  },
  {
    id: "gl156", term: "mixed", area: "mixed", topic: "3.6",
    questionType: "process", difficulty: "hard",
    question: "Which order runs from the least to the most justification the government needs before a search?",
    options: ["airport screening, a principal searching a student's purse, police entering a home", "a principal searching a student's purse, airport screening, police entering a home", "police entering a home, airport screening, a principal searching a student's purse", "airport screening, police entering a home, a principal searching a student's purse"],
    answer: "airport screening, a principal searching a student's purse, police entering a home",
    explanation: "Airports and borders allow virtually limitless searches. School officials need reasonable suspicion under TLO. Entering a home normally requires a warrant based on probable cause - the Fourth Amendment's strongest protection."
  },
  {
    id: "gl157", term: "mixed", area: "mixed", topic: "3.7",
    questionType: "process", difficulty: "hard",
    question: "Put these incorporation milestones in chronological order.",
    options: ["just compensation (railroad case), free press (Near), exclusionary rule (Mapp), bearing arms (McDonald)", "free press (Near), just compensation (railroad case), exclusionary rule (Mapp), bearing arms (McDonald)", "just compensation (railroad case), exclusionary rule (Mapp), free press (Near), bearing arms (McDonald)", "exclusionary rule (Mapp), free press (Near), bearing arms (McDonald), just compensation (railroad case)"],
    answer: "just compensation (railroad case), free press (Near), exclusionary rule (Mapp), bearing arms (McDonald)",
    explanation: "1897, 1931, 1961, 2010. Property came first, First Amendment freedoms next, the Warren Court's criminal procedure rulings in the 1960s, and the Second Amendment only in 2010 - incorporation took more than a century."
  },
  {
    id: "gl158", term: "mixed", area: "mixed", topic: "3.7",
    questionType: "compare", difficulty: "medium",
    question: "Which amendments contain due process clauses, and which governments does each bind?",
    options: ["Fifth binds the federal government; Fourteenth binds the states", "Fifth binds the states; Fourteenth binds the federal government", "Fourth binds the federal government; Eighth binds the states", "Fifth and Fourteenth both bind only the federal government"],
    answer: "Fifth binds the federal government; Fourteenth binds the states",
    explanation: "The Fifth, part of the original Bill of Rights, limits the national government. The Fourteenth (1868) says \"no state\" shall deny due process, which is the doorway for incorporation. Together they cover every level of government."
  },
  {
    id: "gl159", term: "mixed", area: "mixed", topic: "3.7",
    questionType: "compare", difficulty: "hard",
    question: "Gitlow (1925) upheld a conviction for advocating the violent overthrow of government; Brandenburg (1969) overturned a Klan leader's conviction for inflammatory rally speech. What shift does the contrast show?",
    options: ["The Court came to protect advocacy unless it incites imminent lawless action", "The Court stopped applying the First Amendment to the states", "The Court came to treat political speech as unprotected", "The Court decided that only Congress may punish dangerous speech"],
    answer: "The Court came to protect advocacy unless it incites imminent lawless action",
    explanation: "Gitlow's pamphlets were punished as a threat to public safety under a broad standard. By 1969 the Court required intent and likelihood of imminent lawlessness. Gitlow's lasting legacy is the opposite of the second option: it opened the door to incorporation."
  },
  {
    id: "gl160", term: "mixed", area: "mixed", topic: "3.1",
    questionType: "application", difficulty: "hard",
    question: "Barring felons from buying guns under the Gun Control Act rests on the same public-interest logic as which other policy?",
    options: ["licensing drivers only once they reach their mid-teens", "striking down a state-written prayer in public schools", "letting Amish teens leave school after eighth grade", "refusing to block a newspaper from printing leaked documents"],
    answer: "licensing drivers only once they reach their mid-teens",
    explanation: "Both limit a liberty to protect the general public from foreseeable harm. The other three are rulings where the individual's liberty won out over the government's interest."
  },
  {
    id: "gl161", term: "mixed", area: "mixed", topic: "3.1",
    questionType: "case", difficulty: "medium",
    question: "Which pairing of a must-know case with its ruling is INCORRECT?",
    options: ["Schenck v. United States - anti-draft leaflets were protected even in wartime", "Engel v. Vitale - a school-sponsored prayer violates the First Amendment's establishment clause", "Tinker v. Des Moines - students may wear armbands as symbolic speech", "Gideon v. Wainwright - states must provide lawyers to poor defendants"],
    answer: "Schenck v. United States - anti-draft leaflets were protected even in wartime",
    explanation: "Schenck went the other way: the leaflets created a clear and present danger in wartime, and the conviction stood 9 to 0. The other three pairings are accurate summaries of AMSCO's must-know cases table."
  },
  {
    id: "gl162", term: "mixed", area: "mixed", topic: "3.6",
    questionType: "definition", difficulty: "easy",
    question: "AMSCO frames conflicts from gun ownership to police searches with one big idea. What is it?",
    options: ["Laws balancing order and liberty rest on the Constitution and have been interpreted differently over time", "The Bill of Rights is absolute and admits no exceptions", "Individual rights always outweigh public safety in court", "Only Congress may weigh liberty against public order"],
    answer: "Laws balancing order and liberty rest on the Constitution and have been interpreted differently over time",
    explanation: "The balance keeps moving: Schenck to Brandenburg, Betts to Gideon, Heller to McDonald. Courts, Congress and the president all take part, and no right in this unit is absolute."
  }
];

// Export for the Node-based validator (harmless in the browser).
if (typeof module !== "undefined") {
  module.exports = { govLibertiesVocab, govLibertiesBank };
}
