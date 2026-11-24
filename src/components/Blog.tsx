import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { blogPosts, siteConfig, type BlogPost } from '@/data/content'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const card = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

function ArrowIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
    </svg>
  )
}

/** Cover image, or a branded green fallback when a post has no image. */
function Cover({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  // Fall back to the green design if the image fails to load
  const [failed, setFailed] = useState(false)

  if (post.imageUrl && !failed) {
    return (
      <img
        src={post.imageUrl}
        alt=""
        onError={() => setFailed(true)}
        className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
      />
    )
  }

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#1B5E3F] via-[#0D3B2A] to-[#0D3B2A]">
      {/* soft glow + dot texture */}
      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-western-greenLight/30 blur-3xl transition duration-500 group-hover:scale-125" />
      <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-western-greenLight/20 blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      />
      <img
        src="/ursa-logo.png"
        alt=""
        className={`relative rounded-full object-cover opacity-90 shadow-lg ring-4 ring-white/10 transition duration-500 group-hover:scale-110 ${
          featured ? 'h-28 w-28 lg:h-36 lg:w-36' : 'h-20 w-20'
        }`}
      />
    </div>
  )
}

function Meta({ post, light = false }: { post: BlogPost; light?: boolean }) {
  const muted = light ? 'text-white/70' : 'text-western-slate/60'
  return (
    <div className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-sm ${muted}`}>
      <span className={light ? 'font-medium text-western-greenLight' : 'font-medium text-western-green'}>
        {post.date}
      </span>
      {post.readTime && (
        <>
          <span aria-hidden>·</span>
          <span>{post.readTime}</span>
        </>
      )}
      {post.author && (
        <>
          <span aria-hidden>·</span>
          <span>{post.author}</span>
        </>
      )}
    </div>
  )
}

function Tag({ label, light = false }: { label: string; light?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
        light ? 'bg-white/15 text-white backdrop-blur' : 'bg-western-greenLight/15 text-western-green'
      }`}
    >
      {label}
    </span>
  )
}

function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <motion.a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group mt-12 grid overflow-hidden rounded-3xl bg-[#0D3B2A] shadow-xl ring-1 ring-black/5 transition hover:shadow-2xl lg:grid-cols-2"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative h-64 overflow-hidden sm:h-80 lg:h-full lg:min-h-[26rem]">
        <Cover post={post} featured />
        <div className="absolute left-5 top-5 flex gap-2">
          <span className="inline-flex items-center rounded-full bg-western-greenLight px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow">
            Latest
          </span>
          {post.tag && <Tag label={post.tag} light />}
        </div>
      </div>

      <div className="relative flex flex-col justify-center p-8 sm:p-10 lg:p-14">
        <Meta post={post} light />
        <h3 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
          {post.title}
        </h3>
        <p className="mt-4 text-lg leading-relaxed text-white/80">{post.excerpt}</p>
        <span className="mt-8 inline-flex w-fit items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#0D3B2A] shadow-sm transition group-hover:bg-western-greenLight group-hover:text-white">
          Read on Substack
          <ArrowIcon className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </motion.a>
  )
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <motion.li variants={card} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)]">
      <a
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-western-slate/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-western-green/30 hover:shadow-lg"
      >
        <div className="relative h-52 overflow-hidden">
          <Cover post={post} />
          {post.tag && (
            <div className="absolute left-4 top-4">
              <Tag label={post.tag} light />
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col p-6">
          <Meta post={post} />
          <h3 className="mt-2 font-display text-xl font-semibold leading-snug text-western-slate transition group-hover:text-western-green">
            {post.title}
          </h3>
          <p className="mt-3 text-base text-western-slate/75 line-clamp-3">{post.excerpt}</p>
          <div className="flex-1" />
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-western-green">
            Read on Substack
            <ArrowIcon className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </a>
    </motion.li>
  )
}

function SubscribeBanner() {
  return (
    <motion.div
      className="relative mt-16 overflow-hidden rounded-3xl bg-gradient-to-r from-[#1B5E3F] to-[#0D3B2A] px-8 py-12 text-center sm:px-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-western-greenLight/25 blur-3xl" />
      <div className="absolute -bottom-12 left-10 h-40 w-40 rounded-full bg-western-greenLight/15 blur-3xl" />
      <div className="relative">
        <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
          Never miss a post
        </h3>
        <p className="mx-auto mt-3 max-w-xl text-white/80">
          Subscribe on Substack and new stories from the Western research community land straight in your inbox.
        </p>
        <a
          href={siteConfig.substack}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#0D3B2A] shadow-sm transition hover:bg-western-greenLight hover:text-white"
        >
          Subscribe on Substack
          <ArrowIcon className="h-4 w-4" />
        </a>
      </div>
    </motion.div>
  )
}

/**
 * Blog section. On the homepage pass `preview` to show the latest few posts
 * with a "View all" link; the /blog page shows everything plus a subscribe banner.
 */
export function Blog({ preview = false }: { preview?: boolean }) {
  const [featured, ...rest] = blogPosts
  const others = preview ? rest.slice(0, 3) : rest

  return (
    <section id="blog" className="bg-western-stone px-6 pt-12 pb-20 lg:px-8 lg:pt-16 lg:pb-28">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-4xl font-bold tracking-tight text-western-slate sm:text-5xl">
            Blog
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-xl text-western-slate/80">
            Stories, guides and spotlights from Western's undergraduate research community.
          </p>
        </motion.div>

        {!featured ? (
          <p className="py-16 text-center text-western-slate/70">
            Our first post is on the way. Subscribe on{' '}
            <a href={siteConfig.substack} target="_blank" rel="noopener noreferrer" className="font-semibold text-western-green underline-offset-4 hover:underline">
              Substack
            </a>{' '}
            so you don't miss it.
          </p>
        ) : (
          <>
            <FeaturedPost post={featured} />

            {others.length > 0 && (
              <motion.ul
                className="mt-8 flex flex-wrap justify-center gap-8"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
              >
                {others.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </motion.ul>
            )}
          </>
        )}

        {preview ? (
          featured && (
            <div className="mt-12 text-center">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 rounded-lg bg-[#1B5E3F] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0D3B2A]"
              >
                View all posts
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          )
        ) : (
          <SubscribeBanner />
        )}
      </div>
    </section>
  )
}
