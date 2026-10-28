import { Braces, ChartColumnBig, Database, FileSpreadsheet, Workflow } from "lucide-react";
import type { SimpleIcon } from "simple-icons";
import { siCodeforces, siGithub, siInstagram, siLeetcode } from "simple-icons";
import type { SocialKey } from "@/content/site";
import type { FallbackGlyph } from "@/content/skills";

// LinkedIn is no longer shipped by simple-icons, so its mark is inlined here.
const siLinkedinPath =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";

const fallbackGlyphs = {
  sql: Database,
  excel: FileSpreadsheet,
  tableau: ChartColumnBig,
  powerquery: Workflow,
  api: Braces,
} satisfies Record<FallbackGlyph, unknown>;

interface IconProps {
  className?: string;
  title?: string;
}

function SvgPath({ path, className, title }: IconProps & { path: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path d={path} />
    </svg>
  );
}

export function SkillIcon({ icon, className }: { icon: SimpleIcon | FallbackGlyph; className?: string }) {
  if (typeof icon === "string") {
    const Glyph = fallbackGlyphs[icon];
    return <Glyph className={className} strokeWidth={1.75} aria-hidden />;
  }
  return <SvgPath path={icon.path} className={className} />;
}

const socialPaths: Record<SocialKey, string> = {
  github: siGithub.path,
  linkedin: siLinkedinPath,
  leetcode: siLeetcode.path,
  codeforces: siCodeforces.path,
  instagram: siInstagram.path,
};

export function SocialIcon({ name, className, title }: IconProps & { name: SocialKey }) {
  return <SvgPath path={socialPaths[name]} className={className} title={title} />;
}

/** Brand colour readable on the dark page — very dark brand colours fall back to bone. */
export function readableBrandColor(icon: SimpleIcon | FallbackGlyph): string {
  if (typeof icon === "string") return "var(--color-jade)";
  const n = parseInt(icon.hex, 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return luminance < 0.32 ? "var(--color-bone)" : `#${icon.hex}`;
}
