import type { SimpleIcon } from "simple-icons";
import {
  siCss,
  siExpress,
  siFramer,
  siGit,
  siGithubpages,
  siHtml5,
  siJavascript,
  siJsonwebtokens,
  siMongodb,
  siMongoose,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPandas,
  siPrisma,
  siPython,
  siReact,
  siReactrouter,
  siTailwindcss,
  siTypescript,
  siVercel,
  siVite,
} from "simple-icons";

/** `listed` = shown on Aditya's own skills list; `project` = evidenced in his repositories. */
export type SkillSource = "listed" | "project";

/** Brands missing from simple-icons get a Lucide glyph instead. */
export type FallbackGlyph = "sql" | "excel" | "tableau" | "powerquery" | "api";

export interface Skill {
  name: string;
  source: SkillSource;
  icon: SimpleIcon | FallbackGlyph;
  /** Where the project-sourced skills were found. */
  evidence?: string;
}

export interface SkillGroup {
  title: string;
  caption: string;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    caption: "What the code is written in.",
    skills: [
      { name: "JavaScript", source: "listed", icon: siJavascript },
      { name: "TypeScript", source: "project", icon: siTypescript, evidence: "Fixora" },
      { name: "Python", source: "listed", icon: siPython },
      { name: "SQL", source: "listed", icon: "sql" },
      { name: "HTML", source: "listed", icon: siHtml5 },
      { name: "CSS", source: "listed", icon: siCss },
    ],
  },
  {
    title: "Frontend",
    caption: "Interfaces, routing and motion.",
    skills: [
      { name: "React", source: "listed", icon: siReact },
      { name: "Next.js", source: "listed", icon: siNextdotjs },
      { name: "Tailwind CSS", source: "listed", icon: siTailwindcss },
      { name: "Framer Motion", source: "project", icon: siFramer, evidence: "Fixora" },
      { name: "React Router", source: "project", icon: siReactrouter, evidence: "Fixora" },
      { name: "Vite", source: "project", icon: siVite, evidence: "Fixora" },
    ],
  },
  {
    title: "Backend",
    caption: "APIs, auth and server logic.",
    skills: [
      { name: "Node.js", source: "listed", icon: siNodedotjs },
      { name: "Express JS", source: "listed", icon: siExpress },
      { name: "Prisma ORM", source: "listed", icon: siPrisma },
      { name: "REST APIs", source: "project", icon: "api", evidence: "Fixora, Tasty Trail" },
      { name: "JWT auth", source: "project", icon: siJsonwebtokens, evidence: "Fixora" },
    ],
  },
  {
    title: "Databases",
    caption: "Document and relational storage.",
    skills: [
      { name: "MongoDB", source: "listed", icon: siMongodb },
      { name: "MySQL", source: "listed", icon: siMysql },
      { name: "Mongoose", source: "project", icon: siMongoose, evidence: "Fixora" },
    ],
  },
  {
    title: "Data & Analytics",
    caption: "Cleaning, querying and visualising data.",
    skills: [
      { name: "Pandas", source: "listed", icon: siPandas },
      { name: "Excel", source: "listed", icon: "excel" },
      { name: "Power Query", source: "project", icon: "powerquery", evidence: "Cafe sales dashboard" },
      { name: "Tableau", source: "project", icon: "tableau", evidence: "US house price analysis" },
    ],
  },
  {
    title: "Tools & Deployment",
    caption: "Versioning and shipping.",
    skills: [
      { name: "Git and GitHub", source: "listed", icon: siGit },
      { name: "Vercel", source: "project", icon: siVercel, evidence: "Fixora, Tasty Trail, TastyTrail Blog" },
      { name: "GitHub Pages", source: "project", icon: siGithubpages, evidence: "Data portfolio, RetroFuturist" },
    ],
  },
];

/** Every skill shown on Aditya's own skills list, in its original order — used by the marquee. */
export const listedSkills = [
  "CSS",
  "HTML",
  "JavaScript",
  "Python",
  "SQL",
  "Excel",
  "MongoDB",
  "MySQL",
  "Git and GitHub",
  "Express JS",
  "Next.js",
  "Node.js",
  "Pandas",
  "Prisma ORM",
  "React",
  "Tailwind CSS",
];
