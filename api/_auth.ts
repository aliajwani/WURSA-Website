export function requireAdmin(req: any): { ok: true } | { ok: false; status: number; error: string } {
  const user = process.env.ADMIN_USER ?? 'admin'
  const pass = process.env.ADMIN_PASS ?? 'admin'

  const header = req?.headers?.authorization
  if (!header || typeof header !== 'string' || !header.startsWith('Basic ')) {
    return { ok: false, status: 401, error: 'Unauthorized' }
  }

  const decoded = Buffer.from(header.slice('Basic '.length), 'base64').toString('utf8')
  const idx = decoded.indexOf(':')
  const providedUser = idx >= 0 ? decoded.slice(0, idx) : ''
  const providedPass = idx >= 0 ? decoded.slice(idx + 1) : ''

  if (providedUser !== user || providedPass !== pass) {
    return { ok: false, status: 401, error: 'Unauthorized' }
  }

  return { ok: true }
}

