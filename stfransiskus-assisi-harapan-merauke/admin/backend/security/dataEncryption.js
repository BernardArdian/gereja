const crypto = require("node:crypto");

const ENCRYPTION_PREFIX = "enc:v1:";
const SENSITIVE_STRING_FIELDS = new Set([
  "noKk",
  "nama",
  "namaSuami",
  "namaIstri",
  "tempatLahir",
  "tglLahir",
  "tglMeninggal",
  "lokasiMakam",
  "stasiKeluarga",
  "stasiIndividu",
  "tempat",
  "tanggal",
  "stasi",
]);

function getDataEncryptionKey() {
  const encodedKey = process.env.DATA_ENCRYPTION_KEY?.trim();
  if (!encodedKey) {
    throw new Error("DATA_ENCRYPTION_KEY belum dikonfigurasi.");
  }

  const key = Buffer.from(encodedKey, "base64");
  if (key.length !== 32 || key.toString("base64") !== encodedKey) {
    throw new Error("DATA_ENCRYPTION_KEY harus berupa base64 dari 32 byte.");
  }
  return key;
}

function assertDataEncryptionKey() {
  getDataEncryptionKey();
}

function deriveKey(purpose) {
  return Buffer.from(
    crypto.hkdfSync(
      "sha256",
      getDataEncryptionKey(),
      Buffer.alloc(0),
      Buffer.from(`stfransiskus:${purpose}:v1`),
      32,
    ),
  );
}

function encryptString(value, fieldName) {
  if (typeof value !== "string" || value.length === 0) return value;
  if (value.startsWith(ENCRYPTION_PREFIX)) return value;

  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(
    "aes-256-gcm",
    deriveKey("pii-encryption"),
    iv,
  );
  cipher.setAAD(Buffer.from(`umat:${fieldName}:v1`));
  const ciphertext = Buffer.concat([
    cipher.update(value, "utf8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  return `${ENCRYPTION_PREFIX}${iv.toString("base64url")}.${authTag.toString("base64url")}.${ciphertext.toString("base64url")}`;
}

function decryptString(value, fieldName) {
  if (typeof value !== "string" || !value.startsWith(ENCRYPTION_PREFIX)) {
    return value;
  }

  const [ivPart, tagPart, ciphertextPart] = value
    .slice(ENCRYPTION_PREFIX.length)
    .split(".");
  if (!ivPart || !tagPart || ciphertextPart === undefined) {
    throw new Error("Format data terenkripsi tidak valid.");
  }

  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    deriveKey("pii-encryption"),
    Buffer.from(ivPart, "base64url"),
  );
  decipher.setAAD(Buffer.from(`umat:${fieldName}:v1`));
  decipher.setAuthTag(Buffer.from(tagPart, "base64url"));
  return Buffer.concat([
    decipher.update(Buffer.from(ciphertextPart, "base64url")),
    decipher.final(),
  ]).toString("utf8");
}

function mapSensitiveFields(value, transform, fieldName = "") {
  if (Array.isArray(value)) {
    return value.map((item) => mapSensitiveFields(item, transform));
  }
  if (!value || typeof value !== "object") {
    return SENSITIVE_STRING_FIELDS.has(fieldName) && typeof value === "string"
      ? transform(value, fieldName)
      : value;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) return value;

  return Object.fromEntries(
    Object.entries(value).map(([key, nestedValue]) => [
      key,
      mapSensitiveFields(nestedValue, transform, key),
    ]),
  );
}

function prepareMemberData(data) {
  const plainData = { ...data };
  delete plainData.noKkHash;

  if (typeof plainData.noKk === "string" && plainData.noKk.trim()) {
    plainData.noKkHash = crypto
      .createHmac("sha256", deriveKey("noKk-index"))
      .update("umat:noKk:index:v1\0")
      .update(plainData.noKk.trim().normalize("NFKC"))
      .digest("hex");
  } else {
    delete plainData.noKkHash;
  }

  return mapSensitiveFields(plainData, encryptString);
}

function restoreMemberData(data) {
  const plainData = data?.toObject ? data.toObject() : data;
  const restored = mapSensitiveFields(plainData, decryptString);
  if (restored && typeof restored === "object" && !Array.isArray(restored)) {
    delete restored.noKkHash;
  }
  return restored;
}

module.exports = {
  assertDataEncryptionKey,
  decryptString,
  encryptString,
  getNoKkIndex: (value) =>
    crypto
      .createHmac("sha256", deriveKey("noKk-index"))
      .update("umat:noKk:index:v1\0")
      .update(String(value).trim().normalize("NFKC"))
      .digest("hex"),
  prepareMemberData,
  restoreMemberData,
};
