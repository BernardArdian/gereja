const mongoose = require("mongoose");

// Skema pengumuman gereja berisi hari, tanggal, dan uraian informasi.
const EventGerejaSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    days: { type: String, required: true },
    dates: { type: Date, required: true },
    detail: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("pengumuman", EventGerejaSchema, "pengumumen");
