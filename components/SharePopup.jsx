'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Share } from 'lucide-react'

export default function SharePopup({ url }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button title="Share this post" variant="outline" aria-label="Share this post" className="text-xs sm:text-sm">
          <Share className='mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4' />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm backdrop-blur mx-4 sm:mx-0">
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg text-overflow-safe">Share this post</DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-overflow-safe">
            Copy the link below to share this post with others.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <input
            readOnly
            value={url}
            onFocus={(e) => e.target.select()}
            className="w-full rounded border border-gray-300 px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary text-overflow-safe"
          />
        </div>
        <DialogFooter className="mt-4 flex justify-between">
          <Button variant="outline" onClick={handleCopy} className="text-xs sm:text-sm">
            {copied ? 'Copied!' : 'Copy link'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
