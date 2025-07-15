import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import Post from '@/lib/models/Post'

// PATCH /api/admin/posts/:id → update post
export async function PATCH(req, { params }) {
  try {
    await connectDB()
    const { id } = params
    const update = await req.json()

    const updatedPost = await Post.findByIdAndUpdate(id, update, { new: true })

    if (!updatedPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Post updated', post: updatedPost }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// DELETE /api/admin/posts/:id → delete post
export async function DELETE(_, { params }) {
  try {
    await connectDB()
    const { id } = params

    const deleted = await Post.findByIdAndDelete(id)

    if (!deleted) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Post deleted' }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
