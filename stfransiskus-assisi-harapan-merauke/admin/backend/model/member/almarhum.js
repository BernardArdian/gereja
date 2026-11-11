// model/almarhum.js
const mongoose = require("mongoose");

// Bentuk arsip anggota umat yang meninggal beserta relasi ke data umat asal.
const AlmarhumSchema = new mongoose.Schema(
  {
    nama: { type: String, required: true },
    peran: { type: String, enum: ["suami", "istri", "single", "anak"] },
    idUmatAsal: { type: mongoose.Schema.Types.ObjectId, ref: "Umat" },
    tglMeninggal: { type: String },
    lokasiMakam: { type: String },
    tglArsip: { type: Date, default: Date.now },
  },
  {
    _id: false,
    collection: "almarhum",
    minimize: true,
    timestamps: true,
    strict: true,
  },
);

const Almarhum = mongoose.model("Almarhum", AlmarhumSchema);
