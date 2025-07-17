import { NextResponse } from 'next/server'
import mongoose from 'mongoose'
import Post from '@/lib/models/Post'
import { cookies } from 'next/headers'

// Connect DB
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return
  await mongoose.connect(process.env.MONGODB_URI)
}



function isAdminAuthenticated() {
  const token = cookies().get('admin-token')?.value
  return token === process.env.ADMIN_SECRET_KEY
}



export async function POST(req) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await connectDB()
  const { title, content, thumbnail, date } = await req.json()

  const post = new Post({ title, content, thumbnail, date })
  await post.save()

  return NextResponse.json({ success: true, post }, { status: 201 })
}
