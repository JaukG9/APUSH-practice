// =========================================================================
// AP GOV: TOPICS 2.3-2.8 - CONTENT MODULE
// =========================================================================
// Source of truth: AMSCO United States Government & Politics, AP Edition
// (2022), Chapters 4-6, book pages 124-187 - Topic 2.3 (congressional
// behavior), Topics 2.4-2.7 (the Presidency) and Topic 2.8 (the Judiciary).
//
// Two exports:
//   govBranchesVocab - every key term this mode tests, with the meaning the
//                      AMSCO text gives it and the topic it appears under.
//                      Update this list first if the source changes.
//   govBranchesBank  - the question bank. Content only: no markup, no game
//                      logic, no HTML.
//
// Question shape:
//   { id, term, branch, topic, questionType, difficulty,
//     question, options, answer, explanation }
//     term         - the vocabulary entry under test; "mixed" for items that
//                    compare several concepts or span institutions
//     branch       - "congress" | "presidency" | "judiciary" | "mixed",
//                    and drives the Institution filter
//     topic        - the AMSCO topic number the item is drawn from
//     questionType - definition | application | scenario | compare |
//                    document | case | process. The engine spreads types out
//                    so consecutive questions do not feel identical.
//     difficulty   - "easy" | "medium" | "hard"; a session ramps easy -> hard
//     options      - exactly four distinct strings; one equals `answer`
//                    (the engine shuffles them, so stored order is irrelevant)
//
// Ids are not contiguous. They are identity keys, and the gaps are where
// Topics 2.1 and 2.2 used to sit; reusing a number would collide with the
// "recently seen" list a returning player already has stored.
// =========================================================================

const govBranchesVocab = [
  // --- Congress: Topic 2.3, congressional behavior -----------------------
  { id: "g-gridlock", term: "gridlock", display: "gridlock", branch: "congress", topic: "2.3",
    meaning: "The congestion of opposing forces that keeps ideas from moving forward, within a chamber or between Congress and the president." },
  { id: "g-delegate-model", term: "delegate model", display: "delegate model", branch: "congress", topic: "2.3",
    meaning: "Voting the way constituents want, treating the member as their agent; more common in the House." },
  { id: "g-trustee-model", term: "trustee model", display: "trustee model", branch: "congress", topic: "2.3",
    meaning: "Voting on one's own best judgment as someone entrusted to decide, regardless of constituent opinion; more common in the Senate." },
  { id: "g-politico-model", term: "politico model", display: "politico model", branch: "congress", topic: "2.3",
    meaning: "A blend of the delegate and trustee approaches, leaning on constituent opinion when it runs strong and on judgment when it does not." },
  { id: "g-gerrymandering", term: "gerrymandering", display: "gerrymandering", branch: "congress", topic: "2.3",
    meaning: "Drawing illogical district lines to give one party the advantage, producing safe seats and one-party rule." },
  { id: "g-racial-gerrymandering", term: "racial gerrymandering", display: "racial gerrymandering", branch: "congress", topic: "2.3",
    meaning: "Drawing districts on the basis of race, historically to dilute Black votes and, in well-intentioned overcorrections, in ways that raise equal protection problems." },
  { id: "g-swing-district", term: "swing district", display: "swing district", branch: "congress", topic: "2.3",
    meaning: "A district with close elections, also called a marginal seat; a safe seat is one a party wins by more than 55 percent." },
  { id: "g-one-person-one-vote", term: "one person-one vote", display: "one person-one vote principle", branch: "congress", topic: "2.3",
    meaning: "The principle that each person's vote must carry equal weight, which Baker v. Carr helped establish." },
  { id: "g-baker-carr", term: "Baker v. Carr", display: "Baker v. Carr (1962)", branch: "congress", topic: "2.3",
    meaning: "Held that the fairness of legislative districts is a justiciable question the federal courts may decide, opening the door to one person-one vote." },
  { id: "g-shaw-reno", term: "Shaw v. Reno", display: "Shaw v. Reno (1993)", branch: "congress", topic: "2.3",
    meaning: "Held that a district so irregularly shaped that only race explains it must serve a compelling interest under the Fourteenth Amendment." },
  { id: "g-lame-duck", term: "lame duck president", display: "lame duck president", branch: "congress", topic: "2.3",
    meaning: "A president who has lost reelection or is nearing the end of a second term, and whose leverage over Congress fades accordingly." },
  { id: "g-divided-government", term: "divided government", display: "divided government", branch: "congress", topic: "2.3",
    meaning: "When the president is of one party and the House and/or Senate is controlled by the other, which fuels partisan gridlock." },

  // --- The Presidency: Topic 2.4, roles and powers -----------------------
  { id: "g-policy-agenda", term: "policy agenda", display: "policy agenda", branch: "presidency", topic: "2.4",
    meaning: "The set of issues a president treats as significant and works to move through government." },
  { id: "g-formal-powers", term: "formal powers", display: "formal powers", branch: "presidency", topic: "2.4",
    meaning: "The powers of the president spelled out in Article II, such as the veto, appointments, and command of the military." },
  { id: "g-informal-powers", term: "informal powers", display: "informal powers", branch: "presidency", topic: "2.4",
    meaning: "Political powers understood to be inherent in the office rather than listed, such as persuasion and the threat of a veto." },
  { id: "g-bargaining", term: "bargaining and persuasion", display: "bargaining and persuasion", branch: "presidency", topic: "2.4",
    meaning: "The president's informal effort to win lawmakers over one by one so Congress passes the legislative agenda." },
  { id: "g-veto", term: "veto", display: "veto", branch: "presidency", topic: "2.4",
    meaning: "The president's rejection of a bill, returned to its house of origin with objections; two-thirds of each house can override it." },
  { id: "g-pocket-veto", term: "pocket veto", display: "pocket veto", branch: "presidency", topic: "2.4",
    meaning: "A bill's death when the president neither signs nor vetoes it and the congressional session ends inside the ten-day window." },
  { id: "g-line-item-veto", term: "line-item veto", display: "line-item veto", branch: "presidency", topic: "2.4",
    meaning: "The power to strike single lines of spending from a bill; granted in 1996 and struck down in Clinton v. City of New York (1998)." },
  { id: "g-commander-in-chief", term: "Commander in Chief", display: "Commander in Chief", branch: "presidency", topic: "2.4",
    meaning: "The president's Article II command of the military, though the Constitution leaves declaring war to Congress." },
  { id: "g-executive-agreement", term: "executive agreement", display: "executive agreement", branch: "presidency", topic: "2.4",
    meaning: "A contract between heads of state that resembles a treaty but needs no Senate vote and does not bind later presidents." },
  { id: "g-executive-order", term: "executive order", display: "executive order", branch: "presidency", topic: "2.4",
    meaning: "A presidential directive with the effect of law that carries out the law or administers the government; it can be challenged in court." },
  { id: "g-signing-statement", term: "signing statements", display: "signing statements", branch: "presidency", topic: "2.4",
    meaning: "A written comment issued when signing a bill that explains how the president interprets it and intends to enforce it." },
  { id: "g-executive-privilege", term: "executive privilege", display: "executive privilege", branch: "presidency", topic: "2.4",
    meaning: "The president's claimed right to withhold internal advice and decision making from the other branches; limited by U.S. v. Nixon (1974)." },

  // --- The Presidency: Topic 2.5, checks on the presidency ---------------
  { id: "g-advice-consent", term: "advice and consent", display: "advice and consent", branch: "presidency", topic: "2.5",
    meaning: "The Senate's power to approve or reject presidential appointments and treaties, and one of the framers' express limits on the executive." },
  { id: "g-cabinet", term: "Cabinet", display: "Cabinet", branch: "presidency", topic: "2.5",
    meaning: "The 15 department secretaries, plus anyone a president adds, who advise the president and run the executive departments." },
  { id: "g-chief-of-staff", term: "chief of staff", display: "chief of staff", branch: "presidency", topic: "2.5",
    meaning: "The gatekeeper of the White House, with no formal policymaking power but enormous influence over what reaches the president." },
  { id: "g-ambassadors", term: "ambassadors", display: "ambassadors", branch: "presidency", topic: "2.5",
    meaning: "Top diplomats representing the United States abroad; about a third are political appointees, and the Senate rarely rejects them." },
  { id: "g-joint-chiefs", term: "Joint Chiefs of Staff", display: "Joint Chiefs of Staff", branch: "presidency", topic: "2.5",
    meaning: "The council of top uniformed officers from each military division, which advises the president on military strategy." },
  { id: "g-inherent-powers", term: "inherent powers", display: "inherent powers", branch: "presidency", topic: "2.5",
    meaning: "Powers not explicitly listed but claimed as within the executive's jurisdiction, usually asserted when an emergency arises." },
  { id: "g-recess-appointment", term: "recess appointment", display: "recess appointment", branch: "presidency", topic: "2.5",
    meaning: "An appointment made while the Senate is out of session, lasting until the Senate reconvenes and votes on the official." },
  { id: "g-removal-power", term: "removal power", display: "removal power", branch: "presidency", topic: "2.5",
    meaning: "Executive appointees serve at the pleasure of the president, except heads of independent regulatory agencies, who can be removed only upon showing cause." },
  { id: "g-eop", term: "Executive Office of the President", display: "Executive Office of the President (EOP)", branch: "presidency", topic: "2.5",
    meaning: "The cluster of agencies created in 1939 that handles the budget, the economy and staffing across the bureaucracy for the president." },

  // --- The Presidency: Topic 2.6, expansion of power ---------------------
  { id: "g-federalist-70", term: "Federalist No. 70", display: "Federalist No. 70", branch: "presidency", topic: "2.6",
    meaning: "Hamilton's argument that energy in a single executive protects good government and keeps blame from being shifted from person to person." },
  { id: "g-imperial-presidency", term: "imperial presidency", display: "imperial presidency", branch: "presidency", topic: "2.6",
    meaning: "A presidency characterized by greater powers than the Constitution allows, a term Arthur Schlesinger Jr. popularized in 1973." },
  { id: "g-stewardship", term: "stewardship theory", display: "stewardship theory", branch: "presidency", topic: "2.6",
    meaning: "Theodore Roosevelt's view that the president has a duty to do whatever the national interest requires unless the Constitution clearly forbids it." },
  { id: "g-twenty-second", term: "Twenty-second Amendment", display: "Twenty-second Amendment (1951)", branch: "presidency", topic: "2.6",
    meaning: "The term limit on the presidency, capping service at two terms and at ten years for someone who first reaches the office by filling a vacancy." },
  { id: "g-war-powers-act", term: "War Powers Act", display: "War Powers Act (1973)", branch: "presidency", topic: "2.6",
    meaning: "The law preserving Congress's war-declaring authority: the president notifies Congress within 48 hours, and Congress votes within 60 days, or 90 with an extension." },

  // --- The Presidency: Topic 2.7, presidential communication -------------
  { id: "g-bully-pulpit", term: "bully pulpit", display: "bully pulpit", branch: "presidency", topic: "2.7",
    meaning: "Theodore Roosevelt's term for the presidency as an excellent stage from which to pitch ideas to the people, who then pressure Congress." },
  { id: "g-state-of-union", term: "State of the Union Address", display: "State of the Union Address", branch: "presidency", topic: "2.7",
    meaning: "The president's constitutionally required report to Congress; Jefferson made it a written document and Wilson revived it as a speech in 1913." },

  // --- The Judiciary: Topic 2.8 ------------------------------------------
  { id: "g-judicial-review", term: "judicial review", display: "judicial review", branch: "judiciary", topic: "2.8",
    meaning: "The courts' power to examine acts of the other branches and declare void anything repugnant to the Constitution." },
  { id: "g-marbury", term: "Marbury v. Madison", display: "Marbury v. Madison (1803)", branch: "judiciary", topic: "2.8",
    meaning: "The unanimous decision striking down Section 13 of the Judiciary Act of 1789 and instituting the practice of judicial review." },
  { id: "g-federalist-78", term: "Federalist No. 78", display: "Federalist No. 78", branch: "judiciary", topic: "2.8",
    meaning: "Hamilton's defense of an independent judiciary as the least dangerous branch, holding neither sword nor purse and needing permanency in office." },
  { id: "g-original-jurisdiction", term: "original jurisdiction", display: "original jurisdiction", branch: "judiciary", topic: "2.8",
    meaning: "The authority to hear a case for the first time; the Supreme Court has it in cases affecting ambassadors and public ministers and those where a state is a party." },
  { id: "g-appellate-jurisdiction", term: "appellate jurisdiction", display: "appellate jurisdiction", branch: "judiciary", topic: "2.8",
    meaning: "The authority to review a lower court's decision, which is how the Supreme Court acts for the most part." },
  { id: "g-certiorari", term: "certiorari", display: "certiorari", branch: "judiciary", topic: "2.8",
    meaning: "Latin for to make more certain; the basis on which a losing party asks a higher court to review a case." },
  { id: "g-district-courts", term: "U.S. District Courts", display: "U.S. District Courts", branch: "judiciary", topic: "2.8",
    meaning: "The 94 federal trial courts with original jurisdiction, where nearly 700 judges hear federal crimes, lawsuits and constitutional disputes." },
  { id: "g-circuit-courts", term: "U.S. Circuit Courts of Appeals", display: "U.S. Circuit Courts of Appeals", branch: "judiciary", topic: "2.8",
    meaning: "The 11 regional appeals courts, plus the D.C. and Federal Circuits, where panels of three judges rule on points of law rather than facts." },
  { id: "g-supreme-court", term: "U.S. Supreme Court", display: "U.S. Supreme Court", branch: "judiciary", topic: "2.8",
    meaning: "The chief justice and eight associate justices, who hear 80 to 100 cases a year and overturn about 70 percent of the cases they take." },
  { id: "g-attorney-general", term: "Attorney General", display: "Attorney General", branch: "judiciary", topic: "2.8",
    meaning: "The head of the Department of Justice, under whom the 94 U.S. attorneys prosecute federal crimes." },
  { id: "g-judiciary-act", term: "Judiciary Act of 1789", display: "Judiciary Act of 1789", branch: "judiciary", topic: "2.8",
    meaning: "The first Congress's law building the three-tier federal court system and setting the Supreme Court at six justices; its Section 13 fell in Marbury." },
  { id: "g-good-behavior", term: "good behavior", display: "good behavior tenure", branch: "judiciary", topic: "2.8",
    meaning: "Article III's life term for federal judges, which frees them to make unpopular but necessary decisions; their salaries also cannot be reduced." },
  { id: "g-treason", term: "treason", display: "treason", branch: "judiciary", topic: "2.8",
    meaning: "The only crime defined in the Constitution: levying war against the United States or giving aid and comfort to the enemy, needing two witnesses in open court." },
  { id: "g-sovereign-immunity", term: "sovereign immunity", display: "sovereign immunity", branch: "judiciary", topic: "2.8",
    meaning: "The doctrine that the government is protected from suit unless it permits the claim; Congress has carved out many exceptions." },
  { id: "g-class-action", term: "class action suit", display: "class action suit", branch: "judiciary", topic: "2.8",
    meaning: "A civil suit filed by a large group of plaintiffs who accuse the same party of having damaged all of them." },
  { id: "g-injunction", term: "injunction", display: "injunction", branch: "judiciary", topic: "2.8",
    meaning: "A court order to the losing party in a civil suit requiring them to act, or to stop acting, in order to redress a wrong." }
];

