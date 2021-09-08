require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
const cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const http = require("http");
const passport = require("passport");
const dbConnect = require("./config/database");
const app = express();
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");

// --------------------- CORS ------------------------

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,PATCH,POST,DELETE,OPTIONS"
  );
  next();
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

const sessionConfig = {
  secret: "keyboardcat",
  resave: false,
  saveUninitialized: true,
};
app.use(session(sessionConfig));
app.use(flash());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

// Connect to MongoDB
dbConnect();

// Passport middleware
app.use(passport.initialize());

// =================== Flash message ======================
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

// Passport config
// require("./middleware/passport")(passport);

// Use Routes
app.use("/", require("./routes/indexRoute"));

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running at (==> http://localhost:5000 <==)`);
});
