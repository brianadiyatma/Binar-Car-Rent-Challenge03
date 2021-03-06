const express = require("express");
const createError = require("http-errors");
const moment = require("moment");
const path = require("path");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const toastr = require("express-toastr");

const expressLayouts = require("express-ejs-layouts");
const fileUpload = require("express-fileupload");
const router = require("./routes");
const app = express();

require("dotenv").config();

const LocalStorage = require("node-localstorage").LocalStorage;

// view engine setup
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/default");

// Dependencies
app.use(cookieParser("secret"));
app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true,
    user: null,
  })
);
app.use(flash());
app.use(
  toastr({
    positionClass: "toast-top-right",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());

app.use(function (req, res, next) {
  res.locals.toasts = req.toastr.render();
  next();
});

app.use((req, res, next) => {
  res.locals.moment = moment;
  next();
});

app.use(router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", { title: res.locals.message });
});

app.listen(process.env.PORT, () => {
  console.log(`Server Berjalan di Port ${process.env.PORT}`);
});
