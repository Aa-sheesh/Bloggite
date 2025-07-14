import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-end ">
      <Link href="/" className="font-bold italic text-[36px]">Bloggite</Link>
      <Link href="/explore" className="text-[24px] cursor-pointer hover:underline">Explore</Link>
    </nav>
  );
};

export default Navbar;
