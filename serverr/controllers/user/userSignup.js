const UserDB = require("../../modules/userModel");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

// Load input validations
const validateRegisterInput = require("../../validation/userValidation");

module.exports = (req, res, next) => {
  const { error, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(error);
  }

  const { name, email, password, contact } = req.body;
  bcrypt.hash(password, 12, function (err, hash) {
    if (err) {
      return res.json({
        msg: "Somthing Wrong, Try Later !",
        err: err,
      });
    } else {
      var user = new UserDB({
        name: name,
        email: email,
        password: hash,
        contact: contact,
      });
      user
        .save()
        .then((result) => {
          res.status(201).json({
            msg: "Success",
            result: result,
          });
        })
        .catch((err) => {
          res.status(500).send({
            mesaage: err.message || "some error occured while creating User",
          });
        });
    }
  });
};
