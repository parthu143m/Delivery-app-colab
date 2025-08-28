import mongoose from "mongoose";
import connectionToDatabase from "./mongoose.js";

// Counter Schema
const counterSchema = new mongoose.Schema({
  _id: String,
  seq: { type: Number, default: 0 },
});
const Counter = mongoose.models.Counter || mongoose.model("Counter", counterSchema);

export async function generateOrderId() {
  await connectionToDatabase();

  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const counterKey = `orderId-${today}`;

  // ✅ This increment is atomic (safe against concurrency)
  const counter = await Counter.findByIdAndUpdate(
    counterKey,
    { $inc: { seq: 1 } },
    { upsert: true, new: true }
  );

  const seq = counter.seq.toString().padStart(6, "0"); // e.g. 000001, 000002...

  // ✅ Final Order ID format (Unique per request)
  return `ORD-${today.replace(/-/g, "")}-${seq}`;
}
