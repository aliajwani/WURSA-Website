import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

type MentorMenteeSubmission = {
  id: string
  createdAt: string
  role: 'mentor' | 'mentee'
  name: string
  email: string
  program?: string
  year?: string
  interests?: string
  additional?: string
}

function toBasicAuth(user: string, pass: string) {
  return `Basic ${btoa(`${user}:${pass}`)}`
}

export function AdminPage() {
  const [user, setUser] = useState('admin')
  const [pass, setPass] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submissions, setSubmissions] = useState<MentorMenteeSubmission[] | null>(null)
  const [roleFilter, setRoleFilter] = useState<'all' | 'mentor' | 'mentee'>('all')

  const filtered = useMemo(() => {
    if (!submissions) return []
    if (roleFilter === 'all') return submissions
    return submissions.filter((s) => s.role === roleFilter)
  }, [submissions, roleFilter])

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/mentor-mentee', {
        headers: { Authorization: toBasicAuth(user, pass) },
      })
      if (res.status === 401) throw new Error('Unauthorized (check username/password)')
      if (!res.ok) throw new Error(`Failed to load (${res.status})`)
      const data = (await res.json()) as { submissions: MentorMenteeSubmission[] }
      setSubmissions(data.submissions ?? [])
    } catch (e: any) {
      setSubmissions(null)
      setError(e?.message ?? 'Failed to load')
    } finally {
      setLoading(false)
    }
  }

  const remove = async (id: string) => {
    if (!confirm('Delete this submission?')) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/admin/mentor-mentee/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: { Authorization: toBasicAuth(user, pass) },
      })
      if (res.status === 401) throw new Error('Unauthorized (check username/password)')
      if (!res.ok) throw new Error(`Failed to delete (${res.status})`)
      setSubmissions((prev) => (prev ? prev.filter((s) => s.id !== id) : prev))
    } catch (e: any) {
      setError(e?.message ?? 'Failed to delete')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-western-stone/50 pt-20">
      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#1B5E3F] transition hover:text-[#0D3B2A]"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>

          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h1 className="font-display text-3xl font-bold tracking-tight text-western-slate sm:text-4xl">
                Admin · Mentor–Mentee Submissions
              </h1>
              <p className="mt-2 text-western-slate/80">
                Login to view submissions saved from the website form.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[420px_1fr]">
            <div className="rounded-xl border border-western-slate/10 bg-white p-6 shadow-sm">
              <h2 className="font-display text-lg font-semibold text-western-slate">Admin login</h2>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-western-slate">Username</label>
                  <input
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    className="mt-2 block w-full rounded-lg border border-western-slate/20 bg-white px-4 py-2.5 text-western-slate shadow-sm focus:border-[#1B5E3F] focus:outline-none focus:ring-1 focus:ring-[#1B5E3F]"
                    placeholder="admin"
                    autoComplete="username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-western-slate">Password</label>
                  <input
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    type="password"
                    className="mt-2 block w-full rounded-lg border border-western-slate/20 bg-white px-4 py-2.5 text-western-slate shadow-sm focus:border-[#1B5E3F] focus:outline-none focus:ring-1 focus:ring-[#1B5E3F]"
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                </div>
                <button
                  type="button"
                  onClick={load}
                  disabled={loading}
                  className="w-full rounded-lg bg-[#1B5E3F] px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-[#0D3B2A] disabled:opacity-60"
                >
                  {loading ? 'Loading…' : 'View submissions'}
                </button>
                <p className="text-xs text-western-slate/60">
                  Default credentials are <span className="font-mono">admin/admin</span> unless you set{' '}
                  <span className="font-mono">ADMIN_USER</span> / <span className="font-mono">ADMIN_PASS</span> in your environment.
                </p>
              </div>
              {error && (
                <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}
            </div>

            <div className="rounded-xl border border-western-slate/10 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="font-display text-lg font-semibold text-western-slate">Results</h2>
                  <p className="mt-1 text-sm text-western-slate/70">
                    {submissions ? `${filtered.length} of ${submissions.length} submissions` : 'Not loaded yet'}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium text-western-slate/80">Filter</label>
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value as any)}
                    className="rounded-lg border border-western-slate/20 bg-white px-3 py-2 text-sm text-western-slate shadow-sm focus:border-[#1B5E3F] focus:outline-none focus:ring-1 focus:ring-[#1B5E3F]"
                  >
                    <option value="all">All</option>
                    <option value="mentee">Mentee</option>
                    <option value="mentor">Mentor</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-y-2">
                  <thead>
                    <tr className="text-left text-xs font-semibold uppercase tracking-wide text-western-slate/60">
                      <th className="px-3">Date</th>
                      <th className="px-3">Role</th>
                      <th className="px-3">Name</th>
                      <th className="px-3">Email</th>
                      <th className="px-3">Program</th>
                      <th className="px-3">Year</th>
                      <th className="px-3">Notes</th>
                      <th className="px-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((s) => (
                      <tr key={s.id} className="rounded-lg bg-western-stone/40">
                        <td className="px-3 py-3 text-sm text-western-slate">
                          {new Date(s.createdAt).toLocaleString()}
                        </td>
                        <td className="px-3 py-3 text-sm">
                          <span className="rounded-full bg-[#1B5E3F]/10 px-2.5 py-1 text-xs font-semibold text-[#1B5E3F]">
                            {s.role}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-sm text-western-slate">{s.name}</td>
                        <td className="px-3 py-3 text-sm text-western-slate">{s.email}</td>
                        <td className="px-3 py-3 text-sm text-western-slate/80">{s.program ?? '—'}</td>
                        <td className="px-3 py-3 text-sm text-western-slate/80">{s.year ?? '—'}</td>
                        <td className="px-3 py-3 text-sm text-western-slate/80">
                          <div className="max-w-[320px]">
                            <div className="truncate">{s.interests ?? s.additional ?? '—'}</div>
                          </div>
                        </td>
                        <td className="px-3 py-3 text-right">
                          <button
                            type="button"
                            onClick={() => remove(s.id)}
                            disabled={loading}
                            className="text-sm font-semibold text-red-600 transition hover:text-red-700 disabled:opacity-60"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {submissions && filtered.length === 0 && (
                      <tr>
                        <td colSpan={8} className="px-3 py-10 text-center text-sm text-western-slate/70">
                          No submissions match this filter.
                        </td>
                      </tr>
                    )}
                    {!submissions && (
                      <tr>
                        <td colSpan={8} className="px-3 py-10 text-center text-sm text-western-slate/70">
                          Login to load submissions.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

