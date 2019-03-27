const mongoose = require("mongoose");
mongoose.set("debug", true); //for mongo queries in console
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/warbler", {
keepAlive: true
});

module.exports.User = require("./user");
module.exports.Article = require("./article");
