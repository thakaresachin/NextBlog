import { useContext } from "react";
import { useParams } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const SingleBlog = () => {
  const { id } = useParams();
  const { blogData } = useContext(StoreContext);

  const blog = blogData.find((b) => b._id === id);

  return (
    <section className="min-h-screen bg-black text-white py-24 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Featured Image */}
        <div className="relative w-full h-[450px] rounded-3xl overflow-hidden shadow-[0_0_50px_#0008] group">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover opacity-90 
                       group-hover:opacity-100 group-hover:scale-110 
                       transition-all duration-[1200ms] ease-out"
          />

          {/* Premium Gradient Layer */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/10"></div>

          {/* Floating Category Badge */}
          <span className="absolute bottom-6 left-6 bg-white/90 text-black text-xs px-4 py-1 
                           font-semibold rounded-full tracking-wider shadow-lg">
            {blog.category}
          </span>
        </div>

        {/* Content Section */}
        <div className="mt-12 bg-[#0c0c0c]/60 border border-gray-800 backdrop-blur-2xl 
                        rounded-3xl p-10 shadow-[0_0_50px_#0007] 
                        transition-all duration-500 hover:shadow-[0_0_80px_#0009]">

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight 
                         bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {blog.title}
          </h1>

          <div className="my-6 w-32 h-1 bg-gray-700 rounded-full"></div>

          {/* Description */}
          <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line tracking-wide 
                        mt-6">
            {blog.description}
          </p>

          {/* Author Section */}
          <div className="flex items-center gap-5 mt-10 pt-6 border-t border-gray-800">
            {/* Author Image */}
            <div className="relative">
              <img
                src={blog.author.image}
                alt={blog.author.name}
                className="w-14 h-14 rounded-full object-cover border border-gray-700 shadow-lg"
              />

              {/* Glow behind author */}
              <div className="absolute inset-0 blur-xl bg-white/5 rounded-full"></div>
            </div>

            {/* Author Info */}
            <div>
              <p className="text-xl font-semibold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                {blog.author.name}
              </p>

              <p className="text-gray-500 text-sm tracking-wide">
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "2-digit",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Thank You Footer */}
        <div className="mt-16 text-center opacity-70 hover:opacity-100 transition-all">
          <p className="text-gray-500 tracking-widest text-sm uppercase">
            — Thanks for reading —
          </p>
        </div>
      </div>
    </section>
  );
};

export default SingleBlog;
