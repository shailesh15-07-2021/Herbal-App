const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  vendorObjectID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
  },

  title: {
    type: String,
    require: true,
  },

  image: {
    type: String,
  },

  dsc: {
    type: String,
  },

  createdDate: {
    type: Date,
    default: Date.now,
  },

  status: {
    type: String,
    require: true,
    default: 0,
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
