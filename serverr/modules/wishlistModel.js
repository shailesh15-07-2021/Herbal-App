const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  userObjectID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserDB",
    },
  ],

  productObjectID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],

  status: {
    type: String,
    require: true,
    default: 0,
  },
});

const WishlistDB = mongoose.model("WishlistDB", wishlistSchema);
module.exports = WishlistDB;
