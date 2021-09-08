const ProductDB = require("../../modules/productModel");

module.exports = (req, res, next) => {
  var keyword = req.body.keyword;
  var lte = req.body.lte;
  var gte = req.body.gte;
  var category = req.body.category;
  var currentPage = req.body.currentPage;
  var id = req.body.id;

  // console.log(req.body);

  if (keyword !== "") {
    var action = {
      $and: [{ $or: [{ name: { $regex: new RegExp(keyword, "i") } }] }],
    };
  } else if (
    keyword === "" &&
    lte !== "" &&
    gte !== "" &&
    category !== "" &&
    currentPage === ""
  ) {
    action = { price: { $lte: gte, $get: lte }, category: SubCategoryObjectID };
  } else if (
    keyword === "" &&
    lte !== "" &&
    gte !== "" &&
    category === "" &&
    currentPage === ""
  ) {
    action = { price: { $lte: gte, $get: lte } };
  } else if (
    keyword === "" &&
    lte === "" &&
    gte === "" &&
    category !== "" &&
    currentPage === ""
  ) {
    action = { category: SubCategoryObjectID };
  } else if (
    keyword === "" &&
    lte === "" &&
    gte === "" &&
    category == "" &&
    currentPage === "" &&
    id !== ""
  ) {
    action = { id: _id };
  }
  // console.log(action);

  ProductDB.find(action)
    .limit(12)
    .skip(0)
    .exec()
    .then((result) => {
      res.status(201).json({ result: result });
    })
    .catch((err) => {
      res.json({
        error: err,
      });
    });
};

// const APIFeatures = require("../../utils/apiFeatures");

// module.exports = async (req, res, next) => {
//   const resPerPage = 9;
//   const productsCount = await ProductDB.countDocuments();

//   const apiFeatures = new APIFeatures(ProductDB.find(), req.query)
//     .search()
//     .filter();

//   let products = await apiFeatures.query;
//   let filteredProductsCount = products.length;

//   apiFeatures.pagination(resPerPage);

//   products = await apiFeatures.query;

//   res.status(200).json({
//     success: true,
//     productsCount,
//     resPerPage,
//     filteredProductsCount,
//     products,
//   });
// };
