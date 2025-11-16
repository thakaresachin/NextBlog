import Blog from "../model/blog.model.js";

// 🟩 1️⃣ Get All Blogs
export const allBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// 🟩 2️⃣ Create Blog
export const createBlog = async (req, res) => {
  try {
    const { title, category, description } = req.body;

    if (!title || !category || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let image_url = null;
    if (req.file) {
      image_url = req.file.path; // ⭐ CLOUDINARY URL
    }

    const newBlog = new Blog({
      title,
      category,
      description,
      image: image_url,
      author: {
        id: req.user._id,
        name: req.user.name,
        image: req.user.image,
      },
    });

    await newBlog.save();

    res.status(201).json({
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// 🟩 3️⃣ Delete Blog (Cloudinary file delete OPTIONAL)
export const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.author.id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete" });
    }

    // ❌ Local file delete removed (Cloudinary auto-manages images)

    await Blog.findByIdAndDelete(blogId);

    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// 🟩 4️⃣ Get Single Blog
export const SingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json(blog);
  } catch (error) {
    console.error("Error fetching single blog:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// 🟩 5️⃣ Get user blogs
export const userBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ "author.id": req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching user's blogs:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// 🟩 6️⃣ Update Blog (Cloudinary supported)
export const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const { title, category, description } = req.body;

    const blog = await Blog.findById(blogId);

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (blog.author.id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to edit" });
    }

    let newImage = blog.image;

    if (req.file) {
      // ⭐ CLOUDINARY new uploaded image
      newImage = req.file.path;
    }

    if (title !== undefined) blog.title = title;
    if (category !== undefined) blog.category = category;
    if (description !== undefined) blog.description = description;

    blog.image = newImage;

    await blog.save();

    return res.status(200).json({
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};
