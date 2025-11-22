// Migration script to add slugs to existing posts
// Run this once: node --loader ./node_modules/next/dist/build/webpack/loaders/next-flight-loader/index.js lib/migrate-slugs.js
// Or simpler: Create an API route to run this migration

import mongoose from 'mongoose'
import Post from './models/Post.js'
import { generateSlug } from './utils.js'
import connectDB from './db.js'

async function migrateSlugs() {
  try {
    await connectDB()
    console.log('✅ Connected to database')

    const posts = await Post.find({ $or: [{ slug: { $exists: false } }, { slug: null }, { slug: '' }] })

    if (posts.length === 0) {
      console.log('✅ All posts already have slugs')
      process.exit(0)
    }

    console.log(`📝 Found ${posts.length} posts without slugs`)

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
      console.log(`✅ Added slug "${uniqueSlug}" to post: ${post.title}`)
    }

    console.log(`\n✅ Migration complete! Added slugs to ${posts.length} posts`)
    process.exit(0)
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

migrateSlugs()

