// "use server";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogPost } from "../types/blogPost";

const postsDirectory = path.join(process.cwd(), "src/posts");

// 投稿データを取得する関数（サーバー専用）
export function getAllPosts(): BlogPost[] {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      title: data.title,
      date: data.date,
      topics: data.topics || [],
      image: data.image || "/default.jpg", // 画像がない場合はデフォルト画像を設定
      slug: fileName.replace(/\.md$/, ""),
      content,
    };
  });
}
