import connectDB from '@/lib/db'
import Post from '@/lib/models/Post'
import React from 'react'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  await connectDB()
  const posts = await Post.find({}, '_id').lean()

  return posts.map((post) => ({
    id: post._id.toString(),
  }))
}

// ✅ FIXED: Don't destructure 'params' directly in the argument
const Page = async (props) => {
  const { params } = props
  const { id } = params

  await connectDB()

  if (!id) return notFound()

  const post = await Post.findById(id).lean()

  if (!post) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] px-4">
        <h1 className="text-center text-xl font-semibold italic text-white">
          Post not found.
        </h1>
      </div>
    )
  }

  return (
    <div className="flex justify-center min-h-[80vh] px-4">
      <div className="bg-black/40 backdrop-blur-sm text-white rounded-lg p-6 md:p-8 max-w-3xl w-full shadow-lg">
        <h1 className="text-2xl md:text-4xl font-bold italic mb-4 text-center">
          {post.title}
        </h1>

        {post.body && (
          <p className="text-lg opacity-80 mb-4 text-center">{post.body}</p>
        )}

        {post.content && (
          <p className="text-base md:text-lg leading-relaxed mb-6 text-justify">
            {post.content}
          </p>
        )}

        <p className="text-right text-sm text-white/50 italic">
          {post.date ? new Date(post.date).toDateString() : 'Unknown date'}
        </p>
      </div>
    </div>
  )
}

export default Page
