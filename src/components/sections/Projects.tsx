import { ArrowUpRight } from "lucide-react";
import { SocialIcon } from "@/components/ui/BrandIcon";
import { Eyebrow, Reveal, SplitHeading } from "@/components/ui/Reveal";
import { FixoraVisual } from "@/components/visuals/FixoraVisual";
import { MarathonVisual } from "@/components/visuals/MarathonVisual";
import { projects, type Project } from "@/content/projects";
import { ProjectImage } from "./ProjectImage";

function bySlug(slug: string): Project {
  const project = projects.find((p) => p.slug === slug);
  if (!project) throw new Error(`Unknown project: ${slug}`);
  return project;
}

function ProjectLinks({ project }: { project: Project }) {
  const linkBase =
    "group/link inline-flex items-center gap-2 rounded-full px-4 py-2.5 font-label text-sm tracking-wide transition-colors duration-300";
  return (
    <ul className="flex flex-wrap items-center gap-2">
      {project.demo ? (
        <li>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkBase} bg-saffron text-ink hover:bg-bone`}
            aria-label={`Live demo of ${project.name} (opens in a new tab)`}
          >
            Live demo
            <ArrowUpRight
              className="size-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
              aria-hidden
            />
          </a>
        </li>
      ) : null}
      <li>
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className={`${linkBase} border border-line text-bone hover:border-bone/40`}
          aria-label={`${project.name} source on GitHub (opens in a new tab)`}
        >
          <SocialIcon name="github" className="size-3.5" />
          Source
        </a>
      </li>
      {project.extraLinks?.map((l) => (
        <li key={l.href}>
          <a
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkBase} text-mute hover:text-saffron`}
          >
            {l.label}
            <ArrowUpRight className="size-3.5" aria-hidden />
          </a>
        </li>
      ))}
    </ul>
  );
}

function Tags({ tech }: { tech: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
      {tech.map((t) => (
        <li key={t} className="rounded-full border border-line px-3 py-1 text-xs tracking-wide text-mute">
          {t}
        </li>
      ))}
    </ul>
  );
}

function ProjectMeta({ project, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <Reveal stagger={0.07} className="flex flex-col gap-6">
      <p className="flex items-center gap-3 font-label text-sm uppercase tracking-[0.2em] text-mute">
        <span className="text-saffron">{project.index}</span>
        <span className="h-px w-8 bg-line" aria-hidden />
        {project.kicker}
      </p>
      <h3 className={`font-display leading-[0.9] text-bone ${compact ? "text-5xl" : "text-[clamp(3rem,6vw,5.2rem)]"}`}>
        {project.name}
      </h3>
      <p className={`leading-relaxed text-bone/85 ${compact ? "" : "text-lg"}`}>{project.summary}</p>
      <ul className="space-y-3">
        {project.highlights.map((h) => (
          <li key={h} className="flex gap-3 leading-relaxed text-mute">
            <span className="mt-2.5 h-px w-4 shrink-0 bg-saffron" aria-hidden />
            {h}
          </li>
        ))}
      </ul>
      {!compact ? (
        <div className="rounded-2xl border-l-2 border-jade bg-jade/[0.05] px-5 py-4">
          <p className="font-label text-xs uppercase tracking-[0.2em] text-jade">Under the hood</p>
          <p className="mt-1.5 leading-relaxed text-mute">{project.engineering}</p>
        </div>
      ) : null}
      <Tags tech={project.tech} />
      <ProjectLinks project={project} />
    </Reveal>
  );
}

