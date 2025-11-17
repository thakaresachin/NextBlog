import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("list");
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    image: null,
  });
  const [blogs, setBlogs] = useState([]);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fileHandler = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("image", formData.image);

    try {
      const res = await axios.post("https://nextblog-3-backend.onrender.com/blogs/createblog", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(res.data.message);
      setFormData({ title: "", category: "", description: "", image: null });
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    const allBlogs = async () => {
      try {
        const res = await axios.get("https://nextblog-3-backend.onrender.com/blogs/user/blog", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlogs(res.data);
      } catch (error) {
        console.log("Error fetching blogs:", error);
      }
    };
    allBlogs();
  }, [token]);

  const removeBlog = async (blogId) => {
    try {
      const res = await axios.delete(`https://nextblog-3-backend.onrender.com/blogs/deleteblog/${blogId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(res.data.message);
      setBlogs(blogs.filter((blog) => blog._id !== blogId));
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting blog");
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-950 border-r border-gray-800 p-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-100">Dashboard</h2>

        <nav className="flex flex-col gap-3">
          <button
            className={`text-left px-4 py-2 rounded-lg transition-all duration-300 ${
              activeTab === "post"
                ? "bg-white text-black font-semibold"
                : "hover:bg-neutral-800 text-gray-300"
            }`}
            onClick={() => setActiveTab("post")}
          >
            ✍️ Post a Blog
          </button>

          <button
            className={`text-left px-4 py-2 rounded-lg transition-all duration-300 ${
              activeTab === "list"
                ? "bg-white text-black font-semibold"
                : "hover:bg-neutral-800 text-gray-300"
            }`}
            onClick={() => setActiveTab("list")}
          >
            📜 List of Blogs
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {activeTab === "post" ? (
          <section>
            <h2 className="text-2xl font-bold mb-6">Post a New Blog</h2>

            <form
              onSubmit={submitHandler}
              className="w-full max-w-xl flex flex-col gap-4 bg-neutral-950 p-6 rounded-xl border border-gray-800"
            >
              <input
                name="title"
                value={formData.title}
                onChange={onChangeHandler}
                type="text"
                placeholder="Enter Title"
                className="bg-transparent border border-gray-700 text-white p-3 rounded-md focus:outline-none focus:border-white transition"
              />

              <input
                name="category"
                value={formData.category}
                onChange={onChangeHandler}
                type="text"
                placeholder="Enter Category"
                className="bg-transparent border border-gray-700 text-white p-3 rounded-md focus:outline-none focus:border-white transition"
              />

              <textarea
                name="description"
                value={formData.description}
                onChange={onChangeHandler}
                placeholder="Write Description..."
                className="bg-transparent border border-gray-700 text-white p-3 rounded-md min-h-[100px] focus:outline-none focus:border-white transition"
              />

              <input
                onChange={fileHandler}
                type="file"
                accept="image/*"
                className="bg-transparent border border-gray-700 text-gray-300 p-3 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-white file:text-black hover:file:bg-gray-300 transition"
              />

              <button className="mt-2 bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 transition">
                Post Blog
              </button>
            </form>
          </section>
        ) : (
          <section>
            <h2 className="text-2xl font-bold mb-6">Your Blogs</h2>

            {blogs.length === 0 ? (
              <p className="text-gray-400">No blogs posted yet.</p>
            ) : (
              <div className="overflow-x-auto border border-gray-800 rounded-lg">
                <table className="min-w-full text-sm">
                  <thead className="bg-neutral-950 text-gray-300">
                    <tr>
                      <th className="py-3 px-4 text-left border-b border-gray-800">Title</th>
                      <th className="py-3 px-4 text-left border-b border-gray-800">Category</th>
                      <th className="py-3 px-4 text-center border-b border-gray-800">Image</th>
                      <th className="py-3 px-4 text-center border-b border-gray-800">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogs.map((blog) => (
                      <tr key={blog._id} className="hover:bg-neutral-900 transition-colors duration-200">
                        <td className="py-3 px-4 border-b border-gray-800">{blog.title}</td>
                        <td className="py-3 px-4 border-b border-gray-800">{blog.category}</td>

                        {/* ⭐ Cloudinary Image here */}
                        <td className="py-3 px-4 text-center border-b border-gray-800">
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-16 h-16 object-cover rounded-md mx-auto border border-gray-700"
                          />
                        </td>

                        <td
                          onClick={() => removeBlog(blog._id)}
                          className="py-3 px-4 text-center text-red-500 font-semibold cursor-pointer border-b border-gray-800 hover:text-red-400"
                        >
                          ✖
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
