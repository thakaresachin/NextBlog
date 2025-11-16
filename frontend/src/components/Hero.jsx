import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative w-full bg-black text-white overflow-hidden">
      {/* Gradient Background Layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-black to-black opacity-95"></div>

      {/* Content Wrapper */}
      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-20 py-28 gap-12">
        
        {/* Left Section */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-8 z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
            <span className="block text-white">Write.</span>
            <span className="block text-gray-400">Inspire.</span>
            <span className="block text-white">Share Your Story.</span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-md mx-auto md:mx-0">
            Join a growing community of creators and thinkers.  
            Transform your ideas into stories that inspire — create, explore, and connect.
          </p>

          <div className="flex justify-center md:justify-start gap-4 pt-2">
            <Link
              to="/blogs"
              className="px-7 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-all duration-300 shadow-md hover:shadow-xl"
            >
              Explore Blogs
            </Link>
            <Link
              to="/signup"
              className="px-7 py-3 rounded-full border border-white text-white font-semibold hover:bg-white hover:text-black transition-all duration-300"
            >
              Start Writing
            </Link>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="w-full md:w-1/2 flex justify-center relative">
          <div className="absolute -top-24 -left-16 w-96 h-96 bg-white/10 blur-[120px] rounded-full hidden md:block"></div>

          <img
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80"
            alt="Hero Banner"
            className="w-[90%] max-w-md rounded-2xl object-cover shadow-2xl hover:scale-105 transition-transform duration-700"
          />

          <div className="absolute bottom-0 right-0 w-72 h-72 bg-gray-600/20 blur-[120px] rounded-full hidden md:block"></div>
        </div>
      </div>

      {/* Bottom Overlay Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
};

export default Hero;
