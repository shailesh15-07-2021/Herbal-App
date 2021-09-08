const ProductDB = require("../../modules/productModel");

// Load input validations
const validateRegisterInput = require("../../validation/productValidation");

module.exports = (req, res, next) => {
  const { error, isValid } = validateRegisterInput(req.body);

  // Check Validation

  if (!isValid) {
    return res.status(400).json(error);
  }


  ProductDB.findByIdAndUpdate(req.params.id, req.body,{upsert:true,new:true})
    .then((data) => {
      if (!data) {
        res
          .status(400)
          .send({ message: "error whie finding data of particular id" });
      } else {
        res.status(200).json({
          msg: "Data Updated successfully",
          data: data,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "error Category update information" });
    });
};
