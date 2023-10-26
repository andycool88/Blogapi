const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: false,
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  coAuthors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Author" }],
  likes: { type: Number, default: 1 },
  views: { type: Number, default: 2 },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
