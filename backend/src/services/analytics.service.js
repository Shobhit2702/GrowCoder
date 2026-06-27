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
    { problemId: "31", title: "Next Permutation", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/next-permutation" },
    { problemId: "26", title: "Remove Duplicates from Sorted Array", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/remove-duplicates-from-sorted-array" },
    { problemId: "189", title: "Rotate Array", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/rotate-array" },
    { problemId: "53", title: "Maximum Subarray", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/maximum-subarray" },
    { problemId: "84", title: "Largest Rectangle in Histogram", difficulty: "Hard", leetcodeUrl: "https://leetcode.com/problems/largest-rectangle-in-histogram" }
  ],
  "string": [
    { problemId: "3", title: "Longest Substring Without Repeating Characters", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/longest-substring-without-repeating-characters" },
    { problemId: "5", title: "Longest Palindromic Substring", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/longest-palindromic-substring" },
    { problemId: "76", title: "Minimum Window Substring", difficulty: "Hard", leetcodeUrl: "https://leetcode.com/problems/minimum-window-substring" },
    { problemId: "125", title: "Valid Palindrome", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/valid-palindrome" },
    { problemId: "49", title: "Group Anagrams", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/group-anagrams" },
    { problemId: "20", title: "Valid Parentheses", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/valid-parentheses" },
    { problemId: "14", title: "Longest Common Prefix", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/longest-common-prefix" },
    { problemId: "28", title: "Find the Index of the First Occurrence in a String", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string" },
    { problemId: "387", title: "First Unique Character in a String", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/first-unique-character-in-a-string" },
    { problemId: "151", title: "Reverse Words in a String", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/reverse-words-in-a-string" }
  ],
  "hashtable": [
    { problemId: "1", title: "Two Sum", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/two-sum" },
    { problemId: "49", title: "Group Anagrams", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/group-anagrams" },
    { problemId: "128", title: "Longest Consecutive Sequence", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/longest-consecutive-sequence" },
    { problemId: "560", title: "Subarray Sum Equals K", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/subarray-sum-equals-k" },
    { problemId: "387", title: "First Unique Character in a String", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/first-unique-character-in-a-string" },
    { problemId: "217", title: "Contains Duplicate", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/contains-duplicate" },
    { problemId: "347", title: "Top K Frequent Elements", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/top-k-frequent-elements" },
    { problemId: "380", title: "Insert Delete GetRandom O(1)", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/insert-delete-getrandom-o1" }
  ],
  "math": [
    { problemId: "7", title: "Reverse Integer", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/reverse-integer" },
    { problemId: "9", title: "Palindrome Number", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/palindrome-number" },
    { problemId: "50", title: "Pow(x, n)", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/powx-n" },
    { problemId: "69", title: "Sqrt(x)", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/sqrtx" },
    { problemId: "204", title: "Count Primes", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/count-primes" },
    { problemId: "43", title: "Multiply Strings", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/multiply-strings" },
    { problemId: "233", title: "Number of Digit One", difficulty: "Hard", leetcodeUrl: "https://leetcode.com/problems/number-of-digit-one" }
  ],
  "dynamicprogramming": [
    { problemId: "70", title: "Climbing Stairs", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/climbing-stairs" },
    { problemId: "322", title: "Coin Change", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/coin-change" },
    { problemId: "300", title: "Longest Increasing Subsequence", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/longest-increasing-subsequence" },
    { problemId: "72", title: "Edit Distance", difficulty: "Hard", leetcodeUrl: "https://leetcode.com/problems/edit-distance" },
    { problemId: "139", title: "Word Break", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/word-break" },
    { problemId: "198", title: "House Robber", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/house-robber" },
    { problemId: "1143", title: "Longest Common Subsequence", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/longest-common-subsequence" },
    { problemId: "518", title: "Coin Change II", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/coin-change-ii" },
    { problemId: "10", title: "Regular Expression Matching", difficulty: "Hard", leetcodeUrl: "https://leetcode.com/problems/regular-expression-matching" },
    { problemId: "416", title: "Partition Equal Subset Sum", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/partition-equal-subset-sum" }
  ],
  "graph": [
    { problemId: "133", title: "Clone Graph", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/clone-graph" },
    { problemId: "207", title: "Course Schedule", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/course-schedule" },
    { problemId: "200", title: "Number of Islands", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/number-of-islands" },
    { problemId: "332", title: "Reconstruct Itinerary", difficulty: "Hard", leetcodeUrl: "https://leetcode.com/problems/reconstruct-itinerary" },
    { problemId: "787", title: "Cheapest Flights Within K Stops", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/cheapest-flights-within-k-stops" },
    { problemId: "399", title: "Evaluate Division", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/evaluate-division" },
    { problemId: "802", title: "Find Eventual Safe States", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/find-eventual-safe-states" },
    { problemId: "269", title: "Alien Dictionary", difficulty: "Hard", leetcodeUrl: "https://leetcode.com/problems/alien-dictionary" }
  ],
  "tree": [
    { problemId: "104", title: "Maximum Depth of Binary Tree", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/maximum-depth-of-binary-tree" },
    { problemId: "102", title: "Binary Tree Level Order Traversal", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/binary-tree-level-order-traversal" },
    { problemId: "236", title: "Lowest Common Ancestor of a Binary Tree", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree" },
    { problemId: "124", title: "Binary Tree Maximum Path Sum", difficulty: "Hard", leetcodeUrl: "https://leetcode.com/problems/binary-tree-maximum-path-sum" },
    { problemId: "98", title: "Validate Binary Search Tree", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/validate-binary-search-tree" },
    { problemId: "105", title: "Construct Binary Tree from Preorder and Inorder Traversal", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal" },
    { problemId: "108", title: "Convert Sorted Array to Binary Search Tree", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree" },
    { problemId: "230", title: "Kth Smallest Element in a BST", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/kth-smallest-element-in-a-bst" }
  ],
  "binarytree": [
    { problemId: "104", title: "Maximum Depth of Binary Tree", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/maximum-depth-of-binary-tree" },
    { problemId: "102", title: "Binary Tree Level Order Traversal", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/binary-tree-level-order-traversal" },
    { problemId: "236", title: "Lowest Common Ancestor of a Binary Tree", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree" },
    { problemId: "124", title: "Binary Tree Maximum Path Sum", difficulty: "Hard", leetcodeUrl: "https://leetcode.com/problems/binary-tree-maximum-path-sum" },
    { problemId: "226", title: "Invert Binary Tree", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/invert-binary-tree" },
    { problemId: "101", title: "Symmetric Tree", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/symmetric-tree" },
    { problemId: "110", title: "Balanced Binary Tree", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/balanced-binary-tree" },
    { problemId: "543", title: "Diameter of Binary Tree", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/diameter-of-binary-tree" }
  ],
  "binarysearch": [
    { problemId: "704", title: "Binary Search", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/binary-search" },
    { problemId: "33", title: "Search in Rotated Sorted Array", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/search-in-rotated-sorted-array" },
    { problemId: "34", title: "Find First and Last Position of Element in Sorted Array", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array" },
    { problemId: "4", title: "Median of Two Sorted Arrays", difficulty: "Hard", leetcodeUrl: "https://leetcode.com/problems/median-of-two-sorted-arrays" },
    { problemId: "74", title: "Search a 2D Matrix", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/search-a-2d-matrix" },
    { problemId: "153", title: "Find Minimum in Rotated Sorted Array", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array" },
    { problemId: "162", title: "Find Peak Element", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/find-peak-element" },
    { problemId: "875", title: "Koko Eating Bananas", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/koko-eating-bananas" }
  ],
  "depthfirstsearch": [
    { problemId: "200", title: "Number of Islands", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/number-of-islands" },
    { problemId: "133", title: "Clone Graph", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/clone-graph" },
    { problemId: "124", title: "Binary Tree Maximum Path Sum", difficulty: "Hard", leetcodeUrl: "https://leetcode.com/problems/binary-tree-maximum-path-sum" },
    { problemId: "695", title: "Max Area of Island", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/max-area-of-island" },
    { problemId: "130", title: "Surrounded Regions", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/surrounded-regions" },
    { problemId: "210", title: "Course Schedule II", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/course-schedule-ii" }
  ],
  "breadthfirstsearch": [
    { problemId: "200", title: "Number of Islands", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/number-of-islands" },
    { problemId: "102", title: "Binary Tree Level Order Traversal", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/binary-tree-level-order-traversal" },
    { problemId: "127", title: "Word Ladder", difficulty: "Hard", leetcodeUrl: "https://leetcode.com/problems/word-ladder" },
    { problemId: "994", title: "Rotting Oranges", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/rotting-oranges" },
    { problemId: "1306", title: "Jump Game III", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/jump-game-iii" },
    { problemId: "210", title: "Course Schedule II", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/course-schedule-ii" }
  ],
  "greedy": [
    { problemId: "55", title: "Jump Game", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/jump-game" },
    { problemId: "45", title: "Jump Game II", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/jump-game-ii" },
    { problemId: "134", title: "Gas Station", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/gas-station" },
    { problemId: "135", title: "Candy", difficulty: "Hard", leetcodeUrl: "https://leetcode.com/problems/candy" },
    { problemId: "406", title: "Queue Reconstruction by Height", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/queue-reconstruction-by-height" },
    { problemId: "435", title: "Non-overlapping Intervals", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/non-overlapping-intervals" },
    { problemId: "455", title: "Assign Cookies", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/assign-cookies" },
    { problemId: "860", title: "Lemonade Change", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/lemonade-change" }
  ],
  "heap": [
    { problemId: "215", title: "Kth Largest Element in an Array", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/kth-largest-element-in-an-array" },
    { problemId: "23", title: "Merge k Sorted Lists", difficulty: "Hard", leetcodeUrl: "https://leetcode.com/problems/merge-k-sorted-lists" },
    { problemId: "295", title: "Find Median from Data Stream", difficulty: "Hard", leetcodeUrl: "https://leetcode.com/problems/find-median-from-data-stream" },
    { problemId: "347", title: "Top K Frequent Elements", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/top-k-frequent-elements" },
    { problemId: "703", title: "Kth Largest Element in a Stream", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/kth-largest-element-in-a-stream" },
    { problemId: "973", title: "K Closest Points to Origin", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/k-closest-points-to-origin" },
    { problemId: "1046", title: "Last Stone Weight", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/last-stone-weight" },
    { problemId: "621", title: "Task Scheduler", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/task-scheduler" }
  ],
  "trie": [
    { problemId: "208", title: "Implement Trie (Prefix Tree)", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/implement-trie-prefix-tree" },
    { problemId: "212", title: "Word Search II", difficulty: "Hard", leetcodeUrl: "https://leetcode.com/problems/word-search-ii" },
    { problemId: "211", title: "Design Add and Search Words Data Structure", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/design-add-and-search-words-data-structure" },
    { problemId: "421", title: "Maximum XOR of Two Numbers in an Array", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array" },
    { problemId: "677", title: "Map Sum Pairs", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/map-sum-pairs" },
    { problemId: "648", title: "Replace Words", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/replace-words" }
  ],
  "backtracking": [
    { problemId: "78", title: "Subsets", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/subsets" },
    { problemId: "46", title: "Permutations", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/permutations" },
    { problemId: "39", title: "Combination Sum", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/combination-sum" },
    { problemId: "51", title: "N-Queens", difficulty: "Hard", leetcodeUrl: "https://leetcode.com/problems/n-queens" },
    { problemId: "79", title: "Word Search", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/word-search" },
    { problemId: "17", title: "Letter Combinations of a Phone Number", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/letter-combinations-of-a-phone-number" },
    { problemId: "22", title: "Generate Parentheses", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/generate-parentheses" },
    { problemId: "37", title: "Sudoku Solver", difficulty: "Hard", leetcodeUrl: "https://leetcode.com/problems/sudoku-solver" }
  ],
  "slidingwindow": [
    { problemId: "3", title: "Longest Substring Without Repeating Characters", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/longest-substring-without-repeating-characters" },
    { problemId: "76", title: "Minimum Window Substring", difficulty: "Hard", leetcodeUrl: "https://leetcode.com/problems/minimum-window-substring" },
    { problemId: "567", title: "Permutation in String", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/permutation-in-string" },
    { problemId: "209", title: "Minimum Size Subarray Sum", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/minimum-size-subarray-sum" },
    { problemId: "438", title: "Find All Anagrams in a String", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/find-all-anagrams-in-a-string" },
    { problemId: "239", title: "Sliding Window Maximum", difficulty: "Hard", leetcodeUrl: "https://leetcode.com/problems/sliding-window-maximum" }
  ],
  "prefixsum": [
    { problemId: "560", title: "Subarray Sum Equals K", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/subarray-sum-equals-k" },
    { problemId: "303", title: "Range Sum Query - Immutable", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/range-sum-query-immutable" },
    { problemId: "238", title: "Product of Array Except Self", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/product-of-array-except-self" },
    { problemId: "724", title: "Find Pivot Index", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/find-pivot-index" },
    { problemId: "525", title: "Contiguous Array", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/contiguous-array" },
    { problemId: "974", title: "Subarray Sums Divisible by K", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/subarray-sums-divisible-by-k" }
  ],
  "bitmanipulation": [
    { problemId: "136", title: "Single Number", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/single-number" },
    { problemId: "191", title: "Number of 1 Bits", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/number-of-1-bits" },
    { problemId: "338", title: "Counting Bits", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/counting-bits" },
    { problemId: "190", title: "Reverse Bits", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/reverse-bits" },
    { problemId: "268", title: "Missing Number", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/missing-number" },
    { problemId: "201", title: "Bitwise AND of Numbers Range", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/bitwise-and-of-numbers-range" }
  ],
  "linkedlist": [
    { problemId: "206", title: "Reverse Linked List", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/reverse-linked-list" },
    { problemId: "21", title: "Merge Two Sorted Lists", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/merge-two-sorted-lists" },
    { problemId: "141", title: "Linked List Cycle", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/linked-list-cycle" },
    { problemId: "19", title: "Remove Nth Node From End of List", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/remove-nth-node-from-end-of-list" },
    { problemId: "2", title: "Add Two Numbers", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/add-two-numbers" },
    { problemId: "142", title: "Linked List Cycle II", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/linked-list-cycle-ii" },
    { problemId: "23", title: "Merge k Sorted Lists", difficulty: "Hard", leetcodeUrl: "https://leetcode.com/problems/merge-k-sorted-lists" },
    { problemId: "25", title: "Reverse Nodes in k-Group", difficulty: "Hard", leetcodeUrl: "https://leetcode.com/problems/reverse-nodes-in-k-group" }
  ],
  "queue": [
    { problemId: "232", title: "Implement Queue using Stacks", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/implement-queue-using-stacks" },
    { problemId: "622", title: "Design Circular Queue", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/design-circular-queue" },
    { problemId: "933", title: "Number of Recent Calls", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/number-of-recent-calls" },
    { problemId: "225", title: "Implement Stack using Queues", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/implement-stack-using-queues" }
  ],
  "stack": [
    { problemId: "20", title: "Valid Parentheses", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/valid-parentheses" },
    { problemId: "155", title: "Min Stack", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/min-stack" },
    { problemId: "150", title: "Evaluate Reverse Polish Notation", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/evaluate-reverse-polish-notation" },
    { problemId: "84", title: "Largest Rectangle in Histogram", difficulty: "Hard", leetcodeUrl: "https://leetcode.com/problems/largest-rectangle-in-histogram" },
    { problemId: "739", title: "Daily Temperatures", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/daily-temperatures" },
    { problemId: "85", title: "Maximal Rectangle", difficulty: "Hard", leetcodeUrl: "https://leetcode.com/problems/maximal-rectangle" }
  ],
  "twopointers": [
    { problemId: "167", title: "Two Sum II - Input Array Is Sorted", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted" },
    { problemId: "15", title: "3Sum", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/3sum" },
    { problemId: "11", title: "Container With Most Water", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/container-with-most-water" },
    { problemId: "125", title: "Valid Palindrome", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/valid-palindrome" },
    { problemId: "344", title: "Reverse String", difficulty: "Easy", leetcodeUrl: "https://leetcode.com/problems/reverse-string" },
    { problemId: "42", title: "Trapping Rain Water", difficulty: "Hard", leetcodeUrl: "https://leetcode.com/problems/trapping-rain-water" }
  ],
  "sorting": [
    { problemId: "912", title: "Sort an Array", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/sort-an-array" },
    { problemId: "56", title: "Merge Intervals", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/merge-intervals" },
    { problemId: "179", title: "Largest Number", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/largest-number" },
    { problemId: "75", title: "Sort Colors", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/sort-colors" },
    { problemId: "148", title: "Sort List", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/sort-list" }
  ],
  "segmenttree": [
    { problemId: "307", title: "Range Sum Query - Mutable", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/range-sum-query-mutable" },
    { problemId: "1649", title: "Create Sorted Array through Instructions", difficulty: "Hard", leetcodeUrl: "https://leetcode.com/problems/create-sorted-array-through-instructions" },
    { problemId: "308", title: "Range Sum Query 2D - Mutable", difficulty: "Hard", leetcodeUrl: "https://leetcode.com/problems/range-sum-query-2d-mutable" }
  ],
  "unionfind": [
    { problemId: "1319", title: "Number of Operations to Make Network Connected", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/number-of-operations-to-make-network-connected" },
    { problemId: "684", title: "Redundant Connection", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/redundant-connection" },
    { problemId: "547", title: "Number of Provinces", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/number-of-provinces" },
    { problemId: "200", title: "Number of Islands", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/number-of-islands" }
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
    { problemId: "54", title: "Spiral Matrix", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/spiral-matrix" },
    { problemId: "73", title: "Set Matrix Zeroes", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/set-matrix-zeroes" }
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
    { problemId: "355", title: "Design Twitter", difficulty: "Medium", leetcodeUrl: "https://leetcode.com/problems/design-twitter" },
    { problemId: "460", title: "LFU Cache", difficulty: "Hard", leetcodeUrl: "https://leetcode.com/problems/lfu-cache" }
  ]
};

export function getRecommendationsForTopic(topicName, count, mastery = 0) {
  const normalized = topicName.toLowerCase().replace(/[^a-z0-9]/g, '');
  let matchedKey = Object.keys(PROBLEM_CATALOG).find(
    (k) => k.toLowerCase().replace(/[^a-z0-9]/g, '') === normalized
  );

  if (!matchedKey) {
    if (normalized === 'dfs') matchedKey = 'depthfirstsearch';
    if (normalized === 'bfs') matchedKey = 'breadthfirstsearch';
    if (normalized === 'dp') matchedKey = 'dynamicprogramming';
    if (normalized.includes('recursion')) matchedKey = 'recursion';
    if (normalized.includes('backtracking')) matchedKey = 'backtracking';
    if (normalized.includes('binarysearch')) matchedKey = 'binarysearch';
    if (normalized.includes('hashmap')) matchedKey = 'hashtable';
    if (normalized.includes('linkedlist')) matchedKey = 'linkedlist';
    if (normalized.includes('tree')) matchedKey = 'tree';
    if (normalized.includes('graph')) matchedKey = 'graph';
    if (normalized.includes('heap') || normalized.includes('priority')) matchedKey = 'heap';
  }

  // Determine target difficulty based on mastery percentage
  // if it is very less (e.g. < 25%) first recommend easy
  // if it is around 50% (e.g. 25% to 65%) recommend medium
  // if > 65% recommend medium and hard
  let targetDifficulty = 'Medium';
  if (mastery < 25) {
    targetDifficulty = 'Easy';
  } else if (mastery >= 65) {
    targetDifficulty = 'Hard';
  }

  const list = PROBLEM_CATALOG[matchedKey] || [];
  
  // Filter by target difficulty first
  let filtered = list.filter(p => p.difficulty === targetDifficulty);
  if (filtered.length < count) {
    const remaining = list.filter(p => p.difficulty !== targetDifficulty);
    filtered = [...filtered, ...remaining];
  }

  const results = [];
  for (let i = 0; i < Math.min(count, filtered.length); i++) {
    results.push({
      problemId: filtered[i].problemId,
      title: filtered[i].title,
      difficulty: filtered[i].difficulty,
      topic: topicName,
      leetcodeUrl: filtered[i].leetcodeUrl,
      aiReason: `Targets optimization scenarios and boundary checks specifically for ${topicName} at your current mastery level (${mastery}%).`
    });
  }

  if (results.length < count) {
    const needed = count - results.length;
    const diffs = ['Easy', 'Medium', 'Hard'];
    const diffIndex = mastery < 25 ? 0 : (mastery >= 65 ? 2 : 1);
    
    const REAL_FALLBACKS = {
      'Easy': [
        { problemId: '136', title: 'Single Number', leetcodeUrl: 'https://leetcode.com/problems/single-number' },
        { problemId: '206', title: 'Reverse Linked List', leetcodeUrl: 'https://leetcode.com/problems/reverse-linked-list' },
        { problemId: '217', title: 'Contains Duplicate', leetcodeUrl: 'https://leetcode.com/problems/contains-duplicate' },
        { problemId: '704', title: 'Binary Search', leetcodeUrl: 'https://leetcode.com/problems/binary-search' }
      ],
      'Medium': [
        { problemId: '3', title: 'Longest Substring Without Repeating Characters', leetcodeUrl: 'https://leetcode.com/problems/longest-substring-without-repeating-characters' },
        { problemId: '11', title: 'Container With Most Water', leetcodeUrl: 'https://leetcode.com/problems/container-with-most-water' },
        { problemId: '15', title: '3Sum', leetcodeUrl: 'https://leetcode.com/problems/3sum' },
        { problemId: '33', title: 'Search in Rotated Sorted Array', leetcodeUrl: 'https://leetcode.com/problems/search-in-rotated-sorted-array' }
      ],
      'Hard': [
        { problemId: '4', title: 'Median of Two Sorted Arrays', leetcodeUrl: 'https://leetcode.com/problems/median-of-two-sorted-arrays' },
        { problemId: '23', title: 'Merge k Sorted Lists', leetcodeUrl: 'https://leetcode.com/problems/merge-k-sorted-lists' },
        { problemId: '76', title: 'Minimum Window Substring', leetcodeUrl: 'https://leetcode.com/problems/minimum-window-substring' },
        { problemId: '295', title: 'Find Median from Data Stream', leetcodeUrl: 'https://leetcode.com/problems/find-median-from-data-stream' }
      ]
    };

    for (let i = 0; i < needed; i++) {
      const diff = diffs[(diffIndex + i) % 3];
      const fallbackList = REAL_FALLBACKS[diff];
      const item = fallbackList[i % fallbackList.length];
      results.push({
        problemId: item.problemId,
        title: item.title,
        difficulty: diff,
        topic: topicName,
        leetcodeUrl: item.leetcodeUrl,
        aiReason: `Targets optimization scenarios and boundary checks specifically for ${topicName} at your current mastery level (${mastery}%).`
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
            prereq: { type: 'string', description: 'Prerequisite concepts needed' },
            problemId: { type: 'string', description: 'LeetCode problem ID/number, e.g. "139"' },
            leetcodeUrl: { type: 'string', description: 'Official LeetCode problem URL, e.g. "https://leetcode.com/problems/word-break"' }
          },
          required: ['title', 'difficulty', 'reason', 'complexity', 'subproblems', 'prereq', 'problemId', 'leetcodeUrl'],
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
            prereq: { type: 'string', description: 'Prerequisites' },
            problemId: { type: 'string', description: 'LeetCode problem ID/number, e.g. "215"' },
            leetcodeUrl: { type: 'string', description: 'Official LeetCode problem URL, e.g. "https://leetcode.com/problems/kth-largest-element-in-an-array"' }
          },
          required: ['title', 'difficulty', 'reason', 'complexity', 'subproblems', 'prereq', 'problemId', 'leetcodeUrl'],
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
   * If Gemini integration is missing/unconfigured, falls back gracefully to a heuristic generator.
   * 
   * @param {Object} userMetrics - Sync data returned by LeetCodeService
   * @returns {Promise<Object>} Formatted AI insights object matching schema
   */
  async generateUserAnalytics(userMetrics, dailyTarget = 4) {
    const hasKey = config.gemini.apiKey && config.gemini.apiKey !== 'PLACEHOLDER_KEY' && config.gemini.apiKey.trim() !== '';

    if (hasKey) {
      try {
        console.log(`🤖 Requesting Gemini analysis for LeetCode profile: ${userMetrics.username}...`);
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

        console.log('✅ Gemini analysis completed successfully.');
        return aiOutput;
      } catch (error) {
        console.warn('⚠️ Gemini API call failed. Falling back to offline heuristics generator.', error.message);
        // Fall through to offline heuristic builder
      }
    } else {
      console.log('ℹ️ Gemini API key not configured. Using offline heuristics generator.');
    }

    // Offline dynamic builder using the user's actual profile statistics
    return this.generateHeuristicAnalytics(userMetrics, dailyTarget);
  }

  /**
   * Generates dashboard summary AI insights.
   * If Gemini is missing, falls back to a heuristic builder.
   * 
   * @param {Object} userMetrics - Sync data returned by LeetCodeService
   * @param {Array} topicData - Calculated topic distribution
   * @returns {Promise<Object>} Object matching the dashboard insight schema
   */
  async generateDashboardInsight(userMetrics, topicData) {
    const hasKey = config.gemini.apiKey && config.gemini.apiKey !== 'PLACEHOLDER_KEY' && config.gemini.apiKey.trim() !== '';

    if (hasKey) {
      try {
        console.log(`🤖 Requesting Gemini dashboard summary for: ${userMetrics.username}...`);
        const systemPrompt = SYSTEM_PROMPT;
        const userPrompt = createDashboardPrompt(userMetrics, topicData);

        const aiOutput = await aiService.generateStructuredJSON(
          systemPrompt,
          userPrompt,
          dashboardInsightResponseSchema
        );

        console.log('✅ Gemini dashboard summary completed successfully.');
        return aiOutput;
      } catch (error) {
        console.warn('⚠️ Gemini API dashboard call failed. Falling back to offline heuristics.', error.message);
        // Fall through to heuristic
      }
    }

    return this.generateHeuristicDashboardInsight(userMetrics, topicData);
  }

  /**
   * Generates detailed technical weakness analyses.
   * If Gemini is missing, falls back to a heuristic builder.
   * 
   * @param {Object} userMetrics - Sync data returned by LeetCodeService
   * @returns {Promise<Object>} Object matching the weakness analysis schema
   */
  async generateWeaknessAnalysis(userMetrics) {
    const hasKey = config.gemini.apiKey && config.gemini.apiKey !== 'PLACEHOLDER_KEY' && config.gemini.apiKey.trim() !== '';

    if (hasKey) {
      try {
        console.log(`🤖 Requesting Gemini detailed weakness analysis for: ${userMetrics.username}...`);
        const systemPrompt = SYSTEM_PROMPT;
        const userPrompt = createWeaknessPrompt(userMetrics);

        const aiOutput = await aiService.generateStructuredJSON(
          systemPrompt,
          userPrompt,
          weaknessAnalysisResponseSchema
        );

        console.log('✅ Gemini weakness analysis completed successfully.');
        return aiOutput;
      } catch (error) {
        console.warn('⚠️ Gemini API weakness analysis call failed. Falling back to offline heuristics.', error.message);
        // Fall through to heuristic
      }
    }

    return this.generateHeuristicWeaknessAnalysis(userMetrics);
  }

  /**
   * Generates AI Coach recommendation plans.
   * If Gemini is missing, falls back to a heuristic builder.
   * 
   * @param {Object} userMetrics - Sync data returned by LeetCodeService
   * @param {Array} weakTopics - User's identified weakness areas
   * @param {Number} goalRating - Target ELO rating
   * @param {Number} dailyTarget - Target problems count
   * @returns {Promise<Object>} Object matching the AI Coach schema
   */
  async generateCoachPlan(userMetrics, weakTopics, goalRating, dailyTarget) {
    const hasKey = config.gemini.apiKey && config.gemini.apiKey !== 'PLACEHOLDER_KEY' && config.gemini.apiKey.trim() !== '';

    if (hasKey) {
      try {
        console.log(`🤖 Requesting Gemini AI Coach plan for: ${userMetrics.username}...`);
        const systemPrompt = SYSTEM_PROMPT;
        const userPrompt = createCoachPrompt(userMetrics, weakTopics, goalRating, dailyTarget);

        const aiOutput = await aiService.generateStructuredJSON(
          systemPrompt,
          userPrompt,
          coachPlanResponseSchema
        );

        console.log('✅ Gemini AI Coach plan completed successfully.');
        return aiOutput;
      } catch (error) {
        console.warn('⚠️ Gemini API AI Coach plan call failed. Falling back to offline heuristics.', error.message);
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
    
    // Total questions per topic on LeetCode (estimate)
    const TOPIC_TOTAL_QUESTIONS = {
      "Array": 1650,
      "String": 750,
      "Hash Table": 600,
      "Dynamic Programming": 550,
      "Math": 500,
      "Sorting": 400,
      "Greedy": 380,
      "Depth-First Search": 380,
      "Binary Search": 280,
      "Tree": 260,
      "Breadth-First Search": 260,
      "Matrix": 240,
      "Two Pointers": 220,
      "Binary Tree": 210,
      "Bit Manipulation": 200,
      "Heap (Priority Queue)": 180,
      "Stack": 170,
      "Graph": 160,
      "Prefix Sum": 160,
      "Sliding Window": 130,
      "Design": 130,
      "Backtracking": 120,
      "Linked List": 110,
      "Union Find": 90,
      "Trie": 60,
      "Recursion": 60
    };

    // Calculate mastery from tagProblemCounts
    const strengths = [];
    const categories = ['fundamental', 'intermediate', 'advanced'];
    
    // Collect solved count for all tags
    const tagSolved = {};
    categories.forEach(cat => {
      if (metrics.tagProblemCounts && metrics.tagProblemCounts[cat]) {
        metrics.tagProblemCounts[cat].forEach(t => {
          const name = t.tagName;
          tagSolved[name] = (tagSolved[name] || 0) + t.problemsSolved;
        });
      }
    });

    // Populate all tags with calculated mastery
    Object.keys(TOPIC_TOTAL_QUESTIONS).forEach(name => {
      const sCount = tagSolved[name] || 0;
      const total = TOPIC_TOTAL_QUESTIONS[name] || 100;
      const mastery = Math.min(100, Math.round((sCount / total) * 100));
      strengths.push({ topic: name, mastery });
    });

    // Sort strengths by mastery level desc
    strengths.sort((a, b) => b.mastery - a.mastery);

    // Filter potential bottlenecks (critical topics with mastery < 50%)
    const potentialBottlenecks = strengths.filter(s => s.mastery < 50);
    
    // Sort ascending by mastery (weakest first)
    const sortedWeakest = [...potentialBottlenecks].sort((a, b) => a.mastery - b.mastery);

    // Take top 3 weakest (or fall back to overall weakest if none are < 50)
    const selectedWeakest = sortedWeakest.length >= 3 
      ? sortedWeakest.slice(0, 3) 
      : [...strengths].sort((a, b) => a.mastery - b.mastery).slice(0, 3);

    const bottlenecks = selectedWeakest.map((item, idx) => {
      const severity = parseFloat((10 - (item.mastery / 10)).toFixed(1));
      const ratingPotential = Math.round((50 - item.mastery) * 2) || 30;
      return {
        topic: item.topic,
        priority: idx + 1,
        severity,
        ratingPotential: Math.max(20, ratingPotential)
      };
    });

    const mainTopic = bottlenecks[0]?.topic || 'Dynamic Programming';
    const mainTopicMastery = strengths.find(s => s.topic === mainTopic)?.mastery || 0;

    const anomalies = [
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

    const nextAction = {
      topic: mainTopic,
      eloGain: bottlenecks[0]?.ratingPotential || 80,
      drillTitle: `${mainTopic} Drill`
    };

    const dailyPlan = {
      topic: mainTopic,
      description: `Practice and optimize solutions for ${mainTopic} tasks to address your key priority bottlenecks.`,
      targetQuestions: dailyTarget,
      estTime: dailyTarget * 20 + 15
    };

    const topicRecommendations = getRecommendationsForTopic(mainTopic, dailyTarget, mainTopicMastery);
    const recommendations = topicRecommendations.map((r, idx) => ({
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
