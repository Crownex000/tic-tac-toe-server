import mongoose from 'mongoose';

const historySchema = new mongoose.Schema(
  {
    player1: { type: String, required: true },
    player2: { type: String, required: true },
    description: { type: String, required: true },
    winner: { type: String, required: true },
    data: { type: [String], required: true },
  },
  { timestamps: true }
);

const History = mongoose.model('History', historySchema);

export default History;