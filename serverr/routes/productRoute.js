var express = require("express");
const router = express.Router();

//middleware
const auth = require("../middleware/auth");

//  Add Controllers
const productCreate = require("../controllers/product/productCreate");
const productFind = require("../controllers/product/productFind");
const productFindOne = require("../controllers/product/productFindOne");
const productUpdate = require("../controllers/product/productUpdate");
const productDelete = require("../controllers/product/productDelete");

//  Routes
router.post("/create", productCreate);
router.post("/find", productFind);
router.get("/findOne/:id", productFindOne);
router.put("/update/:id", auth, productUpdate);
router.delete("/delete/:id", productDelete);

module.exports = router;
