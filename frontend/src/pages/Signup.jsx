import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: null,
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fileHandler = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("image", formData.image);

      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/users/register",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log(res.data);

      if (res.status === 201 || res.data.success) {
        toast.success(res.data.message || "Signup successful!");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(res.data.message || "Signup failed!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-md bg-[#0a0a0a] border border-gray-800 rounded-2xl p-8 shadow-xl relative overflow-hidden">
        {/* Background Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800/40 to-black opacity-70 rounded-2xl pointer-events-none"></div>

        <div className="relative z-10">
          <h1 className="text-3xl font-extrabold text-center mb-6 tracking-tight">
            Create your account
          </h1>
          <p className="text-center text-gray-400 mb-8 text-sm">
            Join the <span className="text-white font-medium">NextBlog</span>{" "}
            community and share your story with the world.
          </p>

          <form onSubmit={submitHandler} className="flex flex-col gap-5">
            <input
              onChange={onChangeHandler}
              name="name"
              value={formData.name}
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded-lg bg-transparent border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-white transition"
              required
            />
            <input
              onChange={onChangeHandler}
              name="email"
              value={formData.email}
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded-lg bg-transparent border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-white transition"
              required
            />
            <input
              onChange={onChangeHandler}
              name="password"
              value={formData.password}
              type="password"
              placeholder="Your Password"
              className="w-full p-3 rounded-lg bg-transparent border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-white transition"
              required
            />
            <input
              onChange={fileHandler}
              accept="image/*"
              type="file"
              className="w-full p-3 rounded-lg bg-transparent border border-gray-700 text-gray-400 file:cursor-pointer file:bg-white file:text-black file:rounded-lg file:px-4 file:py-1 hover:border-white transition"
              required
            />

            <button
              disabled={loading}
              className={`mt-4 bg-white text-black font-semibold px-6 py-3 w-full rounded-lg transition duration-300 hover:bg-gray-200 ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-400 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-white hover:underline hover:text-gray-300"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
