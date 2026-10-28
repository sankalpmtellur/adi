import type { CSSProperties } from "react";
import { readableBrandColor, SkillIcon } from "@/components/ui/BrandIcon";
import { Eyebrow, Reveal, SplitHeading } from "@/components/ui/Reveal";
import { skillGroups, type Skill } from "@/content/skills";

// Bento rhythm: the denser groups get the wider tiles.
const spans = ["lg:col-span-4", "lg:col-span-4", "lg:col-span-4", "lg:col-span-3", "lg:col-span-5", "lg:col-span-4"];

function SourceMark({ skill }: { skill: Skill }) {
  return skill.source === "listed" ? (
    <span className="size-2 shrink-0 rounded-full bg-saffron" aria-hidden />
  ) : (
    <span className="size-2 shrink-0 rounded-full ring-[1.5px] ring-jade" aria-hidden />
  );
}

function SkillChip({ skill }: { skill: Skill }) {
  const note = skill.source === "listed" ? "Core skill" : `Used in ${skill.evidence}`;
  return (
    <li
      title={note}
      style={{ "--brand": readableBrandColor(skill.icon) } as CSSProperties}
      className="group/chip flex items-center gap-2.5 whitespace-nowrap rounded-xl border border-line bg-ink/60 px-3 py-2.5 transition-[transform,border-color,background-color] duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--brand)_45%,transparent)] hover:bg-ink-3"
    >
      <SkillIcon
        icon={skill.icon}
        className="size-4 shrink-0 text-mute transition-colors duration-300 group-hover/chip:text-[var(--brand)]"
      />
      <span className="text-[0.95rem] text-bone">{skill.name}</span>
      <span className="sr-only">({note})</span>
      <SourceMark skill={skill} />
    </li>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative border-t border-line bg-ink-2/60 py-28 sm:py-36">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow index="02" label="Skills" />
            <SplitHeading
              text="The toolkit, grouped by where it lives in the stack."
              accent={["toolkit,"]}
              className="mt-6 font-display text-[clamp(2.4rem,5.4vw,4.4rem)] leading-[0.98]"
            />
          </div>
          <Reveal className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-mute">
              Skills from my own list, plus the tools that show up in the code of the projects below.
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-label text-sm tracking-wide text-mute">
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-saffron" aria-hidden /> Core skill
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full ring-1 ring-jade" aria-hidden /> Used in a project
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal stagger={0.08} className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {skillGroups.map((group, i) => (
            <article
              key={group.title}
              className={`group relative overflow-hidden rounded-3xl border border-line bg-ink-2 p-6 sm:p-7 ${spans[i]}`}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-saffron/0 blur-3xl transition-colors duration-700 group-hover:bg-saffron/10"
              />
              <header className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-3xl text-bone">{group.title}</h3>
                <span className="font-label text-sm text-faint">{String(group.skills.length).padStart(2, "0")}</span>
              </header>
              <p className="mt-1 text-sm text-mute">{group.caption}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <SkillChip key={skill.name} skill={skill} />
                ))}
              </ul>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
