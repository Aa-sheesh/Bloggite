// app/error.jsx
'use client'

import React, { useEffect } from 'react'

const Error = ({ error, reset }) => {
  useEffect(() => {
    console.error('Global error:', error)
  }, [error])

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center  text-white text-center px-4">
      <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
      <p className="mb-6 text-sm opacity-80">
        An unexpected error occurred while loading the page.
      </p>
      <button
        onClick={reset}
        className="px-5 py-2 bg-white text-black rounded hover:bg-gray-300 transition-all"
      >
        Try Again
      </button>
    </div>
  )
}

export default Error
