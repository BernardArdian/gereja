// Memastikan data persyaratan administratif memiliki judul dan detail teks.
function validateAdministratifFields(data) {
  const requiredFields = ["title", "detail"];

  // Field kosong atau bukan string ditolak dengan status validasi HTTP 400.
  for (const field of requiredFields) {
    const value = data[field];

    if (typeof value !== "string" || !value.trim()) {
      throw Object.assign(new Error(`Field ${field} harus diisi.`), {
        statusCode: 400,
      });
    }
  }
}

module.exports = validateAdministratifFields;
