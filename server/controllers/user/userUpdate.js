const UserDB = require("../../modules/userModel");

// Load input validations
const validateRegisterInput = require("../../validation/userUpdateValidation");

module.exports = (req, res, next) => {
  const { error, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(error);
  }
  const id = req.params.id;
  UserDB.findByIdAndUpdate(id, req.body, { upsert: true, new: true })
    .then((data) => {
      if (!data) {
        res
          .status(400)
          .send({ message: "error whie finding User of particular id" });
      } else {
        res.status(200).json({
          msg: "Data updated successfully",
          data: data,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "error User update information" });
    });
};
