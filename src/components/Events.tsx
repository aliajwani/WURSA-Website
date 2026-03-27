import { motion } from 'framer-motion'
import { events } from '@/data/content'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const card = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function Events() {
  return (
    <section id="events" className="bg-white px-6 pt-12 pb-20 lg:px-8 lg:pt-16 lg:pb-28">
      <div className="mx-auto w-full max-w-[1400px]">
        <motion.div
          className="mx-auto max-w-6xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-4xl font-bold tracking-tight text-western-slate sm:text-5xl">
            Events
          </h2>
          <p className="mt-4 mx-auto max-w-3xl text-xl text-western-slate/80">
            Upcoming and recent events from Western URSA. Follow us on Instagram for the latest.
          </p>
        </motion.div>

        <motion.ul
          className="mt-12 flex justify-center gap-8 overflow-x-auto pb-3 lg:flex-wrap lg:overflow-visible [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {events.length === 0 ? (
            <motion.li variants={card} className="col-span-full text-center py-12 text-western-slate/70">
              More events coming soon. Follow us on Instagram for updates.
            </motion.li>
          ) : events.map((event) => (
            <motion.li key={event.id} variants={card} className="w-[390px] flex-shrink-0 sm:w-[460px]">
              <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-western-slate/10 bg-white shadow-sm transition hover:border-western-green/30 hover:shadow-lg">
                <div className="h-96 overflow-hidden bg-gradient-to-br from-western-green/20 to-western-greenLight/10">
                  {event.imageUrl ? (
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="text-sm font-medium text-western-slate/50">
                        Event image
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-base font-medium text-western-green">
                    {event.date}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-western-slate group-hover:text-western-green">
                    {event.title}
                  </h3>
                  <p className="mt-3 text-base text-western-slate/75 line-clamp-3">
                    {event.description}
                  </p>
                  <div className="mt-4 flex-1" />
                  <div className="mt-4">
                    {event.id === '2' ? (
                      <div className="group/finished relative">
                        <button
                          type="button"
                          aria-disabled="true"
                          className="inline-flex w-full items-center justify-center rounded-lg bg-slate-300 px-3 py-2 text-sm font-semibold text-slate-600 shadow-sm"
                        >
                          Register
                        </button>
                        <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-md bg-western-slate px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow transition group-hover/finished:opacity-100">
                          This event has finished.
                        </span>
                      </div>
                    ) : event.link && event.link !== '#' ? (
                      <a
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center rounded-lg bg-[#1B5E3F] px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0D3B2A]"
                      >
                        Register
                      </a>
                    ) : (
                      <div className="group/soon relative">
                        <button
                          type="button"
                          aria-disabled="true"
                          className="inline-flex w-full items-center justify-center rounded-lg bg-[#1B5E3F] px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0D3B2A]"
                        >
                          Register
                        </button>
                        <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-md bg-western-slate px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow transition group-hover/soon:opacity-100">
                          Registration coming soon.
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
