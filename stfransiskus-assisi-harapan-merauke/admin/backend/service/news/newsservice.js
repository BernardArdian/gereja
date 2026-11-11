const News = require("../../model/katekese/pengumuman/news");

const validateNewsFields = require("../../helper/validateNewsFields");

class newsServices {
  // Validasi berita, hilangkan field kosong, lalu simpan dengan ID yang tersedia.
  static async inputNews(data) {
    validateNewsFields(data);

    const sanitizedId = data.id?.trim() || `NEWS-${Date.now()}`;
    const cleanedData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== ""),
    );

    return News({
      ...cleanedData,
      id: sanitizedId,
    }).save();
  }
}

module.exports = newsServices;
