import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { siteConfig } from '@/data/content'

export function MentorMenteePage() {
  const [role, setRole] = useState<'mentor' | 'mentee'>('mentee')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    program: '',
    year: '',
    interests: '',
    additional: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/mentor-mentee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, ...formData }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error ?? `Submission failed (${res.status})`)
      }
      setSubmitted(true)
    } catch (err: any) {
      setError(err?.message ?? 'Submission failed')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="min-h-screen bg-western-stone/50 pt-20">
      <div className="mx-auto max-w-5xl px-6 py-16 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#1B5E3F] transition hover:text-[#0D3B2A]"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>

          <div className="text-center">
            <h1 className="font-display text-3xl font-bold tracking-tight text-western-slate sm:text-4xl lg:text-5xl">
              Mentor–Mentee Program Sign-up
            </h1>
            <p className="mx-auto mt-3 max-w-4xl text-lg text-western-slate/80 lg:text-xl">
              Join the {siteConfig.clubName} mentor–mentee program. Connect with experienced researchers or guide newer students.
            </p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-12 rounded-xl border border-[#6BAB3C]/30 bg-white p-8 text-center shadow-sm"
            >
              <div className="flex flex-col items-center gap-3 text-[#1B5E3F]">
                <svg className="h-8 w-8 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className="font-display font-semibold">Thank you — you’re signed up</p>
                  <p className="mt-1 text-sm text-western-slate/80">
                    We received your submission. We'll be in touch soon.
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 grid gap-6 lg:grid-cols-2">
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 lg:col-span-2">
                  {error}
                </div>
              )}
              <div className="lg:col-span-2 text-center">
                <label className="block text-sm font-medium text-western-slate">I want to sign up as</label>
                <div className="mt-2 flex flex-wrap justify-center gap-6">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="role"
                      checked={role === 'mentee'}
                      onChange={() => setRole('mentee')}
                      className="h-4 w-4 border-western-slate/20 text-[#1B5E3F] focus:ring-[#1B5E3F]"
                    />
                    <span className="text-western-slate">Mentee</span>
                  </label>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="role"
                      checked={role === 'mentor'}
                      onChange={() => setRole('mentor')}
                      className="h-4 w-4 border-western-slate/20 text-[#1B5E3F] focus:ring-[#1B5E3F]"
                    />
                    <span className="text-western-slate">Mentor</span>
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-western-slate">
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-lg border border-western-slate/20 bg-white px-4 py-2.5 text-western-slate shadow-sm focus:border-[#1B5E3F] focus:outline-none focus:ring-1 focus:ring-[#1B5E3F]"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-western-slate">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-lg border border-western-slate/20 bg-white px-4 py-2.5 text-western-slate shadow-sm focus:border-[#1B5E3F] focus:outline-none focus:ring-1 focus:ring-[#1B5E3F]"
                  placeholder="you@uwo.ca"
                />
              </div>

              <div>
                <label htmlFor="program" className="block text-sm font-medium text-western-slate">
                  Program / Faculty
                </label>
                <input
                  id="program"
                  name="program"
                  type="text"
                  value={formData.program}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-lg border border-western-slate/20 bg-white px-4 py-2.5 text-western-slate shadow-sm focus:border-[#1B5E3F] focus:outline-none focus:ring-1 focus:ring-[#1B5E3F]"
                  placeholder="e.g. Biology, Engineering, Social Science"
                />
              </div>

              <div>
                <label htmlFor="year" className="block text-sm font-medium text-western-slate">
                  Year of study
                </label>
                <select
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-lg border border-western-slate/20 bg-white px-4 py-2.5 text-western-slate shadow-sm focus:border-[#1B5E3F] focus:outline-none focus:ring-1 focus:ring-[#1B5E3F]"
                >
                  <option value="">Select year</option>
                  <option value="1">First year</option>
                  <option value="2">Second year</option>
                  <option value="3">Third year</option>
                  <option value="4">Fourth year</option>
                  <option value="5+">Fifth year or more</option>
                </select>
              </div>

              <div className="lg:col-span-2">
                <label htmlFor="interests" className="block text-sm font-medium text-western-slate">
                  Research interests
                </label>
                <textarea
                  id="interests"
                  name="interests"
                  rows={4}
                  value={formData.interests}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-lg border border-western-slate/20 bg-white px-4 py-2.5 text-western-slate shadow-sm focus:border-[#1B5E3F] focus:outline-none focus:ring-1 focus:ring-[#1B5E3F]"
                  placeholder="Describe your research interests or areas where you can offer guidance..."
                />
              </div>

              <div className="lg:col-span-2">
                <label htmlFor="additional" className="block text-sm font-medium text-western-slate">
                  Additional information (optional)
                </label>
                <textarea
                  id="additional"
                  name="additional"
                  rows={2}
                  value={formData.additional}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-lg border border-western-slate/20 bg-white px-4 py-2.5 text-western-slate shadow-sm focus:border-[#1B5E3F] focus:outline-none focus:ring-1 focus:ring-[#1B5E3F]"
                  placeholder="Anything else you'd like us to know"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-[#1B5E3F] px-6 py-3.5 text-base font-semibold text-white shadow-lg transition hover:bg-[#0D3B2A] focus:outline-none focus:ring-2 focus:ring-[#1B5E3F] focus:ring-offset-2 disabled:opacity-60 lg:col-span-2"
              >
                {loading ? 'Submitting…' : 'Submit Sign-up'}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  )
}
