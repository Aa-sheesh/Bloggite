'use client'
import React, { useState } from 'react'
import { toast } from 'sonner'

const SubscribeComponent = () => {
  const [email, setEmail] = useState('')

  const handleSubscribe = async () => {
    if (!email.includes('@')) {
      toast.error("Enter a valid email")
      return
    }

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const result = await res.json()

      if (res.ok) {
        toast.success(result.message)
        setEmail('')
      } else {
        toast.error(result.error)
      }
    } catch (err) {
      toast.error("Something went wrong.")
    }
  }

  return (
    <footer className='text-center'>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="abc@gmail.com"
        className="bg-white/50 p-2 rounded-l-md focus:outline-none focus:ring-0"
      />
      <button
        onClick={handleSubscribe}
        className='bg-black p-2 rounded-r-md'
      >
        Subscribe!
      </button>
    </footer>
  )
}

export default SubscribeComponent
