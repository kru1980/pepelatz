const dotenv = require("dotenv");
const path = require("path");

const root = path.resolve(process.cwd(), ".env");
dotenv.config({ path: root });

module.exports = {
  PORT: process.env.PORT || 3000,
  IS_PRODUCTION: process.env.NODE_ENV === "production",
  SESSION_SECRET: process.env.SESSION_SECRET
};
