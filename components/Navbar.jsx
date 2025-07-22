import React from 'react';
import Link from 'next/link';
import { AlignRight } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center">
      <Link href="/" className="font-bold italic text-3xl">Bloggite</Link>

      {/* Visible on sm+ screens */}
      <Link href="/explore" className="text-2xl cursor-pointer hover:underline hidden sm:block opacity-40">
        Explore
      </Link>
      {/* Show menu icon only on mobile, hidden on screens >= small (sm) */}
      <Link href="/explore" className="pb-3 sm:hidden">
        <AlignRight size={36} />
      </Link>
    </nav>
  );
};

export default Navbar;
