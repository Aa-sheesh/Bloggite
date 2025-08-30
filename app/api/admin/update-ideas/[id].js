import connectDB from "@/lib/db";
import Idea from "@/lib/models/Idea";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function PATCH(req, { params }) {
  const token = cookies().get('admin-token')?.value;
  if (token !== process.env.ADMIN_SECRET_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectDB();

  try {
    const { description, details } = await req.json();

    const updated = await Idea.findByIdAndUpdate(
      params.id,
      { description, details },
      { new: true }
    );

    return NextResponse.json({ success: true, idea: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}
