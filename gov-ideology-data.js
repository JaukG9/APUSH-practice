// =========================================================================
// AP GOV: TOPICS 4.1-4.10 - CONTENT MODULE
// =========================================================================
// Source of truth: AMSCO United States Government & Politics, AP Edition
// (2022), Unit 4, Chapters 12-14, book pages 392-490 - Topic 4.1 (American
// attitudes about government and politics), 4.2 (political socialization),
// 4.3 (changes in ideology), 4.4 (influence of political events on
// ideology), 4.5 (measuring public opinion), 4.6 (evaluating public opinion
// data), 4.7 (ideologies of political parties), 4.8 (ideology and policy
// making), 4.9 (ideology and economic policy) and 4.10 (ideology and social
// policy).
//
// Two exports:
//   govIdeologyVocab - every term this mode tests, with the meaning the
//                      AMSCO text gives it, the topic and book page it
//                      appears on, and whether it is one of AMSCO's own
//                      "Key Terms and Names" for that topic (keyTerm: true)
//                      or a supporting idea, law or case from the same pages.
//                      Update this list first if the source changes.
//   govIdeologyBank  - the question bank. Content only: no markup, no game
//                      logic, no HTML.
//
// Question shape:
//   { id, term, area, topic, questionType, difficulty,
//     question, options, answer, explanation }
//     term         - the vocabulary entry under test; "mixed" for items that
//                    compare several concepts or span areas
//     area         - "values" | "socialization" | "polling" | "ideology" |
//                    "economic" | "social" | "mixed", and drives the Area
//                    filter
//     topic        - the AMSCO topic number the item is drawn from
//     questionType - definition | application | scenario | compare |
//                    document | case | process. The engine spreads types out
//                    so consecutive questions do not feel identical.
//     difficulty   - "easy" | "medium" | "hard"; a session ramps easy -> hard
//     options      - exactly four distinct strings; one equals `answer`
//                    (the engine shuffles them, so stored order is irrelevant;
//                    the stored correct position is still spread evenly
//                    across A-D, and the correct option is not
//                    systematically the longest one)
//
// Ids run gi001 upward and are identity keys, not positions. Never reuse one:
// the "recently seen" list a returning player has stored is keyed by id, so a
// recycled number would hide a brand new question from them.
// =========================================================================

const govIdeologyVocab = [
  // --- Core values and political culture: Topic 4.1 ----------------------
  { id: "i-political-culture", term: "political culture", display: "political culture", area: "values", topic: "4.1", page: 395, keyTerm: true,
    meaning: "The set of attitudes that shape political behavior; its cornerstones are individualism, equality of opportunity, free enterprise, the rule of law and limited government." },
  { id: "i-consensual", term: "consensual political culture", display: "consensual and conflictual political culture", area: "values", topic: "4.1", page: 394, keyTerm: false,
    meaning: "A culture is consensual where most people share values and beliefs overlap, and conflictual where groups with opposing beliefs clash over key issues." },
  { id: "i-conservative", term: "conservative", display: "conservative", area: "values", topic: "4.1", page: 395, keyTerm: true,
    meaning: "Leans toward order even at some cost to liberty, reveres tradition and institutions, prefers a smaller government with fewer services, favors harsh punishment, and accepts change slowly." },
  { id: "i-liberal", term: "liberal", display: "liberal", area: "values", topic: "4.1", page: 395, keyTerm: true,
    meaning: "More willing to experiment with policy; supports law and order but stresses the rights of the accused, and accepts higher taxes in exchange for more government services." },
  { id: "i-individualism", term: "individualism", display: "individualism", area: "values", topic: "4.1", page: 395, keyTerm: true,
    meaning: "Belief in the fundamental worth and importance of the individual, rooted in the Enlightenment idea that inalienable rights come before government." },
  { id: "i-enlightened", term: "enlightened self-interest", display: "enlightened self-interest", area: "values", topic: "4.1", page: 396, keyTerm: false,
    meaning: "The end of the individualism spectrum that sacrifices some individual freedom for the greater good, as opposed to self-centered individualism." },
  { id: "i-tocqueville", term: "Alexis de Tocqueville", display: "Alexis de Tocqueville", area: "values", topic: "4.1", page: 396, keyTerm: false,
    meaning: "French observer of 1830s America (Democracy in America) who warned that individualism could isolate citizens and fracture society." },
  { id: "i-equal-opp", term: "equality of opportunity", display: "equality of opportunity", area: "values", topic: "4.1", page: 396, keyTerm: true,
    meaning: "An equal right to pursue life, liberty and happiness - a fair chance to rise - rather than equal ability or equal outcomes." },
  { id: "i-eeoc", term: "Equal Employment Opportunity Commission", display: "the Equal Employment Opportunity Commission (1965)", area: "values", topic: "4.1", page: 397, keyTerm: false,
    meaning: "Agency that investigates complaints of discrimination in hiring and firing under Title VII of the Civil Rights Act of 1964." },
  { id: "i-free-enterprise", term: "free enterprise", display: "free enterprise", area: "values", topic: "4.1", page: 397, keyTerm: true,
    meaning: "An economy in which businesses succeed or fail on their own and consumers' decisions, with government intervening only to protect the people." },
  { id: "i-adam-smith", term: "Adam Smith", display: "Adam Smith, The Wealth of Nations (1776)", area: "values", topic: "4.1", page: 397, keyTerm: false,
    meaning: "Scottish economist who argued an \"invisible hand\" of producers and consumers should regulate the economy, with government limited to defense and order." },
  { id: "i-laissez-faire", term: "laissez-faire", display: "laissez-faire", area: "values", topic: "4.1", page: 397, keyTerm: true,
    meaning: "French for \"let it be\": the principle that government should leave the marketplace alone." },
  { id: "i-rule-of-law", term: "rule of law", display: "the rule of law", area: "values", topic: "4.1", page: 398, keyTerm: true,
    meaning: "Government by laws that apply equally to everyone, which prevents rule by the whims of leaders who see themselves as above the law." },
  { id: "i-limited-gov", term: "limited government", display: "limited government", area: "values", topic: "4.1", page: 399, keyTerm: true,
    meaning: "Government kept under control by law, checks and balances and the separation of powers; the Bill of Rights doubles as a list of what government cannot do." },

  // --- Socialization, generations and events: Topics 4.2-4.4 -------------
  { id: "i-socialization", term: "political socialization", display: "political socialization", area: "socialization", topic: "4.2", page: 401, keyTerm: true,
    meaning: "The lifelong process by which people develop political beliefs, shaped by family, school, peers, media, social environments and location." },
  { id: "i-family", term: "family influence", display: "the family as an agent of socialization", area: "socialization", topic: "4.2", page: 401, keyTerm: false,
    meaning: "Long regarded as the biggest influence on political socialization, through \"kitchen table politics\"; newer research finds its pull weaker than once thought." },
  { id: "i-school", term: "school and college", display: "school and college", area: "socialization", topic: "4.2", page: 402, keyTerm: false,
    meaning: "No solid evidence that K-12 tilts students either way; voters with advanced degrees lean more Democratic and liberal, though most of them call themselves moderate." },
  { id: "i-peers", term: "peer influence", display: "peer influence", area: "socialization", topic: "4.2", page: 403, keyTerm: false,
    meaning: "Social conformity pressures people to adopt group norms; Betsy Sinclair found peer pressure pushes nonvoters to vote and donors to give." },
  { id: "i-media", term: "media", display: "the media as an agent of socialization", area: "socialization", topic: "4.2", page: 403, keyTerm: false,
    meaning: "Screen time exposes young people to political content and online peers, and may be weakening the family's influence." },
  { id: "i-religion", term: "religious institutions", display: "religious institutions", area: "socialization", topic: "4.2", page: 404, keyTerm: false,
    meaning: "Churchgoers participate more; evangelicals and fundamentalists lean Republican, Catholics traditionally Democratic, and Jewish voters Democratic." },
  { id: "i-civil-society", term: "civil society", display: "civil society", area: "socialization", topic: "4.2", page: 404, keyTerm: false,
    meaning: "The nongovernmental, non-business, voluntary sector of social life - scouts, teams, volunteer groups - whose civic institutions also socialize people." },
  { id: "i-region", term: "regional differences", display: "geography and regional differences", area: "socialization", topic: "4.2", page: 404, keyTerm: false,
    meaning: "Location shapes views: the Northeast and West Coast lean liberal, while the more Protestant South leans conservative." },
  { id: "i-globalization", term: "globalization", display: "globalization", area: "socialization", topic: "4.2", page: 406, keyTerm: true,
    meaning: "The process of an ever-expanding and increasingly interactive world economy, which also spreads political and cultural values across borders." },
  { id: "i-collectivistic", term: "collectivistic culture", display: "collectivistic culture", area: "socialization", topic: "4.2", page: 406, keyTerm: false,
    meaning: "A culture that puts the community's needs above the individual's, in contrast to individualistic American culture." },
  { id: "i-generational", term: "generational effects", display: "generational effects", area: "socialization", topic: "4.3", page: 408, keyTerm: true,
    meaning: "Differences in political attitudes that come from the era in which a person was born and the events their generation lived through." },
  { id: "i-impressionable", term: "impressionable-age hypothesis", display: "the impressionable-age hypothesis", area: "socialization", topic: "4.3", page: 408, keyTerm: false,
    meaning: "People forge most of their political attitudes between about ages 14 and 24." },
  { id: "i-millennials", term: "Millennials", display: "Millennials", area: "socialization", topic: "4.3", page: 409, keyTerm: true,
    meaning: "Came of voting age at or after 2000; diverse, tech-centered, supportive of government action and more liberal than earlier generations." },
  { id: "i-genx", term: "Generation X", display: "Generation X", area: "socialization", topic: "4.3", page: 409, keyTerm: true,
    meaning: "Americans born after the Baby Boomers, roughly 1962 to 1982." },
  { id: "i-boomers", term: "Baby Boomers", display: "Baby Boomers", area: "socialization", topic: "4.3", page: 409, keyTerm: true,
    meaning: "Born 1946-1964; grew up in postwar prosperity and the turbulent 1960s, when challenging government became a norm." },
  { id: "i-silent", term: "Silent Generation", display: "the Silent Generation", area: "socialization", topic: "4.3", page: 409, keyTerm: true,
    meaning: "Born before 1945, during the Depression and World War II; religious, anticommunist, tougher on crime, and the most reliable voters." },
  { id: "i-lifecycle", term: "lifecycle effects", display: "lifecycle effects", area: "socialization", topic: "4.3", page: 412, keyTerm: true,
    meaning: "The physical, social and psychological changes people go through as they age, which shift which issues matter and how much time they have to participate." },
  { id: "i-depression", term: "Great Depression", display: "the Great Depression (1929-1933)", area: "socialization", topic: "4.4", page: 414, keyTerm: true,
    meaning: "Economic collapse whose New Deal response built trust in government and support for a social safety net among those who lived through it." },
  { id: "i-new-deal-coalition", term: "New Deal Coalition", display: "the New Deal Coalition", area: "socialization", topic: "4.4", page: 416, keyTerm: true,
    meaning: "The massive bloc of Americans who voted for Franklin Roosevelt and the Democrats who followed him." },
  { id: "i-sept11", term: "September 11 attacks", display: "the September 11 attacks (2001)", area: "socialization", topic: "4.4", page: 416, keyTerm: false,
    meaning: "A seminal event for Millennials, read either as a call for aggressive homeland security or as a warning to reduce U.S. involvement in the Middle East." },
  { id: "i-iraq", term: "Iraq invasion", display: "the Iraq invasion (2003)", area: "socialization", topic: "4.4", page: 416, keyTerm: true,
    meaning: "A war whose chief premise, weapons of mass destruction, proved groundless, leaving Millennials more reluctant to use military force." },
  { id: "i-recession", term: "Great Recession", display: "the Great Recession (2007-2012)", area: "socialization", topic: "4.4", page: 417, keyTerm: true,
    meaning: "Downturn that shaped Millennials' acceptance of government intervention in a failing economy." },

  // --- Measuring and evaluating public opinion: Topics 4.5-4.6 -----------
  { id: "i-polls", term: "public opinion polls", display: "public opinion polls", area: "polling", topic: "4.5", page: 425, keyTerm: true,
    meaning: "Well-developed, objective questions put to a small random group to learn what a larger group thinks; scientific polling began in the mid-1930s." },
  { id: "i-benchmark", term: "benchmark polls", display: "benchmark polls", area: "polling", topic: "4.5", page: 425, keyTerm: true,
    meaning: "Often a campaign's first poll, sometimes before a candidate declares, measuring support and the issues voters care about." },
  { id: "i-tracking", term: "tracking polls", display: "tracking polls", area: "polling", topic: "4.5", page: 426, keyTerm: true,
    meaning: "Repeated polls during a campaign that track issues and how a candidate is faring, especially in the final weeks." },
  { id: "i-entrance", term: "entrance polls", display: "entrance polls", area: "polling", topic: "4.5", page: 426, keyTerm: true,
    meaning: "Polls taken outside polling places on Election Day as voters arrive, used to project results and analyze how groups voted." },
  { id: "i-exit", term: "exit polls", display: "exit polls", area: "polling", topic: "4.5", page: 426, keyTerm: true,
    meaning: "Polls taken outside polling places on Election Day as voters leave, used to project results after polls close and analyze how groups voted." },
  { id: "i-approval", term: "approval rating", display: "approval rating", area: "polling", topic: "4.5", page: 426, keyTerm: true,
    meaning: "The share of respondents who say yes, they approve of the president's job performance." },
  { id: "i-honeymoon", term: "honeymoon period", display: "the presidential honeymoon period", area: "polling", topic: "4.5", page: 426, keyTerm: false,
    meaning: "The first few months of a term, marked by some bipartisanship and positive coverage, before approval declines as the president takes positions." },
  { id: "i-right-track", term: "right track/wrong track", display: "the right track/wrong track question", area: "polling", topic: "4.5", page: 427, keyTerm: false,
    meaning: "Asks whether the nation is on the right or wrong track; a high wrong-track share makes incumbents uncomfortable." },
  { id: "i-generic", term: "generic party ballot", display: "the generic party ballot", area: "polling", topic: "4.5", page: 427, keyTerm: false,
    meaning: "Asks whether respondents will vote Republican or Democratic in an upcoming election without naming candidates." },
  { id: "i-focus", term: "focus group", display: "focus group", area: "polling", topic: "4.5", page: 427, keyTerm: true,
    meaning: "Ten to 40 citizens gathered to discuss issues or candidates; less scientific than a poll but deeper, with follow-up questions." },
  { id: "i-wording", term: "question wording and framing", display: "question wording and framing", area: "polling", topic: "4.5", page: 428, keyTerm: false,
    meaning: "Emotionally charged wording, or framing that emphasizes one perspective, can change the results of a poll." },
  { id: "i-order", term: "question order", display: "question order", area: "polling", topic: "4.5", page: 428, keyTerm: false,
    meaning: "The sequence of questions can affect answers, as when asking first about the country lowered a president's approval." },
  { id: "i-sampling-tech", term: "sampling techniques", display: "sampling techniques", area: "polling", topic: "4.5", page: 428, keyTerm: true,
    meaning: "Methods of choosing whom to poll so that the sample is a random and fair representation of the population." },
  { id: "i-rep-sample", term: "representative sample", display: "representative sample (universe)", area: "polling", topic: "4.5", page: 428, keyTerm: true,
    meaning: "A group meant to represent the larger group in question, the universe; a national sample often has about 1,500 respondents." },
  { id: "i-random", term: "random sample", display: "random sample", area: "polling", topic: "4.5", page: 429, keyTerm: true,
    meaning: "A sample in which every member of the universe has an equal chance of being selected." },
  { id: "i-rdd", term: "random-digit dialing", display: "random-digit dialing", area: "polling", topic: "4.5", page: 429, keyTerm: true,
    meaning: "A computer randomly calls possible numbers in an area until enough people respond, reaching unlisted numbers too." },
  { id: "i-weighting", term: "weighting", display: "weighting (stratification)", area: "polling", topic: "4.5", page: 429, keyTerm: true,
    meaning: "Adjusting a sample so demographic groups are represented in their true proportions." },
  { id: "i-sampling-error", term: "sampling error", display: "sampling error (margin of error)", area: "polling", topic: "4.5", page: 430, keyTerm: true,
    meaning: "The difference between poll results; it shrinks as the sample grows, and plus or minus 4 percent or less is usually satisfactory." },
  { id: "i-nonattitudes", term: "non-attitudes", display: "non-attitudes", area: "polling", topic: "4.5", page: 430, keyTerm: false,
    meaning: "Many respondents lack strong or informed opinions but answer anyway, as when 43 percent judged a law that did not exist." },
  { id: "i-interviewer", term: "interviewer effects", display: "human bias and interviewer effects", area: "polling", topic: "4.5", page: 431, keyTerm: false,
    meaning: "The way an interviewer contacts and interacts with a respondent, including perceived sex or race, can change the answers." },
  { id: "i-push", term: "push polling", display: "push polling", area: "polling", topic: "4.5", page: 431, keyTerm: true,
    meaning: "Campaigning disguised as polling: calls that feed respondents positive points about a candidate or negative points about an opponent." },
  { id: "i-internet", term: "Internet polling", display: "Internet polling", area: "polling", topic: "4.5", page: 431, keyTerm: false,
    meaning: "Cannot assure a random sample; draws only the motivated, sometimes allows repeat answers, and skews younger and more affluent." },
  { id: "i-horse-race", term: "horse race coverage", display: "\"horse race\" coverage", area: "polling", topic: "4.6", page: 433, keyTerm: false,
    meaning: "Election reporting that treats who is ahead as the most important story; polls also decided who appeared in televised debates." },
  { id: "i-bandwagon", term: "bandwagon effect", display: "the bandwagon effect", area: "polling", topic: "4.6", page: 434, keyTerm: true,
    meaning: "A shift of support to a candidate or position that leads in the polls and so is believed to be endorsed by many people." },
  { id: "i-branches", term: "public opinion and the branches", display: "public opinion and the three branches", area: "polling", topic: "4.6", page: 434, keyTerm: false,
    meaning: "The House is most sensitive to polls, presidents use early popularity as a mandate, and the Court tends to follow the national mood despite life tenure." },
  { id: "i-candidate-error", term: "candidate error", display: "candidate error", area: "polling", topic: "4.6", page: 435, keyTerm: false,
    meaning: "The percentage-point gap between a poll's estimate of a candidate's share and the actual vote share." },
  { id: "i-sdb", term: "social desirability bias", display: "social desirability bias", area: "polling", topic: "4.6", page: 435, keyTerm: true,
    meaning: "The tendency of respondents to tell pollsters what they think the pollsters want to hear." },
  { id: "i-bradley", term: "Bradley effect", display: "the Bradley effect", area: "polling", topic: "4.6", page: 436, keyTerm: true,
    meaning: "African American candidates underperforming their poll numbers because some respondents falsely claim to support them to avoid appearing biased." },
  { id: "i-late", term: "undecideds breaking late", display: "undecided voters breaking late", area: "polling", topic: "4.6", page: 436, keyTerm: false,
    meaning: "Undecided voters making their final choice late, as a larger than usual share did for Trump in 2016." },
  { id: "i-nonresponse", term: "non-response bias", display: "non-response bias", area: "polling", topic: "4.6", page: 436, keyTerm: true,
    meaning: "Error that arises when the people who decline to take part in polls differ from those who answer." },
  { id: "i-social-media", term: "social media opinion data", display: "opinion data from social media", area: "polling", topic: "4.6", page: 437, keyTerm: false,
    meaning: "A massive but unrepresentative sample: active users skew male, urban and extreme, programs miss sarcasm, and loud users count many times." },
  { id: "i-credibility", term: "evaluating poll credibility", display: "evaluating the credibility of a poll", area: "polling", topic: "4.6", page: 438, keyTerm: false,
    meaning: "Ask who conducted and paid for a poll, its methodology, exact wording and order, how results were obtained, its context, whose views are missing, and how it compares." },

  // --- Party ideologies and policy making: Topics 4.7-4.8 ----------------
  { id: "i-ideology", term: "ideology", display: "ideology", area: "ideology", topic: "4.7", page: 445, keyTerm: true,
    meaning: "A comprehensive and mutually consistent set of ideas." },
  { id: "i-valence", term: "valence issues", display: "valence issues", area: "ideology", topic: "4.7", page: 445, keyTerm: true,
    meaning: "Concerns or policies viewed the same way by people of many ideologies, such as a strong economy and national security." },
  { id: "i-wedge", term: "wedge issues", display: "wedge issues", area: "ideology", topic: "4.7", page: 446, keyTerm: true,
    meaning: "Issues that sharply divide the public, used strategically to gather support, especially among people without strong opinions." },
  { id: "i-saliency", term: "saliency", display: "saliency", area: "ideology", topic: "4.7", page: 446, keyTerm: true,
    meaning: "The intense importance an issue holds for an individual or group." },
  { id: "i-moderate", term: "moderate", display: "moderate", area: "ideology", topic: "4.7", page: 446, keyTerm: true,
    meaning: "Somewhere between liberal and conservative; most Americans, who often mix views from both camps." },
  { id: "i-goldwater", term: "Barry Goldwater", display: "Barry Goldwater, The Conscience of a Conservative", area: "ideology", topic: "4.7", page: 447, keyTerm: false,
    meaning: "Arizona senator and 1964 Republican nominee who embraced the conservative label and argued New Deal policies had unwisely altered government's role." },
  { id: "i-libertarian", term: "libertarian", display: "libertarian", area: "ideology", topic: "4.7", page: 447, keyTerm: true,
    meaning: "Opposes most government intervention: conservative on economic issues and liberal on moral and social ones, with a high regard for civil liberties." },
  { id: "i-populist", term: "populist", display: "populist", area: "ideology", topic: "4.7", page: 448, keyTerm: true,
    meaning: "Typically working-class, Protestant, Southern or Midwestern; favors workplace protections and farm subsidies but would curb obscene or unpatriotic speech." },
  { id: "i-progressive", term: "progressive", display: "progressive", area: "ideology", topic: "4.7", page: 448, keyTerm: true,
    meaning: "From a movement born in Republican roots in the early 1900s; modern progressives align with labor and want the wealthy to pay much more in taxes." },
  { id: "i-platform", term: "party platform", display: "party platform", area: "ideology", topic: "4.7", page: 449, keyTerm: false,
    meaning: "A party's list of principles and plans, approved at its national convention every four years; the best guide to its ideology." },
  { id: "i-majoritarian", term: "majoritarian", display: "majoritarian policy making", area: "ideology", topic: "4.8", page: 452, keyTerm: true,
    meaning: "Policy that emerges from people interacting with government to carry out the will of the majority, including through initiatives and referenda." },
  { id: "i-interest-policy", term: "interest group policy making", display: "interest group policy making", area: "ideology", topic: "4.8", page: 453, keyTerm: false,
    meaning: "A pluralist path in which competing groups fund candidates, testify and push policies that address as many of their concerns as compromise allows." },
  { id: "i-agenda", term: "agenda", display: "agenda", area: "ideology", topic: "4.8", page: 453, keyTerm: true,
    meaning: "A list of potential policy ideas, bills or plans to improve society, developed and reshaped by legislators and bureaucrats." },
  { id: "i-cost-benefit", term: "cost-benefit analysis", display: "cost-benefit analysis", area: "ideology", topic: "4.8", page: 453, keyTerm: false,
    meaning: "A full comparison of the effort and sacrifice a new policy requires with the benefits it would bring." },
  { id: "i-policy-process", term: "policy process", display: "the policy process", area: "ideology", topic: "4.8", page: 454, keyTerm: false,
    meaning: "An issue gains attention, Congress investigates, a policy is formulated and adopted, then financed, implemented and evaluated." },
  { id: "i-referendum", term: "referendum", display: "referendum", area: "ideology", topic: "4.8", page: 454, keyTerm: false,
    meaning: "A popular vote that can repeal a law, as Ohio voters did in 2011 to Senate Bill 5's limits on collective bargaining." },

  // --- Ideology and economic policy: Topic 4.9 -----------------------------
  { id: "i-econ-elections", term: "economy and elections", display: "the economy and elections", area: "economic", topic: "4.9", page: 456, keyTerm: false,
    meaning: "Besides party identification, nothing drives votes more than the economy; incumbents seeking reelection in bad times have lost." },
  { id: "i-excise", term: "excise taxes", display: "excise (\"sin\") taxes", area: "economic", topic: "4.9", page: 456, keyTerm: false,
    meaning: "Taxes on particular products or services, such as cigarettes or gambling, that hit relatively few people." },
  { id: "i-fiscal", term: "fiscal policy", display: "fiscal policy", area: "economic", topic: "4.9", page: 457, keyTerm: true,
    meaning: "The part of economic policy concerned with government spending and taxation." },
  { id: "i-keynes", term: "Keynesian economics", display: "Keynesian economics", area: "economic", topic: "4.9", page: 457, keyTerm: false,
    meaning: "John Maynard Keynes's theory that government should manage aggregate demand, spending more or taxing less when demand is too low; favored by liberals." },
  { id: "i-recovery", term: "American Recovery and Reinvestment Act", display: "the American Recovery and Reinvestment Act (2009)", area: "economic", topic: "4.9", page: 457, keyTerm: false,
    meaning: "Obama-era stimulus that used heavy government spending to fight the Great Recession; it drew practically no Republican support." },
  { id: "i-multiplier", term: "multiplier effect", display: "the multiplier effect", area: "economic", topic: "4.9", page: 457, keyTerm: true,
    meaning: "An increase in spending produces economic growth greater than the original amount, since each round of spending becomes someone's income." },
  { id: "i-supply-side", term: "supply-side economics", display: "supply-side economics", area: "economic", topic: "4.9", page: 458, keyTerm: true,
    meaning: "The conservative theory, associated with Arthur Laffer and Reagan, that lower taxes spur spending, investment and work, and still yield large revenues." },
  { id: "i-tcja", term: "Tax Cuts and Jobs Act", display: "the Tax Cuts and Jobs Act (2017)", area: "economic", topic: "4.9", page: 459, keyTerm: false,
    meaning: "Republican tax overhaul that permanently cut corporate taxes and temporarily cut individual taxes, setting the top rate at 37 percent." },
  { id: "i-pollock", term: "Pollock v. Farmers' Loan & Trust Co.", display: "Pollock v. Farmers' Loan & Trust Co.", area: "economic", topic: "4.9", page: 459, keyTerm: false,
    meaning: "Late-1800s ruling that struck down a peacetime federal income tax, reflecting laissez-faire thought; reversed by the Sixteenth Amendment." },
  { id: "i-sixteenth", term: "Sixteenth Amendment", display: "the Sixteenth Amendment (1913)", area: "economic", topic: "4.9", page: 460, keyTerm: true,
    meaning: "Allows Congress to tax individuals' incomes, overriding the Court's ruling in Pollock." },
  { id: "i-irs", term: "Internal Revenue Service", display: "the Internal Revenue Service (IRS)", area: "economic", topic: "4.9", page: 460, keyTerm: true,
    meaning: "The agency Congress created to oversee collection of the federal income tax." },
  { id: "i-progressive-tax", term: "progressive tax", display: "progressive tax", area: "economic", topic: "4.9", page: 460, keyTerm: true,
    meaning: "A tax whose rate increases, or progresses, as income increases, like the national income tax." },
  { id: "i-flat", term: "flat rate", display: "flat rate (flat tax)", area: "economic", topic: "4.9", page: 461, keyTerm: true,
    meaning: "A tax that charges all citizens the same rate, favored by some conservatives on the far right." },
  { id: "i-monetary", term: "monetary policy", display: "monetary policy", area: "economic", topic: "4.9", page: 462, keyTerm: true,
    meaning: "How government manages the supply of its currency, and thus the value of the dollar." },
  { id: "i-inflation", term: "inflation", display: "inflation", area: "economic", topic: "4.9", page: 462, keyTerm: true,
    meaning: "Rising prices and devaluation of the dollar, which occur when too many dollars are in circulation." },
  { id: "i-fed", term: "Federal Reserve Board", display: "the Federal Reserve Board", area: "economic", topic: "4.9", page: 462, keyTerm: true,
    meaning: "Seven governors appointed by the president and confirmed by the Senate for staggered 14-year terms; an independent agency that sets monetary policy." },
  { id: "i-discount", term: "discount rate", display: "discount rate", area: "economic", topic: "4.9", page: 463, keyTerm: true,
    meaning: "The interest rate the Fed charges commercial banks; lowering it encourages lending and spending, raising it slows the flow of dollars." },
  { id: "i-reserve", term: "reserve requirement", display: "reserve requirement", area: "economic", topic: "4.9", page: 464, keyTerm: true,
    meaning: "The share of money a bank must keep on hand; lowering it encourages lending, raising it pushes interest rates up." },
  { id: "i-bonds", term: "bonds", display: "bonds (securities)", area: "economic", topic: "4.9", page: 464, keyTerm: true,
    meaning: "Government IOUs sold on a promise of repayment with interest; the Fed buys and sells them with commercial banks." },
  { id: "i-trade-balance", term: "trade balance", display: "trade balance", area: "economic", topic: "4.9", page: 465, keyTerm: true,
    meaning: "The relationship between exports and imports; exporting more than importing is a favorable balance, the reverse a trade deficit." },
  { id: "i-nafta", term: "North American Free Trade Agreement", display: "the North American Free Trade Agreement (NAFTA) (1994)", area: "economic", topic: "4.9", page: 465, keyTerm: true,
    meaning: "Lifted trade barriers among the United States, Canada and Mexico; favored by business and conservatives, feared by labor unions." },

  // --- Ideology and social policy: Topic 4.10 -----------------------------
  { id: "i-social-welfare", term: "social welfare", display: "social welfare", area: "social", topic: "4.10", page: 467, keyTerm: true,
    meaning: "Support for disadvantaged people to meet their basic needs." },
  { id: "i-entitlements", term: "entitlements", display: "entitlements", area: "social", topic: "4.10", page: 467, keyTerm: true,
    meaning: "Government benefits Congress has promised by law to those who meet its criteria, such as Social Security, Medicare and Medicaid." },
  { id: "i-mandatory", term: "mandatory spending", display: "mandatory spending", area: "social", topic: "4.10", page: 467, keyTerm: true,
    meaning: "Spending Congress must cover because people are legally entitled to the funds." },
  { id: "i-ssa", term: "Social Security Act", display: "the Social Security Act (1935)", area: "social", topic: "4.10", page: 468, keyTerm: true,
    meaning: "Depression-era law creating a payroll-tax insurance program for retirees and the unemployed; the largest entitlement." },
  { id: "i-third-rail", term: "third rail", display: "the \"third rail\" of politics", area: "social", topic: "4.10", page: 468, keyTerm: false,
    meaning: "Nickname for Social Security: like an electrified rail, politicians fear touching it because of the shock of voter disapproval." },
  { id: "i-medicare", term: "Medicare", display: "Medicare", area: "social", topic: "4.10", page: 468, keyTerm: true,
    meaning: "Government-run health insurance for citizens over 65, passed in 1965 and funded by a payroll tax." },
  { id: "i-medicaid", term: "Medicaid", display: "Medicaid", area: "social", topic: "4.10", page: 469, keyTerm: true,
    meaning: "Health care coverage for the poorest Americans, based on income, disability or pregnancy." },
  { id: "i-great-society", term: "Great Society", display: "the Great Society and the War on Poverty", area: "social", topic: "4.10", page: 469, keyTerm: false,
    meaning: "Lyndon Johnson's 1960s programs that expanded aid for the poor, subsidized housing and job retraining." },
  { id: "i-reaganomics", term: "Reaganomics", display: "Reaganomics", area: "social", topic: "4.10", page: 469, keyTerm: false,
    meaning: "Ronald Reagan's economic program of lower taxes and free market activity, with cuts to welfare programs such as food stamps." },
  { id: "i-aca", term: "Patient Protection and Affordable Care Act", display: "the Patient Protection and Affordable Care Act (2010)", area: "social", topic: "4.10", page: 470, keyTerm: true,
    meaning: "The comprehensive health care law known as Obamacare; conservatives opposed it as government overreach." },
  { id: "i-labor", term: "organized labor", display: "organized labor", area: "social", topic: "4.10", page: 470, keyTerm: false,
    meaning: "Conservatives tend to see unions as a negative force on a free market; liberals credit collective bargaining with gains like the 40-hour week." },
  { id: "i-wagner", term: "Wagner Act", display: "the Wagner Act (1935)", area: "social", topic: "4.10", page: 471, keyTerm: false,
    meaning: "New Deal law creating a federal commission that regulates labor organizations and rules on unfair labor practices." },
  { id: "i-taft-hartley", term: "Taft-Hartley Act", display: "the Taft-Hartley Act (1947)", area: "social", topic: "4.10", page: 471, keyTerm: false,
    meaning: "Business-backed law passed by a Republican Congress that let states pass right-to-work laws, partly counteracting the labor movement." },
  { id: "i-privacy", term: "right to privacy", display: "the right to privacy", area: "social", topic: "4.10", page: 472, keyTerm: false,
    meaning: "Liberals tend to keep government out of intimate matters; social conservatives accept some intrusion to protect core values and defer to state laws." },
  { id: "i-griswold", term: "Griswold v. Connecticut", display: "Griswold v. Connecticut (1965)", area: "social", topic: "4.10", page: 472, keyTerm: false,
    meaning: "Struck down a ban on contraception and established a right to privacy that later abortion and same-sex marriage rulings built on." },
  { id: "i-casey", term: "Planned Parenthood v. Casey", display: "Planned Parenthood v. Casey (1992)", area: "social", topic: "4.10", page: 472, keyTerm: false,
    meaning: "Reaffirmed Roe's essential holding while giving more weight to the state's interest in potential life; overruled in 2022." },
  { id: "i-info-privacy", term: "informational privacy", display: "informational privacy", area: "social", topic: "4.10", page: 473, keyTerm: false,
    meaning: "Conservatives tend to back surveillance when the nation is threatened, liberals stricter limits; both oppose bulk data collection." },
  { id: "i-vouchers", term: "school vouchers", display: "school vouchers", area: "social", topic: "4.10", page: 474, keyTerm: false,
    meaning: "Public funds diverted to families paying private school tuition; conservatives stress choice and competition, liberals defend public schools." },
  { id: "i-masterpiece", term: "Masterpiece Cakeshop v. Colorado Civil Rights Commission", display: "Masterpiece Cakeshop v. Colorado Civil Rights Commission", area: "social", topic: "4.10", page: 474, keyTerm: false,
    meaning: "Narrow First Amendment ruling for a baker who refused to make a same-sex wedding cake on religious grounds." }
];

