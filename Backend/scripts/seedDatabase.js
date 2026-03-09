import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "../utils/db.js";
import Leaderboard from "../models/Leaderboard.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();

    await Leaderboard.deleteMany({});

    const fakeUsers = [
      {
        rank: 1,
        email: "kwemos@gmail.com",
        name: "Tyler, The Creator",
        socialLinks: [
          {
            platform: "instagram",
            url: "https://instagram.com/djkwemo",
            handle: "@djkwemo",
          },
          {
            platform: "youtube",
            url: "https://youtube.com/@djkwemo",
            handle: "@djkwemo",
          },
        ],
        country: "Canada 🇨🇦",
        city: "Montreal",
        score: 100,
        journey: "Year 5, Day 298",
      },
      {
        rank: 2,
        email: "alex@email.com",
        name: "Alex",
        socialLinks: [
          {
            platform: "instagram",
            url: "https://instagram.com/alexbeats",
            handle: "@alexbeats",
          },
        ],
        country: "Canada 🇨🇦",
        city: "Toronto",
        score: 95,
        journey: "Year 5, Day 299",
      },
      {
        rank: 3,
        email: "maya@email.com",
        name: "Maya",
        socialLinks: [
          {
            platform: "instagram",
            url: "https://instagram.com/mayawave",
            handle: "@mayawave",
          },
          {
            platform: "tiktok",
            url: "https://tiktok.com/@mayawave",
            handle: "@mayawave",
          },
        ],
        country: "Canada 🇨🇦",
        city: "Vancouver",
        score: 92,
        journey: "Year 5, Day 300",
      },
      {
        rank: 4,
        email: "chris@email.com",
        name: "Chris",
        socialLinks: [
          {
            platform: "x",
            url: "https://x.com/chrisbeats",
            handle: "@chrisbeats",
          },
        ],
        country: "USA 🇺🇸",
        city: "New York",
        score: 89,
        journey: "Year 5, Day 301",
      },
      {
        rank: 5,
        email: "sophie@email.com",
        name: "Sophie",
        socialLinks: [
          {
            platform: "instagram",
            url: "https://instagram.com/sophie.wav",
            handle: "@sophie.wav",
          },
        ],
        country: "UK 🇬🇧",
        city: "London",
        score: 85,
        journey: "Year 5, Day 302",
      },
      {
        rank: 6,
        email: "kenji@email.com",
        name: "Kenji",
        socialLinks: [
          {
            platform: "youtube",
            url: "https://youtube.com/@kenjibeats",
            handle: "@kenjibeats",
          },
        ],
        country: "Japan 🇯🇵",
        city: "Tokyo",
        score: 82,
        journey: "Year 5, Day 303",
      },
      {
        rank: 7,
        email: "lucas@email.com",
        name: "Lucas",
        socialLinks: [
          {
            platform: "instagram",
            url: "https://instagram.com/lucasbeats",
            handle: "@lucasbeats",
          },
        ],
        country: "Brazil 🇧🇷",
        city: "São Paulo",
        score: 80,
        journey: "Year 5, Day 304",
      },
      {
        rank: 8,
        email: "emma@email.com",
        name: "Emma",
        socialLinks: [
          {
            platform: "instagram",
            url: "https://instagram.com/emmawave",
            handle: "@emmawave",
          },
        ],
        country: "France 🇫🇷",
        city: "Paris",
        score: 78,
        journey: "Year 5, Day 305",
      },
      {
        rank: 9,
        email: "li@email.com",
        name: "Li Wei",
        socialLinks: [
          {
            platform: "tiktok",
            url: "https://tiktok.com/@liweibeats",
            handle: "@liweibeats",
          },
        ],
        country: "China 🇨🇳",
        city: "Shanghai",
        score: 76,
        journey: "Year 5, Day 306",
      },
      {
        rank: 10,
        email: "noah@email.com",
        name: "Noah",
        socialLinks: [
          {
            platform: "youtube",
            url: "https://youtube.com/@noahbeats",
            handle: "@noahbeats",
          },
        ],
        country: "Australia 🇦🇺",
        city: "Sydney",
        score: 74,
        journey: "Year 5, Day 307",
      },
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