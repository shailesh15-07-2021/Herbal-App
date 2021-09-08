const VendorDB = require("../../modules/vendorModel");

// Load input validations
const validateRegisterInput = require("../../validation/vendorUpdateValidtion");

module.exports = (req, res, next) => {
    const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  const id = req.params.id;
  VendorDB.findByIdAndUpdate(id, req.body,{upsert:true,new:true})
    .then((data) => {
      if (!data) {
        res
          .status(400)
          .send({ message: "error whie finding Vendor of particular id" });
      } else {
        res.status(200).json({
          msg: "Data updated successfully",
          data: data,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "error Vendor update information" });
    });
};
