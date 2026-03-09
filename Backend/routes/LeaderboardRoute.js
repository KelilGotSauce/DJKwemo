import express from "express";
import Leaderboard from "../models/Leaderboard.js";
import CheckoutSession from "../models/CheckoutSession.js";
import { requireAuth, setAuthCookie } from "../utils/auth.js";
import { getNextRank } from "../utils/getNextRank.js";


const router = express.Router();

// Get leaderboard
router.get("/", async (req, res) => {
  try {
    const believers = await Leaderboard.find().sort({ rank: 1 });
    res.json(believers);
  } catch (error) {
    console.error("GET /leaderboard error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Claim believer
router.post("/claim", async (req, res) => {
  
  try {
    const { sessionId, name, social, country, city } = req.body;

    if (!sessionId || !name) {
      return res.status(400).json({ error: "Session ID and name are required" });
    }

    const checkout = await CheckoutSession.findOne({ sessionId });

    if (!checkout) {
      return res.status(400).json({ error: "Session not found" });
    }

    if (checkout.paymentStatus !== "paid") {
      return res.status(400).json({ error: "Payment not completed" });
    }

    if (checkout.formCompleted) {
      return res.status(400).json({ error: "This session has already been claimed" });
    }

    const normalizedEmail = checkout.email.toLowerCase().trim();

    const existingBeliever = await Leaderboard.findOne({ email: normalizedEmail });

    if (existingBeliever) {
      return res.status(400).json({ error: "This email already has a believer profile" });
    }

    const rank = await getNextRank();

    const believer = await Leaderboard.create({
      rank,
      email: normalizedEmail,
      name: name.trim(),
      social: social?.trim() || "",
      country: country?.trim() || "",
      city: city?.trim() || "",
      score: 100,
      journey: "Year 5, Day 298",
    });

    checkout.formCompleted = true;
    await checkout.save();

    // Auto-login after successful claim
    setAuthCookie(res, checkout.email);

    return res.json({
      message: "Believer claimed successfully",
      believer,
    });
  } catch (error) {
    console.error("POST /leaderboard/claim error:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

router.post("/claim2", async (req, res) => {
  
  try {
    const { sessionId, name, social, country, city } = req.body;

    if (!sessionId || !name) {
      return res.status(400).json({ error: "Session ID and name are required" });
    }

    const checkout = await CheckoutSession.findOne({ sessionId });

    if (!checkout) {
      return res.status(400).json({ error: "Session not found" });
    }

    if (checkout.paymentStatus !== "paid") {
      return res.status(400).json({ error: "Payment not completed" });
    }

    if (checkout.formCompleted) {
      return res.status(400).json({ error: "This session has already been claimed" });
    }

    const normalizedEmail = checkout.email.toLowerCase().trim();

    const existingBeliever = await Leaderboard.findOne({ email: normalizedEmail });

    if (existingBeliever) {
      return res.status(400).json({ error: "This email already has a believer profile" });
    }

    const rank = await getNextRank();

    const believer = await Leaderboard.create({
      rank,
      email: normalizedEmail,
      name: name.trim(),
      social: social?.trim() || "",
      country: country?.trim() || "",
      city: city?.trim() || "",
      score: 100,
      journey: "Year 5, Day 298",
    });

    checkout.formCompleted = true;
    await checkout.save();

    // Auto-login after successful claim
    setAuthCookie(res, checkout.email);

    return res.json({
      message: "Believer claimed successfully",
      believer,
    });
  } catch (error) {
    console.error("POST /leaderboard/claim error:", error);
    return res.status(500).json({ error: "Server error" });
  }
});


// Edit own believer profile
router.patch("/me", requireAuth, async (req, res) => {
  try {
    const { name, social, country, city } = req.body;

    const believer = await Leaderboard.findOne({ email: req.user.email });

    if (!believer) {
      return res.status(404).json({ error: "Believer not found" });
    }

    if (typeof name === "string") believer.name = name.trim();
    if (typeof social === "string") believer.social = social.trim();
    if (typeof country === "string") believer.country = country.trim();
    if (typeof city === "string") believer.city = city.trim();

    await believer.save();

    return res.json({
      message: "Profile updated",
      believer,
    });
  } catch (error) {
    console.error("PATCH /leaderboard/me error:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;