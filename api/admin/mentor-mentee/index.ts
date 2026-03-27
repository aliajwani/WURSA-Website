import type { IncomingMessage, ServerResponse } from 'http'
import { db, initDb } from '../../../_db'
import { requireAdmin } from '../../../_auth'

export default async function handler(req: IncomingMessage & { method?: string }, res: ServerResponse) {
  await initDb()

  const auth = requireAdmin(req)
  if (!auth.ok) {
    res.statusCode = auth.status
    res.setHeader('WWW-Authenticate', 'Basic realm="Admin"')
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: auth.error }))
    return
  }

  if (req.method !== 'GET') {
    res.statusCode = 405
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'Method not allowed' }))
    return
  }

  const { rows } = await db().query(
    `
      SELECT id, created_at, role, name, email, program, year, interests, additional
      FROM mentor_mentee_submissions
      ORDER BY created_at DESC;
    `,
  )

  const submissions = rows.map((row: any) => ({
    id: row.id,
    createdAt: new Date(row.created_at).toISOString(),
    role: row.role,
    name: row.name,
    email: row.email,
    program: row.program ?? undefined,
    year: row.year ?? undefined,
    interests: row.interests ?? undefined,
    additional: row.additional ?? undefined,
  }))

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ submissions }))
}

