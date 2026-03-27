import 'dotenv/config'
import express from 'express'
import crypto from 'crypto'
import { Pool } from 'pg'

type MentorMenteeRole = 'mentor' | 'mentee'

export type MentorMenteeSubmission = {
  id: string
  createdAt: string
  role: MentorMenteeRole
  name: string
  email: string
  program?: string
  year?: string
  interests?: string
  additional?: string
}

type MailingListEntry = {
  id: string
  createdAt: string
  name?: string
  email: string
}

const databaseUrl = process.env.DATABASE_URL
if (!databaseUrl) {
  throw new Error('DATABASE_URL is required for production-safe submission storage.')
}

const pool = new Pool({
  connectionString: databaseUrl,
  ssl:
    process.env.PGSSL === 'false'
      ? false
      : process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false,
})

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS mentor_mentee_submissions (
      id TEXT PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('mentor', 'mentee')),
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      program TEXT,
      year TEXT,
      interests TEXT,
      additional TEXT
    );
  `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS mailing_list_entries (
      id TEXT PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL,
      email TEXT NOT NULL,
      name TEXT
    );
  `)
}

async function readSubmissions(): Promise<MentorMenteeSubmission[]> {
  const { rows } = await pool.query(
    `
      SELECT id, created_at, role, name, email, program, year, interests, additional
      FROM mentor_mentee_submissions
      ORDER BY created_at DESC;
    `,
  )

  return rows.map((row) => ({
    id: row.id as string,
    createdAt: new Date(row.created_at as string | Date).toISOString(),
    role: row.role as MentorMenteeRole,
    name: row.name as string,
    email: row.email as string,
    program: (row.program as string | null) ?? undefined,
    year: (row.year as string | null) ?? undefined,
    interests: (row.interests as string | null) ?? undefined,
    additional: (row.additional as string | null) ?? undefined,
  }))
}

async function createSubmission(submission: MentorMenteeSubmission) {
  await pool.query(
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
      submission.program ?? null,
      submission.year ?? null,
      submission.interests ?? null,
      submission.additional ?? null,
    ],
  )
}

async function deleteSubmission(id: string) {
  await pool.query('DELETE FROM mentor_mentee_submissions WHERE id = $1;', [id])
}

async function createMailingListEntry(entry: MailingListEntry) {
  await pool.query(
    `
      INSERT INTO mailing_list_entries
      (id, created_at, email, name)
      VALUES
      ($1, $2, $3, $4);
    `,
    [entry.id, entry.createdAt, entry.email, entry.name ?? null],
  )
}

function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const user = process.env.ADMIN_USER ?? 'admin'
  const pass = process.env.ADMIN_PASS ?? 'admin'

  const header = req.headers.authorization
  if (!header?.startsWith('Basic ')) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Admin"')
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const decoded = Buffer.from(header.slice('Basic '.length), 'base64').toString('utf8')
  const idx = decoded.indexOf(':')
  const providedUser = idx >= 0 ? decoded.slice(0, idx) : ''
  const providedPass = idx >= 0 ? decoded.slice(idx + 1) : ''

  if (providedUser !== user || providedPass !== pass) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Admin"')
    return res.status(401).json({ error: 'Unauthorized' })
  }

  return next()
}

const app = express()
app.disable('x-powered-by')
app.use(express.json({ limit: '256kb' }))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, storage: 'postgres' })
})

app.post('/api/mentor-mentee', async (req, res) => {
  const role = req.body?.role
  const name = req.body?.name
  const email = req.body?.email

  if (role !== 'mentor' && role !== 'mentee') {
    return res.status(400).json({ error: 'Invalid role' })
  }
  if (typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({ error: 'Name is required' })
  }
  if (typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email is required' })
  }

  const submission: MentorMenteeSubmission = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    role,
    name: name.trim(),
    email: email.trim(),
    program: typeof req.body?.program === 'string' ? req.body.program.trim() : undefined,
    year: typeof req.body?.year === 'string' ? req.body.year.trim() : undefined,
    interests: typeof req.body?.interests === 'string' ? req.body.interests.trim() : undefined,
    additional: typeof req.body?.additional === 'string' ? req.body.additional.trim() : undefined,
  }

  await createSubmission(submission)

  return res.status(201).json({ ok: true, id: submission.id })
})

app.post('/api/mailing-list', async (req, res) => {
  const email = req.body?.email
  const name = req.body?.name

  if (typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email is required' })
  }

  const entry: MailingListEntry = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    email: email.trim(),
    name: typeof name === 'string' && name.trim().length ? name.trim() : undefined,
  }

  await createMailingListEntry(entry)

  return res.status(201).json({ ok: true, id: entry.id })
})

app.get('/api/admin/mentor-mentee', requireAdmin, async (_req, res) => {
  const submissions = await readSubmissions()
  res.json({ submissions })
})

app.delete('/api/admin/mentor-mentee/:id', requireAdmin, async (req, res) => {
  const id = req.params.id
  await deleteSubmission(id)
  res.json({ ok: true })
})

const port = Number(process.env.PORT ?? 5174)
async function start() {
  await initDb()
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on http://localhost:${port}`)
  })
}

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Failed to start API server', err)
  process.exit(1)
})

