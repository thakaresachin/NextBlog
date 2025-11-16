import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white border-t border-gray-800">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* About */}
        <div className="space-y-4">
          <h1 className="text-xl font-semibold text-white tracking-tight">
            About
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            A modern space for writers and readers to connect, express, and
            inspire. Create stories that matter — where words meet purpose.
          </p>
          <div className="text-gray-400 text-sm space-y-1">
            <p>Email: info@nextblog.com</p>
            <p>Phone: +91 8080235652</p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h1 className="text-xl font-semibold text-white tracking-tight mb-4">
            Quick Links
          </h1>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li>
              <Link
                to="/"
                className="hover:text-white transition-colors duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/blogs"
                className="hover:text-white transition-colors duration-300"
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-white transition-colors duration-300"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-white transition-colors duration-300"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h1 className="text-xl font-semibold text-white tracking-tight mb-4">
            Categories
          </h1>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li className="hover:text-white transition-colors duration-300 cursor-pointer">
              Lifestyle
            </li>
            <li className="hover:text-white transition-colors duration-300 cursor-pointer">
              Technology
            </li>
            <li className="hover:text-white transition-colors duration-300 cursor-pointer">
              Inspiration
            </li>
            <li className="hover:text-white transition-colors duration-300 cursor-pointer">
              Travel
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800"></div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-6 flex flex-col sm:flex-row justify-between items-center text-gray-500 text-sm">
        <p className="text-center sm:text-left">
          © {new Date().getFullYear()} <span className="text-white font-medium">nextblog.</span> 
          &nbsp;All rights reserved.
        </p>

        <ul className="flex flex-wrap justify-center gap-4 mt-3 sm:mt-0">
          <li className="hover:text-white cursor-pointer transition">Privacy Policy</li>
          <li className="hover:text-white cursor-pointer transition">Terms</li>
          <li className="hover:text-white cursor-pointer transition">Support</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
