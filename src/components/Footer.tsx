import { siteConfig, navLinks } from '@/data/content'

export function Footer() {
  return (
    <footer id="contact" className="border-t border-[#1B5E3F]/30 bg-[#0D3B2A] px-6 py-12 lg:px-8">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <img
              src="/ursa-logo.png"
              alt=""
              className="h-12 w-12 shrink-0 rounded-full object-cover"
            />
            <div>
              <p className="font-display text-lg font-semibold text-white">
                {siteConfig.fullName}
              </p>
              <p className="mt-1 text-sm text-white/70">
                Western University · London, Ontario
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/80 transition hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-white/10 pt-8">
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="flex items-center gap-2 text-sm text-white/80 transition hover:text-white"
            aria-label="Email"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            {siteConfig.contactEmail}
          </a>
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-white/80 transition hover:text-white"
            aria-label="Instagram"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.467.398.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Instagram</span>
          </a>
          <a
            href={siteConfig.linktree}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-white/80 transition hover:text-white"
            aria-label="Linktree"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
              <path
                d="M9.5 7.75L11 6.25a3 3 0 0 1 4.24 0 3 3 0 0 1 0 4.24l-1.25 1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.5 16.25 13 17.75a3 3 0 0 1-4.24 0 3 3 0 0 1 0-4.24l1.25-1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.75 13.25 13.25 10.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Linktree</span>
          </a>
        </div>

        <p className="mt-8 text-xs text-white/50">
          © {new Date().getFullYear()} {siteConfig.fullName}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
