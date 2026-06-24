const anouncement = require("../../model/katekese/pengumuman/pengumuman");

const validateAnaucementFields = require("../../helper/validateAnaucementFields");

class anouncementServices {
  static async input_anouncemet(data) {
    validateAnaucementFields(data);
    const sanitizedId = data.id?.trim() || `MEM-${Date.now()}`;

    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== ""),
    );

    const anouncements = new anouncement({
      ...cleanData,
      id: sanitizedId,
      days: data.days.trim(),
      date: data.dates.trim(),
      detail: data.detail.trim(),
    });

    anouncements.save();
    return anouncements;
  }

  static async getAnouncement() {
    const anouncements = await anouncement.find({});

    return anouncements;
  }

  static async updateAnouncemnet() {}

  static async deleteAnouncement(id) {
    const anouncements = await anouncement.findByIdAndDelete(id);

    if (!anouncements) {
      throw Object.assign(new Error("pengumuman tidak ditemukan"), {
        statusCode: 404,
      });
    }
    return member;
  }
}

module.exports = anouncementServices;
