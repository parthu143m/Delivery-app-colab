import { NextResponse } from "next/server";
import connectionToDatabase from "../../../../lib/mongoose";
import Order from "../../../../models/Order";

export async function POST(request) {
  try {
    await connectionToDatabase();

    const { userId, items, restaurantId } = await request.json();

    if (!userId || !items || !restaurantId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const newOrder = new Order({
      userId,
      items,
      totalCount,
      totalPrice,
      restaurantId,
      orderDate: new Date(),
    });

    await newOrder.save();

    return NextResponse.json(newOrder, { status: 200 });
  } catch (err) {
    console.error("Order save error:", err);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
