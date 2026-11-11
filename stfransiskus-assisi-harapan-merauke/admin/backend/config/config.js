// Memuat variabel lingkungan agar konfigurasi sensitif, seperti URI MongoDB,
// dapat diatur di luar kode aplikasi.
const mongoose = require("mongoose");
require("dotenv").config();

// Membuka koneksi MongoDB sebelum layanan backend menggunakan model data.
const connectDB = async () => {
  try {
    // URI koneksi dibaca dari environment, bukan ditulis langsung di kode.
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB is connected");
  } catch (error) {
    // Backend tidak dapat beroperasi tanpa database, jadi hentikan proses
    // agar kegagalan koneksi terlihat saat aplikasi mulai dijalankan.
    console.error("MongoDB connection error:" + error);
    process.exit(1);
  }
};

module.exports = connectDB;
