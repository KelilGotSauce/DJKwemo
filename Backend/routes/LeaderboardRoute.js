import express from "express";
import Leaderboard from "../models/Leaderboard.js";

const router = express.Router();

// Get all leaderboard entries
router.get("/", async (req, res) => {
  try {
    const entries = await Leaderboard.find().sort({ rank: 1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new believer
router.post("/", async (req, res) => {
  try {
    const { rank, name, social, journeyDay } = req.body;

    // Optional: check duplicate by name
    const existing = await Leaderboard.findOne({ name });
    if (existing) return res.status(400).json({ message: "Believer already exists" });

    const newEntry = new Leaderboard({ rank, name, social, journeyDay });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;