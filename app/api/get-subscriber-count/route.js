import connectDB from "@/lib/db";
import { Subscriber } from "@/lib/models/Subscriber";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const subscribers = await Subscriber.countDocuments({});

    return NextResponse.json({ success: true, subscribers }, { status: 200 });
  } catch (error) {
    console.error("Error fetching subscriber count", error);
    return NextResponse.json(
      { success: false, error: "Failed to get subscriber count" },
      { status: 500 }
    );
  }
}
