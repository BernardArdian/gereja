const mongoose = require("mongoose");

const sacramentSchema = new mongoose.Schema(
  {
    status: { type: String, enum: ["sudah"], required: true },
    tempat: { type: String, trim: true, default: "" },
    tanggal: { type: String, trim: true, default: "" },
    stasi: { type: String, trim: true, default: "" },
  },
  { _id: false },
);

const personSchema = new mongoose.Schema(
  {
    nama: { type: String, required: true, trim: true },
    tempatLahir: { type: String, trim: true, default: "" },
    tglLahir: { type: String, trim: true, default: "" },
    statusHidup: {
      type: String,
      enum: ["hidup", "meninggal"],
      default: "hidup",
    },
    tglMeninggal: { type: String, trim: true, default: "" },
    lokasiMakam: { type: String, trim: true, default: "" },
    baptis: { type: [sacramentSchema], default: [] },
    komuni: { type: [sacramentSchema], default: [] },
    krisma: { type: [sacramentSchema], default: [] },
  },
  { _id: false, minimize: true },
);

const keluargaSchema = new mongoose.Schema(
  {
    namaSuami: { type: String, required: true, trim: true },
    statusSuami: {
      type: String,
      enum: ["hidup", "meninggal"],
      default: "hidup",
    },
    statusSakramentSuami: {
      baptis: { type: [sacramentSchema], default: [] },
      komuni: { type: [sacramentSchema], default: [] },
      krisma: { type: [sacramentSchema], default: [] },
    },
    namaIstri: { type: String, required: true, trim: true },
    statusIstri: {
      type: String,
      enum: ["hidup", "meninggal"],
      default: "hidup",
    },
    statusSakramentIstri: {
      baptis: { type: [sacramentSchema], default: [] },
      komuni: { type: [sacramentSchema], default: [] },
      krisma: { type: [sacramentSchema], default: [] },
    },
    tglMeninggal: { type: String, trim: true, default: "" },
    lokasiMakam: { type: String, trim: true, default: "" },
    anak: { type: [personSchema], default: [] },
  },
  {
    _id: false,
    minimize: true,
    strict: true,
  },
);

const umatSchema = new mongoose.Schema(
  {
    statusNikah: {
      type: String,
      enum: ["belum menikah", "sudah menikah", "duda", "janda"],
      required: true,
    },
    noKk: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
    },
    stasiKeluarga: { type: String, trim: true, required: true },
    single: { type: personSchema, default: undefined },
    keluarga: { type: keluargaSchema, default: undefined },
  },
  {
    timestamps: true,
    minimize: true,
    strict: true,
  },
);

umatSchema.pre("validate", function () {
  if (this.statusNikah === "belum menikah") {
    if (!this.single || this.keluarga) {
      this.invalidate(
        "single",
        "Data individu wajib diisi untuk umat yang belum menikah.",
      );
    }
    return;
  }

  if (!this.keluarga || this.single) {
    this.invalidate(
      "keluarga",
      "Data suami dan istri wajib diisi untuk data keluarga.",
    );
  }
});

module.exports = mongoose.model("Umat", umatSchema);
