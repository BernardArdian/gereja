const MAX_NESTING_DEPTH = 20;
const MAX_CONTAINER_ITEMS = 5000;

const isUnsafeKey = (key) =>
  key.startsWith("$") ||
  key.includes(".") ||
  key === "__proto__" ||
  key === "prototype" ||
  key === "constructor";

function assertSafeStructure(value, depth = 0) {
  if (depth > MAX_NESTING_DEPTH) {
    throw Object.assign(new Error("Struktur input terlalu dalam."), {
      statusCode: 400,
    });
  }

  if (Array.isArray(value)) {
    if (value.length > MAX_CONTAINER_ITEMS) {
      throw Object.assign(new Error("Jumlah item input terlalu besar."), {
        statusCode: 400,
      });
    }
    value.forEach((item) => assertSafeStructure(item, depth + 1));
    return;
  }

  if (!value || typeof value !== "object") return;

  const entries = Object.entries(value);
  if (entries.length > MAX_CONTAINER_ITEMS) {
    throw Object.assign(new Error("Jumlah properti input terlalu besar."), {
      statusCode: 400,
    });
  }

  for (const [key, nestedValue] of entries) {
    if (isUnsafeKey(key)) {
      throw Object.assign(
        new Error("Input mengandung properti yang tidak diizinkan."),
        { statusCode: 400 },
      );
    }
    assertSafeStructure(nestedValue, depth + 1);
  }
}

function inputSecurityMiddleware(req, res, next) {
  try {
    assertSafeStructure(req.body);
    assertSafeStructure(req.query);
    assertSafeStructure(req.params);
    return next();
  } catch (error) {
    return res.status(error.statusCode || 400).json({ error: error.message });
  }
}

module.exports = { assertSafeStructure, inputSecurityMiddleware };
