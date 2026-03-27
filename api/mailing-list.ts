import type { IncomingMessage, ServerResponse } from 'http'
import crypto from 'crypto'
import { db, initDb } from './_db.js'

function readBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => (data += chunk))
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {})
      } catch (err) {
        reject(err)
      }
    })
    req.on('error', reject)
  })
}

export default async function handler(req: IncomingMessage & { method?: string }, res: ServerResponse) {
  await initDb()

  if (req.method !== 'POST') {
    res.statusCode = 405
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'Method not allowed' }))
    return
  }

  let body: any
  try {
    body = await readBody(req)
  } catch {
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'Invalid JSON' }))
    return
  }

  const email = body?.email
  const name = body?.name

  if (typeof email !== 'string' || !email.includes('@')) {
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'Valid email is required' }))
    return
  }

  const entry = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    email: email.trim(),
    name: typeof name === 'string' && name.trim().length ? name.trim() : null,
  }

  await db().query(
    `
      INSERT INTO mailing_list_entries
      (id, created_at, email, name)
      VALUES
      ($1, $2, $3, $4);
    `,
    [entry.id, entry.createdAt, entry.email, entry.name],
  )

  res.statusCode = 201
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ ok: true, id: entry.id }))
}

