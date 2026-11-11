const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT;

// Membatasi akses route dengan memverifikasi token Bearer pada header request.
function AuthMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // Tanpa token, request tidak memiliki kredensial untuk dilanjutkan.
  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    // Token tidak valid/kedaluwarsa ditolak; payload valid disimpan di request.
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
}

module.exports = AuthMiddleware;
