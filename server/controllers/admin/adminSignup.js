const AdminDB = require("../../modules/adminModel");
const shortId = require("shortid");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

// Load input validations
const validateRegisterInput = require("../../validation/adminValidation");

module.exports = (req, res, next) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // console.log(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  AdminDB.findOne({ email: req.body.email }).then((user) => {
    errors.email = "Email already exists";
    if (user) {
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.name, {
        s: "200", // size
        r: "pg", // rating
        d: "mm", // default
      });

      const Admin = AdminDB({
        name: req.body.name,
        email: req.body.email,
        username: shortId.generate(),
        contact: req.body.contact,
        password: req.body.password,
        password2: req.body.password2,
        avatar,
      });

      bcrypt.genSalt(12, (err, salt) => {
        bcrypt.hash(Admin.password, salt, (err, hash) => {
          if (err) throw err;
          Admin.password = hash;
          Admin.save()
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
