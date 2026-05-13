const mongoose = require("mongoose");

const EventGerejaSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    days: { type: String, required: true },
    dates: { type: Date, required: true },
    detail: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("pengumuman", EventGerejaSchema,"pengumumen");
