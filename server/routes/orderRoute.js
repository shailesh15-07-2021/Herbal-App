const express = require("express");
const router = express.Router();

//middleware
const auth = require("../middleware/auth");

//  Add Controllers
const orderCreate = require("../controllers/Order/create");
const orderFind = require("../controllers/Order/find");
const orderFindOne = require("../controllers/Order/findOne");
const orderByOrderId = require("../controllers/Order/findByOrderId");
const orderUpdate = require("../controllers/Order/updatePayDetails");
const orderDelete = require("../controllers/Order/delete");

//  Routes
router.post("/create", orderCreate);
router.post("/find", orderFind);
router.get("/find/:id", orderFindOne);
router.get("/find-order-by-id/:id", orderByOrderId);
router.put("/update-payment/:id/pay", auth, orderUpdate);
router.delete("/delete/:id", auth, orderDelete);

module.exports = router;
