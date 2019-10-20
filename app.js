const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
var staticAsset = require("static-asset");
/* eslint-disable node/no-unpublished-require */
// ругается eslint тк файлы лежат в гитигноре
const db = require("./config/db");
const config = require("./config/config");
/* eslint-enable node/no-unpublished-require */

const app = express();

// const Post = require("./models/post");

// mongo start
mongoose.Promise = global.Promise;
mongoose
  .connect(db.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("local db connected..");
  })
  .catch(err => console.log(err));
// mongo end

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(staticAsset(__dirname + "/public/"));
app.use(express.static(path.join(__dirname, "public")));
// Подкл jQuery
app.use(
  "/javascripts",
  express.static(path.join(__dirname, "node_modules", "jquery", "dist"))
);

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/", function(req, res) {
  res.render(" index");
});

app.listen(config.PORT, function() {
  console.log("Example app listening on port !" + config.PORT);
});
