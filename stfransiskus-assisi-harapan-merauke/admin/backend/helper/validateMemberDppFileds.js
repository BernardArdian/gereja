// Memeriksa identitas jabatan utama seorang anggota DPP.
function validateMemberDppfFields(data) {
  const requiredFields = ["name", "jabatan", "periode"];

  // Laporkan field pertama yang tidak berisi teks yang dapat digunakan.
  for (const field of requiredFields) {
    const value = data[field];

    if (typeof value !== "string" || !value.trim()) {
      throw Object.assign(new Error(`Field ${field} harus diisi.`), {
        statusCode: 400,
      });
    }
  }
}

module.exports = validateMemberDppfFields;
