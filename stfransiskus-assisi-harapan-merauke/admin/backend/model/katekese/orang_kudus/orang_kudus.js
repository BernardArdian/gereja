const mongoose = require("mongoose");

// Menyimpan nama dan deskripsi tokoh orang kudus untuk konten katekese.
const Orang_Kudus_Schema = new mongoose.Schema(
  {
    id: { type: String, require: true },
    name: { type: String, require: true },
    description: { type: String, require: true },
  },
  { createdAt: Date },
);

module.exports = mongoose.model("Orang_Kudus", Orang_Kudus_Schema);
