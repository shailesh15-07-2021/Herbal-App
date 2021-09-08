var express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const vendorDB = require("../modules/vendorModel");
const CategoryDB = require("../modules/categoryModel");
const SubCategoryDB = require("../modules/subCategoryModel");
const ProductDB = require("../modules/productModel");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    const currentTime = new Date();
    const d = currentTime.getTime().toString();
    //console.log(currentTime);
    //console.log(d);
    const ext = file.originalname.split(".").pop();
    cb(null, d + "." + ext);
  },
});

var upload = multer({ storage: storage });

var LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");

if (typeof localStorage === "undefined" || localStorage === null) {
  const LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}

//middleware
const auth = require("../middleware/auth");

//  Add Controllers

const vendorLogin = require("../controllers/vendor/vendorLogin");
const vendorSignup = require("../controllers/vendor/vendorSignup");
const vendorFind = require("../controllers/vendor/vendorFind");
const vendorFindOne = require("../controllers/vendor/vendorFindOne");
const vendorUpdate = require("../controllers/vendor/vendorUpdate");
const vendorDelete = require("../controllers/vendor/vendorDelete");

//  Routes

router.get("/find", vendorFind);
router.get("/find/:id", vendorFindOne);
router.put("/update/:id", vendorUpdate);
router.delete("/delete/:id", vendorDelete);

// User Login
router.post("/login", vendorLogin);
router.post("/signup", vendorSignup);

// ----------------------- EJS --------------------------------------

router.get("/", function (req, res, next) {
  res.render("vendor/vendorLoginForm");
});

router.get("/new", function (req, res, next) {
  res.render("vendor/vendorSignupForm");
});

router.get("/dashboard", function (req, res, next) {
  res.render("vendor/vendorDashboard");
});

router.post("/new", async (req, res) => {
  try {
    const vendor = new vendorDB({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const newVendor = await vendorDB.register(newVendor, req.body.password);

    res.redirect("/");
    // console.log(newUser);
  } catch (e) {
    console.log(e);
    req.flash("error", e.message);
    res.redirect("/new");
  }
});

// ----------------------------------- Add new product form -----------------------------
router.get("/addproduct", (req, res, next) => {
  res.render("vendor//newProductForm");
});

router.post("/addproduct", upload.single("image"), async (req, res) => {
  try {
    const { name, des, price, size, qty } = req.body;
    await ProductDB.create({
      name: name,
      image: `uploads/${req.file.filename}`,
      des: des,
      price: price,
      size: size,
      qty: qty,
    });

    // console.log(req.body)
    req.flash("success", "Created Successfully");
    res.redirect("/vendor/productlist");
  } catch (e) {
    console.log(e.message);
  }
});

// ---- product List --
router.get("/productlist", async (req, res) => {
  // Adding Pagination
  const limitValue = req.query.limit || 10;
  const skipValue = req.query.skip || 0;

  const products = await ProductDB.find({})

    .limit(limitValue)
    .skip(skipValue);

  res.render("vendor//productList", { products });
});

// ----------------------------------- Add new Category form -----------------------------
router.get("/addcategory", (req, res, next) => {
  res.render("vendor//newCategoryForm");
});

router.post("/addcategory", upload.single("image"), async (req, res) => {
  try {
    const { title, dsc, status } = req.body;
    await CategoryDB.create({
      title: title,
      image: `uploads/${req.file.filename}`,
      dsc: dsc,
      status: status,
    });

    // console.log(req.body)
    req.flash("success", "Created Successfully");
    res.redirect("/vendor/categorylist");
  } catch (e) {
    console.log(e.message);
  }
});

// ---- Category List --
router.get("/categorylist", async (req, res) => {
  const categories = await CategoryDB.find({});
  res.render("vendor/categoryList", { categories });
});

// ----------------------------------- Add new Sub-Category form -----------------------------
router.get("/addsubcategory", async(req, res, next) => {
  const categories = await CategoryDB.find({});
  res.render("vendor/newSubCategoryForm", { categories });
});

router.post("/addsubcategory", upload.single("image"), async (req, res) => {
  try {
    const { categoryObjectID, title, desc, status } = req.body;
    await SubCategoryDB.create({
      categoryObjectID: categoryObjectID,
      title: title,
      image: `uploads/${req.file.filename}`,
      desc: desc,
      status: status,
    });

    // console.log(req.body);
    req.flash("success", "Created Successfully");
    res.redirect("/vendor/subcategorylist");
  } catch (e) {
    console.log(e.message);
  }
});

// ---- Sub-Category List --
router.get("/subcategorylist", async (req, res) => {
  const subCategories = await SubCategoryDB.find({});
  res.render("vendor//subCategoryList", { subCategories });
});

module.exports = router;
