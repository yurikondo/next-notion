import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="container mx-auto lg:px-2 px-5 lg:w-2/5">
      <div className="container flex items-center justify-between mx-auto">
        <Link href="/" className="text-2xl font-medium">
          NotionBlog
        </Link>
        <div>
          <ul className="flex items-center text-sm py-4">
            <li>
              <Link href="/" className="navbarLink">
                HOME
              </Link>
            </li>
            <li>
              <Link href="#" className="navbarLink">
                Twitter
              </Link>
            </li>
            <li>
              <Link href="#" className="navbarLink">
                Git
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
