import type { IncomingMessage, ServerResponse } from 'http'
import { db, initDb } from '../../../_db.js'
import { requireAdmin } from '../../../_auth.js'

function getIdFromUrl(url?: string) {
  if (!url) return null
  const parts = url.split('?')[0].split('/').filter(Boolean)
  return parts[parts.length - 1] ?? null
}

export default async function handler(req: IncomingMessage & { method?: string; url?: string }, res: ServerResponse) {
  await initDb()

  const auth = requireAdmin(req)
  if (!auth.ok) {
    res.statusCode = auth.status
    res.setHeader('WWW-Authenticate', 'Basic realm="Admin"')
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: auth.error }))
    return
  }

  if (req.method !== 'DELETE') {
    res.statusCode = 405
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'Method not allowed' }))
    return
  }

  const id = getIdFromUrl(req.url)
  if (!id) {
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'Missing id' }))
    return
  }

  await db().query('DELETE FROM mentor_mentee_submissions WHERE id = $1;', [id])

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ ok: true }))
}

