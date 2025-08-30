'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const Page = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [error, setError] = useState('')
  useEffect(()=>{
    if (localStorage.getItem('auth') === 'true') {
      setAuthenticated(true);
      setError('');
    }
  },[]);
  const handleLogin = async (e) => {
    e.preventDefault()

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    })

    const data = await res.json()

    if (res.ok && data.success || localStorage.getItem('auth')=='true') {
      setAuthenticated(true)
      localStorage.setItem('auth','true')
      setError('')
    } else {
      setError(data.error || 'Invalid email or password')
    }
  }

  if (!authenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <form
          onSubmit={handleLogin}
          className="p-4 sm:p-6 space-y-4 w-full max-w-[300px] bg-black/50 backdrop-blur shadow rounded-lg"
        >
          <h2 className="text-lg sm:text-xl font-bold text-center text-overflow-safe">Admin Login</h2>
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 sm:p-3 rounded text-sm sm:text-base"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 sm:p-3 rounded text-sm sm:text-base"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-xs sm:text-sm text-center text-overflow-safe">{error}</p>}
          <button
            type="submit"
            className="w-full bg-black text-white p-2 sm:p-3 rounded hover:bg-gray-800 text-sm sm:text-base transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-lg sm:text-xl font-semibold rounded-lg px-4">
      <div className='backdrop-blur bg-black/50 p-6 sm:p-10 justify-between rounded-lg text-overflow-safe'>
        <h1 className='text-xl sm:text-2xl mb-4 text-center'>Welcome Aashish!</h1>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <div className="text-center sm:text-left">
            <h2 className='text-base sm:text-lg underline mb-2'>Posts</h2>
            <div className="flex flex-col gap-1">
              <Link href="/admin/add-post">
                <Button variant="link" className="text-sm sm:text-base">Add Post</Button>
              </Link>
              <Link href="/admin/manage-posts">
                <Button variant="link" className="text-sm sm:text-base">Manage Posts</Button>
              </Link>
            </div>
          </div>
          <div className="text-center sm:text-left">
            <h1 className='text-base sm:text-lg underline mb-2'>Ideas</h1>
            <Link href="/admin/manage-ideas">
              <Button variant="link" className="text-sm sm:text-base">Manage Ideas</Button>
            </Link>
          </div>
        </div>
        <div className='text-center mt-6'>
          <button
            onClick={async () => {
              await fetch('/api/admin/logout', {
                method: 'POST',
                credentials: 'include',
              })
              localStorage.setItem('auth','')
              window.location.href = '/admin'
            }}
            className="bg-red-500 text-white px-3 sm:px-4 py-2 text-center rounded text-sm sm:text-base hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Page
