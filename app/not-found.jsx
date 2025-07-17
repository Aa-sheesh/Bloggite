// app/not-found.jsx
import Link from 'next/link'

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center  text-white px-6 text-center">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Oops! Page not found.</p>
      <Link
        href="/"
        className="px-6 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition-all"
      >
        Go Back Home
      </Link>
    </div>
  )
}

export default NotFound
