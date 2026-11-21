// Memuat variabel lingkungan agar konfigurasi sensitif, seperti URI MongoDB,
// dapat diatur di luar kode aplikasi.
const mongoose = require("mongoose");
require("dotenv").config();
const { assertDataEncryptionKey } = require("../security/dataEncryption");

// Membuka koneksi MongoDB sebelum layanan backend menggunakan model data.
const connectDB = async () => {
  try {
    assertDataEncryptionKey();
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI belum dikonfigurasi.");
    }
    // URI koneksi dibaca dari environment, bukan ditulis langsung di kode.
    const mongoOptions = process.env.MONGO_TLS === "true" ? { tls: true } : {};
    await mongoose.connect(process.env.MONGO_URI, mongoOptions);

    const encryptionMigration = await mongoose.connection
      .collection("security_migrations")
      .findOne({ _id: "umat-aes-gcm-v1" });
    if (!encryptionMigration) {
      throw new Error(
        "Migrasi enkripsi umat belum selesai. Jalankan npm run migrate:umat-encryption.",
      );
    }

    console.log("MongoDB is connected");
  } catch (error) {
    // Backend tidak dapat beroperasi tanpa database, jadi hentikan proses
    // agar kegagalan koneksi terlihat saat aplikasi mulai dijalankan.
    if (
      error.message.startsWith("DATA_ENCRYPTION_KEY") ||
      error.message.startsWith("MONGO_URI") ||
      error.message.startsWith("Migrasi enkripsi")
    ) {
      console.error(error.message);
    } else {
      // Jangan cetak connection string karena dapat berisi kredensial.
      console.error("MongoDB connection failed:", error.name);
    }
    process.exit(1);
  }
};

module.exports = connectDB;
