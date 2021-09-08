const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },

  email: {
    type: String,
    unique: true,
    require: true,
  },

  password: {
    type: String,
    require: true,
  },

  contact: {
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

const UserDB = mongoose.model("UserDB", userSchema);
module.exports = UserDB;
