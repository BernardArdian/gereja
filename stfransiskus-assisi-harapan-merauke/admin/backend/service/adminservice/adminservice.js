const Admin = require("../../model/admin/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Environment variables
const JWT_SECRET = process.env.JWT;

class adminService {
  // Simpan kredensial dalam bentuk hash; password asli tidak disimpan ke DB.
  static async registerAdmin({ id, adminname, password, role }) {
    const hashedPassword = await bcrypt.hash(password.trim(), 10);
    const admin = new Admin({
      id,
      adminname: adminname.trim(),
      password: hashedPassword,
      role: role.trim().toLowerCase(),
    });
    await admin.save();
    return { id, adminname, role };
  }

  static async adminLogin({ adminname, password, role }) {
    // Gunakan pesan kredensial yang sama agar keberadaan username tidak bocor.
    const admin = await Admin.findOne({ adminname });
    if (!admin) throw new Error("Username atau password salah");

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) throw new Error("Username atau password salah");
    if (admin.role !== role) throw new Error("Role tidak cocok");

    // Token membawa identitas dan role admin dengan masa berlaku satu jam.
    const token = jwt.sign(
      { id: admin.id, adminname: admin.adminname, role: admin.role },
      JWT_SECRET,
      { expiresIn: "1h" },
    );

    return {
      message: "Login berhasil",
      token,
      admin: {
        id: admin.id,
        adminname: admin.adminname,
        role: admin.role,
      },
    };
  }

  static async getAllAdmins() {
    // Ambil hanya role pengelola dan batasi field hasil yang dikirim ke klien.
    return await Admin.find({
      role: { $in: ["admin", "superadmin"] },
    }).select("adminname role");
  }

  static async deleteAdmin(id) {
    const admin = await Admin.findOneAndDelete({ id });
    if (!admin) throw new Error("Admin tidak ditemukan");
    return { message: "Admin dihapus" };
  }
}

module.exports = adminService;
