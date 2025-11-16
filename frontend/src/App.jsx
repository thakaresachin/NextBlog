import { Routes, Route } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SingleBlog from "./pages/SingleBlog";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import YourBlogs from "./pages/YourBlogs";

function App() {
  return (
    <div className="bg-black text-white min-h-screen font-[Inter] tracking-tight">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="pt-24 pb-16 max-w-7xl mx-auto px-5 md:px-10 lg:px-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/yourblogs" element={<YourBlogs />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/blog/:id" element={<SingleBlog />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Toast */}
      <ToastContainer position="top-right" autoClose={2000} theme="dark" />
    </div>
  );
}

export default App;
