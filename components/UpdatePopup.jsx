'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { toast } from 'sonner'
import { ListCheck } from 'lucide-react'

const UpdatePopup = () => {
  const [ideas, setIdeas] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchIdeas = async () => {
    try {
      const res = await fetch('/api/get-ideas')
      const data = await res.json()

      if (data.success) {
        setIdeas(data.ideas)
      } else {
        toast.error('Failed to fetch updates')
      }
    } catch (err) {
      toast.error('Error loading updates')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchIdeas()
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="shadow-lg rounded-full px-5 py-3 backdrop-blur">
            <span className="hidden  sm:inline">Updates</span>
            <span className="inline sm:hidden"><ListCheck /></span>
          </Button>
        </PopoverTrigger>

        <PopoverContent
          side="top"
          align="end"
          className="w-80 max-h-96 overflow-y-auto backdrop-blur border border-white/10 text-white bg-black/60"
        >
          <div className="grid gap-4">
            <div className="space-y-2 text-center">
              <h4 className="text-lg font-semibold">🚀 Future Updates</h4>
              <p className="text-muted-foreground text-sm">
                See what's coming next in Bloggite!
              </p>
            </div>

            <div className="grid gap-3">
              {loading ? (
                <p className="text-sm text-center">Loading...</p>
              ) : ideas.length === 0 ? (
                <p className="text-sm text-center text-muted-foreground">
                  No updates available.
                </p>
              ) : (
                ideas.map((idea) => (
                  <div
                    key={idea._id}
                    className="border border-white/10 rounded p-3 bg-white/5 text-sm"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-semibold">{idea.description}</p>
                      {idea.status && (
                        <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-muted-foreground">
                          {idea.status}
                        </span>
                      )}
                    </div>
                    {idea.details && (
                      <p className="text-xs text-muted-foreground">{idea.details}</p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          <footer className="mt-4 opacity-60 text-xs text-center border-t pt-2 border-white/10">
            Got ideas? Email: <br />
            <span className="underline">aashishs4912345@gmail.com</span>
          </footer>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default UpdatePopup