function FeaturedFixora() {
  const p = bySlug("fixora");
  return (
    <article aria-labelledby="p-fixora" className="relative overflow-hidden rounded-[2.5rem] border border-line bg-ink-2">
      <div aria-hidden className="pointer-events-none absolute -left-32 -top-32 size-96 rounded-full bg-[radial-gradient(closest-side,rgb(244_178_62/0.12),transparent)]" />
      <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-14">
        <div className="lg:col-span-5" id="p-fixora">
          <ProjectMeta project={p} />
        </div>
        <div className="flex flex-col gap-4 lg:col-span-7">
          <div className="flex-1 rounded-3xl border border-line bg-ink/60">
            <FixoraVisual />
          </div>
          {p.stats ? (
            <Reveal stagger={0.08} as="dl" className="grid grid-cols-3 gap-3">
              {p.stats.map((s) => (
                <div key={s.label} className="rounded-2xl border border-line bg-ink/60 px-3 py-5 sm:px-6">
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block font-display text-5xl leading-none text-saffron sm:text-6xl">{s.value}</span>
                    <span className="mt-2 block font-label text-[0.7rem] uppercase leading-tight tracking-[0.08em] text-mute sm:text-sm sm:tracking-[0.16em]" aria-hidden>
                      {s.label}
                    </span>
                  </dd>
                </div>
              ))}
            </Reveal>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function SplitProject({ project, reverse = false }: { project: Project; reverse?: boolean }) {
  if (project.visual.kind !== "image") return null;
  const [first, second] = project.visual.images;

  const visual = second ? (
    // Two dashboards: one large, one tucked in front and tilted.
    <div className="group relative pb-16 sm:pb-24">
      <ProjectImage
        src={first.src}
        alt={first.alt}
        sizes="(min-width: 1024px) 55vw, 95vw"
        className="aspect-[16/10] rounded-3xl border border-line"
        imgClassName="object-top"
      />
      <div className="absolute -bottom-2 left-4 w-[62%] -rotate-3 transition-transform duration-700 ease-out-expo group-hover:-translate-x-2 group-hover:-rotate-6 sm:left-[-1.5rem]">
        <ProjectImage
          src={second.src}
          alt={second.alt}
          sizes="(min-width: 1024px) 34vw, 60vw"
          className="aspect-[3/2] rounded-2xl border border-line shadow-2xl shadow-black/60"
          imgClassName="object-top"
        />
      </div>
    </div>
  ) : (
    <div className="group relative">
      <ProjectImage
        src={first.src}
        alt={first.alt}
        sizes="(min-width: 1024px) 55vw, 95vw"
        className="aspect-[4/3] rounded-[2rem] border border-line"
      />
      <span
        aria-hidden
        className="text-outline pointer-events-none absolute -bottom-10 right-4 font-display text-[9rem] leading-none sm:text-[12rem]"
      >
        {project.index}
      </span>
    </div>
  );

  return (
    <article aria-labelledby={`p-${project.slug}`} className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
      <div className={`lg:col-span-7 ${reverse ? "lg:order-2" : ""}`}>{visual}</div>
      <div className={`lg:col-span-5 ${reverse ? "lg:order-1" : ""}`} id={`p-${project.slug}`}>
        <ProjectMeta project={project} />
      </div>
    </article>
  );
}

function CompactCard({ project, aspect }: { project: Project; aspect: string }) {
  if (project.visual.kind !== "image") return null;
  const [img] = project.visual.images;
  return (
    <article
      aria-labelledby={`p-${project.slug}`}
      className="group flex flex-col gap-8 rounded-[2rem] border border-line bg-ink-2 p-4 pb-8 transition-colors duration-500 hover:border-bone/20 sm:p-5 sm:pb-10"
    >
      <ProjectImage src={img.src} alt={img.alt} sizes="(min-width: 768px) 45vw, 95vw" className={`${aspect} rounded-[1.5rem]`} />
      <div className="px-2 sm:px-4" id={`p-${project.slug}`}>
        <ProjectMeta project={project} compact />
      </div>
    </article>
  );
}

function SandboxStrip() {
  const p = bySlug("project-marathon");
  return (
    <article
      aria-labelledby="p-project-marathon"
      className="grid gap-8 rounded-[2rem] border border-dashed border-line p-6 sm:p-10 md:grid-cols-12 md:items-center md:gap-12"
    >
      <div className="md:col-span-7" id="p-project-marathon">
        <ProjectMeta project={p} compact />
      </div>
      <Reveal className="md:col-span-5">
        <MarathonVisual />
      </Reveal>
    </article>
  );
}

export function Projects() {
  return (
    <section id="work" className="relative border-t border-line py-28 sm:py-36">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow index="03" label="Selected work" />
            <SplitHeading
              text="Six repositories. Five of them live."
              accent={["Five"]}
              className="mt-6 font-display text-[clamp(2.8rem,7vw,6rem)] leading-[0.92]"
            />
          </div>
          <Reveal className="lg:col-span-4">
            <p className="text-lg leading-relaxed text-mute">
              From a pattern-driven services marketplace to Tableau dashboards — each with its source, and a live link
              wherever one exists.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 space-y-28 sm:space-y-36">
          <FeaturedFixora />
          <SplitProject project={bySlug("tasty-trail")} />
          <SplitProject project={bySlug("data-portfolio")} reverse />
          <div className="grid items-start gap-6 md:grid-cols-2">
            <CompactCard project={bySlug("tastytrail-blog")} aspect="aspect-[4/3]" />
            <div className="md:mt-24">
              <CompactCard project={bySlug("retrofuturist")} aspect="aspect-[2/1]" />
            </div>
          </div>
          <SandboxStrip />
        </div>
      </div>
    </section>
  );
}
