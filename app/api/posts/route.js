import { NextResponse } from 'next/server'
import mongoose from 'mongoose'
import Post from '@/lib/models/Post' // Ensure this path is correct for your project
import connectDB from '@/lib/db'

export async function GET() {
  try {
    await connectDB()

    const posts = await Post.find({}).sort({ createdAt: -1 }) // optional: latest first

    return NextResponse.json({ success: true, posts }, { status: 200 })
  } catch (error) {
    console.error('❌ Failed to fetch posts:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}
