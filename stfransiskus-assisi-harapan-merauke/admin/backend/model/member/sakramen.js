const mongoose = require("mongoose");

// Menyimpan status dan keterangan penerimaan satu jenis sakramen.
const sakramenSchema = new mongoose.Schema(
  {
    status: { type: String, enum: ["sudah", "belum"], default: "belum" },
    tempat: { type: String },
    tanggal: { type: String },
    stasi: { type: String },
  },
  { _id: false, minimize: true },
);

module.exports = mongoose.model("sakramen", sakramenSchema);
