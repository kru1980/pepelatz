const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// плагин для древовидных комментариев в мангуст
const autopopulate = require("mongoose-autopopulate");

const Post = require("./post");

const schema = new Schema(
  {
    body: {
      type: String,
      required: true
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post"
    },
    parent: {
      type: Schema.Types.ObjectId, // Не обязательно, но содержит индекс родителя для оптимизации, ссылка на самого себя
      ref: "Comment"
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      autopopulate: true
    },
    children: [
      // у каждого комента будут дверевовидных детей
      {
        type: Schema.Types.ObjectId,
        ref: "Comment", // ссылка на самого себя, те такие же как он
        autopopulate: true
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: false // в базе не будет появляться поле updateAt , лишние данные. createdAt сделаем самостоятельно, см выше
  }
);

schema.pre("save", async function(next) {
  if (this.isNew) {
    await Post.incCommentCount(this.post);
  }
  next();
});

schema.plugin(autopopulate);

schema.set("toJSON", {
  virtuals: true
});

module.exports = mongoose.model("Comment", schema);
