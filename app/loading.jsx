// app/loading.jsx
import React from 'react'

const Loading = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center  text-white">
      <div className="flex items-center space-x-4">
        <section className="w-full flex justify-center items-center h-[70vh]">
        <div className="w-10 h-10 border-4 border-white/50 border-dashed rounded-full animate-spin"></div>

      </section>
      </div>
    </div>
  )
}

export default Loading
