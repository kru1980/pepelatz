const app = require("./app");
const config = require("./config/config");

app.listen(config.PORT, function() {
  console.log("Example app listening on port !" + config.PORT);
});
