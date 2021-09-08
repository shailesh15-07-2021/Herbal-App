var jwt = require("jsonwebtoken");
var LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");

// Authentication Middelware
module.exports = (req, res, next) => {
  try {
    var etoken = localStorage.getItem("etoken");
    // console.log(etoken);
    var decode = jwt.verify(etoken, "secret");
    req.userData = decode;
    next();
  } catch {
    res.redirect("/admin");
  }
};
