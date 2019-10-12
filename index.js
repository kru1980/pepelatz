const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config/config");
const db = require("./config/db");

const app = express();

// mongo start
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

app.get("/", function(req, res) {
  res.render("index");
});

app.listen(config.PORT, function() {
  console.log("Example app listening on port !" + config.PORT);
});
