import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const YourBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editBlog, setEditBlog] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // 🔹 Fetch User Blogs
  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/blogs/user/blog", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching user blogs:", error);
        toast.error("Failed to load your blogs!");
      }
    };
    fetchUserBlogs();
  }, [token]);

  // 🔹 Delete Blog
  const deleteBlog = async (blogId) => {
    try {
      await axios.delete(`http://localhost:5000/blogs/deleteblog/${blogId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs(blogs.filter((b) => b._id !== blogId));
      toast.success("Blog deleted successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting blog");
    }
  };

  // 🔹 Handle Edit Click
  const handleEditClick = (blog) => {
    setEditBlog({
      _id: blog._id,
      title: blog.title,
      category: blog.category,
      description: blog.description,
      image: null, // new image optional
    });
    setEditMode(true);
  };

  // 🔹 Update Blog
  const updateBlog = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", editBlog.title);
      formData.append("category", editBlog.category);
      formData.append("description", editBlog.description);
      if (editBlog.image) formData.append("image", editBlog.image);

      const res = await axios.put(
        `http://localhost:5000/blogs/updateblog/${editBlog._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Blog updated successfully!");

      setBlogs(blogs.map((b) => (b._id === editBlog._id ? res.data.blog : b)));
      setEditMode(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-black text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">
          Your <span className="text-gray-300">Blogs</span>
        </h1>

        {blogs.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">
            You haven’t posted any blogs yet.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-[#111] border border-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
              >
                {/* ⭐ Cloudinary Image */}
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-52 object-cover"
                />

                <div className="p-5">
                  <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">
                    {blog.category}
                  </p>

                  <h2 className="text-xl font-semibold mb-3">{blog.title}</h2>

                  <p className="text-gray-400 text-sm mb-4">
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </p>

                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => deleteBlog(blog._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition"
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => handleEditClick(blog)}
                      className="border border-gray-500 text-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🔹 Edit Modal */}
      {editMode && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="bg-[#111] p-6 rounded-xl shadow-lg w-full max-w-lg border border-gray-700">
            <h2 className="text-2xl font-semibold mb-4">Edit Blog</h2>

            <form onSubmit={updateBlog} className="flex flex-col gap-4">
              <input
                type="text"
                value={editBlog.title}
                onChange={(e) =>
                  setEditBlog({ ...editBlog, title: e.target.value })
                }
                placeholder="Title"
                className="p-2 rounded bg-gray-800 text-white border border-gray-600 outline-none"
              />

              <input
                type="text"
                value={editBlog.category}
                onChange={(e) =>
                  setEditBlog({ ...editBlog, category: e.target.value })
                }
                placeholder="Category"
                className="p-2 rounded bg-gray-800 text-white border border-gray-600 outline-none"
              />

              <textarea
                value={editBlog.description}
                onChange={(e) =>
                  setEditBlog({ ...editBlog, description: e.target.value })
                }
                placeholder="Description"
                className="p-2 rounded bg-gray-800 text-white border border-gray-600 outline-none h-24"
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setEditBlog({ ...editBlog, image: e.target.files[0] })
                }
                className="text-gray-400"
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className={`px-4 py-2 rounded-lg ${
                    loading
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white`}
                >
                  {loading ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default YourBlogs;
