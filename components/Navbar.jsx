import React from 'react';
import Link from 'next/link';
import { AlignRight, Rss, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className=" flex justify-between items-center sticky top-0 left-0 right-0 px-10 py-5 bg-black/50 backdrop-blur-xs z-100">
      <Link title='Bloggite' href="/" className="font-bold italic text-3xl">Bloggite</Link>
      <div className='flex w-[15%] justify-between'>
        {/* About Me  */}
        <Link href="/about-me" className="text-xl  cursor-pointer hover:underline hidden sm:block opacity-40">
          <span title='About Me' className='flex items-center'>About Me </span>
        </Link> 
        {/* Show menu icon only on mobile, hidden on screens >= small (sm) */}
        <Link href="/about-me" className="flex items-center px-2 sm:hidden opacity-50">
          <User size={32} />
        </Link>

        {/* Blogs  */}
        <Link href="/explore" className="text-xl  cursor-pointer hover:underline hidden sm:block opacity-40">
          <span title='Explore blogs' className='flex items-center'>Blogs</span>
        </Link>
        {/* Show menu icon only on mobile, hidden on screens >= small (sm) */}
        <Link href="/explore" className="flex items-center opacity-50 sm:hidden ">
          <AlignRight size={32} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
