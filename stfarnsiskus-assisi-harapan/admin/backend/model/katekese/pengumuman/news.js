const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    thumbnail: {
      type: String,
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /\.(jpg|jpeg|png)$/i.test(v);
        },
        message: (props) =>
          `${props.value} format foto tidak sesuai (jpg, jpeg, png)!`,
      },
    },
    news: {
      type: String,
      require: true,
    },
    author: {
      type: String,
      require: true,
    },
  },
  { createdAt: { Date } }
);

module.exports = mongoose.model("news", newsSchema);
