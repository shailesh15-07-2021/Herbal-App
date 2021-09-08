var express = require("express");
const router = express.Router();

//middleware
const auth = require("../middleware/auth");

//  Add Controllers
const cartCreate = require("../controllers/cart/cartCreate");
const cartFind = require("../controllers/cart/cartFind");
const cartFindOne = require("../controllers/cart/cartFindOne");
const cartUpdate = require("../controllers/cart/cartUpdate");
const cartDelete = require("../controllers/cart/cartDelete");

//  Routes
router.post("/create", auth, cartCreate);
router.get("/find", auth, cartFind);
router.get("/find/:id", auth, cartFindOne);
router.put("/update/:id", auth, cartUpdate);
router.delete("/delete/:id", auth, cartDelete);

module.exports = router;
