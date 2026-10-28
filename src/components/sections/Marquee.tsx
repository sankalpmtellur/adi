import { allSkillNames } from "@/content/skills";

/** Decorative ticker of the skills list — the Skills section carries the accessible version. */
export function Marquee() {
  const row = (
    <ul className="flex shrink-0 items-center">
      {allSkillNames.map((skill) => (
        <li key={skill} className="flex items-center">
          <span className="px-6 font-display text-3xl text-bone/85 sm:text-5xl">{skill}</span>
          <span className="text-xl text-saffron">✦</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div aria-hidden className="overflow-hidden py-6">
      <div className="-mx-4 -rotate-1 overflow-hidden border-y border-line bg-ink-2 py-5 sm:py-6">
        <div className="flex w-max animate-marquee motion-reduce:animate-none hover:[animation-play-state:paused]">
          {row}
          {row}
        </div>
      </div>
    </div>
  );
}
