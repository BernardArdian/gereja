const LOGIN_WINDOW_MS = 15 * 60 * 1000
const LOGIN_MAX_ATTEMPTS = 5
const loginAttempts = new Map()

const isUnsafeKey = (key) =>
  key.startsWith('$') ||
  key.includes('.') ||
  key === '__proto__' ||
  key === 'prototype' ||
  key === 'constructor'

function containsUnsafeKey(value) {
  if (Array.isArray(value)) {
    return value.some(containsUnsafeKey)
  }

  if (value && typeof value === 'object') {
    return Object.entries(value).some(
      ([key, nestedValue]) => isUnsafeKey(key) || containsUnsafeKey(nestedValue)
    )
  }

  return false
}

const cleanupTimer = setInterval(() => {
  const now = Date.now()
  for (const [ip, attempt] of loginAttempts) {
    if (now - attempt.startedAt >= LOGIN_WINDOW_MS) {
      loginAttempts.delete(ip)
    }
  }
}, LOGIN_WINDOW_MS)
cleanupTimer.unref()

function securityMiddleware(req, res, next) {
  if (
    containsUnsafeKey(req.body) ||
    containsUnsafeKey(req.query) ||
    containsUnsafeKey(req.params)
  ) {
    return res.status(400).json({ error: 'Input mengandung properti yang tidak diizinkan' })
  }

  const isLoginRequest =
    req.method === 'POST' && req.path.replace(/\/+$/, '') === '/api/admin/login'

  if (!isLoginRequest) {
    return next()
  }

  const ip = req.ip || req.socket.remoteAddress || 'unknown'
  const now = Date.now()
  let attempt = loginAttempts.get(ip)

  if (!attempt || now - attempt.startedAt >= LOGIN_WINDOW_MS) {
    attempt = { startedAt: now, count: 0 }
    loginAttempts.set(ip, attempt)
  }

  if (attempt.count >= LOGIN_MAX_ATTEMPTS) {
    const retryAfter = Math.ceil((LOGIN_WINDOW_MS - (now - attempt.startedAt)) / 1000)
    res.set('Retry-After', String(retryAfter))
    return res.status(429).json({ error: 'Terlalu banyak percobaan login. Coba lagi nanti.' })
  }

  attempt.count += 1
  res.on('finish', () => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      loginAttempts.delete(ip)
    }
  })

  return next()
}

module.exports = securityMiddleware
