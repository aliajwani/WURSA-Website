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

  const role = body?.role
  const name = body?.name
  const email = body?.email

  if (role !== 'mentor' && role !== 'mentee') {
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'Invalid role' }))
    return
  }
  if (typeof name !== 'string' || name.trim().length < 2) {
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'Name is required' }))
    return
  }
  if (typeof email !== 'string' || !email.includes('@')) {
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'Valid email is required' }))
    return
  }

  const submission = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    role,
    name: name.trim(),
    email: email.trim(),
    program: typeof body?.program === 'string' ? body.program.trim() : null,
    year: typeof body?.year === 'string' ? body.year.trim() : null,
    interests: typeof body?.interests === 'string' ? body.interests.trim() : null,
    additional: typeof body?.additional === 'string' ? body.additional.trim() : null,
  }

  await db().query(
    `
      INSERT INTO mentor_mentee_submissions
      (id, created_at, role, name, email, program, year, interests, additional)
      VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9);
    `,
    [
      submission.id,
      submission.createdAt,
      submission.role,
      submission.name,
      submission.email,
      submission.program,
      submission.year,
      submission.interests,
      submission.additional,
    ],
  )

  res.statusCode = 201
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ ok: true, id: submission.id }))
}

