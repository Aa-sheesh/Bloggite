// app/api/admin/posts/[id]/route.js
import { NextResponse } from 'next/server'
import mongoose from 'mongoose'
import Post from '@/lib/models/Post'
import { cookies } from 'next/headers'

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return
  await mongoose.connect(process.env.MONGODB_URI)
}

// Auth check
function isAdminAuthenticated() {
  const token = cookies().get('admin-token')?.value
  return token === process.env.ADMIN_SECRET_KEY
}

// ✅ PATCH (update a post)
export async function PATCH(req, { params }) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await connectDB()
    const { id } = params
    const update = await req.json()

    const updatedPost = await Post.findByIdAndUpdate(id, update, { new: true })

    if (!updatedPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Post updated', post: updatedPost })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 })
  }
}

// ✅ DELETE (delete a post)
export async function DELETE(_, { params }) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await connectDB()
    const { id } = params

    const deletedPost = await Post.findByIdAndDelete(id)

    if (!deletedPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Post deleted successfully' })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 })
  }
}
