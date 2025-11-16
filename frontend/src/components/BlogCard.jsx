import { Link } from "react-router-dom";

const BlogCard = ({
  id,
  title,
  category,
  image,
  author_name,
  author_image,
  date,
}) => {
  return (
    <div className="group bg-black border border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
      {/* Blog Image */}
      <Link to={`/blog/${id}`}>
        <div className="relative w-full h-64 overflow-hidden">
          <img
            src={image} // ⭐ Now Cloudinary URL
            alt={title}
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transform group-hover:scale-105 transition-all duration-700 ease-in-out"
          />

          {/* Category Badge */}
          <div className="absolute top-4 left-4 bg-white text-black text-xs uppercase font-semibold px-3 py-1 rounded-full tracking-wider">
            {category}
          </div>
        </div>
      </Link>

      {/* Blog Content */}
      <div className="p-6 text-white space-y-4">
        <h1 className="text-2xl font-bold leading-tight group-hover:text-gray-300 transition-colors duration-300">
          {title}
        </h1>

        <div className="flex items-center gap-4 pt-3 border-t border-gray-800">
          {/* Author Image */}
          <img
            src={author_image ? author_image : "/default-avatar.png"} // ⭐ Cloudinary author image
            alt={author_name}
            className="w-10 h-10 rounded-full object-cover border border-gray-700"
          />

          {/* Author Details */}
          <div className="flex flex-col">
            <p className="text-sm font-medium text-white tracking-wide">
              {author_name}
            </p>
            <p className="text-xs text-gray-400">
              {new Date(date).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
