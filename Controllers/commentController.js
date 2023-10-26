const Comment = require("../models/Comment");

// Create a new comment
exports.createComment = (req, res) => {
  const { text, blogId, userId } = req.body;

  if (!text || !blogId || !userId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newComment = new Comment({
    text,
    blog: blogId,
    user: userId,
  });

  newComment
    .save()
    .then((comment) => {
      res.status(201).json(comment);
    })
    .catch((err) => {
      console.error("Error creating comment:", err);
      res.status(500).json({ message: "Failed to create comment" });
    });
};

// Get all comments
exports.getAllComments = (req, res) => {
  Comment.find()
    .then((comments) => {
      res.json(comments);
    })
    .catch((err) => {
      console.error("Error fetching comments:", err);
      res.status(500).json({ message: "Failed to fetch comments" });
    });
};

// Get comments for a specific blog
exports.getCommentsForBlog = (req, res) => {
  const blogId = req.params.blogId;

  Comment.find({ blog: blogId })
    .then((comments) => {
      res.json(comments);
    })
    .catch((err) => {
      console.error("Error fetching comments for the blog:", err);
      res
        .status(500)
        .json({ message: "Failed to fetch comments for the blog" });
    });
};

// Get a specific comment by ID
exports.getCommentById = (req, res) => {
  const commentId = req.params.commentId;

  Comment.findById(commentId)
    .then((comment) => {
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      res.json(comment);
    })
    .catch((err) => {
      console.error("Error fetching comment by ID:", err);
      res.status(500).json({ message: "Failed to fetch comment by ID" });
    });
};

// Update a comment by ID
exports.updateComment = (req, res) => {
  const commentId = req.params.commentId;
  const { text } = req.body;

  Comment.findByIdAndUpdate(commentId, { text }, { new: true })
    .then((comment) => {
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      res.json(comment);
    })
    .catch((err) => {
      console.error("Error updating comment:", err);
      res.status(500).json({ message: "Failed to update comment" });
    });
};

// Delete a comment by ID
exports.deleteComment = (req, res) => {
  const commentId = req.params.commentId;

  Comment.findByIdAndRemove(commentId)
    .then((comment) => {
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      res.json({ message: "Comment deleted successfully" });
    })
    .catch((err) => {
      console.error("Error deleting comment:", err);
      res.status(500).json({ message: "Failed to delete comment" });
    });
};
