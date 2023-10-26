const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");

router.post("/", authorController.createAuthor);
router.get("/", authorController.getAllAuthors);
router.get("/:authorId", authorController.getAuthorById);
router.put("/:authorId", authorController.updateAuthor);
router.delete("/:authorId", authorController.deleteAuthor);

module.exports = router;
