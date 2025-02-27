// app/[slug]/[date]/page.tsx
import { notFound } from "next/navigation";
import Header from "@/components/header";
import { getPostBySlugAndDate, getAllPosts } from "@/lib/posts";
import { BlogPost } from "@/types/blogPost";

// ビルド時に生成するパスを定義する
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
    date: post.date,
  }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string; date: string }>;
}) {
  // params は Promise 型なので、await して解決する
  const { slug, date } = await params;
  const post: BlogPost | null = await getPostBySlugAndDate(slug, date);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Header />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-black">{post.title}</h1>
        <p className="text-gray-600 mb-6">{post.date}</p>
        <hr className="border-gray-300 my-6" />
        <div
          className="prose max-w-none text-gray-900"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
}
