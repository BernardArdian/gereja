const crypto = require("node:crypto");
const test = require("node:test");
const assert = require("node:assert/strict");

process.env.DATA_ENCRYPTION_KEY ??= crypto.randomBytes(32).toString("base64");
process.env.JWT ??= crypto.randomBytes(32).toString("base64url");

const jwt = require("jsonwebtoken");
const { assertSafeStructure } = require("../security/inputSecurity");
const authMiddleware = require("../security/authentication");
const {
  createLiteralSearchRegex,
  escapeRegexLiteral,
} = require("../security/safeRegex");
const {
  decryptString,
  encryptString,
  getNoKkIndex,
  prepareMemberData,
  restoreMemberData,
} = require("../security/dataEncryption");

test("input guard menolak operator MongoDB dan properti prototipe", () => {
  assert.throws(
    () => assertSafeStructure(JSON.parse('{"filter":{"$ne":null}}')),
    (error) => error.statusCode === 400,
  );
  assert.throws(
    () => assertSafeStructure(JSON.parse('{"__proto__":{"polluted":true}}')),
    (error) => error.statusCode === 400,
  );
});

test("regex pencarian memperlakukan metakarakter sebagai teks literal", () => {
  const regex = createLiteralSearchRegex(".*(a+)");
  assert.equal(regex.test(".*(a+)"), true);
  assert.equal(regex.test("aaaa"), false);
  assert.equal(escapeRegexLiteral("a+b"), "a\\+b");
  assert.throws(
    () => createLiteralSearchRegex("x".repeat(81)),
    (error) => {
      return error.statusCode === 400;
    },
  );
});

test("AES-256-GCM melindungi data dan mengautentikasi nama field", () => {
  const ciphertext = encryptString("Nama Umat", "nama");
  assert.notEqual(ciphertext, "Nama Umat");
  assert.equal(decryptString(ciphertext, "nama"), "Nama Umat");
  assert.throws(() => decryptString(ciphertext, "tempat"));
});

test("data umat dienkripsi dengan indeks KK HMAC dan dipulihkan untuk API", () => {
  const source = {
    noKk: "1234567890123456",
    single: { nama: "Nama Umat", tempatLahir: "Merauke" },
    createdAt: new Date("2024-01-01T00:00:00.000Z"),
  };
  const stored = prepareMemberData(source);
  const restored = restoreMemberData(stored);

  assert.notEqual(stored.noKk, source.noKk);
  assert.notEqual(stored.single.nama, source.single.nama);
  assert.equal(typeof stored.noKkHash, "string");
  assert.equal(getNoKkIndex(source.noKk), stored.noKkHash);
  assert.equal(restored.noKk, source.noKk);
  assert.equal(restored.single.nama, source.single.nama);
  assert.ok(restored.createdAt instanceof Date);
  assert.equal(Object.hasOwn(restored, "noKkHash"), false);
});

test("autentikasi hanya menerima Bearer JWT beralgoritme HS256", async () => {
  const invoke = (authorization) =>
    new Promise((resolve) => {
      const response = {
        status(code) {
          this.statusCode = code;
          return this;
        },
        json(body) {
          resolve({ status: this.statusCode, body });
          return this;
        },
      };
      authMiddleware({ get: () => authorization }, response, () => {
        resolve({ status: 200 });
      });
    });

  const missingToken = await invoke("");
  assert.equal(missingToken.status, 401);

  const token = jwt.sign({ id: "admin-1" }, process.env.JWT, {
    algorithm: "HS256",
  });
  assert.equal((await invoke(`Bearer ${token}`)).status, 200);

  const oldAlgorithmToken = jwt.sign({ id: "admin-1" }, process.env.JWT, {
    algorithm: "HS384",
  });
  assert.equal((await invoke(`Bearer ${oldAlgorithmToken}`)).status, 403);
});
