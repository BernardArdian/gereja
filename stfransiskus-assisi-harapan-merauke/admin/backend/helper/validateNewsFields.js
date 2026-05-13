function validateNewsFields(data) {
    const requiredFields = [
        "title",
        "thumbnail",
        "news",
        "author"
    ];

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
