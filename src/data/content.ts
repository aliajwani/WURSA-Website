// Placeholder content – swap out with your real copy and assets

export const siteConfig = {
  clubName: 'Western URSA',
  fullName: 'Western Undergraduate Research Students Association',
  tagline: 'Empowering Research at Western',
  contactEmail: 'research@westernusc.ca',
  instagram: 'https://www.instagram.com/westernursa',
  linktree:
    'https://linktr.ee/westernursa?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGne_TUFBqX5UxAr27KlEzMecHSTk-P4X9_qSEP5Yo0Agzh69lYVHcPokjWzsw_aem_xu8uLRIj4uMbSFWOusvZSg',
}

export const navLinks = [
  { label: 'Home', href: '/#hero' },
  { label: 'Events', href: '/events' },
  { label: 'Team', href: '/team' },
  { label: 'Mentor–Mentee', href: '/mentor-mentee' },
]

export const heroContent = {
  headline: "Western Undergraduate Research Students' Association",
  subheading:
    'Also known as Western URSA, we connect undergraduate research students at Western University through community, mentorship, and events.',
  ctaPrimary: { label: 'Join Us', href: '#get-involved' },
  ctaSecondary: { label: 'Learn More', href: '/#about' },
}

export const aboutContent = {
  mission:
    "Western URSA connects undergraduate research students across disciplines. We're here to support your academic journey through networking, workshops, and a strong community of researchers at Western.",
  whatWeDo: [
    {
      title: 'Networking',
      description: 'Connect with peers and faculty through socials and mixers.',
      icon: 'network',
    },
    {
      title: 'Workshops',
      description: 'Skill-building sessions on writing, methods, and research tools.',
      icon: 'workshop',
    },
    {
      title: 'Research Support',
      description: 'Resources and guidance for finding and conducting research.',
      icon: 'support',
    },
    {
      title: 'Speaker Events',
      description: 'Talks from researchers and industry experts.',
      icon: 'speaker',
    },
  ],
}

export interface EventItem {
  id: string
  title: string
  date: string
  description: string
  imageUrl?: string
  link?: string
}

export const events: EventItem[] = [
  {
    id: '2',
    title: 'LinkedIn Headshots Day',
    date: 'March 11th, 2026',
    description: 'Get professional LinkedIn headshots taken on campus to level up your research profile.',
    imageUrl: '/event-headshots.png',
    link: '#',
  },
  {
    id: '1',
    title: 'Discovering Research & Networking Symposium',
    date: 'April 2nd, 2026',
    description: 'Explore research opportunities and connect with peers and faculty at our annual symposium.',
    imageUrl: '/event-symposium.png',
    link: '#',
  },
]

export interface TeamMember {
  id: string
  name: string
  role: string
  imageUrl?: string
}

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Asghar Khan',
    role: 'Founder and President',
    imageUrl: '/asghar-khan-original.jpg',
  },
  {
    id: '2',
    name: 'Jenna Pavlovic',
    role: 'VP - Internals',
    imageUrl: '/jenna-pavlovic.jpg',
  },
  {
    id: '3',
    name: 'Anita Severin',
    role: 'VP - Externals',
    imageUrl: '/anita-severin.jpg',
  },
  {
    id: '4',
    name: 'Sofia Tomassini',
    role: 'VP - Events',
    imageUrl: '/sofia-tomassini.jpg',
  },
  {
    id: '5',
    name: 'Lily Carson',
    role: 'VP - Marketing',
    imageUrl: '/lily-carson.jpg',
  },
  {
    id: '6',
    name: 'Jibraan Dhirani',
    role: 'Co-VP - Finance',
    imageUrl: '/jibraan-dhirani.jpg',
  },
  {
    id: '7',
    name: 'Porousha Shokoofeh',
    role: 'Co-VP - Finance',
    imageUrl: '/porousha-shokoofeh.jpg',
  },
  {
    id: '8',
    name: 'Fiona Zhou',
    role: 'VP - Communications',
    imageUrl: '/fiona-zhou.jpg',
  },
  {
    id: '9',
    name: 'Laken Harrison',
    role: 'VP - Research & Academics',
    imageUrl: '/laken-harrison.jpg',
  },
  {
    id: '10',
    name: 'Ali Ajwani',
    role: 'VP - Technology',
    imageUrl: '/ali-ajwani.jpg',
  },
]

export const getInvolvedContent = {
  headline: 'Join the research community.',
  subheading: 'Whether you’re exploring research for the first time or already deep in a project, Western URSA is here for you.',
  ctaLabel: 'Get Involved',
  ctaHref: 'mailto:research@westernusc.ca',
}
