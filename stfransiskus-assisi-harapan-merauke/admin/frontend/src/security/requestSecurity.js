const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_MAX_ATTEMPTS = 5;
let loginWindowStartedAt = 0;
let loginAttemptCount = 0;

const isUnsafeKey = (key) =>
  key.startsWith("$") ||
  key.includes(".") ||
  key === "__proto__" ||
  key === "prototype" ||
  key === "constructor";

function assertSafeInput(value) {
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
  const endpoint = `${config.baseURL || ""}${config.url || ""}`;
  return config.method?.toLowerCase() === "post" &&
    /(?:^|\/)admin\/login(?:[?#]|$)/i.test(endpoint);
}

export function secureFrontendRequest(config) {
  assertSafeInput(config.params);
  assertSafeInput(config.data);

  if (isLoginRequest(config)) {
    const now = Date.now();
    if (now - loginWindowStartedAt >= LOGIN_WINDOW_MS) {
      loginWindowStartedAt = now;
      loginAttemptCount = 0;
    }

    if (loginAttemptCount >= LOGIN_MAX_ATTEMPTS) {
      throw new Error("Terlalu banyak percobaan login. Tunggu 15 menit sebelum mencoba lagi.");
    }

    loginAttemptCount += 1;
  }

  return config;
}

export function resetFrontendLoginLimit(config) {
  if (isLoginRequest(config)) {
    loginWindowStartedAt = 0;
    loginAttemptCount = 0;
  }
}
