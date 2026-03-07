import Counter from "../models/Counter.js";

export const getNextRank = async () => {
  const counter = await Counter.findOneAndUpdate(
    { name: "believerRank" },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );

  return counter.value;
};