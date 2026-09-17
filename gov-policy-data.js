// =========================================================================
// AP GOV: TOPICS 2.9-2.15 - CONTENT MODULE
// =========================================================================
// Source of truth: AMSCO United States Government & Politics, AP Edition
// (2022), Chapters 6-7, book pages 188-243 - Topic 2.9 (legitimacy of the
// judicial branch), Topic 2.10 (the Court in action), Topic 2.11 (checks on
// the judicial branch), Topic 2.12 (the bureaucracy), Topic 2.13
// (discretionary and rule-making authority), Topic 2.14 (holding the
// bureaucracy accountable) and Topic 2.15 (policy and the branches).
//
// Two exports:
//   govPolicyVocab - every key term this mode tests, with the meaning the
//                    AMSCO text gives it and the topic it appears under.
//                    Update this list first if the source changes.
//   govPolicyBank  - the question bank. Content only: no markup, no game
//                    logic, no HTML.
//
// Question shape:
//   { id, term, area, topic, questionType, difficulty,
//     question, options, answer, explanation }
//     term         - the vocabulary entry under test; "mixed" for items that
//                    compare several concepts or span areas
//     area         - "courts" | "checks" | "bureaucracy" | "oversight" |
//                    "mixed", and drives the Area filter
//     topic        - the AMSCO topic number the item is drawn from
//     questionType - definition | application | scenario | compare |
//                    document | case | process. The engine spreads types out
//                    so consecutive questions do not feel identical.
//     difficulty   - "easy" | "medium" | "hard"; a session ramps easy -> hard
//     options      - exactly four distinct strings; one equals `answer`
//                    (the engine shuffles them, so stored order is irrelevant)
//
// Ids run gp001 upward and are identity keys, not positions. Never reuse one:
// the "recently seen" list a returning player has stored is keyed by id, so a
// recycled number would hide a brand new question from them.
// =========================================================================

const govPolicyVocab = [
  // --- The Supreme Court: Topic 2.9, precedent and legitimacy -------------
  { id: "p-common-law", term: "common law", display: "common law", area: "courts", topic: "2.9",
    meaning: "The body of court decisions that makes up part of the law, a judicial tradition inherited from England." },
  { id: "p-precedent", term: "precedent", display: "precedent", area: "courts", topic: "2.9",
    meaning: "A ruling that firmly establishes a legal principle, which later courts must follow or will at least consider." },
  { id: "p-binding-precedent", term: "binding precedent", display: "binding precedent", area: "courts", topic: "2.9",
    meaning: "A higher court's ruling that a lower court under it is obliged to follow when a case parallels one already decided." },
  { id: "p-persuasive-precedent", term: "persuasive precedent", display: "persuasive precedent", area: "courts", topic: "2.9",
    meaning: "A decision from another district or a far-away circuit that a judge may weigh as a guide but is not required to follow." },
  { id: "p-stare-decisis", term: "stare decisis", display: "stare decisis", area: "courts", topic: "2.9",
    meaning: "Latin for \"let the decision stand\" - the principle governing common law that keeps settled rulings in place." },
  { id: "p-overturning-precedent", term: "overturning precedent", display: "overturning precedent", area: "courts", topic: "2.9",
    meaning: "The Court's practice of reconsidering and reversing its own earlier ruling when convinced of former error, as Smith v. Allwright did to Grovey v. Townsend." },
  { id: "p-life-tenure", term: "life tenure", display: "life tenure", area: "courts", topic: "2.9",
    meaning: "Federal judges serve during good behavior and answer to no voter; paired with judicial review, this fuels debates about the Court's legitimacy." },
  { id: "p-marshall-court", term: "Marshall Court", display: "the Marshall Court", area: "courts", topic: "2.9",
    meaning: "John Marshall's tenure as chief justice, 1801-1835, which united the Court behind one voice and made it a genuinely coequal branch." },
  { id: "p-roberts", term: "John Roberts", display: "John Roberts", area: "courts", topic: "2.9",
    meaning: "Chief justice since 2005, who takes fewer cases, writes narrower opinions and has won more unanimity than several predecessors." },
  { id: "p-judicial-minimalism", term: "judicial minimalism", display: "judicial minimalism", area: "courts", topic: "2.9",
    meaning: "Deciding no more than the case before the Court requires; Roberts described judges as umpires who apply rules rather than make them." },
  { id: "p-swing-vote", term: "swing vote", display: "swing vote", area: "courts", topic: "2.9",
    meaning: "The often tie-breaking vote of a justice whose position cannot reliably be predicted, as O'Connor's and Kennedy's were." },

  // --- The Supreme Court: Topic 2.10, the Court in action ----------------
  { id: "p-majority-opinion", term: "majority opinion", display: "majority opinion", area: "courts", topic: "2.10",
    meaning: "The opinion that states the Court's ruling, summing up the case, the decision and its rationale; it carries the force of law." },
  { id: "p-concurring-opinion", term: "concurring opinion", display: "concurring opinion", area: "courts", topic: "2.10",
    meaning: "An opinion by a justice who joins the majority's result but has reservations about the legal reasoning behind it." },
  { id: "p-dissenting-opinion", term: "dissenting opinion", display: "dissenting opinion", area: "courts", topic: "2.10",
    meaning: "An opinion by a justice voting against the majority; it has no force of law but can signal the legal community and shape later cases." },
  { id: "p-per-curiam", term: "per curiam opinion", display: "per curiam opinion", area: "courts", topic: "2.10",
    meaning: "A decision the Court issues without the full explanation that normally accompanies a ruling." },
  { id: "p-certiorari", term: "petition for certiorari", display: "petition for certiorari", area: "courts", topic: "2.10",
    meaning: "The brief a losing party files with the Supreme Court arguing why the lower court erred and why the appeal should be granted." },
  { id: "p-rule-of-four", term: "rule of four", display: "rule of four", area: "courts", topic: "2.10",
    meaning: "The custom that four of the nine justices must agree to accept a case; a standard below a majority that respects claims by minorities." },
  { id: "p-strict-constructionist", term: "strict constructionist", display: "strict constructionist", area: "courts", topic: "2.10",
    meaning: "A judge who interprets the Constitution in its original context and strikes a law down only when it clearly contradicts the document." },
  { id: "p-liberal-constructionist", term: "liberal constructionist", display: "liberal constructionist", area: "courts", topic: "2.10",
    meaning: "A judge who reads the Constitution as a living document, accounting for changes and social conditions since ratification." },
  { id: "p-original-jurisdiction", term: "original jurisdiction", display: "original jurisdiction", area: "courts", topic: "2.10",
    meaning: "The authority to hear a case first, as a trial court; the Supreme Court rarely uses it, mostly for disputes between states." },
  { id: "p-appellate-jurisdiction", term: "appellate jurisdiction", display: "appellate jurisdiction", area: "courts", topic: "2.10",
    meaning: "The authority to review a lower court's decision; it is how nearly every case reaches the Supreme Court, two-thirds from the federal circuits." },
  { id: "p-implementation", term: "implementation", display: "implementation", area: "courts", topic: "2.10",
    meaning: "Putting a court's decision into effect, which judges cannot do themselves - it takes the president, marshals, agencies or new legislation." },
  { id: "p-court-packing", term: "court-packing plan", display: "FDR's court-packing plan", area: "courts", topic: "2.10",
    meaning: "Roosevelt's 1937 proposal to add a justice for every sitting justice over 70, which would have let him name up to six and dilute a hostile majority." },
  { id: "p-eleventh-amendment", term: "Eleventh Amendment", display: "the Eleventh Amendment", area: "courts", topic: "2.10",
    meaning: "The response to Chisolm v. Georgia, and the only amendment to alter the judicial branch's jurisdiction by limiting suits against states." },
  { id: "p-sixteenth-amendment", term: "Sixteenth Amendment", display: "the Sixteenth Amendment (1913)", area: "courts", topic: "2.10",
    meaning: "The amendment securing Congress's power to tax income after the Court had struck the earlier income tax statute down." },
  { id: "p-warren-court", term: "Warren Court", display: "the Warren Court", area: "courts", topic: "2.10",
    meaning: "Earl Warren's Court, 1953-1969, which extended civil rights and liberties and drew calls for his impeachment from traditionalists." },
  { id: "p-burger-court", term: "Burger Court", display: "the Burger Court", area: "courts", topic: "2.10",
    meaning: "Warren Burger's Court, which largely continued Warren's path, decided Roe v. Wade, and struggled to assemble majorities as its caseload grew." },
  { id: "p-rehnquist-court", term: "Rehnquist Court", display: "the Rehnquist Court", area: "courts", topic: "2.10",
    meaning: "William Rehnquist's Court, which trimmed the caseload, improved conference procedure, and shifted toward strict construction." },

  // --- Checks on the Courts: Topic 2.11 ----------------------------------
  { id: "p-judicial-activism", term: "judicial activism", display: "judicial activism", area: "checks", topic: "2.11",
    meaning: "Judges striking down laws or reversing public policy - acting to shape the law; it can be liberal or conservative depending on what is struck down." },
  { id: "p-judicial-restraint", term: "judicial restraint", display: "judicial restraint", area: "checks", topic: "2.11",
    meaning: "Deferring to elected bodies and declaring a law unconstitutional only when it clearly and directly contradicts the Constitution." },
  { id: "p-litmus-test", term: "litmus test", display: "litmus test", area: "checks", topic: "2.11",
    meaning: "A quick read of a judicial nominee's ideology from one pointed question or one prior opinion; the name itself carries the criticism." },
  { id: "p-senatorial-courtesy", term: "senatorial courtesy", display: "senatorial courtesy", area: "checks", topic: "2.11",
    meaning: "The custom giving a nominee's home-state senators effective veto power over district court appointments, which the other 98 senators respect." },
  { id: "p-blue-slip", term: "blue slip", display: "blue slip", area: "checks", topic: "2.11",
    meaning: "The paper each home-state senator returns to the Judiciary Committee to let a district court nomination proceed; withholding it stalls the hearing." },
  { id: "p-standing", term: "standing", display: "standing", area: "checks", topic: "2.11",
    meaning: "The requirements for bringing a case to court; Article III lets Congress define which parties may go to which courts." },
  { id: "p-nuclear-option", term: "nuclear option", display: "the \"nuclear option\"", area: "checks", topic: "2.11",
    meaning: "Changing Senate rules by simple majority to disallow the filibuster on nominees - a drastic step first threatened over Bush's appeals court picks." },
  { id: "p-bork", term: "Robert Bork", display: "Robert Bork", area: "checks", topic: "2.11",
    meaning: "Reagan's 1987 nominee, an advocate of original intent, rejected 58-42 after a campaign against his views; \"to bork\" entered the political lexicon." },
  { id: "p-garland", term: "Merrick Garland", display: "Merrick Garland", area: "checks", topic: "2.11",
    meaning: "Obama's 2016 nominee for Scalia's seat, whom the Senate never voted on, leaving the vacancy open for more than ten months." },
  { id: "p-thomas", term: "Clarence Thomas", display: "Clarence Thomas", area: "checks", topic: "2.11",
    meaning: "Bush's 1991 nominee to replace Thurgood Marshall, narrowly confirmed after televised hearings on Anita Hill's accusations of sexual misconduct." },
  { id: "p-solicitor-general", term: "solicitor general", display: "solicitor general", area: "checks", topic: "2.11",
    meaning: "The Justice Department officer who decides which cases the United States appeals to the Supreme Court and argues them there." },
  { id: "p-amicus-curiae", term: "amicus curiae brief", display: "amicus curiae brief", area: "checks", topic: "2.11",
    meaning: "A \"friend of the court\" brief arguing for a particular ruling, filed by someone who is not a party to the case." },
  { id: "p-attorney-general", term: "attorney general", display: "attorney general", area: "checks", topic: "2.11",
    meaning: "The head of the Department of Justice, which investigates federal crimes through the FBI and DEA and defends the United States when it is sued." },
  { id: "p-judicial-impeachment", term: "impeachment of judges", display: "impeachment of judges", area: "checks", topic: "2.11",
    meaning: "Congress's check on life tenure; the House has impeached 15 federal judges, starting with John Pickering in 1804." },
  { id: "p-court-stripping", term: "court-stripping", display: "court-stripping", area: "checks", topic: "2.11",
    meaning: "Congress limiting the courts' power by removing their jurisdiction over particular subjects, as the House tried over the Pledge of Allegiance." },
  { id: "p-judicial-recusal", term: "judicial recusal", display: "judicial recusal", area: "checks", topic: "2.11",
    meaning: "A judge withdrawing from a case because of a conflict of interest, one of the courtroom matters Congress legislates about." },
  { id: "p-aba", term: "American Bar Association", display: "the American Bar Association (ABA)", area: "checks", topic: "2.11",
    meaning: "The lawyers' association that has rated judicial nominees \"highly qualified,\" \"qualified\" or \"not qualified\" since the 1950s." },

  // --- The Bureaucracy: Topic 2.12, structure and tasks ------------------
  { id: "p-bureaucracy", term: "bureaucracy", display: "the federal bureaucracy", area: "bureaucracy", topic: "2.12",
    meaning: "The vast hierarchical organization of executive branch employees - close to 3 million people - that carries out the federal government's business." },
  { id: "p-departments", term: "executive departments", display: "the executive departments", area: "bureaucracy", topic: "2.12",
    meaning: "The 15 departments each headed by a Cabinet secretary; Defense is by far the largest, and every secretary is paid the same salary." },
  { id: "p-independent-agency", term: "independent executive agency", display: "independent executive agency", area: "bureaucracy", topic: "2.12",
    meaning: "An agency such as NASA that sits in the executive branch but under no department, structured that way to avoid a department's undue influence." },
  { id: "p-commission", term: "independent commission", display: "independent commission", area: "bureaucracy", topic: "2.12",
    meaning: "A body of five to seven members with staggered terms, so no one president can replace them all and turn the body political rather than neutral." },
  { id: "p-government-corporation", term: "government corporation", display: "government corporation", area: "bureaucracy", topic: "2.12",
    meaning: "A hybrid of agency and private company, appearing in the 1930s where government wanted to overlap with the private sector - Amtrak, the Postal Service." },
  { id: "p-administrative-adjudication", term: "administrative adjudication", display: "administrative adjudication", area: "bureaucracy", topic: "2.12",
    meaning: "Agencies acting like a court to impose fines or other punishments, aimed at industries and companies rather than individual citizens." },
  { id: "p-compliance-monitoring", term: "compliance monitoring", display: "compliance monitoring", area: "bureaucracy", topic: "2.12",
    meaning: "Checking that firms subject to regulation are actually following the standards - permits, samples, and follow-up after a ruling." },
  { id: "p-iron-triangle", term: "iron triangle", display: "iron triangle", area: "bureaucracy", topic: "2.12",
    meaning: "The tight three-way relationship among an agency, a congressional committee and an interest group, whose interdependence lets them make policy together." },
  { id: "p-issue-networks", term: "issue networks", display: "issue networks", area: "bureaucracy", topic: "2.12",
    meaning: "Looser webs of committee staffers, academics, advocates, think tanks, interest groups and media who collaborate on one specific policy issue." },
  { id: "p-patronage", term: "patronage", display: "patronage", area: "bureaucracy", topic: "2.12",
    meaning: "Rewarding loyal party members with federal jobs regardless of merit, the rotation system Jefferson and his successors practiced." },
  { id: "p-spoils-system", term: "spoils system", display: "spoils system", area: "bureaucracy", topic: "2.12",
    meaning: "The entrenched form of patronage - postmasterships and other jobs traded for loyalty - that made the Post Office an engine of party machinery." },
  { id: "p-pendleton", term: "Pendleton Civil Service Act", display: "Pendleton Civil Service Act (1883)", area: "bureaucracy", topic: "2.12",
    meaning: "The law passed after Garfield's assassination that created the merit system and a bipartisan Civil Service Commission to run it." },
  { id: "p-merit-system", term: "merit system", display: "merit system", area: "bureaucracy", topic: "2.12",
    meaning: "Hiring federal workers on skill and experience, tested by competitive written exams, instead of on party loyalty." },
  { id: "p-civil-service-commission", term: "Civil Service Commission", display: "Civil Service Commission", area: "bureaucracy", topic: "2.12",
    meaning: "The bipartisan body the Pendleton Act created to oversee merit hiring; it ran until the 1978 reforms replaced it." },
  { id: "p-csra", term: "Civil Service Reform Act", display: "Civil Service Reform Act (1978)", area: "bureaucracy", topic: "2.12",
    meaning: "Carter's reform: it changed how a bureaucrat is dismissed, trimmed veterans' preferences, and returned upper-level appointments to the president." },
  { id: "p-opm", term: "Office of Personnel Management", display: "Office of Personnel Management (OPM)", area: "bureaucracy", topic: "2.12",
    meaning: "The agency that replaced the Civil Service Commission in 1978, running the merit system and coordinating federal hiring." },
  { id: "p-npr", term: "National Performance Review", display: "National Performance Review", area: "bureaucracy", topic: "2.12",
    meaning: "Clinton's 1993 review of the federal government, whose nearly 400 recommendations aimed to cut paperwork, empower employees and save money." },

  // --- The Bureaucracy: Topic 2.13, rule-making --------------------------
  { id: "p-discretionary-authority", term: "delegated discretionary authority", display: "delegated discretionary authority", area: "bureaucracy", topic: "2.13",
    meaning: "The power Congress hands agencies to interpret legislation and write the rules that implement it, since legislators are rarely experts." },
  { id: "p-apa", term: "Administrative Procedures Act", display: "Administrative Procedures Act (1946)", area: "bureaucracy", topic: "2.13",
    meaning: "The 1946 law formalizing rule making so it is fair and transparent, and guaranteeing affected citizens and industries a say in shaping a rule." },
  { id: "p-notice-and-comment", term: "notice-and-comment opportunity", display: "notice-and-comment opportunity", area: "bureaucracy", topic: "2.13",
    meaning: "The stage at which an agency publishes a proposed rule and collects public response - an access point stakeholders use to promote their interests." },
  { id: "p-federal-register", term: "Federal Register", display: "the Federal Register", area: "bureaucracy", topic: "2.13",
    meaning: "The daily record of how a regulation started, how it developed and how it reached final form." },
  { id: "p-cfr", term: "Code of Federal Regulations", display: "the Code of Federal Regulations", area: "bureaucracy", topic: "2.13",
    meaning: "Where a finished regulation is finally printed, arranged more cleanly than the Register's running record." },
  { id: "p-ira", term: "independent regulatory agencies", display: "independent regulatory agencies", area: "bureaucracy", topic: "2.13",
    meaning: "Bodies with industry-specific charges from Congress that write binding rules and levy fines; their directors can be removed only for cause." },
  { id: "p-dhs", term: "Department of Homeland Security", display: "Department of Homeland Security", area: "bureaucracy", topic: "2.13",
    meaning: "The 2002 department that houses ICE, the Coast Guard and the TSA, and whose discretion includes allowing certain exemptions for immigrants." },
  { id: "p-dot", term: "Department of Transportation", display: "Department of Transportation", area: "bureaucracy", topic: "2.13",
    meaning: "The department whose discretionary authority includes determining which highway projects receive special grants." },
  { id: "p-ed", term: "Department of Education", display: "Department of Education", area: "bureaucracy", topic: "2.13",
    meaning: "The department whose discretionary authority includes cancelling or lowering student debt." },
  { id: "p-va", term: "Department of Veterans Affairs", display: "Department of Veterans Affairs", area: "bureaucracy", topic: "2.13",
    meaning: "The department whose discretionary authority includes deciding how to administer a health program for veterans." },
  { id: "p-epa", term: "Environmental Protection Agency", display: "Environmental Protection Agency (EPA)", area: "bureaucracy", topic: "2.13",
    meaning: "The agency charged with enforcing the Clean Water and Clean Air Acts, which claimed authority over greenhouse gases the Clean Air Act never mentioned." },
  { id: "p-fec", term: "Federal Election Commission", display: "Federal Election Commission (FEC)", area: "bureaucracy", topic: "2.13",
    meaning: "The independent regulatory agency administering federal campaign finance law, hobbled after a 2019 resignation left it short of a quorum." },
  { id: "p-sec", term: "Securities and Exchange Commission", display: "Securities and Exchange Commission (SEC)", area: "bureaucracy", topic: "2.13",
    meaning: "The agency whose discretionary authority includes disqualifying financial firms from raising money because of illegal conduct." },

  // --- Oversight and Accountability: Topic 2.14 --------------------------
  { id: "p-congressional-oversight", term: "congressional oversight", display: "congressional oversight", area: "oversight", topic: "2.14",
    meaning: "Congress's supervision of the agencies carrying out the law - a check on them, and a competition with the president for influence over them." },
  { id: "p-oversight-hearing", term: "oversight hearing", display: "oversight hearing", area: "oversight", topic: "2.14",
    meaning: "A committee session calling directors and secretaries to testify, sometimes routine and collegial, sometimes convened to get to the bottom of a problem." },
  { id: "p-power-of-the-purse", term: "power of the purse", display: "power of the purse", area: "oversight", topic: "2.14",
    meaning: "Congress's control of an agency's money, and with it the agency's condition and prospects of success." },
  { id: "p-authorization", term: "authorization of spending", display: "authorization of spending", area: "oversight", topic: "2.14",
    meaning: "The committee measure stating the maximum an agency may spend on a program, either once or as a recurring annual allotment." },
  { id: "p-appropriations", term: "appropriations", display: "appropriations", area: "oversight", topic: "2.14",
    meaning: "Funds actually set aside for a purpose, approved by each chamber's appropriations committee and the full chamber, typically annually in the budget." },
  { id: "p-oira", term: "Office of Information and Regulatory Affairs", display: "Office of Information and Regulatory Affairs (OIRA)", area: "oversight", topic: "2.14",
    meaning: "The OMB office that reviews every regulation with a significant effect on the economy or public health; rules clashing with the president's agenda can be revised or killed." },
  { id: "p-omb", term: "Office of Management and Budget", display: "Office of Management and Budget (OMB)", area: "oversight", topic: "2.14",
    meaning: "The office that prepares the president's annual budget proposal and reviews the budgets and programs of the executive departments." },

  // --- Oversight and Accountability: Topic 2.15 --------------------------
  { id: "p-legislative-veto", term: "legislative veto", display: "legislative veto", area: "oversight", topic: "2.15",
    meaning: "A 1930s device requiring certain agency decisions to wait 30 or 90 days so Congress could stop them; struck down in INS v. Chadha (1983)." },
  { id: "p-chadha", term: "INS v. Chadha", display: "INS v. Chadha (1983)", area: "oversight", topic: "2.15",
    meaning: "The ruling that the legislative veto violates separation of powers: the veto belongs to the president, and the House had acted like a court." },
  { id: "p-committee-clearance", term: "committee clearance", display: "committee clearance", area: "oversight", topic: "2.15",
    meaning: "The practice by which some congressional committees review and approve certain agency actions in advance - respected because the committee holds the purse." },
  { id: "p-chevron", term: "Chevron deference", display: "Chevron deference", area: "oversight", topic: "2.15",
    meaning: "The doctrine from Chevron v. NRDC (1984) that courts defer to an agency when the law defining its responsibilities is vague or ambiguous." },
  { id: "p-going-native", term: "going native", display: "going native", area: "oversight", topic: "2.15",
    meaning: "An appointed bureaucrat siding with his or her own agency instead of the president - risky, and many who did so publicly were replaced." },
  { id: "p-whistleblower", term: "Whistleblower Protection Act", display: "Whistleblower Protection Act (1989)", area: "oversight", topic: "2.15",
    meaning: "The law barring a federal agency from retaliating against or threatening an employee who discloses acts believed illegal or dishonest." },
  { id: "p-foia", term: "Freedom of Information Act", display: "Freedom of Information Act (1966)", area: "oversight", topic: "2.15",
    meaning: "The law giving the public the right to request access to federal records or information." },
  { id: "p-sunshine-act", term: "Sunshine Act", display: "Sunshine Act (1976)", area: "oversight", topic: "2.15",
    meaning: "The law requiring most federal agencies to hold their meetings in publicly accessible places." }
];

