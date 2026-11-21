const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT;

function authMiddleware(req, res, next) {
  if (!JWT_SECRET) {
    return res
      .status(500)
      .json({ message: "Autentikasi server belum dikonfigurasi." });
  }

  const authorization = req.get("authorization") || "";
  const token = /^Bearer\s+([^\s]+)$/i.exec(authorization)?.[1];
  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] }, (error, user) => {
    if (error) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = user;
    return next();
  });
}

module.exports = authMiddleware;
