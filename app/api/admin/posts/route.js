import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import mongoose from 'mongoose'
import Post from '@/models/Post' // Assuming you have this Mongoose model

// Connect DB
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return
  await mongoose.connect(process.env.MONGODB_URI)
}

// Auth helper
function isAdmin() {
  const token = cookies().get('admin-token')?.value
  return token === process.env.ADMIN_SECRET_KEY
}

export async function POST(req) {
  if (!isAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await connectDB()
  const { title, body, content, date } = await req.json()

  const post = new Post({ title, body, content, date })
  await post.save()

  return NextResponse.json({ success: true, post }, { status: 201 })
}
