const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateRegisterInput(data) {
  let error = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.price = !isEmpty(data.price) ? data.price : "";

  if (Validator.isEmpty(data.name)) {
    error.name = "Name field is required";
  }

  if (Validator.isEmpty(data.price)) {
    error.price = "price field is required";
  }

  return {
    error,
    isValid: isEmpty(error),
  };
};
