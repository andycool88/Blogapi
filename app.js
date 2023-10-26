const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const authorRoutes = require("./routes/authorRoutes");
const blogRoutes = require("./routes/blogRoutes");
const commentRoutes = require("./routes/commentRoutes");

//const likeRoutes = require('./routes/likeRoutes');
//const viewRoutes = require('./routes/viewRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const mongoAtlasUri =
  "mongodb+srv://andycool:brethart@blogapi.lwup6ya.mongodb.net/?retryWrites=true&w=majority";

// Connection to MongoDB
mongoose
  .connect(mongoAtlasUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to database"))
  .catch((err) => console.log(err));

//Middlewares

app.use("/authors", authorRoutes);
app.use("/blogs", blogRoutes);
app.use("/comments", commentRoutes);

//app.use('/likes', likeRoutes);
//app.use('/views', viewRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