const govIdeologyBank = [
  // =====================================================================
  // TOPIC 4.1 - AMERICAN ATTITUDES ABOUT GOVERNMENT AND POLITICS
  // =====================================================================
  {
    id: "gi001", term: "political culture", area: "values", topic: "4.1",
    questionType: "definition", difficulty: "easy",
    question: "AMSCO uses the term political culture for",
    options: ["the platform a party adopts at its national convention every four years", "the official ideology that a government requires its public schools to teach", "the voting patterns of one region of the country, such as the South", "the set of attitudes that shapes how a nation's people behave politically"],
    answer: "the set of attitudes that shapes how a nation's people behave politically",
    explanation: "Political culture is the shared set of attitudes underneath political behavior. AMSCO names five cornerstones: individualism, equality of opportunity, free enterprise, the rule of law and limited government. A platform belongs to one party; a culture is shared across them."
  },
  {
    id: "gi002", term: "consensual political culture", area: "values", topic: "4.1",
    questionType: "compare", difficulty: "medium",
    question: "Nearly everyone agrees that violent criminals should be punished, yet Americans argue fiercely over gay rights and foreign intervention. In AMSCO's terms, these two situations illustrate",
    options: ["a consensual culture on the first issue and a conflictual one on the second", "a conflictual culture on the first issue and a consensual one on the second", "the difference between a valence issue and a measure of presidential approval", "the bandwagon effect on the first issue and the Bradley effect on the second"],
    answer: "a consensual culture on the first issue and a conflictual one on the second",
    explanation: "Where most people's beliefs overlap, political culture is consensual; where groups with opposing beliefs clash over key issues, it is conflictual. Even consensus issues spark disagreement over details, such as the right punishment for premeditated murder."
  },
  {
    id: "gi003", term: "conservative", area: "values", topic: "4.1",
    questionType: "definition", difficulty: "easy",
    question: "Which set of positions best matches AMSCO's description of a conservative?",
    options: ["Experiments with policy, protects the rights of the accused, and accepts higher taxes for services", "Opposes nearly every regulation of the economy and of personal morality alike", "Favors farm subsidies and workplace protections but would curb unpatriotic speech", "Leans toward order over some liberties, values tradition, and prefers a smaller government"],
    answer: "Leans toward order over some liberties, values tradition, and prefers a smaller government",
    explanation: "Conservatives favor law and order even at some cost to liberty, revere tradition and institutions, want fewer government services and harsher punishments, and accept change slowly. The other three describe a liberal, a libertarian and a populist."
  },
  {
    id: "gi004", term: "liberal", area: "values", topic: "4.1",
    questionType: "application", difficulty: "easy",
    question: "A voter supports raising taxes to expand public services and worries that tough-on-crime laws may trample the rights of the accused. Her views are most consistent with",
    options: ["a conservative ideology", "a libertarian ideology", "a liberal ideology", "a populist ideology"],
    answer: "a liberal ideology",
    explanation: "AMSCO's liberal accepts higher taxes in exchange for more government services and, while supporting law and order, is concerned about protecting the accused. A libertarian would reject the tax increase; a populist is less sympathetic to criminal defendants."
  },
  {
    id: "gi005", term: "individualism", area: "values", topic: "4.1",
    questionType: "definition", difficulty: "easy",
    question: "Individualism, as a cornerstone of American political culture, is rooted in the Enlightenment idea that",
    options: ["government exists chiefly to guarantee every citizen an equal income", "the needs of the community should outweigh the goals of any one person", "a nation's laws must apply equally to the rulers and to the people they rule", "people hold inalienable rights that come before government rather than from it"],
    answer: "people hold inalienable rights that come before government rather than from it",
    explanation: "Individualism stresses the worth of each person and grows from the belief that rights precede government. Putting the community first is what AMSCO calls a collectivistic culture, and laws binding rulers and ruled alike is the rule of law."
  },
  {
    id: "gi006", term: "enlightened self-interest", area: "values", topic: "4.1",
    questionType: "compare", difficulty: "medium",
    question: "AMSCO describes a spectrum of individualism. Which statement correctly describes its two ends?",
    options: ["Self-centered individualism gives up some freedom for the greater good; enlightened self-interest wants little government interference", "Self-centered individualism is a liberal value; enlightened self-interest is a libertarian value held mainly by business owners", "Self-centered individualism describes the Silent Generation; enlightened self-interest describes the Millennial generation", "Self-centered individualism wants little government interference; enlightened self-interest gives up some freedom for the greater good"],
    answer: "Self-centered individualism wants little government interference; enlightened self-interest gives up some freedom for the greater good",
    explanation: "Self-centered individualism puts the individual above the group and wants government out of the way. Enlightened self-interest trades a little freedom for the public good and expects government to help promote it. Neither end belongs to one ideology or generation."
  },
  {
    id: "gi007", term: "Alexis de Tocqueville", area: "values", topic: "4.1",
    questionType: "document", difficulty: "medium",
    question: "Alexis de Tocqueville warned that individualism \"disposes each citizen to isolate himself from the mass of his fellows.\" What danger was he pointing to?",
    options: ["If everyone pursued only private interests, society as a whole could fracture", "A strong national government would eventually crush every individual liberty", "Americans would come to depend far too heavily on government welfare programs", "Wealthy southern landowners would form a hereditary aristocracy"],
    answer: "If everyone pursued only private interests, society as a whole could fracture",
    explanation: "Tocqueville admired American democracy but saw individualism pulling people into small circles of family and friends. AMSCO notes individualism can strain against other shared values, such as respect for the common good and the public interest."
  },
  {
    id: "gi008", term: "equality of opportunity", area: "values", topic: "4.1",
    questionType: "document", difficulty: "medium",
    question: "When Jefferson wrote that \"all men are created equal,\" AMSCO explains, his main point was that people",
    options: ["are born equal in ability, character, and talent", "have an equal right to pursue life, liberty, and happiness", "deserve equal shares of the nation's land and wealth", "must be treated identically by state governments under the Constitution"],
    answer: "have an equal right to pursue life, liberty, and happiness",
    explanation: "The line was about equal rights to pursue goals, not equal ability or outcomes. A national constitutional demand that states provide equal protection came only with the Fourteenth Amendment in 1868."
  },
  {
    id: "gi009", term: "equality of opportunity", area: "values", topic: "4.1",
    questionType: "application", difficulty: "medium",
    question: "Which policy most directly advances equality of opportunity as AMSCO describes it?",
    options: ["the Taft-Hartley Act of 1947, which allowed states to pass right-to-work laws", "the Tax Cuts and Jobs Act of 2017, which permanently lowered corporate taxes", "Title VII of the Civil Rights Act, which bars job discrimination by race or sex", "the Federal Reserve's power to raise or lower the discount rate it charges banks"],
    answer: "Title VII of the Civil Rights Act, which bars job discrimination by race or sex",
    explanation: "Title VII prohibits employment discrimination by race, sex, national origin, color and religion, and the EEOC investigates complaints. The goal is a fair chance to compete, which is what equality of opportunity means."
  },
  {
    id: "gi010", term: "Equal Employment Opportunity Commission", area: "values", topic: "4.1",
    questionType: "definition", difficulty: "easy",
    question: "Congress created the Equal Employment Opportunity Commission in 1965 to",
    options: ["set the minimum wage and the length of the standard workweek", "regulate the interest rates that commercial banks charge borrowers", "certify which labor unions may bargain on behalf of federal employees", "investigate complaints of discrimination in hiring or firing"],
    answer: "investigate complaints of discrimination in hiring or firing",
    explanation: "The EEOC enforces Title VII of the Civil Rights Act of 1964, looking into claims that someone was fired or refused a job because of race, sex or another protected trait. It is a tool for equality of opportunity."
  },
  {
    id: "gi011", term: "Adam Smith", area: "values", topic: "4.1",
    questionType: "document", difficulty: "easy",
    question: "In The Wealth of Nations (1776), Adam Smith argued that an economy is best regulated by",
    options: ["a central bank that sets the prices of essential goods", "tariffs that shield new industries from foreign competition", "government planners who balance supply against demand each year", "an \"invisible hand\" guided by producers and consumers"],
    answer: "an \"invisible hand\" guided by producers and consumers",
    explanation: "Smith limited the state to defending the nation, keeping order, and stepping in only to protect people. Otherwise businesses rise or fall on their own decisions and their customers' - the free enterprise, or laissez-faire, approach."
  },
  {
    id: "gi012", term: "laissez-faire", area: "values", topic: "4.1",
    questionType: "definition", difficulty: "easy",
    question: "The French phrase laissez-faire, central to free enterprise, means",
    options: ["\"by the people\"", "\"for the common good\"", "\"let it be\"", "\"according to law\""],
    answer: "\"let it be\"",
    explanation: "Laissez-faire means government should leave the market alone. AMSCO notes that even strict free-market advocates today accept a minimum wage and some pollution controls - things Smith would likely have opposed."
  },
  {
    id: "gi013", term: "free enterprise", area: "values", topic: "4.1",
    questionType: "application", difficulty: "medium",
    question: "Which statement reflects AMSCO's account of how attitudes about free enterprise divide the parties?",
    options: ["Business owners and corporate leaders tend to vote Republican; union leaders and hourly workers tend to vote Democratic", "Business owners and corporate leaders tend to vote Democratic; union leaders and hourly workers tend to vote Republican", "Voters in both parties reject any minimum wage as a violation of the free market", "Corporate leaders split evenly between the parties, while union members stay out of politics"],
    answer: "Business owners and corporate leaders tend to vote Republican; union leaders and hourly workers tend to vote Democratic",
    explanation: "Conservatives want fewer burdensome regulations on business, and liberals see regulation as necessary for fairness and safety. The 2017 tax law that sharply cut corporate taxes passed without a single Democratic vote."
  },
  {
    id: "gi014", term: "rule of law", area: "values", topic: "4.1",
    questionType: "document", difficulty: "easy",
    question: "John Adams described a republic as \"a government of laws, and not of men.\" That idea is",
    options: ["limited government", "free enterprise", "individualism", "the rule of law"],
    answer: "the rule of law",
    explanation: "The rule of law means laws apply equally to everyone and no leader governs by whim. AMSCO points to the presidential oath in Article II and to elections held on schedule as proof that even the highest officeholder answers to the law."
  },
  {
    id: "gi015", term: "rule of law", area: "values", topic: "4.1",
    questionType: "application", difficulty: "medium",
    question: "Which of the following does AMSCO list as a safeguard that preserves the rule of law when officials disregard it?",
    options: ["a president's power to fire independent law enforcement officials at will", "rules that keep budget documents confidential until after elections", "public records of government spending and regular audits", "laws that limit what the press may report about public officials"],
    answer: "public records of government spending and regular audits",
    explanation: "AMSCO lists public spending records, regular auditing, independent law enforcement, a free press, whistleblower protections and public opinion. Each distractor would weaken one of those safeguards rather than protect it."
  },
  {
    id: "gi016", term: "rule of law", area: "values", topic: "4.1",
    questionType: "scenario", difficulty: "hard",
    question: "A police officer lets a teenager go with a warning for driving a few miles over the limit. How does AMSCO's discussion of the rule of law treat a case like this?",
    options: ["As proof that the rule of law has broken down in local government", "As a violation of the equal protection clause that a court must reverse", "As an example of limited government, since the officer chose not to act", "As leniency within the discretion that officials are allowed"],
    answer: "As leniency within the discretion that officials are allowed",
    explanation: "AMSCO notes laws are sometimes not enforced for the sake of leniency, and that legal language has evolving meaning. Each branch keeps some discretion in enforcing or interpreting law; that is different from leaders placing themselves above it."
  },
  {
    id: "gi017", term: "limited government", area: "values", topic: "4.1",
    questionType: "definition", difficulty: "easy",
    question: "AMSCO describes the Bill of Rights as both a list of rights and",
    options: ["a list of what government cannot do", "a list of the powers delegated to Congress", "a statement of the nation's economic goals", "a guide to how the states must run elections"],
    answer: "a list of what government cannot do",
    explanation: "Limited government means power kept in check by law, checks and balances and the separation of powers. The Constitution contains as many devices to prevent government action as to empower it, and the Bill of Rights is the clearest example."
  },
  {
    id: "gi018", term: "limited government", area: "values", topic: "4.1",
    questionType: "process", difficulty: "hard",
    question: "Which sequence best describes how the Democratic Party's relationship to limited government changed, according to AMSCO?",
    options: ["Activist from its founding, then the party of limited government during the New Deal, then activist again under the Great Society", "Limited-government party for nearly a century, reshaped by the Progressive Era and New Deal, then fully activist in the Great Society", "The party of limited government until the Civil War, then the party that used federal power to free enslaved people and build railroads", "Activist through the Progressive Era, then the party of limited government once the Great Society programs ended"],
    answer: "Limited-government party for nearly a century, reshaped by the Progressive Era and New Deal, then fully activist in the Great Society",
    explanation: "For nearly a century Democrats took the more conservative, limited-government line. The Progressive Era and New Deal transformed the party, and Johnson's Great Society completed the shift. Republicans traveled the other way."
  },
  {
    id: "gi019", term: "limited government", area: "values", topic: "4.1",
    questionType: "application", difficulty: "medium",
    question: "AMSCO says one core value is at issue whenever people ask, \"When can government come into your home?\" Which value is it?",
    options: ["equality of opportunity", "free enterprise", "limited government", "the rule of law"],
    answer: "limited government",
    explanation: "Limited government ties directly to civil liberties: how far government may reach into homes, churches and morality. Citizens of all viewpoints agree no one should suffer from the heavy hand of government, though they disagree about where the line falls."
  },
  {
    id: "gi020", term: "liberal", area: "values", topic: "4.1",
    questionType: "compare", difficulty: "hard",
    question: "Most Americans agree government should provide some economic safety net. Where, according to AMSCO, do conservatives and liberals typically part ways?",
    options: ["On whether any safety net should exist at all, which conservatives reject", "On whether states and private charities are allowed to help the poor", "On whether the Preamble mentions promoting the general welfare", "On how poor someone must be to qualify and what kind of help to give"],
    answer: "On how poor someone must be to qualify and what kind of help to give",
    explanation: "Agreement on a core value hides disagreement over definitions, thresholds and funding. Conservatives tend to favor a strict threshold for welfare; liberals want help extended to people at somewhat higher, though still impoverished, income levels."
  },
  {
    id: "gi021", term: "conservative", area: "values", topic: "4.1",
    questionType: "scenario", difficulty: "hard",
    question: "Two senators both say they believe in law and order. One pushes for longer sentences; the other pushes for stronger protections for defendants. Using AMSCO's spectrum, which is the best description?",
    options: ["Only the first senator holds the value of the rule of law, and the second one rejects it outright", "Both senators are libertarians who disagree only about how prisons should be funded", "They share a core value but interpret it differently, the first leaning conservative and the second liberal", "The first is a liberal and the second a conservative, since liberals put order above liberty"],
    answer: "They share a core value but interpret it differently, the first leaning conservative and the second liberal",
    explanation: "AMSCO's point is that Americans divide less over core values than over how to apply them. Liberals believe in law and order too but stress the rights of the accused; conservatives lean toward order and harsher punishments."
  },
  {
    id: "gi022", term: "equality of opportunity", area: "values", topic: "4.1",
    questionType: "document", difficulty: "medium",
    question: "Theodore Roosevelt argued that with equality of opportunity \"the commonwealth will get from every citizen the highest service of which he is capable.\" His point was that equal opportunity",
    options: ["requires government to guarantee every citizen the same income", "should be left entirely to private charity rather than to government", "matters only for citizens who already own land or a business", "benefits the whole nation, not only the people who get a fair chance"],
    answer: "benefits the whole nation, not only the people who get a fair chance",
    explanation: "In the Progressive Era, Roosevelt spoke of a fair chance for each person to rise as far as their capacities allow, and he framed it as a gain for society too. Equal opportunity is not equal outcomes."
  },

  // =====================================================================
  // TOPIC 4.2 - POLITICAL SOCIALIZATION
  // =====================================================================
  {
    id: "gi023", term: "political socialization", area: "socialization", topic: "4.2",
    questionType: "definition", difficulty: "easy",
    question: "Political socialization is best defined as",
    options: ["the spread of American values to other countries through trade", "the tendency of voters to back whoever is leading in the polls", "the process by which people develop their political beliefs", "a party's effort to register new voters before an election"],
    answer: "the process by which people develop their political beliefs",
    explanation: "Socialization begins as soon as people can form opinions on public matters and never really ends. Family, school, peers, media, religious and civic institutions, and location all feed it."
  },
  {
    id: "gi024", term: "family influence", area: "socialization", topic: "4.2",
    questionType: "definition", difficulty: "easy",
    question: "Which agent of political socialization has long been regarded as the most influential?",
    options: ["the school", "the family", "the media", "peer groups"],
    answer: "the family",
    explanation: "Parents share opinions at the dinner table - \"kitchen table politics\" - before children meet most other influences. A 2005 Gallup study found 71 percent of teens held an ideology similar to their parents'."
  },
  {
    id: "gi025", term: "family influence", area: "socialization", topic: "4.2",
    questionType: "document", difficulty: "medium",
    question: "For decades the children's magazine Weekly Reader ran an unscientific presidential poll of its young readers that almost always picked the winner. What best explains its accuracy?",
    options: ["Children follow the news more closely than adults do and can spot likely winners", "The magazine weighted its sample by the age and race of each state's voters", "Teachers told their students which candidate the experts expected to win", "Children tended to answer as their parents would, so the poll mirrored adult opinion"],
    answer: "Children tended to answer as their parents would, so the poll mirrored adult opinion",
    explanation: "Because children generally echoed one or both parents, a nationwide sample of nonvoters reflected the parent population. The poll missed only once from 1956 through 2008 - strong evidence for the family as an agent of socialization."
  },
  {
    id: "gi026", term: "family influence", area: "socialization", topic: "4.2",
    questionType: "compare", difficulty: "hard",
    question: "Newer research complicates the idea that parents simply pass their politics to their children. Which finding does AMSCO report?",
    options: ["Fewer than one in ten teens share their parents' general ideology", "Political talk at home makes children less likely to discuss politics later", "About a third of children misperceive their parents' affiliation or values", "Children raised in politically active homes nearly always become independents"],
    answer: "About a third of children misperceive their parents' affiliation or values",
    explanation: "Roughly one-third of children misread their parents' views, and wider access to information has reduced parental influence. Homes with intense political talk also model debate, exposing children to views that can shift them. Family is still likely the strongest influence."
  },
  {
    id: "gi027", term: "school and college", area: "socialization", topic: "4.2",
    questionType: "application", difficulty: "medium",
    question: "What does AMSCO conclude about how schooling shapes ideology?",
    options: ["Public high schools reliably make students more liberal, and college reverses it", "College graduates overwhelmingly call themselves conservatives by age thirty", "K-12 shows no clear tilt, but people with advanced degrees lean more liberal", "Only private schools influence politics, through their required religion classes"],
    answer: "K-12 shows no clear tilt, but people with advanced degrees lean more liberal",
    explanation: "There is no solid evidence that K-12 makes students more liberal or conservative, and undergraduate effects are hard to isolate. Voters with master's and doctoral degrees vote Democratic more often, though the largest share of them, about 46 percent, call themselves moderate."
  },
  {
    id: "gi028", term: "peer influence", area: "socialization", topic: "4.2",
    questionType: "application", difficulty: "medium",
    question: "Betsy Sinclair, author of The Social Citizen, found that a nonvoter who lives with a regular voter tends to feel pressure to cast a ballot. This finding illustrates the influence of",
    options: ["geography", "globalization", "lifecycle effects", "peers"],
    answer: "peers",
    explanation: "Peer influence works through social conformity: people want acceptance from groups they identify with. Sinclair also found group fundraisers bring in more money, because guests feel a social obligation to contribute."
  },
  {
    id: "gi029", term: "media", area: "socialization", topic: "4.2",
    questionType: "application", difficulty: "medium",
    question: "Why does AMSCO suggest the family's influence on political socialization may be weakening somewhat?",
    options: ["Fewer parents today hold any political opinions to pass along to children", "Schools are now required by law to teach students a particular ideology", "Young people's screen time leaves them less time with their families", "Most families stopped discussing current events at home in the 1990s"],
    answer: "Young people's screen time leaves them less time with their families",
    explanation: "Hours on phones and computers mean more exposure to political content and online peers, and less time at the family table. Media also shape views through news coverage and fictional portrayals of politics and politicians."
  },
  {
    id: "gi030", term: "religious institutions", area: "socialization", topic: "4.2",
    questionType: "definition", difficulty: "medium",
    question: "Which statement about religion and political socialization matches AMSCO?",
    options: ["Catholics have become the most reliably Republican bloc in the nation", "Churchgoers vote at higher rates, and evangelicals tend to vote Republican", "Attending religious services has no measurable link to voting or participation", "Jewish voters make up a large share of the electorate and lean Republican"],
    answer: "Churchgoers vote at higher rates, and evangelicals tend to vote Republican",
    explanation: "People who attend services participate more, and fundamentalist and evangelical Christians tend to take conservative positions. Catholics traditionally voted Democratic, though less so now; Jewish voters are a small part of the electorate and tend to vote Democratic."
  },
  {
    id: "gi031", term: "civil society", area: "socialization", topic: "4.2",
    questionType: "definition", difficulty: "easy",
    question: "A Girl Scout troop, a neighborhood sports team, and a hospital volunteer program are all part of what AMSCO calls",
    options: ["the bureaucracy", "the political culture", "civil society", "the universe"],
    answer: "civil society",
    explanation: "Civil society is the nongovernmental, non-business, voluntary sector of social life. Its civic institutions socialize the people who take part in them, even when the activity itself is not political."
  },
  {
    id: "gi032", term: "civil society", area: "socialization", topic: "4.2",
    questionType: "compare", difficulty: "hard",
    question: "A civic club that draws only like-minded members and one that mixes people from many backgrounds both influence socialization. How do their effects differ?",
    options: ["The first tends to teach acceptance of diversity; the second reinforces existing beliefs", "Only the first influences socialization, since mixed groups avoid discussing politics", "Both mainly move members toward the ideology of the nation's elected leaders", "The first tends to reinforce existing beliefs; the second teaches members to accept diversity"],
    answer: "The first tends to reinforce existing beliefs; the second teaches members to accept diversity",
    explanation: "AMSCO says both kinds of civic institutions socialize people, in opposite directions: one hardens views already held, while the other socializes a person to work around differences and accept people unlike themselves."
  },
  {
    id: "gi033", term: "regional differences", area: "socialization", topic: "4.2",
    questionType: "application", difficulty: "easy",
    question: "Higher taxes that fund services like public transit, and early legalization of civil unions, are associated in AMSCO with which region?",
    options: ["the South", "the Northeast", "the rural Midwest", "the Mountain West"],
    answer: "the Northeast",
    explanation: "Liberal Democrats dominate the Northeast, and Vermont and Massachusetts were among the first states to legalize civil unions and same-sex marriage. The South is more Protestant and conservative, with higher gun ownership."
  },
  {
    id: "gi034", term: "regional differences", area: "socialization", topic: "4.2",
    questionType: "scenario", difficulty: "hard",
    question: "A working-class voter in a southern city wants higher wages and better benefits but also wants stricter immigration enforcement. According to AMSCO, this voter",
    options: ["is a textbook libertarian who wants government out of both economics and morality", "is showing the Bradley effect by hiding a true preference from pollsters", "is unusual, since nearly all southern voters had become Republicans by 1980", "may side with Democrats on economics while voting with traditional values in mind"],
    answer: "may side with Democrats on economics while voting with traditional values in mind",
    explanation: "Many southerners remain Democrats out of generational loyalty and the growth of southern cities. Working-class southerners may favor Democrats on pay and benefits while holding conservative views on immigration and traditional values."
  },
  {
    id: "gi035", term: "globalization", area: "socialization", topic: "4.2",
    questionType: "definition", difficulty: "easy",
    question: "AMSCO defines globalization as",
    options: ["a policy of placing tariffs on imports to protect American manufacturers", "the treaty that removed trade barriers among the U.S., Canada, and Mexico", "the process of an ever-expanding and increasingly interactive world economy", "the replacement of national governments by a single world government"],
    answer: "the process of an ever-expanding and increasingly interactive world economy",
    explanation: "Globalization is economic at its core, but AMSCO stresses its cultural reach: American values flow outward through films, music and games, and immigrants bring their own values to the United States."
  },
  {
    id: "gi036", term: "globalization", area: "socialization", topic: "4.2",
    questionType: "application", difficulty: "medium",
    question: "Why does AMSCO describe U.S. influence abroad as generally \"democratizing\"?",
    options: ["The United States requires all of its trading partners to hold free elections", "Exposure to its political culture can make people want democracy too", "American films are banned in most of the countries that do not hold elections", "Foreign governments must copy the U.S. Constitution to receive American aid"],
    answer: "Exposure to its political culture can make people want democracy too",
    explanation: "American entertainment carries values like individualism and equality of opportunity. That can clash with local values - sometimes weakening them, sometimes provoking a defense of local culture - but overall it spreads democratic ideas."
  },
  {
    id: "gi037", term: "collectivistic culture", area: "socialization", topic: "4.2",
    questionType: "compare", difficulty: "medium",
    question: "AMSCO contrasts the individualistic culture of the United States with the collectivistic cultures of many Asian countries. What has collectivistic influence done in America?",
    options: ["Encouraged collaboration in the workplace, with better results", "Persuaded most Americans to abandon individualism as a core political value", "Increased support for laissez-faire economics among younger voters", "Led Congress to replace the progressive income tax with a flat tax"],
    answer: "Encouraged collaboration in the workplace, with better results",
    explanation: "Collectivistic cultures put the community's needs above the individual's. Brought to America through immigration and globalization, that ideal shows up in workplace collaboration, which has outperformed individuals working in isolation."
  },
  {
    id: "gi038", term: "globalization", area: "socialization", topic: "4.2",
    questionType: "scenario", difficulty: "medium",
    question: "Volunteers and donations poured into Australia from around the world during its 2019-2020 forest fires. AMSCO cites this as an example of",
    options: ["global citizenship that globalization and worldwide news coverage can foster", "the bandwagon effect, since donors simply followed whichever cause was leading the news", "a collectivistic culture replacing individualism in the United States", "American influence spreading democratic values to Australia"],
    answer: "global citizenship that globalization and worldwide news coverage can foster",
    explanation: "Globalization also creates identities beyond national borders. Global news, groups like Doctors Without Borders, and shared problems like global warming remind people their fate is tied to others. The European Union is another example."
  },

  // =====================================================================
  // TOPIC 4.3 - CHANGES IN IDEOLOGY
  // =====================================================================
  {
    id: "gi039", term: "generational effects", area: "socialization", topic: "4.3",
    questionType: "definition", difficulty: "easy",
    question: "Generational effects refer to",
    options: ["the physical and social changes people go through as they grow older", "the tendency of children to adopt their parents' party affiliation", "shifts in poll results caused by the order in which questions are asked", "the shared experiences that shape the views of people born in the same era"],
    answer: "the shared experiences that shape the views of people born in the same era",
    explanation: "Someone who grew up during World War II sees foreign wars differently from someone who grew up during Vietnam. Changes tied to aging - school, marriage, retirement - are lifecycle effects, the other half of this topic."
  },
  {
    id: "gi040", term: "lifecycle effects", area: "socialization", topic: "4.3",
    questionType: "application", difficulty: "easy",
    question: "A recent graduate worries most about student debt; twenty years later, the same person worries most about the local schools their children attend. This shift illustrates",
    options: ["lifecycle effects", "generational effects", "the bandwagon effect", "globalization"],
    answer: "lifecycle effects",
    explanation: "Lifecycle effects are the physical, social and psychological changes people go through as they age, which change which issues matter most. Generational effects come from the era someone grew up in, not their stage of life."
  },
  {
    id: "gi041", term: "impressionable-age hypothesis", area: "socialization", topic: "4.3",
    questionType: "definition", difficulty: "medium",
    question: "According to the impressionable-age hypothesis, people forge most of their political attitudes",
    options: ["before they enter kindergarten", "between about ages 14 and 24", "in their thirties, once they begin paying taxes", "after retirement, when they have time to follow politics"],
    answer: "between about ages 14 and 24",
    explanation: "Events at 18 are about three times as likely to shape partisan preferences as similar events at 40. That is why the events of a generation's teens and early twenties leave such a lasting mark."
  },
  {
    id: "gi042", term: "generational effects", area: "socialization", topic: "4.3",
    questionType: "compare", difficulty: "hard",
    question: "According to AMSCO, where is there more variation in political attitudes?",
    options: ["Between generations than within any single generation", "Among the Silent Generation than among any other age group", "Within a single generation than between generations", "Between voters in different regions than between any age groups"],
    answer: "Within a single generation than between generations",
    explanation: "Each generation contains millions of people shaped by region, race, religion and class as well as age. Generational patterns are real, but the same events can teach liberal- and conservative-leaning citizens different lessons."
  },
  {
    id: "gi043", term: "Silent Generation", area: "socialization", topic: "4.3",
    questionType: "definition", difficulty: "easy",
    question: "In the generational categories AMSCO uses, the Silent Generation is made up of Americans",
    options: ["born between 1946 and 1964, during the long postwar boom", "born between about 1962 and 1982, just after the Baby Boomers", "born before about 1945, in the Depression and war years", "who came of voting age at or after the new millennium"],
    answer: "born before about 1945, in the Depression and war years",
    explanation: "From youngest to oldest: Millennials, Generation X, Baby Boomers and the Silent Generation. Exact cutoffs vary by source. Generation Z, born roughly 1995 to 2010, shares many Millennial outlooks."
  },
  {
    id: "gi044", term: "Baby Boomers", area: "socialization", topic: "4.3",
    questionType: "definition", difficulty: "easy",
    question: "Which description best fits the Baby Boomers?",
    options: ["Born before 1945, they grew up during the Great Depression and World War II", "Born after 1980, they came of age during the September 11 attacks and the Great Recession", "Born from 1995 to 2010, they have never known a world without the Internet", "Born from 1946 to 1964, they grew up in postwar prosperity and the turbulent 1960s"],
    answer: "Born from 1946 to 1964, they grew up in postwar prosperity and the turbulent 1960s",
    explanation: "Boomers lived through economic prosperity after World War II, then assassinations, civil rights protests and Vietnam. Those events made challenging the government a political norm for many of them."
  },
  {
    id: "gi045", term: "Generation X", area: "socialization", topic: "4.3",
    questionType: "definition", difficulty: "medium",
    question: "Which generation does AMSCO place between the Baby Boomers and the Millennials, born roughly 1962 to 1982?",
    options: ["Generation X", "the Silent Generation", "Generation Z", "the New Deal Coalition"],
    answer: "Generation X",
    explanation: "Generation X follows the Boomers; the ranges overlap because sources disagree on cutoffs. In Pew's 2017 data, half of Gen X preferred a bigger government with more services, between Millennials (57 percent) and Boomers (43 percent)."
  },
  {
    id: "gi046", term: "Millennials", area: "socialization", topic: "4.3",
    questionType: "application", difficulty: "medium",
    question: "Which set of views does AMSCO associate with Millennials?",
    options: ["Accepting of same-sex marriage and legal marijuana, and favoring cooperation over force", "Opposed to interracial marriage, supportive of a draft, and wary of new technology", "Strongly opposed to environmental rules and to government action on social problems", "The likeliest generation to call themselves patriotic and to back military force"],
    answer: "Accepting of same-sex marriage and legal marijuana, and favoring cooperation over force",
    explanation: "Millennials are more diverse, tech-centered and supportive of government problem-solving, and by any measure more liberal than earlier generations. Only about 70 percent regard themselves as patriotic, lower than older Americans."
  },
  {
    id: "gi047", term: "Millennials", area: "socialization", topic: "4.3",
    questionType: "compare", difficulty: "hard",
    question: "On which issue does AMSCO describe Millennials as leaning more conservative than their overall profile might suggest?",
    options: ["Same-sex marriage - most want the question returned to state legislatures", "The environment - most oppose recycling mandates and energy conservation", "Meritocracy - nearly half say programs for the poor undermine initiative", "Criminal justice - most oppose second chances for people with records"],
    answer: "Meritocracy - nearly half say programs for the poor undermine initiative",
    explanation: "Pew found 48 percent of Millennials saying government programs for the poor undermine initiative and responsibility, with 29 percent disagreeing. They are business-friendly but accept regulation, and they still vote heavily Democratic."
  },
  {
    id: "gi048", term: "Silent Generation", area: "socialization", topic: "4.3",
    questionType: "application", difficulty: "medium",
    question: "Which group does AMSCO identify as the most reliable voters?",
    options: ["voters aged 18 to 24, who turned out at record rates in 2016", "Generation X parents, who vote mainly on school issues", "first-time voters registered through social media campaigns", "senior citizens, 59 percent of whom voted in the 2014 midterms"],
    answer: "senior citizens, 59 percent of whom voted in the 2014 midterms",
    explanation: "Midterm turnout usually averages around 38 percent, yet 59 percent of those over 65 voted in 2014. Seniors are usually registered, know the routine, and rarely have to fit voting around a job."
  },
  {
    id: "gi049", term: "Silent Generation", area: "socialization", topic: "4.3",
    questionType: "document", difficulty: "medium",
    question: "Molly Ball wrote in 2016 that this cohort \"has fought through the culture wars, has watched God and prayer leave the public square.\" AMSCO uses the quote to describe",
    options: ["the Silent Generation", "Generation X", "the Millennial generation", "Generation Z"],
    answer: "the Silent Generation",
    explanation: "Raised before the 1960s counterculture, the Silent Generation gave religious values high priority and opposed many cultural changes. Today it wants tougher treatment of criminal defendants and terror suspects than younger groups do."
  },
  {
    id: "gi050", term: "lifecycle effects", area: "socialization", topic: "4.3",
    questionType: "scenario", difficulty: "hard",
    question: "Why might parents of young children take part in campaigns and demonstrations less than either college students or retirees?",
    options: ["Parents are legally barred from volunteering for federal election campaigns", "Work and child-rearing leave them little time for active participation", "Their generation was socialized never to criticize the government in public", "People at that stage of life usually have not yet registered to vote"],
    answer: "Work and child-rearing leave them little time for active participation",
    explanation: "This is the second lifecycle effect AMSCO describes: adult responsibilities shrink the time available for volunteering or protest. Priorities also shift at this stage, toward a stable economy and good schools."
  },
  {
    id: "gi051", term: "lifecycle effects", area: "socialization", topic: "4.3",
    questionType: "application", difficulty: "medium",
    question: "AARP, which represents more than 40 million older Americans, lists Social Security, Medicare, and retirement among its major issues. This focus best illustrates",
    options: ["the impressionable-age hypothesis", "non-response bias", "a wedge issue", "lifecycle effects"],
    answer: "lifecycle effects",
    explanation: "As people age, the issues that matter most to them change: benefits, doctor visits and drug prices loom larger. In a 2016 AARP study, 81 percent of seniors said prescription drug prices were too expensive."
  },
  {
    id: "gi052", term: "lifecycle effects", area: "socialization", topic: "4.3",
    questionType: "scenario", difficulty: "medium",
    question: "Many young voters were drawn to Bernie Sanders's 2016 and 2020 campaigns, which promised free tuition at public colleges. AMSCO links this support mainly to",
    options: ["the lasting influence that the New Deal Coalition had on their grandparents", "the bandwagon effect created by Sanders's lead in national polls", "a generational memory of the hardships of the Great Depression", "lifecycle concerns about student debt and finding jobs with good benefits"],
    answer: "lifecycle concerns about student debt and finding jobs with good benefits",
    explanation: "College-age voters worry about debt and about jobs with good income and health insurance - issues tied to their stage of life. Sanders also proposed expanding Medicare to everyone, paid for partly by taxing the wealthiest."
  },

  // =====================================================================
  // TOPIC 4.4 - INFLUENCE OF POLITICAL EVENTS ON IDEOLOGY
  // =====================================================================
  {
    id: "gi053", term: "Great Depression", area: "socialization", topic: "4.4",
    questionType: "application", difficulty: "easy",
    question: "According to AMSCO, how did living through the Great Depression and the New Deal shape many Americans' political attitudes?",
    options: ["It convinced most of them that government should stay out of the economy", "It made challenging the government a normal part of political life", "It increased trust in government and support for a social safety net", "It made them reluctant to support any use of military force abroad"],
    answer: "It increased trust in government and support for a social safety net",
    explanation: "New Deal jobs programs and Social Security lifted many people out of poverty, building trust in government's role. Challenging government describes Boomers in the 1960s; reluctance to use force describes Millennials after Iraq."
  },
  {
    id: "gi054", term: "New Deal Coalition", area: "socialization", topic: "4.4",
    questionType: "definition", difficulty: "medium",
    question: "The New Deal Coalition refers to",
    options: ["the New Deal agencies, such as the WPA and the CCC, that built public works", "an alliance of business leaders who opposed Social Security in the 1930s", "the Republicans who won control of Congress in the 1946 midterm elections", "the bloc of voters behind Franklin Roosevelt and the Democrats after him"],
    answer: "the bloc of voters behind Franklin Roosevelt and the Democrats after him",
    explanation: "That coalition, much of it the Silent Generation, anchored Democratic voting for decades. As the party took liberal social positions, many Roosevelt followers and their children shifted to the Republican Party."
  },
  {
    id: "gi055", term: "Baby Boomers", area: "socialization", topic: "4.4",
    questionType: "process", difficulty: "hard",
    question: "Which sequence best describes the Baby Boomers' partisan voting, as AMSCO presents it?",
    options: ["Mainly Republican from 1992 to 2006, then shifting toward Democrats from 2006 through 2016", "Steadily Democratic from the 1960s through 2016, with no shift at any point", "Mainly Democratic from 1992 to 2006, then shifting toward Republicans from 2006 through 2016", "Mainly independent until 2006, then split evenly between the two major parties"],
    answer: "Mainly Democratic from 1992 to 2006, then shifting toward Republicans from 2006 through 2016",
    explanation: "Boomers replaced the New Deal Coalition as a Democratic bloc, then joined other seniors moving to the GOP. AMSCO ties the shift partly to the Democrats' liberal positions on abortion, same-sex marriage and affirmative action."
  },
  {
    id: "gi056", term: "Baby Boomers", area: "socialization", topic: "4.4",
    questionType: "document", difficulty: "medium",
    question: "\"Where were you when you heard that President Kennedy had been shot?\" AMSCO uses this question to show that",
    options: ["most Americans in 1963 learned about politics from school rather than from family", "public opinion polls of the 1960s were too unreliable to measure national grief", "presidential approval ratings always rise in the weeks after a national tragedy", "dramatic events can leave a lasting mark on how a generation absorbs political culture"],
    answer: "dramatic events can leave a lasting mark on how a generation absorbs political culture",
    explanation: "Kennedy's assassination, followed by those of Robert Kennedy, Medgar Evers, Malcolm X and Martin Luther King Jr., plus mass protests, shaped the Boomers. Many came to see challenging the government as a normal way to bring change."
  },
  {
    id: "gi057", term: "Silent Generation", area: "socialization", topic: "4.4",
    questionType: "compare", difficulty: "hard",
    question: "How did the older generation's response to the Vietnam War differ from the Baby Boomers', according to AMSCO?",
    options: ["They trusted the government going in and were more forgiving after the war failed", "They led the antiwar protests and distrusted the government from the very start", "They opposed the war at first but came to support it once the draft began", "They paid little attention to the war, since few of them had served in World War II"],
    answer: "They trusted the government going in and were more forgiving after the war failed",
    explanation: "Shaped by World War II's united purpose and Cold War anticommunism, many older, blue-collar and rural Americans backed the government on the way into Vietnam and refrained from criticizing it, unlike the Boomers."
  },
  {
    id: "gi058", term: "September 11 attacks", area: "socialization", topic: "4.4",
    questionType: "compare", difficulty: "medium",
    question: "AMSCO describes two schools of thought among Millennials about the September 11 attacks. What are they?",
    options: ["One urges aggressive homeland security; the other, less U.S. involvement in the Middle East", "One calls for reinstating a military draft; the other calls for higher taxes on the wealthy", "One blames the attacks on the Federal Reserve; the other blames the stock market", "One trusts the news media completely; the other refuses to follow the news at all"],
    answer: "One urges aggressive homeland security; the other, less U.S. involvement in the Middle East",
    explanation: "Threats to national security pushed some Millennials toward patriotism and trust in government, though less than older groups. Others took the attacks as a wake-up call about U.S. involvement in the Middle East."
  },
  {
    id: "gi059", term: "Iraq invasion", area: "socialization", topic: "4.4",
    questionType: "application", difficulty: "medium",
    question: "Why might Millennials be more reluctant than older generations to support military intervention abroad?",
    options: ["Millennials grew up while the Vietnam War draft was still in effect", "Congress banned overseas troop deployments after the Great Recession", "The Iraq war's premise of weapons of mass destruction proved groundless", "Millennials were socialized mainly by members of the New Deal Coalition"],
    answer: "The Iraq war's premise of weapons of mass destruction proved groundless",
    explanation: "Iraq, plus Afghanistan becoming America's longest conflict, will likely be this cohort's yardstick for future wars. A 2014 Chicago Council study found almost half of Millennials saying the U.S. should stay out of world affairs."
  },
  {
    id: "gi060", term: "Great Recession", area: "socialization", topic: "4.4",
    questionType: "application", difficulty: "medium",
    question: "Which effect does AMSCO attribute to Millennials' coming of age during the Great Recession?",
    options: ["Most now oppose Social Security and other redistribution programs", "Nearly 70 percent accept government intervention in a failing economy", "They became the most reliable voting bloc in midterm elections", "They shifted heavily toward the Republican Party after 2008"],
    answer: "Nearly 70 percent accept government intervention in a failing economy",
    explanation: "Growing up in a downturn shapes views of redistribution, and pessimism formed in a sudden recession tends to last. AMSCO says the experience could raise the chances of voting for a Democratic presidential candidate by 15 percent."
  },
  {
    id: "gi061", term: "generational effects", area: "socialization", topic: "4.4",
    questionType: "scenario", difficulty: "hard",
    question: "In the 2016 CNN exit poll, Clinton won 56 percent of voters aged 18 to 24 (Trump 34), while Trump won voters 65 and older, 52 to 45 percent. Which conclusion is best supported?",
    options: ["Age was unrelated to vote choice, since each candidate won some voters of every age", "Age was linked to vote choice, and Clinton's margin among the youngest was the wider one", "Trump's margin among the oldest voters was wider than Clinton's among the youngest", "Young voters turned out at higher rates than seniors and so decided the election"],
    answer: "Age was linked to vote choice, and Clinton's margin among the youngest was the wider one",
    explanation: "A 22-point gap among 18-to-24-year-olds is wider than a 7-point gap among seniors. The data say nothing about turnout - and seniors are in fact the most reliable voters."
  },

  // =====================================================================
  // TOPIC 4.5 - MEASURING PUBLIC OPINION
  // =====================================================================
  {
    id: "gi062", term: "public opinion polls", area: "polling", topic: "4.5",
    questionType: "definition", difficulty: "easy",
    question: "Done scientifically, polling involves",
    options: ["asking every eligible voter the same set of questions on Election Day", "inviting anyone interested to answer questions posted on a news website", "gathering ten to forty citizens for an in-depth conversation about a candidate", "putting objective questions to a small random sample of a larger group"],
    answer: "putting objective questions to a small random sample of a larger group",
    explanation: "A scientific poll uses well-developed, objective questions and a random sample. Asking everyone is impossible, an open website draws only the motivated, and a small discussion group is a focus group."
  },
  {
    id: "gi063", term: "public opinion polls", area: "polling", topic: "4.5",
    questionType: "document", difficulty: "medium",
    question: "Scientific polling gained credibility in the mid-1930s when the Gallup Poll",
    options: ["correctly predicted Thomas Dewey's 1948 victory over Truman", "correctly predicted Franklin Roosevelt's 1936 reelection", "first measured public approval of the Social Security Act", "showed that exit polls should be reported before polls close"],
    answer: "correctly predicted Franklin Roosevelt's 1936 reelection",
    explanation: "Since 1936, measuring opinion has grown more sophisticated, with university polling centers and network polling units. The 1948 headline declaring Dewey the winner is the famous polling failure - Truman won."
  },
  {
    id: "gi064", term: "benchmark polls", area: "polling", topic: "4.5",
    questionType: "application", difficulty: "easy",
    question: "A potential candidate commissions a poll before announcing a run, to measure possible support and learn which issues voters care about. This is a",
    options: ["tracking poll", "benchmark poll", "exit poll", "push poll"],
    answer: "benchmark poll",
    explanation: "Benchmark polls often come first in a campaign, sometimes before the candidate declares. Tracking polls follow movement during the race, exit polls happen on Election Day, and push polls are campaigning disguised as research."
  },
  {
    id: "gi065", term: "tracking polls", area: "polling", topic: "4.5",
    questionType: "application", difficulty: "easy",
    question: "In the final weeks of a race, a campaign polls voters again and again to see how its candidate is faring and to adjust its strategy. These are",
    options: ["benchmark polls", "entrance polls", "focus groups", "tracking polls"],
    answer: "tracking polls",
    explanation: "Tracking polls let a campaign \"track\" issues and its candidate's standing over time, which matters most in the closing days. A benchmark poll is the baseline taken before or at a campaign's launch."
  },
  {
    id: "gi066", term: "exit polls", area: "polling", topic: "4.5",
    questionType: "definition", difficulty: "easy",
    question: "Entrance and exit polls are conducted",
    options: ["by telephone in the weeks before a primary", "outside polling places on Election Day", "online among a campaign's own donors", "inside the booth as part of the official ballot"],
    answer: "outside polling places on Election Day",
    explanation: "Pollsters and the news media use them in national and statewide elections to project results after the polls close and to analyze how different groups of voters actually behaved."
  },
  {
    id: "gi067", term: "entrance polls", area: "polling", topic: "4.5",
    questionType: "application", difficulty: "medium",
    question: "Besides predicting outcomes, what do news organizations gain from entrance and exit polls?",
    options: ["The official vote count used to certify the election results", "Insight into how different demographic groups actually voted", "A legal basis for delaying the results in very close states", "A record of which individual citizens voted for each candidate"],
    answer: "Insight into how different demographic groups actually voted",
    explanation: "These polls help explain an election, not just call it: who turned out, and how women, young voters or evangelicals broke. Official counts come from election officials, and ballots themselves are secret."
  },
  {
    id: "gi068", term: "approval rating", area: "polling", topic: "4.5",
    questionType: "definition", difficulty: "easy",
    question: "A presidential approval rating is gathered by asking respondents",
    options: ["whether they approve of the president's job performance", "which party they plan to vote for in the next election", "whether the nation is on the right track or the wrong track", "how much they trust the federal government overall"],
    answer: "whether they approve of the president's job performance",
    explanation: "Approval is a yes-or-no judgment on job performance. The right-track/wrong-track question measures satisfaction with the country's direction, and the generic ballot measures party support without naming candidates."
  },
  {
    id: "gi069", term: "honeymoon period", area: "polling", topic: "4.5",
    questionType: "definition", difficulty: "medium",
    question: "Why do presidents usually begin their terms with fairly high approval ratings?",
    options: ["Approval is not measured until after a president's first State of the Union address", "New presidents are barred from taking positions on divisive issues for six months", "Pollsters are required to weight early samples toward voters from the president's own party", "In a honeymoon period, press coverage is positive and Congress shows some bipartisanship"],
    answer: "In a honeymoon period, press coverage is positive and Congress shows some bipartisanship",
    explanation: "Honeymoons generally last a few months. Ratings predictably decline as a president starts staking out positions on issues and disappointing some of the people who gave the benefit of the doubt."
  },
  {
    id: "gi070", term: "approval rating", area: "polling", topic: "4.5",
    questionType: "application", difficulty: "medium",
    question: "The two highest presidential approval ratings on record, 90 and 89 percent, both came",
    options: ["during the honeymoon period in the weeks right after an inauguration", "shortly after a president signed a major tax cut into law", "when the nation rallied around the president in a foreign crisis", "in the final year of a popular president's second term"],
    answer: "when the nation rallied around the president in a foreign crisis",
    explanation: "George W. Bush reached 90 percent after September 11, and his father 89 percent after the 1991 coalition drove Iraq out of Kuwait. Ratings fall, too: the elder Bush sank to 29 percent a year later amid unemployment and racial discord."
  },
  {
    id: "gi071", term: "approval rating", area: "polling", topic: "4.5",
    questionType: "compare", difficulty: "hard",
    question: "Which comparison best fits AMSCO's account of the two Bush presidencies?",
    options: ["Each stayed above 60 percent approval for nearly his entire time in office", "Each reached record approval during a foreign crisis and later fell below 30 percent", "The father's approval stayed high, but the son's never rose above 50 percent", "The son's approval stayed high, but the father's never rose above 50 percent"],
    answer: "Each reached record approval during a foreign crisis and later fell below 30 percent",
    explanation: "George H.W. Bush went from 89 to 29 percent within about a year. George W. Bush went from 90 percent to below 30 after a Hurricane Katrina response many saw as ineffective and soaring gas prices."
  },
  {
    id: "gi072", term: "generic party ballot", area: "polling", topic: "4.5",
    questionType: "definition", difficulty: "medium",
    question: "A pollster asks, \"In the upcoming election, will you vote for the Republican or the Democratic candidate in your district?\" without naming anyone. This is",
    options: ["a push poll question", "a benchmark question", "a generic ballot question", "a voter-screening question"],
    answer: "a generic ballot question",
    explanation: "The generic ballot measures support for each party. Read alongside the right-track/wrong-track question, it gives a relative measure of citizen support for each party before any candidates are considered."
  },
  {
    id: "gi073", term: "right track/wrong track", area: "polling", topic: "4.5",
    questionType: "application", difficulty: "hard",
    question: "Shortly before an election, 68 percent of poll respondents say the country is on the wrong track. Based on AMSCO, who should be most worried?",
    options: ["challengers from the party that is out of power", "the incumbent president and the president's party", "third-party candidates trying to qualify for the ballot", "pollsters who relied on random-digit dialing"],
    answer: "the incumbent president and the president's party",
    explanation: "A strong right-track response generally means incumbents will fare well; a high wrong-track number makes incumbents uncomfortable at election time. Challengers usually benefit from public dissatisfaction."
  },
  {
    id: "gi074", term: "focus group", area: "polling", topic: "4.5",
    questionType: "application", difficulty: "easy",
    question: "Mitt Romney began wearing jeans more often in 2012 after a small group of voters reacted better to him in casual clothes. That feedback came from",
    options: ["an exit poll", "a focus group", "a tracking poll", "random-digit dialing"],
    answer: "a focus group",
    explanation: "A focus group gathers 10 to 40 people for conversation about issues or candidates. Researchers can ask follow-up questions and read body language and intensity that an automated phone survey would miss."
  },
  {
    id: "gi075", term: "focus group", area: "polling", topic: "4.5",
    questionType: "compare", difficulty: "medium",
    question: "Compared with a large automated phone survey, a focus group",
    options: ["gives deeper insight into reactions but is less scientific", "is more scientific, because every participant is chosen at random", "has a smaller margin of error, because its questions are open-ended", "is used only on Election Day to project the winner of a race"],
    answer: "gives deeper insight into reactions but is less scientific",
    explanation: "Ten to forty people cannot represent a whole population, so a focus group trades precision for depth: follow-up questions, body language and intensity."
  },
  {
    id: "gi076", term: "question wording and framing", area: "polling", topic: "4.5",
    questionType: "application", difficulty: "medium",
    question: "One poll asks, \"Should the U.S. provide foreign aid to other nations?\" Another asks, \"Should the U.S. give foreign aid if it would lead to higher taxes here?\" The results differ sharply. What explains the difference?",
    options: ["The second poll must have relied on a much smaller sample of voters", "Respondents to the first poll were screened as likely voters beforehand", "Adding a cost to the wording pushes answers one way", "The first poll was distorted by the Bradley effect"],
    answer: "Adding a cost to the wording pushes answers one way",
    explanation: "Pollsters try to phrase questions objectively, without emotional charge. Mentioning higher taxes changes the question itself. Emotional issues such as abortion and affirmative action are especially sensitive to wording."
  },
  {
    id: "gi077", term: "question wording and framing", area: "polling", topic: "4.5",
    questionType: "document", difficulty: "hard",
    question: "Only 28 percent of Americans say abortion should be legal under all circumstances, yet 84 percent support it when a woman's life is endangered. Which polling concept does this contrast illustrate?",
    options: ["sampling error", "non-response bias", "framing", "weighting"],
    answer: "framing",
    explanation: "Framing poses a question so it emphasizes a certain perspective. Support ran from 84 percent (life endangered) down to 34 percent (family cannot afford the child). The same public gives different answers to differently framed questions."
  },
  {
    id: "gi078", term: "question order", area: "polling", topic: "4.5",
    questionType: "scenario", difficulty: "hard",
    question: "In a 2002 experiment, respondents asked first about the state of the country rated President Bush lower than respondents asked first about Bush. Which lesson about polling does this teach?",
    options: ["Respondents tell pollsters what they think pollsters want to hear", "Small samples tend to overstate a president's approval", "Phone polls reach fewer young people than mail surveys", "The order of questions can change the answers people give"],
    answer: "The order of questions can change the answers people give",
    explanation: "When people first dwelled on a country many thought was doing badly, Bush's approval dropped 6 percentage points. Reliable pollsters order questions deliberately so earlier items do not color later ones."
  },
  {
    id: "gi079", term: "sampling techniques", area: "polling", topic: "4.5",
    questionType: "definition", difficulty: "medium",
    question: "AMSCO stresses proper sampling techniques because",
    options: ["good sampling lets a pollster skip writing neutral questions", "good sampling makes sure everyone in the universe is interviewed", "good sampling guarantees a margin of error of zero", "who is polled matters just as much as what they are asked"],
    answer: "who is polled matters just as much as what they are asked",
    explanation: "Which people are polled is as important as the question's nature and wording. Sound sampling yields a random, fair representation of the population, though no technique removes error entirely."
  },
  {
    id: "gi080", term: "representative sample", area: "polling", topic: "4.5",
    questionType: "definition", difficulty: "easy",
    question: "In polling, the universe is",
    options: ["the smaller group actually interviewed for the poll", "the entire group whose opinion the pollster wants to know", "the full list of questions a pollster plans to ask", "the range within which the true result probably falls"],
    answer: "the entire group whose opinion the pollster wants to know",
    explanation: "The representative sample is the small group meant to stand in for the universe - about 1,500 respondents for a national poll, fewer for a single state. The range around a result is the margin of error."
  },
  {
    id: "gi081", term: "random sample", area: "polling", topic: "4.5",
    questionType: "definition", difficulty: "easy",
    question: "A sample is random when",
    options: ["the pollster picks the people who seem most willing to answer", "respondents volunteer by calling in or clicking a link online", "every member of the universe has an equal chance of being selected", "each demographic group contributes exactly the same number of people"],
    answer: "every member of the universe has an equal chance of being selected",
    explanation: "Equal chance of selection is the definition. Choosing friendly-looking people, or letting volunteers opt in, biases who ends up in the sample. Equal group sizes is not the goal; true proportions are."
  },
  {
    id: "gi082", term: "random sample", area: "polling", topic: "4.5",
    questionType: "scenario", difficulty: "medium",
    question: "A reporter stands on a busy corner and interviews passersby who look friendly and approachable. The main problem with this method is that",
    options: ["the margin of error will be too small to be meaningful", "street interviews require a federal permit that reporters rarely get", "questions asked in person are automatically leading", "the reporter, not chance, decides who is in the sample"],
    answer: "the reporter, not chance, decides who is in the sample",
    explanation: "Picking people who look \"safe\" or willing builds the interviewer's bias into the sample. A street-corner survey may hint at opinion, but only a random sample supports reliable conclusions."
  },
  {
    id: "gi083", term: "random-digit dialing", area: "polling", topic: "4.5",
    questionType: "definition", difficulty: "medium",
    question: "Pollsters adopted random-digit dialing mainly to",
    options: ["reach people whose phone numbers are unlisted", "get around federal rules on calling cell phones", "screen out respondents who are unlikely to vote", "keep respondents from hearing a live interviewer"],
    answer: "reach people whose phone numbers are unlisted",
    explanation: "Roughly 30 percent of people have unlisted numbers. A computer dials possible numbers in an area until enough people respond, so unlisted households have the same chance of selection."
  },
  {
    id: "gi084", term: "random-digit dialing", area: "polling", topic: "4.5",
    questionType: "application", difficulty: "hard",
    question: "As landlines disappear, how have reputable pollsters adjusted, according to AMSCO?",
    options: ["By dropping phones entirely in favor of open online polls that anyone can join", "By adding live interviewers and requiring many cell-phone respondents", "By calling only landlines, since people who use only cell phones rarely vote", "By sending pre-recorded interactive surveys to cell phones, as federal law requires"],
    answer: "By adding live interviewers and requiring many cell-phone respondents",
    explanation: "Federal law prohibits pre-recorded interactive surveys to cell phones, so pollsters add human interviewers. Pew requires that 75 percent of its samples be cell-phone participants, since most homes are now wireless-only."
  },
  {
    id: "gi085", term: "weighting", area: "polling", topic: "4.5",
    questionType: "application", difficulty: "medium",
    question: "A statewide poll ends up with 65 percent women, though women make up about half of the state's voters. Which technique corrects the imbalance?",
    options: ["random-digit dialing", "push polling", "a tracking poll", "stratification"],
    answer: "stratification",
    explanation: "Stratification, also called weighting, adjusts the sample so groups appear in their true proportions - here, counting women's responses less heavily or removing some. If a district is 25 percent African American, the sample must mirror that too."
  },
  {
    id: "gi086", term: "weighting", area: "polling", topic: "4.5",
    questionType: "compare", difficulty: "hard",
    question: "What is the difference between drawing a random sample and weighting it?",
    options: ["Random selection gives everyone an equal chance; weighting then fixes groups that came out over- or underrepresented", "Weighting gives everyone an equal chance; random selection then fixes groups that came out over- or underrepresented", "Random selection is used only in phone polls, while weighting is used only in Election Day exit polls", "They are two names for one step, since a random sample always matches the population exactly"],
    answer: "Random selection gives everyone an equal chance; weighting then fixes groups that came out over- or underrepresented",
    explanation: "Even a random draw can come back lopsided - more women than men picking up the phone, for example. Weighting, or stratification, is the after-the-fact correction that makes the sample mirror the universe."
  },
  {
    id: "gi087", term: "sampling error", area: "polling", topic: "4.5",
    questionType: "definition", difficulty: "easy",
    question: "As a poll's sample size grows larger, its margin of error",
    options: ["increases", "stays exactly the same", "decreases", "rises at first, then falls"],
    answer: "decreases",
    explanation: "Sample size and margin of error have an inverse relationship. No sample removes error completely - the only way to know what everyone thinks is to ask everyone and get honest answers, which is impossible."
  },
  {
    id: "gi088", term: "sampling error", area: "polling", topic: "4.5",
    questionType: "application", difficulty: "medium",
    question: "Two similar samples find 55 percent and 58 percent opposing a bill, a sampling error of 3 points. By AMSCO's standard, is that acceptable?",
    options: ["No - any margin above 1 point makes a poll unscientific", "Yes - plus or minus 4 points or less is usually considered satisfactory", "No - the gap proves that at least one of the samples was biased", "Yes - margins of error do not apply to questions about legislation"],
    answer: "Yes - plus or minus 4 points or less is usually considered satisfactory",
    explanation: "AMSCO's own example of a 3-point sampling error comes from exactly this comparison. Different results from similar samples are expected, not proof of bias, and plus or minus 4 percent or less is usually considered satisfactory."
  },
  {
    id: "gi089", term: "sampling error", area: "polling", topic: "4.5",
    questionType: "scenario", difficulty: "hard",
    question: "In November 2016, one poll of about 1,400 respondents reported a margin of error of plus or minus 3 points, while another of about 30,000 reported plus or minus 1. What best explains the difference?",
    options: ["The larger sample produced a smaller margin of error", "The smaller poll must have relied on push-poll questions", "The larger poll was taken much closer to Election Day", "Each poll's sponsor chose the margin of error it preferred"],
    answer: "The larger sample produced a smaller margin of error",
    explanation: "Margin of error shrinks as sample size grows. A tiny margin is not a guarantee of accuracy, though: national polls that year still missed the state-level results that decided the Electoral College."
  },
  {
    id: "gi090", term: "non-attitudes", area: "polling", topic: "4.5",
    questionType: "application", difficulty: "medium",
    question: "When pollsters asked about repealing the \"Public Affairs Act,\" a law that never existed, 43 percent of people offered an opinion. This illustrates the problem of",
    options: ["the Bradley effect", "non-attitudes", "question order", "weighting"],
    answer: "non-attitudes",
    explanation: "Many people lack strong or informed opinions but answer anyway. Polls can also measure views without showing how much an issue actually matters to respondents."
  },
  {
    id: "gi091", term: "non-attitudes", area: "polling", topic: "4.5",
    questionType: "application", difficulty: "hard",
    question: "More than 90 percent of phone respondents say they will vote, though far fewer actually do. What does AMSCO suggest a careful pollster might add?",
    options: ["A promise that each respondent's answers will be shared with the candidates", "A question about whether the respondent knows the date of the election", "A question about which candidate the respondent's parents support", "A rule that respondents must answer by recorded voice only"],
    answer: "A question about whether the respondent knows the date of the election",
    explanation: "Screening questions such as \"Do you plan to vote in November?\" do not fully work, because people overstate their intent. Asking whether they know election day helps confirm a bona fide voter."
  },
  {
    id: "gi092", term: "interviewer effects", area: "polling", topic: "4.5",
    questionType: "application", difficulty: "medium",
    question: "In one study, 84 percent of women supported abortion rights when interviewed by women but only 64 percent when interviewed by men. This finding shows that",
    options: ["the interviewer's identity can affect respondents' answers", "women hold less stable opinions than men on most issues", "phone polls always understate support for abortion rights", "random-digit dialing reaches more women than men"],
    answer: "the interviewer's identity can affect respondents' answers",
    explanation: "Human bias enters through how interviewer and respondent interact. Perceived race matters too, and people are more honest on an anonymous paper questionnaire than in a live phone call."
  },
  {
    id: "gi093", term: "push polling", area: "polling", topic: "4.5",
    questionType: "application", difficulty: "easy",
    question: "A recorded caller asks, \"Would you still support Senator Lee if you knew she voted to cut veterans' benefits?\" and then lists more of her faults. This is best described as",
    options: ["push polling", "a benchmark poll", "a focus group", "a tracking poll"],
    answer: "push polling",
    explanation: "Push polls are not real polls. Instead of neutral questions meant to measure opinion, they feed respondents negative points about an opponent or positive points about a candidate - campaigning disguised as research."
  },
  {
    id: "gi094", term: "push polling", area: "polling", topic: "4.5",
    questionType: "document", difficulty: "hard",
    question: "The American Association for Public Opinion Research says push polls \"are not polls at all\" but \"political telemarketing.\" Which concern does the statement reflect?",
    options: ["Their samples are usually too small to produce reliable results", "They spread campaign messages under the guise of measuring opinion", "They depend on Internet volunteers rather than random samples", "They are conducted only outside polling places on Election Day"],
    answer: "They spread campaign messages under the guise of measuring opinion",
    explanation: "The intent is to manipulate - to push - voters, often with false or misleading claims. AMSCO also notes fundraising disguised as polling, which has cheapened polling's reputation."
  },
  {
    id: "gi095", term: "Internet polling", area: "polling", topic: "4.5",
    questionType: "application", difficulty: "medium",
    question: "Why is an online poll that anyone can click on unreliable as a measure of public opinion?",
    options: ["It draws only motivated people, and some let one person answer repeatedly", "Internet users are older and less educated than the general population", "Federal law forbids pollsters from weighting the results of online surveys", "Online polls are required to include push-poll questions"],
    answer: "It draws only motivated people, and some let one person answer repeatedly",
    explanation: "There is no way to assure a random sample. Internet users also tend to be younger, better educated, more affluent, white and suburban than people who are offline more often, so they are not a true cross section."
  },

  // =====================================================================
  // TOPIC 4.6 - EVALUATING PUBLIC OPINION DATA
  // =====================================================================
  {
    id: "gi096", term: "horse race coverage", area: "polling", topic: "4.6",
    questionType: "definition", difficulty: "medium",
    question: "Critics of \"horse race\" journalism complain that it",
    options: ["reports exit poll results before every state's polls have closed", "relies on focus groups instead of on scientific random samples", "covers who is ahead rather than where candidates stand", "ignores national polls and covers only state and local races"],
    answer: "covers who is ahead rather than where candidates stand",
    explanation: "Polls lend themselves to coverage about who is leading. Critics want more substance, such as candidates' views on social policy or government spending. That coverage can also translate into real political influence."
  },
  {
    id: "gi097", term: "horse race coverage", area: "polling", topic: "4.6",
    questionType: "scenario", difficulty: "hard",
    question: "Before the first 2016 Republican debate, Fox News chose 10 of 17 candidates based on an average of five national polls. AMSCO cites this as an example of how",
    options: ["polling has little effect on elections before Election Day", "debate sponsors are required by law to rely on exit polls", "the margin of error decides which candidates may run", "polling can shape whose voice is heard in a campaign"],
    answer: "polling can shape whose voice is heard in a campaign",
    explanation: "Polls decided who was on stage, and higher-polling candidates stood near the center, appearing on screen more often and saying more. Poll standing also feeds fundraising, which pays for ads and staff."
  },
  {
    id: "gi098", term: "exit polls", area: "polling", topic: "4.6",
    questionType: "scenario", difficulty: "hard",
    question: "Why do most media outlets hold back a state's Election Day exit poll results until that state's polls have closed?",
    options: ["Early results could lead people who have not yet voted to skip voting", "Federal law requires exit poll results to stay sealed until the next day", "Exit poll samples are too small to be reported with any confidence", "Candidates must first have a chance to challenge the methodology"],
    answer: "Early results could lead people who have not yet voted to skip voting",
    explanation: "If people learn Candidate A is far ahead, A's supporters may decide their vote is unnecessary and a trailing rival's supporters may decide it is hopeless. AMSCO ties this caution to the bandwagon effect."
  },
  {
    id: "gi099", term: "bandwagon effect", area: "polling", topic: "4.6",
    questionType: "definition", difficulty: "easy",
    question: "A shift of support toward a candidate simply because that candidate leads in the polls is called",
    options: ["the Bradley effect", "the multiplier effect", "a lifecycle effect", "the bandwagon effect"],
    answer: "the bandwagon effect",
    explanation: "People like to back a winner, so a lead can feed on itself. The Bradley effect is about respondents misstating support; the multiplier effect is an economic idea from Topic 4.9."
  },
  {
    id: "gi100", term: "bandwagon effect", area: "polling", topic: "4.6",
    questionType: "application", difficulty: "medium",
    question: "How does the bandwagon effect help a candidate who leads in national polls raise money?",
    options: ["Federal law awards matching funds to whichever candidate is leading the polls", "Donors give more to apparent winners, and a bigger war chest buys more ads and staff", "Candidates who lead in the polls may legally accept larger individual donations", "Polling firms donate part of their fees to whichever campaign is ahead"],
    answer: "Donors give more to apparent winners, and a bigger war chest buys more ads and staff",
    explanation: "AMSCO describes a direct link between national poll rank and fundraising. A war chest - the money that pays for a campaign - lets a candidate buy more advertising and keep a larger staff, and both influence the outcome."
  },
  {
    id: "gi101", term: "public opinion and the branches", area: "polling", topic: "4.6",
    questionType: "compare", difficulty: "hard",
    question: "Which part of the government does AMSCO describe as most sensitive to public opinion polls, and why?",
    options: ["The Senate, because each of its members represents an entire state", "The Supreme Court, because its justices must be reconfirmed periodically", "The House, because its members face reelection every two years", "The bureaucracy, because voters elect the heads of most agencies"],
    answer: "The House, because its members face reelection every two years",
    explanation: "House members keep constituents satisfied to keep votes and donations coming. Senators, with six-year terms, seem less sensitive. Federal judges serve for life, though the Court's rulings have tended to follow the national mood."
  },
  {
    id: "gi102", term: "public opinion and the branches", area: "polling", topic: "4.6",
    questionType: "application", difficulty: "hard",
    question: "How does AMSCO describe the relationship between public opinion and the Supreme Court?",
    options: ["Justices ignore public opinion entirely, because the Constitution forbids considering it", "Justices adjust rulings to poll numbers because they must win retention elections", "Rulings tend to follow the nation's mood, though life tenure keeps judges somewhat removed", "The Court follows public opinion only when the president formally asks it to"],
    answer: "Rulings tend to follow the nation's mood, though life tenure keeps judges somewhat removed",
    explanation: "Studies suggest a more liberal public brought more liberal rulings, as with the Warren Court in the 1960s, and a conservative shift late in the century was mirrored by the Rehnquist Court. Lifetime appointment still insulates judges."
  },
  {
    id: "gi103", term: "public opinion and the branches", area: "polling", topic: "4.6",
    questionType: "application", difficulty: "medium",
    question: "Why does a newly elected president often push an agenda hard in the first year?",
    options: ["High early approval can be used as a mandate before it fades", "The Constitution limits a president's first year to emergency laws", "Congress may not hold oversight hearings until the second year", "Approval ratings are not published until the first year ends"],
    answer: "High early approval can be used as a mandate before it fades",
    explanation: "Presidents usually enjoy their highest approval in the first year and try to use that popularity to advance their agenda quickly. They also use the bully pulpit to shift opinion rather than merely follow it."
  },
  {
    id: "gi104", term: "candidate error", area: "polling", topic: "4.6",
    questionType: "definition", difficulty: "medium",
    question: "Pollsters judge a pre-election poll's accuracy by its \"candidate error,\" which is",
    options: ["the share of respondents who refuse to name any candidate at all", "the gap between a poll's estimate of a candidate's share and the actual vote", "a gaffe by a candidate that causes a sudden drop in the polls", "the difference between a winner's share of the popular vote and the electoral vote"],
    answer: "the gap between a poll's estimate of a candidate's share and the actual vote",
    explanation: "Candidate error declined as methods improved, with occasional setbacks. In 2012 Gallup had Romney at 50 percent; Obama won nationally by nearly four points, and Gallup later stopped making horse-race predictions."
  },
  {
    id: "gi105", term: "candidate error", area: "polling", topic: "4.6",
    questionType: "application", difficulty: "hard",
    question: "National polls in 2016 showed Clinton ahead, and she did win the popular vote by about 2 points. Why, then, does AMSCO treat 2016 as a polling miss?",
    options: ["Clinton actually lost the popular vote, by a margin outside every national poll's error", "No major polling firm released a national poll in the final week of the race", "The election turned on state results and the Electoral College, where projections went wrong", "Most national polls had predicted that Trump would win in a landslide"],
    answer: "The election turned on state results and the Electoral College, where projections went wrong",
    explanation: "Forecasters put Clinton's chances at 70 to 99 percent, and final national polls had her ahead by 1 to 7 points. But the outcome turned on 51 separate contests, and Trump won the Electoral College."
  },
  {
    id: "gi106", term: "social desirability bias", area: "polling", topic: "4.6",
    questionType: "definition", difficulty: "easy",
    question: "Social desirability bias is the tendency of respondents to",
    options: ["refuse to take part in any poll run by the news media", "switch their support to whichever candidate is leading", "tell pollsters what they think the pollsters want to hear", "answer the first question differently from later ones"],
    answer: "tell pollsters what they think the pollsters want to hear",
    explanation: "People overstate their likelihood of voting because they do not want to seem to shirk a duty: most rate themselves 8 or 9 on a 9-point scale, yet only about 60 percent of eligible voters cast ballots."
  },
  {
    id: "gi107", term: "Bradley effect", area: "polling", topic: "4.6",
    questionType: "case", difficulty: "medium",
    question: "In 1982, Los Angeles Mayor Tom Bradley led the polls for California governor throughout the campaign but lost. The \"Bradley effect\" names",
    options: ["a late surge of undecided voters toward whichever candidate is trailing in the polls", "respondents falsely claiming to back a Black candidate to avoid seeming biased", "voters refusing to take part in polls because they distrust the media", "turnout dropping after the networks projected a winner too early"],
    answer: "respondents falsely claiming to back a Black candidate to avoid seeming biased",
    explanation: "It is a specific form of social desirability bias: some respondents did not want to appear bigoted, then voted for the white candidate. AMSCO notes later African American candidates also underperformed inflated poll numbers."
  },
  {
    id: "gi108", term: "social desirability bias", area: "polling", topic: "4.6",
    questionType: "scenario", difficulty: "hard",
    question: "In the 2017 Alabama Senate race, Roy Moore tended to lead in automated robocall polls while Doug Jones led in polls with live interviewers. Which explanation fits AMSCO's analysis?",
    options: ["Robocall polls reach only Republicans, while polls with live interviewers reach only Democrats", "The live interviewers used push-poll questions that were written to favor Jones", "Some voters may not have wanted to tell a live person they backed an accused candidate", "The robocall samples were weighted by age, while the live samples were not weighted"],
    answer: "Some voters may not have wanted to tell a live person they backed an accused candidate",
    explanation: "Social desirability bias is strongest when a real person is listening. After allegations against Moore, some voters may have hidden their preference from live interviewers but not from a recording. Jones won narrowly."
  },
  {
    id: "gi109", term: "non-response bias", area: "polling", topic: "4.6",
    questionType: "application", difficulty: "medium",
    question: "Some pollsters suspect that \"shy Trump voters\" in 2016 simply declined to take part in polls. If so, the polls suffered from",
    options: ["the bandwagon effect", "non-response bias", "framing", "random-digit dialing"],
    answer: "non-response bias",
    explanation: "Non-response bias arises when the people who refuse to participate differ from those who answer. The same anti-establishment, anti-media attitude that drew some voters to Trump may have kept them away from pollsters."
  },
  {
    id: "gi110", term: "undecideds breaking late", area: "polling", topic: "4.6",
    questionType: "compare", difficulty: "hard",
    question: "Which pair of explanations does AMSCO offer for the 2016 polling miss?",
    options: ["Undecided voters broke late for Trump, and some of his supporters avoided pollsters", "Pollsters relied on push polls, and exit polls were reported before polls closed", "Most samples had fewer than 100 people, and no margins of error were reported", "Clinton voters overstated their ages, and Trump voters overstated their incomes"],
    answer: "Undecided voters broke late for Trump, and some of his supporters avoided pollsters",
    explanation: "Among likely voters who had planned on a third-party candidate, 26 percent switched to Trump and only 11 percent to Clinton. Combined with possible non-response bias, late movement pushed results away from the final polls."
  },
  {
    id: "gi111", term: "social media opinion data", area: "polling", topic: "4.6",
    questionType: "application", difficulty: "medium",
    question: "Why is measuring public opinion from Twitter and other social media unreliable, according to AMSCO?",
    options: ["Posts on social media are private, so researchers are not legally allowed to read or count them", "People who post on social media are older and more moderate than the public", "Active users are unrepresentative, software misses sarcasm, and loud users count many times", "Federal law limits polling firms to studying fewer than 1,000 posts at a time"],
    answer: "Active users are unrepresentative, software misses sarcasm, and loud users count many times",
    explanation: "A 2015 study found people who discuss politics on Twitter are overwhelmingly male, urban and ideologically extreme. A massive sample is not the same as a representative one."
  },
  {
    id: "gi112", term: "evaluating poll credibility", area: "polling", topic: "4.6",
    questionType: "scenario", difficulty: "medium",
    question: "An interest group releases a poll showing overwhelming support for its cause and declares, \"The numbers don't lie.\" Which question should a careful reader ask first?",
    options: ["Did the poll's results agree with my own opinion?", "Was the poll covered by more than one news outlet?", "Were the results reported to two decimal places?", "Who conducted the poll, and who paid for it?"],
    answer: "Who conducted the poll, and who paid for it?",
    explanation: "Polls funded by parties and interest groups may be built to tip a certain way. The checklist also asks about methodology, exact wording and order, how results were obtained, context, missing voices and comparison with other polls."
  },
  {
    id: "gi113", term: "evaluating poll credibility", area: "polling", topic: "4.6",
    questionType: "application", difficulty: "hard",
    question: "A statewide poll taken just after a week-long barrage of TV ads for one candidate shows that candidate surging. Which question from AMSCO's checklist is most relevant?",
    options: ["Whose opinion might be missing from the poll?", "What methodology did the pollsters use?", "Who conducted the poll, and who paid for it?", "In what context was the poll taken?"],
    answer: "In what context was the poll taken?",
    explanation: "The timing of a poll can inflate a candidate's real popularity, as when a burst of advertising leaves a temporary bump. Comparing the result with other polls taken at the same time is a further check."
  },
  {
    id: "gi114", term: "social desirability bias", area: "polling", topic: "4.6",
    questionType: "application", difficulty: "hard",
    question: "Why might a mailed questionnaire produce more honest answers than a live phone interview?",
    options: ["Mailed surveys automatically produce a perfectly random sample", "Anonymity reduces respondents' urge to give socially acceptable answers", "Mail respondents are screened as likely voters before they answer", "Phone interviews are limited by law to simple yes-or-no questions"],
    answer: "Anonymity reduces respondents' urge to give socially acceptable answers",
    explanation: "Social desirability bias grows when someone is listening. AMSCO's checklist asks how results were obtained for exactly this reason. Mail has its own weaknesses, but anonymity is its strength."
  },

  // =====================================================================
  // TOPIC 4.7 - IDEOLOGIES OF POLITICAL PARTIES
  // =====================================================================
  {
    id: "gi115", term: "ideology", area: "ideology", topic: "4.7",
    questionType: "definition", difficulty: "easy",
    question: "AMSCO defines an ideology as",
    options: ["a list of plans a party approves at its national convention", "an issue that sharply divides the public into opposing camps", "the intense importance an issue holds for a particular group", "a comprehensive and mutually consistent set of ideas"],
    answer: "a comprehensive and mutually consistent set of ideas",
    explanation: "Ideology is the whole worldview. A platform is a party's written list of principles and plans, a wedge issue divides the public, and saliency is how much an issue matters to someone."
  },
  {
    id: "gi116", term: "valence issues", area: "ideology", topic: "4.7",
    questionType: "definition", difficulty: "easy",
    question: "Nearly everyone wants a strong economy and national security. Issues like these, viewed the same way across ideologies, are",
    options: ["wedge issues", "salient issues", "entitlements", "valence issues"],
    answer: "valence issues",
    explanation: "When candidates debate valence issues, congressional elections expert Paul Herrnson says, the dialogue can sound like Tweedledee arguing with Tweedledum. The fight is over who will deliver, not over what to want."
  },
  {
    id: "gi117", term: "wedge issues", area: "ideology", topic: "4.7",
    questionType: "application", difficulty: "medium",
    question: "How do political groups use wedge issues strategically?",
    options: ["To show voters that both parties agree on the nation's basic goals", "To rally support among people who have not yet formed strong opinions", "To measure a candidate's support before a campaign officially begins", "To guarantee bipartisan passage of mandatory spending bills"],
    answer: "To rally support among people who have not yet formed strong opinions",
    explanation: "Wedge issues sharply divide the public - AMSCO's examples are abortion and the 2003 Iraq invasion - and leave little room for compromise, since each side considers itself right. That makes them useful for mobilizing."
  },
  {
    id: "gi118", term: "wedge issues", area: "ideology", topic: "4.7",
    questionType: "compare", difficulty: "medium",
    question: "Which pairing correctly classifies these two issues as AMSCO would?",
    options: ["Educating children at public expense: wedge. Abortion: valence", "Both are valence issues, since most Americans hold an opinion on each", "Both are wedge issues, since each involves some government spending", "Educating children at public expense: valence. Abortion: wedge"],
    answer: "Educating children at public expense: valence. Abortion: wedge",
    explanation: "Most Americans across ideologies agree that children should be educated publicly and that dangerous industries should be regulated. Abortion splits the public sharply, with each side certain the other is wrong."
  },
  {
    id: "gi119", term: "saliency", area: "ideology", topic: "4.7",
    questionType: "definition", difficulty: "medium",
    question: "Reform of Social Security matters intensely to senior citizens, while job openings matter intensely to 18-to-20-year-olds. These are examples of",
    options: ["valence issues that everyone views the same way", "wedge issues that both parties avoid discussing", "entitlements that are protected from budget cuts", "issues with high saliency for a particular group"],
    answer: "issues with high saliency for a particular group",
    explanation: "Saliency is the intense importance an issue holds for a person or group. Divisive issues tend to be highly salient, and young adults' unemployment rate is higher than older groups', which is why jobs matter so much to them."
  },
  {
    id: "gi120", term: "moderate", area: "ideology", topic: "4.7",
    questionType: "application", difficulty: "medium",
    question: "According to the Gallup data AMSCO cites, which statement about Americans' self-described ideology is accurate?",
    options: ["Liberals have outnumbered conservatives in every year since 1992", "Moderates are a large group, and conservatives have outnumbered liberals", "Fewer than 10 percent of Americans describe themselves as moderate", "Nearly all Americans place themselves firmly at one end of the spectrum"],
    answer: "Moderates are a large group, and conservatives have outnumbered liberals",
    explanation: "In 1992 Gallup found 36 percent conservative, 17 percent liberal and 43 percent moderate; in 2019, 35, 26 and 35. Liberals have grown, but many Americans sit somewhere in between or mix views from both camps."
  },
  {
    id: "gi121", term: "liberal", area: "ideology", topic: "4.7",
    questionType: "process", difficulty: "hard",
    question: "How did the meaning of \"liberal\" change over American history, according to AMSCO?",
    options: ["From a government that expanded beyond traditional limits, to one that did little and left people free", "From support for state power over the economy, to support for returning the currency to gold", "It has meant the same thing since Jefferson's day: a preference for strong central planning", "From a government that did little and left people free, to one open to expanding beyond traditional limits"],
    answer: "From a government that did little and left people free, to one open to expanding beyond traditional limits",
    explanation: "Jefferson's \"liberal\" government governed least, an understanding that lasted into the late 1800s. FDR's New Deal acted liberally in a new sense - unconstrained by tradition - and since the 1930s the word has usually meant open to government acting flexibly."
  },
  {
    id: "gi122", term: "Barry Goldwater", area: "ideology", topic: "4.7",
    questionType: "document", difficulty: "medium",
    question: "Barry Goldwater's The Conscience of a Conservative, published on his way to the 1964 Republican nomination, argued that",
    options: ["the federal government should guarantee health insurance to all", "New Deal policies had unwisely altered the role of government", "higher tariffs were needed to protect American factory jobs", "the Democratic Party had grown too conservative on civil rights"],
    answer: "New Deal policies had unwisely altered the role of government",
    explanation: "Goldwater and much of his party wanted less economic regulation and more responsibility on citizens. Many conservatives today call themselves fiscal conservatives, wanting less taxation and less spending overall."
  },
  {
    id: "gi123", term: "conservative", area: "ideology", topic: "4.7",
    questionType: "application", difficulty: "hard",
    question: "AMSCO notes that the conservative label does not fit neatly on supporters of policies that restrict abortion or define marriage narrowly. Why not?",
    options: ["Those policies are supported mainly by the Democratic Party", "Those policies were first proposed by Progressive Era reformers", "Those policies would lower taxes on the wealthiest Americans", "Those policies require more law and regulation, not less"],
    answer: "Those policies require more law and regulation, not less",
    explanation: "If conservatism means a government that does less, laws regulating personal morality cut against it. Likewise, Jefferson might say liberals pursuing gun control or industry regulation are not acting liberally toward individual rights."
  },
  {
    id: "gi124", term: "libertarian", area: "ideology", topic: "4.7",
    questionType: "definition", difficulty: "easy",
    question: "Which voter is best described as a libertarian?",
    options: ["One who wants higher taxes on the rich to fund labor protections and public services", "One who wants lower taxes, opposes censorship, and dislikes government-imposed morality", "One who favors farm subsidies but would curb obscene or unpatriotic speech", "One who wants strict laws on personal morality along with heavy regulation of industry"],
    answer: "One who wants lower taxes, opposes censorship, and dislikes government-imposed morality",
    explanation: "Libertarians oppose most government intervention: conservative on economics, liberal on moral and social issues. More Americans claim the small-l label than belong to the Libertarian Party, whose 2016 nominee won about 3 percent."
  },
  {
    id: "gi125", term: "libertarian", area: "ideology", topic: "4.7",
    questionType: "document", difficulty: "medium",
    question: "\"You should be able to think what you want, live where you want, trade for what you want, eat what you want, smoke what you want, and wed whom you want.\" This line from two Reason magazine editors expresses which ideology?",
    options: ["populist", "progressive", "libertarian", "liberal"],
    answer: "libertarian",
    explanation: "Gillespie and Welch's line from Declaration of Independents sums up the libertarian view: minimal government in both the marketplace and private life. Liberals accept more economic regulation; populists more moral regulation."
  },
  {
    id: "gi126", term: "populist", area: "ideology", topic: "4.7",
    questionType: "application", difficulty: "medium",
    question: "According to AMSCO, a typical populist",
    options: ["favors workplace safety rules and farm subsidies but has little sympathy for accused criminals", "opposes nearly all government spending and supports legalizing every recreational drug", "favors open trade agreements and lower taxes on large corporations", "lives mainly on the coasts and supports minimal regulation of speech"],
    answer: "favors workplace safety rules and farm subsidies but has little sympathy for accused criminals",
    explanation: "Populists tend to be working-class Protestants in the South and Midwest who accept government spending they see as necessary for citizens' welfare, while wanting to curb obscene or unpatriotic speech."
  },
  {
    id: "gi127", term: "populist", area: "ideology", topic: "4.7",
    questionType: "scenario", difficulty: "hard",
    question: "Men without college degrees in Rust Belt factory towns, who usually voted Democratic, helped elect Donald Trump in 2016. AMSCO attributes this partly to",
    options: ["libertarian voters seeking to deregulate personal behavior", "progressive voters seeking much higher taxes on the wealthy", "the bandwagon effect from Trump's large lead in the national polls", "populist voters drawn by promises to protect jobs and police"],
    answer: "populist voters drawn by promises to protect jobs and police",
    explanation: "AMSCO says no serious observer would call Trump himself a populist, but populist voters - blue-collar workers and those with steadfast religious views - rallied to his strong voice. National polls actually showed him trailing."
  },
  {
    id: "gi128", term: "progressive", area: "ideology", topic: "4.7",
    questionType: "definition", difficulty: "medium",
    question: "Modern progressives, as AMSCO describes them, are most likely to support",
    options: ["lower corporate taxes and fewer regulations on business", "workers' rights over corporate rights and higher taxes on the rich", "a flat tax and the privatization of Social Security", "much tougher penalties for obscene speech and recreational drug use"],
    answer: "workers' rights over corporate rights and higher taxes on the rich",
    explanation: "The Progressive Movement challenged corruption and concentrated power in government and business in the early 1900s. Today's progressives align with labor unions and believe the wealthy should pay a much larger share of taxes."
  },
  {
    id: "gi129", term: "progressive", area: "ideology", topic: "4.7",
    questionType: "process", difficulty: "hard",
    question: "Where did the Progressive Movement originate, according to AMSCO?",
    options: ["In cities, from the roots of the Republican Party, peaking in the early 1900s", "On southern farms, from the roots of the Democratic Party, peaking in the 1930s", "In labor unions, from the roots of the Libertarian Party, peaking in the 1960s", "In rural Midwestern churches, peaking in the years after World War II"],
    answer: "In cities, from the roots of the Republican Party, peaking in the early 1900s",
    explanation: "Progressive reformers challenged corruption that ran against equality, individualism, democracy and advancement, and the Republican Party split into conservative and progressive wings."
  },
  {
    id: "gi130", term: "party platform", area: "ideology", topic: "4.7",
    questionType: "definition", difficulty: "easy",
    question: "According to AMSCO, the best way to determine a party's primary ideology is to",
    options: ["count how many of its members call themselves moderate", "examine the approval ratings of its candidates", "study which states it carried in the most recent election", "read its platform of principles and plans"],
    answer: "read its platform of principles and plans",
    explanation: "Platforms are approved at each party's national convention every four years, and committee fights over the wording reveal intraparty fractures. The 2016 platforms drew sharp contrasts on immigration, abortion and guns."
  },
  {
    id: "gi131", term: "party platform", area: "ideology", topic: "4.7",
    questionType: "document", difficulty: "medium",
    question: "\"We propose . . . work requirements in a growing economy, where opportunity takes the place of a hand-out.\" This 2016 platform language most likely came from",
    options: ["the Democratic Party, reflecting a liberal view of welfare", "the Libertarian Party, reflecting its call to abolish all taxes", "the Republican Party, reflecting a conservative view of welfare", "the Democratic Party, reflecting its push to expand Medicaid"],
    answer: "the Republican Party, reflecting a conservative view of welfare",
    explanation: "Republicans tend to oppose expanding entitlements and stress work and self-reliance. The Democrats' 2016 platform instead vowed to keep fighting until the ACA's Medicaid expansion was adopted in every state."
  },
  {
    id: "gi132", term: "party platform", area: "ideology", topic: "4.7",
    questionType: "compare", difficulty: "medium",
    question: "Which comparison of the parties' positions on law and order matches AMSCO?",
    options: ["Democrats tend to prefer rehabilitation; Republicans favor full sentences and the death penalty", "Democrats tend to favor full sentences and the death penalty; Republicans prefer rehabilitation", "Both parties' platforms call for abolishing capital punishment nationwide", "Neither party's platform takes any position on criminal justice"],
    answer: "Democrats tend to prefer rehabilitation; Republicans favor full sentences and the death penalty",
    explanation: "Democrats often oppose the death penalty; Republicans favor full prison terms with few chances for parole, and their 2016 platform condemned the Court's \"erosion\" of states' power to impose capital punishment."
  },

  // =====================================================================
  // TOPIC 4.8 - IDEOLOGY AND POLICY MAKING
  // =====================================================================
  {
    id: "gi133", term: "majoritarian", area: "ideology", topic: "4.8",
    questionType: "definition", difficulty: "medium",
    question: "Majoritarian policy making emerges when",
    options: ["people interact with government to carry out the will of the majority", "competing interest groups bargain until each wins part of what it wants", "unelected experts in the bureaucracy write policy entirely on their own", "courts overturn laws that most voters in a state had supported"],
    answer: "people interact with government to carry out the will of the majority",
    explanation: "Legislatures respond to popular ideas, presidents seeking reelection follow public outcries, and state initiatives and referenda let citizens act when legislatures will not - forms of participatory democracy. Group bargaining is the pluralist path."
  },
  {
    id: "gi134", term: "interest group policy making", area: "ideology", topic: "4.8",
    questionType: "application", difficulty: "medium",
    question: "Groups fund candidates, provide expert testimony at hearings, and compete to shape laws that address as many of their concerns as compromise allows. This approach to policy making is",
    options: ["participatory", "elite", "majoritarian", "pluralist"],
    answer: "pluralist",
    explanation: "Interest groups represent a pluralist approach: the diverse interests of the population compete to create public policy. Initiatives and referenda are the participatory, majoritarian path."
  },
  {
    id: "gi135", term: "majoritarian", area: "ideology", topic: "4.8",
    questionType: "compare", difficulty: "hard",
    question: "If majoritarian policy making is so democratic, why did the framers also build in other safeguards?",
    options: ["They believed that only organized interest groups should be allowed to shape policy", "They expected the Supreme Court to write most federal laws", "They feared a tyranny of the majority running roughshod over the minority", "They wanted the states to have no role at all in making policy"],
    answer: "They feared a tyranny of the majority running roughshod over the minority",
    explanation: "The framers created a republic of states and a system to keep majorities from trampling minority rights. They also warned that factions, often minority interests, would press government - and that at times government would comply."
  },
  {
    id: "gi136", term: "agenda", area: "ideology", topic: "4.8",
    questionType: "definition", difficulty: "easy",
    question: "In the policy process, an agenda is",
    options: ["the final text of a law after the president has signed it into effect", "a list of potential policy ideas, bills, or plans to improve society", "a poll that measures support before a campaign begins", "a court order that blocks a new policy from taking effect"],
    answer: "a list of potential policy ideas, bills, or plans to improve society",
    explanation: "Legislators and bureaucrats develop and reshape agendas: new enforcement methods, tax changes, long-term plans for relations with a foreign nation. Each idea then faces a cost-benefit analysis."
  },
  {
    id: "gi137", term: "cost-benefit analysis", area: "ideology", topic: "4.8",
    questionType: "application", difficulty: "medium",
    question: "Building a skywalk at every intersection would save pedestrian lives, but the price, disruption, and confusion might outweigh the gains. Weighing these factors is an example of",
    options: ["a wedge issue", "a cost-benefit analysis", "the multiplier effect", "majoritarian policy making"],
    answer: "a cost-benefit analysis",
    explanation: "Each new policy idea brings a full look at the effort and sacrifice it requires compared with the benefits it would bring. AMSCO's skywalk example shows a policy can do real good and still not be worth it."
  },
  {
    id: "gi138", term: "policy process", area: "ideology", topic: "4.8",
    questionType: "process", difficulty: "hard",
    question: "Which sequence best reflects the ideal policy process AMSCO describes?",
    options: ["An issue gains attention, Congress investigates, a policy is formulated and adopted, then implemented and evaluated", "A policy is implemented, then Congress investigates it, then the issue finally gains public attention", "A policy is adopted, then formulated in committee, then the issue gains attention, then it is evaluated", "Congress evaluates a policy first, then the issue gains attention, then the policy is formulated and implemented"],
    answer: "An issue gains attention, Congress investigates, a policy is formulated and adopted, then implemented and evaluated",
    explanation: "Attention can come from a citizen push or a contractor's proposal. Committees then hear experts, language is drafted and refined, and change usually comes incrementally. After funding and enforcement come agency reports and oversight."
  },
  {
    id: "gi139", term: "policy process", area: "ideology", topic: "4.8",
    questionType: "application", difficulty: "medium",
    question: "After a new law is adopted, what must the government do to carry it out, according to AMSCO?",
    options: ["Submit the law to a national referendum for final ratification", "Wait for the Supreme Court to issue an advisory opinion on it", "Hold a special election so voters can approve the agency's budget", "Pay for enforcement and assign the job to a new or existing agency"],
    answer: "Pay for enforcement and assign the job to a new or existing agency",
    explanation: "Every policy requires the executive branch to enforce it, either through a new agency or added duties for an existing one. Evaluation follows, through required agency reports or congressional oversight."
  },
  {
    id: "gi140", term: "referendum", area: "ideology", topic: "4.8",
    questionType: "scenario", difficulty: "hard",
    question: "In 2011 Ohio passed Senate Bill 5, limiting collective bargaining for hundreds of thousands of public employees. Opponents gathered more than a million signatures, and voters repealed it that November. This episode best illustrates",
    options: ["interest group policy making, since the public-employee unions drafted the bill", "citizens using a referendum to overturn a law, a majoritarian path", "the courts striking down a state law as unconstitutional", "a valence issue on which nearly all Ohio voters agreed"],
    answer: "citizens using a referendum to overturn a law, a majoritarian path",
    explanation: "Opponents often challenge new policies in court, but a referendum lets citizens repeal a law directly. AMSCO notes policies, especially those on wedge issues, can swing back and forth within short periods."
  },

  // =====================================================================
  // TOPIC 4.9 - IDEOLOGY AND ECONOMIC POLICY
  // =====================================================================
  {
    id: "gi141", term: "economy and elections", area: "economic", topic: "4.9",
    questionType: "compare", difficulty: "medium",
    question: "Herbert Hoover in 1932, Gerald Ford in 1976, Jimmy Carter in 1980, and George H.W. Bush in 1992 have what in common?",
    options: ["Each won another term by cutting taxes during a recession", "Each balanced the federal budget during his first term", "Each lost a bid to stay in office during poor economic times", "Each appointed a Federal Reserve chair from the other party"],
    answer: "Each lost a bid to stay in office during poor economic times",
    explanation: "Except for party identification, nothing shapes Election Day more than voters' view of the economy. James Carville's 1992 reminder to Bill Clinton - \"It's the economy, stupid\" - captured the point."
  },
  {
    id: "gi142", term: "fiscal policy", area: "economic", topic: "4.9",
    questionType: "application", difficulty: "hard",
    question: "AMSCO says most people want three things from government finances. Which combination is impossible to have all at once?",
    options: ["Lower taxes, no national debt, and more government services", "Higher taxes, a balanced budget, and fewer government services", "A progressive tax, a central bank, and a favorable trade balance", "Stable prices, low unemployment, and a growing economy"],
    answer: "Lower taxes, no national debt, and more government services",
    explanation: "Cutting taxes while expanding services means borrowing. Politicians often answer by taxing \"other people\" - Senator Russell Long's \"tax that fellow behind the tree\" - through narrow excise or sin taxes."
  },
  {
    id: "gi143", term: "excise taxes", area: "economic", topic: "4.9",
    questionType: "application", difficulty: "medium",
    question: "Why do governments like excise \"sin taxes\" on products such as cigarettes or gambling?",
    options: ["They hit relatively few people, many of whom keep buying even as prices rise", "The Constitution requires that most federal revenue come from excise taxes on goods", "They raise more money than the federal income tax on individuals", "They fall equally on every citizen regardless of income or habits"],
    answer: "They hit relatively few people, many of whom keep buying even as prices rise",
    explanation: "Russell Long's quip - \"Don't tax me, don't tax thee, tax that fellow behind the tree\" - captures the logic. In fact, the largest share of federal revenue comes from individual income taxes."
  },
  {
    id: "gi144", term: "fiscal policy", area: "economic", topic: "4.9",
    questionType: "definition", difficulty: "easy",
    question: "Fiscal policy is the part of economic policy concerned with",
    options: ["the money supply and interest rates", "trade agreements with foreign nations", "government spending and taxation", "how banks must treat their depositors"],
    answer: "government spending and taxation",
    explanation: "Congress and the president make fiscal policy through budgets and tax laws. Managing the money supply and interest rates is monetary policy, handled by the Federal Reserve."
  },
  {
    id: "gi145", term: "Keynesian economics", area: "economic", topic: "4.9",
    questionType: "definition", difficulty: "medium",
    question: "According to Keynesian economics, what should government do when demand in the economy is too low?",
    options: ["Raise taxes and cut spending to balance the budget", "Leave the market alone until demand recovers on its own", "Cut taxes or raise spending, even if it has to borrow", "Raise interest rates so that people are encouraged to save"],
    answer: "Cut taxes or raise spending, even if it has to borrow",
    explanation: "Keynes argued the market left alone will not necessarily run at full capacity. Government should create the right level of demand - adding money when demand is low, and taxing more or spending less when it is too high."
  },
  {
    id: "gi146", term: "American Recovery and Reinvestment Act", area: "economic", topic: "4.9",
    questionType: "application", difficulty: "medium",
    question: "Which law most closely follows Keynesian theory?",
    options: ["the Recovery Act of 2009", "the Tax Cuts and Jobs Act of 2017", "the Taft-Hartley Act of 1947", "the Sixteenth Amendment of 1913"],
    answer: "the Recovery Act of 2009",
    explanation: "The Recovery Act used heavy federal spending on education, infrastructure, health and renewable energy to revive demand during the Great Recession. It drew practically no Republican support; the 2017 act reflected supply-side thinking."
  },
  {
    id: "gi147", term: "American Recovery and Reinvestment Act", area: "economic", topic: "4.9",
    questionType: "compare", difficulty: "hard",
    question: "Why did Republicans criticize the 2009 Recovery Act, compared with George W. Bush's Economic Stimulus Act of 2008?",
    options: ["It stressed government spending, while they preferred tax cuts that let citizens decide how to spend", "It cut taxes too deeply, while they preferred direct federal spending on highways, dams, and other public works", "It raised the reserve requirement, while they preferred a lower discount rate for banks", "It ended NAFTA, while they preferred raising tariffs on goods imported from Mexico"],
    answer: "It stressed government spending, while they preferred tax cuts that let citizens decide how to spend",
    explanation: "Republicans argued tax cuts put money in citizens' hands and gave them control over it. Libertarians objected even more strongly, seeing the law as an inappropriate expansion of government power."
  },
  {
    id: "gi148", term: "multiplier effect", area: "economic", topic: "4.9",
    questionType: "application", difficulty: "medium",
    question: "With a multiplier of 1.5, a $10 billion increase in government spending could raise total output by",
    options: ["$10 billion", "$6.7 billion", "$15 billion", "$1.5 billion"],
    answer: "$15 billion",
    explanation: "The multiplier effect means output rises by a multiple of the original spending: public construction employs contractors, bricklayers and electricians, who spend their wages at other businesses, which then hire more workers."
  },
  {
    id: "gi149", term: "multiplier effect", area: "economic", topic: "4.9",
    questionType: "scenario", difficulty: "hard",
    question: "The government funds a highway project. Which chain of events illustrates the multiplier effect?",
    options: ["Taxes rise to pay for the project, so consumers cut back on their own spending", "The Fed raises the discount rate, so banks lend less money to home buyers", "Workers are hired, spend wages at local shops, and the shops hire more staff", "Imports of building materials increase, so the trade deficit grows wider"],
    answer: "Workers are hired, spend wages at local shops, and the shops hire more staff",
    explanation: "Each round of spending becomes someone else's income, so total output grows by more than the original outlay. Keynesians use this to argue that public works, like the New Deal's, pay off beyond their price tag."
  },
  {
    id: "gi150", term: "Keynesian economics", area: "economic", topic: "4.9",
    questionType: "case", difficulty: "medium",
    question: "Franklin Roosevelt's New Deal agencies, such as the WPA, PWA, and CCC, built schools, dams, and roads with borrowed money. This approach was based largely on",
    options: ["Keynesian economics", "supply-side economics", "laissez-faire theory", "monetary policy"],
    answer: "Keynesian economics",
    explanation: "Borrowing to fund public works and jobs injects demand into a depressed economy, the Keynesian prescription. Liberal ideologies tend to favor this significant level of government involvement in the marketplace."
  },
  {
    id: "gi151", term: "supply-side economics", area: "economic", topic: "4.9",
    questionType: "definition", difficulty: "easy",
    question: "Supply-side economists argue that the best way to strengthen the economy is to",
    options: ["cut taxes so people and businesses spend, invest, and work more", "raise government spending to create demand during downturns", "raise tariffs so Americans buy mostly American-made goods", "expand entitlement programs to protect consumers' incomes"],
    answer: "cut taxes so people and businesses spend, invest, and work more",
    explanation: "Supply-siders such as Arthur Laffer, an advisor to Reagan, say lower taxes boost spending, jobs and investment, while government still collects large revenues from the resulting economic activity."
  },
  {
    id: "gi152", term: "supply-side economics", area: "economic", topic: "4.9",
    questionType: "application", difficulty: "hard",
    question: "How do supply-side theorists argue that cutting taxes need not starve the government of revenue?",
    options: ["The Federal Reserve can print enough money to cover any shortfall", "Lower tax rates automatically reduce spending on entitlements", "Growth from more jobs, spending, and profits brings in other tax revenue", "Tariffs on imports replace the lost income tax revenue dollar for dollar"],
    answer: "Growth from more jobs, spending, and profits brings in other tax revenue",
    explanation: "Supply-siders try to find the tax level that strengthens firms and raises overall revenue. Lower taxes also give people an incentive to work, earn, save and invest in stocks or bonds."
  },
  {
    id: "gi153", term: "Tax Cuts and Jobs Act", area: "economic", topic: "4.9",
    questionType: "application", difficulty: "medium",
    question: "The Tax Cuts and Jobs Act of 2017 most clearly reflects which economic theory?",
    options: ["supply-side economics", "Keynesian economics", "Federal Reserve monetary policy", "progressive taxation"],
    answer: "supply-side economics",
    explanation: "The act permanently lowered corporate taxes and temporarily lowered individual taxes. Supporters argued corporations would pass savings on through higher wages and more hiring. It passed the Senate with no Democratic votes."
  },
  {
    id: "gi154", term: "libertarian", area: "economic", topic: "4.9",
    questionType: "compare", difficulty: "medium",
    question: "How does the libertarian view of the marketplace differ from the conservative supply-side view?",
    options: ["Libertarians want even less regulation, limiting government to protecting property and trade", "Libertarians want more regulation and favor Keynesian deficit spending whenever a recession hits", "Libertarians reject free markets and favor government ownership of major industries", "Libertarians agree with conservatives on everything except the federal minimum wage"],
    answer: "Libertarians want even less regulation, limiting government to protecting property and trade",
    explanation: "Conservatives favor lower taxes and limited regulation; libertarians go further, wanting government to do little beyond protecting property rights and voluntary exchange. Economists like Milton Friedman influenced them."
  },
  {
    id: "gi155", term: "Sixteenth Amendment", area: "economic", topic: "4.9",
    questionType: "process", difficulty: "hard",
    question: "Which sequence correctly describes the history of the federal income tax?",
    options: ["The Sixteenth Amendment, then Pollock striking down a peacetime tax, then a temporary Civil War income tax", "A temporary Civil War income tax, then Pollock striking down a peacetime tax, then the Sixteenth Amendment", "Pollock upholding a peacetime tax, then a temporary Civil War income tax, then the Sixteenth Amendment", "A temporary Civil War income tax, then the Sixteenth Amendment, then Pollock upholding the new tax"],
    answer: "A temporary Civil War income tax, then Pollock striking down a peacetime tax, then the Sixteenth Amendment",
    explanation: "Congress first taxed income to fund the Union war effort. In Pollock the Court struck down a peacetime income tax, and the Sixteenth Amendment (1913) overrode that ruling."
  },
  {
    id: "gi156", term: "Pollock v. Farmers' Loan & Trust Co.", area: "economic", topic: "4.9",
    questionType: "case", difficulty: "medium",
    question: "In Pollock v. Farmers' Loan & Trust Co., the Supreme Court",
    options: ["upheld the first peacetime income tax as a valid use of the commerce power", "created the Internal Revenue Service to collect the new income tax", "ruled that Congress may not tax goods imported from foreign countries", "struck down a federal income tax, reflecting the era's laissez-faire thinking"],
    answer: "struck down a federal income tax, reflecting the era's laissez-faire thinking",
    explanation: "The Court treated the tax as a direct tax that Article I required Congress to apportion among the states. AMSCO calls it a classic late-1800s example of judicial activism and free-market thought; the Sixteenth Amendment reversed it."
  },
  {
    id: "gi157", term: "Sixteenth Amendment", area: "economic", topic: "4.9",
    questionType: "definition", difficulty: "easy",
    question: "The Sixteenth Amendment (1913) allowed Congress to",
    options: ["tax individuals' incomes", "create a central bank", "tax goods sold abroad", "regulate interstate trade"],
    answer: "tax individuals' incomes",
    explanation: "It overrode the Court's ruling in Pollock. Congress then built the income tax system and later the IRS to collect it; today individual income taxes are the largest share of federal revenue. Taxing exports is still forbidden."
  },
  {
    id: "gi158", term: "Internal Revenue Service", area: "economic", topic: "4.9",
    questionType: "definition", difficulty: "easy",
    question: "Which agency oversees the collection of federal income taxes?",
    options: ["the Federal Reserve Board", "the Social Security Administration", "the Equal Employment Opportunity Commission", "the Internal Revenue Service"],
    answer: "the Internal Revenue Service",
    explanation: "After the Sixteenth Amendment, Congress defined the income tax system and created the IRS to run collection. The Fed manages monetary policy, and the Social Security Administration handles the retirement trust fund."
  },
  {
    id: "gi159", term: "progressive tax", area: "economic", topic: "4.9",
    questionType: "definition", difficulty: "easy",
    question: "The federal income tax is a progressive tax, which means that",
    options: ["everyone pays the same share of their income", "the tax pays for programs begun in the Progressive Era", "rates fall automatically during recessions", "the tax rate rises as a person's income rises"],
    answer: "the tax rate rises as a person's income rises",
    explanation: "Rates progress upward with income. Middle-class families pay roughly 12 to 22 percent, and only the highest earners face the top rate of 37 percent. A tax that charges everyone the same rate is a flat tax."
  },
  {
    id: "gi160", term: "progressive tax", area: "economic", topic: "4.9",
    questionType: "process", difficulty: "hard",
    question: "Which sequence best tracks the top federal income tax rate over time, as AMSCO describes it?",
    options: ["94 percent in World War II, about 70 percent in the 1970s, under 30 percent under Reagan, 37 percent after 2017", "37 percent in World War II, about 70 percent in the 1970s, under 30 percent under Reagan, 94 percent after 2017", "Under 30 percent in World War II, 94 percent in the 1970s, about 70 percent under Reagan, 37 percent after 2017", "About 70 percent in World War II, 94 percent in the 1970s, 37 percent under Reagan, under 30 percent after 2017"],
    answer: "94 percent in World War II, about 70 percent in the 1970s, under 30 percent under Reagan, 37 percent after 2017",
    explanation: "The top bracket has fallen gradually since Kennedy pushed a major cut in 1962. Recent decades hovered between 35 and 40 percent, and the Tax Cuts and Jobs Act set it at 37 percent."
  },
  {
    id: "gi161", term: "fiscal policy", area: "economic", topic: "4.9",
    questionType: "application", difficulty: "medium",
    question: "Congress offers tax credits to people who buy solar panels and energy-efficient appliances. AMSCO presents this as an example of",
    options: ["monetary policy, since the credits change the supply of money", "a flat tax, since every buyer receives exactly the same credit regardless of income", "mandatory spending on a federal entitlement program", "using the taxing power to encourage behavior, not just to raise money"],
    answer: "using the taxing power to encourage behavior, not just to raise money",
    explanation: "When liberals drafted tax law, Congress rewarded environmentally friendly purchases. The 2017 law cut some of those incentives and expanded child tax credits that favor married couples, reflecting more traditional values."
  },
  {
    id: "gi162", term: "flat rate", area: "economic", topic: "4.9",
    questionType: "compare", difficulty: "medium",
    question: "How do views on the structure of the income tax differ, according to AMSCO?",
    options: ["The public backs a mildly progressive tax, some on the far right want a flat rate, and libertarians reject coerced taxes", "The public backs a flat rate, liberals want no income tax at all, and libertarians want a steeply progressive tax", "Every major ideology now accepts a single flat rate for all citizens, so the only real debate is over deductions", "Conservatives want to restore a 94 percent top rate, while liberals want everyone to pay the same flat rate"],
    answer: "The public backs a mildly progressive tax, some on the far right want a flat rate, and libertarians reject coerced taxes",
    explanation: "A mildly progressive code has been the standard since the Progressive Era. A flat tax charges everyone the same rate, and libertarians go further, arguing government should not coerce people to do anything, including pay taxes."
  },
  {
    id: "gi163", term: "fiscal policy", area: "economic", topic: "4.9",
    questionType: "application", difficulty: "hard",
    question: "Fiscal conservatives targeted the National Endowment for the Arts in the 2018 budget proposal, yet the agency was a minuscule share of federal spending. What point does AMSCO make with this example?",
    options: ["Spending on the arts is the main cause of the national debt", "Presidents may eliminate any agency without Congress's approval", "Liberal and conservative budgets rarely differ on spending priorities", "Parties often fight over items that make up a tiny fraction of the budget"],
    answer: "Parties often fight over items that make up a tiny fraction of the budget",
    explanation: "Congress funded the endowment in the final budget anyway. Both parties typically vote to spend more than the government takes in, adding to the debt, while arguing over philosophical differences in small slices of the budget."
  },
  {
    id: "gi164", term: "fiscal policy", area: "economic", topic: "4.9",
    questionType: "compare", difficulty: "medium",
    question: "Which president does AMSCO credit as the only one in recent times to balance the federal budget, and how?",
    options: ["Ronald Reagan, by cutting the top tax rate below 30 percent", "Bill Clinton, partly by raising taxes on the wealthy", "George W. Bush, through the Economic Stimulus Act of 2008", "Barack Obama, through the Recovery Act of 2009"],
    answer: "Bill Clinton, partly by raising taxes on the wealthy",
    explanation: "Clinton accomplished it with no Republican support. Balancing - spending no more than revenue brings in - is nearly impossible to sustain, and the stimulus programs of 2008 and 2009 sent the deficit soaring."
  },
  {
    id: "gi165", term: "monetary policy", area: "economic", topic: "4.9",
    questionType: "definition", difficulty: "easy",
    question: "Monetary policy is how the government",
    options: ["manages the supply of its currency and thus the value of the dollar", "decides how much to tax and how much to spend in a given year", "negotiates trade agreements and sets tariffs with other countries", "sets the eligibility rules for Medicare and for Medicaid"],
    answer: "manages the supply of its currency and thus the value of the dollar",
    explanation: "The dollar's value depends on how many dollars exist and how much people at home and abroad want them. The Federal Reserve runs monetary policy; taxing and spending is fiscal policy."
  },
  {
    id: "gi166", term: "inflation", area: "economic", topic: "4.9",
    questionType: "definition", difficulty: "easy",
    question: "When too many dollars are in circulation, the likely result is",
    options: ["inflation", "deflation", "a trade surplus", "a balanced budget"],
    answer: "inflation",
    explanation: "Like diamonds and paper clips, money is worth more when it is scarce. Inflation means rising prices and a devalued dollar; if government closely watches how much currency circulates, the dollar keeps its value."
  },
  {
    id: "gi167", term: "monetary policy", area: "economic", topic: "4.9",
    questionType: "compare", difficulty: "medium",
    question: "Why do conservatives tend to prefer monetary policy over fiscal policy for managing the economy?",
    options: ["They believe Congress, not the Fed, should set interest rates directly", "They want the president to control the supply of money personally", "They see much fiscal policy as wasteful spending and needless interference", "They see monetary policy as the best way to expand entitlements"],
    answer: "They see much fiscal policy as wasteful spending and needless interference",
    explanation: "Conservatives draw on Milton Friedman and Alan Greenspan, who backed easy-money policies of lower interest rates. Critics, including many liberals, say easy money may have helped cause the Great Recession's housing collapse."
  },
  {
    id: "gi168", term: "Federal Reserve Board", area: "economic", topic: "4.9",
    questionType: "definition", difficulty: "medium",
    question: "Which description of the Federal Reserve Board is accurate?",
    options: ["Seven presidentially appointed, Senate-confirmed governors serving staggered 14-year terms", "Nine members chosen by Congress who serve for life, much like the justices of the Supreme Court", "A cabinet department whose secretary serves at the pleasure of the president", "Twelve governors, each elected by the voters of one Federal Reserve district"],
    answer: "Seven presidentially appointed, Senate-confirmed governors serving staggered 14-year terms",
    explanation: "Congress created the Federal Reserve System in 1913: the Board plus 12 regional Federal Reserve Banks. One governor chairs the Board for a four-year term."
  },
  {
    id: "gi169", term: "Federal Reserve Board", area: "economic", topic: "4.9",
    questionType: "application", difficulty: "hard",
    question: "Why is the Federal Reserve Board an independent agency whose governors serve 14-year terms?",
    options: ["To let each new president replace the entire board right after taking office", "To insulate decisions about the money supply from presidential and partisan pressure", "To let Congress set interest rates without any involvement from the president", "To make the choice of Fed chair a central issue in presidential campaigns"],
    answer: "To insulate decisions about the money supply from presidential and partisan pressure",
    explanation: "Presidents shape the Fed through appointments, but confirmed governors are hard to remove and act in the nation's interest. Long terms give continuity, and the chair's four-year term is staggered so the appointment is not an election issue."
  },
  {
    id: "gi170", term: "discount rate", area: "economic", topic: "4.9",
    questionType: "process", difficulty: "medium",
    question: "If the Fed lowers the discount rate, what chain of effects does AMSCO predict?",
    options: ["Banks borrow more and lower their rates, so people buy more cars and homes", "Banks borrow less and raise their rates, so prices of consumer goods fall", "The government collects more income tax, so the federal budget deficit disappears", "Imported goods become more expensive, so the trade balance improves"],
    answer: "Banks borrow more and lower their rates, so people buy more cars and homes",
    explanation: "The discount rate is the interest the Fed charges commercial banks. Cheaper money flows through to consumer loans, boosting sales, hiring and demand for materials. To cool inflation, the Fed raises the rate instead."
  },
  {
    id: "gi171", term: "discount rate", area: "economic", topic: "4.9",
    questionType: "scenario", difficulty: "hard",
    question: "Prices are rising quickly because the economy is growing too fast. Which Fed action fits AMSCO's description of how to respond?",
    options: ["Raise the discount rate to slow the flow of dollars", "Lower the reserve requirement so banks lend more", "Buy back bonds so that banks have more money to lend", "Cut income taxes so that consumers can spend more"],
    answer: "Raise the discount rate to slow the flow of dollars",
    explanation: "Raising the discount rate slows lending and pulls money into reserve, bringing prices down. The other choices would put more money into the economy, and cutting income taxes is fiscal policy, not a Fed tool."
  },
  {
    id: "gi172", term: "reserve requirement", area: "economic", topic: "4.9",
    questionType: "application", difficulty: "medium",
    question: "If the Fed lowers the reserve requirement from $16 to $12 for every $100 a bank lends, what happens?",
    options: ["Banks must keep more cash in their vaults", "Interest rates on loans automatically rise", "The federal government collects more in taxes", "Banks are encouraged to lend out more money"],
    answer: "Banks are encouraged to lend out more money",
    explanation: "The reserve requirement is the share of money a bank must keep on hand. Lowering it frees cash for loans; raising it restricts lending and pushes interest rates up."
  },
  {
    id: "gi173", term: "bonds", area: "economic", topic: "4.9",
    questionType: "definition", difficulty: "medium",
    question: "In AMSCO's terms, government bonds, or securities, are",
    options: ["taxes charged on imports to protect American manufacturers", "federal grants given to states for specific programs", "insurance payments drawn from the Social Security trust fund", "government IOUs whose buyers are promised repayment with interest"],
    answer: "government IOUs whose buyers are promised repayment with interest",
    explanation: "Besides taxes, the government raises money when citizens or foreign governments buy bonds and Treasury notes. The Fed also buys and sells bonds with commercial banks; buying them back gives banks more money to lend."
  },
  {
    id: "gi174", term: "trade balance", area: "economic", topic: "4.9",
    questionType: "definition", difficulty: "easy",
    question: "A nation that exports more than it imports has",
    options: ["a favorable trade balance", "a trade deficit", "a budget surplus", "an inflationary economy"],
    answer: "a favorable trade balance",
    explanation: "Buying more from other nations than you sell to them is a trade deficit. Governments encourage exports so wealth from other nations enters the economy, though the trade balance is only one measure of success."
  },
  {
    id: "gi175", term: "trade balance", area: "economic", topic: "4.9",
    questionType: "document", difficulty: "hard",
    question: "Article I, Section 9 bars Congress from taxing exports, but the framers expected it to tax imports. What goal did this arrangement serve?",
    options: ["Paying down the national debt through taxes on American farmers", "Keeping prices of foreign goods as low as possible for consumers", "Encouraging American production and a favorable balance of trade", "Preventing the states from trading with one another"],
    answer: "Encouraging American production and a favorable balance of trade",
    explanation: "Import duties force foreign firms to raise their prices in the U.S., giving domestic manufacturers an edge, while untaxed exports compete better abroad. The hope was that Americans would export more than they imported."
  },
  {
    id: "gi176", term: "North American Free Trade Agreement", area: "economic", topic: "4.9",
    questionType: "compare", difficulty: "medium",
    question: "Which statement describes the debate over NAFTA (1994) as AMSCO presents it?",
    options: ["Labor unions generally backed it; corporations feared new competition from lower-cost Mexican manufacturers", "Business and labor both opposed it, but Congress approved it over their objections", "Libertarians opposed it because it lowered taxes on goods imported from Canada", "Corporations and economic conservatives generally backed it; labor unions feared jobs would move abroad"],
    answer: "Corporations and economic conservatives generally backed it; labor unions feared jobs would move abroad",
    explanation: "NAFTA removed import taxes among the U.S., Canada and Mexico. Free traders say globalization reduced poverty abroad and opened markets; laborers point to outsourcing and auto plant closures in Detroit."
  },

  // =====================================================================
  // TOPIC 4.10 - IDEOLOGY AND SOCIAL POLICY
  // =====================================================================
  {
    id: "gi177", term: "social welfare", area: "social", topic: "4.10",
    questionType: "definition", difficulty: "easy",
    question: "AMSCO defines social welfare as",
    options: ["tax breaks for corporations that hire new workers", "the Federal Reserve's management of interest rates and the money supply", "support for disadvantaged people to meet their basic needs", "programs that pay for the nation's defense"],
    answer: "support for disadvantaged people to meet their basic needs",
    explanation: "New Deal programs of the 1930s and Great Society programs of the 1960s built much of the nation's social welfare policy. The Preamble's promise to \"promote the general welfare\" is where the debate over it starts."
  },
  {
    id: "gi178", term: "social welfare", area: "social", topic: "4.10",
    questionType: "compare", difficulty: "medium",
    question: "Which statement best captures the liberal view of social policy described by AMSCO?",
    options: ["Private charities rather than government should take care of people in need", "Government should provide a safety net and pay for it with higher taxes", "Government should limit itself to protecting property and voluntary trade", "Welfare should be cut back so that taxes can fall at every income level"],
    answer: "Government should provide a safety net and pay for it with higher taxes",
    explanation: "Liberals see the safety net as a way to promote the general welfare. Conservatives and libertarians have long opposed expensive programs, and conservatives tend to believe private companies deliver social services better."
  },
  {
    id: "gi179", term: "entitlements", area: "social", topic: "4.10",
    questionType: "definition", difficulty: "easy",
    question: "Entitlements are",
    options: ["benefits Congress has promised by law to anyone who meets the criteria", "grants Congress may choose to fund or cancel each year in the appropriations process", "tax credits that reward people for energy-efficient purchases", "loans the Federal Reserve makes to commercial banks"],
    answer: "benefits Congress has promised by law to anyone who meets the criteria",
    explanation: "Because people who qualify are legally entitled to payment, Congress must cover these costs. Social Security, Medicare, Medicaid and food stamps are examples, and they drive both annual deficits and the overall debt."
  },
  {
    id: "gi180", term: "mandatory spending", area: "social", topic: "4.10",
    questionType: "definition", difficulty: "medium",
    question: "Why is spending on entitlements called mandatory spending?",
    options: ["The president must approve it before any other spending", "Every citizen is required to pay into it through payroll taxes", "Congress must pay those who are legally entitled to the funds", "The Constitution lists each of the programs by name"],
    answer: "Congress must pay those who are legally entitled to the funds",
    explanation: "Entitlements are set by law and paid to every qualifying person, group or government. The money goes out year after year unless Congress changes the underlying law."
  },
  {
    id: "gi181", term: "Social Security Act", area: "social", topic: "4.10",
    questionType: "definition", difficulty: "easy",
    question: "The Social Security Act of 1935 created",
    options: ["a government health insurance program for Americans over the age of 65", "a health care program for the poorest Americans", "a payroll-tax insurance program for retirees and the unemployed", "a federal commission that regulates labor unions"],
    answer: "a payroll-tax insurance program for retirees and the unemployed",
    explanation: "Passed amid the Great Depression after local charities and state treasuries went broke, it greatly expanded government, creating what some call the welfare state. Medicare and Medicaid came in 1965; the Wagner Act created the labor board."
  },
  {
    id: "gi182", term: "Social Security Act", area: "social", topic: "4.10",
    questionType: "application", difficulty: "medium",
    question: "How is Social Security funded, according to AMSCO?",
    options: ["General income tax revenue is sent to the states, which then mail out the monthly benefit checks", "A 12.4 percent payroll tax, split by employer and employee, goes into a separate trust fund", "Retirees pay monthly premiums out of their own savings to keep their benefits", "Excise taxes on cigarettes and gambling cover the full cost of the program"],
    answer: "A 12.4 percent payroll tax, split by employer and employee, goes into a separate trust fund",
    explanation: "Employer and employee each pay 6.2 percent into a trust fund kept apart from the general treasury. The Social Security Administration, with about 60,000 employees, runs it, and it takes more than 20 percent of the budget."
  },
  {
    id: "gi183", term: "third rail", area: "social", topic: "4.10",
    questionType: "definition", difficulty: "medium",
    question: "Why is Social Security called the \"third rail\" of American politics?",
    options: ["It is the third-largest program in the federal budget", "Politicians who try to change it risk a shock of voter disapproval", "It was the third program Congress passed during the New Deal", "It is funded by a third party rather than by taxpayers"],
    answer: "Politicians who try to change it risk a shock of voter disapproval",
    explanation: "Like the electrified rail on a train track, it is dangerous to touch. People who paid in for decades react angrily to talk of privatizing it or raising the retirement age, even though longer life spans strain the trust fund."
  },
  {
    id: "gi184", term: "Social Security Act", area: "social", topic: "4.10",
    questionType: "scenario", difficulty: "hard",
    question: "Some project that the Social Security trust fund will be exhausted around 2042. Which factor does AMSCO identify as straining the program?",
    options: ["Congress diverted money from the trust fund to pay for the Recovery Act of 2009", "The Tax Cuts and Jobs Act abolished the payroll tax for most workers", "People live much longer than in the 1930s, so they draw benefits longer", "Far fewer people qualify for benefits than when the program began"],
    answer: "People live much longer than in the 1930s, so they draw benefits longer",
    explanation: "Longer lives mean longer payouts. Fixes like privatizing the program or raising the retirement age frighten voters, which is why Social Security is called the third rail of politics."
  },
  {
    id: "gi185", term: "Social Security Act", area: "social", topic: "4.10",
    questionType: "document", difficulty: "hard",
    question: "Senator Bernie Sanders wrote in 2019 that \"a billionaire pays the same amount of money into Social Security as someone who makes $132,900 a year.\" What change does his argument support?",
    options: ["Privatizing Social Security accounts to increase competition", "Raising the retirement age to reduce the number of people collecting", "Lifting the cap on income subject to the Social Security payroll tax", "Replacing the payroll tax with a single flat income tax"],
    answer: "Lifting the cap on income subject to the Social Security payroll tax",
    explanation: "The payroll tax applies only up to a cap, so very high earners pay a smaller share of their income. Sanders proposed applying it to all income over $250,000 - a liberal approach of strengthening the program by taxing the wealthy."
  },
  {
    id: "gi186", term: "Medicare", area: "social", topic: "4.10",
    questionType: "definition", difficulty: "easy",
    question: "Medicare is",
    options: ["a health care program for low-income Americans", "government-run health insurance for citizens over 65", "the retirement program created in 1935", "a tax credit for buying private health insurance"],
    answer: "government-run health insurance for citizens over 65",
    explanation: "Passed in 1965 under Lyndon Johnson, Medicare is funded by a payroll tax on employers and employees and can cover up to 80 percent of qualifying seniors' health costs. Medicaid is the program for the poor."
  },
  {
    id: "gi187", term: "Medicaid", area: "social", topic: "4.10",
    questionType: "compare", difficulty: "medium",
    question: "Which comparison of Medicare and Medicaid is accurate?",
    options: ["Medicare covers people over 65; Medicaid covers the poorest Americans", "Medicare covers the poorest Americans; Medicaid covers people over 65", "Medicare is run entirely by private insurers; Medicaid is run entirely by the Internal Revenue Service", "Both were created by the Social Security Act of 1935 as part of Roosevelt's New Deal"],
    answer: "Medicare covers people over 65; Medicaid covers the poorest Americans",
    explanation: "Together they make up nearly 20 percent of the federal budget. States largely administer Medicaid while the federal government pays much of the bill; Medicare is run by an agency in the Department of Health and Human Services."
  },
  {
    id: "gi188", term: "Great Society", area: "social", topic: "4.10",
    questionType: "application", difficulty: "medium",
    question: "Lyndon Johnson's War on Poverty, part of the Great Society, is associated with which result?",
    options: ["Food stamps and public housing were cut back so that income taxes could be lowered", "Aid for the poor grew sharply and poverty fell, especially among African Americans", "Social Security was privatized for workers under the age of forty", "The federal budget stayed balanced for the rest of the decade"],
    answer: "Aid for the poor grew sharply and poverty fell, especially among African Americans",
    explanation: "Spending on aid, subsidized housing and job retraining rose from nearly $10 billion in 1960 to about $30 billion in 1968. Cutting food stamps and public housing came later, under Reaganomics."
  },
  {
    id: "gi189", term: "Reaganomics", area: "social", topic: "4.10",
    questionType: "document", difficulty: "hard",
    question: "\"The Founding Fathers knew a government can't control the economy without controlling people.\" Ronald Reagan's 1964 statement expresses which view of government social programs?",
    options: ["The liberal view that government must manage the economy for the public good", "The conservative view that costly programs threaten individual liberty", "The progressive view that large corporations hold far too much power", "The populist view that farm subsidies protect the welfare of citizens"],
    answer: "The conservative view that costly programs threaten individual liberty",
    explanation: "Reagan spoke in support of Barry Goldwater's candidacy. As president, his Reaganomics stressed lower taxes and free market activity, and welfare programs such as food stamps and public housing construction were cut back."
  },
  {
    id: "gi190", term: "Patient Protection and Affordable Care Act", area: "social", topic: "4.10",
    questionType: "case", difficulty: "medium",
    question: "Why did conservative legislators fight the Patient Protection and Affordable Care Act of 2010?",
    options: ["They saw government overreach and thought private competition would cut costs", "They believed the law did not regulate private insurance companies strictly enough", "They wanted a single government-run health plan for every American instead", "They objected that it cut Medicare benefits for every senior in half"],
    answer: "They saw government overreach and thought private competition would cut costs",
    explanation: "Conservatives tend to think private companies provide social services better and push privatizing Medicare and Medicaid. The ACA's popularity rose gradually after passage; late-2019 polls showed a modest edge in favor."
  },
  {
    id: "gi191", term: "Patient Protection and Affordable Care Act", area: "social", topic: "4.10",
    questionType: "document", difficulty: "hard",
    question: "A 2016-2017 Gallup survey of college-educated Americans found 84 percent of Democrats but only 22 percent of Republicans agreeing that government should make sure everyone has health care. What does the gap illustrate?",
    options: ["Education level determines health care views regardless of party", "Health care has become a valence issue that unites the two parties", "Social desirability bias makes polls about health care meaningless", "Ideology shapes views on government's role in addressing social issues"],
    answer: "Ideology shapes views on government's role in addressing social issues",
    explanation: "Even holding education constant, partisanship produces a 62-point gap. The same survey found 72 percent of Democrats but 8 percent of Republicans preferring government-run health care - a wedge issue, not a valence one."
  },
  {
    id: "gi192", term: "organized labor", area: "social", topic: "4.10",
    questionType: "compare", difficulty: "medium",
    question: "How do conservatives and liberals differ on organized labor, according to AMSCO?",
    options: ["Conservatives credit unions with the 40-hour week; liberals see union dues as a threat to individual liberty", "Conservatives often see unions as a negative force; liberals credit them with gains like the 40-hour week", "Both treat labor as an ordinary market good whose wages should be set only by supply and demand", "Both oppose collective bargaining for private workers but disagree about the federal minimum wage"],
    answer: "Conservatives often see unions as a negative force; liberals credit them with gains like the 40-hour week",
    explanation: "Conservatives treat labor as part of the free market and object when workers must pay union dues. Liberals see labor as unique, since better-paid workers are more motivated, and credit unions with benefits such as employer health care."
  },
  {
    id: "gi193", term: "Wagner Act", area: "social", topic: "4.10",
    questionType: "case", difficulty: "medium",
    question: "As part of the New Deal, the Wagner Act (1935)",
    options: ["allowed the states to pass right-to-work laws limiting union membership requirements", "set the first federal minimum wage and overtime pay", "created a federal board to regulate unions and rule on unfair labor practices", "outlawed collective bargaining by public employees"],
    answer: "created a federal board to regulate unions and rule on unfair labor practices",
    explanation: "That commission is the National Labor Relations Board. A separate New Deal law set the minimum wage, the 40-hour week and overtime pay. Right-to-work laws came after the Taft-Hartley Act of 1947."
  },
  {
    id: "gi194", term: "Taft-Hartley Act", area: "social", topic: "4.10",
    questionType: "definition", difficulty: "medium",
    question: "The Taft-Hartley Act, passed by a Republican Congress in 1947, is significant because it",
    options: ["created the 40-hour work week and required employers to pay overtime", "let states pass right-to-work laws, partly counteracting the labor movement", "banned yellow dog contracts that kept new workers from joining unions", "guaranteed collective bargaining rights to federal air traffic controllers"],
    answer: "let states pass right-to-work laws, partly counteracting the labor movement",
    explanation: "Generally favored by business, Taft-Hartley opened the door to state right-to-work laws, which many states have since passed. Yellow dog contracts were outlawed earlier, during a period of progressive control of government."
  },
  {
    id: "gi195", term: "organized labor", area: "social", topic: "4.10",
    questionType: "scenario", difficulty: "hard",
    question: "In 1981 President Reagan fired striking air traffic controllers, and their union was later decertified. According to labor expert Joseph McCartin, the episode",
    options: ["shaped the modern workplace, which has seen far fewer strikes since", "led Congress to pass the Wagner Act to protect federal workers", "ended collective bargaining rights for all private-sector employees", "persuaded Reagan to oppose collective bargaining for every worker"],
    answer: "shaped the modern workplace, which has seen far fewer strikes since",
    explanation: "Reagan declared the strike illegal because the controllers were public employees. He generally supported workers' bargaining rights, but his firm stand dealt organized labor a blow it has found hard to overcome."
  },
  {
    id: "gi196", term: "Griswold v. Connecticut", area: "social", topic: "4.10",
    questionType: "case", difficulty: "medium",
    question: "Griswold v. Connecticut (1965) matters to the ideological debate over privacy because it",
    options: ["allowed the states to ban the use of contraception by married couples", "held that the Constitution explicitly lists a right to privacy in the text of the Fourth Amendment", "upheld the National Security Agency's bulk collection of phone records", "established a right to privacy that later abortion and same-sex marriage rulings built on"],
    answer: "established a right to privacy that later abortion and same-sex marriage rulings built on",
    explanation: "Striking down Connecticut's ban on contraception, the Court found a right to privacy in the Bill of Rights. Conservatives argue that because privacy is not explicit, the federal government should not overrule state laws on such matters."
  },
  {
    id: "gi197", term: "informational privacy", area: "social", topic: "4.10",
    questionType: "compare", difficulty: "hard",
    question: "On informational privacy, conservatives tend to back surveillance when the nation is threatened, while liberals favor stricter limits. Where do the two sides agree, according to AMSCO?",
    options: ["Both support unlimited surveillance once Congress has declared war", "Both want the Fourth Amendment set aside for digital records", "Both oppose NSA bulk data collection and back FISA court approval", "Both oppose giving courts any role in approving surveillance"],
    answer: "Both oppose NSA bulk data collection and back FISA court approval",
    explanation: "As technology made sweeping data collection simple, liberals and conservatives joined in opposing bulk collection. Both still worry about how easily government might access personal information."
  },
  {
    id: "gi198", term: "Planned Parenthood v. Casey", area: "social", topic: "4.10",
    questionType: "document", difficulty: "hard",
    question: "In Planned Parenthood v. Casey (1992), the joint opinion kept \"the essence of Roe's original decision\" but stressed the state's \"important and legitimate interest in potential life.\" Which description best fits the ruling?",
    options: ["It overturned Roe v. Wade and returned the abortion question entirely to the states", "It kept a woman's basic right while giving states more room to regulate abortion", "It held that states may not regulate abortion in any way at any stage of pregnancy", "It ruled that the right to an abortion is protected by the First Amendment"],
    answer: "It kept a woman's basic right while giving states more room to regulate abortion",
    explanation: "Casey upheld Roe's core holding, citing the Court's legitimacy and the rule of law, while giving more weight to the state's interest. (In 2022, Dobbs v. Jackson Women's Health Organization overruled both Roe and Casey.)"
  },
  {
    id: "gi199", term: "school vouchers", area: "social", topic: "4.10",
    questionType: "compare", difficulty: "medium",
    question: "How do conservatives and liberals tend to differ over school vouchers?",
    options: ["Conservatives fear weakening public schools; liberals stress parents' choice and competition", "Conservatives stress parents' choice and competition; liberals fear weakening public schools", "Both sides oppose vouchers as a violation of the establishment clause", "Both sides support vouchers but disagree over which agency should pay"],
    answer: "Conservatives stress parents' choice and competition; liberals fear weakening public schools",
    explanation: "Vouchers divert public funds to families paying private, often religious, school tuition. Conservatives say choice is fundamental and competition pushes public schools to improve; liberals cherish free public education."
  },
  {
    id: "gi200", term: "Masterpiece Cakeshop v. Colorado Civil Rights Commission", area: "social", topic: "4.10",
    questionType: "case", difficulty: "hard",
    question: "In Masterpiece Cakeshop v. Colorado Civil Rights Commission, a baker refused to make a wedding cake for a same-sex couple. Which statement fits AMSCO's account of the case?",
    options: ["The Court ruled broadly that any business may refuse any customer for any religious reason at all", "The Court ruled for the couple, holding that a religious objection can never excuse refusing service", "The Court declined to hear the case, leaving Colorado's ruling against the baker in place", "The Court ruled narrowly for the baker on First Amendment grounds while affirming gay couples' rights"],
    answer: "The Court ruled narrowly for the baker on First Amendment grounds while affirming gay couples' rights",
    explanation: "Conservatives tend to oppose government interference with religious practice even when it clashes with nondiscrimination law. The baker served same-sex couples otherwise, objecting only to items for the wedding itself."
  },
  {
    id: "gi201", term: "right to privacy", area: "social", topic: "4.10",
    questionType: "compare", difficulty: "medium",
    question: "On issues of personal choice and intimacy, which statement matches AMSCO's description of the ideological divide?",
    options: ["Social conservatives tend to keep government out of private matters; liberals accept some intrusion to protect core values", "Both sides agree that the federal courts should overrule every state law touching on privacy", "Liberals tend to keep government out of private matters; social conservatives accept some intrusion to protect core values", "Neither side treats privacy as a political issue, so it rarely appears in party platforms"],
    answer: "Liberals tend to keep government out of private matters; social conservatives accept some intrusion to protect core values",
    explanation: "This reverses the usual economic pattern, in which conservatives want less government. Disputes over state \"bathroom bills\" show conservatives defending state laws while some students argue those laws violate their privacy."
  },

  // =====================================================================
  // CROSS-CUTTING REVIEW
  // =====================================================================
  {
    id: "gi202", term: "mixed", area: "mixed", topic: "4.9",
    questionType: "compare", difficulty: "medium",
    question: "Which pairing of an ideology with the economic theory it relies on is accurate?",
    options: ["Liberal: supply-side economics. Conservative: Keynesian economics", "Libertarian: Keynesian economics. Liberal: laissez-faire theory", "Liberal: Keynesian economics. Conservative: supply-side economics", "Conservative: Keynesian economics. Libertarian: government ownership"],
    answer: "Liberal: Keynesian economics. Conservative: supply-side economics",
    explanation: "Liberals cite Keynes to justify government spending to manage demand; conservatives rely on supply-side theory from the Reagan years; libertarians draw on Friedman and Greenspan and want the least government involvement of all."
  },
  {
    id: "gi203", term: "mixed", area: "mixed", topic: "4.7",
    questionType: "document", difficulty: "medium",
    question: "The 2016 Democratic platform pledged to \"end gender discrimination in the areas of education, employment, health care, or any other sphere.\" Which core value from Topic 4.1 does this most directly reflect?",
    options: ["free enterprise", "equality of opportunity", "limited government", "individualism"],
    answer: "equality of opportunity",
    explanation: "Removing discrimination so everyone gets a fair chance to compete is equality of opportunity. Platforms show how each party interprets shared values; Democrats present themselves as an inclusive party working for minority rights."
  },
  {
    id: "gi204", term: "mixed", area: "mixed", topic: "4.9",
    questionType: "application", difficulty: "medium",
    question: "Which approach to the federal budget deficit is most consistent with a liberal ideology?",
    options: ["Keep social programs and raise taxes on the wealthy", "Cut taxes and spending, and limit government to its listed tasks", "Borrow to protect defense spending, then rely on supply-side growth", "Abolish the income tax and let the market fund public services"],
    answer: "Keep social programs and raise taxes on the wealthy",
    explanation: "Liberals protect the safety net and ask the wealthy to pay more, as Clinton did when he balanced the budget. Limiting government to listed tasks leans libertarian, and borrowing for defense while relying on supply-side growth leans conservative."
  },
  {
    id: "gi205", term: "mixed", area: "mixed", topic: "4.2",
    questionType: "scenario", difficulty: "hard",
    question: "Voter A is a 30-year-old with a master's degree in English who lives in Boston. Voter B is a 60-year-old evangelical small-business owner in rural Georgia. Based on the socialization factors AMSCO describes, which prediction is most reasonable?",
    options: ["A is likelier to want fewer business regulations; B is likelier to back expanded social programs", "A is likelier to back expanded social programs; B is likelier to want fewer business regulations", "Both are likely libertarians, since each one values personal freedom", "Neither prediction is possible, since socialization has no link to ideology"],
    answer: "A is likelier to back expanded social programs; B is likelier to want fewer business regulations",
    explanation: "Youth, an advanced humanities degree and the Northeast all lean liberal; age, evangelical faith, business ownership and the rural South all lean conservative. These are tendencies, not certainties - views vary widely within every group."
  },
  {
    id: "gi206", term: "mixed", area: "mixed", topic: "4.8",
    questionType: "application", difficulty: "hard",
    question: "Why does the quality of public opinion polling matter for majoritarian policy making?",
    options: ["Officials can follow the majority's will only as well as that will is measured", "Majoritarian policy is written by interest groups, so polls are irrelevant", "In a majoritarian system, polls legally replace elections and referenda", "The Constitution requires Congress to pass any bill that polls well"],
    answer: "Officials can follow the majority's will only as well as that will is measured",
    explanation: "Majoritarian policy making depends on officials knowing what most people want. A push poll, a skewed sample or social desirability bias can mislead officials about the majority's will."
  },
  {
    id: "gi207", term: "mixed", area: "mixed", topic: "4.4",
    questionType: "compare", difficulty: "medium",
    question: "What did the Great Depression and the Great Recession have in common, according to AMSCO?",
    options: ["Each pushed the generation that lived through it firmly toward laissez-faire economics", "Each took place when the Federal Reserve had no power over interest rates", "Each raised support for government intervention among those who came of age in it", "Each ended only after Congress replaced the income tax with a flat tax"],
    answer: "Each raised support for government intervention among those who came of age in it",
    explanation: "The Depression built trust in government and support for a safety net; the Great Recession left nearly 70 percent of Millennials accepting government intervention in a failing economy. Hard times shape lasting attitudes."
  },
  {
    id: "gi208", term: "mixed", area: "mixed", topic: "4.5",
    questionType: "definition", difficulty: "medium",
    question: "Which pairing of a Unit 4 term with its meaning is INCORRECT?",
    options: ["Saliency - an issue that people of every ideology view the same way", "Weighting - adjusting a sample so groups appear in their true proportions", "Multiplier effect - output rising by more than the original spending", "Lifecycle effects - views changing as people move through stages of life"],
    answer: "Saliency - an issue that people of every ideology view the same way",
    explanation: "An issue viewed the same way across ideologies is a valence issue. Saliency is the intense importance an issue holds for a person or group. The other three pairings are accurate."
  },
  {
    id: "gi209", term: "mixed", area: "mixed", topic: "4.9",
    questionType: "compare", difficulty: "easy",
    question: "Which pairing correctly matches each type of economic policy with who mainly makes it?",
    options: ["Fiscal: the Federal Reserve. Monetary: Congress and the president", "Fiscal: Congress and the president. Monetary: the Federal Reserve", "Fiscal and monetary: both set by the Federal Reserve alone", "Fiscal: the IRS. Monetary: the Social Security Administration"],
    answer: "Fiscal: Congress and the president. Monetary: the Federal Reserve",
    explanation: "Taxing and spending run through the budget and tax laws that Congress passes and the president signs. The independent Federal Reserve manages the money supply through the discount rate, reserve requirements and bonds."
  },
  {
    id: "gi210", term: "mixed", area: "mixed", topic: "4.7",
    questionType: "compare", difficulty: "hard",
    question: "Which comparison of populist and libertarian views is accurate?",
    options: ["Populists oppose farm subsidies; libertarians strongly favor them", "Populists would curb obscene speech; libertarians oppose censorship", "Populists cluster on the coasts; libertarians mainly in the rural South", "Populists want lighter sentences; libertarians want harsher ones"],
    answer: "Populists would curb obscene speech; libertarians oppose censorship",
    explanation: "Populists accept government spending for workers and farmers but want a strict moral code enforced, including on speech. Libertarians oppose both: low taxes and spending, and no government-imposed morality."
  },
  {
    id: "gi211", term: "mixed", area: "mixed", topic: "4.9",
    questionType: "compare", difficulty: "medium",
    question: "Adam Smith's laissez-faire ideas from Topic 4.1 are most closely echoed in which modern approach to the economy?",
    options: ["supply-side economics", "Keynesian economics", "the multiplier effect", "progressive taxation"],
    answer: "supply-side economics",
    explanation: "Supply-siders want lower taxes and fewer regulations so the market can work, and libertarians want government limited to protecting property and voluntary trade. Keynesians, by contrast, want government to manage demand."
  },
  {
    id: "gi212", term: "mixed", area: "mixed", topic: "4.10",
    questionType: "process", difficulty: "hard",
    question: "Which list puts these laws in chronological order?",
    options: ["Social Security Act, Taft-Hartley Act, Medicare, Affordable Care Act", "Taft-Hartley Act, Social Security Act, Medicare, Affordable Care Act", "Social Security Act, Medicare, Taft-Hartley Act, Affordable Care Act", "Medicare, Social Security Act, Affordable Care Act, Taft-Hartley Act"],
    answer: "Social Security Act, Taft-Hartley Act, Medicare, Affordable Care Act",
    explanation: "1935, 1947, 1965, 2010. The New Deal built the first safety net, a postwar Republican Congress reined in labor, the Great Society added health care for seniors, and the ACA expanded coverage under Obama."
  },
  {
    id: "gi213", term: "mixed", area: "mixed", topic: "4.10",
    questionType: "definition", difficulty: "medium",
    question: "AMSCO's Unit 4 review says that the policies in place at any given time mainly reflect",
    options: ["the conclusions of nonpartisan economists, whatever the outcome of the most recent elections", "the original intent of the framers, which has remained unchanged since 1787", "the success of the parties whose ideologies they reflect, and citizens' beliefs", "the results of whichever national opinion poll was released most recently"],
    answer: "the success of the parties whose ideologies they reflect, and citizens' beliefs",
    explanation: "When Republicans hold power, conservative policies on regulation, social services and privacy tend to become law; when Democrats hold power, liberal ones do. Participation is how citizens' values reach policy."
  }
];

// Export for the Node-based validator (harmless in the browser).
if (typeof module !== "undefined") {
  module.exports = { govIdeologyVocab, govIdeologyBank };
}
