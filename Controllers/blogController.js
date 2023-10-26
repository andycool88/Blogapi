const Blog = require("../models/Blog");

// Create a new blog
exports.createBlog = (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newBlog = new Blog({
    title,
    content,
  });

  newBlog
    .save()
    .then((blog) => {
      res.status(201).json(blog);
    })
    .catch((err) => {
      console.error("Error creating blog:", err);
      res.status(500).json({ message: "Failed to create blog" });
    });
};

// Get all blogs
exports.getAllBlogs = (req, res) => {
  Blog.find()
    .populate("author") // Populate author information
    .then((blogs) => {
      res.json(blogs);
    })
    .catch((err) => {
      console.error("Error fetching blogs:", err);
      res.status(500).json({ message: "Failed to fetch blogs" });
    });
};

// Get a specific blog by ID
exports.getBlogById = (req, res) => {
  const blogId = req.params.blogId;

  Blog.findById(blogId)
    .populate("author") // Populate author information
    .then((blog) => {
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      res.json(blog);
    })
    .catch((err) => {
      console.error("Error fetching blog by ID:", err);
      res.status(500).json({ message: "Failed to fetch blog by ID" });
    });
};

// Update a blog by ID
exports.updateBlog = (req, res) => {
  const blogId = req.params.blogId;
  const { title, content } = req.body;

  Blog.findByIdAndUpdate(blogId, { title, content }, { new: true })
    .then((blog) => {
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      res.json(blog);
    })
    .catch((err) => {
      console.error("Error updating blog:", err);
      res.status(500).json({ message: "Failed to update blog" });
    });
};

// Delete a blog by ID
exports.deleteBlog = (req, res) => {
  const blogId = req.params.blogId;

  Blog.findByIdAndRemove(blogId)
    .then((blog) => {
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      res.json({ message: "Blog deleted successfully" });
    })
    .catch((err) => {
      console.error("Error deleting blog:", err);
      res.status(500).json({ message: "Failed to delete blog" });
    });
};
