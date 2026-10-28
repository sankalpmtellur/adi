import type { SimpleIcon } from "simple-icons";
import {
  siExpress,
  siGit,
  siHtml5,
  siJavascript,
  siMongodb,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPandas,
  siPrisma,
  siPython,
  siReact,
  siTailwindcss,
  siTypescript,
} from "simple-icons";

/** `listed` = shown on Aditya's own skills list; `project` = evidenced in his repositories. */
export type SkillSource = "listed" | "project";

/** Brands missing from simple-icons get a Lucide glyph instead. */
export type FallbackGlyph = "sql" | "excel" | "tableau";

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
      { name: "HTML & CSS", source: "listed", icon: siHtml5 },
    ],
  },
  {
    title: "Frontend",
    caption: "Interfaces and styling.",
    skills: [
      { name: "React", source: "listed", icon: siReact },
      { name: "Next.js", source: "listed", icon: siNextdotjs },
      { name: "Tailwind CSS", source: "listed", icon: siTailwindcss },
    ],
  },
  {
    title: "Backend & Data Stores",
    caption: "APIs, ORMs and databases.",
    skills: [
      { name: "Node.js", source: "listed", icon: siNodedotjs },
      { name: "Express JS", source: "listed", icon: siExpress },
      { name: "Prisma ORM", source: "listed", icon: siPrisma },
      { name: "MongoDB", source: "listed", icon: siMongodb },
      { name: "MySQL", source: "listed", icon: siMysql },
    ],
  },
  {
    title: "Data & Tools",
    caption: "Analysis, dashboards and versioning.",
    skills: [
      { name: "Pandas", source: "listed", icon: siPandas },
      { name: "Excel", source: "listed", icon: "excel" },
      { name: "Tableau", source: "project", icon: "tableau", evidence: "US house price analysis" },
      { name: "Git and GitHub", source: "listed", icon: siGit },
    ],
  },
];

/** Every skill name, in group order — used by the marquee. */
export const allSkillNames = skillGroups.flatMap((g) => g.skills.map((s) => s.name));
