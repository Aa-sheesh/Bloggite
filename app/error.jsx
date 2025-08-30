// app/error.jsx
'use client'

import React, { useEffect } from 'react'

const Error = ({ error, reset }) => {
  useEffect(() => {
    console.error('Global error:', error)
  }, [error])

  return (
    <div className="min-h-[80vh]  flex flex-col items-center justify-center  text-white text-center px-4">
    <div className='bg-black/50 p-10 rounded-lg'>
      <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
      <p className="mb-6 text-sm opacity-80">
        An unexpected error occurred while loading the page.
      </p>
      <button
        title='Try Again'
        onClick={reset}
        className="px-5 py-2 bg-black/50 text-white rounded hover:bg-black transition-all"
      >
        Try Again
      </button>
      </div>
    </div>
  )
}

export default Error
