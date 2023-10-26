const Author = require("../models/Author");

// Create a new author
exports.createAuthor = (req, res) => {
  const { fullName, email } = req.body;

  if (!fullName || !email) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newAuthor = new Author({
    fullName,
    email,
  });

  newAuthor
    .save()
    .then((author) => {
      res.status(201).json(author);
    })
    .catch((err) => {
      console.error("Error creating author:", err);
      res.status(500).json({ message: "Failed to create author" });
    });
};

// Get all authors
exports.getAllAuthors = (req, res) => {
  Author.find()
    .then((authors) => {
      res.json(authors);
    })
    .catch((err) => {
      console.error("Error fetching authors:", err);
      res.status(500).json({ message: "Failed to fetch authors" });
    });
};

// Get a specific author by ID
exports.getAuthorById = (req, res) => {
  const authorId = req.params.authorId;

  Author.findById(authorId)
    .then((author) => {
      if (!author) {
        return res.status(404).json({ message: "Author not found" });
      }
      res.json(author);
    })
    .catch((err) => {
      console.error("Error fetching author by ID:", err);
      res.status(500).json({ message: "Failed to fetch author by ID" });
    });
};

// Update an author by ID
exports.updateAuthor = (req, res) => {
  const authorId = req.params.authorId;
  const { fullName, email } = req.body;

  Author.findByIdAndUpdate(authorId, { fullName, email }, { new: true })
    .then((author) => {
      if (!author) {
        return res.status(404).json({ message: "Author not found" });
      }
      res.json(author);
    })
    .catch((err) => {
      console.error("Error updating author:", err);
      res.status(500).json({ message: "Failed to update author" });
    });
};

// Delete an author by ID
exports.deleteAuthor = (req, res) => {
  const authorId = req.params.authorId;

  Author.findByIdAndRemove(authorId)
    .then((author) => {
      if (!author) {
        return res.status(404).json({ message: "Author not found" });
      }
      res.json({ message: "Author deleted successfully" });
    })
    .catch((err) => {
      console.error("Error deleting author:", err);
      res.status(500).json({ message: "Failed to delete author" });
    });
};
