import mongoose from 'mongoose';

const aiCoachSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    dailyPlan: {
      topic: { type: String, required: true },
      description: { type: String, required: true },
      targetQuestions: { type: Number, required: true },
      estTime: { type: Number, required: true }
    },
    weeklyPlan: [
      {
        week: { type: Number, required: true },
        focusTopic: { type: String, required: true },
        strategy: { type: String, required: true }
      }
    ],
    recommendedProblems: [
      {
        title: { type: String, required: true },
        difficulty: { type: String, required: true, enum: ['Easy', 'Medium', 'Hard'] },
        reason: { type: String, required: true },
        complexity: { type: String, required: true },
        subproblems: { type: String, required: true },
        prereq: { type: String, required: true }
      }
    ],
    motivation: {
      type: String,
      required: [true, 'Motivation is required']
    },
    studyStrategy: {
      type: String,
      required: [true, 'Study strategy is required']
    },
    lastGeneratedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
    collection: 'aicoaches' // Map explicitly to the matching MongoDB collection name
  }
);

const AICoach = mongoose.model('AICoach', aiCoachSchema);

export default AICoach;
