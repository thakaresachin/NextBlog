import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from "./router/user.route.js";
import BlogRoutes from "./router/blogs.routs.js";
import cors from "cors";
const app = express();


app.use(cors({ origin: "http://localhost:5173", credentials: true }));





app.use("/uploads", express.static("uploads"))

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Connect MongoDB
connectDB();

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});


app.use('/users', userRoutes);
app.use('/blogs', BlogRoutes);

app.use('/images', express.static('uploads'));


// Start server
app.listen(5000, () => {
  console.log('✅ Backend server running at http://localhost:5000');
});
