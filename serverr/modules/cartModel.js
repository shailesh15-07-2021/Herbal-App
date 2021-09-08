const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({

  productObjectID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },

  qty: {
    type: Number,
  },
  
  status: {
    type: String,
    require: true,
    default: 0,
  },
});

const CartDB = mongoose.model("CartDB", cartSchema);
module.exports = CartDB;
