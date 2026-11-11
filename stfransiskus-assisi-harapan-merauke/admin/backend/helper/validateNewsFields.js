// Memastikan setiap berita memiliki judul, thumbnail, isi, dan penulis.
function validateNewsFields(data) {
  const requiredFields = ["title", "thumbnail", "news", "author"];

  // String kosong maupun nilai yang bukan string tidak lolos validasi.
  for (const field of requiredFields) {
    const value = data[field];

    if (typeof value !== "string" || !value.trim()) {
      throw Object.assign(new Error(`Field ${field} harus diisi.`), {
        statusCode: 400,
      });
    }
  }
}

module.exports = validateNewsFields;
