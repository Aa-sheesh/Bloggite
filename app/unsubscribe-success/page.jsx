import { BadgeAlert } from 'lucide-react';
import Link from 'next/link';

export default function UnsubscribeSuccess() {
  return (
    <div className="min-h-[80vh]  flex items-center justify-center px-4">
      <div className="max-w-md w-full  backdrop-blur rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16  rounded-full flex items-center justify-center">
            <BadgeAlert size={42} />
          </div>
        </div>

        <h1 className="text-2xl text-pretty font-bold  mb-4">
          Successfully Unsubscribed
        </h1>

        <p className=" mb-8 text-pretty">
          You have been successfully unsubscribed from our newsletter. You will no longer receive email notifications about new blog posts.
        </p>

        <div className="space-y-3 space-x-3 rounded-2xl">
          <Link
            href="/"
            className="block w-full hover:underline text-white rounded-lg transition duration-200"
          >
            Return to Home
          </Link>


        </div>
      </div>
    </div>
  );
} 