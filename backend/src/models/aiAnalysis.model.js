import mongoose from 'mongoose';

const aiAnalysisSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    codingDNA: {
      type: String,
      required: [true, 'Coding DNA is required']
    },
    strength: {
      type: String,
      required: [true, 'Strength description is required']
    },
    weakness: {
      type: String,
      required: [true, 'Weakness description is required']
    },
    summary: {
      type: String,
      required: [true, 'Summary explanation is required']
    },
    motivationalInsight: {
      type: String,
      required: [true, 'Motivational insight is required']
    },
    lastGeneratedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
    collection: 'aianalyses' // Map explicitly to the matching MongoDB collection name
  }
);

const AIAnalysis = mongoose.model('AIAnalysis', aiAnalysisSchema);

export default AIAnalysis;
