// app/not-found.jsx
import Link from 'next/link'

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center  text-white px-6 text-center">
      <div className='bg-black/50 p-10 rounded-lg backdrop-blur'>
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Oops! Page not found.</p>
      <Link
      title='Home'
        href="/"
        className="px-6 py-2 bg-black/50 text-white rounded-md hover:bg-black/80 transition-all"
      >
        Go Back Home
      </Link>
    </div>
    </div>
  )
}

export default NotFound
