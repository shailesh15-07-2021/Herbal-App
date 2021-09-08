const VendorDB = require("../../modules/vendorModel");
const shortId = require("shortid");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

// Load input validations
const validateRegisterInput = require("../../validation/vendorValidation");

module.exports = (req, res, next) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // console.log(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  VendorDB.findOne({ email: req.body.email }).then((user) => {
    errors.email = "Email already exists";
    if (user) {
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.name, {
        s: "200", // size
        r: "pg", // rating
        d: "mm", // default
      });

      const Vendor = VendorDB({
        name: req.body.name,
        email: req.body.email,
        username: shortId.generate(),
        contact: req.body.contact,
        password: req.body.password,
        password2: req.body.password2,
        status: req.body.status,
        image: req.body.image,
        companyName: req.body.companyName,
        address: req.body.address,
        landmark: req.body.landmark,
        city: req.body.city,
        stateName: req.body.stateName,
        pincode: req.body.pincode,
        country: req.body.country,
        avatar,
      });

      bcrypt.genSalt(12, (err, salt) => {
        bcrypt.hash(Vendor.password, salt, (err, hash) => {
          if (err) throw err;
          Vendor.password = hash;
          Vendor.save()
            .then((data) => {
              res.status(201).json({
                msg: "Success",
                data: data,
              });
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
};
