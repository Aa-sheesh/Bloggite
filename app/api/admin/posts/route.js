import { NextResponse } from 'next/server'
import mongoose from 'mongoose'
import Post from '@/lib/models/Post'
import { cookies } from 'next/headers'
import { sendNewPostEmail } from '@/lib/email'
import { generateSlug } from '@/lib/utils'

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
  const { title, content,body, thumbnail, date } = await req.json()

  // Generate slug from title
  let slug = generateSlug(title)
  
  // Ensure slug is unique by appending a number if needed
  let uniqueSlug = slug
  let counter = 1
  while (await Post.findOne({ slug: uniqueSlug })) {
    uniqueSlug = `${slug}-${counter}`
    counter++
  }

  const post = new Post({ title, content, body, thumbnail, date, slug: uniqueSlug })
  await post.save()

  // Send email to all subscribers
  try {
    await sendNewPostEmail(post)
  } catch (error) {
    console.error('Failed to send email notification:', error)
    // Don't fail the post creation if email fails
  }

  return NextResponse.json({ success: true, post }, { status: 201 })
}
