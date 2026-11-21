const MAX_SEARCH_LENGTH = 80;

function escapeRegexLiteral(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function createLiteralSearchRegex(value) {
  if (typeof value !== "string") {
    throw Object.assign(new Error("Kata pencarian harus berupa teks."), {
      statusCode: 400,
    });
  }

  const normalized = value.trim();
  if (!normalized) return null;
  if (normalized.length > MAX_SEARCH_LENGTH) {
    throw Object.assign(new Error("Kata pencarian terlalu panjang."), {
      statusCode: 400,
    });
  }

  return new RegExp(escapeRegexLiteral(normalized), "i");
}

module.exports = { createLiteralSearchRegex, escapeRegexLiteral };
