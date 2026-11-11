const SyaratAdministratif = require("../../model/katekese/administratif/sakramen/syaratAdministratif");
const dppMember = require("../../model/katekese/administratif/memberdpp");

const validateAdministratif = require("../../helper/validateAdministrativeField");
const validateMemberDppfFields = require("../../helper/validateMemberDppFileds");

class administratifService {
  //struktur DPP
  // Validasi dan normalisasi anggota DPP, lalu cegah nama yang sudah terdaftar.
  static async inputMemberDPP(data) {
    validateMemberDppfFields(data);
    const sanitizedId = data.id?.trim() || `DPP-${Date.now()}`;
    const nama = data.name.trim();
    const existingMember = await dppMember.findOne({ name: nama });

    if (existingMember) {
      throw Object.assign(new Error("nama sudah ada"), { statusCode: 409 });
    }

    // Abaikan field kosong agar tidak disimpan sebagai nilai administratif.
    const cleanedData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== ""),
    );

    return dppMember({
      ...cleanedData,
      id: sanitizedId,
      nama,
    }).save();
  }
  static async getStrukturMemberDPPById(id) {}
  static async updateMemberDPP(id, data) {}
  static async deleteMemberDPP(id) {}
  //struktur DPP

  //syarat administratif
  // Validasi syarat, cegah judul duplikat, lalu simpan dokumen baru.
  static async inputSyaratAdministratif(data) {
    try {
      validateAdministratif(data);

      const sanitizedId = data.id?.trim() || `ADMTF-${Date.now()}`;

      if (!data.title || !data.detail) {
        throw Object.assign(new Error("title dan detail harus diisi"), {
          statusCode: 400,
        });
      }

      const title = data.title.trim();
      const existingTitles = await SyaratAdministratif.findOne({ title });

      if (existingTitles) {
        throw Object.assign(new Error("title sudah ada"), { statusCode: 409 });
      }

      const cleanedData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== ""),
      );
      const syaratBaptis = new SyaratAdministratif({
        ...cleanedData,
        id: sanitizedId,
        title: title,
        detail: data.detail.trim(),
      });
      await syaratBaptis.save();
      return syaratBaptis;
    } catch (e) {
      throw Object.assign(new Error(`terjadi kesalahan : ${e.message}`), {
        statusCode: 500,
      });
    }
  }
  static async getSyaratAdministratifById() {
    try {
      // Saat ini metode mengembalikan seluruh syarat, bukan mencari berdasarkan ID.
      const syaratAdministratif = await SyaratAdministratif.find({});

      return syaratAdministratif;
    } catch (e) {
      throw Object.assign(new Error("Gagal mengambil data member"), {
        statusCode: 500,
      });
    }
  }
  static async updateSyaratAdministratif(id, data) {}
  static async deleteSyaratAdministratif(id) {}
  //syarat administratif
}

module.exports = administratifService;
