const db = require("../models");



// POST - /api/users/:id/articles/

exports.createArticle = async function(req, res, next) {
  try {
    let article = await db.Article.create({
      image: req.body.image,
      category: req.body.category,
      title: req.body.title,
      description: req.body.description,
      user: req.params.id
    });
    let foundUser = await db.User.findById(req.params.id);
    foundUser.articles.push(article.id);
    await foundUser.save();
    let foundArticle = await db.Article.findById(article._id).populate("user", {
      username: true,
    });
    return res.status(200).json(foundArticle);
  } catch (err) {
    return next(err);
  }
};

// GET - /api/users/:id/articles/:article_id
exports.getArticle = async function(req, res, next) {
  try {
    let article = await db.Article.find(req.params.article_id);
    return res.status(200).json(article);
  } catch (err) {
    return next(err);
  }
};


// EDIT /api/users/:id/articles/:article_id
exports.updateArticle =  async function(req, res, next){
  try{
    let article = await db.Article.findOneAndUpdate({_id: req.params.article_id}, req.body, {new: true})

    let foundArticle = await db.Article.findById(article._id).populate("user", {
      username: true
    });
    return res.status(200).json(foundArticle);
  } catch (err) {
    return next(err);
  }
}



// DELETE /api/users/:id/articles/:article_id
exports.deleteArticle = async function(req, res, next) {
  try {
    let foundArticle = await db.Article.findById(req.params.article_id);
    await foundArticle.remove();

    return res.status(200).json(foundArticle);
  } catch (err) {
    return next(err);
  }
};
