const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },

  email: {
    type: String,
    require: true,
    index:{
      unique: true,
    }
  },

  password: {
    type: String,
    require: true,
  },

  contact: {
    type: String,
  },

  companyName: {
    type: String,
  },

  image: {
    type: String,
  },

  createdDate: {
    type: Date,
    default: Date.now,
  },

  address: {
    type: String,
  },

  stateName: {
    type: String,
  },

  pincode: {
    type: String,
  },

  country: {
    type: String,
    default: "INDIA",
  },
  status: {
    type: String,
    require: true,
    default: "Active",
  },
});

const Vendor = mongoose.model("Vendor", vendorSchema);
module.exports = Vendor;
