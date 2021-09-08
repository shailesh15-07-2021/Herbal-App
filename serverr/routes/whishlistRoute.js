var express = require("express");
const router = express.Router();

//middleware
const auth = require("../middleware/auth");

//  Add Controllers
const wishlistCreate = require("../controllers/wishlist/wishlistCreate");
const wishlistFind = require("../controllers/wishlist/wishlistFind");
const wishlistFindOne = require("../controllers/wishlist/wishlistFindOne");
const wishlistUpdate = require("../controllers/wishlist/wishlistUpdate");
const wishlistDelete = require("../controllers/wishlist/wishlistDelete");

//  Routes
router.post("/create", auth, wishlistCreate);
router.get("/find", auth, wishlistFind);
router.get("/find/:id", auth, wishlistFindOne);
router.put("/update/:id", auth, wishlistUpdate);
router.delete("/delete/:id", auth, wishlistDelete);

module.exports = router;
