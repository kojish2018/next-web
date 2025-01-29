import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogPost } from "../types/blogPost";

const postsDirectory = path.join(process.cwd(), "src/posts");
const defaultImage = "/default.jpg"; // public フォルダ内のデフォルト画像

export function getAllPosts(): BlogPost[] {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      title: data.title,
      date: data.date,
      topics: data.topics,
      image: data.image && data.image.trim() !== "" ? data.image : defaultImage,
      slug: fileName.replace(/\.md$/, ""),
      content,
    };
  });
}
