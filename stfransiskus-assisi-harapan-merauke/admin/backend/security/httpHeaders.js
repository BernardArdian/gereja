const helmet = require("helmet");

// API JSON responses use Helmet headers; the frontend host should set its own CSP.
const securityHeaders = helmet({
  contentSecurityPolicy: false,
  strictTransportSecurity:
    process.env.NODE_ENV === "production" ? undefined : false,
});

module.exports = securityHeaders;
