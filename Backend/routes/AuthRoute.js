import express from "express";
import Leaderboard from "../models/Leaderboard.js";
import LoginCode from "../models/LoginCode.js";
import { requireAuth, setAuthCookie } from "../utils/auth.js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const router = express.Router();

// Request login code
router.post("/request-code", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const believer = await Leaderboard.findOne({ email: normalizedEmail });

    if (!believer) {
      return res.status(404).json({ error: "No believer account found for this email" });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await LoginCode.deleteMany({ email: normalizedEmail });

    await LoginCode.create({
      email: normalizedEmail,
      code,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    // MVP: log it in terminal
    console.log(`Login code for ${normalizedEmail}: ${code}`);

    const resendResponse = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: normalizedEmail,
      subject: `Your DJKwemo Login Code - ${code}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Your Login Code</h2>
          <p>Use this code to log in:</p>
          <h1>${code}</h1>
          <p>This code expires in 10 minutes.</p>
        </div>
      `,
    });

    return res.json({ message: "Login code sent" });
  } catch (error) {
    console.error("request-code error:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

// Verify login code
router.post("/verify-code", async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ error: "Email and code are required" });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const loginCode = await LoginCode.findOne({
      email: normalizedEmail,
      code,
    });

    if (!loginCode) {
      return res.status(400).json({ error: "Invalid code" });
    }

    if (loginCode.expiresAt < new Date()) {
      return res.status(400).json({ error: "Code expired" });
    }

    await LoginCode.deleteMany({ email: normalizedEmail });

    setAuthCookie(res, normalizedEmail);

    const believer = await Leaderboard.findOne({ email: normalizedEmail });

    return res.json({
      message: "Login successful",
      believer,
    });
  } catch (error) {
    console.error("verify-code error:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

// Current session
router.get("/me", requireAuth, async (req, res) => {
  try {
    const believer = await Leaderboard.findOne({ email: req.user.email });

    return res.json({
      authenticated: true,
      email: req.user.email,
      believer,
    });
  } catch (error) {
    console.error("auth/me error:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false, // true in production
  });

  return res.json({ message: "Logged out" });
});

export default router;