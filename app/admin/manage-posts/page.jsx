'use client'

import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const ManagePosts = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts')
      const data = await res.json()
      setPosts(data.posts || [])
    } catch (err) {
      toast.error('Failed to fetch posts')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this post?')
    if (!confirm) return

    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        toast.success('Post deleted')
        fetchPosts()
      } else {
        toast.error('Failed to delete post')
      }
    } catch (err) {
      toast.error('Error deleting post')
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  if (loading) return <p className="text-center mt-10">Loading posts...</p>

  return (
    <section className="px-6 py-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center font-ubuntuMono">
        Manage Posts
      </h1>

      {posts.length === 0 ? (
        <p className="text-center">No posts found.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-black/30 backdrop-blur text-white p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="text-sm opacity-70">{post.date || 'No date'}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => alert('Implement edit modal')}
                  className="bg-yellow-500 text-black px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="bg-red-600 px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default ManagePosts
