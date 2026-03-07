import mongoose from "mongoose";

const checkoutSessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  paymentStatus: { type: String, default: "pending" },
  formCompleted: { type: Boolean, default: false },
});

export default mongoose.model("CheckoutSession", checkoutSessionSchema);