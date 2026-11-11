const mongoose = require("mongoose");
const bycript = require("bcrypt");

// Skema menyimpan nama anggota DPP, jabatan, periode, dan ID unik.
const dppMemberSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    nama: {
      type: String,
      required: true,
    },
    jabatan: { type: String, required: true },
    periode: { type: String, required: true },
  },
  { collection: "meber-dpp", timestamps: true },
);
module.exports = mongoose.model("member-dpp", dppMemberSchema);
