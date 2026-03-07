import mongoose from "mongoose";

const loginCodeSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

loginCodeSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("LoginCode", loginCodeSchema);