import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "../utils/db.js";
import Leaderboard from "../models/Leaderboard.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();

    // Optional: clear existing leaderboard
    await Leaderboard.deleteMany({});

    const fakeUsers = [
      {
        rank: 1,
        name: "Tyler, The Creator",
        email: "kwemos@gmail.com",
        location: "MTL, CA 🇨🇦",
        social: "@djkwemo",
        journey: "Year: 5 • Day: 108",
        date: "Mar 8, 2026",
        score: 100
      },
      {
        rank: 2,
        name: "Alex",
        email: "alexbeats@email.com",
        location: "TOR, CA 🇨🇦",
        social: "@alexbeats",
        journey: "Year: 5 • Day: 109",
        date: "Mar 9, 2026",
        score: 95
      },
      {
        rank: 3,
        name: "Maya",
        email: "maya@email.com",
        location: "VAN, CA 🇨🇦",
        social: "@mayawave",
        journey: "Year: 5 • Day: 110",
        date: "Mar 10, 2026",
        score: 92
      },
      {
        rank: 4,
        name: "Chris",
        email: "chris@email.com",
        location: "NYC, US 🇺🇸",
        social: "@chrisbeats",
        journey: "Year: 5 • Day: 111",
        date: "Mar 11, 2026",
        score: 89
      },
      {
        rank: 5,
        name: "Sophie",
        email: "sophie@email.com",
        location: "LDN, UK 🇬🇧",
        social: "@sophie.wav",
        journey: "Year: 5 • Day: 112",
        date: "Mar 12, 2026",
        score: 85
      },
      {
        rank: 6,
        name: "Kenji",
        email: "kenji@email.com",
        location: "TKY, JP 🇯🇵",
        social: "@kenjibeats",
        journey: "Year: 5 • Day: 113",
        date: "Mar 13, 2026",
        score: 82
      }
    ];

    await Leaderboard.insertMany(fakeUsers);

    console.log("Fake leaderboard data inserted successfully.");

    await mongoose.connection.close();
    process.exit(0);

  } catch (error) {
    console.error("Error seeding database:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedDatabase();