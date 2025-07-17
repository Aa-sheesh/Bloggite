'use client'

import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const ManagePosts = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPost, setEditingPost] = useState(null)

  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')
  const [editContent, setEditContent] = useState('')
  const [editThumbnail, setEditThumbnail] = useState('')


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

  const openEditDialog = (post) => {
    setEditingPost(post)
    setEditTitle(post.title || '')
    setEditBody(post.body || '')
    setEditContent(post.content || '')
    setEditThumbnail(post.thumbnail || '')
    setIsDialogOpen(true)
  }

  const handleEditSave = async () => {
    try {
      const res = await fetch(`/api/admin/posts/${editingPost._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editTitle,
          body: editBody,
          content: editContent,
          thumbnail: editThumbnail,
        }),
      })

      if (res.ok) {
        toast.success('Post updated')
        fetchPosts()
        setIsDialogOpen(false)
      } else {
        toast.error('Failed to update post')
      }
    } catch (err) {
      toast.error('Error updating post')
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
                  <Button
                    variant="link"
                    onClick={() => openEditDialog(post)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="link"
                    onClick={() => handleDelete(post._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md backdrop-blur">
            <DialogHeader>
              <DialogTitle>Edit Post</DialogTitle>
            </DialogHeader>

            <div className="space-y-3">
              <Input
                placeholder="Title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />

              <Input
                placeholder="Body"
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
              />

              <Textarea
                placeholder="Content"
                rows={4}
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />

              <Input
                placeholder="Thumbnail URL (https://...)"
                value={editThumbnail}
                onChange={(e) => setEditThumbnail(e.target.value)}
              />
            </div>

            <DialogFooter className="mt-4">
              <Button variant="link" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="link" onClick={handleEditSave}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>
  )
}

export default ManagePosts
