import { Pool } from 'pg'

declare global {
  // eslint-disable-next-line no-var
  var __wursaPool: Pool | undefined
  // eslint-disable-next-line no-var
  var __wursaDbInit: Promise<void> | undefined
}

function getPool() {
  if (!global.__wursaPool) {
    const databaseUrl = process.env.DATABASE_URL
    if (!databaseUrl) throw new Error('DATABASE_URL is required')

    global.__wursaPool = new Pool({
      connectionString: databaseUrl,
      ssl:
        process.env.PGSSL === 'false'
          ? false
          : process.env.NODE_ENV === 'production'
            ? { rejectUnauthorized: false }
            : false,
    })
  }

  return global.__wursaPool
}

export async function initDb() {
  if (!global.__wursaDbInit) {
    const pool = getPool()
    global.__wursaDbInit = (async () => {
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
    })()
  }

  return global.__wursaDbInit
}

export function db() {
  return getPool()
}

