const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

router.post("/newblog", blogController.createBlog);
router.get("/", blogController.getAllBlogs);
router.get("/:blogId", blogController.getBlogById);
router.put("/:blogId", blogController.updateBlog);
router.delete("/:blogId", blogController.deleteBlog);

module.exports = router;
