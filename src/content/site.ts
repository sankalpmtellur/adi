export type SocialKey = "github" | "linkedin" | "leetcode" | "codeforces" | "instagram";

export interface SocialLink {
  key: SocialKey;
  label: string;
  handle: string;
  href: string;
  blurb: string;
}

export const site = {
  name: "Aditya Shankar",
  firstName: "Aditya",
  lastName: "Shankar",
  role: "Full-stack developer",
  focus: "TypeScript · React · Node · Data",
  location: "New Delhi, India",
  email: "adityas1900@gmail.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "Aditya Shankar is a full-stack developer building with TypeScript, React, Next.js, Node and MongoDB — with a data analyst's toolkit of Python, SQL, Excel and Tableau.",
  // Kept static: Cache Components forbids reading the clock while prerendering.
  year: 2026,
} as const;

export const socials: SocialLink[] = [
  {
    key: "github",
    label: "GitHub",
    handle: "Racer-95",
    href: "https://github.com/Racer-95",
    blurb: "Source for every project on this page.",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    handle: "aditya-shankar",
    href: "https://www.linkedin.com/in/aditya-shankar-1bb0b8323/",
    blurb: "Professional profile and updates.",
  },
  {
    key: "leetcode",
    label: "LeetCode",
    handle: "Racer_95",
    href: "https://leetcode.com/u/Racer_95/",
    blurb: "Data structures and algorithms practice.",
  },
  {
    key: "codeforces",
    label: "Codeforces",
    handle: "Racer_95",
    href: "https://codeforces.com/profile/Racer_95",
    blurb: "Competitive programming contests.",
  },
  {
    key: "instagram",
    label: "Instagram",
    handle: "aditya_shankar.17",
    href: "https://www.instagram.com/aditya_shankar.17/",
    blurb: "Life away from the editor.",
  },
];

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "profiles", label: "Profiles" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof navLinks)[number]["id"];
