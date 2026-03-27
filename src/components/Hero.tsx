import { motion } from 'framer-motion'
import { heroContent } from '@/data/content'

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[90vh] flex-col justify-center px-6 pt-28 pb-20 lg:min-h-[85vh] lg:px-8 lg:pt-32"
    >
      {/* Gradient at top — green tint fading to white */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: 'linear-gradient(to bottom, rgba(27,94,63,0.28) 0%, rgba(107,171,60,0.12) 45%, transparent 82%)',
        }}
        aria-hidden
      />
      {/* Optional: very subtle grid pattern */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231B5E3F' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="mx-auto max-w-6xl text-center">
        <motion.h1
          className="font-display text-4xl font-bold tracking-tight text-western-slate sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {heroContent.headline}
        </motion.h1>
        <motion.p
          className="mt-6 max-w-3xl mx-auto text-lg text-western-slate/80 sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        >
          {heroContent.subheading}
        </motion.p>
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        >
          <a
            href={heroContent.ctaPrimary.href}
            className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-semibold text-white shadow-lg transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1B5E3F] bg-[#1B5E3F] hover:bg-[#0D3B2A]"
          >
            {heroContent.ctaPrimary.label}
          </a>
          <a
            href={heroContent.ctaSecondary.href}
            className="inline-flex items-center justify-center rounded-lg border-2 border-western-slate/20 bg-transparent px-6 py-3 text-base font-semibold text-western-slate transition hover:border-western-green hover:text-western-green focus:outline-none focus:ring-2 focus:ring-western-green focus:ring-offset-2"
          >
            {heroContent.ctaSecondary.label}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
