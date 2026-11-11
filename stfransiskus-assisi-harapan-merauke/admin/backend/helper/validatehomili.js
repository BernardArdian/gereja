// Memastikan homili berisi tema, penulis, dan isi sebelum disimpan.
function Validatehomili(date) {
  const requiredFields = ["tema", "author", "detail"];

  // Nilai wajib harus berupa teks yang bukan string kosong atau spasi saja.
  for (const field of requiredFields) {
    const value = date[field];

    if (typeof value !== "string" || !value.trim()) {
      throw Object.assign(new Error(`Field ${field} harus diisi.`), {
        statusCode: 400,
      });
    }
  }
}
