// src/lib/posts.ts
// "use server"; // サーバーコンポーネントとして明示

import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { BlogPost } from "../types/blogPost";

const postsDirectory = path.join(process.cwd(), "src/posts");

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const fileNames = await fs.readdir(postsDirectory);

    const posts = await Promise.all(
      fileNames.map(async (fileName) => {
        const fullPath = path.join(postsDirectory, fileName);

        try {
          const fileContents = await fs.readFile(fullPath, "utf8");

          const { data, content } = matter(fileContents);

          if (!data.title || !data.date) {
            return null;
          }

          // Markdown を HTML に変換
          const processedContent = await remark().use(html).process(content);
          const contentHtml = processedContent.toString();

          return {
            title: data.title,
            date: data.date,
            topics: data.topics || [],
            image: data.image || "/default1.jpg",
            slug: fileName.replace(/\.md$/, ""),
            content: contentHtml, // 変換後のHTMLを格納
          } as BlogPost;
        } catch (err) {
          return null;
        }
      })
    );

    const validPosts: BlogPost[] = posts.filter(
      (post): post is BlogPost => post !== null
    );

    return validPosts;
  } catch (err) {
    return [];
  }
}

export async function getPostBySlugAndDate(
  slug: string,
  date: string
): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug && post.date === date) || null;
}
