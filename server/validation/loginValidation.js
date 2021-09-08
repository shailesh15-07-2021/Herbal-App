const Validator = require("validator");
const isEmpty = require("./isempty");

module.exports = function validateLoginInput(data) {
  let error = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    error.email = "Email is not match";
  }

  if (Validator.isEmpty(data.password)) {
    error.password = "Password field is required";
  }

  if (Validator.isEmpty(data.email)) {
    error.email = "Email field is required";
  }

  return {
    error,
    isValid: isEmpty(error),
  };
};
