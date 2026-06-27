import mongoose from 'mongoose';

const weaknessAnalysisSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    weaknesses: [
      {
        weakness: {
          type: String,
          required: [true, 'Weakness topic is required']
        },
        severity: {
          type: Number,
          required: [true, 'Severity is required']
        },
        rootCause: {
          type: String,
          required: [true, 'Root cause description is required']
        },
        improvementAdvice: {
          type: String,
          required: [true, 'Improvement advice is required']
        },
        ratingImpact: {
          type: Number,
          required: [true, 'Rating impact is required']
        }
      }
    ],
    lastGeneratedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
    collection: 'weaknessanalyses' // Map explicitly to the matching MongoDB collection name
  }
);

const WeaknessAnalysis = mongoose.model('WeaknessAnalysis', weaknessAnalysisSchema);

export default WeaknessAnalysis;
