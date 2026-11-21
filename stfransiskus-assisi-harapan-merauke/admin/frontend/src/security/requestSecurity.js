const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_MAX_ATTEMPTS = 5;
let loginWindowStartedAt = 0;
let loginAttemptCount = 0;
const MUTATION_METHODS = new Set(["post", "put", "patch", "delete"]);
const pendingMutations = new Set();

// Tolak key yang berisiko memengaruhi query MongoDB atau prototipe objek.
const isUnsafeKey = (key) =>
  key.startsWith("$") ||
  key.includes(".") ||
  key === "__proto__" ||
  key === "prototype" ||
  key === "constructor";

function assertSafeInput(value) {
  // Periksa pula nilai di dalam array dan objek bertingkat.
  if (Array.isArray(value)) {
    value.forEach(assertSafeInput);
    return;
  }

  if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, nestedValue]) => {
      if (isUnsafeKey(key)) {
        throw new TypeError("Request berisi properti yang tidak diizinkan.");
      }
      assertSafeInput(nestedValue);
    });
  }
}

function isLoginRequest(config) {
  // Kenali hanya request POST yang menuju endpoint login admin.
  const endpoint = `${config.baseURL || ""}${config.url || ""}`;
  return (
    config.method?.toLowerCase() === "post" &&
    /(?:^|\/)admin\/login(?:[?#]|$)/i.test(endpoint)
  );
}

function stableSerialize(value) {
  if (value === undefined) return "undefined";
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map(stableSerialize).join(",")}]`;
  }
  if (Object.getPrototypeOf(value) !== Object.prototype) return null;

  return `{${Object.keys(value)
    .sort()
    .map((key) => `${JSON.stringify(key)}:${stableSerialize(value[key])}`)
    .join(",")}}`;
}

async function getMutationFingerprint(config) {
  const method = config.method?.toLowerCase();
  if (!MUTATION_METHODS.has(method)) return null;

  const serializedData = stableSerialize(config.data);
  const serializedParams = stableSerialize(config.params);
  if (serializedData === null || serializedParams === null) return null;
  const subtleCrypto = globalThis.crypto?.subtle;
  if (!subtleCrypto) return null;

  const input = [
    method,
    config.baseURL || "",
    config.url || "",
    serializedParams,
    serializedData,
  ].join("\n");
  const digest = await subtleCrypto.digest(
    "SHA-256",
    new TextEncoder().encode(input),
  );
  const fingerprint = Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
  return `${method}:${fingerprint}`;
}

export async function secureFrontendRequest(config) {
  // Validasi parameter dan body sebelum Axios mengirimkan request.
  assertSafeInput(config.params);
  assertSafeInput(config.data);

  const fingerprint = await getMutationFingerprint(config);
  if (fingerprint && pendingMutations.has(fingerprint)) {
    throw new Error("Request yang sama sedang diproses.");
  }

  if (isLoginRequest(config)) {
    const now = Date.now();
    if (now - loginWindowStartedAt >= LOGIN_WINDOW_MS) {
      loginWindowStartedAt = now;
      loginAttemptCount = 0;
    }

    if (loginAttemptCount >= LOGIN_MAX_ATTEMPTS) {
      throw new Error(
        "Terlalu banyak percobaan login. Tunggu 15 menit sebelum mencoba lagi.",
      );
    }

    loginAttemptCount += 1;
  }

  // Tolak mutasi identik yang masih berjalan agar klik ganda tidak terkirim dua kali.
  if (fingerprint) {
    pendingMutations.add(fingerprint);
    config.__securityMutationFingerprint = fingerprint;
  }

  return config;
}

export function releaseFrontendRequest(config) {
  const fingerprint = config?.__securityMutationFingerprint;
  if (fingerprint) pendingMutations.delete(fingerprint);
}

export function resetFrontendLoginLimit(config) {
  // Reset hanya untuk respons sukses dari endpoint login yang dikenali.
  if (isLoginRequest(config)) {
    loginWindowStartedAt = 0;
    loginAttemptCount = 0;
  }
}
