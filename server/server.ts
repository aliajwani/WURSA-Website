import 'dotenv/config'
import express from 'express'
import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import crypto from 'crypto'
import nodemailer from 'nodemailer'

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

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.resolve(__dirname, '../data')
const SUBMISSIONS_PATH = path.resolve(DATA_DIR, 'mentor-mentee-submissions.json')
const MAILING_LIST_PATH = path.resolve(DATA_DIR, 'mailing-list.json')

async function readSubmissions(): Promise<MentorMenteeSubmission[]> {
  try {
    const raw = await fs.readFile(SUBMISSIONS_PATH, 'utf8')
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as MentorMenteeSubmission[]) : []
  } catch (err: any) {
    if (err?.code === 'ENOENT') return []
    throw err
  }
}

async function writeSubmissions(submissions: MentorMenteeSubmission[]) {
  await fs.mkdir(DATA_DIR, { recursive: true })
  await fs.writeFile(SUBMISSIONS_PATH, JSON.stringify(submissions, null, 2), 'utf8')
}

type MailingListEntry = {
  id: string
  createdAt: string
  name?: string
  email: string
}

const ALERT_EMAIL = process.env.ALERT_EMAIL ?? 'aajwani2@uwo.ca'
const SMTP_HOST = process.env.SMTP_HOST
const SMTP_PORT = Number(process.env.SMTP_PORT ?? 587)
const SMTP_SECURE = process.env.SMTP_SECURE === 'true'
const SMTP_USER = process.env.SMTP_USER
const SMTP_PASS = process.env.SMTP_PASS
const FROM_EMAIL = process.env.FROM_EMAIL ?? SMTP_USER ?? ALERT_EMAIL

const mailer =
  SMTP_HOST && SMTP_USER && SMTP_PASS
    ? nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_SECURE,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      })
    : null

async function readMailingList(): Promise<MailingListEntry[]> {
  try {
    const raw = await fs.readFile(MAILING_LIST_PATH, 'utf8')
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as MailingListEntry[]) : []
  } catch (err: any) {
    if (err?.code === 'ENOENT') return []
    throw err
  }
}

async function writeMailingList(entries: MailingListEntry[]) {
  await fs.mkdir(DATA_DIR, { recursive: true })
  await fs.writeFile(MAILING_LIST_PATH, JSON.stringify(entries, null, 2), 'utf8')
}

async function sendMentorMenteeAlert(submission: MentorMenteeSubmission) {
  if (!mailer) return
  await mailer.sendMail({
    from: FROM_EMAIL,
    to: ALERT_EMAIL,
    subject: `New mentor-mentee submission: ${submission.name}`,
    text: [
      'New mentor-mentee submission received:',
      '',
      `Time: ${submission.createdAt}`,
      `Role: ${submission.role}`,
      `Name: ${submission.name}`,
      `Email: ${submission.email}`,
      `Program: ${submission.program ?? '-'}`,
      `Year: ${submission.year ?? '-'}`,
      `Interests: ${submission.interests ?? '-'}`,
      `Additional: ${submission.additional ?? '-'}`,
      '',
      `ID: ${submission.id}`,
    ].join('\n'),
  })
}

async function sendMailingListAlert(entry: MailingListEntry) {
  if (!mailer) return
  await mailer.sendMail({
    from: FROM_EMAIL,
    to: ALERT_EMAIL,
    subject: `New mailing list signup: ${entry.email}`,
    text: [
      'New mailing list signup received:',
      '',
      `Time: ${entry.createdAt}`,
      `Email: ${entry.email}`,
      `Name: ${entry.name ?? '-'}`,
      '',
      `ID: ${entry.id}`,
    ].join('\n'),
  })
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
  res.json({ ok: true })
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

  const submissions = await readSubmissions()
  submissions.unshift(submission)
  await writeSubmissions(submissions)

  try {
    await sendMentorMenteeAlert(submission)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to send mentor-mentee alert email', err)
  }

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

  const current = await readMailingList()
  current.unshift(entry)
  await writeMailingList(current)

  try {
    await sendMailingListAlert(entry)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to send mailing list alert email', err)
  }

  return res.status(201).json({ ok: true, id: entry.id })
})

app.get('/api/admin/mentor-mentee', requireAdmin, async (_req, res) => {
  const submissions = await readSubmissions()
  res.json({ submissions })
})

app.delete('/api/admin/mentor-mentee/:id', requireAdmin, async (req, res) => {
  const id = req.params.id
  const submissions = await readSubmissions()
  const next = submissions.filter((s) => s.id !== id)
  await writeSubmissions(next)
  res.json({ ok: true })
})

const port = Number(process.env.PORT ?? 5174)
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API server listening on http://localhost:${port}`)
  if (!mailer) {
    // eslint-disable-next-line no-console
    console.warn('Email alerts disabled: set SMTP_HOST, SMTP_USER, and SMTP_PASS in environment.')
  } else {
    // eslint-disable-next-line no-console
    console.log(`Email alerts enabled. Alert recipient: ${ALERT_EMAIL}`)
  }
})

