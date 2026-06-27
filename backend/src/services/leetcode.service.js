import AppError from '../utils/AppError.js';

const LEETCODE_GRAPHQL_URL = 'https://leetcode.com/graphql/';

const LEETCODE_QUERY = `
query getUserProfile($username: String!) {
  matchedUser(username: $username) {
    username
    githubUrl
    twitterUrl
    linkedinUrl
    profile {
      ranking
      userAvatar
      realName
      aboutMe
      school
      countryName
      company
      jobTitle
    }
    submitStats: submitStatsGlobal {
      acSubmissionNum {
        difficulty
        count
      }
    }
    submissionCalendar
    tagProblemCounts {
      advanced {
        tagName
        tagSlug
        problemsSolved
      }
      intermediate {
        tagName
        tagSlug
        problemsSolved
      }
      fundamental {
        tagName
        tagSlug
        problemsSolved
      }
    }
  }
  userContestRanking(username: $username) {
    attendedContestsCount
    rating
    globalRanking
    totalParticipants
    topPercentage
    badge {
      name
    }
  }
  userContestRankingHistory(username: $username) {
    attended
    trendDirection
    problemsSolved
    totalProblems
    finishTimeInSeconds
    rating
    ranking
    contest {
      title
      startTime
    }
  }
  recentAcSubmissionList(username: $username, limit: 10) {
    id
    title
    titleSlug
    timestamp
  }
}
`;

class LeetCodeService {
  /**
   * Fetches data from LeetCode GraphQL API and normalizes the response.
   * 
   * @param {string} username - LeetCode username
   * @returns {Promise<Object>} Normalized user profile details
   */
  async fetchAndNormalize(username) {
    try {
      const response = await fetch(LEETCODE_GRAPHQL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
          'Referer': 'https://leetcode.com/'
        },
        body: JSON.stringify({
          query: LEETCODE_QUERY,
          variables: { username }
        })
      });

      if (!response.ok) {
        throw new AppError(response.status, 'Error communicating with LeetCode API');
      }

      const result = await response.json();

      // Check for errors in the GraphQL response
      if (result.errors) {
        // If matchedUser query failed because user does not exist, throw 404.
        const userMissingError = result.errors.find(
          (err) => err.message && err.message.toLowerCase().includes('user') && err.message.toLowerCase().includes('not exist')
        );
        if (userMissingError || !result.data || !result.data.matchedUser) {
          throw new AppError(404, `LeetCode username "${username}" does not exist`);
        }
      }

      const { matchedUser, userContestRanking, userContestRankingHistory, recentAcSubmissionList } = result.data;

      if (!matchedUser) {
        throw new AppError(404, `LeetCode username "${username}" does not exist`);
      }

      // 1. Normalize basic profile information
      const profile = matchedUser.profile || {};
      
      // 2. Normalize solved statistics
      const solvedStats = { all: 0, easy: 0, medium: 0, hard: 0 };
      if (matchedUser.submitStats && matchedUser.submitStats.acSubmissionNum) {
        matchedUser.submitStats.acSubmissionNum.forEach((item) => {
          const difficulty = item.difficulty.toLowerCase();
          if (difficulty in solvedStats) {
            solvedStats[difficulty] = item.count;
          }
        });
      }

      // 3. Normalize contest ranking info
      const contestRanking = {
        attendedContestsCount: 0,
        rating: 0, // default to 0 for non-participants
        globalRanking: "N/A", // default to "N/A" for non-participants
        totalParticipants: 0,
        topPercentage: 100,
        badge: null
      };

      if (userContestRanking) {
        contestRanking.attendedContestsCount = userContestRanking.attendedContestsCount || 0;
        contestRanking.rating = Math.round(userContestRanking.rating) || 0;
        contestRanking.globalRanking = userContestRanking.globalRanking || "N/A";
        contestRanking.totalParticipants = userContestRanking.totalParticipants || 0;
        contestRanking.topPercentage = userContestRanking.topPercentage || 100;
        contestRanking.badge = userContestRanking.badge ? userContestRanking.badge.name : null;
      }

      // 4. Normalize contest rating history
      const contestHistory = [];
      if (Array.isArray(userContestRankingHistory)) {
        userContestRankingHistory.forEach((h) => {
          if (h && h.contest) {
            contestHistory.push({
              contestTitle: h.contest.title,
              startTime: new Date(h.contest.startTime * 1000), // Convert Unix timestamp to Date
              attended: h.attended || false,
              rating: h.rating ? Math.round(h.rating) : null,
              ranking: h.ranking || null,
              problemsSolved: h.problemsSolved || 0,
              totalProblems: h.totalProblems || 0,
              finishTimeInSeconds: h.finishTimeInSeconds || 0
            });
          }
        });
      }

      // 5. Normalize recent submissions
      const recentSubmissions = [];
      if (Array.isArray(recentAcSubmissionList)) {
        recentAcSubmissionList.forEach((sub) => {
          if (sub) {
            recentSubmissions.push({
              id: sub.id,
              title: sub.title,
              titleSlug: sub.titleSlug,
              timestamp: new Date(parseInt(sub.timestamp) * 1000) // Convert string timestamp (sec) to Date
            });
          }
        });
      }

      return {
        username: matchedUser.username, // Maintain official casing from LeetCode
        realName: profile.realName || '',
        avatar: profile.userAvatar || '',
        ranking: profile.ranking || null,
        aboutMe: profile.aboutMe || '',
        school: profile.school || '',
        company: profile.company || '',
        country: profile.countryName || '',
        githubUrl: matchedUser.githubUrl || null,
        twitterUrl: matchedUser.twitterUrl || null,
        linkedinUrl: matchedUser.linkedinUrl || null,
        solvedStats,
        contestRanking,
        contestHistory,
        recentSubmissions,
        submissionCalendar: matchedUser.submissionCalendar || '{}',
        tagProblemCounts: matchedUser.tagProblemCounts || { advanced: [], intermediate: [], fundamental: [] }
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(500, `Failed to fetch LeetCode data: ${error.message}`);
    }
  }
}

export default new LeetCodeService();
