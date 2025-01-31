"use server"; // サーバーコンポーネントとして明示

import fs from "fs/promises"; // `fs/promises` を使うことで非同期処理にする
import path from "path";
import matter from "gray-matter";
import { BlogPost } from "../types/blogPost";

const postsDirectory = path.join(process.cwd(), "src/posts");

export async function getAllPosts(): Promise<BlogPost[]> {
  // ← `async` を追加
  const fileNames = await fs.readdir(postsDirectory); // `readdirSync` → `readdir`

  const posts = await Promise.all(
    fileNames.map(async (fileName) => {
      // `map` 内部も非同期処理
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = await fs.readFile(fullPath, "utf8"); // `readFileSync` → `readFile`
      const { data, content } = matter(fileContents);

      return {
        title: data.title,
        date: data.date,
        topics: data.topics || [],
        image: data.image || "/default.jpg",
        slug: fileName.replace(/\.md$/, ""),
        content,
      };
    })
  );

  return posts;
}
