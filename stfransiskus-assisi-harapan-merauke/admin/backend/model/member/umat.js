const mongoose = require("mongoose");
const anakSchema = require("./anak");
const sakramenSchema = require("./sakramen");
const singleSchema = require("./single");
const almarhumSchema = require("./almarhum");
const StasiSchema = require("./stasi");

// Fungsi pembantu untuk mengatur urutan
function reorderFields(doc, ret) {
  if (ret.keluarga) {
    const { namaSuami, namaIstri, anak, ...rest } = ret.keluarga;
    //susun ulang manual: Suami -> Istri -> Anak
    ret.keluarga = {
      namaSuami,
      namaIstri,
      anak,
      ...rest,
    };
  }
  return ret;
}

const keluargaSchema = new mongoose.Schema(
  {
    namaSuami: { type: String, require: true },
    statusSuami: {
      type: String,
      enum: ["hidup", "meninggal"],
      default: "hidup",
    },
    statusSakramentSuami: {
      baptis: [sakramenSchema],
      komuni: [sakramenSchema],
      krisma: [sakramenSchema],
    },
    namaIstri: { type: String, require: true },
    statusIstri: {
      type: String,
      enum: ["hidup", "meninggal"],
      default: "hidup",
    },
    statusSakramentIstri: {
      baptis: [sakramenSchema],
      komuni: [sakramenSchema],
      krisma: [sakramenSchema],
    },
    riwayatPasangan: { type: [almarhumSchema], default: undefined },
    anak: { type: [anakSchema], default: undefined },
  },
  {
    _id: false,
    minimize: true,
    toObject: { transform: reorderFields },
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
      unique: true,
      sparse: true,
    },
    stasiKeluarga: { type: StasiSchema, require: true },
    single: { type: singleSchema, default: undefined },
    keluarga: { type: keluargaSchema, default: undefined },
  },
  {
    timestamps: true,
    minimize: true,
    toJSON: {
      transform: (doc, ret) => {
        // Menghapus field null/kosong saat data dikirim ke client
        if (!ret.single) delete ret.single;
        if (!ret.keluarga) delete ret.keluarga;
        if (ret.keluarga?.anak?.length === 0) delete ret.keluarga.anak;
        return ret;
      },
    },
    strict: true,
  },
);

// Middleware: Pre-save
umatSchema.pre("save", function (next) {
  console.log("[PRE-SAVE] Validating and preparing umat before save...");
  this.nama = this.nama.trim();
  this.stasi = this.stasi.trim();
  this.birth_place = this.birth_place.trim();

  if (this.status === "menikah" && (!this.partner_name || !this.married_date)) {
    return next(
      new Error(
        "Pasangan dan tanggal pernikahan harus diisi jika status menikah",
      ),
    );
  }
  next();
});

// Middleware: Pre-find (for .find, .findOne, etc)
umatSchema.pre(/^find/, function (next) {
  console.log("[PRE-FIND] Querying umat data...");
  next();
});

// Middleware: Pre-update
umatSchema.pre("findOneAndUpdate", function (next) {
  console.log("[PRE-UPDATE] Updating umat...");
  next();
});

// Middleware: Pre-remove
umatSchema.pre("remove", function (next) {
  console.log("[PRE-REMOVE] Umat will be removed: ", this._id);
  next();
});

umatSchema.pre("save", function (next) {
  if (this.status === "menikah" && (!this.partner_name || !this.married_date)) {
    return next(
      new Error(
        "Pasangan dan tanggal pernikahan harus diisi jika status menikah",
      ),
    );
  }
  next();
});

module.exports = mongoose.model("Umat", umatSchema);
