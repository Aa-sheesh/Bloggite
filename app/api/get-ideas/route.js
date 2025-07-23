import connectDB from "@/lib/db";
import Idea from "@/lib/models/Idea";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const ideas = await Idea.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, ideas }, { status: 200 });
  } catch (error) {
    console.error("Error fetching ideas", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch ideas" },
      { status: 500 }
    );
  }
}
