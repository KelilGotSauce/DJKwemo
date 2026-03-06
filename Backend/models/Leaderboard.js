import mongoose from "mongoose";

const leaderboardSchema = new mongoose.Schema({
  rank: { type: Number, required: true },
  name: { type: String, required: true },
  social: { type: String },
  dateBelieved: { type: Date, default: Date.now },
  journeyDay: { type: String },
});

export default mongoose.model("Leaderboard", leaderboardSchema);