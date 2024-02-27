const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  user:{
    type:String
  },
  product:{
    type:Array
  }
});

module.exports = mongoose.model("wishlist", wishlistSchema);