const govPolicyBank = [
  // =====================================================================
  // TOPIC 2.9 - PRECEDENT, STARE DECISIS AND THE COURT'S LEGITIMACY
  // =====================================================================
  {
    id: "gp001", term: "precedent", area: "courts", topic: "2.9",
    questionType: "definition", difficulty: "easy",
    question: "As AMSCO uses the word, a precedent is",
    options: ["a ruling that firmly establishes a legal principle", "a written request asking the Supreme Court to hear an appeal", "the separate opinion of a justice who disagrees with the ruling", "a law Congress passes to reverse a court decision"],
    answer: "a ruling that firmly establishes a legal principle",
    explanation: "Precedents are the raw material of common law. The request for review is a petition for certiorari, the separate opinion is a dissent, and a law reversing a decision is Congress checking the Court, not a precedent."
  },
  {
    id: "gp002", term: "stare decisis", area: "courts", topic: "2.9",
    questionType: "definition", difficulty: "easy",
    question: "Stare decisis translates roughly as",
    options: ["let the decision stand", "friend of the court", "let the buyer beware", "the thing has been judged"],
    answer: "let the decision stand",
    explanation: "Stare decisis is the habit of leaving settled law settled. \"Friend of the court\" is amicus curiae, a brief filed by a non-party; the other phrases belong to contract law and to double jeopardy."
  },
  {
    id: "gp003", term: "binding precedent", area: "courts", topic: "2.9",
    questionType: "scenario", difficulty: "medium",
    question: "A U.S. district judge in Ohio is hearing a case nearly identical to one her own circuit, the Sixth, decided last year, and to one the Ninth Circuit decided two years ago. How do those rulings bear on her?",
    options: ["The Sixth Circuit ruling binds her; the Ninth Circuit ruling is only persuasive", "Both bind her, since both come from federal appeals courts", "Neither binds her, since judges decide case by case", "The Ninth Circuit ruling binds her because it was decided first and has not been overruled"],
    answer: "The Sixth Circuit ruling binds her; the Ninth Circuit ruling is only persuasive",
    explanation: "Binding precedent runs down a single judicial line. A ruling from a far-away circuit may guide her thinking, but only the court directly above her can overrule an appeal, which is exactly why she follows it."
  },
  {
    id: "gp004", term: "persuasive precedent", area: "courts", topic: "2.9",
    questionType: "definition", difficulty: "medium",
    question: "Persuasive precedent differs from binding precedent mainly in that a judge",
    options: ["may weigh it but is free to rule otherwise", "may cite it only in a dissenting opinion", "must follow it once four justices agree", "may use it only in cases involving federal law"],
    answer: "may weigh it but is free to rule otherwise",
    explanation: "Persuasive precedent comes from courts outside the judge's chain of appeal - another district, a distant circuit - so it carries reasoning but no obligation. The rule of four concerns which cases the Supreme Court accepts, not which precedents bind."
  },
  {
    id: "gp005", term: "common law", area: "courts", topic: "2.9",
    questionType: "definition", difficulty: "easy",
    question: "Common law refers to",
    options: ["the body of court decisions that makes up part of the law", "laws that apply equally to every state", "statutes passed by a legislature rather than written by judges", "the unwritten customs of the Senate and the House"],
    answer: "the body of court decisions that makes up part of the law",
    explanation: "American courts inherited common law from England: law built up ruling by ruling. Statutes are the legislature's contribution, and chamber customs are internal rules, not law at all."
  },
  {
    id: "gp006", term: "life tenure", area: "courts", topic: "2.9",
    questionType: "application", difficulty: "medium",
    question: "AMSCO presents life tenure as a source of debate about the Court's legitimacy because it means that",
    options: ["justices who make unpopular rulings answer to no electorate", "justices may serve only until the president who appointed them leaves office", "the Senate must reconfirm each justice every ten years", "a justice's rulings cannot be overturned by a later Court"],
    answer: "justices who make unpopular rulings answer to no electorate",
    explanation: "Brutus made this complaint in 1787 and critics still make it: nine unelected officials with no term and no voter to face. Later Courts can and do overturn earlier rulings, which is a separate worry about reliability."
  },
  {
    id: "gp007", term: "overturning precedent", area: "courts", topic: "2.9",
    questionType: "case", difficulty: "medium",
    question: "In Smith v. Allwright (1944) the Court held that Texas Democrats could not bar Black voters from their primary, explicitly overruling Grovey v. Townsend (1935). AMSCO uses the nine-year gap to illustrate that",
    options: ["changes in the Court's membership and in society can move it to abandon a precedent", "stare decisis binds the Supreme Court exactly as it binds the district courts", "a precedent expires automatically after a set number of years", "only a constitutional amendment can undo a Supreme Court ruling"],
    answer: "changes in the Court's membership and in society can move it to abandon a precedent",
    explanation: "Different justices sat in 1944, and wartime arguments about democracy and fairness had shifted views. The Court wrote that it had \"never felt constrained to follow precedent\" once convinced of former error."
  },
  {
    id: "gp008", term: "stare decisis", area: "courts", topic: "2.9",
    questionType: "document", difficulty: "hard",
    question: "Justice Brandeis wrote that \"stare decisis is usually the wise policy, because in most matters it is more important that the applicable law be settled than that it be settled right.\" He then argued that this holds less firmly for constitutional rulings because",
    options: ["Congress cannot correct the Court's reading of the Constitution by ordinary legislation", "constitutional cases are heard under the Court's original jurisdiction", "the Constitution requires the Court to revisit each of its constitutional rulings periodically", "constitutional questions are decided by fewer than four justices"],
    answer: "Congress cannot correct the Court's reading of the Constitution by ordinary legislation",
    explanation: "Brandeis drew the line at who can fix an error. Misread a statute and Congress can rewrite it; misread the Constitution and the only ordinary remedy is the Court itself, so it should be readier to reconsider."
  },
  {
    id: "gp009", term: "Marshall Court", area: "courts", topic: "2.9",
    questionType: "application", difficulty: "medium",
    question: "Chief Justice Rehnquist later wrote that John Marshall left the Court \"a genuinely coequal branch.\" Which practice of Marshall's does AMSCO credit for that?",
    options: ["insisting the justices unite behind a single opinion rather than speak separately", "expanding the Court from six members to nine", "moving the Court into a building of its own", "requiring the Senate to confirm every lower-court judge before that judge could hear a case"],
    answer: "insisting the justices unite behind a single opinion rather than speak separately",
    explanation: "Marshall built authority out of one voice, and in the important cases that voice was his. Congress raised the membership to nine in 1837 under Taney, and the Court had no building of its own until 1935."
  },
  {
    id: "gp010", term: "John Roberts", area: "courts", topic: "2.9",
    questionType: "document", difficulty: "medium",
    question: "\"Judges are like umpires. Umpires don't make rules; they apply them . . . nobody ever went to a ball game to see the umpire.\" John Roberts offered this at his confirmation hearing as a description of",
    options: ["a modest judicial role confined to the question actually before the Court", "the Court's duty to keep pace with changing social conditions", "the Senate's responsibility to screen nominees for ideology", "the president's freedom to disregard rulings he believes were wrongly decided"],
    answer: "a modest judicial role confined to the question actually before the Court",
    explanation: "The umpire line is Roberts's shorthand for judicial minimalism: fewer cases, narrower opinions, more unanimity. Keeping the Constitution current is the liberal constructionist's view, which the metaphor is meant to reject."
  },
  {
    id: "gp011", term: "judicial minimalism", area: "courts", topic: "2.9",
    questionType: "definition", difficulty: "hard",
    question: "Which pattern in the Roberts Court's work best reflects judicial minimalism?",
    options: ["writing narrow opinions that settle only the question presented", "striking down more acts of Congress than any previous Court", "issuing most decisions per curiam to save time", "deciding cases by a bare majority whenever possible"],
    answer: "writing narrow opinions that settle only the question presented",
    explanation: "Minimalism is about reach, not outcome: decide this dispute and leave the next one alone. AMSCO notes Roberts took fewer cases, held longer conferences, and achieved more unanimity, not less."
  },
  {
    id: "gp012", term: "swing vote", area: "courts", topic: "2.9",
    questionType: "definition", difficulty: "easy",
    question: "A swing vote on the Supreme Court is cast by a justice who",
    options: ["cannot be reliably predicted to side with either wing", "always votes with the chief justice", "has served on the Court the longest", "writes the majority opinion in most closely divided cases"],
    answer: "cannot be reliably predicted to side with either wing",
    explanation: "Justices O'Connor and Kennedy played the role for years, which is why a 5-4 Court could be hard to forecast. Seniority matters for assigning opinions, not for how a vote is predicted."
  },
  {
    id: "gp013", term: "binding precedent", area: "courts", topic: "2.9",
    questionType: "application", difficulty: "hard",
    question: "A district judge is convinced that the binding precedent controlling her case was wrongly reasoned. AMSCO's account suggests she will most likely",
    options: ["follow it anyway, knowing a contrary ruling would be reversed on appeal", "certify the question directly to the Supreme Court for an answer", "rule as she sees fit, since no two cases are ever truly identical", "refuse the case and let another district judge take it"],
    answer: "follow it anyway, knowing a contrary ruling would be reversed on appeal",
    explanation: "Even an independent-minded judge weighs what happens on appeal. She can note her disagreement, and the fact that no two cases are identical gives her room to distinguish - but not to defy the court above her."
  },
  {
    id: "gp014", term: "precedent", area: "courts", topic: "2.9",
    questionType: "compare", difficulty: "medium",
    question: "Following precedent is valuable chiefly because it gives the law",
    options: ["continuity and consistency across courts and over time", "immunity from review by the other two branches", "the flexibility to reach a different result in each case", "protection from amendment by the states"],
    answer: "continuity and consistency across courts and over time",
    explanation: "A litigant should be able to predict how a court will rule, and a lower court should not have to guess. Flexibility is what precedent trades away, and nothing about it shields the law from Congress or the amendment process."
  },
  {
    id: "gp015", term: "life tenure", area: "courts", topic: "2.9",
    questionType: "document", difficulty: "hard",
    question: "Brutus warned that the justices would be \"totally independent . . . No errors they may commit can be corrected by any power above them . . . nor can they be removed from office for making ever so many erroneous adjudications.\" Which later development most directly answers the second half of that complaint?",
    options: ["the House's power to impeach federal judges for criminal or unethical conduct", "the Senate's use of the blue slip for district court nominees", "the rule of four governing which appeals the Court accepts", "the practice of publishing dissenting opinions alongside the majority"],
    answer: "the House's power to impeach federal judges for criminal or unethical conduct",
    explanation: "Impeachment is the only removal mechanism, and Congress has used it on 15 judges. It also proves Brutus's narrower point: judges are removed for misconduct like Pickering's, never for rulings other branches dislike."
  },
  {
    id: "gp016", term: "overturning precedent", area: "courts", topic: "2.9",
    questionType: "compare", difficulty: "easy",
    question: "Brown v. Board of Education (1954) is a standard example of the Court overturning precedent because it reversed the rule established in",
    options: ["Plessy v. Ferguson (1896)", "Marbury v. Madison (1803)", "Dred Scott v. Sandford (1857)", "Lochner v. New York (1905)"],
    answer: "Plessy v. Ferguson (1896)",
    explanation: "Plessy blessed \"separate but equal\"; Brown held that separate facilities are inherently unequal under the Fourteenth Amendment. Dred Scott was undone by the Fourteenth Amendment itself, not by a later ruling."
  },
  {
    id: "gp017", term: "precedent", area: "courts", topic: "2.9",
    questionType: "process", difficulty: "medium",
    question: "AMSCO notes that the Supreme Court's binding precedent, combined with judicial review, has let it shape national policy. Which sequence best describes how that happens?",
    options: ["the Court decides one case, and every lower court must then apply that rule", "Congress adopts the Court's reasoning as a statute before it takes effect", "the president issues an executive order restating the Court's holding", "the states ratify the ruling before it binds their courts"],
    answer: "the Court decides one case, and every lower court must then apply that rule",
    explanation: "One decision propagates downward through every court in the country, which is how a single case becomes national policy. Nothing in the process requires the other branches or the states to sign off first."
  },
  {
    id: "gp018", term: "stare decisis", area: "courts", topic: "2.9",
    questionType: "scenario", difficulty: "hard",
    question: "Critics argue that when the Court reverses its own precedents, it damages its own legitimacy. The strongest version of that argument is that reversals",
    options: ["make the law look like a product of who happens to be sitting rather than of the Constitution", "violate Article III, which requires the Court to follow its own earlier holdings unless Congress acts", "transfer the Court's authority to the state supreme courts", "leave the lower federal courts with no rule at all to apply"],
    answer: "make the law look like a product of who happens to be sitting rather than of the Constitution",
    explanation: "The worry is about reliability. If a seat changes hands and the law changes with it, the ruling starts to look like an opinion poll of nine people. Article III says nothing about stare decisis, and a reversal still leaves lower courts a rule - the new one."
  },

  // =====================================================================
  // TOPIC 2.10 - THE COURT IN ACTION
  // =====================================================================
  {
    id: "gp019", term: "rule of four", area: "courts", topic: "2.10",
    questionType: "definition", difficulty: "easy",
    question: "Under the rule of four, an appeal is added to the Supreme Court's docket when",
    options: ["four of the nine justices agree to hear it", "four circuits have reached conflicting decisions", "the case has been argued in four lower courts", "four members of the Senate Judiciary Committee request it"],
    answer: "four of the nine justices agree to hear it",
    explanation: "Four is deliberately less than a majority, so a bloc that could not win the case can still force the Court to look at it. AMSCO frames that as a nod to claims brought by minorities."
  },
  {
    id: "gp020", term: "petition for certiorari", area: "courts", topic: "2.10",
    questionType: "process", difficulty: "easy",
    question: "A party who has lost in a U.S. circuit court and wants the Supreme Court to take the case files",
    options: ["a petition for certiorari", "an amicus curiae brief", "a writ of mandamus", "a concurring opinion"],
    answer: "a petition for certiorari",
    explanation: "The petition is a brief arguing that the lower court erred. An amicus brief comes from someone who is not a party, and a concurrence is written by a justice after the case has already been decided."
  },
  {
    id: "gp021", term: "majority opinion", area: "courts", topic: "2.10",
    questionType: "definition", difficulty: "easy",
    question: "The majority opinion in a Supreme Court case",
    options: ["states the Court's ruling and the reasoning behind it", "records the objections of the justices who lost", "is issued only when the decision is unanimous", "explains why the Court declined to hear an appeal"],
    answer: "states the Court's ruling and the reasoning behind it",
    explanation: "AMSCO puts the majority opinion alongside a statute and an executive order: it is the judiciary's contribution to national law. The losing justices write dissents, which carry no legal force."
  },
  {
    id: "gp022", term: "concurring opinion", area: "courts", topic: "2.10",
    questionType: "compare", difficulty: "medium",
    question: "A justice votes with the five-member majority but thinks the majority reached the right result for the wrong reasons. She will most likely write",
    options: ["a concurring opinion", "a dissenting opinion", "a per curiam opinion", "an amicus curiae brief"],
    answer: "a concurring opinion",
    explanation: "Concurrence is agreement with the outcome plus a different route to it. A dissent would mean voting against the result, and a justice never files an amicus brief in her own Court's case."
  },
  {
    id: "gp023", term: "dissenting opinion", area: "courts", topic: "2.10",
    questionType: "application", difficulty: "medium",
    question: "A dissenting opinion has no immediate legal effect. AMSCO says justices write them anyway in order to",
    options: ["speak to the legal community and shape how later courts think", "force the Court to rehear the case the following term", "give the losing party grounds for a second appeal", "record a formal objection that Congress must answer"],
    answer: "speak to the legal community and shape how later courts think",
    explanation: "Brandeis's dissent on stare decisis is the example the chapter itself leans on. A dissent is an argument addressed to the future, not a procedural move that reopens the case."
  },
  {
    id: "gp024", term: "per curiam opinion", area: "courts", topic: "2.10",
    questionType: "definition", difficulty: "hard",
    question: "A per curiam opinion is distinctive because it is issued",
    options: ["without the full explanation that normally accompanies a decision", "by the chief justice alone on behalf of the Court", "only in cases arising under the Court's original jurisdiction", "before oral argument has taken place"],
    answer: "without the full explanation that normally accompanies a decision",
    explanation: "Per curiam means \"by the court\": a ruling with no authoring justice named and no extended reasoning. It is a decision without the usual paperwork, not a decision made by one person."
  },
  {
    id: "gp025", term: "strict constructionist", area: "courts", topic: "2.10",
    questionType: "definition", difficulty: "medium",
    question: "A strict constructionist approaches the Constitution by",
    options: ["reading it in its original context and striking laws down only on a clear conflict", "updating its meaning to fit contemporary social conditions", "deferring to whatever interpretation the president advances", "following the most recent Supreme Court precedent in every case regardless of the text"],
    answer: "reading it in its original context and striking laws down only on a clear conflict",
    explanation: "Scalia's joke about the \"living Constitution judge\" who comes home saying the document means whatever he thinks it ought to mean is aimed squarely at the liberal constructionist view described in the second option."
  },
  {
    id: "gp026", term: "liberal constructionist", area: "courts", topic: "2.10",
    questionType: "application", difficulty: "medium",
    question: "Which statement would a liberal constructionist be most likely to make?",
    options: ["\"Ratification was two centuries ago; the document has to be read against conditions since.\"", "\"If the framers did not put it in the document, the Court has no business reading it in now.\"", "\"Any law a legislature passes should be presumed constitutional.\"", "\"A court should never overturn one of its own earlier rulings.\""],
    answer: "\"Ratification was two centuries ago; the document has to be read against conditions since.\"",
    explanation: "The living-document reading is the defining move. The second statement is the strict constructionist's creed, and the last two describe restraint and stare decisis, which either camp may invoke."
  },
  {
    id: "gp027", term: "original jurisdiction", area: "courts", topic: "2.10",
    questionType: "scenario", difficulty: "medium",
    question: "Oregon sues Idaho directly in the Supreme Court over a disputed stretch of their shared border. This case reaches the Court through",
    options: ["its original jurisdiction", "its appellate jurisdiction", "a petition for certiorari from the Ninth Circuit", "a referral from the solicitor general"],
    answer: "its original jurisdiction",
    explanation: "One state suing another is the classic original-jurisdiction case, and one of the rare occasions the Supreme Court acts as a trial court. Nearly everything else on its docket arrives on appeal."
  },
  {
    id: "gp028", term: "appellate jurisdiction", area: "courts", topic: "2.10",
    questionType: "application", difficulty: "medium",
    question: "AMSCO notes that about two-thirds of the appeals the Supreme Court hears come from the U.S. circuit courts rather than from state courts. The reason given is that",
    options: ["the Court has more direct jurisdiction over cases that began in federal district courts", "state supreme courts are barred from deciding federal questions and must send them up instead", "state cases must first be reviewed by a U.S. circuit court", "the solicitor general may appeal only federal cases"],
    answer: "the Court has more direct jurisdiction over cases that began in federal district courts",
    explanation: "The federal ladder runs district to circuit to Supreme Court without a detour. State cases can arrive, but the path is narrower, so the federal system supplies most of the docket."
  },
  {
    id: "gp029", term: "implementation", area: "courts", topic: "2.10",
    questionType: "case", difficulty: "medium",
    question: "\"John Marshall has made his decision, now let him enforce it,\" Andrew Jackson is said to have remarked. The comment points to which limit on the judiciary?",
    options: ["courts depend on other actors to put their rulings into effect", "courts may hear only cases involving federal law", "courts cannot rule on disputes between a state and the federal government", "courts must wait for Congress to grant them jurisdiction over each case"],
    answer: "courts depend on other actors to put their rulings into effect",
    explanation: "Nine justices in Washington cannot enforce anything themselves; they need the president, marshals, agencies, or money from Congress. Little Rock in 1957 shows the opposite case, with troops sent to carry a ruling out."
  },
  {
    id: "gp030", term: "implementation", area: "courts", topic: "2.10",
    questionType: "scenario", difficulty: "easy",
    question: "A state judge issues a restraining order against an individual. Who actually carries it out?",
    options: ["law enforcement officers", "the judge's own clerks", "the state legislature", "the plaintiff who requested it"],
    answer: "law enforcement officers",
    explanation: "AMSCO uses this small example to make the branch-level point: a judge orders, and the executive restrains. The pattern scales all the way up to federal troops escorting students into a school."
  },
  {
    id: "gp031", term: "court-packing plan", area: "courts", topic: "2.10",
    questionType: "case", difficulty: "medium",
    question: "Franklin Roosevelt's 1937 plan would have let him appoint a new justice for every sitting justice over the age of 70. His stated reason was the Court's overloaded docket; his actual aim was to",
    options: ["dilute the conservative majority that had been striking down New Deal programs", "force the retirement of Chief Justice Charles Evans Hughes, who was then past seventy", "shift the Court's caseload to the circuit courts", "end the practice of judicial review altogether"],
    answer: "dilute the conservative majority that had been striking down New Deal programs",
    explanation: "The \"Four Horsemen\" had invalidated the National Recovery Act and other measures. The plan failed anyway: conservatives and liberals alike read it as an attack on judicial independence."
  },
  {
    id: "gp032", term: "court-packing plan", area: "courts", topic: "2.10",
    questionType: "case", difficulty: "hard",
    question: "The court-packing plan lost its urgency after West Coast Hotel v. Parrish (1937), an episode nicknamed \"the switch in time that saved nine,\" because in that case",
    options: ["a conservative justice changed position and the Court upheld a state minimum wage law", "Congress voted down the plan by a wide margin", "Roosevelt withdrew the proposal in exchange for two vacancies", "the Court agreed to take up the remaining New Deal cases on an expedited schedule that term"],
    answer: "a conservative justice changed position and the Court upheld a state minimum wage law",
    explanation: "Justice Owen Roberts moved, Washington's minimum wage survived, and after that the Court upheld every New Deal measure it saw. Adding justices no longer bought Roosevelt anything."
  },
  {
    id: "gp033", term: "Eleventh Amendment", area: "courts", topic: "2.10",
    questionType: "process", difficulty: "hard",
    question: "The Eleventh Amendment is unusual among the amendments because it",
    options: ["altered the jurisdiction of the judicial branch itself", "was ratified without the approval of three-fourths of the states", "was the only amendment ratified by state conventions instead of state legislatures", "was proposed by the Supreme Court rather than by Congress"],
    answer: "altered the jurisdiction of the judicial branch itself",
    explanation: "It answered Chisolm v. Georgia by pulling certain suits against states out of the federal courts. AMSCO calls it the only amendment to change what the judicial branch may hear."
  },
  {
    id: "gp034", term: "Sixteenth Amendment", area: "courts", topic: "2.10",
    questionType: "compare", difficulty: "medium",
    question: "Congress's income tax statute was struck down in the 1890s; the Sixteenth Amendment (1913) put the power beyond doubt. The episode illustrates that",
    options: ["amending the Constitution is the surest way to undo a Supreme Court ruling", "the Court may reverse one of its own rulings only after an amendment is proposed", "Congress can overturn a decision by passing the same law twice", "the states may nullify a ruling they consider mistaken"],
    answer: "amending the Constitution is the surest way to undo a Supreme Court ruling",
    explanation: "Surest, but hardest. AMSCO lists the failed attempts - over abortion, same-sex marriage, and flag burning - and notes that passing a slightly different statute is usually the more practical route."
  },
  {
    id: "gp035", term: "Warren Court", area: "courts", topic: "2.10",
    questionType: "case", difficulty: "medium",
    question: "Why did some critics of the Warren Court call for Earl Warren's impeachment, and why did the calls go nowhere?",
    options: ["they objected to unpopular rulings, which are not impeachable offenses", "they objected to his wartime record, which predated his appointment", "they lacked the two-thirds House majority impeachment requires", "the Senate had already refused to confirm him as chief justice"],
    answer: "they objected to unpopular rulings, which are not impeachable offenses",
    explanation: "Impeachment reaches bribery or a failure to do the job, not decisions people dislike. With life tenure intact, only retirement or death could change the Court's makeup - which is the legitimacy debate in miniature."
  },
  {
    id: "gp036", term: "Burger Court", area: "courts", topic: "2.10",
    questionType: "compare", difficulty: "hard",
    question: "Nixon chose Warren Burger expecting a conservative turn. What actually happened?",
    options: ["the Court stayed on roughly the path Warren had set, deciding Roe v. Wade and upholding school busing", "the Court reversed nearly every major Warren-era ruling on criminal procedure within a decade of his arrival", "the Court stopped hearing civil liberties cases altogether", "Burger resigned before writing a single majority opinion"],
    answer: "the Court stayed on roughly the path Warren had set, deciding Roe v. Wade and upholding school busing",
    explanation: "Burger joined six colleagues in Roe and wrote a unanimous opinion sustaining court-ordered busing. His difficulty was assembling majorities at all, which let the caseload swell toward 150 appeals a year."
  },
  {
    id: "gp037", term: "Rehnquist Court", area: "courts", topic: "2.10",
    questionType: "compare", difficulty: "medium",
    question: "Which pair accurately describes the Rehnquist Court?",
    options: ["a lighter caseload and better conference procedure, alongside a shift toward strict construction", "a heavier caseload and looser conference procedure, alongside a shift toward liberal construction", "a lighter caseload and the abandonment of judicial review", "a heavier caseload and a return to Marshall-style unanimity"],
    answer: "a lighter caseload and better conference procedure, alongside a shift toward strict construction",
    explanation: "Justices across the spectrum welcomed the procedural changes after Burger's backlog. The ideological shift came separately, as more strict constructionists joined the man once nicknamed \"the Lone Ranger\" for dissenting alone."
  },
  {
    id: "gp038", term: "majority opinion", area: "courts", topic: "2.10",
    questionType: "process", difficulty: "hard",
    question: "Once the Court reaches a majority, who decides which justice writes the opinion?",
    options: ["the chief justice, or the most senior justice in the majority if the chief is not in it", "whichever justice was assigned to study the petition when the Court voted to grant certiorari", "the justice with the longest total service on the Court", "the full Court, by a separate vote taken in conference"],
    answer: "the chief justice, or the most senior justice in the majority if the chief is not in it",
    explanation: "Assignment follows the majority, not the bench as a whole. The chief typically hands the opinion to someone with expertise in the area or an obvious passion for the issue, which is real influence over how a ruling reads."
  },
  {
    id: "gp039", term: "strict constructionist", area: "courts", topic: "2.10",
    questionType: "case", difficulty: "hard",
    question: "In Lochner v. New York (1905) the Court struck down a state law capping bakers' hours. AMSCO describes this as conservative activism because the Court",
    options: ["invalidated a progressive statute passed by an elected legislature", "deferred to the legislature rather than protecting contract rights", "refused to hear the case on the grounds that the bakers lacked standing", "applied a precedent set by the Warren Court decades later"],
    answer: "invalidated a progressive statute passed by an elected legislature",
    explanation: "Activism describes the act of striking a law down; the direction depends on what is struck. Lochner erased a liberal statute, while Roe erased a conservative one - both activist, in opposite directions."
  },
  {
    id: "gp040", term: "petition for certiorari", area: "courts", topic: "2.10",
    questionType: "process", difficulty: "hard",
    question: "In deciding whether to grant an appeal, the justices weigh past precedents, the wider national impact, and one requirement about the petitioner. That requirement is that the petitioner must",
    options: ["show actual damage rather than a hypothetical injury", "have lost by a unanimous vote in the court below", "be represented by the solicitor general", "have exhausted every state remedy first"],
    answer: "show actual damage rather than a hypothetical injury",
    explanation: "The Court does not answer abstract questions. Once a claim clears that bar it goes on the \"discuss list,\" where impact on the parties and on the country decides whether four justices are willing."
  },
  {
    id: "gp041", term: "dissenting opinion", area: "courts", topic: "2.10",
    questionType: "compare", difficulty: "easy",
    question: "Which of these opinions carries the force of law?",
    options: ["the majority opinion", "the dissenting opinion", "a concurring opinion written by two justices", "an amicus curiae brief filed by the solicitor general"],
    answer: "the majority opinion",
    explanation: "Only the majority states what the Court has decided. Concurrences and dissents explain individual thinking, and an amicus brief is an outsider's argument submitted before the ruling exists."
  },
  {
    id: "gp042", term: "Warren Court", area: "courts", topic: "2.10",
    questionType: "case", difficulty: "easy",
    question: "Which ruling belongs to the Warren Court?",
    options: ["Miranda v. Arizona (1966)", "Roe v. Wade (1973)", "Lochner v. New York (1905)", "Citizens United v. FEC (2010)"],
    answer: "Miranda v. Arizona (1966)",
    explanation: "Miranda, Mapp, Gideon, Engel and Tinker are all Warren Court decisions extending rights and liberties. Roe came under Burger, Lochner under the Fuller Court, and Citizens United under Roberts."
  },

  // =====================================================================
  // TOPIC 2.11 - CHECKS ON THE JUDICIAL BRANCH
  // =====================================================================
  {
    id: "gp043", term: "judicial activism", area: "checks", topic: "2.11",
    questionType: "definition", difficulty: "easy",
    question: "A court is exercising judicial activism when it",
    options: ["strikes down a law or reverses established public policy", "declines to hear an appeal from a lower court", "waits for Congress to clarify an ambiguous statute", "applies a precedent set by a higher court"],
    answer: "strikes down a law or reverses established public policy",
    explanation: "The memory hook AMSCO offers is judges acting to shape the law. Declining a case and following precedent are the opposite instinct - restraint."
  },
  {
    id: "gp044", term: "judicial restraint", area: "checks", topic: "2.11",
    questionType: "definition", difficulty: "easy",
    question: "Judicial restraint holds that a court should declare a law unconstitutional only when",
    options: ["the law clearly and directly contradicts the Constitution", "a majority of the public opposes the law", "the president asks the Court to review it", "the law was passed by a previous administration of the other party"],
    answer: "the law clearly and directly contradicts the Constitution",
    explanation: "The restraint argument is democratic: elected legislatures should make policy, and judges should not substitute their own reading of a contemporary Constitution. Doing otherwise is what critics call legislating from the bench."
  },
  {
    id: "gp045", term: "mixed", area: "checks", topic: "2.11",
    questionType: "compare", difficulty: "medium",
    question: "Which pairing correctly matches the practice to the concept?",
    options: ["A court overturns a state law it finds unconstitutional - judicial activism", "An appeals court refuses to grant an appeal - judicial activism", "A court defers to a policy an elected legislature created - judicial activism", "A court reverses a long-standing precedent - judicial restraint"],
    answer: "A court overturns a state law it finds unconstitutional - judicial activism",
    explanation: "Activism is the act of overruling legislative acts or shaping policy from the bench. Refusing an appeal and deferring to elected bodies are restraint, and so is leaving a precedent alone."
  },
  {
    id: "gp046", term: "judicial activism", area: "checks", topic: "2.11",
    questionType: "application", difficulty: "hard",
    question: "AMSCO stresses that judicial activism is not the property of one ideology. Which pair of rulings best makes that point?",
    options: ["Lochner striking down a labor law and Roe striking down an anti-abortion law", "Marbury establishing judicial review and Brown ending school segregation", "Plessy upholding segregation and Korematsu upholding internment", "Chevron deferring to the EPA and Chadha limiting the legislative veto"],
    answer: "Lochner striking down a labor law and Roe striking down an anti-abortion law",
    explanation: "Each struck a statute, so each was activist; one erased a liberal law and the other a conservative one. The Plessy and Korematsu pairing is the opposite - two cases where the Court let a policy stand."
  },
  {
    id: "gp047", term: "judicial restraint", area: "checks", topic: "2.11",
    questionType: "application", difficulty: "hard",
    question: "Beyond the democratic objection, critics argue that judicial policymaking is simply ineffective. Their reasoning is that judges",
    options: ["lack expertise and staff support on technical matters like schools or pollution", "are barred from considering any evidence beyond what the two parties choose to submit", "must decide every case within a single term", "cannot issue orders that bind government agencies"],
    answer: "lack expertise and staff support on technical matters like schools or pollution",
    explanation: "Lawmakers have committee staffers and researchers; judges have a caseload and no long study of the issue. The result, critics say, is rulings that are not practical for the people asked to implement them."
  },
  {
    id: "gp048", term: "senatorial courtesy", area: "checks", topic: "2.11",
    questionType: "definition", difficulty: "medium",
    question: "Senatorial courtesy gives effective veto power over a U.S. district judge nomination to",
    options: ["the senators from the state where the district sits", "the chair of the Senate Judiciary Committee", "the Senate majority leader", "the senators of the president's party"],
    answer: "the senators from the state where the district sits",
    explanation: "Districts lie entirely within one state, so home-state senators guard the seat and the other 98 follow their lead. It is the reason presidents consult those senators before naming anyone."
  },
  {
    id: "gp049", term: "blue slip", area: "checks", topic: "2.11",
    questionType: "process", difficulty: "medium",
    question: "A home-state senator who wants to stall a district court nomination can simply",
    options: ["never return the blue slip to the Judiciary Committee", "place an anonymous hold on the Supreme Court's docket", "invoke cloture on the nomination", "refer the nominee to the American Bar Association for a rating"],
    answer: "never return the blue slip to the Judiciary Committee",
    explanation: "The chair usually will not schedule a hearing until both slips come back, so silence is as effective as a no. Cloture is a device for ending debate, not for preventing it."
  },
  {
    id: "gp050", term: "litmus test", area: "checks", topic: "2.11",
    questionType: "definition", difficulty: "medium",
    question: "The phrase \"litmus test\" is applied to judicial nominations to describe",
    options: ["judging a nominee's whole philosophy from one pointed question or one prior opinion", "the ABA's formal rating of a nominee's qualifications", "the Senate's practice of requiring only a simple majority to confirm a judicial nominee", "the FBI background check every nominee undergoes"],
    answer: "judging a nominee's whole philosophy from one pointed question or one prior opinion",
    explanation: "The chemistry metaphor is the criticism: a judicial philosophy is not a pH reading. Presidents, senators and pundits all apply such tests anyway."
  },
  {
    id: "gp051", term: "Robert Bork", area: "checks", topic: "2.11",
    questionType: "case", difficulty: "medium",
    question: "The Senate had unanimously confirmed Robert Bork as an appeals court judge in 1981 but rejected him for the Supreme Court in 1987 by a vote of 58-42. The difference was largely that",
    options: ["the confirmation process had turned to focus on a nominee's ideology", "he had been found unqualified by the American Bar Association", "his home-state senators withheld their blue slips", "the Senate had abolished the filibuster for Supreme Court nominees"],
    answer: "the confirmation process had turned to focus on a nominee's ideology",
    explanation: "Bork's advocacy of original intent and his open contempt for Warren Court rulings became the campaign against him. \"To bork\" now means destroying a nominee through a concerted attack on character, background and philosophy."
  },
  {
    id: "gp052", term: "Merrick Garland", area: "checks", topic: "2.11",
    questionType: "case", difficulty: "medium",
    question: "After Justice Scalia died in February 2016, the Senate never voted on Merrick Garland's nomination. What made this constitutionally possible?",
    options: ["nothing in the Constitution sets a timeline for the Senate's confirmation process", "a Supreme Court seat may be filled only in the first three years of a term", "the Judiciary Committee had rated Garland not qualified", "an eight-member Court cannot legally decide cases"],
    answer: "nothing in the Constitution sets a timeline for the Senate's confirmation process",
    explanation: "Advice and consent carries no deadline, so declining to act is itself an answer. Garland had a unanimous \"well qualified\" ABA rating, and the Court functioned with eight members for the ten months the seat stayed open."
  },
  {
    id: "gp053", term: "Clarence Thomas", area: "checks", topic: "2.11",
    questionType: "case", difficulty: "medium",
    question: "The 1991 hearings on Clarence Thomas are cited as a turning point in how confirmations are conducted chiefly because",
    options: ["Anita Hill's televised testimony turned the hearing into a national spectacle", "the Senate rejected him and Thurgood Marshall's seat stayed vacant for nearly a year", "he was the first nominee the ABA refused to rate", "he was confirmed without any Judiciary Committee hearing"],
    answer: "Anita Hill's televised testimony turned the hearing into a national spectacle",
    explanation: "Hill testified for seven hours on live television; Thomas denied the allegations and called it a \"high-tech lynching.\" After a tie vote in committee, the full Senate confirmed him narrowly."
  },
  {
    id: "gp054", term: "nuclear option", area: "checks", topic: "2.11",
    questionType: "definition", difficulty: "medium",
    question: "In Senate practice, the \"nuclear option\" refers to",
    options: ["changing the chamber's rules by simple majority to bar filibusters of nominees", "refusing to hold a confirmation vote until after an election", "impeaching a sitting federal judge", "stripping the federal courts of their jurisdiction over an entire category of cases"],
    answer: "changing the chamber's rules by simple majority to bar filibusters of nominees",
    explanation: "It earned the name because the minority loses its main weapon on nominations. The first threat came during George W. Bush's first term, when Democrats were blocking appeals court picks."
  },
  {
    id: "gp055", term: "nuclear option", area: "checks", topic: "2.11",
    questionType: "case", difficulty: "hard",
    question: "The first threatened use of the nuclear option, over George W. Bush's stalled appeals court nominees, was defused when",
    options: ["a bipartisan \"Gang of 14\" struck a deal that kept the rules and confirmed most nominees", "the Supreme Court ruled the filibuster unconstitutional", "the president withdrew the ten contested nominations", "the Judiciary Committee agreed to hold no further hearings on nominees until after the next election"],
    answer: "a bipartisan \"Gang of 14\" struck a deal that kept the rules and confirmed most nominees",
    explanation: "Fourteen senators traded a rules change for votes on the backlog - one Bush nominee had already waited four years. The option itself stayed on the shelf for later."
  },
  {
    id: "gp056", term: "standing", area: "checks", topic: "2.11",
    questionType: "definition", difficulty: "medium",
    question: "Standing refers to",
    options: ["the requirements a party must meet to bring a case to court", "the order in which justices speak during conference", "the seniority that determines who assigns opinions", "a judge's obligation to follow a higher court's ruling"],
    answer: "the requirements a party must meet to bring a case to court",
    explanation: "Article III lets Congress define which parties may go to which courts, which makes standing one of the legislature's quieter levers over the judiciary. The last option describes binding precedent."
  },
  {
    id: "gp057", term: "court-stripping", area: "checks", topic: "2.11",
    questionType: "scenario", difficulty: "hard",
    question: "In 2003-2005 the House voted to take away the federal courts' power to hear challenges to the phrase \"under God\" in the Pledge of Allegiance, and to deny funds for implementing any such ruling. This is an example of",
    options: ["court-stripping", "the legislative veto", "committee clearance", "senatorial courtesy"],
    answer: "court-stripping",
    explanation: "Court-stripping removes a subject from the courts' jurisdiction rather than reversing a ruling. The Senate never passed the measure, so the courts kept hearing those cases."
  },
  {
    id: "gp058", term: "solicitor general", area: "checks", topic: "2.11",
    questionType: "definition", difficulty: "medium",
    question: "The solicitor general's central job is to",
    options: ["decide which cases the United States appeals to the Supreme Court and argue them there", "run the FBI's investigations of federal crimes", "advise the president on which judges to nominate", "review each case the circuit courts decide and recommend which of them the Court should take"],
    answer: "decide which cases the United States appeals to the Supreme Court and argue them there",
    explanation: "A case styled \"United States v. someone\" means the government lost below and the solicitor general sought review. Stanley Reed, Thurgood Marshall and Elena Kagan all moved from the job to the Court."
  },
  {
    id: "gp059", term: "amicus curiae brief", area: "checks", topic: "2.11",
    questionType: "application", difficulty: "medium",
    question: "The solicitor general files a brief urging a particular outcome in a case where the United States is not a party. That filing is",
    options: ["an amicus curiae brief", "a petition for certiorari", "a concurring opinion", "a writ of certiorari"],
    answer: "an amicus curiae brief",
    explanation: "Amicus curiae means friend of the court: an argument from someone with an interest but no stake as a litigant. A certiorari petition would mean the government was a party asking for review."
  },
  {
    id: "gp060", term: "attorney general", area: "checks", topic: "2.11",
    questionType: "definition", difficulty: "easy",
    question: "The attorney general heads which department?",
    options: ["the Department of Justice", "the Department of Homeland Security", "the Department of the Treasury", "the Department of State"],
    answer: "the Department of Justice",
    explanation: "Justice investigates federal crimes through the FBI and DEA, prosecutes through U.S. attorneys, and defends the United States when it is sued. It is the executive branch's main point of contact with the courts."
  },
  {
    id: "gp061", term: "impeachment of judges", area: "checks", topic: "2.11",
    questionType: "case", difficulty: "hard",
    question: "Jefferson withdrew his support for impeaching Justice Samuel Chase in 1805, even though Chase was a Federalist opponent. His reason was that he",
    options: ["did not want impeachment to become a routine tool for removing political opponents from the bench", "believed Chase had already agreed to step down at the end of the term if the charges were dropped", "lacked the votes in the House to bring charges", "thought Chase's rulings had been legally correct"],
    answer: "did not want impeachment to become a routine tool for removing political opponents from the bench",
    explanation: "Chase survived the Senate vote and the precedent held: of 15 judges the House has impeached, the charges have run to conduct like Pickering's drunkenness, not to disagreeable rulings."
  },
  {
    id: "gp062", term: "judicial recusal", area: "checks", topic: "2.11",
    questionType: "definition", difficulty: "easy",
    question: "Judicial recusal occurs when a judge",
    options: ["withdraws from a case because of a conflict of interest", "refuses to enforce a higher court's ruling", "retires from the bench before the end of a presidential term", "issues a ruling without a written opinion"],
    answer: "withdraws from a case because of a conflict of interest",
    explanation: "Recusal is one of the courtroom matters Congress has legislated about, alongside procedure and the creation of new judgeships. A ruling without a written opinion is a per curiam decision."
  },
  {
    id: "gp063", term: "American Bar Association", area: "checks", topic: "2.11",
    questionType: "application", difficulty: "easy",
    question: "The American Bar Association's role in judicial confirmations is to",
    options: ["rate nominees as highly qualified, qualified, or not qualified", "vote on whether the nomination reaches the Senate floor", "select the shortlist from which the president chooses", "conduct the background investigation of each nominee"],
    answer: "rate nominees as highly qualified, qualified, or not qualified",
    explanation: "The ABA has testified about nominees since the 1950s and is the most established interest group in the process. It rates; only senators vote."
  },
  {
    id: "gp064", term: "mixed", area: "checks", topic: "2.11",
    questionType: "application", difficulty: "hard",
    question: "Interest groups now shape confirmation fights in several ways. Which is the one AMSCO describes as reaching past Washington to the electorate?",
    options: ["running ads in a senator's home state urging voters to contact the office", "drafting questions for senators to use at the hearing", "testifying before the Judiciary Committee about a nominee's record", "rating the nominee's professional qualifications"],
    answer: "running ads in a senator's home state urging voters to contact the office",
    explanation: "The other three work inside the hearing room. The ad campaign works on the senator's constituents, which is leverage of a different kind - and confirmation hearings were not even public until 1929."
  },
  {
    id: "gp065", term: "standing", area: "checks", topic: "2.11",
    questionType: "scenario", difficulty: "hard",
    question: "A group wants to challenge a new federal regulation but cannot show that any of its members has been harmed by it. The likeliest obstacle is that the group",
    options: ["lacks standing to bring the case", "has filed in a court without appellate jurisdiction", "has not obtained a blue slip from its home-state senators", "must first file an amicus curiae brief"],
    answer: "lacks standing to bring the case",
    explanation: "Courts do not answer questions in the abstract; a claimant has to show actual damage. Blue slips belong to confirmations, and an amicus brief is filed in someone else's case, not as a way to start your own."
  },
  {
    id: "gp066", term: "mixed", area: "checks", topic: "2.11",
    questionType: "compare", difficulty: "medium",
    question: "Which of the following is a power Congress, rather than the president, holds over the federal judiciary?",
    options: ["setting judges' salaries and funding the courts", "nominating judges to fill vacant seats", "deciding which cases the United States appeals", "enforcing court rulings through federal marshals"],
    answer: "setting judges' salaries and funding the courts",
    explanation: "The purse and the structure of the courts belong to Congress, which has more than doubled the number of circuit and district judgeships over fifty years. Nomination, appeals strategy and enforcement are all executive."
  },

  // =====================================================================
  // TOPIC 2.12 - THE BUREAUCRACY: STRUCTURE, TASKS, AND REFORM
  // =====================================================================
  {
    id: "gp067", term: "bureaucracy", area: "bureaucracy", topic: "2.12",
    questionType: "definition", difficulty: "easy",
    question: "The federal bureaucracy is best described as",
    options: ["the hierarchy of executive branch employees who carry out the government's business", "the group of federal judges who review agency decisions", "the committee staff who draft legislation for Congress", "the network of interest groups and lobbyists that press their agendas on executive agencies"],
    answer: "the hierarchy of executive branch employees who carry out the government's business",
    explanation: "Close to 3 million people, from Cabinet secretaries down to IRS accountants. Congress writes the law and creates the agency; the bureaucracy interprets, administers and enforces it."
  },
  {
    id: "gp068", term: "executive departments", area: "bureaucracy", topic: "2.12",
    questionType: "definition", difficulty: "easy",
    question: "How many executive departments does the president oversee, and which is the largest?",
    options: ["15 departments, and Defense is by far the largest", "10 departments, and Homeland Security is the largest", "15 departments, and State is the largest", "20 departments, and Treasury is the largest"],
    answer: "15 departments, and Defense is by far the largest",
    explanation: "Each is run by a Cabinet secretary, and every secretary draws the same salary no matter how big the department. The newest are Energy, Veterans Affairs and Homeland Security."
  },
  {
    id: "gp069", term: "independent executive agency", area: "bureaucracy", topic: "2.12",
    questionType: "application", difficulty: "medium",
    question: "NASA sits in the executive branch but under no department. Congress structured it that way in order to",
    options: ["keep it free of a department's undue influence", "exempt it from congressional oversight", "let its administrator serve a fixed ten-year term", "allow it to write binding regulations for private industry"],
    answer: "keep it free of a department's undue influence",
    explanation: "Independence here means organizational distance from a Cabinet department, not freedom from Congress - which still funds it and calls its director to testify. Rule-writing for an industry is the business of the regulatory agencies."
  },
  {
    id: "gp070", term: "independent commission", area: "bureaucracy", topic: "2.12",
    questionType: "process", difficulty: "medium",
    question: "Why do the members of an independent commission serve staggered terms?",
    options: ["so no single president can replace the whole body at once", "so the commission always has an odd number of members", "so the Senate can confirm them in one batch", "so each member serves under a different committee's oversight"],
    answer: "so no single president can replace the whole body at once",
    explanation: "AMSCO's example is the Federal Reserve Board: if one president named everyone, interest rates could be tuned to an election. Staggering keeps the body neutral rather than political."
  },
  {
    id: "gp071", term: "government corporation", area: "bureaucracy", topic: "2.12",
    questionType: "definition", difficulty: "easy",
    question: "Amtrak, the Tennessee Valley Authority and the Postal Service are examples of",
    options: ["government corporations", "independent regulatory commissions", "Cabinet departments", "issue networks"],
    answer: "government corporations",
    explanation: "They are hybrids of agency and private company, appearing in the 1930s where government wanted to overlap with the private sector. A regulatory commission writes rules for an industry rather than selling a service."
  },
  {
    id: "gp072", term: "iron triangle", area: "bureaucracy", topic: "2.12",
    questionType: "definition", difficulty: "easy",
    question: "The three points of an iron triangle are",
    options: ["a federal agency, a congressional committee, and an interest group", "the president, Congress, and the Supreme Court", "a Cabinet secretary, an agency director, and a career bureaucrat", "a lobbyist, a journalist, and a think tank scholar"],
    answer: "a federal agency, a congressional committee, and an interest group",
    explanation: "The metal in the metaphor is the mutual dependence: the agency wants funding, the committee wants information and PAC support, the group wants friendly rules. The last option describes an issue network."
  },
  {
    id: "gp073", term: "iron triangle", area: "bureaucracy", topic: "2.12",
    questionType: "scenario", difficulty: "medium",
    question: "A trade association's PAC donates to members of the House committee that funds the agency regulating its industry, and those members press the agency to soften a proposed rule. This is best identified as",
    options: ["an iron triangle in operation", "an issue network in operation", "compliance monitoring", "committee clearance"],
    answer: "an iron triangle in operation",
    explanation: "All three corners appear and each is doing what the relationship rewards. An issue network would be a looser, one-issue coalition of experts and advocates rather than this closed and durable arrangement."
  },
  {
    id: "gp074", term: "issue networks", area: "bureaucracy", topic: "2.12",
    questionType: "compare", difficulty: "hard",
    question: "The clearest difference between an issue network and an iron triangle is that an issue network",
    options: ["draws in a shifting mix of experts and advocates around a single issue", "always includes a congressional committee as one of its members", "is created by statute and reports annually to Congress", "operates only inside the executive branch"],
    answer: "draws in a shifting mix of experts and advocates around a single issue",
    explanation: "Committee staffers, academics, think tanks, media and interest groups may collaborate on one policy while opposing each other on everything else. The triangle is three fixed corners; the network is a web."
  },
  {
    id: "gp075", term: "patronage", area: "bureaucracy", topic: "2.12",
    questionType: "definition", difficulty: "easy",
    question: "Patronage is the practice of",
    options: ["rewarding loyal party members with federal jobs", "hiring federal workers through competitive written exams", "letting agencies write the rules that implement a law", "funding an agency at the level its committee recommends"],
    answer: "rewarding loyal party members with federal jobs",
    explanation: "Jefferson filled every vacancy from his own party and the rotation continued as administrations changed. The exam-based alternative is the merit system that eventually replaced it."
  },
  {
    id: "gp076", term: "spoils system", area: "bureaucracy", topic: "2.12",
    questionType: "case", difficulty: "medium",
    question: "AMSCO singles out one agency as the main engine of party machinery under the spoils system. Which was it, and why?",
    options: ["the Post Office, because presidents appointed local postmasters expecting loyalty", "the Treasury, because it controlled the money supply", "the State Department, because ambassadorships were by far the richest patronage prizes", "the Interior Department, because it distributed western land"],
    answer: "the Post Office, because presidents appointed local postmasters expecting loyalty",
    explanation: "Branch offices reached every town, so postmasterships were patronage at scale. By the end of the Civil War the arrangement was entrenched in both state and federal politics, with ample room for corruption."
  },
  {
    id: "gp077", term: "Pendleton Civil Service Act", area: "bureaucracy", topic: "2.12",
    questionType: "case", difficulty: "medium",
    question: "Which event gave civil service reform the momentum that produced the Pendleton Act in 1883?",
    options: ["the assassination of President Garfield by a disappointed office seeker", "the collapse of the Interstate Commerce Commission", "the Supreme Court's ruling that the spoils system violated the Constitution", "the resignation of the entire Civil Service Commission"],
    answer: "the assassination of President Garfield by a disappointed office seeker",
    explanation: "Charles Guiteau pressed Garfield for an appointment, was refused, and shot him three months into the term. An 1870 reform law had already faded; the killing put patronage back on the national agenda."
  },
  {
    id: "gp078", term: "merit system", area: "bureaucracy", topic: "2.12",
    questionType: "compare", difficulty: "easy",
    question: "The merit system differs from the spoils system in that federal jobs go to applicants based on",
    options: ["skill and experience, tested by competitive exams", "length of service to the president's party", "recommendations from home-state senators", "the size of their campaign contributions"],
    answer: "skill and experience, tested by competitive exams",
    explanation: "The Pendleton Act built the exam system and also barred officials from requiring federal employees to give to political campaigns - closing the money loop as well as the hiring one."
  },
  {
    id: "gp079", term: "Civil Service Commission", area: "bureaucracy", topic: "2.12",
    questionType: "process", difficulty: "medium",
    question: "The bipartisan Civil Service Commission created by the Pendleton Act was eventually replaced by",
    options: ["the Office of Personnel Management", "the Office of Management and Budget", "the National Performance Review", "the Office of Information and Regulatory Affairs"],
    answer: "the Office of Personnel Management",
    explanation: "The 1978 reforms handed OPM the merit system and federal hiring, though many larger agencies still do their own. OMB and OIRA are budget and regulatory review offices, and the NPR was a study, not an agency."
  },
  {
    id: "gp165", term: "Office of Personnel Management", area: "bureaucracy", topic: "2.12",
    questionType: "application", difficulty: "medium",
    question: "Which of the following is a responsibility of the Office of Personnel Management?",
    options: ["running the merit system and coordinating federal hiring", "reviewing regulations for their effect on the economy and public health", "preparing the president's annual budget proposal for Congress", "investigating employee disclosures of illegal agency conduct"],
    answer: "running the merit system and coordinating federal hiring",
    explanation: "OPM's stated goals are promoting the ideals of public service, finding the best people for federal jobs, and preserving merit system principles - though many larger agencies still do their own hiring."
  },
  {
    id: "gp080", term: "Civil Service Reform Act", area: "bureaucracy", topic: "2.12",
    questionType: "application", difficulty: "hard",
    question: "Which change did the Civil Service Reform Act of 1978 make?",
    options: ["it altered how a bureaucrat is dismissed and returned upper-level appointments to the president", "it created the merit system and the first competitive exams", "it barred federal employees from disclosing illegal agency conduct", "it required agencies to publish every proposed rule for public comment before the rule could take effect"],
    answer: "it altered how a bureaucrat is dismissed and returned upper-level appointments to the president",
    explanation: "Carter's reform was about performance: easier removal of people not doing the job, more presidential control at the top, limits on veterans' preferences. Exams came in 1883, comment periods in 1946, whistleblower protection in 1989."
  },
  {
    id: "gp081", term: "National Performance Review", area: "bureaucracy", topic: "2.12",
    questionType: "case", difficulty: "medium",
    question: "Clinton's National Performance Review characterized the federal government as \"an industrial-era structure operating in an information age.\" Its nearly 400 recommendations were aimed at",
    options: ["cutting paperwork, empowering employees and producing cheaper government", "shifting whole federal programs to the states through block grants instead", "replacing the merit system with performance contracts", "reducing the number of Cabinet departments from fifteen to ten"],
    answer: "cutting paperwork, empowering employees and producing cheaper government",
    explanation: "The report \"From Red Tape to Results\" argued the bureaucracy had accumulated so many rules and procedures it could not do what Congress intended. More discretion moved toward the agencies themselves."
  },
  {
    id: "gp082", term: "compliance monitoring", area: "bureaucracy", topic: "2.12",
    questionType: "definition", difficulty: "easy",
    question: "Compliance monitoring means checking that",
    options: ["regulated firms are actually following the standards that apply to them", "agencies are spending only what Congress appropriated", "federal employees are hired through the merit system", "every proposed rule has been properly published in the Federal Register beforehand"],
    answer: "regulated firms are actually following the standards that apply to them",
    explanation: "The EPA does it by requiring permits, taking air and water samples near a factory, and following up after a ruling. Watching agency spending is Congress's oversight job, not compliance monitoring."
  },
  {
    id: "gp083", term: "administrative adjudication", area: "bureaucracy", topic: "2.12",
    questionType: "definition", difficulty: "hard",
    question: "When a regulatory agency acts like a court and imposes a fine, AMSCO calls this administrative adjudication and notes that it targets",
    options: ["industries and companies rather than individual citizens", "state governments that fail to enforce federal standards", "federal employees who violate agency rules", "members of Congress who interfere with an investigation"],
    answer: "industries and companies rather than individual citizens",
    explanation: "The example is the Deepwater Horizon spill, where civil penalties ran from roughly $400 million in FY2013 to about $160 million in FY2016. The target is the regulated firm, which is why the penalties are civil rather than criminal."
  },
  {
    id: "gp084", term: "bureaucracy", area: "bureaucracy", topic: "2.12",
    questionType: "application", difficulty: "medium",
    question: "FBI Director James Comey appeared before the Senate Intelligence Committee in 2017 to answer questions about his bureau's investigation. Which bureaucratic task does this illustrate?",
    options: ["testifying before Congress as an expert in the agency's field", "issuing rules under delegated discretionary authority", "conducting administrative adjudication", "performing compliance monitoring"],
    answer: "testifying before Congress as an expert in the agency's field",
    explanation: "Cabinet secretaries and agency directors are usually the people who know the most about their subject, so committees call them. Rule-writing, fines and inspections are the agency's other core tasks."
  },
  {
    id: "gp085", term: "bureaucracy", area: "bureaucracy", topic: "2.12",
    questionType: "process", difficulty: "hard",
    question: "The Clean Water Act told the EPA that \"the nation's waters should be free of pollutants\" and gave it authority to set standards and make necessary rules. AMSCO uses that language to show that",
    options: ["Congress sets broad goals and leaves the technical standards to agency experts", "Congress must approve each pollution standard the EPA writes before it takes effect", "the EPA may enforce only standards the courts have already upheld", "the president writes the standards and the EPA enforces them"],
    answer: "Congress sets broad goals and leaves the technical standards to agency experts",
    explanation: "Few of the 535 legislators are environmental scientists, so the statute states an aim and delegates the rest. That delegation is what makes the bureaucracy powerful - and what makes accountability hard to trace."
  },
  {
    id: "gp086", term: "executive departments", area: "bureaucracy", topic: "2.12",
    questionType: "application", difficulty: "medium",
    question: "ICE, the Coast Guard and the Transportation Security Administration all sit inside which department?",
    options: ["Homeland Security", "Defense", "Justice", "Transportation"],
    answer: "Homeland Security",
    explanation: "They are agencies within the department, sharing the job of protecting the country and its citizens. Departments house agencies; agencies divide the department's goals and workload."
  },
  {
    id: "gp087", term: "patronage", area: "bureaucracy", topic: "2.12",
    questionType: "scenario", difficulty: "hard",
    question: "On Inauguration Day in 1829, job-hungry crowds pushed into the White House seeking appointments from Andrew Jackson. A student citing this episode is best using it as evidence about",
    options: ["how openly patronage operated before civil service reform", "how the merit system screened applicants by examination", "how senators used advice and consent to block appointments", "how government corporations recruited private-sector managers"],
    answer: "how openly patronage operated before civil service reform",
    explanation: "The scene is famous because nobody was hiding anything: federal jobs were the open reward for party loyalty, and the rotation continued each time a new party took office. Hiring by examination was still half a century away."
  },
  {
    id: "gp088", term: "independent commission", area: "bureaucracy", topic: "2.12",
    questionType: "compare", difficulty: "medium",
    question: "How does an independent commission differ structurally from a Cabinet agency?",
    options: ["it is run by a board of five to seven members rather than a single head", "it reports to Congress instead of to the president", "its members are elected rather than appointed", "it may not impose fines on private companies without first obtaining a court order"],
    answer: "it is run by a board of five to seven members rather than a single head",
    explanation: "Cabinet agencies and executive agencies each have one director; commissions govern by board. That board, with its staggered terms, is the design that keeps the body from turning over with each administration."
  },
  {
    id: "gp089", term: "merit system", area: "bureaucracy", topic: "2.12",
    questionType: "application", difficulty: "hard",
    question: "AMSCO argues that a professional, specialized and politically neutral workforce matters because it",
    options: ["lets the bureaucracy do its job well regardless of which party holds power", "removes the need for congressional oversight of agencies", "prevents the president from setting the executive agenda", "guarantees that an agency's rules will survive any challenge brought in federal court"],
    answer: "lets the bureaucracy do its job well regardless of which party holds power",
    explanation: "Neutral competence is the whole aim of reform, from the Pendleton exams to OPM. It does not free agencies from oversight, and it certainly does not make their rules court-proof."
  },
  {
    id: "gp090", term: "issue networks", area: "bureaucracy", topic: "2.12",
    questionType: "scenario", difficulty: "medium",
    question: "On a proposed data-privacy rule, committee staffers, two university researchers, a think tank analyst, a consumer advocate and several reporters work together, though they disagree on nearly everything else. This is",
    options: ["an issue network", "an iron triangle", "an independent commission", "an oversight hearing"],
    answer: "an issue network",
    explanation: "One issue, a temporary coalition, and no requirement that the members be allies elsewhere. AMSCO credits the growth of such networks to overlapping issues, the proliferation of interest groups, and industry influence."
  },

  // =====================================================================
  // TOPIC 2.13 - DISCRETIONARY AND RULE-MAKING AUTHORITY
  // =====================================================================
  {
    id: "gp091", term: "delegated discretionary authority", area: "bureaucracy", topic: "2.13",
    questionType: "definition", difficulty: "easy",
    question: "Delegated discretionary authority is the power of an agency to",
    options: ["interpret legislation and write the rules that implement it", "veto a bill it believes is unworkable", "appoint its own director without Senate confirmation", "decide which lawsuits against the United States to settle"],
    answer: "interpret legislation and write the rules that implement it",
    explanation: "Congress creates the agency, funds it and states the mission, then leaves the specifics to the people who understand the field. That handoff is what turns a statute into an enforceable rule."
  },
  {
    id: "gp092", term: "delegated discretionary authority", area: "bureaucracy", topic: "2.13",
    questionType: "scenario", difficulty: "hard",
    question: "The Clean Air Act never mentions greenhouse gases, yet the EPA developed regulations covering them. AMSCO uses this to show that",
    options: ["vague statutory language can let an agency claim broad authority on its own", "agencies may regulate only substances a statute names explicitly", "Congress must amend a law before an agency can issue any new rule", "the president can extend an agency's jurisdiction by executive order"],
    answer: "vague statutory language can let an agency claim broad authority on its own",
    explanation: "Sometimes a law is so vague it is not even clear that authority was delegated, and the agency simply asserts it. That is the practical reach of discretion - and the reason critics call agencies a fourth branch."
  },
  {
    id: "gp093", term: "Administrative Procedures Act", area: "bureaucracy", topic: "2.13",
    questionType: "definition", difficulty: "medium",
    question: "The Administrative Procedures Act of 1946 governs agency rule making by",
    options: ["making the process fair and transparent and guaranteeing affected parties a say", "requiring congressional approval of every final regulation", "limiting each agency to ten new rules per year", "transferring rule-writing authority from the agencies to the federal courts of appeals"],
    answer: "making the process fair and transparent and guaranteeing affected parties a say",
    explanation: "The APA is the procedural spine of the modern administrative state. AMSCO frames the input it guarantees as one of many access points where stakeholders can promote their interests."
  },
  {
    id: "gp094", term: "notice-and-comment opportunity", area: "bureaucracy", topic: "2.13",
    questionType: "process", difficulty: "medium",
    question: "The notice-and-comment opportunity in rule making exists so that",
    options: ["citizens and affected industries can respond to a proposed rule before it is final", "Congress can review a rule during a mandatory 30-day waiting period", "the agency can publish the finished regulation in the Code of Federal Regulations", "the president's budget office can screen the rule for economic impact"],
    answer: "citizens and affected industries can respond to a proposed rule before it is final",
    explanation: "Some statutes require hearings outright; other agencies hold public meetings or run webcasts and interactive sessions to widen the input. The waiting period is the legislative veto, and the economic screen is OIRA's job."
  },
  {
    id: "gp095", term: "Federal Register", area: "bureaucracy", topic: "2.13",
    questionType: "compare", difficulty: "medium",
    question: "What is the difference between the Federal Register and the Code of Federal Regulations?",
    options: ["the Register records how a regulation developed; the Code holds the finished rule", "the Register holds the finished rule; the Code records congressional debate", "the Register covers agencies; the Code covers Cabinet departments", "the Register is published by Congress; the Code is published by the courts"],
    answer: "the Register records how a regulation developed; the Code holds the finished rule",
    explanation: "One is the running account - how a rule started, how it changed, how it landed. The other is the tidy shelf where the final text lives once the process is over."
  },
  {
    id: "gp096", term: "Code of Federal Regulations", area: "bureaucracy", topic: "2.13",
    questionType: "definition", difficulty: "easy",
    question: "A completed federal regulation is finally printed in",
    options: ["the Code of Federal Regulations", "the Federal Register", "the Congressional Record", "the United States Reports"],
    answer: "the Code of Federal Regulations",
    explanation: "The Code arranges finished regulations cleanly by subject. The Congressional Record covers floor proceedings and the United States Reports collect Supreme Court opinions."
  },
  {
    id: "gp097", term: "independent regulatory agencies", area: "bureaucracy", topic: "2.13",
    questionType: "application", difficulty: "hard",
    question: "A president dislikes the direction of an independent regulatory agency and wants its director gone. What constrains him?",
    options: ["he can remove the director only by showing cause", "he must obtain a two-thirds vote of the Senate", "he must wait until the director's fixed term expires", "he cannot remove the director under any circumstances"],
    answer: "he can remove the director only by showing cause",
    explanation: "Ordinary executive appointees serve at the president's pleasure; these directors do not. That protection, plus staggered board terms, is what makes the agency independent and limits presidential influence over its rules."
  },
  {
    id: "gp098", term: "Environmental Protection Agency", area: "bureaucracy", topic: "2.13",
    questionType: "definition", difficulty: "easy",
    question: "The stated mission of the Environmental Protection Agency is to",
    options: ["protect human health and the environment", "regulate interstate commerce in energy", "manage federal lands and national parks", "enforce workplace safety standards"],
    answer: "protect human health and the environment",
    explanation: "Founded in 1970, the EPA enforces statutes like the Clean Water and Clean Air Acts. Federal lands belong to Interior, and workplace safety to Labor."
  },
  {
    id: "gp099", term: "Federal Election Commission", area: "bureaucracy", topic: "2.13",
    questionType: "definition", difficulty: "medium",
    question: "The Federal Election Commission is charged with",
    options: ["administering and enforcing federal campaign finance law", "drawing congressional district boundaries after each census", "certifying the results of presidential elections", "registering voters in federal elections"],
    answer: "administering and enforcing federal campaign finance law",
    explanation: "Its jurisdiction covers financing for House, Senate, presidential and vice-presidential campaigns. Redistricting belongs to the states, and no federal agency certifies the presidential result."
  },
  {
    id: "gp100", term: "Federal Election Commission", area: "bureaucracy", topic: "2.13",
    questionType: "case", difficulty: "hard",
    question: "AMSCO describes the FEC as weakened in recent years. Besides the Citizens United and McCutcheon rulings, what left it unable to issue fines, conduct audits or open investigations?",
    options: ["a 2019 resignation dropped it below the four-member quorum it needs", "Congress eliminated its enforcement division in the 2018 budget", "a federal court suspended its rule-making authority", "its commissioners' staggered terms all expired in the same year"],
    answer: "a 2019 resignation dropped it below the four-member quorum it needs",
    explanation: "Many argue the agency still holds the rule-making power to tighten campaign finance rules even after those decisions, but weak leadership stalled the effort - and without a quorum it cannot act at all."
  },
  {
    id: "gp101", term: "Securities and Exchange Commission", area: "bureaucracy", topic: "2.13",
    questionType: "application", difficulty: "medium",
    question: "Which action falls within the Securities and Exchange Commission's discretionary authority?",
    options: ["disqualifying a financial firm from raising money because of illegal conduct", "setting the interest rate banks charge one another for overnight loans of reserves", "approving corporate mergers on antitrust grounds", "insuring deposits at member banks"],
    answer: "disqualifying a financial firm from raising money because of illegal conduct",
    explanation: "The SEC polices securities markets and the firms in them. Interest rates belong to the Federal Reserve, merger review to Justice and the FTC, and deposit insurance to the FDIC."
  },
  {
    id: "gp102", term: "Department of Education", area: "bureaucracy", topic: "2.13",
    questionType: "application", difficulty: "medium",
    question: "AMSCO's table of discretionary authority lists \"cancelling or lowering student debt\" under which department?",
    options: ["Education", "Treasury", "Labor", "Health and Human Services"],
    answer: "Education",
    explanation: "Each entry in that table shows a statute leaving real choices to the department - Homeland Security on immigrant exemptions, Transportation on highway grants, Veterans Affairs on a health program."
  },
  {
    id: "gp103", term: "Department of Transportation", area: "bureaucracy", topic: "2.13",
    questionType: "application", difficulty: "medium",
    question: "Deciding which highway projects receive special grants is an exercise of discretionary authority by the",
    options: ["Department of Transportation", "Department of Homeland Security", "Environmental Protection Agency", "Office of Management and Budget"],
    answer: "Department of Transportation",
    explanation: "Congress appropriates highway money in bulk and leaves the project-by-project choices to the department. OMB builds the president's budget proposal rather than picking individual grants."
  },
  {
    id: "gp104", term: "Department of Homeland Security", area: "bureaucracy", topic: "2.13",
    questionType: "scenario", difficulty: "medium",
    question: "The TSA changes which items passengers may carry aboard an aircraft without Congress voting on the list. This is possible because",
    options: ["Congress delegated rule-making authority to the agency to keep pace with daily changes", "the president issued an executive order transferring the power", "aviation rules are exempt from the Administrative Procedures Act", "the Supreme Court granted the TSA original jurisdiction over disputes about air travel security"],
    answer: "Congress delegated rule-making authority to the agency to keep pace with daily changes",
    explanation: "The chief lawmaking body, with its committees and floor debates, cannot revise a carry-on list every few months. So it entrusts the TSA, inside Homeland Security, to monitor airlines and make rules that keep passengers safe."
  },
  {
    id: "gp105", term: "Department of Veterans Affairs", area: "bureaucracy", topic: "2.13",
    questionType: "definition", difficulty: "easy",
    question: "The Department of Veterans Affairs describes its mission as serving and honoring",
    options: ["the men and women who are America's veterans", "active-duty service members stationed overseas", "civilian employees of the Department of Defense", "families displaced by federally declared disasters"],
    answer: "the men and women who are America's veterans",
    explanation: "Its mission statement quotes Lincoln's promise to care for \"him who shall have borne the battle, and for his widow, and his orphan.\" Active-duty personnel are Defense's responsibility."
  },
  {
    id: "gp106", term: "independent regulatory agencies", area: "bureaucracy", topic: "2.13",
    questionType: "compare", difficulty: "hard",
    question: "Compared with an ordinary Cabinet agency, an independent regulatory agency has",
    options: ["greater leeway to shape and enforce national policy in its industry", "a narrower mandate that excludes issuing fines", "closer day-to-day supervision from the White House", "a director who may be dismissed at the president's pleasure"],
    answer: "greater leeway to shape and enforce national policy in its industry",
    explanation: "Every executive body has some discretion, but these have the most: industry-specific charges, binding rules, and fines. The president may help design a rule but has less say over how it is implemented and enforced."
  },
  {
    id: "gp107", term: "delegated discretionary authority", area: "bureaucracy", topic: "2.13",
    questionType: "application", difficulty: "hard",
    question: "Fox and Jordan found that legislators delegate more authority to the bureaucracy when several conditions hold. Which condition concerns the legislators themselves?",
    options: ["their policy motives outweigh their electoral motives", "they serve on the committee that funds the agency", "they represent districts directly affected by the rule", "they have previously worked inside the agency"],
    answer: "their policy motives outweigh their electoral motives",
    explanation: "The other two conditions are about information - politicians knowing far more than voters, and bureaucrats being genuine experts. This one is about caring more about fixing the problem than about the approval rating."
  },
  {
    id: "gp108", term: "delegated discretionary authority", area: "bureaucracy", topic: "2.13",
    questionType: "scenario", difficulty: "hard",
    question: "Some members of Congress prefer that agencies, not Congress, set fines for unpaid back taxes or close a plant over safety violations. The motive AMSCO identifies is that",
    options: ["blame for an unpopular action lands on the bureaucracy rather than on them", "agencies can act without following the Administrative Procedures Act", "only agencies have constitutional authority to penalize a company", "committee clearance requires the agency to make the decision"],
    answer: "blame for an unpopular action lands on the bureaucracy rather than on them",
    explanation: "The regulation still gets written, but the resentment attaches to an unelected official rather than to someone facing voters. It is a real cost of delegation: accountability blurs."
  },
  {
    id: "gp109", term: "Administrative Procedures Act", area: "bureaucracy", topic: "2.13",
    questionType: "process", difficulty: "medium",
    question: "A newly finalized federal regulation ordinarily cannot take effect immediately. Instead it must",
    options: ["list an effective date and allow a grace period, usually about 30 days", "be approved by a majority vote in both houses of Congress before publication", "wait until the next fiscal year begins", "survive a challenge in the U.S. circuit court of appeals"],
    answer: "list an effective date and allow a grace period, usually about 30 days",
    explanation: "Agencies must also publish an introduction, a summary of the problem, their legal authority, and the full regulatory text. Grace periods run as long as 180 days for complicated rules."
  },
  {
    id: "gp110", term: "notice-and-comment opportunity", area: "bureaucracy", topic: "2.13",
    questionType: "scenario", difficulty: "easy",
    question: "Before finalizing an emissions rule, an agency holds public meetings and runs an interactive online session to collect reactions. This stage is the",
    options: ["notice-and-comment opportunity", "committee clearance stage", "regulatory review by OIRA", "administrative adjudication"],
    answer: "notice-and-comment opportunity",
    explanation: "AMSCO notes that many observers regard the webcast and online sessions as a democratic improvement, since they widen who can be heard beyond whoever can travel to a hearing."
  },
  {
    id: "gp111", term: "Federal Register", area: "bureaucracy", topic: "2.13",
    questionType: "application", difficulty: "hard",
    question: "A researcher wants to trace how a particular regulation was first proposed, how public comment changed it, and how it reached its final wording. She should consult",
    options: ["the Federal Register", "the Code of Federal Regulations", "the Congressional Record", "the agency's annual budget request"],
    answer: "the Federal Register",
    explanation: "The Register is the developmental history; the Code is only the destination. Going to the Code would tell her what the rule says but nothing about how it got there."
  },
  {
    id: "gp112", term: "independent regulatory agencies", area: "bureaucracy", topic: "2.13",
    questionType: "compare", difficulty: "easy",
    question: "Which of these is an independent regulatory agency rather than a Cabinet department?",
    options: ["the Securities and Exchange Commission", "the Department of Homeland Security", "the Department of Veterans Affairs", "the Department of Education"],
    answer: "the Securities and Exchange Commission",
    explanation: "The SEC, the FEC and the FCC write and enforce rules for specific industries and sit outside the fifteen departments. The other three are departments headed by Cabinet secretaries."
  },

  // =====================================================================
  // TOPIC 2.14 - HOLDING THE BUREAUCRACY ACCOUNTABLE
  // =====================================================================
  {
    id: "gp113", term: "congressional oversight", area: "oversight", topic: "2.14",
    questionType: "definition", difficulty: "easy",
    question: "Congressional oversight means Congress",
    options: ["supervising the agencies charged with carrying out the law", "writing the detailed regulations an agency will enforce", "confirming the directors the president appoints", "hearing appeals from agency fines and penalties"],
    answer: "supervising the agencies charged with carrying out the law",
    explanation: "It is a check on the agencies and, at the same time, a competition with the president for influence over them. Confirmation belongs to the Senate alone, and appeals go to the courts."
  },
  {
    id: "gp114", term: "oversight hearing", area: "oversight", topic: "2.14",
    questionType: "application", difficulty: "easy",
    question: "The House Committee on Homeland Security calls the department's secretary to answer questions about a program's failures. This is",
    options: ["an oversight hearing", "an authorization of spending", "administrative adjudication", "committee clearance"],
    answer: "an oversight hearing",
    explanation: "The committee list parallels the list of agencies for exactly this reason. Such hearings run from routine updates to pointed sessions convened to get to the bottom of a problem."
  },
  {
    id: "gp115", term: "power of the purse", area: "oversight", topic: "2.14",
    questionType: "definition", difficulty: "easy",
    question: "Congress exercises the power of the purse over an agency by",
    options: ["deciding how much money the agency receives", "approving the agency director's nomination", "reviewing the agency's rules for economic impact", "auditing the agency's compliance with its own regulations"],
    answer: "deciding how much money the agency receives",
    explanation: "Money is the most direct lever Congress has: it can shape an agency's condition and its odds of success simply by allocating more or less. Reviewing rules for economic impact is OIRA's role in the executive branch."
  },
  {
    id: "gp116", term: "authorization of spending", area: "oversight", topic: "2.14",
    questionType: "process", difficulty: "medium",
    question: "An authorization of spending measure sets",
    options: ["the maximum an agency may spend on certain programs", "the exact sum transferred to the agency's account", "the number of employees the agency may hire", "the deadline by which an agency must issue a rule"],
    answer: "the maximum an agency may spend on certain programs",
    explanation: "Authorization is a ceiling, not a check. It may be a one-time allotment or a recurring annual one, and the agency still sees no money until appropriations follow."
  },
  {
    id: "gp117", term: "appropriations", area: "oversight", topic: "2.14",
    questionType: "compare", difficulty: "medium",
    question: "What is the difference between an authorization and an appropriation?",
    options: ["authorization sets a spending ceiling; appropriation actually provides the funds", "authorization provides the funds; appropriation sets the ceiling", "authorization comes from the Senate; appropriation comes from the House", "authorization is annual; appropriation is permanent"],
    answer: "authorization sets a spending ceiling; appropriation actually provides the funds",
    explanation: "Two committees, two steps. An agency with an authorization but no appropriation has permission to spend money it does not have; appropriations are typically made annually as part of the federal budget."
  },
  {
    id: "gp118", term: "appropriations", area: "oversight", topic: "2.14",
    questionType: "scenario", difficulty: "medium",
    question: "An agency has an authorization of spending for a new program but cannot get the money to run it. The most likely explanation is that",
    options: ["the appropriations committees have not approved the funds", "the president has not signed the authorizing statute", "the agency has not published the program in the Federal Register", "the program has not survived review by OIRA"],
    answer: "the appropriations committees have not approved the funds",
    explanation: "Authorization is only the first gate. Each chamber's appropriations committee and then the full chamber must approve the spending before any money moves."
  },
  {
    id: "gp119", term: "Office of Information and Regulatory Affairs", area: "oversight", topic: "2.14",
    questionType: "definition", difficulty: "medium",
    question: "The Office of Information and Regulatory Affairs reviews",
    options: ["regulations with a significant effect on the economy or public health", "every nomination the president sends to the Senate", "all agency spending above a statutory threshold", "agency decisions that have already been appealed in a federal circuit court"],
    answer: "regulations with a significant effect on the economy or public health",
    explanation: "OIRA is how a president reaches into the rule-writing process: rules that clash with the administration's agenda can be questioned, revised, or eliminated before they ever take effect."
  },
  {
    id: "gp120", term: "Office of Management and Budget", area: "oversight", topic: "2.14",
    questionType: "process", difficulty: "medium",
    question: "OIRA sits inside which larger office?",
    options: ["the Office of Management and Budget", "the Office of Personnel Management", "the Department of the Treasury", "the Council of Economic Advisers"],
    answer: "the Office of Management and Budget",
    explanation: "OMB prepares the president's annual budget proposal and reviews the budgets and programs of the executive departments, so regulatory review sits naturally alongside it."
  },
  {
    id: "gp121", term: "congressional oversight", area: "oversight", topic: "2.14",
    questionType: "application", difficulty: "hard",
    question: "AMSCO notes that oversight by two branches at once can itself cause problems, especially",
    options: ["during divided government, when the branches pull an agency in opposite directions", "during unified government, when neither branch bothers to supervise", "when an agency's director is a career civil servant rather than an appointee", "when an agency's rules have already been upheld in court"],
    answer: "during divided government, when the branches pull an agency in opposite directions",
    explanation: "Agencies answer to a president who appoints their leadership and to a Congress that funds them. When the two want different things, the supervision that should produce efficiency produces paralysis instead."
  },
  {
    id: "gp122", term: "congressional oversight", area: "oversight", topic: "2.14",
    questionType: "scenario", difficulty: "hard",
    question: "A Cabinet secretary must satisfy the president who appointed her, the subordinates who carry out her decisions, and the committees that fund her department. AMSCO uses this to argue that",
    options: ["accountability in the bureaucracy is genuinely hard to trace to one authority", "Cabinet secretaries are effectively independent of all three", "congressional oversight has replaced presidential control of the agencies entirely", "discretionary authority frees an agency from political constraints"],
    answer: "accountability in the bureaucracy is genuinely hard to trace to one authority",
    explanation: "Congress writes the law, the president appoints and directs, courts review, and interest groups push on all of it. Secretaries serve at the president's pleasure yet still have to please Congress, especially about money."
  },
  {
    id: "gp123", term: "Office of Information and Regulatory Affairs", area: "oversight", topic: "2.14",
    questionType: "scenario", difficulty: "hard",
    question: "A new administration wants to roll back a costly environmental rule without asking Congress to repeal the underlying statute. Its most direct route is to",
    options: ["have OIRA's regulatory review question and revise the rule", "file an amicus curiae brief challenging the rule in court", "use committee clearance to block the rule in advance", "invoke the legislative veto to delay the rule 90 days"],
    answer: "have OIRA's regulatory review question and revise the rule",
    explanation: "Regulatory review is the president's own machinery, so nothing has to pass Congress. Committee clearance and the legislative veto are legislative devices, and the second of those was struck down in 1983."
  },
  {
    id: "gp124", term: "compliance monitoring", area: "oversight", topic: "2.14",
    questionType: "application", difficulty: "medium",
    question: "EPA inspectors collect air samples near a factory, require permits for certain activities, and check afterward whether a firm is following a ruling. Together these activities are",
    options: ["compliance monitoring", "administrative adjudication", "congressional oversight", "notice and comment"],
    answer: "compliance monitoring",
    explanation: "Monitoring is the fact-gathering half of enforcement; adjudication is the penalty that may follow. Regulators also report back to the rule writers, so what they find shapes the next round of rules."
  },
  {
    id: "gp125", term: "bureaucracy", area: "oversight", topic: "2.14",
    questionType: "case", difficulty: "medium",
    question: "In 2017 the FCC rolled back Obama-era rules requiring cable and telecommunications companies to treat all web traffic equally. AMSCO presents this as an example of",
    options: ["a president shaping agency policy to match his own ideology", "Congress using the power of the purse to discipline an agency", "a court overturning an agency's interpretation of a statute", "an independent commission resisting presidential direction"],
    answer: "a president shaping agency policy to match his own ideology",
    explanation: "The net neutrality rollback followed the administration's call for less regulation on business. It shows the same lever as OIRA review: a president changing outcomes without changing any statute."
  },
  {
    id: "gp126", term: "bureaucracy", area: "oversight", topic: "2.14",
    questionType: "compare", difficulty: "hard",
    question: "Presidents use both formal and informal powers to bend the bureaucracy toward their agenda. Which pairing matches AMSCO's description?",
    options: ["formal: appointing officials; informal: executive orders and persuasion", "formal: persuasion; informal: appointing officials", "formal: congressional testimony; informal: budget requests and public appeals", "formal: regulatory review; informal: Senate confirmation"],
    answer: "formal: appointing officials; informal: executive orders and persuasion",
    explanation: "Reagan's approach shows both at work: he filled top positions with people who shared his agenda and pressed publicly for fewer administrative personnel. Confirmation is the Senate's power, not the president's."
  },
  {
    id: "gp127", term: "power of the purse", area: "oversight", topic: "2.14",
    questionType: "document", difficulty: "hard",
    question: "James Q. Wilson wrote that government organizations \"are especially risk averse because they are caught up in a web of constraints so complex that any change is likely to rouse the ire of some important constituency.\" The constraints he describes come from",
    options: ["several principals at once - Congress, the president, the courts and organized interests", "the merit system's restrictions on hiring and firing", "the Administrative Procedures Act's notice-and-comment requirements and nothing else in the process", "the staggered terms of independent commissioners"],
    answer: "several principals at once - Congress, the president, the courts and organized interests",
    explanation: "Wilson's point is structural: an agency that must satisfy this many watchers will prefer the safe path. AMSCO nevertheless argues that most federal functions do get completed efficiently, contrary to popular perception."
  },
  {
    id: "gp128", term: "oversight hearing", area: "oversight", topic: "2.14",
    questionType: "compare", difficulty: "easy",
    question: "Which committee would most likely hold an oversight hearing on the National Parks Service?",
    options: ["the Senate Committee on Agriculture, Nutrition, and Forestry", "the House Committee on Homeland Security", "the Senate Judiciary Committee, which handles judicial nominations", "the House Ways and Means Committee"],
    answer: "the Senate Committee on Agriculture, Nutrition, and Forestry",
    explanation: "Jurisdiction follows subject matter, and that committee oversees the Parks Service, part of the Interior Department. The pairing of committees to agencies is what makes iron triangles possible in the first place."
  },

  // =====================================================================
  // TOPIC 2.15 - POLICY AND THE BRANCHES OF GOVERNMENT
  // =====================================================================
  {
    id: "gp129", term: "legislative veto", area: "oversight", topic: "2.15",
    questionType: "definition", difficulty: "medium",
    question: "As Congress used it beginning in the 1930s, the legislative veto was a requirement that",
    options: ["certain agency decisions wait 30 or 90 days so Congress could stop them", "the president sign off on every rule an agency proposed", "an agency obtain a federal court's approval before issuing a fine against a company", "two-thirds of both houses approve any new regulation"],
    answer: "certain agency decisions wait 30 or 90 days so Congress could stop them",
    explanation: "It was a control device aimed at executive agencies, used during Vietnam to limit military deployments among other things. Public interest groups soon watched it used to halt lawful agency decisions they supported."
  },
  {
    id: "gp130", term: "INS v. Chadha", area: "oversight", topic: "2.15",
    questionType: "case", difficulty: "medium",
    question: "In INS v. Chadha (1983) the Supreme Court struck down the legislative veto on the ground that",
    options: ["it violated separation of powers, since the veto belongs to the president", "it denied Chadha the equal protection of the laws", "Congress had never authorized the INS to grant permanent residency in the first place", "the House had acted without a quorum present"],
    answer: "it violated separation of powers, since the veto belongs to the president",
    explanation: "The Court added that in rejecting Chadha's application the House had exercised a judicial function - applying a law to one person - which belongs to the courts. Two of the three branches' jobs, done by one chamber."
  },
  {
    id: "gp131", term: "INS v. Chadha", area: "oversight", topic: "2.15",
    questionType: "scenario", difficulty: "hard",
    question: "Jagdish Chadha's immigration status became a constitutional test case mainly because his situation",
    options: ["turned into a power struggle between Congress and the president over the legislative veto", "raised the question of whether the INS could approve a residency application without notice and comment", "required the Court to define standing for non-citizens", "involved an agency fine that exceeded statutory limits"],
    answer: "turned into a power struggle between Congress and the president over the legislative veto",
    explanation: "The INS had approved his residency; two years later the House undid it by legislative veto. Public Citizen, a group focused on separation of powers, carried the case up in order to get the device before the Court."
  },
  {
    id: "gp132", term: "committee clearance", area: "oversight", topic: "2.15",
    questionType: "definition", difficulty: "medium",
    question: "Committee clearance is the practice by which some congressional committees",
    options: ["review and approve certain agency actions in advance", "clear a nominee for a floor vote in the Senate", "approve the publication of a rule in the Federal Register", "certify that an agency has followed the Administrative Procedures Act"],
    answer: "review and approve certain agency actions in advance",
    explanation: "It grew up to sort out the overlap between Congress and the regulatory agencies. Few executive leaders ignore such a request, knowing the same committee decides their funding."
  },
  {
    id: "gp133", term: "committee clearance", area: "oversight", topic: "2.15",
    questionType: "application", difficulty: "hard",
    question: "Why do agency leaders generally comply with committee clearance even though the practice is informal?",
    options: ["the same committee controls the agency's funding", "refusing would violate the Administrative Procedures Act", "the Supreme Court upheld the practice in INS v. Chadha", "the president requires compliance by executive order"],
    answer: "the same committee controls the agency's funding",
    explanation: "Leverage, not law, is what makes it work. Chadha actually went the other way, striking down the formal version of congressional control over agency decisions."
  },
  {
    id: "gp134", term: "Chevron deference", area: "oversight", topic: "2.15",
    questionType: "case", difficulty: "medium",
    question: "Under the Chevron doctrine, when a statute defining an agency's responsibilities is vague or ambiguous, courts should",
    options: ["defer to the agency's own interpretation", "strike the statute down as unconstitutionally vague", "send the question back to Congress for clarification", "adopt the interpretation most favorable to the regulated party"],
    answer: "defer to the agency's own interpretation",
    explanation: "Chevron v. NRDC (1984) grew out of an EPA rule grouping plants into a pollution \"bubble.\" AMSCO notes the doctrine goes further still: agencies may not only say what the law is, but change that reading later."
  },
  {
    id: "gp135", term: "Chevron deference", area: "oversight", topic: "2.15",
    questionType: "application", difficulty: "hard",
    question: "AMSCO gives two reasons courts defer to agencies under Chevron. One is the agency's expertise. The other is that",
    options: ["Congress, the people's branch, chose to empower the agency", "agency rules are published for public comment beforehand", "the president appoints the agency's director", "the Supreme Court hears too few cases to review them all"],
    answer: "Congress, the people's branch, chose to empower the agency",
    explanation: "The democratic pedigree runs through Congress to the agency, which is why deference is not simply surrender. The Court's limited docket is a separate point about why circuit courts have become the final word on most agency disputes."
  },
  {
    id: "gp136", term: "Whistleblower Protection Act", area: "oversight", topic: "2.15",
    questionType: "definition", difficulty: "easy",
    question: "The Whistleblower Protection Act of 1989 prohibits a federal agency from",
    options: ["retaliating against an employee who discloses illegal or dishonest acts", "withholding records that a member of the public has formally requested in writing", "holding its meetings outside publicly accessible places", "hiring employees outside the competitive merit system"],
    answer: "retaliating against an employee who discloses illegal or dishonest acts",
    explanation: "Employees who see corruption have every incentive to stay quiet, since exposure invites reprisal and termination. The other three options describe the Freedom of Information Act, the Sunshine Act, and the Pendleton Act."
  },
  {
    id: "gp137", term: "Freedom of Information Act", area: "oversight", topic: "2.15",
    questionType: "compare", difficulty: "medium",
    question: "A journalist wants the internal correspondence behind an agency's decision. Which law gives her a right to request it?",
    options: ["the Freedom of Information Act (1966)", "the Sunshine Act (1976)", "the Administrative Procedures Act (1946)", "the Whistleblower Protection Act (1989)"],
    answer: "the Freedom of Information Act (1966)",
    explanation: "FOIA covers records; the Sunshine Act covers meetings, requiring most agencies to hold them somewhere the public can attend. The APA governs how rules are made rather than what documents you can obtain."
  },
  {
    id: "gp138", term: "Sunshine Act", area: "oversight", topic: "2.15",
    questionType: "definition", difficulty: "easy",
    question: "The Sunshine Act of 1976 requires most federal agencies to",
    options: ["hold their meetings in publicly accessible places", "publish proposed rules for a 30-day comment period", "report annually to the Office of Management and Budget", "disclose the political affiliations of their senior staff"],
    answer: "hold their meetings in publicly accessible places",
    explanation: "Sunshine is the standard metaphor for open proceedings. It sits with FOIA and the Whistleblower Protection Act in AMSCO's list of laws aimed at making the bureaucracy transparent."
  },
  {
    id: "gp139", term: "going native", area: "oversight", topic: "2.15",
    questionType: "scenario", difficulty: "medium",
    question: "An agency director appointed by the president begins publicly defending her staff's position against a White House directive she considers unworkable. AMSCO would describe her as",
    options: ["going native", "exercising committee clearance", "invoking whistleblower protection", "practicing compliance monitoring"],
    answer: "going native",
    explanation: "It happens when a president's goals ignore the practical constraints the agency actually faces. It is a risky move: many who disagreed with a president in public were replaced."
  },
  {
    id: "gp140", term: "mixed", area: "oversight", topic: "2.15",
    questionType: "application", difficulty: "hard",
    question: "AMSCO notes that when federal courts review agency disputes, they focus more on",
    options: ["the agency's decision-making procedures than on the substance of its rules", "the substance of the rules than on how they were adopted", "the agency's budget request than on either its rules or the procedures behind them", "the president's agenda than on the statute Congress wrote"],
    answer: "the agency's decision-making procedures than on the substance of its rules",
    explanation: "Courts ask whether an agency followed a fair process, not whether experts made the wisest choice. That posture, plus Chevron, is why deference goes to the agency unless its discretion is blatantly unlawful or abusive."
  },
  {
    id: "gp141", term: "mixed", area: "oversight", topic: "2.15",
    questionType: "case", difficulty: "medium",
    question: "After the FCC fined CBS's parent company $550,000 over the 2004 Super Bowl halftime broadcast, the network challenged the penalty and won. Where was that challenge decided?",
    options: ["in a U.S. circuit court of appeals", "in the Supreme Court on original jurisdiction", "before an FCC administrative panel", "in a U.S. district court in Washington, DC"],
    answer: "in a U.S. circuit court of appeals",
    explanation: "Challenges to agency penalties turn on interpreting a law and its application, which is appellate work; the Third Circuit sided with CBS-Viacom. Since the Supreme Court takes so few such cases, the circuits are usually the last word."
  },
  {
    id: "gp142", term: "mixed", area: "oversight", topic: "2.15",
    questionType: "application", difficulty: "hard",
    question: "One study found lower federal courts upheld independent commissions' decisions about 76 percent of the time, and another found the Supreme Court upheld challenged executive branch decisions 91 percent of the time. Together these figures support the conclusion that",
    options: ["courts have generally given agencies wide latitude to carry out their missions", "courts have become the primary check on bureaucratic power", "independent commissions are more often reversed than Cabinet agencies", "judicial review rarely reaches agency decisions at all"],
    answer: "courts have generally given agencies wide latitude to carry out their missions",
    explanation: "The numbers run in the agencies' favor at both levels, and AMSCO notes appeals courts protect independent commissions even more readily than ordinary departments. Critics say the latitude comes at the expense of democratically made policy."
  },
  {
    id: "gp143", term: "legislative veto", area: "oversight", topic: "2.15",
    questionType: "compare", difficulty: "hard",
    question: "After INS v. Chadha, which tool remained available to a congressional committee that wanted advance influence over agency decisions?",
    options: ["committee clearance", "the legislative veto", "the pocket veto", "administrative adjudication"],
    answer: "committee clearance",
    explanation: "Chadha killed the formal device but not the informal one. Clearance rests on the committee's control of funding rather than on a statutory power the Court could strike down."
  },
  {
    id: "gp144", term: "Whistleblower Protection Act", area: "oversight", topic: "2.15",
    questionType: "scenario", difficulty: "hard",
    question: "A federal employee reports that his office has been falsifying inspection records, and his supervisor threatens to fire him. Which protection applies, and what is its limit?",
    options: ["the Whistleblower Protection Act bars the retaliation, but he must believe the conduct illegal or dishonest", "the Freedom of Information Act protects him, but only if he has first filed a formal public records request with the agency", "the Sunshine Act protects him, but only if the conduct occurred in a public meeting", "the Administrative Procedures Act protects him, but only during a notice-and-comment period"],
    answer: "the Whistleblower Protection Act bars the retaliation, but he must believe the conduct illegal or dishonest",
    explanation: "The 1989 law covers disclosure of acts the employee believes illegal or dishonest and forbids both retaliation and threats. FOIA and the Sunshine Act govern access to records and meetings, not employee protection."
  },

  // =====================================================================
  // CROSS-CUTTING - ITEMS THAT SPAN THE COURTS AND THE BUREAUCRACY
  // =====================================================================
  {
    id: "gp145", term: "mixed", area: "mixed", topic: "2.15",
    questionType: "compare", difficulty: "easy",
    question: "Which branch writes the rules that carry a law into effect, and which branch reviews whether the agency followed fair procedure in writing them?",
    options: ["the executive writes them; the judiciary reviews them", "the legislature writes them; the executive reviews them", "the judiciary writes them; the legislature reviews them", "the executive writes them; the legislature reviews them in court"],
    answer: "the executive writes them; the judiciary reviews them",
    explanation: "Congress passes the statute, the agency turns it into regulations, and a court asks whether the process was fair. Congress checks agencies too, but through funding and hearings rather than through lawsuits."
  },
  {
    id: "gp146", term: "mixed", area: "mixed", topic: "2.11",
    questionType: "compare", difficulty: "easy",
    question: "Which of these is a check the executive branch holds over the judiciary?",
    options: ["nominating federal judges", "setting the number of seats on each circuit court", "defining which cases the federal courts may hear", "impeaching and removing a judge"],
    answer: "nominating federal judges",
    explanation: "Nomination is the president's; the other three belong to Congress, which creates judgeships, defines jurisdiction, and impeaches. Both branches get a piece of the judiciary, which is the point of the design."
  },
  {
    id: "gp147", term: "mixed", area: "mixed", topic: "2.12",
    questionType: "compare", difficulty: "easy",
    question: "Which pairing of institution and power is accurate?",
    options: ["Congress - the power of the purse over federal agencies", "the courts - the power to appropriate money for an agency", "the president - the power to define an agency's jurisdiction by statute", "interest groups - the power to issue binding federal regulations"],
    answer: "Congress - the power of the purse over federal agencies",
    explanation: "Money and jurisdiction are legislative; rules and enforcement are executive; review is judicial. Interest groups shape all of it through iron triangles and issue networks, but they hold no formal power."
  },
  {
    id: "gp148", term: "mixed", area: "mixed", topic: "2.13",
    questionType: "scenario", difficulty: "medium",
    question: "An agency issues a regulation, a trade group sues, and the circuit court upholds the rule because the statute was ambiguous and the agency's reading was reasonable. The doctrine at work is",
    options: ["Chevron deference", "stare decisis", "binding precedent", "judicial activism"],
    answer: "Chevron deference",
    explanation: "Ambiguous statute plus expert agency equals deference. Stare decisis and binding precedent describe how courts treat earlier rulings, not how they treat agency interpretations."
  },
  {
    id: "gp149", term: "mixed", area: "mixed", topic: "2.11",
    questionType: "scenario", difficulty: "medium",
    question: "A president wants long-term influence over federal policy after leaving office. Which action offers the most durable route?",
    options: ["appointing federal judges who will serve for decades", "issuing executive orders on priority issues", "negotiating executive agreements with foreign leaders", "naming loyal directors to independent commissions"],
    answer: "appointing federal judges who will serve for decades",
    explanation: "A judge selected carefully can shape law until late in life, which is why presidents take the choice so seriously. Orders and agreements can be undone by a successor, and commissioners' terms eventually run out."
  },
  {
    id: "gp150", term: "mixed", area: "mixed", topic: "2.14",
    questionType: "compare", difficulty: "medium",
    question: "Congress and the president each try to steer the bureaucracy. Which pair correctly matches each to its main instrument?",
    options: ["Congress: funding and hearings; the president: appointments and regulatory review", "Congress: appointments and regulatory review; the president: funding and hearings", "Congress: executive orders; the president: authorization of spending", "Congress: compliance monitoring; the president: committee clearance"],
    answer: "Congress: funding and hearings; the president: appointments and regulatory review",
    explanation: "The purse and the hearing room are legislative; personnel and OIRA are executive. Compliance monitoring is something agencies do to regulated firms, not something either branch does to agencies."
  },
  {
    id: "gp151", term: "mixed", area: "mixed", topic: "2.15",
    questionType: "application", difficulty: "medium",
    question: "The bureaucracy is sometimes called a fourth branch of government even though the word never appears in the Constitution. The strongest basis for the nickname is that agencies",
    options: ["write binding rules, enforce them, and impose penalties for breaking them", "are staffed by officials the voters elect directly", "may overturn acts of Congress they consider unconstitutional without going to court", "report to no branch of government"],
    answer: "write binding rules, enforce them, and impose penalties for breaking them",
    explanation: "Legislative, executive and judicial functions in one place - that is what earns the label. Agencies answer to both political branches and to the courts; Congress's authority to create them comes from Article I."
  },
  {
    id: "gp152", term: "mixed", area: "mixed", topic: "2.9",
    questionType: "document", difficulty: "medium",
    question: "Justice Kagan told her confirmation hearing that the Court \"has the responsibility of ensuring that our government never oversteps its proper bounds\" but \"must also recognize the limits on itself and respect the choices made by the American people.\" The second half of that sentence is an appeal to",
    options: ["judicial restraint", "judicial activism", "the rule of four", "original jurisdiction"],
    answer: "judicial restraint",
    explanation: "Respecting choices made by the people means deferring to elected legislatures. The first half of her sentence describes judicial review; the balance between the two is the whole legitimacy debate."
  },
  {
    id: "gp153", term: "mixed", area: "mixed", topic: "2.11",
    questionType: "document", difficulty: "hard",
    question: "Brutus warned that the federal courts would \"swallow up all the powers of the courts in the respective states.\" Which later development best supports his prediction?",
    options: ["Supreme Court rulings bind every court in the country on questions of federal law", "Congress has created 94 district courts and 13 courts of appeals spread across the states", "the Senate developed the custom of senatorial courtesy", "states retained the power to create their own court systems"],
    answer: "Supreme Court rulings bind every court in the country on questions of federal law",
    explanation: "Binding precedent running downward is exactly the swallowing Brutus feared. The last option cuts against him, and the number of federal courthouses says nothing about whose law prevails."
  },
  {
    id: "gp154", term: "mixed", area: "mixed", topic: "2.12",
    questionType: "compare", difficulty: "hard",
    question: "Both an iron triangle and an issue network can shape policy. Which feature distinguishes the triangle specifically?",
    options: ["its three members each depend on the other two for something concrete", "it forms around a single piece of legislation and then dissolves", "its members are drawn from academia and the media", "it operates entirely within the executive branch"],
    answer: "its three members each depend on the other two for something concrete",
    explanation: "Funding, information, votes, donations, friendly rules - the exchanges are what make the relationship iron. Networks form and dissolve around issues and draw in people with no stake in each other's other fights."
  },
  {
    id: "gp155", term: "mixed", area: "mixed", topic: "2.13",
    questionType: "process", difficulty: "hard",
    question: "Place these stages of federal rule making in order: publication in the Code of Federal Regulations; congressional passage of the enabling statute; notice and comment; the agency's study of the problem.",
    options: ["statute, study, notice and comment, Code", "study, statute, notice and comment, Code", "statute, notice and comment, study, Code", "study, notice and comment, statute, Code"],
    answer: "statute, study, notice and comment, Code",
    explanation: "Congress creates and empowers the agency first. The agency then researches the issue, consults experts and affected industries, opens the proposal to public response, and only at the end does the finished rule reach the Code."
  },
  {
    id: "gp156", term: "mixed", area: "mixed", topic: "2.10",
    questionType: "scenario", difficulty: "hard",
    question: "Congress dislikes a Supreme Court ruling interpreting a federal statute. Which response is both available and most practical?",
    options: ["rewrite the statute so that the Court's reading no longer applies", "propose a constitutional amendment overturning the decision", "refuse to appropriate funds for the federal judiciary", "instruct the solicitor general to seek rehearing"],
    answer: "rewrite the statute so that the Court's reading no longer applies",
    explanation: "Brandeis's point exactly: a misread statute is Congress's to fix. Amendments are the surest route but nearly always fail, and the solicitor general works for the president, not for Congress."
  },
  {
    id: "gp157", term: "mixed", area: "mixed", topic: "2.14",
    questionType: "application", difficulty: "hard",
    question: "Why does AMSCO describe congressional oversight as competing with the president rather than simply supplementing him?",
    options: ["both branches are trying to direct the same agencies toward different priorities", "only one branch may lawfully supervise an agency at a time", "the president may dissolve a committee that oversees an agency", "Congress may remove an agency director the president appointed whenever it chooses"],
    answer: "both branches are trying to direct the same agencies toward different priorities",
    explanation: "An agency has two masters: one appoints its leadership and reviews its rules, the other writes its mandate and pays for it. Competition is built into the design, and divided government sharpens it."
  },
  {
    id: "gp158", term: "mixed", area: "mixed", topic: "2.11",
    questionType: "case", difficulty: "hard",
    question: "Both the Bork rejection in 1987 and the refusal to vote on Garland in 2016 are cited as evidence about the confirmation process. What do they show in common?",
    options: ["the Senate's advice and consent power can defeat a nominee without questioning his qualifications", "the Judiciary Committee will not report a nominee whose home-state senators withhold their blue slips", "the ABA's rating determines whether a nominee is confirmed", "a Supreme Court seat cannot remain vacant for more than a term"],
    answer: "the Senate's advice and consent power can defeat a nominee without questioning his qualifications",
    explanation: "Bork had been confirmed unanimously to the appeals court; Garland carried a unanimous \"well qualified\" rating. Both lost on ideology and timing, and the seat in 2016 sat empty over ten months."
  },
  {
    id: "gp159", term: "mixed", area: "mixed", topic: "2.15",
    questionType: "compare", difficulty: "medium",
    question: "Which law best matches its purpose?",
    options: ["Sunshine Act - open agency meetings to the public", "Freedom of Information Act - protect employees who report misconduct", "Whistleblower Protection Act - guarantee access to agency records", "Administrative Procedures Act - require Senate confirmation of agency directors"],
    answer: "Sunshine Act - open agency meetings to the public",
    explanation: "The other three are scrambled: FOIA covers records, the Whistleblower Act covers employees, and the APA governs rule making. All four aim at the same thing - making an unelected bureaucracy answerable."
  },
  {
    id: "gp160", term: "mixed", area: "mixed", topic: "2.9",
    questionType: "application", difficulty: "medium",
    question: "A student argues that the Supreme Court's legitimacy rests on public acceptance rather than on force. Which feature of the Court best supports that claim?",
    options: ["it depends on other branches to implement its decisions", "its justices are confirmed by the Senate", "it hears cases from all 50 states and 13 circuits", "it issues written opinions explaining its reasoning"],
    answer: "it depends on other branches to implement its decisions",
    explanation: "Jackson's jab at Marshall is the sharpest version: a ruling nobody will enforce is words on paper. Written opinions help persuade, but the dependence itself is what makes acceptance necessary rather than optional."
  },
  {
    id: "gp161", term: "mixed", area: "mixed", topic: "2.13",
    questionType: "scenario", difficulty: "medium",
    question: "A citizen complains that no one she voted for approved the regulation she was fined under. Which feature of the system is she describing?",
    options: ["unelected experts exercising delegated discretionary authority", "the Senate's use of senatorial courtesy", "the Court's application of binding precedent to an agency ruling", "Congress's exercise of committee clearance"],
    answer: "unelected experts exercising delegated discretionary authority",
    explanation: "AMSCO raises the objection directly: how democratic is it for a handful of unelected experts to write rules whole industries must follow? The counterargument is that Congress, which voters do elect, chose to delegate."
  },
  {
    id: "gp162", term: "mixed", area: "mixed", topic: "2.12",
    questionType: "case", difficulty: "easy",
    question: "Which situation involves two of the three points of an iron triangle?",
    options: ["a highway safety agency's director briefs the subcommittee that sets her budget", "a newspaper publishes an investigation into a regulatory agency's repeated enforcement failures", "two Cabinet secretaries disagree about the administration's position on a treaty", "a federal judge hears an appeal of a fine an agency imposed on a company"],
    answer: "a highway safety agency's director briefs the subcommittee that sets her budget",
    explanation: "Agency plus congressional committee is two corners of the triangle; only an interest group is missing. The press, the courts and a rival department all sit outside it, however much they shape what an agency does."
  },
  {
    id: "gp163", term: "mixed", area: "mixed", topic: "2.10",
    questionType: "process", difficulty: "hard",
    question: "Trace a case from a federal trial to a Supreme Court decision. Which order is correct?",
    options: ["district court, circuit court, petition for certiorari, rule of four, oral argument", "district court, petition for certiorari, circuit court, rule of four, oral argument", "circuit court, district court, rule of four, petition for certiorari, oral argument", "district court, circuit court, rule of four, petition for certiorari, oral argument"],
    answer: "district court, circuit court, petition for certiorari, rule of four, oral argument",
    explanation: "You lose, you appeal to your circuit, you lose again, then you ask the Supreme Court to look. The petition comes before the vote to grant it, and only after four justices agree does the case get argued and decided."
  },
  {
    id: "gp164", term: "mixed", area: "mixed", topic: "2.14",
    questionType: "definition", difficulty: "easy",
    question: "Which office prepares the president's annual budget proposal?",
    options: ["the Office of Management and Budget", "the Office of Personnel Management", "the Congressional Budget Office", "the Government Accountability Office"],
    answer: "the Office of Management and Budget",
    explanation: "OMB works for the president and houses OIRA, which reviews significant regulations. OPM runs federal hiring; the other two work for Congress."
  }
];

// Export for the Node-based validator (harmless in the browser).
if (typeof module !== "undefined") {
  module.exports = { govPolicyVocab, govPolicyBank };
}
