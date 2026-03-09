import mongoose from "mongoose";

const socialLinkSchema = new mongoose.Schema(
  {
    platform: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    handle: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { _id: false }
);

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
    socialLinks: {
      type: [socialLinkSchema],
      default: [],
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
    journey: {
      type: String,
      default: "Year 5, Day 298",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Leaderboard", leaderboardSchema);