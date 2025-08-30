// app/error.jsx
'use client'

import React, { useEffect } from 'react'

const Error = ({ error, reset }) => {
  useEffect(() => {
    console.error('Global error:', error)
  }, [error])

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-white text-center px-4 sm:px-6">
      <div className='bg-black/50 p-6 sm:p-10 rounded-lg max-w-md w-full'>
        <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-overflow-safe">Something went wrong</h1>
        <p className="mb-4 sm:mb-6 text-xs sm:text-sm opacity-80 text-overflow-safe leading-relaxed">
          An unexpected error occurred while loading the page.
        </p>
        <button
          title='Try Again'
          onClick={reset}
          className="px-4 sm:px-5 py-2 bg-black/50 text-white rounded hover:bg-black transition-all text-sm sm:text-base"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}

export default Error
