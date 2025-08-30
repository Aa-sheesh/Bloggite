'use client'

import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const IdeaManager = () => {
  const [ideas, setIdeas] = useState([])
  const [loading, setLoading] = useState(true)

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const [description, setDescription] = useState('')
  const [details, setDetails] = useState('')
  const [status, setStatus] = useState('💡 Idea')

  const fetchIdeas = async () => {
    try {
      const res = await fetch('/api/get-ideas')
      const data = await res.json()
      if (data.success) {
        setIdeas(data.ideas)
      } else {
        toast.error('Failed to load ideas')
      }
    } catch (err) {
      toast.error('Error loading ideas')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setDescription('')
    setDetails('')
    setStatus('💡 Idea')
    setEditingId(null)
    setIsEdit(false)
  }

  const handleAddOrUpdate = async () => {
    if (!description.trim()) {
      toast.error('Description required')
      return
    }

    const payload = { description, details, status }

    try {
      const res = await fetch(
        isEdit ? `/api/admin/edit-idea` : `/api/admin/update-ideas`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(isEdit ? { ...payload, id: editingId } : payload),
        }
      )

      const data = await res.json()

      if (res.ok) {
        toast.success(isEdit ? 'Idea updated' : 'Idea added')
        resetForm()
        setIsDialogOpen(false)
        fetchIdeas()
      } else {
        toast.error(data.error || 'Failed to save idea')
      }
    } catch (err) {
      toast.error('Network error')
    }
  }

  const handleDelete = async (id) => {
    const confirmed = confirm('Are you sure you want to delete this idea?')
    if (!confirmed) return

    try {
      const res = await fetch(`/api/admin/delete-idea`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })

      if (res.ok) {
        toast.success('Idea deleted')
        fetchIdeas()
      } else {
        toast.error('Failed to delete idea')
      }
    } catch (err) {
      toast.error('Network error')
    }
  }

  const handleEdit = (idea) => {
    setDescription(idea.description)
    setDetails(idea.details)
    setStatus(idea.status || '💡 Idea')
    setEditingId(idea._id)
    setIsEdit(true)
    setIsDialogOpen(true)
  }

  useEffect(() => {
    fetchIdeas()
  }, [])

  return (
    <section className="max-w-5xl mt-2  bg-black/50  mx-auto py-10 px-6 backdrop-blur rounded-lg text-white">
      <div className="text-center mb-6  " >
        <Button variant="link" onClick={() => setIsDialogOpen(true)}>Add New Idea</Button>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : ideas.length === 0 ? (
        <p className="text-center">No ideas found.</p>
      ) : (
        <ul className="space-y-4">
          {ideas.map((idea) => (
            <li
              key={idea._id}
              className="bg-black/30 backdrop-blur p-4 rounded-lg"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{idea.description}</h3>
                  <p className="text-sm opacity-80">{idea.details}</p>
                  <p className="text-sm mt-1 italic opacity-70">{idea.status}</p>
                </div>
                <div className="flex gap-2 mt-1">
                  <Button
                    variant="link"
                    className="text-sm"
                    onClick={() => handleEdit(idea)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="link"
                    className="text-sm text-red-400"
                    onClick={() => handleDelete(idea._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Add / Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md backdrop-blur text-white">
          <DialogHeader>
            <DialogTitle >{isEdit ? 'Edit Idea' : 'Add New Idea'}</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <Input
              placeholder="Short description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Textarea
              placeholder="More details (optional)"
              rows={3}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
            <Input
              placeholder="Status (e.g. 🚀 In Progress)"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>

          <DialogFooter className="mt-4">
            <Button
              variant="link"
              onClick={() => {
                resetForm()
                setIsDialogOpen(false)
              }}
            >
              Cancel
            </Button>
            <Button variant="link" onClick={handleAddOrUpdate}>
              {isEdit ? 'Update' : 'Submit'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}

export default IdeaManager
