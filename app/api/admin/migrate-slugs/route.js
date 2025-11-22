// API route to migrate existing posts to have slugs
// Call: POST /api/admin/migrate-slugs
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import Post from '@/lib/models/Post'
import { generateSlug } from '@/lib/utils'
import connectDB from '@/lib/db'

function isAdminAuthenticated() {
  const token = cookies().get('admin-token')?.value
  return token === process.env.ADMIN_SECRET_KEY
}

export async function POST() {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await connectDB()

    const posts = await Post.find({ 
      $or: [
        { slug: { $exists: false } }, 
        { slug: null }, 
        { slug: '' }
      ] 
    })

    if (posts.length === 0) {
      return NextResponse.json({ 
        success: true, 
        message: 'All posts already have slugs',
        migrated: 0 
      })
    }

    let migrated = 0
    for (const post of posts) {
      let slug = generateSlug(post.title)
      
      // Ensure slug is unique
      let uniqueSlug = slug
      let counter = 1
      while (await Post.findOne({ slug: uniqueSlug, _id: { $ne: post._id } })) {
        uniqueSlug = `${slug}-${counter}`
        counter++
      }

      post.slug = uniqueSlug
      await post.save()
      migrated++
    }

    return NextResponse.json({ 
      success: true, 
      message: `Successfully migrated ${migrated} posts`,
      migrated 
    })
  } catch (error) {
    console.error('Migration error:', error)
    return NextResponse.json(
      { success: false, error: 'Migration failed' },
      { status: 500 }
    )
  }
}

