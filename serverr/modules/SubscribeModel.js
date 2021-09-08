const mongoose = require("mongoose");

const SubscribeSchema = new mongoose.Schema({
  email: {
    type: String,
    smallcase: true,
    unique: true,
    trim: true,
  },
});

module.exports = mongoose.model("Subscriber", SubscribeSchema);
