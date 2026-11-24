import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { siteConfig } from '@/data/content'
import { Footer } from '@/components/Footer'

const inputClass =
  'mt-2 block w-full rounded-xl border border-western-slate/15 bg-western-stone px-4 py-3 text-base text-western-slate placeholder:text-western-slate/40 transition focus:border-[#1B5E3F] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#1B5E3F]/10'

const labelClass = 'block text-sm font-semibold text-western-slate'

const roles = [
  {
    value: 'mentee' as const,
    title: 'Mentee',
    blurb: "I'm newer to research and want guidance from someone who's been there.",
    icon: 'M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5',
  },
  {
    value: 'mentor' as const,
    title: 'Mentor',
    blurb: "I've got research experience and want to help newer students find their way.",
    icon: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z',
  },
]

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
    <div className="pt-20">
      <div className="relative overflow-hidden bg-western-stone">
        {/* soft green glow behind the header */}
        <div className="pointer-events-none absolute -top-32 left-1/2 h-80 w-[48rem] -translate-x-1/2 rounded-full bg-western-greenLight/15 blur-3xl" />

        <div className="relative mx-auto max-w-3xl px-6 pb-20 pt-12 lg:pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#1B5E3F] transition hover:text-[#0D3B2A]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>

            <div className="mt-8 text-center">
              <span className="inline-flex items-center rounded-full bg-western-greenLight/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-western-green">
                Mentorship program
              </span>
              <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-western-slate sm:text-5xl">
                Mentor–Mentee Sign-up
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-western-slate/75">
                Join the {siteConfig.clubName} mentor–mentee program. Connect with experienced researchers or guide newer students.
              </p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-10 rounded-3xl bg-white p-10 text-center shadow-xl shadow-western-green/5 ring-1 ring-western-slate/5"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-western-greenLight/15 text-[#1B5E3F]">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="mt-5 font-display text-2xl font-semibold text-western-slate">You're signed up!</p>
                <p className="mx-auto mt-2 max-w-md text-western-slate/75">
                  Thanks for joining as a {role}. We got your submission and we'll be in touch soon.
                </p>
                <Link
                  to="/"
                  className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#1B5E3F] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0D3B2A]"
                >
                  Back to Home
                </Link>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-10 rounded-3xl bg-white p-6 shadow-xl shadow-western-green/5 ring-1 ring-western-slate/5 sm:p-10"
              >
                {error && (
                  <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                {/* Role picker */}
                <fieldset>
                  <legend className={labelClass}>I want to sign up as</legend>
                  <div className="mt-3 grid gap-4 sm:grid-cols-2">
                    {roles.map((r) => {
                      const active = role === r.value
                      return (
                        <label
                          key={r.value}
                          className={`relative flex cursor-pointer gap-4 rounded-2xl border-2 p-5 transition ${
                            active
                              ? 'border-[#1B5E3F] bg-western-greenLight/10'
                              : 'border-western-slate/10 hover:border-western-green/30'
                          }`}
                        >
                          <input
                            type="radio"
                            name="role"
                            value={r.value}
                            checked={active}
                            onChange={() => setRole(r.value)}
                            className="sr-only"
                          />
                          <span
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition ${
                              active ? 'bg-[#1B5E3F] text-white' : 'bg-western-stone text-western-green'
                            }`}
                          >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d={r.icon} />
                            </svg>
                          </span>
                          <span>
                            <span className="block font-display text-lg font-semibold text-western-slate">{r.title}</span>
                            <span className="mt-1 block text-sm text-western-slate/70">{r.blurb}</span>
                          </span>
                          {active && (
                            <span className="absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full bg-[#1B5E3F] text-white">
                              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                          )}
                        </label>
                      )
                    })}
                  </div>
                </fieldset>

                {/* About you */}
                <div className="mt-10 border-t border-western-slate/10 pt-8">
                  <h2 className="font-display text-xl font-semibold text-western-slate">About you</h2>
                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className={labelClass}>
                        Full name <span className="text-western-greenLight">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className={labelClass}>
                        Email <span className="text-western-greenLight">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="you@uwo.ca"
                      />
                    </div>

                    <div>
                      <label htmlFor="program" className={labelClass}>
                        Program / Faculty
                      </label>
                      <input
                        id="program"
                        name="program"
                        type="text"
                        value={formData.program}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="e.g. Biology, Engineering"
                      />
                    </div>

                    <div>
                      <label htmlFor="year" className={labelClass}>
                        Year of study
                      </label>
                      <div className="relative">
                        <select
                          id="year"
                          name="year"
                          value={formData.year}
                          onChange={handleChange}
                          className={`${inputClass} appearance-none pr-10 ${formData.year ? '' : 'text-western-slate/40'}`}
                        >
                          <option value="">Select year</option>
                          <option value="1">Undergraduate – First year</option>
                          <option value="2">Undergraduate – Second year</option>
                          <option value="3">Undergraduate – Third year</option>
                          <option value="4">Undergraduate – Fourth year</option>
                          <option value="5+">Undergraduate – Fifth year or more</option>
                          <option value="masters">Master&apos;s</option>
                          <option value="phd">PhD</option>
                        </select>
                        <svg
                          className="pointer-events-none absolute right-4 top-1/2 mt-1 h-4 w-4 -translate-y-1/2 text-western-slate/50"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Research */}
                <div className="mt-10 border-t border-western-slate/10 pt-8">
                  <h2 className="font-display text-xl font-semibold text-western-slate">Your research</h2>
                  <div className="mt-5 grid gap-5">
                    <div>
                      <label htmlFor="interests" className={labelClass}>
                        Research interests
                      </label>
                      <p className="mt-1 text-sm text-western-slate/60">
                        {role === 'mentee'
                          ? "What areas are you curious about? It's fine if you're still figuring it out."
                          : "What areas have you worked in, and where could you help someone out?"}
                      </p>
                      <textarea
                        id="interests"
                        name="interests"
                        rows={4}
                        value={formData.interests}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder={
                          role === 'mentee'
                            ? 'e.g. neuroscience, public health, machine learning...'
                            : 'e.g. 2 years in a cell biology lab, comfortable with R and stats...'
                        }
                      />
                    </div>

                    <div>
                      <label htmlFor="additional" className={labelClass}>
                        Anything else? <span className="font-normal text-western-slate/50">(optional)</span>
                      </label>
                      <textarea
                        id="additional"
                        name="additional"
                        rows={2}
                        value={formData.additional}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Anything else you'd like us to know"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1B5E3F] px-6 py-4 text-base font-semibold text-white shadow-lg shadow-[#1B5E3F]/20 transition hover:bg-[#0D3B2A] focus:outline-none focus:ring-4 focus:ring-[#1B5E3F]/20 disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      Submitting…
                    </>
                  ) : (
                    <>
                      Sign up as a {role}
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
