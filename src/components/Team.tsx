import { motion } from 'framer-motion'
import { teamMembers } from '@/data/content'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const card = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
}

export function Team() {
  const founder = teamMembers.find((member) => member.name === 'Asghar Khan')
  const execMembers = teamMembers.filter((member) => member.name !== 'Asghar Khan')

  return (
    <section id="team" className="bg-white px-6 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto w-full max-w-[1400px]">
        <motion.div
          className="mx-auto max-w-7xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-4xl font-bold tracking-tight text-western-slate sm:text-5xl lg:text-6xl">
            Our Team
          </h2>
          <p className="mt-5 mx-auto max-w-4xl text-xl text-western-slate/80 lg:text-2xl">
            Meet the incredible individuals behind Western URSA&apos;s mission to make undergraduate research more accessible.
          </p>
        </motion.div>

        {founder && (
          <motion.ul
            className="mt-12 flex justify-center"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.li key={founder.id} variants={card} className="text-center">
              <div className="aspect-square w-full max-w-[270px] mx-auto overflow-hidden rounded-full bg-gradient-to-br from-western-green/20 to-western-greenLight/20 flex items-center justify-center ring-4 ring-western-green/25 shadow-lg shadow-western-green/10">
                {founder.imageUrl ? (
                  <img
                    src={founder.imageUrl}
                    alt={founder.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-4xl font-display font-bold text-western-slate/40">
                    {founder.name.charAt(0)}
                  </span>
                )}
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-western-slate">
                {founder.name}
              </h3>
              <p className="mt-1 text-base text-western-green font-medium">
                {founder.role}
              </p>
            </motion.li>
          </motion.ul>
        )}

        <motion.ul
          className="mt-10 flex flex-wrap justify-center gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {execMembers.map((member) => (
            <motion.li key={member.id} variants={card} className="text-center">
              <div className="aspect-square w-full max-w-[220px] mx-auto overflow-hidden rounded-full bg-gradient-to-br from-western-green/20 to-western-greenLight/20 flex items-center justify-center">
                {member.imageUrl ? (
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-4xl font-display font-bold text-western-slate/40">
                    {member.name.charAt(0)}
                  </span>
                )}
              </div>
              <h3 className="mt-4 font-display font-semibold text-western-slate">
                {member.name}
              </h3>
              <p className="mt-1 text-sm text-western-green font-medium">
                {member.role}
              </p>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          className="mx-auto mt-14 max-w-5xl overflow-hidden rounded-3xl bg-western-stone/80 shadow-sm ring-1 ring-western-slate/10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <img
            src="/ursa-team.jpg"
            alt="Western URSA executive team"
            className="h-full w-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  )
}
