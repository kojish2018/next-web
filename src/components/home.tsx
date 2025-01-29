import * as React from "react";
import { getAllPosts } from "../lib/posts";

const posts = getAllPosts();

const Home: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Kohh Blog</h1>
        <nav className="flex space-x-4">
          <a href="#" className="text-gray-600 hover:text-black">
            Blog
          </a>
          <a href="#" className="text-gray-600 hover:text-black">
            About
          </a>
          <a href="#" className="text-gray-600 hover:text-black">
            Contact
          </a>
          <a href="#" className="text-gray-600 hover:text-black">
            Projects
          </a>
          <button className="bg-gray-200 p-2 rounded-full">🌙</button>
        </nav>
      </header>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search posts"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
      </div>

      {/* Topics */}
      <div className="mb-8">
        <h2 className="mb-3 text-lg font-medium">Search by topics</h2>
        <div className="flex flex-wrap gap-2">
          {[
            "AngularJS",
            "Deployment",
            "NestJS",
            "Next.js",
            "React",
            "Redux",
            "SEO",
            "Test",
            "Typescript",
            "Vercel",
            "Vue.js",
          ].map((topic) => (
            <button
              key={topic}
              className="bg-gray-200 px-4 py-2 rounded-full text-sm hover:bg-gray-300"
            >
              {topic}
            </button>
          ))}
          <button className="text-gray-500 text-sm underline">Clear All</button>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.title}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">{post.title}</h3>
              <p className="text-sm text-gray-500">{post.date}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {post.topics.map((topic) => (
                  <span
                    key={topic}
                    className="text-xs bg-gray-200 px-2 py-1 rounded-full"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
