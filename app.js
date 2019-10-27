const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
var staticAsset = require("static-asset");
/* eslint-disable node/no-unpublished-require */
// ругается eslint тк файлы лежат в гитигноре
const db = require("./config/db");

const config = require("./config/config");
const routes = require("./routes/index");
const session = require("express-session");

const MongoStore = require("connect-mongo")(session);

/* eslint-enable node/no-unpublished-require */

const app = express();

// const Post = require("./models/post");

// mongo start
mongoose.Promise = global.Promise;
mongoose
  .connect(db.mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("local db connected..");
    // вызываем генератор мок данных
    // require("./mocks")();
  })
  .catch(err => console.log(err));
// mongo end

// sessions
app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    }),
    expires: new Date(Date.now() + 60 * 60 * 24 * 30)
  })
);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(staticAsset(__dirname + "/public/"));
app.use(express.static(path.join(__dirname, "public")));
// Подкл jQuery
app.use(
  "/javascripts",
  express.static(path.join(__dirname, "node_modules", "jquery", "dist"))
);

// all routes

// app.get("/", function(req, res) {
//   const id = req.session.userId;
//   const login = req.session.userLogin;
//   res.render("index", {
//     user: { id, login }
//   });
// });

// роут регистрации
app.use("/", routes.archive);
app.use("/api/auth", routes.auth);
app.use("/post", routes.post);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.render("error", {
    message: error.message,
    error: !config.IS_PRODUCTION ? error : {}
  });
});

app.listen(config.PORT, function() {
  console.log("Example app listening on port !" + config.PORT);
});