const govBranchesBank = [
  // =======================================================================
  // CONGRESS - Topic 2.3, congressional behavior (AMSCO pp. 124-132)
  // =======================================================================

  {
    id: "gb011", term: "gerrymandering", branch: "congress", topic: "2.3",
    questionType: "definition", difficulty: "easy",
    question: "Gerrymandering is best defined as",
    options: ["drawing district lines in illogical shapes to give one party an advantage", "redrawing districts every ten years in response to the census", "shifting a state's electoral votes toward the national popular-vote winner", "a state legislature's refusal to redraw districts at all"],
    answer: "drawing district lines in illogical shapes to give one party an advantage",
    explanation: "Redistricting after the census is the routine, constitutionally required part. Gerrymandering is what happens when the party controlling a state legislature bends those lines to manufacture safe seats, as the 1812 Massachusetts salamander did."
  },
  {
    id: "gb030", term: "gridlock", branch: "congress", topic: "2.3",
    questionType: "definition", difficulty: "medium",
    question: "As the AMSCO text uses the term, gridlock refers to",
    options: ["opposing forces congesting the process so that ideas cannot move forward", "a formal Senate rule that halts debate on a bill", "the ten-day period a president has to act on a bill", "the House practice of referring one bill to several committees at once"],
    answer: "opposing forces congesting the process so that ideas cannot move forward",
    explanation: "Gridlock describes the jam itself rather than any single rule. It builds up inside a chamber and between Congress and the president, and intensifying partisanship has deepened it; the 2018 to 2019 shutdown ran 35 days."
  },
  {
    id: "gb031", term: "trustee model", branch: "congress", topic: "2.3",
    questionType: "scenario", difficulty: "medium",
    question: "A senator votes against a bill her state's voters strongly favor, because she has studied it closely and concluded it would harm them. Which model of representation is she following?",
    options: ["The trustee model", "The delegate model", "The politico model", "The organizational approach"],
    answer: "The trustee model",
    explanation: "A trustee is entrusted to use her own best judgment even when it cuts against constituent opinion, an approach more common in the Senate. A delegate would have voted the way the folks back home wanted, whatever she thought of the bill."
  },
  {
    id: "gb032", term: "delegate model", branch: "congress", topic: "2.3",
    questionType: "scenario", difficulty: "medium",
    question: "At a town hall, an angry voter tells his representative: \"We didn't send you to Washington to make intelligent decisions, we sent you to represent us.\" The voter is demanding which model of representation?",
    options: ["The delegate model", "The trustee model", "The politico model", "Descriptive representation"],
    answer: "The delegate model",
    explanation: "That constituent wants a delegate, someone who mirrors the district's will rather than substituting his own judgment. The text notes the approach is especially common in the House, where districts are smaller and elections come every two years."
  },
  {
    id: "gb033", term: "lame duck president", branch: "congress", topic: "2.3",
    questionType: "scenario", difficulty: "medium",
    question: "In 2016 the Senate refused even to consider President Obama's Supreme Court nominee, arguing the choice belonged to the next president. The text uses this episode to illustrate",
    options: ["a lame duck president's weakened leverage under divided government", "the Senate's power to impeach a sitting justice", "a pocket veto applied to a presidential appointment", "the use of a recess appointment to fill a vacancy"],
    answer: "a lame duck president's weakened leverage under divided government",
    explanation: "A lame duck is a president who has lost reelection or is closing in on the end of a second term. With the opposing party holding the Senate, Merrick Garland never received a hearing, and the seat went to Neil Gorsuch in 2017."
  },
  {
    id: "gb034", term: "Baker v. Carr", branch: "congress", topic: "2.3",
    questionType: "case", difficulty: "medium",
    question: "What did the Supreme Court actually decide in Baker v. Carr (1962)?",
    options: ["That the fairness of legislative districts is a question federal courts may hear", "That Tennessee's districts were unconstitutional and had to be redrawn immediately", "That every congressional district must contain exactly the same number of people", "That race may never be considered when district lines are drawn"],
    answer: "That the fairness of legislative districts is a question federal courts may hear",
    explanation: "Baker was about jurisdiction, not remedy. The Court held the issue justiciable rather than a political question, then left the lower courts to decide whether an inequality actually existed. Chief Justice Warren later called it the most important case of his tenure."
  },
  {
    id: "gb035", term: "Shaw v. Reno", branch: "congress", topic: "2.3",
    questionType: "case", difficulty: "medium",
    question: "In Shaw v. Reno (1993), what made North Carolina's new 12th district constitutionally suspect?",
    options: ["Its shape was so irregular that nothing but race could explain it", "It held far more residents than any other district in the state", "It crossed state lines in order to link two urban areas", "It had been drawn by a federal court rather than by the legislature"],
    answer: "Its shape was so irregular that nothing but race could explain it",
    explanation: "The district ran 160 miles along Interstate 85, at points no wider than the highway. The Court did not hold that race can never be a factor. It held that a district explainable only by race must be narrowly tailored to a compelling state interest."
  },
  {
    id: "gb036", term: "racial gerrymandering", branch: "congress", topic: "2.3",
    questionType: "compare", difficulty: "medium",
    question: "Racial gerrymandering has been struck down for two opposite-sounding reasons. Which pair does the text describe?",
    options: ["Diluting Black votes violated the Fifteenth Amendment, and overcorrecting by race alone violated the Fourteenth", "It violates the First Amendment in the South and the Tenth Amendment elsewhere", "It is forbidden in congressional maps but permitted in state legislative maps", "It is unconstitutional only when a federal court rather than a legislature draws the map"],
    answer: "Diluting Black votes violated the Fifteenth Amendment, and overcorrecting by race alone violated the Fourteenth",
    explanation: "Gomillion v. Lightfoot struck down Tuskegee's 28-sided border because it pushed Black neighborhoods outside the city, a voting-rights violation. Shaw v. Reno then found that a district defined only by race offended the equal protection clause."
  },
  {
    id: "gb039", term: "swing district", branch: "congress", topic: "2.3",
    questionType: "definition", difficulty: "medium",
    question: "A district where elections are consistently close, so that either party might win it, is called",
    options: ["a swing or marginal seat", "a safe seat", "a majority-minority district", "an at-large district"],
    answer: "a swing or marginal seat",
    explanation: "A safe seat is one a party wins by more than 55 percent. With each party holding more than 180 safe seats, only about 75 marginal seats are genuinely up for grabs in a given election."
  },
  {
    id: "gb044", term: "swing district", branch: "congress", topic: "2.3",
    questionType: "application", difficulty: "hard",
    question: "Each party now holds more than 180 safe seats, leaving roughly 75 marginal ones. The text argues this pattern pushes members toward the ideological extremes because",
    options: ["in a safe seat the primary, not the November election, decides who wins", "safe-seat members face stricter campaign finance limits", "the Rules Committee grants safe-seat members extra floor time", "marginal seats are exempt from party-line voting expectations"],
    answer: "in a safe seat the primary, not the November election, decides who wins",
    explanation: "When the general election is a formality, the real threat is getting primaried by a more ideological challenger who can attack a record of compromise. That lowers the incentive to deal and shrinks the number of moderates in Congress."
  },
  {
    id: "gb045", term: "Baker v. Carr", branch: "congress", topic: "2.3",
    questionType: "case", difficulty: "hard",
    question: "Baker v. Carr broke with the position the Court had taken in Colegrove v. Green. What had Colegrove held?",
    options: ["That unfair districting was a political thicket for voters and legislatures, not courts, to fix", "That the Fifteenth Amendment barred any consideration of race in districting", "That states could ignore census results when drawing boundaries", "That only Congress could set the size of state legislative districts"],
    answer: "That unfair districting was a political thicket for voters and legislatures, not courts, to fix",
    explanation: "In 1946 Justice Frankfurter warned the Court away from the political thicket, saying voters should force a legislature's hand or vote it out. Baker reversed course by calling the question justiciable, capable of being answered with legal reasoning."
  },
  {
    id: "gb046", term: "mixed", branch: "congress", topic: "2.3",
    questionType: "compare", difficulty: "hard",
    question: "Baker v. Carr and Shaw v. Reno both turned on the Fourteenth Amendment but pushed in different directions. Which statement captures the difference?",
    options: ["Baker attacked districts that diluted votes by population, while Shaw attacked a district drawn on race alone", "Baker concerned congressional districts while Shaw concerned state legislative districts", "Baker was unanimous while Shaw split the Court eight to one", "Baker let courts into redistricting and Shaw closed the door again"],
    answer: "Baker attacked districts that diluted votes by population, while Shaw attacked a district drawn on race alone",
    explanation: "Both used the equal protection clause against different problems. In Tennessee a third of the voters elected two-thirds of the legislators; in North Carolina the shape itself was the evidence. Shaw was decided 5 to 4, and it kept courts firmly in the redistricting business."
  },
  {
    id: "gb047", term: "politico model", branch: "congress", topic: "2.3",
    questionType: "scenario", difficulty: "hard",
    question: "A representative polls his district on a high-profile bill and votes with the majority, but on a technical bill nobody back home is watching he votes his own way. Which description fits best?",
    options: ["The politico model, which mixes the other two depending on the issue", "The delegate model, applied consistently", "The trustee model, applied consistently", "Organizational voting, following the party leadership"],
    answer: "The politico model, which mixes the other two depending on the issue",
    explanation: "The politico blends the delegate and trustee approaches. Constituent opinion drives the vote when it runs strong, and the member's own political calculation fills the gap when the public is not paying attention."
  },
  {
    id: "gb048", term: "one person-one vote", branch: "congress", topic: "2.3",
    questionType: "application", difficulty: "hard",
    question: "In the Tennessee districts challenged in Baker v. Carr, a third of the state's voters elected two-thirds of its legislators, and some voters had a twentieth of the voting power of others. Which principle does that outcome violate?",
    options: ["One person-one vote, since a minority of voters held a majority of voting power", "Federalism, since state legislatures cannot draw their own districts", "Separation of powers, since only Congress may apportion seats", "Due process, since the districts had been drawn without public hearings"],
    answer: "One person-one vote, since a minority of voters held a majority of voting power",
    explanation: "Tennessee had not redrawn its 95 districts since the 1900 census while its cities grew and rural areas did not. The result was minority rule, which is why Baker is remembered for establishing that each person's vote must carry equal weight."
  },

  {
    id: "gb130", term: "delegate model", branch: "congress", topic: "2.3",
    questionType: "compare", difficulty: "easy",
    question: "Two lawmakers face the same unpopular bill. One votes the way her district wants; the other votes his own conscience. Which models are they using?",
    options: ["The first is a delegate, the second a trustee", "The first is a trustee, the second a delegate", "Both are following the politico model", "Both are following the delegate model"],
    answer: "The first is a delegate, the second a trustee",
    explanation: "A delegate acts as the constituency's agent and mirrors its will, which the text says is most common in the House. A trustee is entrusted to use their own judgment regardless, an approach more common in the Senate."
  },
  {
    id: "gb131", term: "swing district", branch: "congress", topic: "2.3",
    questionType: "definition", difficulty: "easy",
    question: "A district a party consistently wins by more than 55 percent of the vote is known as",
    options: ["a safe seat", "a swing district", "a marginal seat", "a majority-minority district"],
    answer: "a safe seat",
    explanation: "Safe seats are the opposite of swing districts, which the text also calls marginal seats. Each party now holds more than 180 safe seats, which leaves only about 75 genuinely competitive ones."
  },
  {
    id: "gb132", term: "divided government", branch: "congress", topic: "2.3",
    questionType: "definition", difficulty: "easy",
    question: "Government is described as divided when",
    options: ["the president is of one party and the House and/or Senate is controlled by the other", "the House and the Senate are controlled by different parties", "no party holds a majority in either chamber", "the Supreme Court is split evenly between the parties"],
    answer: "the president is of one party and the House and/or Senate is controlled by the other",
    explanation: "The split that matters here is between the branches, not within Congress. Divided government fuels partisan gridlock, and the text points to judicial nominations as the place it bites hardest."
  },
  {
    id: "gb133", term: "gerrymandering", branch: "congress", topic: "2.3",
    questionType: "process", difficulty: "easy",
    question: "How often are congressional districts redrawn, and what triggers the redrawing?",
    options: ["Every ten years, following the constitutionally required census", "Every two years, as each new Congress is seated", "Every four years, with each presidential election", "Whenever the majority party in Congress votes to redraw them"],
    answer: "Every ten years, following the constitutionally required census",
    explanation: "Population shifts between censuses, so the map has to follow. State legislatures usually run the process, and because the majority party there normally controls the new statewide map, a routine housekeeping task turns into a partisan fight."
  },
  {
    id: "gb134", term: "one person-one vote", branch: "congress", topic: "2.3",
    questionType: "definition", difficulty: "easy",
    question: "The \"one person-one vote\" principle holds that",
    options: ["each person's vote must carry roughly equal weight", "each citizen may cast only one ballot per election", "each state must receive an equal number of House seats", "each district must contain voters of only one political party"],
    answer: "each person's vote must carry roughly equal weight",
    explanation: "The principle is about the weight of a vote, not the number of ballots. In the Tennessee districts behind Baker v. Carr, some voters had a twentieth of the voting power of others, and that disparity is what the phrase was coined against."
  },
  {
    id: "gb135", term: "gridlock", branch: "congress", topic: "2.3",
    questionType: "compare", difficulty: "easy",
    question: "Congress as an institution has recently polled below 20 percent approval. What does the text say about how voters rate their own representative?",
    options: ["Most individual members enjoy about 60 percent approval from their own constituents", "Individual members poll even lower than the institution", "Individual members are rarely polled, since districts are too small", "Approval of individual members has tracked the institution almost exactly"],
    answer: "Most individual members enjoy about 60 percent approval from their own constituents",
    explanation: "People dislike Congress and re-elect their own member, which is part of why incumbents have so little incentive to change how the institution works. Veteran congressman Lee Hamilton joked that the job description would make a brutal help-wanted ad."
  },
  {
    id: "gb136", term: "gridlock", branch: "congress", topic: "2.3",
    questionType: "application", difficulty: "medium",
    question: "From the 1950s into the 1970s, political scientists complained that on many issues it was hard to tell the two parties apart. Which change does the text credit for that no longer being true?",
    options: ["Moderates in both parties, especially Southern Democrats, were replaced by more ideological members", "The parties adopted formal platforms for the first time", "Congress abolished the seniority system for committee chairs", "The Supreme Court required parties to take opposing positions on major bills"],
    answer: "Moderates in both parties, especially Southern Democrats, were replaced by more ideological members",
    explanation: "As Republicans retired, more conservative Republicans replaced them, and Southern Democrats, once a moderating force, all but disappeared. Party-line voting became the norm and straying from the party became dangerous for anyone hoping to be reelected."
  },
  {
    id: "gb137", term: "gerrymandering", branch: "congress", topic: "2.3",
    questionType: "application", difficulty: "medium",
    question: "Several states have used citizen ballot initiatives to hand redistricting to independent commissions. Which problem is that meant to solve?",
    options: ["The party controlling a state legislature draws the map that decides its own seats", "Federal courts had refused to hear any redistricting case", "The census undercounts population in urban districts", "Congress lacked the authority to set the number of House seats"],
    answer: "The party controlling a state legislature draws the map that decides its own seats",
    explanation: "Redistricting by the legislature lets the majority party pick its voters, which the text says has increased partisanship and decreased accountability. Taking the pen out of the parties' hands is the counter-move."
  },
  {
    id: "gb138", term: "Shaw v. Reno", branch: "congress", topic: "2.3",
    questionType: "compare", difficulty: "medium",
    question: "Which statement about the Court's holding in Shaw v. Reno (1993) is accurate?",
    options: ["Race may be one factor in drawing a district, but a district explainable only by race must serve a compelling interest", "Race may never be considered when district lines are drawn", "Majority-minority districts were declared unconstitutional in every state", "District shape is irrelevant so long as population is equal"],
    answer: "Race may be one factor in drawing a district, but a district explainable only by race must serve a compelling interest",
    explanation: "The Court said plainly that race-conscious decisions are not impermissible in all circumstances. What it would not accept was a district so irregular on its face that nothing except sorting voters by race could explain it."
  },
  {
    id: "gb139", term: "gridlock", branch: "congress", topic: "2.3",
    questionType: "compare", difficulty: "hard",
    question: "Divided government and gridlock are related but not the same thing. Which statement captures the difference?",
    options: ["Divided government is a fact about who holds which office; gridlock is the congestion that can follow, and it also happens inside a single chamber", "Gridlock is a Senate rule, while divided government is a constitutional requirement", "Divided government describes the Supreme Court, while gridlock describes Congress", "They are two names for the same arrangement of party control"],
    answer: "Divided government is a fact about who holds which office; gridlock is the congestion that can follow, and it also happens inside a single chamber",
    explanation: "Divided government is one common cause, not the definition. The text describes gridlock building up within each house as well as between Congress and the president, which is why a party holding everything is no guarantee that anything moves."
  },
  {
    id: "gb140", term: "delegate model", branch: "congress", topic: "2.3",
    questionType: "compare", difficulty: "hard",
    question: "The text splits the representation a delegate provides into substantive and descriptive. What is descriptive representation?",
    options: ["Advocating for the traits that make a constituency distinctive, such as its geography, occupations or ethnicity", "Describing votes to constituents in plain language after the fact", "Advocating on behalf of a particular group of constituents on the issues they care about", "Publishing a written record of every vote a member casts"],
    answer: "Advocating for the traits that make a constituency distinctive, such as its geography, occupations or ethnicity",
    explanation: "Substantive representation is advocating for what a group of constituents wants; descriptive representation goes further and speaks for what makes them who they are. A delegate can be doing either, or both, while still mirroring the district."
  },

  // =======================================================================
  // THE PRESIDENCY - Topics 2.4, 2.5, 2.6, 2.7 (AMSCO pp. 138-171)
  // =======================================================================

  {
    id: "gb051", term: "formal powers", branch: "presidency", topic: "2.4",
    questionType: "compare", difficulty: "easy",
    question: "Which of these is a formal power of the president, written into Article II?",
    options: ["Vetoing a bill passed by Congress", "Threatening a veto so Congress softens a bill", "Personally calling wavering senators to win their votes", "Going on television to build public pressure on Congress"],
    answer: "Vetoing a bill passed by Congress",
    explanation: "Formal powers are the ones the Constitution lists. The other three are informal: real political tools, and often decisive ones, but they exist because presidents use them rather than because Article II grants them."
  },
  {
    id: "gb052", term: "policy agenda", branch: "presidency", topic: "2.4",
    questionType: "definition", difficulty: "easy",
    question: "A president's policy agenda is",
    options: ["the set of issues the president treats as priorities and pushes government to act on", "the daily schedule kept by the chief of staff", "the list of bills Congress has already sent to the desk", "the budget proposal the OMB submits each year"],
    answer: "the set of issues the president treats as priorities and pushes government to act on",
    explanation: "The agenda is what a president campaigned on and now wants to accomplish. Every power discussed in this unit, formal and informal, is ultimately a tool for moving it through a government designed to resist quick change."
  },
  {
    id: "gb053", term: "veto", branch: "presidency", topic: "2.4",
    questionType: "process", difficulty: "easy",
    question: "Once Congress sends a bill to the president, how long does the president have to sign or veto it?",
    options: ["Ten days, not counting Sundays", "Thirty days from the date of passage", "Until the end of the current congressional session", "Forty-eight hours, as with military action"],
    answer: "Ten days, not counting Sundays",
    explanation: "If the president does nothing during those ten days while Congress is in session, the bill becomes law anyway. The clock only becomes a weapon at the very end of a session, which is where the pocket veto comes in."
  },
  {
    id: "gb054", term: "Cabinet", branch: "presidency", topic: "2.5",
    questionType: "definition", difficulty: "easy",
    question: "The Cabinet consists of",
    options: ["the heads of the executive departments, who advise the president and run those departments", "the president's personal staff in the West Wing", "the Senate committee chairs who confirm presidential appointees", "the top uniformed officer from each branch of the military"],
    answer: "the heads of the executive departments, who advise the president and run those departments",
    explanation: "Fifteen department secretaries form the core, and presidents may add others. Article II only alludes to them, as the principal officers in each of the executive departments. The last option describes the Joint Chiefs of Staff."
  },
  {
    id: "gb055", term: "bully pulpit", branch: "presidency", topic: "2.7",
    questionType: "definition", difficulty: "easy",
    question: "Theodore Roosevelt called the presidency a bully pulpit. By bully he meant",
    options: ["excellent, a first-rate stage from which to pitch ideas", "aggressive, a platform for intimidating opponents", "temporary, a stage that lasts only a single term", "shared, a platform the president divides with Congress"],
    answer: "excellent, a first-rate stage from which to pitch ideas",
    explanation: "In Roosevelt's day bully meant excellent. The mechanism is indirect: speak to the people, and the people pressure their own representatives. His colorful remarks made him a reliable story, which amplified the effect."
  },
  {
    id: "gb056", term: "Commander in Chief", branch: "presidency", topic: "2.4",
    questionType: "definition", difficulty: "easy",
    question: "The Constitution makes the president Commander in Chief, but it assigns which related power to Congress?",
    options: ["The power to declare war", "The power to promote generals", "The power to position troops overseas", "The power to negotiate a cease-fire"],
    answer: "The power to declare war",
    explanation: "The framers split military authority deliberately: command to one person who can act fast, the decision to go to war to the many. What counts as a war is the question that has never been settled."
  },
  {
    id: "gb057", term: "executive order", branch: "presidency", topic: "2.4",
    questionType: "definition", difficulty: "medium",
    question: "An executive order is best understood as",
    options: ["a presidential directive with the effect of law that tells the executive branch how to operate", "a law the president writes that Congress must then ratify", "a formal request that Congress take up a particular bill", "a written explanation of how the president reads a bill being signed"],
    answer: "a presidential directive with the effect of law that tells the executive branch how to operate",
    explanation: "Executive orders administer the government and carry out existing law, from Truman's 1948 order integrating the military to restrictions on entry from certain countries in 2017. The last option describes a signing statement, which is commentary rather than a directive."
  },
  {
    id: "gb058", term: "pocket veto", branch: "presidency", topic: "2.4",
    questionType: "application", difficulty: "medium",
    question: "A bill reaches the president during the final ten days of a congressional session. The president neither signs it nor returns it, and the session ends. What is the result?",
    options: ["The bill dies, by pocket veto", "The bill becomes law without a signature", "The bill returns to the House for a fresh vote", "Congress may override it by two-thirds when it reconvenes"],
    answer: "The bill dies, by pocket veto",
    explanation: "Outside that window, presidential silence lets a bill become law. Inside it there is no chamber left to receive a returned veto, so the bill simply dies, and there is nothing for Congress to override."
  },
  {
    id: "gb059", term: "veto", branch: "presidency", topic: "2.4",
    questionType: "process", difficulty: "medium",
    question: "What does overriding a presidential veto require, and how often does it succeed?",
    options: ["Two-thirds of each house, and fewer than one veto in ten is overridden", "A simple majority of each house, and roughly half are overridden", "Three-fifths of the Senate alone, and about a third are overridden", "Two-thirds of the Senate alone, and almost none are overridden"],
    answer: "Two-thirds of each house, and fewer than one veto in ten is overridden",
    explanation: "The two-thirds bar in both chambers is hard to clear, especially since a president's own party usually supplies more than a third of one house. That is why the mere threat of a veto reshapes bills before they ever pass."
  },
  {
    id: "gb060", term: "line-item veto", branch: "presidency", topic: "2.4",
    questionType: "case", difficulty: "medium",
    question: "Congress gave the president a line-item veto in 1996. Why is there no line-item veto today?",
    options: ["The Supreme Court struck it down in Clinton v. City of New York (1998)", "Congress repealed it after the next election", "Presidents declined to use it, so the authority lapsed", "The Senate never ratified it, since it was submitted as a treaty"],
    answer: "The Supreme Court struck it down in Clinton v. City of New York (1998)",
    explanation: "New York City sued after President Clinton cut money earmarked for it. The Court held that handing Congress's enumerated spending power to the president would take a constitutional amendment. Many governors still hold the power at the state level."
  },
  {
    id: "gb061", term: "signing statements", branch: "presidency", topic: "2.4",
    questionType: "scenario", difficulty: "medium",
    question: "A president signs a bill and at the same moment issues a document explaining how the administration will read an ambiguous section of it. Critics say the practice gives the president extra input at the last moment. What is it?",
    options: ["A signing statement", "A pocket veto", "An executive agreement", "A line-item veto"],
    answer: "A signing statement",
    explanation: "A signing statement says, in effect, here is how I understand what I am signing and how I plan to enforce it. Because a president cannot change a bill's wording, opponents argue the practice bends the basic design of lawmaking."
  },
  {
    id: "gb062", term: "executive privilege", branch: "presidency", topic: "2.4",
    questionType: "case", difficulty: "medium",
    question: "What did United States v. Nixon (1974) establish about executive privilege?",
    options: ["It is constitutional, but it does not shield evidence in a criminal investigation", "It does not exist anywhere in constitutional law", "It covers any communication a president chooses to label confidential", "It applies only to conversations with foreign heads of state"],
    answer: "It is constitutional, but it does not shield evidence in a criminal investigation",
    explanation: "The Court acknowledged that presidents sometimes need confidential advice, a claim running back to Washington's precedent. But it held unanimously that the Watergate tapes amounted to criminal evidence, and Nixon turned them over."
  },
  {
    id: "gb063", term: "executive agreement", branch: "presidency", topic: "2.4",
    questionType: "compare", difficulty: "medium",
    question: "A president wants a deal with another country finished quickly and quietly. Choosing an executive agreement over a treaty means the deal",
    options: ["skips the Senate's two-thirds vote but does not bind the next president", "needs only a simple majority in both houses of Congress", "carries exactly the same permanence as a ratified treaty", "must still be approved by the Senate Foreign Relations Committee"],
    answer: "skips the Senate's two-thirds vote but does not bind the next president",
    explanation: "An executive agreement is a contract between heads of state, and Kennedy used that speed during the Cuban Missile Crisis. The trade-off is durability: it cannot violate prior treaties or acts of Congress, and a successor can simply walk away."
  },
  {
    id: "gb064", term: "bargaining and persuasion", branch: "presidency", topic: "2.4",
    questionType: "scenario", difficulty: "medium",
    question: "A president spends weeks personally telephoning wavering senators, stages an event showing how a bill would help typical families, and closes the deal himself. Which power is at work?",
    options: ["Bargaining and persuasion, an informal power", "The veto, a formal power", "Executive privilege, a formal power", "Advice and consent, a shared power"],
    answer: "Bargaining and persuasion, an informal power",
    explanation: "Nothing in Article II mentions phone calls or salesmanship. This is how the Tax Cuts and Jobs Act passed, and it is the same tool Carter used when his team briefed members one at a time to win the Panama Canal treaties, 68 to 32."
  },
  {
    id: "gb065", term: "chief of staff", branch: "presidency", topic: "2.5",
    questionType: "definition", difficulty: "medium",
    question: "The White House chief of staff holds no official policymaking power, yet is among the most influential figures in Washington, because the job",
    options: ["controls the flow of information, paper and people reaching the president", "carries a seat on the National Security Council by statute", "requires Senate confirmation and so conveys formal authority", "includes command authority over the armed forces"],
    answer: "controls the flow of information, paper and people reaching the president",
    explanation: "Eisenhower's chief of staff set the pattern as gatekeeper, responsible for the swift and accurate flow of business so the president could focus on big decisions. Presidents ask the chief's opinion on nearly everything, and that is where the influence lies."
  },
  {
    id: "gb066", term: "Joint Chiefs of Staff", branch: "presidency", topic: "2.5",
    questionType: "definition", difficulty: "medium",
    question: "Which body is made up of the top uniformed official from each military division and advises the president on military strategy?",
    options: ["The Joint Chiefs of Staff", "The National Security Council", "The Executive Office of the President", "The Department of Homeland Security"],
    answer: "The Joint Chiefs of Staff",
    explanation: "The Joint Chiefs sit inside the Defense Department. The National Security Council is broader and includes the president, the secretaries of defense and state, and top intelligence and military leaders, coordinated by the national security adviser."
  },
  {
    id: "gb067", term: "ambassadors", branch: "presidency", topic: "2.5",
    questionType: "definition", difficulty: "medium",
    question: "Which statement about United States ambassadors matches the text?",
    options: ["About a third are political appointees, and the Senate rarely rejects them", "All must come from careers in the foreign service", "They are appointed by the secretary of state without Senate involvement", "They serve fixed six-year terms, as senators do"],
    answer: "About a third are political appointees, and the Senate rarely rejects them",
    explanation: "Roughly two-thirds are career diplomats or regional experts; the rest are donors, former politicians or well-known Americans. Nixon was recorded putting a price on it, saying anybody who wants to be an ambassador must at least give $250,000."
  },
  {
    id: "gb068", term: "recess appointment", branch: "presidency", topic: "2.5",
    questionType: "application", difficulty: "medium",
    question: "Why does the Senate sometimes hold pro forma sessions that last only a few minutes?",
    options: ["To stay technically in session and block recess appointments", "To satisfy a constitutional requirement that it meet daily", "To let senators place holds on pending legislation", "To give the president time to prepare the State of the Union"],
    answer: "To stay technically in session and block recess appointments",
    explanation: "A recess appointment lets a president fill a vacancy while the Senate is away, and the appointee serves until senators return and vote. A pro forma session keeps the Senate in session in form only, which closes that window."
  },
  {
    id: "gb069", term: "Federalist No. 70", branch: "presidency", topic: "2.6",
    questionType: "document", difficulty: "medium",
    question: "In Federalist No. 70, what is Hamilton's central argument about the executive?",
    options: ["A single executive supplies the energy that good administration requires", "The executive should be a council of several equals", "The executive should be chosen directly by the people", "The executive should be limited to one four-year term"],
    answer: "A single executive supplies the energy that good administration requires",
    explanation: "Hamilton wrote to answer Anti-Federalists who feared one man in charge, the fetus of monarchy. His answer was that energy is the most necessary qualification of the executive, and energy is most applicable to power in a single hand."
  },
  {
    id: "gb070", term: "imperial presidency", branch: "presidency", topic: "2.6",
    questionType: "definition", difficulty: "medium",
    question: "The phrase imperial presidency describes",
    options: ["a presidency wielding greater powers than the Constitution allows, guided by a weaker Congress", "the president's Article II authority to command troops abroad", "a formal title presidents claimed after World War II", "the president's authority to negotiate treaties with foreign empires"],
    answer: "a presidency wielding greater powers than the Constitution allows, guided by a weaker Congress",
    explanation: "Arthur Schlesinger Jr. popularized the term in a 1973 book published at the height of the Nixon presidency. The underlying idea is older: Locke argued legislatures respond too slowly in emergencies, so executives get room to grow."
  },
  {
    id: "gb071", term: "stewardship theory", branch: "presidency", topic: "2.6",
    questionType: "definition", difficulty: "medium",
    question: "Theodore Roosevelt's stewardship theory held that a president should",
    options: ["do whatever the national interest requires unless the Constitution clearly forbids it", "act only where the Constitution has expressly granted authority", "defer to Congress on all questions of domestic policy", "consult the Supreme Court before taking any disputed action"],
    answer: "do whatever the national interest requires unless the Constitution clearly forbids it",
    explanation: "Roosevelt reversed the cautious question. Instead of asking where he was authorized, he asked where he was prohibited. As he put it, I have used every ounce of power there was in the office."
  },
  {
    id: "gb072", term: "Twenty-second Amendment", branch: "presidency", topic: "2.6",
    questionType: "definition", difficulty: "medium",
    question: "What is the longest time the Twenty-second Amendment allows one person to serve as president?",
    options: ["Ten years, and only for someone who first reached the office by filling a vacancy", "Eight years, with no exceptions of any kind", "Twelve years, or three full elected terms", "There is no limit, only the custom Washington set"],
    answer: "Ten years, and only for someone who first reached the office by filling a vacancy",
    explanation: "Two elected terms make eight years. Someone who becomes president partway through a predecessor's term and is then elected can reach ten, which is why the amendment, ratified in 1951 after FDR won four elections, is written as a ten-year ceiling."
  },
  {
    id: "gb073", term: "State of the Union Address", branch: "presidency", topic: "2.7",
    questionType: "definition", difficulty: "medium",
    question: "Which president revived the practice of delivering the State of the Union in person as a speech to Congress?",
    options: ["Woodrow Wilson, in 1913", "Thomas Jefferson, in 1801", "Franklin Roosevelt, in 1933", "Theodore Roosevelt, in 1901"],
    answer: "Woodrow Wilson, in 1913",
    explanation: "Washington and Adams delivered theirs in person. Jefferson stopped, saying a speech looked too much like a British monarch opening Parliament, and presidents sent paper for a century. Wilson turned the report back into an event, and every president since has used it to reach a mass audience."
  },
  {
    id: "gb074", term: "informal powers", branch: "presidency", topic: "2.7",
    questionType: "application", difficulty: "medium",
    question: "FDR's fireside chats mattered politically because, after each one,",
    options: ["listeners flooded Congress with letters supporting the president's ideas", "the Supreme Court reviewed the proposals he had described", "Congress was legally required to vote on his proposals within 60 days", "his Cabinet secretaries gained new authority to issue regulations"],
    answer: "listeners flooded Congress with letters supporting the president's ideas",
    explanation: "The radio talks were pure informal power, since no clause grants them. The chain runs president to people to Congress, the same route Theodore Roosevelt used from the bully pulpit and that Obama's team later used through social media."
  },
  {
    id: "gb075", term: "Executive Office of the President", branch: "presidency", topic: "2.5",
    questionType: "compare", difficulty: "medium",
    question: "Presidents often lean on White House staff more heavily than on Cabinet secretaries. The text's explanation is that staffers",
    options: ["answer only to the president, with no department or budget of their own to defend", "must be confirmed by the Senate and so carry more authority", "have longer guaranteed tenures than Cabinet secretaries", "outrank secretaries in the constitutional order of the executive branch"],
    answer: "answer only to the president, with no department or budget of their own to defend",
    explanation: "Secretaries have divided loyalties, since they run large departments that compete for funding. White House staff need no Senate approval, travel with the president daily, and a staffer's influence comes down to access."
  },
  {
    id: "gb076", term: "Commander in Chief", branch: "presidency", topic: "2.4",
    questionType: "compare", difficulty: "medium",
    question: "The Constitution leaves declaring war to Congress, yet the United States has fought far more conflicts than it has declared. Which explanation does the text give?",
    options: ["Defensive responses to threats move too fast for public debate, and Cold War reasoning stretched what counted as defensive", "Congress formally delegated its war power away in a constitutional amendment", "The Supreme Court has held that declarations of war are unconstitutional", "Presidents have always obtained Senate treaty approval before using force"],
    answer: "Defensive responses to threats move too fast for public debate, and Cold War reasoning stretched what counted as defensive",
    explanation: "FDR sent troops to Greenland before any declaration, and Obama's team was on the ground in Pakistan for roughly 40 minutes. As one senator conceded, the difference between safety and cataclysm can be a matter of hours, and imminent-threat theory grew from there."
  },
  {
    id: "gb077", term: "inherent powers", branch: "presidency", topic: "2.5",
    questionType: "application", difficulty: "hard",
    question: "A president claims authority to act during a national emergency even though Article II never mentions the action. The president is asserting",
    options: ["inherent powers", "enumerated powers", "concurrent powers", "reserved powers"],
    answer: "inherent powers",
    explanation: "Inherent powers are those a president argues fall within the executive's jurisdiction even though no clause lists them. Nearly every administration has made the claim when an emergency arose or the Constitution was silent, winning some fights and losing others."
  },
  {
    id: "gb078", term: "removal power", branch: "presidency", topic: "2.5",
    questionType: "compare", difficulty: "hard",
    question: "Which statement accurately describes a president's power to remove executive branch officials?",
    options: ["Most appointees serve at the president's pleasure, but the head of an independent regulatory agency can be removed only upon showing cause", "The Senate must consent to every removal, just as it consents to appointments", "The president may remove any federal official at will, including federal judges", "Officials may be removed only after the House votes to impeach them"],
    answer: "Most appointees serve at the president's pleasure, but the head of an independent regulatory agency can be removed only upon showing cause",
    explanation: "Hamilton wanted the Senate involved in removals; Madison argued the president needs full control of subordinates, and the duty to take care that the laws be faithfully executed pointed his way. Two Court decisions settled it in the pattern above."
  },
  {
    id: "gb079", term: "executive order", branch: "presidency", topic: "2.4",
    questionType: "application", difficulty: "hard",
    question: "Which of the following could a president NOT accomplish by executive order?",
    options: ["Raising the federal income tax rate", "Setting rules for security clearances across federal agencies", "Directing how a department carries out an existing statute", "Banning smoking in federal workplaces"],
    answer: "Raising the federal income tax rate",
    explanation: "Executive orders cannot reach matters under exclusive congressional jurisdiction, such as the tax code, interstate commerce regulation, or redesigning the currency. They also remain open to challenge in court, though the Court upheld both FDR's internment order and the 2017 travel ban."
  },
  {
    id: "gb080", term: "Federalist No. 70", branch: "presidency", topic: "2.6",
    questionType: "document", difficulty: "hard",
    question: "Hamilton argues in Federalist No. 70 that dividing the executive among several people is dangerous partly because it",
    options: ["makes it impossible to tell whom to blame when something goes wrong", "lets the executive move faster than the legislature can supervise", "requires more funding than the new country could afford", "gives the states too much influence over national policy"],
    answer: "makes it impossible to tell whom to blame when something goes wrong",
    explanation: "In his words, multiplying the executive adds to the difficulty of detection, and blame is shifted from one to another with so much dexterity that public opinion is left in the dark. Unity is what makes accountability possible."
  },
  {
    id: "gb081", term: "War Powers Act", branch: "presidency", topic: "2.6",
    questionType: "process", difficulty: "hard",
    question: "Under the War Powers Act (1973), what is supposed to happen after a president commits troops to combat?",
    options: ["Congress is notified within 48 hours and votes to approve or disapprove within 60 days, or 90 with an extension", "Congress must declare war within 48 hours or the troops must come home", "The president must obtain a Senate treaty vote within 30 days", "The Supreme Court reviews the legality of the deployment within 60 days"],
    answer: "Congress is notified within 48 hours and votes to approve or disapprove within 60 days, or 90 with an extension",
    explanation: "Congress passed the act to undo the blank check of the Tonkin Gulf Resolution, which had been rushed through on reports later found untrue. The law tries to hold both things at once: room for urgent action, and a congressional vote that follows it."
  },
  {
    id: "gb082", term: "mixed", branch: "presidency", topic: "2.6",
    questionType: "compare", difficulty: "hard",
    question: "Washington left office after two terms, Lincoln suspended habeas corpus, and Franklin Roosevelt tried to enlarge the Supreme Court. Together these episodes best illustrate that",
    options: ["the reach of the presidency has been defined largely by how individual presidents interpreted it", "Article II has been amended repeatedly to expand presidential power", "Congress formally delegated each of these powers by statute", "the Supreme Court has approved every expansion of presidential power"],
    answer: "the reach of the presidency has been defined largely by how individual presidents interpreted it",
    explanation: "Article II gave Washington a five-paragraph job description, so precedent and personality filled it in. His restraint became a norm later written into the Twenty-second Amendment, Lincoln stretched the office in a crisis, and FDR's court-packing plan failed but showed the impulse."
  },
  {
    id: "gb083", term: "informal powers", branch: "presidency", topic: "2.4",
    questionType: "scenario", difficulty: "hard",
    question: "A president announces that he will veto a spending bill unless a particular provision is removed, and the bill's supporters quietly rewrite it before the vote. What has happened?",
    options: ["An informal power has done the work of a formal one, without a veto ever being cast", "Congress has exercised a pocket veto on its own bill", "The president has used the line-item veto to strike the provision", "The bill has been discharged from committee by petition"],
    answer: "An informal power has done the work of a formal one, without a veto ever being cast",
    explanation: "The formal veto is the rejection itself; the threat of one is informal, and it often supersedes the formal process. Congressional proponents reshape the bill to avoid a fight they would probably lose, since overrides succeed less than a tenth of the time."
  },
  {
    id: "gb084", term: "bargaining and persuasion", branch: "presidency", topic: "2.4",
    questionType: "compare", difficulty: "hard",
    question: "Theodore Roosevelt said of the Panama Canal, \"I took the Canal Zone, and let Congress debate.\" Jimmy Carter, returning the Zone, instead briefed members individually, flew them to the region, and campaigned in their districts. What does the contrast illustrate?",
    options: ["Two different mixes of formal action and informal persuasion in pursuing a policy agenda", "That only formal powers can accomplish foreign policy goals", "That the Senate must ratify any use of the bully pulpit", "That Congress has no role in acquiring or ceding territory"],
    answer: "Two different mixes of formal action and informal persuasion in pursuing a policy agenda",
    explanation: "Roosevelt acted first and let Congress catch up, and the treaty was not ratified until 1904. Carter built his majority in advance, patiently, and the 1978 agreements passed 68 to 32. Both reached a goal, by opposite routes through the same constitutional structure."
  },
  {
    id: "gb085", term: "Cabinet", branch: "presidency", topic: "2.5",
    questionType: "case", difficulty: "hard",
    question: "The Senate has rejected only nine department secretaries by vote in all of American history. What reasoning does the text offer for that record?",
    options: ["A president who won a democratic election is generally granted the prerogative of shaping the administration", "The Constitution bars the Senate from rejecting Cabinet nominees", "Cabinet secretaries do not require Senate confirmation at all", "Presidents submit nominations only when a two-thirds majority is assured"],
    answer: "A president who won a democratic election is generally granted the prerogative of shaping the administration",
    explanation: "Deference explains the pattern, reinforced by heavy vetting before a name is ever announced. Another 13 nominees withdrew before a vote, like John Tower in 1989, whose conflicts of interest sank him 53 to 47."
  },
  {
    id: "gb086", term: "advice and consent", branch: "presidency", topic: "2.5",
    questionType: "compare", difficulty: "hard",
    question: "Standoffs over Cabinet nominees are rare, but fights over judicial nominees are common. Why does the text say the stakes differ?",
    options: ["Judges serve for life and shape the law long after the president has left office", "Judicial nominees are not subject to committee hearings", "Cabinet secretaries can be removed by the Senate at any time", "Judicial nominations require a two-thirds Senate vote"],
    answer: "Judges serve for life and shape the law long after the president has left office",
    explanation: "A secretary leaves when the administration does; a judge may sit for decades. With nearly 1,000 federal judgeships below the nine Supreme Court seats, senators on the Judiciary Committee expect to be consulted and are often slow to consent."
  },
  {
    id: "gb125", term: "executive privilege", branch: "presidency", topic: "2.4",
    questionType: "definition", difficulty: "easy",
    question: "A president refuses to give a congressional committee the advice his aides gave him, arguing that the separation of powers protects it. This claim is called",
    options: ["executive privilege", "an executive order", "an executive agreement", "a signing statement"],
    answer: "executive privilege",
    explanation: "Presidents have asserted the privilege since Washington, mainly to keep the advice of subordinates confidential. It is a real constitutional claim, but U.S. v. Nixon held that it does not cover evidence in a criminal investigation."
  },

  // =======================================================================
  // THE JUDICIARY - Topic 2.8 (AMSCO pp. 176-187)
  // =======================================================================

  {
    id: "gb087", term: "judicial review", branch: "judiciary", topic: "2.8",
    questionType: "definition", difficulty: "easy",
    question: "Judicial review is the power of the courts to",
    options: ["declare an act of the legislature or executive void because it conflicts with the Constitution", "reexamine the facts of a criminal case a second time", "review presidential nominees before the Senate votes on them", "revise a statute's wording so that it becomes constitutional"],
    answer: "declare an act of the legislature or executive void because it conflicts with the Constitution",
    explanation: "Courts strike laws down; they do not rewrite them. Federalist No. 78 argued for the power, saying no legislative act contrary to the Constitution can be valid, and Marbury v. Madison put it into practice in 1803."
  },
  {
    id: "gb088", term: "U.S. District Courts", branch: "judiciary", topic: "2.8",
    questionType: "definition", difficulty: "easy",
    question: "Federal trials, where witnesses testify and juries sit, take place in",
    options: ["the 94 U.S. District Courts", "the 11 U.S. Circuit Courts of Appeals", "the U.S. Supreme Court", "the U.S. Court of Claims"],
    answer: "the 94 U.S. District Courts",
    explanation: "District courts are the trial level, with original jurisdiction over federal crimes, federal lawsuits and constitutional disputes. Nearly 700 judges handle close to 300,000 filings a year, most of them civil."
  },
  {
    id: "gb089", term: "injunction", branch: "judiciary", topic: "2.8",
    questionType: "scenario", difficulty: "easy",
    question: "A court orders a company to stop dumping waste into a river. That order is called",
    options: ["an injunction", "a subpoena", "a writ of mandamus", "an indictment"],
    answer: "an injunction",
    explanation: "An injunction directs the losing party in a civil suit to act, or to stop acting, in order to redress a wrong. A writ of mandamus is the related order compelling an official to perform a duty, which is the remedy Marbury asked for and did not get."
  },
  {
    id: "gb090", term: "good behavior", branch: "judiciary", topic: "2.8",
    questionType: "definition", difficulty: "easy",
    question: "Federal judges hold their offices during good behavior, and Congress may not reduce their pay while they serve. The purpose of both provisions is to",
    options: ["let judges decide unpopular cases without fear of retaliation from the other branches", "guarantee that judges will follow public opinion in their rulings", "keep the federal court system smaller than the state systems", "let the president replace judges who rule against the administration"],
    answer: "let judges decide unpopular cases without fear of retaliation from the other branches",
    explanation: "Life tenure means the elected branches cannot remove a judge over ideology, and the salary clause means Congress cannot use the power of the purse as leverage. Together they buy independence, and the consistency over time that interpreting law requires."
  },
  {
    id: "gb091", term: "Marbury v. Madison", branch: "judiciary", topic: "2.8",
    questionType: "case", difficulty: "medium",
    question: "Who won and who lost in Marbury v. Madison (1803)?",
    options: ["Marbury lost his commission, but the Court gained the power of judicial review", "Marbury received his commission, and Madison was held in contempt", "Jefferson won, and the Court declared it could never hear such disputes", "The case was dismissed before the Court issued any opinion"],
    answer: "Marbury lost his commission, but the Court gained the power of judicial review",
    explanation: "The decision was yes and no. Yes, an appointee with a signed commission could sue; no, this Court had no jurisdiction to grant relief. Marshall gave up a small case in order to establish a very large power."
  },
  {
    id: "gb092", term: "original jurisdiction", branch: "judiciary", topic: "2.8",
    questionType: "compare", difficulty: "medium",
    question: "In which situation does the Supreme Court have original rather than appellate jurisdiction?",
    options: ["A dispute in which a state is one of the parties", "An appeal from a state supreme court on a constitutional question", "A federal criminal conviction appealed from a circuit court", "A civil suit between residents of two different states"],
    answer: "A dispute in which a state is one of the parties",
    explanation: "Original jurisdiction means hearing a case for the first time, and the Constitution limits the Supreme Court's to cases affecting ambassadors and public ministers and those in which a state is a party. For the most part the Court acts as an appeals court."
  },
  {
    id: "gb093", term: "certiorari", branch: "judiciary", topic: "2.8",
    questionType: "definition", difficulty: "medium",
    question: "The Latin term certiorari, meaning to make more certain, refers to",
    options: ["the basis on which a losing party asks a higher court to review a case", "the written opinion a majority of the justices sign", "the order requiring an official to perform a legal duty", "the process by which a federal jury is selected"],
    answer: "the basis on which a losing party asks a higher court to review a case",
    explanation: "The appellant has to point to some violation of established law, procedure or precedent that produced the wrong result below. The third option describes a writ of mandamus, which is what William Marbury was seeking."
  },
  {
    id: "gb094", term: "U.S. Circuit Courts of Appeals", branch: "judiciary", topic: "2.8",
    questionType: "definition", difficulty: "medium",
    question: "Which statement about the U.S. Circuit Courts of Appeals is accurate?",
    options: ["They hear no new evidence and decide narrow questions of law in panels of three judges", "They retry the case in front of a new jury", "They pronounce guilt or innocence in federal criminal appeals", "They hold original jurisdiction over disputes between states"],
    answer: "They hear no new evidence and decide narrow questions of law in panels of three judges",
    explanation: "An appeals courtroom has a bench but no witness stand and no jury box, because the facts were settled below. These courts rule on whether the trial court erred, ignored precedent or violated the Constitution, and over time that is how they have shaped U.S. law."
  },
  {
    id: "gb095", term: "U.S. Supreme Court", branch: "judiciary", topic: "2.8",
    questionType: "definition", difficulty: "medium",
    question: "Which description of the Supreme Court's modern workload is accurate?",
    options: ["It hears 80 to 100 cases from October through June and overturns about 70 percent of them", "It hears every appeal filed from the circuit courts", "It hears roughly 1,000 cases a year, most of them criminal trials", "It hears only cases in which the federal government is a party"],
    answer: "It hears 80 to 100 cases from October through June and overturns about 70 percent of them",
    explanation: "The nine justices choose which appeals to accept, sit en banc for oral argument, and deliberate for weeks or months. The high reversal rate makes sense, since they mostly take cases they suspect were decided wrongly or that need one national answer."
  },
  {
    id: "gb096", term: "Federalist No. 78", branch: "judiciary", topic: "2.8",
    questionType: "document", difficulty: "medium",
    question: "Why did Hamilton call the judiciary the least dangerous branch in Federalist No. 78?",
    options: ["It controls neither the sword nor the purse and can only exercise judgment", "Its judges serve short terms and are easily replaced", "Its rulings require the approval of the other two branches", "It may hear only the cases the president refers to it"],
    answer: "It controls neither the sword nor the purse and can only exercise judgment",
    explanation: "No army and no money, only judgment. Hamilton's point was that the branch most in need of protection could hardly be the one to fear, which is why he argued for permanency in office rather than temporary commissions."
  },
  {
    id: "gb097", term: "Judiciary Act of 1789", branch: "judiciary", topic: "2.8",
    questionType: "definition", difficulty: "medium",
    question: "What did the Judiciary Act of 1789 accomplish?",
    options: ["It built the three-tier federal court system and set the Supreme Court at six justices", "It established the power of judicial review", "It created the Department of Justice and the office of Attorney General", "It fixed the Supreme Court permanently at nine justices"],
    answer: "It built the three-tier federal court system and set the Supreme Court at six justices",
    explanation: "Article III named only the Supreme Court and left the rest to Congress, which acted in its first session, creating one district court per state plus three regional circuits. Judicial review came later, in a case that struck down part of this very act."
  },
  {
    id: "gb098", term: "treason", branch: "judiciary", topic: "2.8",
    questionType: "definition", difficulty: "medium",
    question: "Treason is unusual among crimes because it",
    options: ["is the only crime actually defined in the Constitution", "carries no possibility of a jury trial", "may be tried only by the Supreme Court", "requires no proof of intent"],
    answer: "is the only crime actually defined in the Constitution",
    explanation: "Article III defines it as levying war against the United States or giving aid and comfort to the enemy, and requires at least two witnesses testifying in open court. English kings had used treason charges to silence dissent, and the framers meant to make that difficult here."
  },
  {
    id: "gb099", term: "Attorney General", branch: "judiciary", topic: "2.8",
    questionType: "definition", difficulty: "medium",
    question: "The 94 U.S. attorneys who prosecute federal crimes work under",
    options: ["the Attorney General, in the Department of Justice", "the chief justice of the United States", "the Senate Judiciary Committee", "the U.S. Circuit Courts of Appeals"],
    answer: "the Attorney General, in the Department of Justice",
    explanation: "They are executive branch officials, appointed by the president and confirmed by the Senate, even though they spend their working lives in courtrooms. Nationally they try nearly 80,000 federal crimes a year, mostly immigration and drug offenses."
  },
  {
    id: "gb100", term: "sovereign immunity", branch: "judiciary", topic: "2.8",
    questionType: "definition", difficulty: "medium",
    question: "Sovereign immunity means that",
    options: ["the government cannot be sued unless it has agreed to permit the claim", "federal judges cannot be sued over the rulings they issue", "ambassadors cannot be prosecuted in American courts", "a state may refuse to enforce a federal court order"],
    answer: "the government cannot be sued unless it has agreed to permit the claim",
    explanation: "Congress has carved out so many exceptions that it created the U.S. Court of Claims to hear complaints against the United States. A secretary of defense can be sued personally over a car accident, but not for a death in a battle the government ordered."
  },
  {
    id: "gb101", term: "class action suit", branch: "judiciary", topic: "2.8",
    questionType: "scenario", difficulty: "medium",
    question: "A large group of plaintiffs claims the same company injured all of them and files together in a single case. This is",
    options: ["a class action suit", "an injunction", "a writ of certiorari", "a tort reform petition"],
    answer: "a class action suit",
    explanation: "Grouping the plaintiffs puts one shared claim before one court. Each of them still has to prove liability by a preponderance of evidence, the civil standard, rather than beyond a reasonable doubt."
  },
  {
    id: "gb102", term: "mixed", branch: "judiciary", topic: "2.8",
    questionType: "process", difficulty: "medium",
    question: "Which sequence correctly traces a federal case from its start toward the Supreme Court?",
    options: ["U.S. District Court, then U.S. Circuit Court of Appeals, then the Supreme Court", "U.S. Circuit Court of Appeals, then U.S. District Court, then the Supreme Court", "State supreme court, then U.S. District Court, then the Supreme Court", "U.S. Court of Claims, then U.S. District Court, then the Supreme Court"],
    answer: "U.S. District Court, then U.S. Circuit Court of Appeals, then the Supreme Court",
    explanation: "Trial, then appeal, then possibly the top. The Supreme Court also takes appeals directly from state supreme courts when a federal question is involved, but it never sits beneath another federal court."
  },
  {
    id: "gb103", term: "Marbury v. Madison", branch: "judiciary", topic: "2.8",
    questionType: "case", difficulty: "hard",
    question: "Which law did the Marshall Court strike down in Marbury v. Madison, and on what ground?",
    options: ["Section 13 of the Judiciary Act of 1789, because it gave the Court original jurisdiction Article III had not", "The Judiciary Act of 1801, because it created judgeships after an election", "The Alien and Sedition Acts, because they punished political speech", "The Tenure of Office Act, because it limited the president's removal power"],
    answer: "Section 13 of the Judiciary Act of 1789, because it gave the Court original jurisdiction Article III had not",
    explanation: "Marbury asked for a writ of mandamus under Section 13. Marshall held that Congress could not define the Court's authority outside the bounds of the Constitution, so the very law Marbury relied on was void."
  },
  {
    id: "gb104", term: "appellate jurisdiction", branch: "judiciary", topic: "2.8",
    questionType: "application", difficulty: "hard",
    question: "A defendant convicted in federal district court appeals, arguing that the jury simply believed the wrong witness. Why is this appeal likely to fail?",
    options: ["Appeals courts do not reweigh facts; they look for errors of law, procedure or precedent", "Only the government may appeal a verdict in federal court", "Appeals must be filed with the Supreme Court rather than a circuit court", "A defendant who has already had a jury trial has no right to appeal"],
    answer: "Appeals courts do not reweigh facts; they look for errors of law, procedure or precedent",
    explanation: "The trial court is where facts get determined. On appeal the question narrows to whether the law was applied correctly, which is exactly why an appellate courtroom has no witness stand."
  },
  {
    id: "gb105", term: "Federalist No. 78", branch: "judiciary", topic: "2.8",
    questionType: "document", difficulty: "hard",
    question: "Brutus warned that judges with life terms \"will generally soon feel themselves independent of heaven itself.\" How does Federalist No. 78 answer that objection?",
    options: ["It argues independence is the point, since a branch with neither sword nor purse cannot dominate the others", "It agrees, and proposes that Congress be able to remove judges by majority vote", "It replies that judges would instead serve fixed twelve-year terms", "It claims the states would keep the power to overturn federal rulings"],
    answer: "It argues independence is the point, since a branch with neither sword nor purse cannot dominate the others",
    explanation: "The Anti-Federalists had Parliament in mind, which could remove judges and override their decisions. Hamilton's answer was that the judiciary's natural feebleness leaves it in continual jeopardy, so permanency protects it without endangering anyone else."
  },
  {
    id: "gb106", term: "Federalist No. 78", branch: "judiciary", topic: "2.8",
    questionType: "document", difficulty: "hard",
    question: "Hamilton defends judicial independence in Federalist No. 78 partly by pointing to the harm that would follow if judges did not have it. What harm did he have in mind?",
    options: ["Unjust and partial laws injuring the rights of particular classes of citizens would go unchecked", "The federal courts would be flooded with more cases than they could hear", "The states would refuse to send cases to federal court at all", "Congress would lose the ability to create lower courts"],
    answer: "Unjust and partial laws injuring the rights of particular classes of citizens would go unchecked",
    explanation: "He calls these the occasional ill humors in the society. A judge facing reappointment bends to that pressure; one with permanency in office can hold to what he calls inflexible and uniform adherence to the rights of the Constitution."
  },
  {
    id: "gb107", term: "judicial review", branch: "judiciary", topic: "2.8",
    questionType: "application", difficulty: "hard",
    question: "How often did the Supreme Court strike down an act of Congress in the decades right after Marbury v. Madison?",
    options: ["Rarely; not again until the Dred Scott decision in 1857", "Frequently, roughly once every term", "Never again until the twentieth century", "Only during the Civil War, under emergency powers"],
    answer: "Rarely; not again until the Dred Scott decision in 1857",
    explanation: "The power was asserted in 1803 and then barely used for half a century. Its frequency grew during the Industrial Era from 1874 to 1920 and into the twentieth century, which is when judicial review became a routine feature of American government."
  },
  {
    id: "gb108", term: "original jurisdiction", branch: "judiciary", topic: "2.8",
    questionType: "compare", difficulty: "hard",
    question: "Both the U.S. District Courts and the Supreme Court possess original jurisdiction. What distinguishes the two?",
    options: ["For district courts it is their ordinary work; for the Supreme Court it is a narrow exception the Constitution itself lists", "Only the Supreme Court may hear a case for the first time", "District courts have it in civil cases and the Supreme Court in criminal ones", "District court original jurisdiction must be granted case by case by Congress"],
    answer: "For district courts it is their ordinary work; for the Supreme Court it is a narrow exception the Constitution itself lists",
    explanation: "Original jurisdiction simply means hearing a case first. Every federal trial starts that way in a district court. For the Supreme Court the category covers only ambassadors, public ministers and cases where a state is a party, and Marbury held Congress cannot enlarge it."
  },
  {
    id: "gb126", term: "appellate jurisdiction", branch: "judiciary", topic: "2.8",
    questionType: "definition", difficulty: "easy",
    question: "Almost every case the Supreme Court hears arrives on appeal from a lower court. In taking those cases the Court is exercising its",
    options: ["appellate jurisdiction", "original jurisdiction", "sovereign immunity", "power of advice and consent"],
    answer: "appellate jurisdiction",
    explanation: "Appellate jurisdiction is the authority to review a decision another court already made. The Constitution gives the Court original jurisdiction only over a short list of cases, so for the most part it acts as an appeals court."
  },

  // =======================================================================
  // CROSS-BRANCH - interactions among the three institutions
  // =======================================================================

  {
    id: "gb127", term: "judicial review", branch: "mixed", topic: "2.8",
    questionType: "definition", difficulty: "easy",
    question: "Which branch has the power to declare that a law violates the Constitution?",
    options: ["The judiciary, through judicial review", "Congress, by a two-thirds vote of both houses", "The president, by issuing a veto", "The Senate, through advice and consent"],
    answer: "The judiciary, through judicial review",
    explanation: "A veto stops a bill before it becomes law; judicial review strikes down a law already on the books. Federalist No. 78 argued for the power, and Marbury v. Madison put it into practice in 1803."
  },
  {
    id: "gb128", term: "mixed", branch: "mixed", topic: "2.4",
    questionType: "application", difficulty: "easy",
    question: "A president negotiates and signs a treaty with another country. What has to happen before it binds the United States?",
    options: ["The Senate has to approve it", "The House has to approve it by a simple majority", "The Supreme Court has to review it for constitutionality", "Nothing further; the president's signature completes it"],
    answer: "The Senate has to approve it",
    explanation: "Presidents can facilitate trade or provide for mutual defense by treaty, but only with Senate approval. Woodrow Wilson learned the limit the hard way when the Senate refused to ratify the Treaty of Versailles."
  },
  {
    id: "gb129", term: "veto", branch: "mixed", topic: "2.4",
    questionType: "application", difficulty: "easy",
    question: "Congress passes a bill, the president vetoes it, and both houses then vote for it again by more than two-thirds. What is the result?",
    options: ["The bill becomes law over the president's objection", "The bill returns to committee for a new markup", "The bill goes to the Supreme Court for review", "The bill dies, since a veto cannot be undone"],
    answer: "The bill becomes law over the president's objection",
    explanation: "The override is Congress's answer to the veto, and it is the clearest check either branch holds over the other in the legislative process. It is also rare: fewer than 10 percent of vetoes are overridden."
  },
  {
    id: "gb109", term: "mixed", branch: "mixed", topic: "2.5",
    questionType: "application", difficulty: "easy",
    question: "In 1957 President Eisenhower sent the 101st Airborne Division to Little Rock so that nine Black students could enter Central High School. Which relationship between branches does this show?",
    options: ["The executive enforcing an order the judiciary had issued", "The executive overruling a decision of the judiciary", "Congress compelling the president to act by statute", "The judiciary giving orders directly to the armed forces"],
    answer: "The executive enforcing an order the judiciary had issued",
    explanation: "Courts can say what the law is but command neither sword nor purse, exactly as Federalist No. 78 observed. Enforcement runs through the executive, which is why a president's willingness to act determines whether a ruling has teeth."
  },
  {
    id: "gb112", term: "divided government", branch: "mixed", topic: "2.3",
    questionType: "application", difficulty: "medium",
    question: "Divided government most directly helps explain which of the following patterns?",
    options: ["A rise in the number of vetoes a president casts", "A rise in the number of executive agreements the Senate ratifies", "A drop in the number of bills introduced each Congress", "A drop in the number of standing committees in each chamber"],
    answer: "A rise in the number of vetoes a president casts",
    explanation: "When the opposing party runs Congress, more bills the president dislikes actually reach the desk. Bill Clinton, who faced a Republican Congress for six years, cast 37 vetoes; George W. Bush and Barack Obama each cast 12. Note also that the Senate does not ratify executive agreements at all."
  },
  {
    id: "gb113", term: "mixed", branch: "mixed", topic: "2.8",
    questionType: "case", difficulty: "hard",
    question: "In 1952 the Supreme Court overturned President Truman's decision to nationalize the steel industry during the Korean War. What does the episode illustrate?",
    options: ["The judiciary checking the executive by finding a presidential action unconstitutional", "Congress overriding a presidential veto", "A president's inherent powers being confirmed in wartime", "The Senate withholding advice and consent from an appointee"],
    answer: "The judiciary checking the executive by finding a presidential action unconstitutional",
    explanation: "Truman argued that mobilizing for war and heading off a steelworkers' strike justified the seizure. The Court held he lacked authority to take private property, which remains one of the sharpest limits ever placed on a claim of inherent power."
  },
  {
    id: "gb114", term: "mixed", branch: "mixed", topic: "2.5",
    questionType: "compare", difficulty: "hard",
    question: "Which pair correctly matches a branch with a check it actually holds over the Supreme Court?",
    options: ["The president nominates justices, and the Senate confirms or rejects them", "Congress may remove a justice whose rulings it dislikes by majority vote", "The president may veto a Supreme Court decision within ten days", "The Senate may return a decision to the Court for reconsideration"],
    answer: "The president nominates justices, and the Senate confirms or rejects them",
    explanation: "Appointment and confirmation are the main levers, which is why nomination fights have grown so bitter; 30 Supreme Court nominees have been rejected by Senate vote. Because judges hold office during good behavior, unpopular rulings alone cannot get one removed."
  },
  {
    id: "gb115", term: "executive order", branch: "mixed", topic: "2.5",
    questionType: "scenario", difficulty: "hard",
    question: "A president issues an executive order delaying deportations, 26 states sue, and an evenly divided Supreme Court leaves a lower court's injunction in place. What does the outcome show?",
    options: ["An executive order can be blocked in court, and a tie leaves the lower ruling standing", "Executive orders take effect only after the Senate approves them", "A tied Supreme Court automatically rules in the president's favor", "States may nullify an executive order without going to court"],
    answer: "An executive order can be blocked in court, and a tie leaves the lower ruling standing",
    explanation: "This was Obama's 2014 immigration order, and the Court split 4 to 4 because Justice Scalia had died and the seat sat empty. A single vacancy decided national policy, which is part of why confirmation fights matter so much."
  },
  {
    id: "gb116", term: "mixed", branch: "mixed", topic: "2.6",
    questionType: "compare", difficulty: "hard",
    question: "Congress has repeatedly tried to reclaim authority it felt had drifted to the executive. Which pair of laws fits that description?",
    options: ["The War Powers Act of 1973 and the Congressional Budget and Impoundment Control Act of 1974", "The Judiciary Act of 1789 and the Tonkin Gulf Resolution", "The Tenure of Office Act and the Seventeenth Amendment", "The Voting Rights Act and the line-item veto law of 1996"],
    answer: "The War Powers Act of 1973 and the Congressional Budget and Impoundment Control Act of 1974",
    explanation: "Both came out of the Nixon years. The first answered the blank check Congress had written in the Tonkin Gulf Resolution; the second built the modern budget process and the CBO so that Congress would not have to take the president's numbers on faith."
  },
  {
    id: "gb117", term: "mixed", branch: "mixed", topic: "2.8",
    questionType: "document", difficulty: "hard",
    question: "Federalist No. 78 argued for judicial review before any court had exercised it. Which later event actually established the power?",
    options: ["The Marshall Court's ruling in Marbury v. Madison (1803)", "The ratification of Article III in 1788", "The passage of the Judiciary Act of 1789", "The Dred Scott decision of 1857"],
    answer: "The Marshall Court's ruling in Marbury v. Madison (1803)",
    explanation: "Hamilton made the argument, and Marshall had promised at the Virginia Ratifying Convention that a federal judiciary would declare void any act repugnant to the Constitution. Article III never says so expressly, so the practice had to be established by a case, and Marshall became the first judge to do it."
  },
  {
    id: "gb141", term: "veto", branch: "mixed", topic: "2.4",
    questionType: "compare", difficulty: "medium",
    question: "Which of the following is a check Congress holds over the president?",
    options: ["Overriding a veto by a two-thirds vote of both houses", "Striking down an executive order as unconstitutional", "Removing a federal judge whose rulings it dislikes", "Refusing to enforce a Supreme Court ruling"],
    answer: "Overriding a veto by a two-thirds vote of both houses",
    explanation: "The override is Congress's answer to the veto. Striking down an order belongs to the courts, and enforcing rulings belongs to the executive, which is what Eisenhower did by sending troops to Little Rock in 1957."
  },
  {
    id: "gb142", term: "Federalist No. 78", branch: "mixed", topic: "2.8",
    questionType: "document", difficulty: "medium",
    question: "Federalist No. 78 calls the judiciary the least dangerous branch because it holds neither the sword nor the purse. Which branch holds each of those?",
    options: ["The executive commands the military, and Congress controls spending", "Congress commands the military, and the executive controls spending", "The executive holds both", "Congress holds both"],
    answer: "The executive commands the military, and Congress controls spending",
    explanation: "The president is Commander in Chief and Congress holds the power of the purse, so a court that wants its ruling carried out or its budget funded depends on the other two. Hamilton's point was that a branch with only judgment cannot dominate anyone."
  },
  {
    id: "gb118", term: "gridlock", branch: "mixed", topic: "2.3",
    questionType: "scenario", difficulty: "medium",
    question: "In December 2018 the government shut down for 35 days as the two parties rejected each other's spending proposals and could find no common ground. The episode is best used as evidence of",
    options: ["partisan gridlock between Congress and the president", "the Senate's use of the cloture rule to end debate", "a pocket veto of an appropriations bill", "congressional oversight of the Transportation Security Administration"],
    answer: "partisan gridlock between Congress and the president",
    explanation: "Gridlock is the congestion that keeps anything from moving, and a budget impasse is the most visible form of it. Agencies like the TSA went short-staffed until a bipartisan spending bill finally ended the standoff."
  }
];

// Export for the Node-based validator (harmless in the browser).
if (typeof module !== "undefined") {
  module.exports = { govBranchesVocab, govBranchesBank };
}
