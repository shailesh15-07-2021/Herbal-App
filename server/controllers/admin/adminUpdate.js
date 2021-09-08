const AdminDB = require("../../modules/adminModel");

// Load input validations
const validateRegisterInput = require("../../validation/adminUpdateValidation");

module.exports = (req, res, next) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const id = req.params.id;
  AdminDB.findByIdAndUpdate(id, req.body, { upsert: true, new: true })
    .then((data) => {
      if (!data) {
        res
          .status(400)
          .send({ message: "error whie finding Admin of particular id" });
      } else {
        res.status(200).json({
          data: data,
          msg: "updated succesfully",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "error Admin update information" });
    });
};
