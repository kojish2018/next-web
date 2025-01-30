import * as React from "react";
import { BlogPost } from "../../types/blogPost";
import Header from "../../components/header";

// Mock function to fetch a post by slug and date
async function getPost(slug: string, date: string): Promise<BlogPost | null> {
  const allPosts: BlogPost[] = []; // Replace with actual fetching logic
  return (
    allPosts.find((post) => post.slug === slug && post.date === date) || null
  );
}

interface PostPageProps {
  params: { slug: string; date: string };
}

const PostPage: React.FC<PostPageProps> = async ({ params }) => {
  const { slug, date } = params;
  const post = await getPost(slug, date);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Header />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600 mb-6">{post.date}</p>
        <div className="text-gray-800">
          {/* Replace with actual post content */}
          <p>{post.content}</p>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
