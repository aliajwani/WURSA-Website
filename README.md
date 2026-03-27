# WURSA Website

Modern, clean website for the **Western University Research Students Association (WURSA)** at Western University, London, Ontario.

## Stack

- **React 18** + **TypeScript**
- **Vite** for build and dev server
- **Tailwind CSS** for styling
- **Framer Motion** for scroll and entrance animations

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Project structure

- `src/components/` – Reusable sections: Navbar, Hero, About, Events, Team, GetInvolved, Footer
- `src/data/content.ts` – **Placeholder content** (copy, events, team, links). Edit this file to update the site without touching components.
- `src/App.tsx` – Composes all sections
- `src/index.css` – Global styles and Tailwind

## Customizing content

1. **Copy & links** – Edit `siteConfig`, `heroContent`, `aboutContent`, `getInvolvedContent` in `src/data/content.ts`.
2. **Events** – Add, remove, or edit objects in the `events` array in `src/data/content.ts`. Each event has `title`, `date`, `description`, and optional `link`.
3. **Team** – Edit the `teamMembers` array (name, role). Replace the placeholder avatar with a real image by adding an `image` URL and updating `Team.tsx` to use it.
4. **Nav** – Change `navLinks` in `src/data/content.ts` to add/rename nav items.

## Build for production

```bash
npm run build
```

Output is in `dist/`. Deploy that folder to any static host (Vercel, Netlify, GitHub Pages, etc.).

## Features

- Sticky navbar with mobile hamburger menu
- Smooth scroll to sections
- Fade-in on scroll (Framer Motion)
- Fully responsive layout
- Accessible links and labels
