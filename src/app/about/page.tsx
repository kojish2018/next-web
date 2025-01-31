"use client";

import * as React from "react";
import Header from "../../components/header";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Header />
      <div className="max-w-4xl mx-auto">
        {/* タイトル */}
        <h1 className="text-4xl font-bold mb-6">About</h1>

        {/* コンテンツ全体を囲むレイアウト */}
        <div className="flex flex-col md:flex-row items-center md:items-start">
          {/* アイコン部分 */}
          <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-6">
            {/* <img
              src="/images/profile.png" // プロフィール画像のパスを変更してください
              alt="Profile Icon"
              className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full"
            /> */}
            <Image
              src="/images/profile.png" // プロフィール画像のパスを変更してください
              alt="Profile Icon"
              width={1280} // 適切なサイズを指定
              height={1280}
              className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full"
            />
          </div>

          {/* テキスト部分 */}
          <div className="text-left">
            <h2 className="text-2xl font-bold mb-2">ジャパ・ザ・ハットリ</h2>
            <p className="text-gray-700 mb-4">ソフトウェアエンジニア</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>テスト</li>
              <li>テキスト</li>
              <li>テスト</li>
              <li>tesきと</li>
              <li>テスト</li>
            </ul>
            <p className="mt-4">
              <Link
                href="/" // 実際のリンクに変更してください
                className="text-blue-500 hover:underline"
              >
                テストアカウント
              </Link>
            </p>
          </div>
        </div>
      </div>
      <footer className="mt-12 text-center text-gray-500">2025Kohhblog</footer>
    </div>
  );
}
