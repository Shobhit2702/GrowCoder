import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    realName: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
      trim: true,
    },
    ranking: {
      type: Number,
    },
    aboutMe: {
      type: String,
      trim: true,
    },
    school: {
      type: String,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    githubUrl: {
      type: String,
      trim: true,
    },
    twitterUrl: {
      type: String,
      trim: true,
    },
    linkedinUrl: {
      type: String,
      trim: true,
    },
    solvedStats: {
      all: { type: Number, default: 0 },
      easy: { type: Number, default: 0 },
      medium: { type: Number, default: 0 },
      hard: { type: Number, default: 0 },
    },
    contestRanking: {
      attendedContestsCount: { type: Number, default: 0 },
      rating: { type: Number, default: 1500 },
      globalRanking: { type: mongoose.Schema.Types.Mixed, default: null },
      totalParticipants: { type: Number, default: 0 },
      topPercentage: { type: Number, default: 100 },
      badge: { type: String, default: null },
    },
    dailyTarget: {
      type: Number,
      default: 4
    },
    submissionCalendar: {
      type: String,
      default: '{}'
    },
    tagProblemCounts: {
      type: mongoose.Schema.Types.Mixed,
      default: { advanced: [], intermediate: [], fundamental: [] }
    },
    contestHistory: [
      {
        contestTitle: { type: String, required: true },
        startTime: { type: Date, required: true },
        attended: { type: Boolean, default: false },
        rating: { type: Number },
        ranking: { type: Number },
        problemsSolved: { type: Number },
        totalProblems: { type: Number },
        finishTimeInSeconds: { type: Number },
      },
    ],
    recentSubmissions: [
      {
        id: { type: String },
        title: { type: String },
        titleSlug: { type: String },
        timestamp: { type: Date }
      }
    ],
    aiAnalysis: {
      eloProjection: { type: Number, default: 0 },
      strengths: [
        {
          topic: { type: String, required: true },
          mastery: { type: Number, required: true }
        }
      ],
      bottlenecks: [
        {
          topic: { type: String, required: true },
          priority: { type: Number, required: true },
          severity: { type: Number, required: true },
          ratingPotential: { type: Number, required: true }
        }
      ],
      anomalies: [
        {
          id: { type: String, required: true },
          title: { type: String, required: true },
          description: { type: String, required: true },
          impact: { type: String, required: true },
          impactLevel: { type: String, required: true, enum: ['high', 'moderate', 'low'] }
        }
      ],
      nextAction: {
        topic: { type: String, required: true },
        eloGain: { type: Number, required: true },
        drillTitle: { type: String, required: true }
      },
      dailyPlan: {
        topic: { type: String, required: true },
        description: { type: String, required: true },
        targetQuestions: { type: Number, required: true },
        estTime: { type: Number, required: true }
      },
      checklist: [
        {
          id: { type: Number, required: true },
          text: { type: String, required: true },
          checked: { type: Boolean, default: false }
        }
      ],
      recommendations: [
        {
          title: { type: String, required: true },
          difficulty: { type: String, required: true, enum: ['Easy', 'Medium', 'Hard'] },
          reason: { type: String, required: true },
          complexity: { type: String, required: true },
          subproblems: { type: String, required: true },
          prereq: { type: String, required: true }
        }
      ]
    },
    lastSyncedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

export default User;
