const mongoose = require("mongoose");
const User = require("./user");

const articleSchema = new mongoose.Schema(
  { 
  image: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

    title: {
        type: String,
        maxLength: 160,
        required: true,
        unique: true    
      },
    description: {
        type: String,
        required: true,
      },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

articleSchema.pre("remove", async function(next) {
  try {
    // find a user
    let user = await User.findById(this.user);
    // remove the id of the article from their articles list
    user.articles.remove(this.id);
    // save that user
    await user.save();
    // return next
    return next();
  } catch (err) {
    return next(err);
  }
});

const Article = mongoose.model("Article", articleSchema);
module.exports = Article;
