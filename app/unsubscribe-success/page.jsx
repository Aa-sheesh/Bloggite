import { BadgeAlert } from 'lucide-react';
import Link from 'next/link';

export default function UnsubscribeSuccess() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6">
      <div className="max-w-md w-full bg-black/50 backdrop-blur rounded-lg shadow-lg p-6 sm:p-8 text-center">
        <div className="mb-4 sm:mb-6">
          <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center">
            <BadgeAlert size={32} className="sm:w-10 sm:h-10" />
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl text-pretty font-bold mb-3 sm:mb-4 text-overflow-safe">
          Successfully Unsubscribed
        </h1>

        <p className="mb-6 sm:mb-8 text-pretty text-sm sm:text-base text-overflow-safe leading-relaxed">
          You have been successfully unsubscribed from our newsletter. You will no longer receive email notifications about new blog posts.
        </p>

        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full hover:underline text-white rounded-lg transition duration-200 text-sm sm:text-base"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 