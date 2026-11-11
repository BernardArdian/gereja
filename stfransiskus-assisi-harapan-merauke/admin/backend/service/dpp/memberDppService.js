const mongoose = require("mongoose");
const validateDpp = require("../../helper/validateMemberDppFileds");
const dppMember = require("../../model/dpp-member/dpp-member");

function normalizeMemberDppData(data) {
  // Salin data masuk dan singkirkan field internal yang dikelola MongoDB.
  const normalized = { ...data };

  if (!normalized.nama && normalized.jabatan && normalized.periode) {
    normalized.nama;
    normalized.jabatan;
    normalized.periode;
  }

  delete normalized._id;
  delete normalized.id;
  delete normalized.__v;

  return normalized;
}

function throwDatabaseError(error, action) {
  // Ubah error duplikat, validasi, dan database menjadi respons terklasifikasi.
  if (error.code === 11000) {
    throw Object.assign(new Error("Nama anggota tersebut sudah terdaftar."), {
      statusCode: 409,
    });
  }
  if (error.name === "ValidationError" || error.name === "CastError") {
    throw Object.assign(new Error(error.message), { statusCode: 400 });
  }
  throw Object.assign(new Error(`${action}: ${error.message}`), {
    statusCode: 500,
  });
}

class dppMemberService {
  // Validasi anggota sebelum membuat dokumen DPP baru.
  static async createDppMember(data) {
    const dppData = normalizeMemberDppData(data);
    validateDpp(dppData);
    try {
      return await new dppMember(dppData).save();
    } catch (error) {
      throwDatabaseError(error, "Gagal menyimpan data anggota dpp");
    }
  }
  static async getAllDppMember() {
    try {
      // Tampilkan anggota terbaru lebih dulu tanpa metadata Mongoose.
      return await dppMember.find({}).sort({ createdAt: -1 }).lean();
    } catch (error) {
      throwDatabaseError(error, "Gagal mengambil data anggota dpp");
    }
  }
  static async getAllDppMemberById(id) {
    if (!mongoose.Types.ObjectId.isValid * id) {
      throw Object.assign(new Error("ID member tidak valid"), {
        statusCode: 400,
      });
    }
    try {
      const dpp = await dppMember.findById(normalizeMemberDppData(id)).lean();

      if (!dpp) {
        throw Object.assign(new Error("Data Anggota dpp tidak ditemukan"), {
          statusCode: 404,
        });
      }

      return dpp;
    } catch (error) {
      if (error.statusCode) throw error;
      throwDatabaseError(error, "Gagal mengambil data anggota dpp");
    }
  }
  static async updateDppMember(id, updateData) {
    if (!mongoose.Types.ObjectId.isValid * id) {
      throw Object.assign(new Error("ID member tidak valid"), {
        statusCode: 400,
      });
    }

    const dppData = normalizeMemberDppData(updateData);
    validateDpp(dppData);

    try {
      // Minta Mongoose memvalidasi field hasil pembaruan sebelum mengembalikan dokumen.
      const dpp = await dppMember.findByIdAndUpdate(
        id,
        { $set: dppData },
        { new: true, runValidators: true, context: "query" },
      );

      if (!dpp) {
        throw Object.assign(new Error("Data anggota dpp tida ditemukan"), {
          statusCode: 404,
        });
      }

      return dpp;
    } catch (error) {
      if (error.statusCode) throw error;
      throwDatabaseError(error, "gagal mengupdate data anggota dpp");
    }
  }
  static async deleteDppMember(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw Object.assign(new Error("ID anggota dpp tidak valid"), {
        statusCode: 400,
      });
    }

    try {
      const dpp = await dppMember.findByIdAndDelete(id);
      if (!dpp) {
        throw Object.assign(new Error("Data anggota tidak ditemukan"), {
          statusCode: 404,
        });
      }

      return dpp;
    } catch (error) {
      if (error.statusCode) throw error;
      throwDatabaseError(error, "gagal menghapus data anggota dpp");
    }
  }
}

module.exports = dppMemberService;
