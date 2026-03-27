import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { siteConfig, navLinks } from '@/data/content'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const showSolidBg = !isHome || isScrolled

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showSolidBg ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 py-4 lg:px-12">
        <Link
          to="/"
          className="flex items-center gap-2.5 font-display text-xl font-semibold text-western-slate lg:text-2xl"
        >
          <img
            src="/ursa-logo.png"
            alt=""
            className="h-10 w-10 rounded-full object-cover lg:h-11 lg:w-11"
          />
          <span className="flex flex-col leading-tight">
            <span>{siteConfig.clubName}</span>
            <span className="text-xs font-normal text-western-slate/60 lg:text-[13px]">
              {siteConfig.fullName}
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-10 md:flex lg:gap-12">
          {navLinks.map((link) => {
            const isHashLink = link.href.startsWith('/#')
            return (
              <li key={link.href}>
                {isHashLink ? (
                  <a
                    href={link.href}
                    className="text-base font-medium text-western-slate/80 transition hover:text-[#1B5E3F]"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    to={link.href}
                    className="text-base font-medium text-western-slate/80 transition hover:text-[#1B5E3F]"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label="Toggle menu"
          className="flex flex-col gap-1.5 p-2 md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
        >
          <span
            className={`h-0.5 w-6 bg-western-slate transition ${mobileOpen ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span
            className={`h-0.5 w-6 bg-western-slate transition ${mobileOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`h-0.5 w-6 bg-western-slate transition ${mobileOpen ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-western-slate/10 bg-white md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => {
                const isHashLink = link.href.startsWith('/#')
                return (
                  <li key={link.href}>
                    {isHashLink ? (
                      <a
                        href={link.href}
                        className="block py-2 text-base font-medium text-western-slate transition hover:text-[#1B5E3F]"
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="block py-2 text-base font-medium text-western-slate transition hover:text-[#1B5E3F]"
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
