const SubCategory = require("../../modules/subCategoryModel");

// Load input validations
const validateRegisterInput = require("../../validation/subCategoryValidation");

module.exports = (req, res, next) => {
    const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  const id = req.params.id;
  SubCategory.findByIdAndUpdate(id, req.body,{upsert:true,new:true})
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
