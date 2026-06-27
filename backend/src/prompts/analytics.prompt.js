/**
 * System prompt template setting the persona and analytical style of the AI.
 */
export const SYSTEM_PROMPT = `You are the GrowCode Neural Analytics Engine.
Your task is to analyze a developer's LeetCode statistics and recent submissions to generate highly technical, developer-oriented diagnostic insights and a personalized training plan.

Guidelines for your analysis:
1. Speak in a sophisticated, technical, developer-centric tone. Avoid generic feedback. Mention specific algorithmic concepts, complexities, and software paradigms.
2. Determine their coding DNA strengths and assign realistic mastery percentages (0 to 100).
3. Identify exactly three critical bottlenecks or anomalies, outlining the exact root cause of their inefficiencies (e.g., pruning inefficiencies in DFS, state representation overlaps in DP, index out of bounds in sliding window, etc.).
4. Estimate ELO potential improvements (+20 to +100 per bottleneck) and project a total ELO improvement potential.
5. Generate a target daily mission focused on one of their bottlenecks, specifying realistic problem targets and estimated completion time in minutes.
6. Provide two LeetCode practice problem recommendations that target their immediate weaknesses, outlining exact AI reasons, expected space/time complexity targets, subproblem identification logic, and prerequisite concepts.

You MUST strictly comply with the provided JSON schema output.`;

/**
 * Compiles LeetCode profile metrics and submissions into a structured user prompt.
 * 
 * @param {Object} metrics - Normalized user LeetCode details
 * @returns {string} Compiled prompt text
 */
export const createUserPrompt = (metrics) => {
  const solved = metrics.solvedStats || { all: 0, easy: 0, medium: 0, hard: 0 };
  const contest = metrics.contestRanking || { rating: 1500, attendedContestsCount: 0, topPercentage: 100, globalRanking: null };
  const recent = metrics.recentSubmissions || [];

  const recentList = recent.length > 0
    ? recent.map(sub => `- ${sub.title}`).join('\n')
    : 'None recorded recently';

  return `Analyze the following LeetCode profile metrics:

Username: ${metrics.username}
Solved Counts:
- Total: ${solved.all}
- Easy: ${solved.easy}
- Medium: ${solved.medium}
- Hard: ${solved.hard}

Contest Performance:
- Rating: ${contest.rating}
- Contests Attended: ${contest.attendedContestsCount}
- Top Percentage: ${contest.topPercentage}%
- Global Rank: ${contest.globalRanking || 'Unranked'}

Recent Submissions:
${recentList}

Analyze the topic distribution and recent submissions, identify concrete areas for optimization, and return the structured JSON output.`;
};

/**
 * Compiles LeetCode profile metrics and topic distribution for the dashboard summary insight.
 * 
 * @param {Object} metrics - Normalized user metrics
 * @param {Array} topicData - Calculated topic distribution percentages
 * @returns {string} Compiled prompt text
 */
export const createDashboardPrompt = (metrics, topicData) => {
  const solved = metrics.solvedStats || { all: 0, easy: 0, medium: 0, hard: 0 };
  const contest = metrics.contestRanking || { rating: 1500, attendedContestsCount: 0, topPercentage: 100, globalRanking: null };
  const recent = metrics.recentSubmissions || [];

  const topicList = topicData && topicData.length > 0
    ? topicData.map(t => `- ${t.name}: ${t.value}%`).join('\n')
    : 'None available';

  const recentList = recent.length > 0
    ? recent.map(sub => `- ${sub.title}`).join('\n')
    : 'None recorded';

  return `Generate a dashboard summary insight based on these details:

Contest Rating: ${contest.rating}
Solved Stats:
- Easy: ${solved.easy}
- Medium: ${solved.medium}
- Hard: ${solved.hard}
- Total: ${solved.all}

Topic Distribution:
${topicList}

Recent Activity:
${recentList}

Return a single JSON object with exact keys:
- "codingDNA": String (concise technical persona, e.g. "Recursion Tactician", "Dynamic Optimization Specialist")
- "strength": String (one-sentence technical description of their key programming strength)
- "weakness": String (one-sentence technical description of their biggest algorithmic bottleneck)
- "summary": String (two-sentence overall diagnostic summary of their profile progress)
- "motivationalInsight": String (one-sentence developer-grade advice or call to action)`;
};

/**
 * Compiles metrics for the detailed weakness diagnostics prompt.
 * 
 * @param {Object} metrics - Normalized user metrics
 * @returns {string} Compiled prompt text
 */
export const createWeaknessPrompt = (metrics) => {
  const solved = metrics.solvedStats || { all: 0, easy: 0, medium: 0, hard: 0 };
  const contest = metrics.contestRanking || { rating: 1500, attendedContestsCount: 0, topPercentage: 100, globalRanking: null };
  const recent = metrics.recentSubmissions || [];

  const recentList = recent.length > 0
    ? recent.map(sub => `- ${sub.title}`).join('\n')
    : 'None recorded';

  return `Generate a detailed weakness analysis based on these details:

LeetCode Profile:
- Solved Counts: Easy: ${solved.easy}, Medium: ${solved.medium}, Hard: ${solved.hard}, Total: ${solved.all}
- Casing Username: ${metrics.username}

Contest Data:
- Current Rating: ${contest.rating}
- Contests Attended: ${contest.attendedContestsCount}
- Top Percentage: ${contest.topPercentage}%

Recent Activity:
${recentList}

For each of their key weaknesses (identify exactly three, sorted by severity), return a JSON object containing:
- weaknesses: An array of weakness items, each item being an object with keys:
  - "weakness": String (algorithmic topic name, e.g., "Dynamic Programming")
  - "severity": Number (0-10 score representing weakness criticality)
  - "rootCause": String (one-sentence technical explanation of why they struggle, focusing on optimization, pruning, state design, etc.)
  - "improvementAdvice": String (concrete technical advice: specific problems to solve, paradigms to master)
  - "ratingImpact": Number (projected ELO points they will gain if they solve this bottleneck, e.g., 20-120)`;
};

