const mongoose = require("mongoose");

const ContactUsSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    smallcase: true,
    unique: true,
    trim: true,
    required: true,
  },
  contact: {
    type: String,
    unique: true,
    trim: true,
    max: 10,
  },
  subject: {
    type: String,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("ContactUs", ContactUsSchema);
