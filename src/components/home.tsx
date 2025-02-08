"use client";

import * as React from "react";
import { useState } from "react";
import { BlogPost } from "../types/blogPost";
import Link from "next/link";
import Header from "./header";
import Image from "next/image";

// 🔹 `props` の型定義
interface HomeProps {
  posts: BlogPost[];
  topics: string[];
}

const Home: React.FC<HomeProps> = ({ posts, topics }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1); // 🔹 現在のページ

  // const postsPerPage = 9; // 🔹 1ページあたりの投稿数
  const postsPerPage = 3; // 🔹 1ページあたりの投稿数

  // 🔍 フィルタリング処理
  const filteredPosts = posts.filter(
    (post) =>
      (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.topics.some((topic) =>
          topic.toLowerCase().includes(searchTerm.toLowerCase())
        )) &&
      (!selectedTag || post.topics.includes(selectedTag))
  );

  // 📌 ページネーション処理
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  // 🔄 ページ変更ハンドラ
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Header />

      {/* 🔍 Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search posts"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // 🔹 検索時にページをリセット
          }}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
      </div>

      {/* 🏷 Topics */}
      <div className="mb-8">
        <h2 className="mb-3 text-lg font-medium">Filter by topics</h2>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => {
                setSelectedTag(topic);
                setCurrentPage(1); // 🔹 フィルター時にページをリセット
              }}
              className={`px-4 py-2 rounded-full text-sm ${
                selectedTag === topic
                  ? "bg-blue-500 text-white"
                  : "bg-gray-500 text-white"
              } hover:bg-gray-300`}
            >
              {topic}
            </button>
          ))}
          <button
            onClick={() => {
              setSelectedTag(null);
              setCurrentPage(1); // 🔹 クリア時にページをリセット
            }}
            className="text-gray-500 text-sm underline"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* 📝 Blog Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedPosts.length > 0 ? (
          paginatedPosts.map((post) => (
            <Link
              key={post.title}
              href={`/${post.slug}/${post.date}`}
              passHref
              className="block bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <Image
                src={post.image}
                alt={post.title}
                width={1280}
                height={1280}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500">{post.date}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {post.topics.map((topic) => (
                    <span
                      key={topic}
                      className="text-xs bg-gray-500 px-2 py-1 rounded-full"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-3">
            No matching posts found.
          </p>
        )}
      </div>

      {/* 📍 Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 gap-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-700 font-semibold flex items-center">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
