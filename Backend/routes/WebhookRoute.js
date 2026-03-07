import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import CheckoutSession from "../models/CheckoutSession.js";

dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post(
  "/",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      try {
        await CheckoutSession.findOneAndUpdate(
          { sessionId: session.id },
          {
            sessionId: session.id,
            email: session.customer_details?.email || session.customer_email || "",
            paymentStatus: "paid",
            formCompleted: false,
          },
          { upsert: true, new: true }
        );

        console.log("Checkout session saved:", session.id);
      } catch (error) {
        console.error("Database error in webhook:", error.message);
        return res.status(500).json({ error: "Database error" });
      }
    }

    res.json({ received: true });
  }
);

export default router;