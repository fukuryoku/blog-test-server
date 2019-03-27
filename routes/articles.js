const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  createArticle,
  getArticle,
  updateArticle,
  deleteArticle
} = require("../handlers/articles");

// prefix - /api/users/:id/articles
router.route("/").post(createArticle);

// prefix - /api/users/:id/articles/:article_id
router
  .route("/:article_id")
  .get(getArticle)
  .put(updateArticle)
  .delete(deleteArticle);

module.exports = router;
