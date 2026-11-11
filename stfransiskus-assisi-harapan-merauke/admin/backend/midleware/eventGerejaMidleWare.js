const pengumuman = require("../model/katekese/pengumuman/pengumuman");

// Menambahkan pemeriksaan field wajib sebelum dokumen pengumuman disimpan.
function pengumumanMiddleware(schema) {
  schema.pre("save", function (next) {
    // Custom validation logic can be added here
    if (!this.id || !this.days || !this.dates || !this.detail) {
      return next(new Error("All fields are required"));
    }
    next();
  });
}

module.exports = pengumumanMiddleware;
