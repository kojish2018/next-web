"use client";

import * as React from "react";
import Header from "../../components/header";
import Image from "next/image";
import Link from "next/link";
import { BLOG_NAME } from "@/config";

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
            <h2 className="text-2xl font-bold mb-2">Koji</h2>
            <p className="text-gray-700 mb-4">ソフトウェアエンジニア</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                フロントエンド: TypeScript を駆使し、Vue、React、Nuxt、Next
                などで開発
              </li>
              <li>バックエンド: PHP や Python を使用したシステム開発の経験</li>
              <li>機械学習を用いたBot開発</li>
              <li>
                リーダーシップ:
                3年以上のリードエンジニア経験でチームマネジメントを実施
              </li>
              <li>
                統計学: 大学院での計量経済学研究により高度な統計知識を保持
              </li>
              <li>英語力: TOEFL iBT 100点、海外留学経験2年</li>
            </ul>
            {/* <p className="mt-4">
              <Link
                href="/" // 実際のリンクに変更してください
                className="text-blue-500 hover:underline"
              >
                テストアカウント
              </Link>
            </p> */}
          </div>
        </div>
      </div>
      <footer className="mt-12 text-center text-gray-500">
        2025 {BLOG_NAME}
      </footer>
    </div>
  );
}
