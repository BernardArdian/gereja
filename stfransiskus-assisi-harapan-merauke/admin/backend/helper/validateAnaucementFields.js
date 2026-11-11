// Memeriksa informasi pokok pengumuman sebelum data diteruskan ke service.
function validateAnaucementFields(data) {
  const requiredFields = ["days", "dates", "detail"];
  // Trim dipakai agar nilai yang hanya berisi spasi dianggap kosong.
  for (const field of requiredFields) {
    const value = data[field];

    if (typeof value !== "string" || !value.trim()) {
      throw Object.assign(new Error(`Field ${field} harus diisi.`), {
        statusCode: 400,
      });
    }
  }
}

module.exports = validateAnaucementFields;
