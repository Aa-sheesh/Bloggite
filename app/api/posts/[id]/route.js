import { NextResponse } from 'next/server'
import mongoose from 'mongoose'
import Post from '@/lib/models/Post'
import connectDB from '@/lib/db'

export async function GET(req, { params }) {
  const { id } = params

  try {
    await connectDB()

    // Validate if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid post ID' },
        { status: 400 }
      )
    }

    const post = await Post.findById(id).lean()

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, post }, { status: 200 })
  } catch (error) {
    console.error('❌ Error fetching post by ID:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch post' },
      { status: 500 }
    )
  }
}
