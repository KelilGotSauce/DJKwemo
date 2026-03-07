import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "../utils/db.js";
import Leaderboard from "../models/Leaderboard.js";
import CheckoutSession from "../models/CheckoutSession.js";
import LoginCode from "../models/LoginCode.js";
import Counter from "../models/Counter.js";

dotenv.config();

const clearDatabase = async () => {
  try {
    await connectDB();

    await Leaderboard.deleteMany({});
    await CheckoutSession.deleteMany({});
    await LoginCode.deleteMany({});
    await Counter.deleteMany({});

    console.log("Database cleared successfully.");
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Error clearing database:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

clearDatabase();