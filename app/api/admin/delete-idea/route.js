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
    const { id } = await req.json();

    await Idea.findByIdAndDelete(id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e) {
    console.error("Error deleting idea", e);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
