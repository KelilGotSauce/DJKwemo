import mongoose from "mongoose";

const leaderboardSchema = new mongoose.Schema(
  {
    rank: {
      type: Number,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    social: {
      type: String,
      default: "",
      trim: true,
    },
    country: {
      type: String,
      default: "",
      trim: true,
    },
    city: {
      type: String,
      default: "",
      trim: true,
    },
    score: {
      type: Number,
      default: 100,
    },
    yearDate: {
      type: String,
      default: "Year 5, Day 298",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Leaderboard", leaderboardSchema);