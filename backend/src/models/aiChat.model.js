import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
    enum: ['user', 'ai']
  },
  text: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const aiChatSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    messages: [chatMessageSchema]
  },
  {
    timestamps: true,
    collection: 'aichats'
  }
);

const AIChat = mongoose.model('AIChat', aiChatSchema);

export default AIChat;
