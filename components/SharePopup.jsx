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
        <Button title="Share this post" variant="outline" aria-label="Share this post">
          <Share className='mr-2 h-4 w-4' />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm backdrop-blur">
        <DialogHeader>
          <DialogTitle>Share this post</DialogTitle>
          <DialogDescription>
            Copy the link below to share this post with others.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <input
            readOnly
            value={url}
            onFocus={(e) => e.target.select()}
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <DialogFooter className="mt-4 flex justify-between">
          <Button variant="outline" onClick={handleCopy}>
            {copied ? 'Copied!' : 'Copy link'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
