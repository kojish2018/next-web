"use client"; // クライアントコンポーネントとして実行

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { BlogPost } from "../../../types/blogPost";
import Header from "../../../components/header";

const PostPage = () => {
  const params = useParams();

  // ✅ useState をトップレベルで定義
  const [slug, setSlug] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ useEffect で params から slug と date を取得
  useEffect(() => {
    if (params.slug && params.date) {
      setSlug(params.slug as string);
      setDate(params.date as string);
    }
  }, [params]);

  // ✅ useEffect で API からデータ取得
  useEffect(() => {
    if (!slug || !date) return;

    console.log("🔍 Fetching post for:", slug, date);

    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts?slug=${slug}&date=${date}`);
        if (!response.ok) throw new Error("Failed to fetch post");

        const data = await response.json();
        setPost(data || null);
      } catch (error) {
        console.error("❌ Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, date]);

  // ✅ エラーハンドリングを return 前に記述
  if (!slug || !date) {
    console.error("❌ Missing slug or date", params);
    return <p className="text-red-600">Error: Missing slug or date</p>;
  }

  if (loading) return <p className="text-gray-600 text-xl">Loading...</p>;

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600 text-xl">Post not found</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Header />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600 mb-6">{post.date}</p>
        <div className="text-gray-800 space-y-4">
          {post.content.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
