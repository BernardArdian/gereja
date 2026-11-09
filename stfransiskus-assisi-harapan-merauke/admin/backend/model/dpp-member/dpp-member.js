const mongoose = require("mongoose");
const bycript = require("bcrypt");

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
