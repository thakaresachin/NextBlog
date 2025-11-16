import { useContext } from "react";
import BlogCard from "./BlogCard";
import { StoreContext } from "../context/StoreContext";
const LatestBlogs = () => {
  // Temporary static data (for frontend demo)
  const {blogData}=useContext(StoreContext);
 

  return (

    <div className="px-3 sm:px-4 py-8">
      <h1 className="text-3xl my-4 text-gray-700 font-bold text-center sm:text-start">
        Latest Blogs
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {blogData.slice(-6).reverse().map((blog) => (
          <BlogCard
            key={blog._id}
            id={blog._id}
            title={blog.title}
            image={blog.image}
            category={blog.category}
            author_name={blog.author.name}
            author_image={blog.author.image}
            date={blog.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestBlogs;
