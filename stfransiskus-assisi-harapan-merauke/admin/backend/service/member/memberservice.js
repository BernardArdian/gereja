const validatedatamember = require("../../helper/validatedatamember");

const Member = require("../../model/member/member");

class memberservice {
  static async createMember(data) {
    try {
      validatedatamember(data);

      const sanitizedId = data.id?.trim() || `MEM-${Date.now()}`;
      const nama = data.nama.trim();
      const existingMember = await Member.findOne({ nama });

      if (existingMember) {
        throw Object.assign(new Error("data sudah ada"), { statusCode: 409 });
      }

      const cleanedData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value != null && value !== '')
      );

      return new Member({
        ...cleanedData,
        id: sanitizedId,
        nama,
      }).save();
    } catch (error) {
      if (error.code === 11000) {
        throw Object.assign(new Error("Data sudah ada (duplikat)."), {
          statusCode: 409,
        });
      }
      throw Object.assign(new Error(`Terjadi kesalahan : ${error.message}`), {
        statusCode: 500,
      });
    }
  }

  static async getAllMember() {
    try {
      const allMembers = await Member.find({});
      return allMembers;
    } catch (error) {
      throw Object.assign(new Error("Gagal mengambil data member"), {
        statusCode: 500,
      });
    }
  }

  static async getAllMemberById(id) {
    const memberById = this.member.findIndex((e) => e.id === parseInt(id));

    if (!memberById) {
      throw new Error("data umat yang di cari tidak di temukan");
    }

    return memberById;
  }

  static async updateMember(id, updateData) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw Object.assign(new Error("ID member tidak valid"), {
        statusCode: 400,
      });
    }

    const cleanedData = Object.fromEntries(
      Object.entries(updateData).filter(([_, val]) => val !== "")
    );

    try {
      const updatedMember = await Member.findByIdAndUpdate(id, cleanedData, {
        new: true,
        runValidators: true,
      });

      if (!updatedMember) {
        throw Object.assign(new Error("Member tidak ditemukan"), {
          statusCode: 404,
        });
      }

      return updatedMember;
    } catch (error) {
      throw Object.assign(new Error("Gagal memperbarui data member: " + error.message), {
        statusCode: error.statusCode || 500,
      });
    }
  }


  static async deleteMember(id) {
    try {
      const member = await Member.findByIdAndDelete(id);

      if (!member) {
        throw Object.assign(new Error("Member tidak ditemukan"), {
          statusCode: 404,
        });
      }
      return member;
    } catch (error) {
      throw Object.assign(new Error("Gagal menghapus data member"), {
        statusCode: 500,
      });
    }
  }
}

module.exports = memberservice;
