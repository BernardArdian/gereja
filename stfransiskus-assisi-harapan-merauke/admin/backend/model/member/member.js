const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    //inputDate: {type:Date, default: Date.now},
    nama: { type: String, required: true },
    stasi: { type: String, required: true },
    birth_place: { type: String, required: true },
    birth_date: { type: Date, required: true },
    riwayat: { type: String, required: true, enum: ["hidup", "meninggal"] },
    gender: { type: String, required: true, enum: ["laki-laki", "perempuan"] },
    baptise_place: { type: String },
    baptise_date: { type: Date },
    status: {
      type: String,
      enum: ["menikah", "belummenikah", "janda", "duda"],
    },
    partner_name: { type: String },
    married_date: { type: Date },
  },
  { timestamps: true }
);

// Middleware: Pre-save
memberSchema.pre("save", function (next) {
  console.log("[PRE-SAVE] Validating and preparing member before save...");
  this.nama = this.nama.trim();
  this.stasi = this.stasi.trim();
  this.birth_place = this.birth_place.trim();

  if (this.status === "menikah" && (!this.partner_name || !this.married_date)) {
    return next(
      new Error(
        "Pasangan dan tanggal pernikahan harus diisi jika status menikah"
      )
    );
  }
  next();
});

// Middleware: Pre-find (for .find, .findOne, etc)
memberSchema.pre(/^find/, function (next) {
  console.log("[PRE-FIND] Querying member data...");
  next();
});

// Middleware: Pre-update
memberSchema.pre("findOneAndUpdate", function (next) {
  console.log("[PRE-UPDATE] Updating member...");
  next();
});

// Middleware: Pre-remove
memberSchema.pre("remove", function (next) {
  console.log("[PRE-REMOVE] Member will be removed: ", this._id);
  next();
});

memberSchema.pre("save", function (next) {
  if (this.status === "menikah" && (!this.partner_name || !this.married_date)) {
    return next(new Error("Pasangan dan tanggal pernikahan harus diisi jika status menikah"));
  }
  next();
});

module.exports = mongoose.model("Member", memberSchema);
