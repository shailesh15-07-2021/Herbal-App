const ProductDB = require("../../modules/productModel");

// Load input validations
const validateRegisterInput = require("../../validation/productValidation");

module.exports = (req, res, next) => {
  const { error, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(error);
  }

  const {
    vendorObjectID,
    SubCategoryObjectID,
    name,
    img,
    des,
    subDes,
    price,
    discountPrice,
    size,
    qty,
    status,
    reviews,
    rating,
    numReviews,
  } = req.body;

  const product = new ProductDB({
    vendorObjectID,
    SubCategoryObjectID,
    name,
    img,
    des,
    subDes,
    price,
    discountPrice,
    size,
    qty,
    status,
    reviews,
    rating,
    numReviews,
  });
  product
    .save()
    .then((data) => {
      res.status(201).json({
        msg: "Data added successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        mesaage: err.message || "some error occured while creating product",
      });
    });
};
