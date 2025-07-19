import Link from 'next/link';

export default function UnsubscribeSuccess() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Successfully Unsubscribed
        </h1>
        
        <p className="text-gray-600 mb-8">
          You have been successfully unsubscribed from our newsletter. You will no longer receive email notifications about new blog posts.
        </p>
        
        <div className="space-y-3">
          <Link 
            href="/"
            className="block w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Return to Home
          </Link>
          
          <Link 
            href="/subscribe"
            className="block w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition duration-200"
          >
            Subscribe Again
          </Link>
        </div>
      </div>
    </div>
  );
} 