import type { StaticImageData } from "next/image";
import capstronImg from "@/assets/images/capstron.jpg";
import dvaCafeImg from "@/assets/images/dva-cafe.jpg";
import dvaHouseImg from "@/assets/images/dva-house.jpg";
import foodBlogImg from "@/assets/images/foodblog.jpg";
import tastyImg from "@/assets/images/tasty.jpg";

export type ProjectVisual =
  | { kind: "image"; images: { src: StaticImageData; alt: string }[] }
  | { kind: "fixora" }
  | { kind: "marathon" };

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  index: string;
  name: string;
  kicker: string;
  summary: string;
  highlights: string[];
  engineering: string;
  tech: string[];
  repo: string;
  demo?: string;
  extraLinks?: ProjectLink[];
  stats?: { value: string; label: string }[];
  visual: ProjectVisual;
}

export const projects: Project[] = [
  {
    slug: "fixora",
    index: "01",
    name: "Fixora",
    kicker: "Local services marketplace",
    summary:
      "A full-stack marketplace where customers discover local service providers, book them and review the work — while providers move each job through a defined booking lifecycle.",
    highlights: [
      "Customers, providers and admins modelled as Mongoose discriminators and guarded by JWT plus role middleware.",
      "Bookings run pending → accepted / rejected → in progress → completed / cancelled, emitting an event on each transition.",
      "One review per completed booking; each new review recalculates the provider's average rating.",
    ],
    engineering:
      "A typed Express 5 API built around five design patterns: generic repositories, a service layer, a role-aware user factory, pluggable payment strategies (card, UPI, cash, wallet) and a typed observer bus for booking events — documented with ER, UML class and sequence diagrams.",
    tech: ["TypeScript", "React 19", "Vite", "Tailwind CSS", "Framer Motion", "Node.js", "Express 5", "MongoDB", "Mongoose", "JWT"],
    repo: "https://github.com/Racer-95/Fixora",
    demo: "https://fixora-flame.vercel.app/",
    stats: [
      { value: "25", label: "REST endpoints" },
      { value: "5", label: "design patterns" },
      { value: "3", label: "user roles" },
    ],
    visual: { kind: "fixora" },
  },
  {
    slug: "tasty-trail",
    index: "02",
    name: "Tasty Trail",
    kicker: "Recipe-sharing community",
    summary:
      "A recipe community front end where signed-in cooks publish, discover and manage recipes against a deployed REST backend.",
    highlights: [
      "Token-based sign-in with protected routes that send signed-out visitors back to login.",
      "Full recipe CRUD — ingredients, steps, cuisine and category on create, plus edit and delete from a personal “My Recipes” view.",
      "Discover page with title search, category filters and sorting by recency or prep time.",
    ],
    engineering:
      "All endpoints live in one config module, and free-form ingredient and step input is parsed line by line into structured lists on the recipe page.",
    tech: ["Next.js 16", "React 19", "Tailwind CSS 4", "Axios", "REST API"],
    repo: "https://github.com/Racer-95/Tasty-Trial-frontend",
    demo: "https://tasty-trial-frontend.vercel.app",
    visual: {
      kind: "image",
      images: [{ src: tastyImg, alt: "Tasty Trail cover image: a table of dishes from several cuisines" }],
    },
  },
  {
    slug: "data-portfolio",
    index: "03",
    name: "Data Analytics Portfolio",
    kicker: "Dashboards & analysis",
    summary:
      "A GitHub-styled showcase for data work, presenting dashboard projects with filter tabs, live search and detail modals.",
    highlights: [
      "Cafe sales dashboard in Excel and Power Query over 10,000 transactions — revenue by product, payment method, order type and month.",
      "US house price analysis: Python preprocessing feeding a Tableau dashboard of state price maps, top cities and price per sq ft across 11,410 listings.",
      "Built as a single dependency-free HTML, CSS and JavaScript page.",
    ],
    engineering:
      "Filtering, search and the modal viewer are plain DOM scripting driven by data attributes on each card — no framework required.",
    tech: ["Python", "Pandas", "Excel", "Power Query", "Tableau", "HTML", "CSS", "JavaScript"],
    repo: "https://github.com/Racer-95/DVA_portfolio",
    demo: "https://racer-95.github.io/DVA_portfolio/",
    extraLinks: [
      { label: "Cafe sales repo", href: "https://github.com/Racer-95/retail_dataset" },
      { label: "House price repo", href: "https://github.com/Racer-95/B_G8_HOUSEPRICELIST" },
    ],
    visual: {
      kind: "image",
      images: [
        { src: dvaHouseImg, alt: "Tableau dashboard of US house prices with KPI tiles, a state price map and bar charts" },
        { src: dvaCafeImg, alt: "Excel dashboard of cafe shop sales with KPI tiles, product bar charts and a monthly trend line" },
      ],
    },
  },
  {
    slug: "tastytrail-blog",
    index: "04",
    name: "TastyTrail Blog",
    kicker: "Recipe browser",
    summary:
      "The first take on TastyTrail: a Next.js recipe browser that pulls recipes from the DummyJSON API and shares them across pages through React Context.",
    highlights: [
      "Dynamic /recipe/[id] pages with cuisine, prep and cook time, servings, rating and instructions.",
      "Responsive header with a collapsible mobile menu, styled with CSS Modules.",
    ],
    engineering: "A single context provider fetches once and feeds the home page, recipe grid and detail routes.",
    tech: ["Next.js 15", "React 19", "CSS Modules", "DummyJSON API"],
    repo: "https://github.com/Racer-95/food-blog",
    demo: "https://food-blog-opal.vercel.app",
    visual: {
      kind: "image",
      images: [{ src: foodBlogImg, alt: "TastyTrail Blog hero image: a breakfast frittata with fruit and coffee" }],
    },
  },
  {
    slug: "retrofuturist",
    index: "05",
    name: "RetroFuturist",
    kicker: "Landing page concept",
    summary:
      "A hand-built landing page for a designer portfolio concept — mid-century modern meets neon-lit future.",
    highlights: [
      "Hero banner, nine-project gallery, about block and a contact section.",
      "Flexbox layout that reflows below 980px, written in plain HTML and CSS.",
    ],
    engineering: "No framework and no build step: one HTML file and one stylesheet, published on GitHub Pages.",
    tech: ["HTML", "CSS", "Flexbox", "GitHub Pages"],
    repo: "https://github.com/Racer-95/capstron",
    demo: "https://racer-95.github.io/capstron/page.html",
    visual: {
      kind: "image",
      images: [{ src: capstronImg, alt: "RetroFuturist hero artwork: futuristic cars on a neon highway at sunset" }],
    },
  },
  {
    slug: "project-marathon",
    index: "06",
    name: "Project Marathon",
    kicker: "React sandbox",
    summary:
      "A Create React App workspace on React 19 with Testing Library wired in — kept as a clean starting point rather than a finished product.",
    highlights: ["Dev server, production build and Jest test scripts ready to go.", "Web app manifest and robots.txt in place."],
    engineering: "Starter scaffolds like this are where new toolchains get tried before they reach a real project.",
    tech: ["React 19", "Create React App", "Testing Library"],
    repo: "https://github.com/Racer-95/aditya_shankar_project_marathon",
    visual: { kind: "marathon" },
  },
];
