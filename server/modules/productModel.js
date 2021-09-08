const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
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
  SubCategoryObjectID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
  ],

  slug: {
    type: String,
  },
  name: {
    type: String,
    require: true,
  },

  createdDate: {
    type: Date,
    default: Date.now,
  },

  des: {
    type: String,
  },
  image: {
    type: String,
  },

  subDes: {
    type: String,
  },

  price: {
    type: Number,
    require: true,
  },

  discountPrice: {
    type: Number,
  },

  size: {
    type: String,
  },

  qty: {
    type: String,
  },
  status: {
    type: String,
    require: true,
    default: 0,
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
