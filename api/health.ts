import type { IncomingMessage, ServerResponse } from 'http'
import { initDb } from './_db'

export default async function handler(_req: IncomingMessage, res: ServerResponse) {
  await initDb()
  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 200
  res.end(JSON.stringify({ ok: true, storage: 'postgres' }))
}

