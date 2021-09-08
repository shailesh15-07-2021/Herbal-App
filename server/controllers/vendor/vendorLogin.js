var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");
const VendorDB = require("../../modules/vendorModel");

if (typeof localStorage === "undefined" || localStorage === null) {
  const LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}

module.exports = (req, res, next) => {
  const { email, password } = req.body;
  VendorDB.findOne({ email: email })
    .exec()
    .then((result) => {
      if (result.length < 1) {
        res.redirect("/vendor");
      } else {
        bcrypt.compare(password, result.password, function (err, data) {
          if (err) {
            res.redirect("/vendor", { msg: "login Failed", result: err });
          }
          if (data) {
            var authtoken = jwt.sign(
              {
                id: result._id,
                name: result.name,
                email: result.email,
                contact: result.contact,
                username: result.username,
                status: result.status,
                avatar: result.avatar,
                companyName: result.companyName,
              },
              "secret",
              {
                expiresIn: "12h",
              }
            );
            localStorage.setItem("etoken", authtoken);
            res.redirect("/vendor/dashboard");
          } else {
            res.redirect("/vendor");
          }
        });
      }
    })
    .catch((err) => {
      res.redirect("/vendor");
    });
};
