"use client"; //
import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">
        <Link href="/" className="text-gray-600 hover:text-black">
          {/* Kohh Blog */}
          Koji 脱養分ブログ
        </Link>
      </h1>
      <nav className="flex space-x-4">
        <Link href="/about" className="text-gray-600 hover:text-black">
          About
        </Link>
      </nav>
    </header>
  );
};

export default Header;
