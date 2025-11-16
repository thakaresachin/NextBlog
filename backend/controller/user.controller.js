import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// =============== USER REGISTER ==================
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Input validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Cloudinary image URL
    let image_url = null;
    if (req.file) {
      image_url = req.file.path; // ⭐ CLOUDINARY uploaded URL
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      image: image_url,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", newUser });
  } catch (error) {
    console.error("Error in user registration:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// =============== USER LOGIN ==================
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Create token
    const token = jwt.sign(
      { Id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token);

    res.status(200).json({
      message: "Login successful",
      token,
      user,
      userId: user._id,
    });
  } catch (error) {
    console.error("Error in user login:", error);
    res.status(500).json({ message: "Server error" });
  }
};
