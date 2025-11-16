import React, { useContext } from "react";
import BlogCard from "../components/BlogCard";
import { StoreContext } from "../context/StoreContext";

const Blogs = () => {
  const { blogData } = useContext(StoreContext);

  return (
    <section className="min-h-screen bg-black text-white py-20 px-6 md:px-12 lg:px-20">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
          Discover Thoughtful <span className="text-gray-300">Stories</span>
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed">
          Dive into inspiring perspectives, creative journeys, and bold ideas from
          writers around the world. Every story has a voice — explore yours today.
        </p>
      </div>

      {/* Blogs Grid */}
      {blogData && blogData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogData.map((blog) => (
            <BlogCard
              key={blog._id}
              id={blog._id}
              title={blog.title}
              image={blog.image}
              category={blog.category}
              author_name={blog.author?.name}
              author_image={blog.author?.image}
              date={blog.createdAt}
            />
          ))}
        </div>
      ) : (
        <div className="text-center mt-20">
          <p className="text-gray-500 text-lg">No blogs available yet. ✍️</p>
        </div>
      )}
    </section>
  );
};

export default Blogs;
