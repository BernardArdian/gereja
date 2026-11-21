const { rateLimit } = require("express-rate-limit");

const commonOptions = {
  windowMs: 15 * 60 * 1000,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  handler(_req, res) {
    res.status(429).json({ error: "Terlalu banyak request. Coba lagi nanti." });
  },
};

const apiLimiter = rateLimit({
  ...commonOptions,
  limit: 180,
});

const loginLimiter = rateLimit({
  ...commonOptions,
  limit: 5,
  skipSuccessfulRequests: true,
  handler(_req, res) {
    res
      .status(429)
      .json({ error: "Terlalu banyak percobaan login. Coba lagi nanti." });
  },
});

module.exports = { apiLimiter, loginLimiter };
