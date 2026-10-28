# Aditya Shankar — Portfolio

Personal portfolio of Aditya Shankar, full-stack developer. A single-page Next.js site with light and dark themes, GSAP scroll animations and all six of his GitHub projects.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · GSAP + ScrollTrigger · Motion · Lenis · Lucide · Simple Icons

Fonts: Grenze Gotisch (headlines), Agbalumo (main text), Acme (labels).

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

| Script          | What it does               |
| --------------- | -------------------------- |
| `npm run dev`   | Start the dev server       |
| `npm run build` | Production build           |
| `npm start`     | Serve the production build |
| `npm run lint`  | Lint with ESLint           |

## Project structure

```text
src/
├── app/                 # layout, page, global styles, favicon, Open Graph image
├── assets/images/       # photos and project screenshots (optimised by next/image)
├── components/
│   ├── layout/          # Nav, Footer, ThemeToggle, Preloader, Cursor, SmoothScroll
│   ├── sections/        # Hero, About, Skills, Projects, Profiles, Contact, Marquee
│   ├── ui/              # Reveal, Button, BrandIcon, ProjectImage
│   └── visuals/         # Fixora state-machine diagram, Marathon terminal
├── content/             # site.ts, skills.ts, projects.ts — all page copy lives here
└── lib/                 # gsap setup, theme script
```

To change text, links or projects, edit the files in `src/content/`.

## Deploying to Vercel

Import the repository in Vercel; `vercel.json` sets the framework, build commands and security headers. Set `NEXT_PUBLIC_SITE_URL` to the production URL so Open Graph links resolve correctly.
