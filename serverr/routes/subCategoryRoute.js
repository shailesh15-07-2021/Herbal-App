var express = require("express");
const router = express.Router();

//middleware
const auth = require("../middleware/auth");

//  Add Controllers
const subCategoryCreate = require("../controllers/SubCategory/subCategoryCreate");
const subCategoryFind = require("../controllers/SubCategory/subCategoryFind");
const subCategoryFindOne = require("../controllers/SubCategory/subCategoryFindOne");
const subCategoryUpdate = require("../controllers/SubCategory/subCategoryUpdate");
const subCategoryDelete = require("../controllers/SubCategory/subCategoryDelete");

//  Routes
router.post("/create",  subCategoryCreate);
router.get("/find",  subCategoryFind);
router.get("/find/:id", subCategoryFindOne);
router.put("/update/:id", auth, subCategoryUpdate);
router.delete("/delete/:id",  subCategoryDelete);

module.exports = router;
