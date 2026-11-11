const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

// Skema akun admin menyimpan identitas, hash password, dan role yang diizinkan.
const adminSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: uuidv4, // otomatis dibuat UUID
      unique: true,
    },
    adminname: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "superadmin"],
      required: true,
    },
  },
  { collection: "admin", timestamps: true, strict: true },
);

module.exports = mongoose.model("Admin", adminSchema);
