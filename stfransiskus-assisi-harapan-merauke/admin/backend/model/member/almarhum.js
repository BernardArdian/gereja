// model/almarhum.js
const mongoose = require("mongoose");

const AlmarhumSchema = new mongoose.Schema(
  {
    nama: { type: String, required: true },
    peran: { type: String, enum: ["suami", "istri", "individu", "anak"] }, // Enum lengkap!
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
  },
);

const Almarhum = mongoose.model("Almarhum", AlmarhumSchema);
