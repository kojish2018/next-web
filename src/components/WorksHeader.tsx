"use client";

import React from "react";
import Link from "next/link"; // Linkをインポート

export default function WorksHeader() {
  return (
    <div className="absolute top-0 left-0 w-full py-6 z-10">
      <div className="max-w-5xl mx-1 px-6">
        {/* Worksを押すとworksページに飛ぶ */}
        <Link href="/works">
          {/* <h1 className="text-5xl font-roboto text-left ml-6 text-black font-extrabold cursor-pointer hover:underline tracking-widest"> */}
          <h1 className="text-5xl text-left ml-6 text-black font-extrabold cursor-pointer hover:underline tracking-widest">
            Works
          </h1>
        </Link>
      </div>
    </div>
  );
}
