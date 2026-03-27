import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getInvolvedContent } from '@/data/content'

export function GetInvolved() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    setError(null)
    try {
      const res = await fetch('/api/mailing-list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error ?? 'Something went wrong')
      }
      setStatus('success')
      setEmail('')
    } catch (err: any) {
      setStatus('error')
      setError(err?.message ?? 'Something went wrong')
    }
  }

  return (
    <section id="get-involved" className="bg-[#1B5E3F] px-6 py-20 lg:px-8 lg:py-28">
      <motion.div
        className="mx-auto max-w-6xl text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {getInvolvedContent.headline}
        </h2>
        <p className="mt-4 text-lg text-white/90">
          {getInvolvedContent.subheading}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href={getInvolvedContent.ctaHref}
            className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3.5 text-base font-semibold text-[#1B5E3F] shadow-lg transition hover:bg-white/95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1B5E3F]"
          >
            {getInvolvedContent.ctaLabel}
          </a>
          <Link
            to="/mentor-mentee"
            className="inline-flex items-center justify-center rounded-lg border-2 border-white/80 bg-transparent px-8 py-3.5 text-base font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1B5E3F]"
          >
            Mentor–Mentee Sign-up
          </Link>
        </div>
        <div className="mx-auto mt-10 max-w-xl rounded-2xl bg-white/5 p-6 text-left shadow-sm ring-1 ring-white/15">
          <h3 className="font-display text-lg font-semibold text-white">
            Join our mailing list
          </h3>
          <p className="mt-1 text-sm text-white/80">
            Get updates about research events, opportunities, and mentor–mentee deadlines.
          </p>
          <form onSubmit={onSubmit} className="mt-4 space-y-3">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/60 shadow-sm focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
              placeholder="you@uwo.ca"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-[#1B5E3F] shadow-sm transition hover:bg-white/95 disabled:opacity-70"
            >
              {status === 'loading' ? 'Joining…' : 'Join mailing list'}
            </button>
            {status === 'success' && (
              <p className="text-xs text-emerald-100">
                Thanks for subscribing! You’ve been added to our list.
              </p>
            )}
            {status === 'error' && (
              <p className="text-xs text-red-100">
                {error}
              </p>
            )}
          </form>
        </div>
      </motion.div>
    </section>
  )
}
