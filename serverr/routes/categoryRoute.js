var express = require("express");
const router = express.Router();

//middleware
const auth = require("../middleware/auth");

//  Add Controllers
const categoryCreate = require("../controllers/category/categoryCreate");
const categoryFind = require("../controllers/category/categoryFind");
const categoryFindOne = require("../controllers/category/categoryFindOne");
const categoryUpdate = require("../controllers/category/categoryUpdate");
const categoryDelete = require("../controllers/category/categoryDelete");

//  Routes
router.post("/create",  categoryCreate);
router.get("/find",  categoryFind);
router.get("/find/:id",  categoryFindOne);
router.put("/update/:id", auth, categoryUpdate);
router.delete("/delete/:id",  categoryDelete);

module.exports = router;
