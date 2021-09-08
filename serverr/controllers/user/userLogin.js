var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");
var UserDB = require("../../modules/userModel");

if (typeof localStorage === "undefined" || localStorage === null) {
  const LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}

module.exports = (req, res, next) => {
  const { email, password } = req.body;
  UserDB.findOne({ email: email })
    .exec()
    .then((result) => {
      console.log(result);
      if (result.length < 1) {
        res.status(201).json({
          msg: "Invalid user information",
        });
      } else {
        bcrypt.compare(password, result.password, function (err, data) {
          if (err) {
            res.status(201).json({
              msg: "Authorization faild",
            });
          }
          if (data) {
            var token = jwt.sign(
              {
                id: result._id,
                name: result.name,
                email: result.email,
                contact: result.contact,
              },
              "secret",
              {
                expiresIn: "12h",
              }
            );
            res.status(201).json({
              msg: "Success",
              token: token,
            });
          } else {
            res.json({
              msg: "User password wrong",
            });
          }
        });
      }
    })
    .catch((err) => {
      res.json({
        error: err,
      });
    });
};
