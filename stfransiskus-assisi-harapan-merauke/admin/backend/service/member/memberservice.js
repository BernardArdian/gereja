const mongoose = require("mongoose");
const validatedatamember = require("../../helper/validatedatamember");
const Umat = require("../../model/member/umat");

function normalizeMemberData(data) {
  const normalized = { ...data };

  if (normalized.statusNikah === "menikah") {
    normalized.statusNikah = "sudah menikah";
  }
  if (!normalized.single && normalized.personal) {
    normalized.single = normalized.personal;
  }
  if (!normalized.single && normalized.individu) {
    normalized.single = normalized.individu;
  }
  delete normalized.personal;
  delete normalized.individu;

  if (
    normalized.stasiKeluarga &&
    typeof normalized.stasiKeluarga === "object"
  ) {
    normalized.stasiKeluarga =
      normalized.stasiKeluarga.nama_stasi ||
      normalized.stasiKeluarga.nama ||
      normalized.stasiKeluarga.stasi ||
      "";
  }

  delete normalized._id;
  delete normalized.id;
  delete normalized.__v;
  return normalized;
}

function throwDatabaseError(error, action) {
  if (error.code === 11000) {
    throw Object.assign(
      new Error("Nomor kartu keluarga tersebut sudah terdaftar."),
      { statusCode: 409 },
    );
  }
  if (error.name === "ValidationError" || error.name === "CastError") {
    throw Object.assign(new Error(error.message), { statusCode: 400 });
  }
  throw Object.assign(new Error(`${action}: ${error.message}`), {
    statusCode: 500,
  });
}

class MemberService {
  static async createMember(data) {
    const memberData = normalizeMemberData(data);
    validatedatamember(memberData);

    try {
      return await new Umat(memberData).save();
    } catch (error) {
      throwDatabaseError(error, "Gagal menyimpan data umat");
    }
  }

  static async getAllMember() {
    try {
      return await Umat.find({}).sort({ createdAt: -1 }).lean();
    } catch (error) {
      throwDatabaseError(error, "Gagal mengambil data umat");
    }
  }

  static async getAllMemberById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw Object.assign(new Error("ID umat tidak valid."), {
        statusCode: 400,
      });
    }

    try {
      const member = await Umat.findById(id).lean();
      if (!member) {
        throw Object.assign(new Error("Data umat tidak ditemukan."), {
          statusCode: 404,
        });
      }
      return member;
    } catch (error) {
      if (error.statusCode) throw error;
      throwDatabaseError(error, "Gagal mengambil data umat");
    }
  }

  static async updateMember(id, updateData) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw Object.assign(new Error("ID umat tidak valid."), {
        statusCode: 400,
      });
    }

    const memberData = normalizeMemberData(updateData);
    validatedatamember(memberData);

    try {
      const updatedMember = await Umat.findByIdAndUpdate(
        id,
        { $set: memberData },
        { new: true, runValidators: true, context: "query" },
      );
      if (!updatedMember) {
        throw Object.assign(new Error("Data umat tidak ditemukan."), {
          statusCode: 404,
        });
      }
      return updatedMember;
    } catch (error) {
      if (error.statusCode) throw error;
      throwDatabaseError(error, "Gagal memperbarui data umat");
    }
  }

  static async deleteMember(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw Object.assign(new Error("ID umat tidak valid."), {
        statusCode: 400,
      });
    }

    try {
      const member = await Umat.findByIdAndDelete(id);
      if (!member) {
        throw Object.assign(new Error("Data umat tidak ditemukan."), {
          statusCode: 404,
        });
      }
      return member;
    } catch (error) {
      if (error.statusCode) throw error;
      throwDatabaseError(error, "Gagal menghapus data umat");
    }
  }
}

module.exports = MemberService;
