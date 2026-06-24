const mongoose = require("mongoose");

const StasiSchema = new mongoose.Schema(
  {
    nama_stasi: { type: String, require: true },
    nama_gereja: { type: String, require: true },
    desa: { type: String, require: true },
    umat: { type: String, require: true },
    alamat: { type: String, require: true },
  },
  { _id: false, collection: "stasi", timestamps: true, strict: true },
);
module.exports = mongoose.model("stasi", StasiSchema);
