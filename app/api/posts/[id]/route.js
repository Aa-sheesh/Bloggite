import { NextResponse } from 'next/server'
import mongoose from 'mongoose'
import Post from '@/lib/models/Post'
import connectDB from '@/lib/db'

export async function GET(req, { params }) {
  const { id } = params

  try {
    await connectDB()

    let post = null

    // Try to find by slug first (if it's not a valid ObjectId)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      post = await Post.findOne({ slug: id }).lean()
    } else {
      // Try to find by ID
      post = await Post.findById(id).lean()
      
      // If not found by ID, try slug as fallback
      if (!post) {
        post = await Post.findOne({ slug: id }).lean()
      }
    }

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, post }, { status: 200 })
  } catch (error) {
    console.error('❌ Error fetching post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch post' },
      { status: 500 }
    )
  }
}
