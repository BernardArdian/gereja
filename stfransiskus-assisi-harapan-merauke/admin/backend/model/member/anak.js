const mongoose = require("mongoose");
const sakramen = require("./sakramen");

const anakSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  tglLahir: { type: String, default: "" },
  tempatLahir: { type: String, default: "" },
  namaAyah: { type: String, default: "" },
  namaIbu: { type: String, default: "" },
  anakKe: { type: Number, default: null },
  statusHidup: {
    type: String,
    enum: ["hidup", "meninggal"],
    default: "hidup",
  },
  stasiIndividu: { type: String },
  tglMeninggal: { type: String },
  lokasiMakam: { type: String },
  baptis: [sakramen],
  komuni: [sakramen],
  krisma: [sakramen],
  ketAnak: { type: String, default: undefined },
  statusAnak: {
    type: String,
    enum: ["anak kandung", "anak angkat", "anak tiri"],
  },
  anakDari: { type: String },
});

module.exports = mongoose.model("anak", anakSchema);
