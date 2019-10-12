const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    title: {
      type: String
    },
    body: {
      type: String
    }
  },
  {
    timestamps: true
  }
);
// Запись ниже убирает нижнее подчеркивание у ID
schema.set("toJSON", {
  virtuals: true
});

module.exports = mongoose.model("Post", schema);
