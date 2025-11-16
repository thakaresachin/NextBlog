import { Link, useLocation } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { useContext, useState, useEffect } from "react";

const Navbar = () => {
  const { user, Logout } = useContext(StoreContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // 🔹 Navbar background change on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔹 Links with underline animation
  const NavLink = ({ to, label }) => (
    <Link
      to={to}
      className={`relative group transition ${
        location.pathname === to ? "text-white font-semibold" : "text-gray-300"
      }`}
    >
      {label}
      <span
        className={`absolute left-0 -bottom-1 w-0 h-[2px] bg-white rounded-full transition-all duration-300 group-hover:w-full ${
          location.pathname === to ? "w-full" : ""
        }`}
      ></span>
    </Link>
  );

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/90 backdrop-blur-md border-b border-gray-800 shadow-md"
          : "bg-black"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Brand */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-white hover:text-gray-300 transition-all duration-300"
        >
          NEXT<span className="text-gray-400">BLOG.</span>
        </Link>

        {/* Navigation Links */}
        <ul className="hidden md:flex gap-8 text-base font-medium items-center">
          <NavLink to="/" label="Home" />
          <NavLink to="/blogs" label="Blogs" />
          {user && <NavLink to="/yourblogs" label="My Blogs" />}
          <NavLink to="/contact" label="Contact" />
        </ul>

        {/* Buttons */}
        <div className="flex gap-3 items-center">
          {!user ? (
            <>
              <Link
                to="/login"
                className="px-5 py-2 border border-white text-white rounded-full hover:bg-white hover:text-black transition-all duration-300"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition-all duration-300"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <div className="flex gap-3 items-center">
              <Link
                to="/dashboard"
                className="px-5 py-2 border border-white text-white rounded-full hover:bg-white hover:text-black transition-all duration-300"
              >
                Dashboard
              </Link>
              <button
                onClick={Logout}
                className="px-5 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition-all duration-300"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
