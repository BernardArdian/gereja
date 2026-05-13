const News = require("../../model/katekese/pengumuman/news");

const validateNewsFields = require("../../helper/validateNewsFields");

class newsServices {
  static async inputNews(data) {
    validateNewsFields(data);

    const sanitizedId = data.id?.trim() || `NEWS-${Date.now()}`;
    const cleanedData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== "")
    );

    return News({
      ...cleanedData,
      id: sanitizedId,
    }).save();
  }
}

module.exports = newsServices;