/**
 * Compiles metrics for the AI Coach prompt.
 * 
 * @param {Object} metrics - Normalized user metrics
 * @param {Array} weakTopics - User's identified weakness areas
 * @param {Number} goalRating - Target ELO rating
 * @param {Number} dailyTarget - Target problems count
 * @returns {string} Compiled prompt text
 */
export const createCoachPrompt = (metrics, weakTopics, goalRating, dailyTarget) => {
  const solved = metrics.solvedStats || { all: 0, easy: 0, medium: 0, hard: 0 };
  const contest = metrics.contestRanking || { rating: 1500, attendedContestsCount: 0 };

  const weakList = weakTopics && weakTopics.length > 0
    ? weakTopics.join(', ')
    : 'None explicitly identified';

  return `Generate a personalized AI Coach training and study roadmap based on these details:

Current User LeetCode Stats:
- Solved Counts: Easy: ${solved.easy}, Medium: ${solved.medium}, Hard: ${solved.hard}, Total: ${solved.all}
- Current Contest Rating: ${contest.rating} (Rating history length: ${metrics.contestHistory?.length || 0})

Focus Context:
- Identified Weak Topics: ${weakList}
- Goal Rating Target: ${goalRating} ELO points
- Daily Target: ${dailyTarget} solved problems

Generate a JSON object conforming to:
- "dailyPlan": Object containing:
  - "topic": String (primary topic focus, e.g. "Dynamic Programming")
  - "description": String (one-sentence overview of the target focus)
  - "targetQuestions": Number (daily questions count: e.g. ${dailyTarget})
  - "estTime": Number (estimated study length in minutes)
- "weeklyPlan": Array of 4 weeks, each week being an object with:
  - "week": Number (1 to 4)
  - "focusTopic": String (weekly topic focus)
  - "strategy": String (one-sentence technical study strategy for the week)
- "recommendedProblems": Array of exactly two problem recommendations matching their weakness:
  - "title": String (LeetCode problem title, e.g., "Word Break II")
  - "difficulty": String ("Easy", "Medium", "Hard")
  - "reason": String (one-sentence reasoning of why this helps them reach goal ${goalRating})
  - "complexity": String (target space/time complexity)
  - "subproblems": String (target subproblem mapping notation)
  - "prereq": String (required concepts)
  - "problemId": String (the official LeetCode problem ID/number, e.g., "139")
  - "leetcodeUrl": String (the official LeetCode problem URL, e.g., "https://leetcode.com/problems/word-break")
- "motivation": String (one developer-centric motivational call to action)
- "studyStrategy": String (one-sentence core software engineering study advice)`;
};

/**
 * Compiles context parameters into the system instructions for the AI Chat Coach.
 * 
 * @param {Object} user - User document containing profile details
 * @param {Object} weakness - Weakness analysis document
 * @param {Object} coach - AI Coach plan containing recommended problems
 * @returns {string} System prompt content
 */
export const createChatSystemPrompt = (user, weakness, coach) => {
  const solved = user.solvedStats || { all: 0, easy: 0, medium: 0, hard: 0 };
  const contest = user.contestRanking || { rating: 1500 };
  const recent = user.recentSubmissions || [];

  const weaknessList = weakness && weakness.weaknesses && weakness.weaknesses.length > 0
    ? weakness.weaknesses.map((w, idx) => `- ${w.weakness} (Severity: ${w.severity}/10): ${w.rootCause}`).join('\n')
    : 'None explicitly analyzed';

  const recommendations = coach && coach.recommendedProblems && coach.recommendedProblems.length > 0
    ? coach.recommendedProblems.map((p, idx) => `- [${p.difficulty}] ${p.title}\n  Prereq: ${p.prereq}\n  AI Reason: ${p.reason}`).join('\n')
    : 'None active';

  const recentList = recent.length > 0
    ? recent.map(sub => `- ${sub.title}`).join('\n')
    : 'None recorded recently';

  return `You are the GrowCode AI Coding Coach, a sophisticated, technical, developer-centric coach assisting the developer: ${user.username}.

Here is the developer's current LeetCode profile status:
- Solved Counts: Easy: ${solved.easy}, Medium: ${solved.medium}, Hard: ${solved.hard}, Total: ${solved.all}
- Current Contest Rating: ${contest.rating}

Here is the developer's Weakness Analysis:
${weaknessList}

Here are the active practice problem recommendations for them:
${recommendations}

Recent user submissions:
${recentList}

Guidelines for your dialogue:
1. Speak in a highly technical, constructive, software-engineer-centric tone. Avoid generic or overly simple hand-waving advice. Mention specific algorithmic concepts, runtime complexities (e.g. O(N log N)), data structure tradeoffs, and design patterns.
2. Provide hints, code structure diagrams, complexity analyses, or state transition strategy advice. Do NOT simply write the full working code solution unless the user explicitly requests it or it is absolutely necessary. Help them analyze the logic, find edge cases, and learn.
3. Keep answers concise, direct, actionable, and visually clear (use standard Markdown formatting).`;
};

