var express = require("express");
const multer = require("multer");
const router = express.Router();
const VendorDB = require("../modules/vendorModel");
const CategoryDB = require("../modules/categoryModel");
const SubCategoryDB = require("../modules/subCategoryModel");
const ProductDB = require("../modules/productModel");
const OrderDB = require("../modules/OrderModel");
const mongoose = require("mongoose");

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
const adminSignup = require("../controllers/admin/adminSignup");
const adminLogin = require("../controllers/admin/adminLogin");

const adminFind = require("../controllers/admin/adminFind");
const adminFindOne = require("../controllers/admin/adminFindOne");
const adminUpdate = require("../controllers/admin/adminUpdate");
const adminDelete = require("../controllers/admin/adminDelete");

//  Routes
router.get("/find", adminFind);
router.get("/find/:id", adminFindOne);
router.put("/update/:id", adminUpdate);
router.delete("/delete/:id", adminDelete);

//  User Logins
router.post("/login", adminLogin);
router.post("/signup", adminSignup);

// ----------------------- EJS --------------------------------------

router.get("/", function (req, res, next) {
  res.render("admin/adminLoginForm");
});

router.get("/dashboard", auth, function (req, res, next) {
  res.render("admin/dashboard");
});

// ------------------- add new Vendor ------------------------
router.get("/addvendor", auth, (req, res) => {
  res.render("admin/addVendorForm");
});

router.post("/addvendor", upload.single("image"), (req, res, next) => {
  const {
    name,
    contact,
    companyName,
    address,
    stateName,
    pincode,
    email,
    password,
  } = req.body;
  var vendorDetails = new VendorDB({
    name: name,
    contact: contact,
    companyName: companyName,
    image: `uploads/${req.file.filename}`,
    address: address,
    stateName: stateName,
    pincode: pincode,
    email: email,
    password: password,
  });
  // console.log(vendorDetails)
  vendorDetails
    .save()
    .then((res) => {
      req.flash("success", "New Vendor created Successfully");
      res.redirect("/admin/list");
    })
    .catch((err) => {
      req.flash("failed", "New Vendor does`nt created");
      res.redirect("/admin/list");
    });
});

router.get("/list", async (req, res) => {
  const vendors = await VendorDB.find({});
  res.render("admin/vendorList", { vendors });
});

// ----------------- Delete Vendor ----------------
router.delete("/vendor/:id", async (req, res) => {
  req.flash("success", "Vendor deleted Successfully");
  await VendorDB.findByIdAndDelete(req.params.id);
});

// // ----------------- Delete category ----------------
// router.delete("/category/:id", async (req, res) => {
//   req.flash("success", "data deleted Successfully");
//   await CategoryDB.findByIdAndDelete(req.params.id);
//   res.redirect("/admin/categorylist");
// });

// ----------------------------------- Add new product form -----------------------------
router.get("/addproduct", async (req, res, next) => {
  const categories = await CategoryDB.find({});
  res.render("admin/newProductForm", { categories });
});

router.get("/subcat/:id", (req, res, next) => {
  res.json({
    result: [
      { _id: "1", title: "bye" },
      { _id: "1", title: "hello" },
      { _id: "1", title: "tat" },
    ],
    msg: "success",
  });
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
    res.redirect("/admin/productlist");
  } catch (e) {
    console.log(e.message);
  }
});

// ---- product List --
router.get("/productlist", async (req, res) => {
  // Adding Pagination
  // const limitValue = req.query.limit || 10;
  // const skipValue = req.query.skip || 0;

  const products = await ProductDB.find({});

  // .limit(limitValue)
  // .skip(skipValue);

  res.render("admin/productList", { products });
});

// ----------------------------------- Add new Category form -----------------------------
router.get("/addcategory", (req, res, next) => {
  res.render("admin/newCategoryForm");
});

router.post("/addcategory", upload.single("image"), async (req, res) => {
  try {
    const { vendorObjectID, title, dsc, status } = req.body;
    await CategoryDB.create({
      vendorObjectID: vendorObjectID,
      title: title,
      image: `uploads/${req.file.filename}`,
      dsc: dsc,
      status: status,
    });

    // console.log(req.body)
    req.flash("success", "Created Successfully");
    res.redirect("/admin/categorylist");
  } catch (e) {
    console.log(e.message);
  }
});

// ---- Category List --
router.get("/categorylist", async (req, res) => {
  const categories = await CategoryDB.find({});
  res.render("admin/categoryList", { categories });
});

// ----------------------------------- Add new Sub-Category form -----------------------------
router.get("/addsubcategory", async (req, res, next) => {
  const categories = await CategoryDB.find({});
  res.render("admin/newSubCategoryForm", { categories });
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
    res.redirect("subcategorylist");
  } catch (e) {
    console.log(e.message);
  }
});

// ---- Sub-Category List --
router.get("/subcategorylist", async (req, res) => {
  const subCategories = await SubCategoryDB.find({});
  res.render("admin/subCategoryList", { subCategories });
});

// ---------------------------- Order Details -----------------------------
router.get("/order", async (req, res, next) => {
  var orders = await OrderDB.aggregate([
    {
      $lookup: {
        from: "userdbs",
        localField: "user",
        foreignField: "_id",
        as: "userData",
      },
    },
    {
      $unwind: {
        path: "$userData",
      },
    },
  ]);

  res.render("admin/order", { orders });
  // console.log(orders);
});

// --------- Single Order ---------
router.get("/singleorder/:id", async (req, res) => {
  var ObjectId = require("mongodb").ObjectId;

  var id = req.params.id;

  const order = await OrderDB.findById(id);

  res.render("admin/singleOrder", { order });
  console.log(order);
});

module.exports = router;
