var express = require("express");
const router = express.Router();

//middleware
const auth = require("../middleware/auth");

//  Add Controllers
const contactCreate = require("../controllers/ContactUs/create");
const contactFind = require("../controllers/ContactUs/find");
const contactFindOne = require("../controllers/ContactUs/findOne");

//  Routes
router.post("/create", contactCreate);
router.get("/find", auth, contactFind);
router.get("/find/:id", auth, contactFindOne);

module.exports = router;
