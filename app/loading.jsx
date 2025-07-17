// app/loading.jsx
import React from 'react'

const Loading = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center  text-white">
      <div className="flex items-center space-x-4">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white" />
        <span className="text-xl font-medium">Loading...</span>
      </div>
    </div>
  )
}

export default Loading
