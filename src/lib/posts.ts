// src/lib/posts.ts
"use server"; // サーバーコンポーネントとして明示

import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { BlogPost } from "../types/blogPost";

const postsDirectory = path.join(process.cwd(), "src/posts");
console.log("📂 読み込み開始: posts ディレクトリのパス", postsDirectory);

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const fileNames = await fs.readdir(postsDirectory);
    console.log("📄 読み込んだファイル一覧:", fileNames);

    const posts = await Promise.all(
      fileNames.map(async (fileName) => {
        const fullPath = path.join(postsDirectory, fileName);
        console.log(`🔍 ファイル読み込み中: ${fullPath}`);

        try {
          const fileContents = await fs.readFile(fullPath, "utf8");
          console.log(`📄 ${fileName} の内容取得成功`);

          const { data, content } = matter(fileContents);
          console.log(`📝 フロントマター解析 (${fileName}):`, data);
          console.log(
            `📝 コンテンツ解析 (${fileName}):`,
            content.slice(0, 100)
          );

          // 必要なフィールドが存在しない場合はスキップ
          if (!data.title || !data.date) {
            console.warn(
              `⚠️ ${fileName} に title または date が不足しています`
            );
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
          console.error(`❌ ${fileName} の読み込みエラー:`, err);
          return null;
        }
      })
    );

    const validPosts: BlogPost[] = posts.filter(
      (post): post is BlogPost => post !== null
    );

    console.log("✅ 読み込み完了。正常に処理できた投稿数:", validPosts.length);
    console.log(
      "📜 取得した投稿一覧:",
      validPosts.map((post) => ({ slug: post.slug, date: post.date }))
    );

    return validPosts;
  } catch (err) {
    console.error("❌ posts ディレクトリの読み込みに失敗しました:", err);
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
