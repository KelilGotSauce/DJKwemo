import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import CheckoutSession from "../models/CheckoutSession.js";

dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

router.post("/create-checkout-session", async (req, res) => {
  try {
    console.log("CLIENT_URL:", CLIENT_URL);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Become a Believer",
            },
            unit_amount: 1600,
          },
          quantity: 1,
        },
      ],
      success_url: `${CLIENT_URL}/claim-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${CLIENT_URL}`,
      customer_creation: "always",
    });

    await CheckoutSession.findOneAndUpdate(
      { sessionId: session.id },
      {
        sessionId: session.id,
        email: session.customer_details?.email || session.customer_email || "",
        paymentStatus: "pending",
        formCompleted: false,
      },
      { upsert: true, new: true }
    );

    res.json({ url: session.url });
  } catch (error) {
    console.error("create-checkout-session error:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

router.get("/session/:sessionId", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);

    res.json({
      id: session.id,
      payment_status: session.payment_status,
      customer_email: session.customer_details?.email || session.customer_email || "",
      amount_total: session.amount_total,
      currency: session.currency,
    });
  } catch (error) {
    console.error("Session fetch error:", error.message);
    res.status(500).json({ error: "Failed to retrieve session" });
  }
});

export default router;