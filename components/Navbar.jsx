import React from 'react';
import Link from 'next/link';
import { AlignRight, Rss, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center sticky top-0 left-0 right-0 px-4 sm:px-6 md:px-10 py-3 sm:py-5 bg-black/50 backdrop-blur-xs z-50 w-full overflow-hidden">
      <Link title='Bloggite' href="/" className="font-bold italic text-xl sm:text-2xl md:text-3xl text-overflow-safe">
        Bloggite
      </Link>
      <div className='flex gap-2 sm:gap-4 md:w-auto justify-end items-center'>
        {/* About Me  */}
        <Link href="/about-me" className="text-base sm:text-lg md:text-xl cursor-pointer hover:underline hidden sm:block opacity-40 text-overflow-safe">
          <span title='About Me' className='flex items-center'>About Me</span>
        </Link> 
        {/* Show menu icon only on mobile, hidden on screens >= small (sm) */}
        <Link href="/about-me" className="flex items-center px-2 sm:hidden opacity-50">
          <User size={24} className="sm:w-8 sm:h-8" />
        </Link>

        {/* Blogs  */}
        <Link href="/explore" className="text-base sm:text-lg md:text-xl cursor-pointer hover:underline hidden sm:block opacity-40 text-overflow-safe">
          <span title='Explore blogs' className='flex items-center'>Blogs</span>
        </Link>
        {/* Show menu icon only on mobile, hidden on screens >= small (sm) */}
        <Link href="/explore" className="flex items-center opacity-50 sm:hidden">
          <AlignRight size={24} className="sm:w-8 sm:h-8" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
