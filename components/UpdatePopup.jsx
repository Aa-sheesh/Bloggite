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
    <div className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-50">
      <Popover >
        <PopoverTrigger asChild>
          <Button variant="outline" title="Future Updates" className="shadow-lg rounded-full bg-black/50 px-3 sm:px-5 py-2 sm:py-3 backdrop-blur border-white/10 text-xs sm:text-sm">
            <span className="hidden sm:inline">Updates</span>
            <span className="inline sm:hidden"><ListCheck className="w-4 h-4" /></span>
          </Button>
        </PopoverTrigger>

        <PopoverContent
          side="top"
          align="start"
          className="w-72 sm:w-80 max-h-80 sm:max-h-96 overflow-y-auto backdrop-blur border border-white/10 text-white bg-black/60 mx-2 sm:mx-0"
        >
          <div className="grid gap-3 sm:gap-4">
            <div className="space-y-2 text-center">
              <h4 className="text-base sm:text-lg font-semibold">🚀 Future Updates</h4>
              <p className="text-muted-foreground text-xs sm:text-sm text-overflow-safe">
                See what's coming next in Bloggite!
              </p>
            </div>

            <div className="grid gap-2 sm:gap-3">
              {ideas.map((idea) => (
                <div key={idea._id} className="bg-gray-800/50 p-2 sm:p-3 rounded-lg text-overflow-safe">
                  <h5 className="font-medium text-xs sm:text-sm mb-1 text-overflow-safe">{idea.title}</h5>
                  <p className="text-xs text-gray-300 text-overflow-safe leading-relaxed">{idea.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-400">
                      {idea.status}
                    </span>
                    <span className="text-xs text-gray-400">
                      {idea.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default UpdatePopup
