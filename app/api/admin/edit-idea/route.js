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
    const { id, description, details, status } = await req.json();

    const updated = await Idea.findByIdAndUpdate(
      id,
      { description, details, status },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ success: false, error: "Idea not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, idea: updated }, { status: 200 });
  } catch (e) {
    console.error("Error editing idea", e);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
