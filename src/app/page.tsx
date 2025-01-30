import * as React from "react";
import Home from "../components/home";
import { getAllPosts } from "../lib/posts";
import { BlogPost } from "../types/blogPost";

const Page = async () => {
  const posts: BlogPost[] = getAllPosts();

  // 投稿からタグ一覧を取得（重複削除）
  const allTopics = Array.from(new Set(posts.flatMap((post) => post.topics)));

  return <Home posts={posts} topics={allTopics} />;
};

export default Page;
