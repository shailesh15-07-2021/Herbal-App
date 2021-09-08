const express = require("express");
const router = express.Router();

//middleware
const auth = require("../middleware/auth");

//  List of All route paths

router.use("/category", require("./categoryRoute"));
router.use("/sub-category", require("./subCategoryRoute"));
router.use("/product", require("./productRoute"));
router.use("/order", require("./orderRoute"));
router.use("/vendor", require("./vendorRoute"));
router.use("/admin", require("./adminRoutes"));
router.use("/", require("./userRoute"));
router.use("/cart", require("./cartRoute"));
router.use("/wishlist", require("./whishlistRoute"));
router.use("/contact", require("./contactUsRoute"));
router.use("/subscribe", require("./subscribeRoute"));

module.exports = router;
