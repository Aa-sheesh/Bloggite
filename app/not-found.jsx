// app/not-found.jsx
import Link from 'next/link'

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-white px-4 sm:px-6 text-center">
      <div className='bg-black/50 p-6 sm:p-10 rounded-lg backdrop-blur max-w-md w-full'>
        <h1 className="text-4xl sm:text-5xl font-bold mb-3 sm:mb-4">404</h1>
        <p className="text-lg sm:text-xl mb-4 sm:mb-6 text-overflow-safe">Oops! Page not found.</p>
        <Link
          title='Home'
          href="/"
          className="px-4 sm:px-6 py-2 bg-black/50 text-white rounded-md hover:bg-black/80 transition-all text-sm sm:text-base"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
