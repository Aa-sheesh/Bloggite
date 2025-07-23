import { cookies } from "next/headers";
import connectDB from "@/lib/db";
import Idea from "@/lib/models/Idea";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const token = cookies().get("admin-token")?.value;
    if (token !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { description, details, status } = await req.json();

    const idea = new Idea({ description, details, status });
    await idea.save();

    return NextResponse.json({ success: true, idea }, { status: 201 });
  } catch (e) {
    console.error("Error adding idea", e);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
