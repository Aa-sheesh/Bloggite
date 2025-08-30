// app/loading.jsx
import React from 'react'

const Loading = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center text-white px-4">
      <div className="flex items-center justify-center">
        <div className="w-8 h-8 sm:w-10 sm:h-10 border-4 border-white/50 border-dashed rounded-full animate-spin"></div>
      </div>
    </div>
  )
}

export default Loading
