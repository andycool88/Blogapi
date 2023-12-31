const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  blog: { type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
