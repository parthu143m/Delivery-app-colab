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

  
  const today = new Date().toISOString().split("T")[0];
  const counterKey = `orderId-${today}`;

  
  const counter = await Counter.findByIdAndUpdate(
    counterKey,
    { $inc: { seq: 1 } },
    { upsert: true, new: true }
  );

  const seq = counter.seq;


  
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  const timestamp = parseInt(`${hh}${mm}${ss}`, 10);


  const uniqueNumber = timestamp + seq +1000;
  return `ORD-${uniqueNumber}`;
}
