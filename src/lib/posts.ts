"use server"; // サーバーコンポーネントとして明示

import fs from "fs/promises"; // `fs/promises` を使うことで非同期処理にする
import path from "path";
import matter from "gray-matter";
import { BlogPost } from "../types/blogPost";

const postsDirectory = path.join(process.cwd(), "src/posts");

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    // console.log("📂 読み込み開始: posts ディレクトリ", postsDirectory);

    const fileNames = await fs.readdir(postsDirectory);
    // console.log("📄 読み込んだファイル一覧:", fileNames);

    const posts = await Promise.all(
      fileNames.map(async (fileName) => {
        const fullPath = path.join(postsDirectory, fileName);
        // console.log(`🔍 ファイル読み込み中: ${fullPath}`);

        try {
          const fileContents = await fs.readFile(fullPath, "utf8");

          const { data, content } = matter(fileContents);
          //   console.log(`📝 フロントマター解析 (${fileName}):`, data);

          // 必要なフィールドが存在しない場合は null を返す
          if (!data.title || !data.date) {
            // console.warn(`⚠️ ${fileName} に必要なフィールドが不足しています`);
            return null;
          }

          return {
            title: data.title,
            date: data.date,
            topics: data.topics || [],
            image: data.image || "/default.jpg",
            slug: fileName.replace(/\.md$/, ""),
            content,
          } as BlogPost;
        } catch (err) {
          //   console.error(`❌ エラー: ${fileName} の読み込みに失敗しました`, err);
          return null; // エラーが起きた場合は null を返す
        }
      })
    );

    // `null` を削除し、型を `BlogPost[]` にキャスト
    const validPosts: BlogPost[] = posts.filter(
      (post): post is BlogPost => post !== null
    );
    // console.log("✅ 読み込み完了。正常に処理できた投稿数:", validPosts.length);

    return validPosts;
  } catch (err) {
    // console.error("❌ posts ディレクトリの読み込みに失敗しました:", err);
    return [];
  }
}
