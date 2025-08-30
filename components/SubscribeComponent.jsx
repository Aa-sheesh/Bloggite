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
    <footer className='text-center px-4 py-6'>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto">
        <input
          title="Enter your email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="abc@gmail.com"
          className="bg-black/50 backdrop-blur p-2 sm:p-3 rounded-l-md sm:rounded-l-md rounded-r-md sm:rounded-r-none focus:outline-none focus:ring-0 w-full sm:w-auto text-sm sm:text-base"
        />
        <button
          onClick={handleSubscribe}
          title='Subscribe'
          className='bg-black p-2 sm:p-3 rounded-r-md sm:rounded-r-md rounded-l-md sm:rounded-l-none w-full sm:w-auto text-sm sm:text-base hover:bg-gray-800 transition-colors'
        >
          Subscribe!
        </button>
      </div>
    </footer>
  )
}

export default SubscribeComponent
