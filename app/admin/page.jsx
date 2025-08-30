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
      <div className="h-[80vh] flex items-center justify-center">
        <form
          onSubmit={handleLogin}
          className="p-6 space-y-4 w-[300px] bg-black/50 backdrop-blur shadow rounded-lg"
        >
          <h2 className="text-xl font-bold text-center">Admin Login</h2>
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
          >
            Login
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="h-[80vh] flex flex-col items-center justify-center  text-xl font-semibold rounded-lg">
      <div className='backdrop-blur bg-black/50  p-10 justify-between rounded-lg p-5'>
        <h1 className='text-2xl mb-2'>Welcome Aashish!</h1>
        <div className="flex gap-4 ">
          <div>
            <h2 className='text-lg underline'>Posts</h2>
            <Link href="/admin/add-post">
              <Button variant="link">Add Post</Button>
            </Link>
            <Link href="/admin/manage-posts">
              <Button variant="link">Manage Posts</Button>
            </Link>
          </div>
        </div>
        <div>
        <h1 className='text-md underline'>Ideas</h1>
          <Link href="/admin/manage-ideas">
            <Button variant="link">Manage Ideas</Button>
          </Link>
        </div>
        <div className='text-center'>
        <button
          onClick={async () => {
            await fetch('/api/admin/logout', {
              method: 'POST',
              credentials: 'include',
            })
            localStorage.setItem('auth','')
            window.location.href = '/admin'
          }}
          className="mt-6 bg-red-500 text-white px-4 py-2 text-center rounded"
        >
          Logout
        </button>
        </div>
      </div>
    </div>
  )
}

export default Page
