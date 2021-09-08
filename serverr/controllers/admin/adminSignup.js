const AdminDB = require("../../modules/adminModel");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

// Load input validations
const validateRegisterInput = require("../../validation/adminValidation");

module.exports = (req, res, next) => {
  const { error, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(error);
  }

  const { name, email, password, contact, address, stateName, pincode } = req.body;
  bcrypt.hash(password, 10, function (err, hash) {
    if (err) {
      return res.json({
        msg: "Somthing Wrong, Try Later !",
        err: err,
      });
    } else {
      var admin = new AdminDB({
        name: name,
        email: email,
        password: hash,
        contact: contact,
        address: address,
        stateName: stateName,
        pincode: pincode,
      });
      admin
        .save()
        .then((result) => {
          // res.render("signupForm")
          res.status(201).json({
            msg: "Data Added successfully",
            result: result,
          });
        })
        .catch((err) => {
          res.status(500).send({
            mesaage: err.message || "some error occured while creating Admin",
          });
        });
    }
  });
};

