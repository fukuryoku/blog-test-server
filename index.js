require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/auth");
const articlesRoutes = require("./routes/articles");
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");
const db = require("./models");
const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(bodyParser.json());


app.use("/api/auth", authRoutes);
app.use(
  "/api/users/:id/articles",
  loginRequired,
  ensureCorrectUser,
  articlesRoutes
);

// GET ALL Articles
app.get("/api/articles", /*loginRequired,*/ async function(req, res, next) {
    try {
      let articles = await db.Article.find()
        .sort({ createdAt: "desc" })
        .populate("user", {
          username: true
        });
      return res.status(200).json(articles);
    } catch (err) {
      return next(err);
    }
  });

  // POST Search Articles
app.post("/api/articles/search", async function(req, res, next) {
  try {
    let articles = await db.Article.find({title:req.body.title})
      .sort({ createdAt: "desc" })
      .populate("user", {
        username: true
      });
    return res.status(200).json(articles);
  } catch (err) {
    return next(err);
  }
});

  

// ERROR HANDLER
app.use(function(req, res, next) {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
  });

  app.use(errorHandler);

  app.listen(PORT, function() {
    console.log(`Server is starting on port ${PORT}`);
  });
  
  