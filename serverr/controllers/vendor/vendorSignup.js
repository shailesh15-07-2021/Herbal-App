const VendorDB = require("../../modules/vendorModel");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

// Load input validations
const validateRegisterInput = require("../../validation/vendorValidation");

module.exports = (req, res, next) => {
  const { error, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(error);
  }

  const { name, email, password, contact, address, stateName, pincode ,companyName,status} = req.body;
  bcrypt.hash(password, 10, function (err, hash) {
    if (err) {
      return res.json({
        msg: "Somthing Wrong, Try Later !",
        err: err,
      });
    } else {
      var vendor = new VendorDB({
        name: name,
        email: email,
        password: hash,
        contact: contact,
        address: address,
        stateName: stateName,
        pincode: pincode,
        companyName:companyName,
        status:status
      });
      vendor
        .save()
        .then((result) => {
          res.status(201).json({
            msg: "Data Added successfully",
            result: result,
          });
        })
        .catch((err) => {
          res.status(500).send({
            mesaage: err.message || "some error occured while creating Vendor",
          });
        });
    }
  });
};

