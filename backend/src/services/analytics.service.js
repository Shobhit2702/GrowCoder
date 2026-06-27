import aiService from './ai.service.js';
import { config } from '../config/config.js';
import { SYSTEM_PROMPT, createUserPrompt, createDashboardPrompt, createWeaknessPrompt, createCoachPrompt } from '../prompts/analytics.prompt.js';

export const PROBLEM_CATALOG = {
  "array": [
    { problemId: "1", title: "Two Sum", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/two-sum" },
    { problemId: "15", title: "3Sum", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/3sum" },
    { problemId: "11", title: "Container With Most Water", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/container-with-most-water" },
    { problemId: "41", title: "First Missing Positive", difficulty: "Hard", leetcodeUrl: "https://leetcode.com/problems/first-missing-positive" },
    { problemId: "56", title: "Merge Intervals", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/merge-intervals" },
    { problemId: "31", title: "Next Permutation", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/next-permutation" }
  ],
  "string": [
    { problemId: "3", title: "Longest Substring Without Repeating Characters", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/longest-substring-without-repeating-characters" },
    { problemId: "5", title: "Longest Palindromic Substring", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/longest-palindromic-substring" },
    { problemId: "76", title: "Minimum Window Substring", difficulty: "Hard", leetcodeUrl: "https://leetcode.com/problems/minimum-window-substring" },
    { problemId: "125", title: "Valid Palindrome", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/valid-palindrome" },
    { problemId: "49", title: "Group Anagrams", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/group-anagrams" }
  ],
  "hashtable": [
    { problemId: "1", title: "Two Sum", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/two-sum" },
    { problemId: "49", title: "Group Anagrams", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/group-anagrams" },
    { problemId: "128", title: "Longest Consecutive Sequence", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/longest-consecutive-sequence" },
    { problemId: "560", title: "Subarray Sum Equals K", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/subarray-sum-equals-k" }
  ],
  "math": [
    { problemId: "7", title: "Reverse Integer", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/reverse-integer" },
    { problemId: "9", title: "Palindrome Number", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/palindrome-number" },
    { problemId: "50", title: "Pow(x, n)", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/powx-n" },
    { problemId: "69", title: "Sqrt(x)", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/sqrtx" }
  ],
  "dynamicprogramming": [
    { problemId: "70", title: "Climbing Stairs", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/climbing-stairs" },
    { problemId: "322", title: "Coin Change", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/coin-change" },
    { problemId: "300", title: "Longest Increasing Subsequence", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/longest-increasing-subsequence" },
    { problemId: "72", title: "Edit Distance", difficulty: "Hard", leetcodeUrl: "https://leetcode.com/problems/edit-distance" },
    { problemId: "139", title: "Word Break", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/word-break" },
    { problemId: "198", title: "House Robber", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/house-robber" }
  ],
  "graph": [
    { problemId: "133", title: "Clone Graph", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/clone-graph" },
    { problemId: "207", title: "Course Schedule", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/course-schedule" },
    { problemId: "200", title: "Number of Islands", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/number-of-islands" },
    { problemId: "332", title: "Reconstruct Itinerary", difficulty: "Hard", leetcodeUrl: "https://leetcode.com/problems/reconstruct-itinerary" }
  ],
  "tree": [
    { problemId: "104", title: "Maximum Depth of Binary Tree", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/maximum-depth-of-binary-tree" },
    { problemId: "102", title: "Binary Tree Level Order Traversal", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/binary-tree-level-order-traversal" },
    { problemId: "236", title: "Lowest Common Ancestor of a Binary Tree", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree" },
    { problemId: "124", title: "Binary Tree Maximum Path Sum", difficulty: "Hard", leetcodeUrl: "https://leetcode.com/problems/binary-tree-maximum-path-sum" }
  ],
  "binarytree": [
    { problemId: "104", title: "Maximum Depth of Binary Tree", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/maximum-depth-of-binary-tree" },
    { problemId: "102", title: "Binary Tree Level Order Traversal", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/binary-tree-level-order-traversal" },
    { problemId: "236", title: "Lowest Common Ancestor of a Binary Tree", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree" },
    { problemId: "124", title: "Binary Tree Maximum Path Sum", difficulty: "Hard", leetcodeUrl: "https://leetcode.com/problems/binary-tree-maximum-path-sum" }
  ],
  "binarysearch": [
    { problemId: "704", title: "Binary Search", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/binary-search" },
    { problemId: "33", title: "Search in Rotated Sorted Array", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/search-in-rotated-sorted-array" },
    { problemId: "34", title: "Find First and Last Position of Element in Sorted Array", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array" },
    { problemId: "4", title: "Median of Two Sorted Arrays", difficulty: "Hard", leetcodeUrl: "https://leetcode.com/problems/median-of-two-sorted-arrays" }
  ],
  "depthfirstsearch": [
    { problemId: "200", title: "Number of Islands", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/number-of-islands" },
    { problemId: "133", title: "Clone Graph", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/clone-graph" },
    { problemId: "124", title: "Binary Tree Maximum Path Sum", difficulty: "Hard", leetcodeUrl: "https://leetcode.com/problems/binary-tree-maximum-path-sum" }
  ],
  "breadthfirstsearch": [
    { problemId: "200", title: "Number of Islands", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/number-of-islands" },
    { problemId: "102", title: "Binary Tree Level Order Traversal", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/binary-tree-level-order-traversal" },
    { problemId: "127", title: "Word Ladder", difficulty: "Hard", leetcodeUrl: "https://leetcode.com/problems/word-ladder" }
  ],
  "greedy": [
    { problemId: "55", title: "Jump Game", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/jump-game" },
    { problemId: "45", title: "Jump Game II", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/jump-game-ii" },
    { problemId: "134", title: "Gas Station", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/gas-station" },
    { problemId: "135", title: "Candy", difficulty: "Hard", leetcodeUrl: "https://leetcode.com/problems/candy" }
  ],
  "heap": [
    { problemId: "215", title: "Kth Largest Element in an Array", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/kth-largest-element-in-an-array" },
    { problemId: "23", title: "Merge k Sorted Lists", difficulty: "Hard", leetcodeUrl: "https://leetcode.com/problems/merge-k-sorted-lists" },
    { problemId: "295", title: "Find Median from Data Stream", difficulty: "Hard", leetcodeUrl: "https://leetcode.com/problems/find-median-from-data-stream" }
  ],
  "trie": [
    { problemId: "208", title: "Implement Trie (Prefix Tree)", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/implement-trie-prefix-tree" },
    { problemId: "212", title: "Word Search II", difficulty: "Hard", leetcodeUrl: "https://leetcode.com/problems/word-search-ii" },
    { problemId: "211", title: "Design Add and Search Words Data Structure", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/design-add-and-search-words-data-structure" }
  ],
  "backtracking": [
    { problemId: "78", title: "Subsets", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/subsets" },
    { problemId: "46", title: "Permutations", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/permutations" },
    { problemId: "39", title: "Combination Sum", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/combination-sum" },
    { problemId: "51", title: "N-Queens", difficulty: "Hard", leetcodeUrl: "https://leetcode.com/problems/n-queens" }
  ],
  "slidingwindow": [
    { problemId: "3", title: "Longest Substring Without Repeating Characters", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/longest-substring-without-repeating-characters" },
    { problemId: "76", title: "Minimum Window Substring", difficulty: "Hard", leetcodeUrl: "https://leetcode.com/problems/minimum-window-substring" },
    { problemId: "567", title: "Permutation in String", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/permutation-in-string" }
  ],
  "prefixsum": [
    { problemId: "560", title: "Subarray Sum Equals K", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/subarray-sum-equals-k" },
    { problemId: "303", title: "Range Sum Query - Immutable", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/range-sum-query-immutable" },
    { problemId: "238", title: "Product of Array Except Self", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/product-of-array-except-self" }
  ],
  "bitmanipulation": [
    { problemId: "136", title: "Single Number", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/single-number" },
    { problemId: "191", title: "Number of 1 Bits", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/number-of-1-bits" },
    { problemId: "338", title: "Counting Bits", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/counting-bits" }
  ],
  "linkedlist": [
    { problemId: "206", title: "Reverse Linked List", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/reverse-linked-list" },
    { problemId: "21", title: "Merge Two Sorted Lists", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/merge-two-sorted-lists" },
    { problemId: "141", title: "Linked List Cycle", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/linked-list-cycle" },
    { problemId: "19", title: "Remove Nth Node From End of List", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/remove-nth-node-from-end-of-list" }
  ],
  "queue": [
    { problemId: "232", title: "Implement Queue using Stacks", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/implement-queue-using-stacks" },
    { problemId: "622", title: "Design Circular Queue", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/design-circular-queue" }
  ],
  "stack": [
    { problemId: "20", title: "Valid Parentheses", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/valid-parentheses" },
    { problemId: "155", title: "Min Stack", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/min-stack" },
    { problemId: "150", title: "Evaluate Reverse Polish Notation", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/evaluate-reverse-polish-notation" }
  ],
  "twopointers": [
    { problemId: "167", title: "Two Sum II - Input Array Is Sorted", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted" },
    { problemId: "15", title: "3Sum", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/3sum" },
    { problemId: "11", title: "Container With Most Water", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/container-with-most-water" }
  ],
  "segmenttree": [
    { problemId: "307", title: "Range Sum Query - Mutable", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/range-sum-query-mutable" },
    { problemId: "1649", title: "Create Sorted Array through Instructions", difficulty: "Hard", leetcodeUrl: "https://leetcode.com/problems/create-sorted-array-through-instructions" }
  ],
  "unionfind": [
    { problemId: "1319", title: "Number of Operations to Make Network Connected", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/number-of-operations-to-make-network-connected" },
    { problemId: "684", title: "Redundant Connection", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/redundant-connection" }
  ],
  "shortestpath": [
    { problemId: "743", title: "Network Delay Time", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/network-delay-time" },
    { problemId: "787", title: "Cheapest Flights Within K Stops", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/cheapest-flights-within-k-stops" }
  ],
  "topologicalsort": [
    { problemId: "207", title: "Course Schedule", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/course-schedule" },
    { problemId: "210", title: "Course Schedule II", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/course-schedule-ii" }
  ],
  "matrix": [
    { problemId: "48", title: "Rotate Image", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/rotate-image" },
    { problemId: "54", title: "Spiral Matrix", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/spiral-matrix" }
  ],
  "simulation": [
    { problemId: "54", title: "Spiral Matrix", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/spiral-matrix" },
    { problemId: "412", title: "Fizz Buzz", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/fizz-buzz" }
  ],
  "geometry": [
    { problemId: "973", title: "K Closest Points to Origin", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/k-closest-points-to-origin" },
    { problemId: "223", title: "Rectangle Area", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/rectangle-area" }
  ],
  "design": [
    { problemId: "146", title: "LRU Cache", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/lru-cache" },
    { problemId: "355", title: "Design Twitter", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/design-twitter" }
  ]
};

export function getRecommendationsForTopic(topicName, count) {
  const normalized = topicName.toLowerCase().replace(/[^a-z0-9]/g, '');
  let matchedKey = Object.keys(PROBLEM_CATALOG).find(
    (k) => k.toLowerCase().replace(/[^a-z0-9]/g, '') === normalized
  );

  if (!matchedKey) {
    if (normalized === 'dfs') matchedKey = 'depthfirstsearch';
    if (normalized === 'bfs') matchedKey = 'breadthfirstsearch';
    if (normalized === 'dp') matchedKey = 'dynamicprogramming';
  }

  const list = PROBLEM_CATALOG[matchedKey] || [];
  const results = [];

  for (let i = 0; i < Math.min(count, list.length); i++) {
    results.push({
      problemId: list[i].problemId,
      title: list[i].title,
      difficulty: list[i].difficulty,
      topic: topicName,
      leetcodeUrl: list[i].leetcodeUrl,
      aiReason: `Targets optimization scenarios and boundary checks specifically for ${topicName}.`
    });
  }

  if (results.length < count) {
    const needed = count - results.length;
    const diffs = ['Easy', 'Medium', 'Hard'];
    for (let i = 0; i < needed; i++) {
      const id = 1000 + Math.floor(Math.random() * 8000);
      const diff = diffs[i % diffs.length];
      const title = `${topicName} Practice Problem ${i + 1}`;
      const slug = title.toLowerCase().replace(/\s+/g, '-');
      results.push({
        problemId: String(id),
        title,
        difficulty: diff,
        topic: topicName,
        leetcodeUrl: `https://leetcode.com/problems/${slug}`,
        aiReason: `Focuses on algorithmic progression and memory scale constraints for ${topicName}.`
      });
    }
  }

  return results;
}

export function calculateStreaks(submissionCalendarStr) {
  let totalActiveDays = 0;
  let currentStreak = 0;
  let longestStreak = 0;

  try {
    const calendar = JSON.parse(submissionCalendarStr || '{}');
    const activeDates = Object.keys(calendar).map((ts) => {
      const date = new Date(Number(ts) * 1000);
      const yyyy = date.getUTCFullYear();
      const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
      const dd = String(date.getUTCDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    });

    const uniqueDates = [...new Set(activeDates)].sort();
    totalActiveDays = uniqueDates.length;

    if (uniqueDates.length > 0) {
      const dateObjects = uniqueDates.map((d) => new Date(d));
      let tempStreak = 1;
      longestStreak = 1;

      for (let i = 1; i < dateObjects.length; i++) {
        const diffTime = dateObjects[i] - dateObjects[i - 1];
        const diffDays = diffTime / (1000 * 60 * 60 * 24);

        if (diffDays === 1) {
          tempStreak++;
        } else if (diffDays > 1) {
          if (tempStreak > longestStreak) {
            longestStreak = tempStreak;
          }
          tempStreak = 1;
        }
      }
      if (tempStreak > longestStreak) {
        longestStreak = tempStreak;
      }

      const today = new Date();
      const todayStr = `${today.getUTCFullYear()}-${String(today.getUTCMonth() + 1).padStart(2, '0')}-${String(today.getUTCDate()).padStart(2, '0')}`;

      const yesterday = new Date();
      yesterday.setUTCDate(yesterday.getUTCDate() - 1);
      const yesterdayStr = `${yesterday.getUTCFullYear()}-${String(yesterday.getUTCMonth() + 1).padStart(2, '0')}-${String(yesterday.getUTCDate()).padStart(2, '0')}`;

      const lastActiveDateStr = uniqueDates[uniqueDates.length - 1];

      if (lastActiveDateStr === todayStr || lastActiveDateStr === yesterdayStr) {
        let streak = 1;
        for (let i = uniqueDates.length - 1; i > 0; i--) {
          const d1 = new Date(uniqueDates[i]);
          const d2 = new Date(uniqueDates[i - 1]);
          const diffTime = d1 - d2;
          const diffDays = diffTime / (1000 * 60 * 60 * 24);
          if (diffDays === 1) {
            streak++;
          } else {
            break;
          }
        }
        currentStreak = streak;
      } else {
        currentStreak = 0;
      }
    }
  } catch (error) {
    console.error('Error calculating streaks:', error);
  }

  return { totalActiveDays, currentStreak, longestStreak };
}

// OpenAI Structured Output Schema: Topic Analysis
const analyticsResponseSchema = {
  name: 'user_analytics',
  schema: {
    type: 'object',
    properties: {
      eloProjection: { type: 'number', description: 'Predicted coding rating change (e.g. +100 to +200)' },
      strengths: {
        type: 'array',
        description: 'List of DSA topics with mastery level (percentage, 0-100)',
        items: {
          type: 'object',
          properties: {
            topic: { type: 'string', description: 'DSA topic name, e.g. Arrays, Trees, Dynamic Programming' },
            mastery: { type: 'number', description: 'Percentage mastered from 0 to 100' }
          },
          required: ['topic', 'mastery'],
          additionalProperties: false
        }
      },
      bottlenecks: {
        type: 'array',
        description: 'Key algorithmic weaknesses sorted by priority',
        items: {
          type: 'object',
          properties: {
            topic: { type: 'string', description: 'DSA weak topic' },
            priority: { type: 'number', description: 'Priority level (1 is highest)' },
            severity: { type: 'number', description: 'Severity score out of 10' },
            ratingPotential: { type: 'number', description: 'ELO points projection to gain if solved (e.g. 20 to 120)' }
          },
          required: ['topic', 'priority', 'severity', 'ratingPotential'],
          additionalProperties: false
        }
      },
      anomalies: {
        type: 'array',
        description: 'Detailed analysis of three root causes of coding issues',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Anomaly identifier (e.g., ANOMALY 01)' },
            title: { type: 'string', description: 'Descriptive title of the anomaly (e.g. STATE DEFINITION GAP)' },
            description: { type: 'string', description: 'Detailed root cause explanation in developer-oriented terms' },
            impact: { type: 'string', description: 'Specific negative impact statement (e.g., HIGH LATENCY IMPACT)' },
            impactLevel: { type: 'string', enum: ['high', 'moderate', 'low'] }
          },
          required: ['id', 'title', 'description', 'impact', 'impactLevel'],
          additionalProperties: false
        }
      },
      nextAction: {
        type: 'object',
        description: 'Recommended immediate next action',
        properties: {
          topic: { type: 'string', description: 'Target topic' },
          eloGain: { type: 'number', description: 'Estimated ELO gain' },
          drillTitle: { type: 'string', description: 'Name of the topic drill' }
        },
        required: ['topic', 'eloGain', 'drillTitle'],
        additionalProperties: false
      },
      dailyPlan: {
        type: 'object',
        description: 'Dynamic personal training session focus',
        properties: {
          topic: { type: 'string', description: 'Session topic, e.g. Dynamic Programming' },
          description: { type: 'string', description: 'One-sentence motivational overview of the session task' },
          targetQuestions: { type: 'number', description: 'Number of target problems to solve (e.g. 3-6)' },
          estTime: { type: 'number', description: 'Estimated session length in minutes (e.g. 45-120)' }
        },
        required: ['topic', 'description', 'targetQuestions', 'estTime'],
        additionalProperties: false
      },
      checklist: {
        type: 'array',
        description: 'Dynamic daily tasks list',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Task ID' },
            text: { type: 'string', description: 'Task description' },
            checked: { type: 'boolean', description: 'Completion status (default false)' }
          },
          required: ['id', 'text', 'checked'],
          additionalProperties: false
        }
      },
      recommendations: {
        type: 'array',
        description: 'Two target practice problems recommendations',
        items: {
          type: 'object',
          properties: {
            title: { type: 'string', description: 'LeetCode problem title (e.g. Word Break II)' },
            difficulty: { type: 'string', enum: ['Easy', 'Medium', 'Hard'] },
            reason: { type: 'string', description: 'Explicit AI context rationale explaining why this problem was selected for this user' },
            complexity: { type: 'string', description: 'Time complexity target explanation (e.g., O(N^2))' },
            subproblems: { type: 'string', description: 'Target subproblem definition (e.g., Prefixes s[0...i])' },
            prereq: { type: 'string', description: 'Prerequisite concepts needed' }
          },
          required: ['title', 'difficulty', 'reason', 'complexity', 'subproblems', 'prereq'],
          additionalProperties: false
        }
      }
    },
    required: [
      'eloProjection',
      'strengths',
      'bottlenecks',
      'anomalies',
      'nextAction',
      'dailyPlan',
      'checklist',
      'recommendations'
    ],
    additionalProperties: false
  },
  strict: true
};

// OpenAI Structured Output Schema: Dashboard Summary Insights
const dashboardInsightResponseSchema = {
  name: 'dashboard_insight',
  schema: {
    type: 'object',
    properties: {
      codingDNA: { type: 'string', description: 'Technical coding title/persona (e.g., Recursion Tactician)' },
      strength: { type: 'string', description: 'Core technical coding strength identified' },
      weakness: { type: 'string', description: 'Core technical coding weakness identified' },
      summary: { type: 'string', description: 'Brief diagnostic summary of their current progress' },
      motivationalInsight: { type: 'string', description: 'Developer-grade motivational advice or recommendation' }
    },
    required: ['codingDNA', 'strength', 'weakness', 'summary', 'motivationalInsight'],
    additionalProperties: false
  },
  strict: true
};

// OpenAI Structured Output Schema: Weakness Engine
const weaknessAnalysisResponseSchema = {
  name: 'weakness_analysis',
  schema: {
    type: 'object',
    properties: {
      weaknesses: {
        type: 'array',
        description: 'Exactly three core user algorithmic weaknesses sorted by priority/severity.',
        items: {
          type: 'object',
          properties: {
            weakness: { type: 'string', description: 'Algorithmic topic name (e.g. Dynamic Programming, Trees)' },
            severity: { type: 'number', description: 'Severity score between 0 and 10' },
            rootCause: { type: 'string', description: 'Technical root cause explanation' },
            improvementAdvice: { type: 'string', description: 'Step-by-step improvement plan or strategy' },
            ratingImpact: { type: 'number', description: 'ELO rating potential to gain' }
          },
          required: ['weakness', 'severity', 'rootCause', 'improvementAdvice', 'ratingImpact'],
          additionalProperties: false
        }
      }
    },
    required: ['weaknesses'],
    additionalProperties: false
  },
  strict: true
};

// OpenAI Structured Output Schema: AI Coach Engine
const coachPlanResponseSchema = {
  name: 'coach_plan',
  schema: {
    type: 'object',
    properties: {
      dailyPlan: {
        type: 'object',
        properties: {
          topic: { type: 'string', description: 'Primary study focus topic' },
          description: { type: 'string', description: 'Brief session task overview' },
          targetQuestions: { type: 'number', description: 'Target problems to solve count' },
          estTime: { type: 'number', description: 'Estimated session length in minutes' }
        },
        required: ['topic', 'description', 'targetQuestions', 'estTime'],
        additionalProperties: false
      },
      weeklyPlan: {
        type: 'array',
        description: 'Roadmap covering four weeks.',
        items: {
          type: 'object',
          properties: {
            week: { type: 'number', description: 'Week index (1 to 4)' },
            focusTopic: { type: 'string', description: 'Algorithmic focus topic' },
            strategy: { type: 'string', description: 'Key strategic study advice' }
          },
          required: ['week', 'focusTopic', 'strategy'],
          additionalProperties: false
        }
      },
      recommendedProblems: {
        type: 'array',
        description: 'Exactly two target LeetCode practice problems.',
        items: {
          type: 'object',
          properties: {
            title: { type: 'string', description: 'LeetCode problem title' },
            difficulty: { type: 'string', enum: ['Easy', 'Medium', 'Hard'] },
            reason: { type: 'string', description: 'AI reason context explaining why this was selected' },
            complexity: { type: 'string', description: 'Target complexity runtime constraints' },
            subproblems: { type: 'string', description: 'Target subproblem mapping logic' },
            prereq: { type: 'string', description: 'Prerequisites' }
          },
          required: ['title', 'difficulty', 'reason', 'complexity', 'subproblems', 'prereq'],
          additionalProperties: false
        }
      },
      motivation: { type: 'string', description: 'Encouraging motivational advice statement' },
      studyStrategy: { type: 'string', description: 'Key software engineering study strategy' }
    },
    required: ['dailyPlan', 'weeklyPlan', 'recommendedProblems', 'motivation', 'studyStrategy'],
    additionalProperties: false
  },
  strict: true
};

class AnalyticsService {
  calculateStreaks(str) {
    return calculateStreaks(str);
  }
  async generateDrillAnalytics(user, topic, dailyTarget = 4) {
    const topicRecommendations = getRecommendationsForTopic(topic, dailyTarget);
    const recommendations = topicRecommendations.map((r, idx) => ({
      title: r.title,
      difficulty: r.difficulty,
      reason: r.aiReason || `Targets your coding DNA gaps in ${topic} implementations.`,
      complexity: r.difficulty === 'Easy' ? 'O(N) time and O(1) space' : r.difficulty === 'Medium' ? 'O(N) time and O(N) space' : 'O(N log N) time and O(N) space',
      subproblems: `Identify constraints at step index ${idx + 1}`,
      prereq: `${topic} fundamentals`,
      leetcodeUrl: r.leetcodeUrl,
      problemId: r.problemId
    }));
    const checklist = recommendations.map((rec, idx) => ({
      id: idx + 1,
      text: `Solve LeetCode #${rec.problemId}: ${rec.title} (${rec.difficulty})`,
      checked: false,
      leetcodeUrl: rec.leetcodeUrl
    }));
    const dailyPlan = {
      topic: topic,
      description: `Specialized drill session. Practice and master ${topic} recommended tasks.`,
      targetQuestions: dailyTarget,
      estTime: dailyTarget * 20 + 15
    };
    return {
      recommendations,
      checklist,
      dailyPlan
    };
  }
  /**
   * Generates AI analytics for a user based on their LeetCode statistics.
   * If OpenAI integration is missing/unconfigured, falls back gracefully to a heuristic generator.
   * 
   * @param {Object} userMetrics - Sync data returned by LeetCodeService
   * @returns {Promise<Object>} Formatted AI insights object matching schema
   */
  async generateUserAnalytics(userMetrics, dailyTarget = 4) {
    const hasKey = config.openai.apiKey && config.openai.apiKey !== 'PLACEHOLDER_KEY' && config.openai.apiKey.trim() !== '';

    if (hasKey) {
      try {
        console.log(`🤖 Requesting OpenAI analysis for LeetCode profile: ${userMetrics.username}...`);
        const systemPrompt = SYSTEM_PROMPT;
        let userPrompt = createUserPrompt(userMetrics);
        userPrompt += `\n\nIMPORTANT: You must generate EXACTLY ${dailyTarget} recommended problems in the 'recommendations' array, and exactly ${dailyTarget} tasks in the 'checklist' array matching these recommended problems.`;

        const dynamicSchema = JSON.parse(JSON.stringify(analyticsResponseSchema));
        dynamicSchema.schema.properties.recommendations.description = `Exactly ${dailyTarget} target practice problems recommendations.`;
        dynamicSchema.schema.properties.checklist.description = `Exactly ${dailyTarget} daily tasks representing the recommended problems.`;

        const aiOutput = await aiService.generateStructuredJSON(
          systemPrompt,
          userPrompt,
          dynamicSchema
        );

        console.log('✅ OpenAI analysis completed successfully.');
        return aiOutput;
      } catch (error) {
        console.warn('⚠️ OpenAI API call failed. Falling back to offline heuristics generator.', error.message);
        // Fall through to offline heuristic builder
      }
    } else {
      console.log('ℹ️ OpenAI API key not configured. Using offline heuristics generator.');
    }

    // Offline dynamic builder using the user's actual profile statistics
    return this.generateHeuristicAnalytics(userMetrics, dailyTarget);
  }

  /**
   * Generates dashboard summary AI insights.
   * If OpenAI is missing, falls back to a heuristic builder.
   * 
   * @param {Object} userMetrics - Sync data returned by LeetCodeService
   * @param {Array} topicData - Calculated topic distribution
   * @returns {Promise<Object>} Object matching the dashboard insight schema
   */
  async generateDashboardInsight(userMetrics, topicData) {
    const hasKey = config.openai.apiKey && config.openai.apiKey !== 'PLACEHOLDER_KEY' && config.openai.apiKey.trim() !== '';

    if (hasKey) {
      try {
        console.log(`🤖 Requesting OpenAI dashboard summary for: ${userMetrics.username}...`);
        const systemPrompt = SYSTEM_PROMPT;
        const userPrompt = createDashboardPrompt(userMetrics, topicData);

        const aiOutput = await aiService.generateStructuredJSON(
          systemPrompt,
          userPrompt,
          dashboardInsightResponseSchema
        );

        console.log('✅ OpenAI dashboard summary completed successfully.');
        return aiOutput;
      } catch (error) {
        console.warn('⚠️ OpenAI API dashboard call failed. Falling back to offline heuristics.', error.message);
        // Fall through to heuristic
      }
    }

    return this.generateHeuristicDashboardInsight(userMetrics, topicData);
  }

  /**
   * Generates detailed technical weakness analyses.
   * If OpenAI is missing, falls back to a heuristic builder.
   * 
   * @param {Object} userMetrics - Sync data returned by LeetCodeService
   * @returns {Promise<Object>} Object matching the weakness analysis schema
   */
  async generateWeaknessAnalysis(userMetrics) {
    const hasKey = config.openai.apiKey && config.openai.apiKey !== 'PLACEHOLDER_KEY' && config.openai.apiKey.trim() !== '';

    if (hasKey) {
      try {
        console.log(`🤖 Requesting OpenAI detailed weakness analysis for: ${userMetrics.username}...`);
        const systemPrompt = SYSTEM_PROMPT;
        const userPrompt = createWeaknessPrompt(userMetrics);

        const aiOutput = await aiService.generateStructuredJSON(
          systemPrompt,
          userPrompt,
          weaknessAnalysisResponseSchema
        );

        console.log('✅ OpenAI weakness analysis completed successfully.');
        return aiOutput;
      } catch (error) {
        console.warn('⚠️ OpenAI API weakness analysis call failed. Falling back to offline heuristics.', error.message);
        // Fall through to heuristic
      }
    }

    return this.generateHeuristicWeaknessAnalysis(userMetrics);
  }

  /**
   * Generates AI Coach recommendation plans.
   * If OpenAI is missing, falls back to a heuristic builder.
   * 
   * @param {Object} userMetrics - Sync data returned by LeetCodeService
   * @param {Array} weakTopics - User's identified weakness areas
   * @param {Number} goalRating - Target ELO rating
   * @param {Number} dailyTarget - Target problems count
   * @returns {Promise<Object>} Object matching the AI Coach schema
   */
  async generateCoachPlan(userMetrics, weakTopics, goalRating, dailyTarget) {
    const hasKey = config.openai.apiKey && config.openai.apiKey !== 'PLACEHOLDER_KEY' && config.openai.apiKey.trim() !== '';

    if (hasKey) {
      try {
        console.log(`🤖 Requesting OpenAI AI Coach plan for: ${userMetrics.username}...`);
        const systemPrompt = SYSTEM_PROMPT;
        const userPrompt = createCoachPrompt(userMetrics, weakTopics, goalRating, dailyTarget);

        const aiOutput = await aiService.generateStructuredJSON(
          systemPrompt,
          userPrompt,
          coachPlanResponseSchema
        );

        console.log('✅ OpenAI AI Coach plan completed successfully.');
        return aiOutput;
      } catch (error) {
        console.warn('⚠️ OpenAI API AI Coach plan call failed. Falling back to offline heuristics.', error.message);
        // Fall through to heuristic
      }
    }

    return this.generateHeuristicCoachPlan(userMetrics, weakTopics, goalRating, dailyTarget);
  }

  /**
   * Generates dynamic offline dashboard summary insights based on profile metrics.
   */
  generateHeuristicDashboardInsight(metrics, topicData) {
    const solved = metrics.solvedStats || { all: 0, easy: 0, medium: 0, hard: 0 };
    const rating = metrics.contestRanking?.rating || 1500;
    
    const easyCount = solved.easy || 0;
    const mediumCount = solved.medium || 0;
    const hardCount = solved.hard || 0;
    const totalCount = solved.all || 0;

    let codingDNA = 'Recursion Tactician';
    let strength = 'Solid foundational knowledge in core linear data structures and dynamic array manipulations.';
    let weakness = 'Struggles to transition top-down equations to bottom-up dynamic programming tabulation.';
    let summary = 'Your analytical profile shows steady progress through easy and medium difficulty tiers. Directing practice towards multi-dimensional memoization is key to breaking ELO barriers.';
    let motivationalInsight = 'Focus on Dynamic Programming optimizations today to unlock up to +85 ELO points in upcoming contests!';

    if (totalCount < 30 || (mediumCount + hardCount) < 10) {
      codingDNA = 'Foundational Syntactician';
      strength = 'Strong initial momentum in easy-tier algorithmic validations and basic condition evaluations.';
      weakness = 'Difficulty formulating recursive base cases and handling boundary bounds in search algorithms.';
      summary = 'Your profile is establishing core problem-solving structures. Solidifying recursive frameworks and search bounds will yield the highest performance gains.';
      motivationalInsight = 'Solve basic search and recursion problems today to unlock up to +110 ELO points in upcoming drills!';
    } else if (hardCount >= 15 || rating > 1800) {
      codingDNA = 'System Optimization Specialist';
      strength = 'Excellent depth in advanced optimization scenarios and complex directed acyclic tree structures.';
      weakness = 'Suboptimal queries in segment ranges and capacity update inefficiencies in network flows.';
      summary = 'You demonstrate elite engineering problem-solving capabilities. Resolving range partition queries and lazy propagation overhead will push you into top-tier cohorts.';
      motivationalInsight = 'Work on segment tree lazy propagation tasks today to capture +90 ELO points in contest ratings!';
    }

    return {
      codingDNA,
      strength,
      weakness,
      summary,
      motivationalInsight
    };
  }

  /**
   * Generates dynamic offline weakness analysis based on profile metrics.
   */
  generateHeuristicWeaknessAnalysis(metrics) {
    // Generate the heuristic user analytics first to align results
    const baseAnalytics = this.generateHeuristicAnalytics(metrics);
    
    // Construct the weaknesses array
    const weaknesses = baseAnalytics.bottlenecks.map((bot, idx) => {
      const anomaly = baseAnalytics.anomalies[idx] || { description: 'Underlying conceptual weakness in algorithmic updates.' };
      
      let advice = `Implement and review fundamental constraints for ${bot.topic}.`;
      if (idx === 0) {
        advice = baseAnalytics.dailyPlan.description;
      } else if (idx === 1) {
        advice = `Focus on backtracking options. Review standard validation steps and recursion paths for ${bot.topic}.`;
      } else {
        advice = `Analyze time and space complexity trade-offs for ${bot.topic} models.`;
      }

      return {
        weakness: bot.topic,
        severity: bot.severity,
        rootCause: anomaly.description,
        improvementAdvice: advice,
        ratingImpact: bot.ratingPotential
      };
    });

    return {
      weaknesses
    };
  }

  /**
   * Generates dynamic offline AI Coach plans based on metrics.
   */
  generateHeuristicCoachPlan(metrics, weakTopics, goalRating, dailyTarget) {
    const baseAnalytics = this.generateHeuristicAnalytics(metrics, dailyTarget);
    const mainTopic = weakTopics?.[0] || baseAnalytics.bottlenecks[0]?.topic || 'Algorithms';

    const weeklyPlan = [
      { week: 1, focusTopic: mainTopic, strategy: `Master core dynamic state definitions and transition formulas for ${mainTopic}.` },
      { week: 2, focusTopic: weakTopics?.[1] || baseAnalytics.bottlenecks[1]?.topic || 'Recursion', strategy: 'Solve medium-difficulty problems focusing on edge cases and constraints.' },
      { week: 3, focusTopic: weakTopics?.[2] || baseAnalytics.bottlenecks[2]?.topic || 'Search', strategy: 'Practice coordinate mappings and recursive recursion stacks.' },
      { week: 4, focusTopic: 'System Scale & Review', strategy: 'Conduct mock interviews and review dynamic memory representations.' }
    ];

    const recommendedProblems = baseAnalytics.recommendations;

    return {
      dailyPlan: {
        topic: mainTopic,
        description: baseAnalytics.dailyPlan.description,
        targetQuestions: dailyTarget || baseAnalytics.dailyPlan.targetQuestions,
        estTime: baseAnalytics.dailyPlan.estTime
      },
      weeklyPlan,
      recommendedProblems,
      motivation: `Unlocking your coding potential requires consistent daily focus. You have the raw analytical logic to easily achieve your target rating of ${goalRating}!`,
      studyStrategy: `Translate recurrence relations to memoization maps first. Prioritize O(N) space optimizations on ${mainTopic} tasks.`
    };
  }

  /**
   * Generates high-quality dynamic diagnostic metrics in offline environments
   * based on solvedStats counts and contest ranking.
   */
  generateHeuristicAnalytics(metrics, dailyTarget = 4) {
    const solved = metrics.solvedStats || { all: 0, easy: 0, medium: 0, hard: 0 };
    const rating = metrics.contestRanking?.rating || 1500;
    
    // 1. Calculate realistic dynamic strengths
    const easyCount = solved.easy || 0;
    const mediumCount = solved.medium || 0;
    const hardCount = solved.hard || 0;
    const totalCount = solved.all || 0;

    const arraysMastery = Math.min(98, 60 + Math.floor(easyCount / 3));
    const treesMastery = Math.min(95, 45 + Math.floor(mediumCount / 2));
    const linkedListsMastery = Math.min(92, 50 + Math.floor(easyCount / 4));
    const hashingMastery = Math.min(90, 40 + Math.floor(mediumCount / 3.5));
    const stringsMastery = Math.min(94, 55 + Math.floor(easyCount / 5));

    const strengths = [
      { topic: 'Arrays', mastery: arraysMastery },
      { topic: 'Strings', mastery: stringsMastery },
      { topic: 'Trees', mastery: treesMastery },
      { topic: 'Linked Lists', mastery: linkedListsMastery },
      { topic: 'Hashing', mastery: hashingMastery }
    ];

    // Sort strengths by mastery level desc
    strengths.sort((a, b) => b.mastery - a.mastery);

    // 2. Select bottlenecks based on user competence level
    let level = 'intermediate'; // default
    if (totalCount < 30 || (mediumCount + hardCount) < 10) {
      level = 'beginner';
    } else if (hardCount >= 15 || rating > 1800) {
      level = 'advanced';
    }

    let bottlenecks = [];
    let anomalies = [];
    let dailyPlan = {};
    let recommendations = [];
    let nextAction = {};

    if (level === 'beginner') {
      bottlenecks = [
        { topic: 'Recursion & Backtracking', priority: 1, severity: 8.8, ratingPotential: 110 },
        { topic: 'Binary Search Bounds', priority: 2, severity: 7.5, ratingPotential: 75 },
        { topic: 'HashMap Implementations', priority: 3, severity: 6.2, ratingPotential: 40 }
      ];

      anomalies = [
        {
          id: 'ANOMALY 01',
          title: 'BASE CASE OMISSION',
          description: 'Missing terminating conditions in depth-first recursions, causing stack overflows on deep test branches.',
          impact: 'STACK OVERFLOW RISK',
          impactLevel: 'high'
        },
        {
          id: 'ANOMALY 02',
          title: 'SEARCH SPACE BIAS',
          description: 'Incorrect boundary adjustments in binary search loops, leading to infinite loops or out-of-bounds index errors.',
          impact: 'INFINITE LOOP RISK',
          impactLevel: 'moderate'
        },
        {
          id: 'ANOMALY 03',
          title: 'KEY COLLISION DELAY',
          description: 'Underestimating hash dispersion constraints, causing linear bucket collisions and slow lookups in nested iterations.',
          impact: 'PERFORMANCE DEGRADATION',
          impactLevel: 'low'
        }
      ];

      nextAction = {
        topic: 'Recursion & Backtracking',
        eloGain: 110,
        drillTitle: 'Recursion Drill'
      };
    } else if (level === 'advanced') {
      bottlenecks = [
        { topic: 'Segment Trees & BIT', priority: 1, severity: 7.8, ratingPotential: 90 },
        { topic: 'Advanced Graph Flow', priority: 2, severity: 6.5, ratingPotential: 55 },
        { topic: 'Math & Number Theory', priority: 3, severity: 5.2, ratingPotential: 35 }
      ];

      anomalies = [
        {
          id: 'ANOMALY 01',
          title: 'QUERY RANGE OVERHEAD',
          description: 'Suboptimal segment tree range queries resulting in O(N) worst-case updates instead of O(log N) lazy propagation.',
          impact: 'CRITICAL TIMEOUT ERROR',
          impactLevel: 'high'
        },
        {
          id: 'ANOMALY 02',
          title: 'FLOW RESIDUAL OVERLOOK',
          description: 'Incorrect backward edge capacity subtraction during Edmonds-Karp implementations, causing infinite loops on directed cycles.',
          impact: 'INFINITE PATH COST',
          impactLevel: 'moderate'
        },
        {
          id: 'ANOMALY 03',
          title: 'INTEGER OVERFLOW IN MODULO',
          description: 'Applying division before modulo in combinatorics logic, creating incorrect values under high numerical bounds.',
          impact: 'VALUE CORRUPTION ERR',
          impactLevel: 'low'
        }
      ];

      nextAction = {
        topic: 'Segment Trees & BIT',
        eloGain: 90,
        drillTitle: 'Segment Tree Drill'
      };
    } else {
      // Intermediate level (DP and Backtracking weaknesses)
      bottlenecks = [
        { topic: 'Dynamic Programming', priority: 1, severity: 9.2, ratingPotential: 85 },
        { topic: 'Backtracking', priority: 2, severity: 6.5, ratingPotential: 48 },
        { topic: 'Graphs (DFS/BFS)', priority: 3, severity: 5.4, ratingPotential: 32 }
      ];

      anomalies = [
        {
          id: 'ANOMALY 01',
          title: 'STATE DEFINITION GAP',
          description: 'Recurrent failure to identify minimal sufficient parameters for state memoization, leading to redundant calculations in 42% of test cases.',
          impact: 'HIGH LATENCY IMPACT',
          impactLevel: 'high'
        },
        {
          id: 'ANOMALY 02',
          title: 'PRUNING INEFFICIENCY',
          description: 'Inefficient bounding functions in optimization problems resulting in excessive branch exploration during depth-first traversals.',
          impact: 'MODERATE COMPLEXITY',
          impactLevel: 'moderate'
        },
        {
          id: 'ANOMALY 03',
          title: 'SUBPROBLEM OVERLAP',
          description: 'Misidentification of optimal substructure properties in non-linear sequence problems. Tendency to over-complicate recurrence relations.',
          impact: 'KNOWLEDGE GAP DETECTED',
          impactLevel: 'low'
        }
      ];

      nextAction = {
        topic: 'DP Optimization',
        eloGain: 85,
        drillTitle: 'Dynamic Programming'
      };
    }

    const mainTopic = bottlenecks[0]?.topic || 'Dynamic Programming';

    dailyPlan = {
      topic: mainTopic,
      description: `Practice and optimize solutions for ${mainTopic} tasks to address your key priority bottlenecks.`,
      targetQuestions: dailyTarget,
      estTime: dailyTarget * 20 + 15
    };

    const topicRecommendations = getRecommendationsForTopic(mainTopic, dailyTarget);
    recommendations = topicRecommendations.map((r, idx) => ({
      title: r.title,
      difficulty: r.difficulty,
      reason: r.aiReason || `Targets your coding DNA gaps in ${mainTopic} implementations.`,
      complexity: r.difficulty === 'Easy' ? 'O(N) time and O(1) space' : r.difficulty === 'Medium' ? 'O(N) time and O(N) space' : 'O(N log N) time and O(N) space',
      subproblems: `Identify recurrence state constraints at step ${idx + 1}`,
      prereq: `${mainTopic} fundamentals`,
      leetcodeUrl: r.leetcodeUrl,
      problemId: r.problemId
    }));

    const checklist = recommendations.map((rec, idx) => ({
      id: idx + 1,
      text: `Solve LeetCode #${rec.problemId}: ${rec.title} (${rec.difficulty})`,
      checked: false,
      leetcodeUrl: rec.leetcodeUrl
    }));

    // Compute total ELO projection (sum of rating potentials)
    const eloProjection = bottlenecks.reduce((acc, curr) => acc + curr.ratingPotential, 0);

    return {
      eloProjection,
      strengths,
      bottlenecks,
      anomalies,
      nextAction,
      dailyPlan,
      checklist,
      recommendations
    };
  }
}

export default new AnalyticsService();
