import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../context/StoreContext.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { login } = useContext(StoreContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all fields!");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("https://nextblog-3-backend.onrender.com/users/login", {
        email,
        password,
      });

      console.log(res.data);

      if (res.status === 200 || res.data.success) {
        login(res.data.user, res.data.token);
        toast.success(res.data.message || "Login successful!");
        setTimeout(() => navigate("/"), 1000);
      } else {
        toast.error(res.data.message || "Invalid credentials!");
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
        {/* Background Gradient Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800/40 to-black opacity-70 rounded-2xl pointer-events-none"></div>

        <div className="relative z-10">
          <h1 className="text-3xl font-extrabold text-center mb-6 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-center text-gray-400 mb-8 text-sm">
            Login to your <span className="text-white font-medium">NextBlog</span> account and continue your journey.
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-transparent border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-white transition"
              required
            />

            <input
              type="password"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-transparent border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-white transition"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className={`mt-4 bg-white text-black font-semibold px-6 py-3 w-full rounded-lg transition duration-300 hover:bg-gray-200 ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-400 text-sm">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-white hover:underline hover:text-gray-300"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
