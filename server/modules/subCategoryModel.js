const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
  vendorObjectID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
    },
  ],

  categoryObjectID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  title: {
    type: String,
    require: true,
  },

  image: {
    type: String,
  },

  desc: {
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

const SubCategory = mongoose.model("SubCategory", subCategorySchema);
module.exports = SubCategory;
