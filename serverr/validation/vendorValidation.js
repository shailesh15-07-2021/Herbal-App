const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateRegisterInput(data) {
  let error = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.name)) {
    error.name = "Name field is required";
  }
  if (!Validator.isLength(data.name, { min: 3, max: 30 })) {
    error.name = "Name must be between 3 and 30 characters";
  }

  if (Validator.isEmpty(data.email)) {
    error.email = "E-mail field is required";
  }

  if (Validator.isEmpty(data.password)) {
    error.password = "Password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    error.password = "Password must be between 6 and 30 characters";
  }

  return {
    error,
    isValid: isEmpty(error),
  };
};
