const mongoose = require("mongoose");
const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");

const initFetchVideoJob = require("./jobs/fetch-video");
const indexRouter = require("./routes/index");
const secrets = require("./util/secrets");




const app = express();

mongoose
  .connect(secrets.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    
  })
  .catch((err) => {
    if (err) {
      console.log(`Failed to connect to MongoDB: ${err}`);
    }
  });


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.use((req, res, next) => {
  next(createError(404));
});


app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

initFetchVideoJob();
module.exports = app;
