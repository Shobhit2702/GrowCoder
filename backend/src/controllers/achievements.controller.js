import catchAsync from '../utils/catchAsync.js';
import userRepository from '../repositories/user.repository.js';
import AppError from '../utils/AppError.js';

/**
 * Controller endpoint to dynamically calculate and retrieve user achievements metrics.
 */
export const getAchievements = catchAsync(async (req, res) => {
  const { username } = req.params;
  const formattedUsername = username.toLowerCase();

  const user = await userRepository.findByUsername(formattedUsername);
  if (!user) {
    throw new AppError(
      404,
      `User profile for "${username}" has not been found. Please perform a profile sync first.`
    );
  }

  const solved = user.solvedStats || { all: 0, easy: 0, medium: 0, hard: 0 };
  const rating = user.contestRanking?.rating || 1500;
  const attendedContestsCount = user.contestRanking?.attendedContestsCount || 0;

  const easyCount = solved.easy || 0;
  const mediumCount = solved.medium || 0;
  const hardCount = solved.hard || 0;
  const totalSolved = solved.all || (easyCount + mediumCount + hardCount);

  // 1. Calculate XP
  const xpFromSolved = (easyCount * 50) + (mediumCount * 100) + (hardCount * 200);
  const xpFromContests = attendedContestsCount * 300;
  const totalXp = xpFromSolved + xpFromContests;

  // Let's determine level (1 level per 1000 XP)
  const level = Math.floor(totalXp / 1000) + 1;
  const xpCurrent = totalXp % 1000;
  const xpTotal = 1000;
  const xpPercent = Math.min(100, Math.round((xpCurrent / xpTotal) * 100));

  // 2. Titles & Ranks definition
  const ranksList = [
    { name: 'LEGENDARY GRANDMASTER', minRating: 2200, nodeIdx: 1 },
    { name: 'MASTER GUARDIAN', minRating: 2000, nodeIdx: 2 },
    { name: 'ELITE KNIGHT', minRating: 1800, nodeIdx: 3 },
    { name: 'CRUSADER', minRating: 1650, nodeIdx: 4 },
    { name: 'GUARDIAN', minRating: 1500, nodeIdx: 5 },
    { name: 'KNIGHT', minRating: 1350, nodeIdx: 6 },
    { name: 'BEGINNER', minRating: 0, nodeIdx: 7 }
  ];

  // Determine active rank
  let activeRank = ranksList[ranksList.length - 1];
  for (const r of ranksList) {
    if (rating >= r.minRating) {
      activeRank = r;
      break;
    }
  }

  // 3. Roadmap progress nodes
  const roadmap = ranksList.map((r) => {
    let status = 'locked';
    if (rating >= r.minRating) {
      status = activeRank.nodeIdx === r.nodeIdx ? 'active' : 'completed';
    }
    return {
      name: r.name,
      nodeIndex: r.nodeIdx,
      minRating: r.minRating,
      status
    };
  });

  // 4. Badges calculations
  let growthScore = 0;
  if (totalSolved > 0) {
    growthScore = Math.round(((easyCount * 1 + mediumCount * 2 + hardCount * 3) / (totalSolved * 3)) * 100);
  }

  const badges = [
    {
      id: 'code_master',
      title: 'Code Master',
      description: 'Solve 100 algorithmic problems across any tier difficulty.',
      category: 'General Algorithmic Logic',
      status: totalSolved >= 100 ? 'unlocked' : 'locked',
      progress: Math.min(100, Math.round((totalSolved / 100) * 100))
    },
    {
      id: 'recursion_wizard',
      title: 'Recursion Wizard',
      description: 'Solve 20 Medium or Hard recursive state problems.',
      category: 'Recursive Logic Engine',
      status: (mediumCount + hardCount) >= 20 ? 'unlocked' : 'locked',
      progress: Math.min(100, Math.round(((mediumCount + hardCount) / 20) * 100))
    },
    {
      id: 'db_architect',
      title: 'DB Architect',
      description: 'Demonstrate deep complex problem solving (Growth Score >= 60%).',
      category: 'Schema & Index Scaling',
      status: growthScore >= 60 ? 'unlocked' : 'locked',
      progress: Math.min(100, Math.round((growthScore / 60) * 100))
    },
    {
      id: 'zero_day_fixer',
      title: 'Zero Day Fixer',
      description: 'Reach elite rank by breaking 1800 contest rating.',
      category: 'Security Infrastructure',
      status: rating >= 1800 ? 'unlocked' : 'locked',
      progress: Math.min(100, Math.round((rating / 1800) * 100))
    }
  ];

  // 5. Next Unlock Milestone
  let nextUnlock = null;
  const lockedRanks = ranksList.filter((r) => r.minRating > rating).sort((a, b) => a.minRating - b.minRating);
  const lockedBadges = badges.filter((b) => b.status === 'locked');

  if (lockedRanks.length > 0) {
    const targetRank = lockedRanks[0];
    nextUnlock = {
      title: targetRank.name,
      type: 'rank',
      requirement: `Reach ${targetRank.minRating} contest rating`,
      remaining: `${targetRank.minRating - rating} ELO points needed`
    };
  } else if (lockedBadges.length > 0) {
    const targetBadge = lockedBadges[0];
    nextUnlock = {
      title: targetBadge.title,
      type: 'badge',
      requirement: targetBadge.description,
      remaining: `${100 - targetBadge.progress}% progress remaining`
    };
  } else {
    nextUnlock = {
      title: 'Max Level',
      type: 'milestone',
      requirement: 'All ranks and badges unlocked!',
      remaining: 'None'
    };
  }

  // 6. Return response
  res.status(200).json({
    status: 'success',
    data: {
      username: user.username,
      xp: {
        totalXp,
        level,
        xpCurrent,
        xpTotal,
        xpPercent
      },
      titles: {
        activeTitle: activeRank.name,
        unlockedTitles: ranksList.filter((r) => rating >= r.minRating).map((r) => r.name)
      },
      badges,
      roadmap,
      nextUnlock
    }
  });
});
