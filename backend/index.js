import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from "./router/user.route.js";
import BlogRoutes from "./router/blogs.routs.js";
import cors from "cors";

dotenv.config();

const app = express();

// 🌍 CORS FIX — localhost + hosted frontend allowed
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://nextblog-3-frontend.onrender.com"   // ⚡ your hosted frontend URL
  ],
  credentials: true,
}));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Uploads folder public
app.use("/uploads", express.static("uploads"));
app.use("/images", express.static("uploads"));

// Connect DB
connectDB();

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

// Actual backend routes
app.use("/users", userRoutes);
app.use("/blogs", BlogRoutes);

// Render port fix
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
