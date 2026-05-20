const mongoose = require("mongoose");

const StasiSchema = new mongoose.Schema(
  {
    nama: { type: String, required: true },
    wilayah: { type: String },
    kode: { type: String },
  },
  { _id: false },
);
module.exports = mongoose.model("stasi", StasiSchema);
