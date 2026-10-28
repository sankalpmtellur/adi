"use client";

import Image from "next/image";
import { useRef } from "react";
import aditya2 from "@/assets/aditya2.jpg";
import { Eyebrow, Reveal, SplitHeading } from "@/components/ui/Reveal";
import { site } from "@/content/site";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

const principles = [
  {
    title: "Model it first",
    body: "Fixora ships with an ER diagram, a UML class diagram and a booking sequence diagram alongside the code.",
  },
  {
    title: "Patterns over patches",
    body: "Repositories, a service layer, factories, strategies and an observer bus keep a typed Express API easy to extend.",
  },
  {
    title: "Put it online",
    body: "Five of the six projects on this page are deployed on Vercel or GitHub Pages — click through and try them.",
  },
];

const facts = [
  { label: "Based in", value: site.location },
  { label: "Builds with", value: "TypeScript · React · Node" },
  { label: "Analyses with", value: "Python · SQL · Tableau" },
];

export function About() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-portrait]",
          { clipPath: "inset(18% 18% 18% 18% round 2rem)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 2rem)",
            ease: "none",
            scrollTrigger: { trigger: "[data-portrait]", start: "top 90%", end: "top 35%", scrub: true },
          },
        );
        gsap.fromTo(
          "[data-portrait-img]",
          { yPercent: -8, scale: 1.15 },
          {
            yPercent: 8,
            scale: 1.05,
            ease: "none",
            scrollTrigger: { trigger: "[data-portrait]", start: "top bottom", end: "bottom top", scrub: true },
          },
        );
        gsap.from("[data-tilt]", {
          rotate: 0,
          ease: "none",
          scrollTrigger: { trigger: "[data-portrait]", start: "top 80%", end: "bottom 40%", scrub: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="about" className="relative py-28 sm:py-36">
      <div className="container-page grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="relative mx-auto max-w-sm lg:sticky lg:top-28 lg:max-w-none">
            <div
              data-tilt
              aria-hidden
              className="absolute inset-0 translate-x-4 translate-y-4 rotate-3 rounded-[2rem] border border-saffron/50"
            />
            <div data-portrait className="relative aspect-square overflow-hidden rounded-[2rem] bg-ink-3">
              <Image
                data-portrait-img
                src={aditya2}
                alt="Aditya Shankar smiling, seated on boulders beside a fast-flowing river"
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 36vw, 24rem"
                className="object-cover object-[50%_38%] will-change-transform"
              />
            </div>
            <p className="absolute -bottom-8 right-4 -rotate-3 font-script text-3xl text-saffron sm:text-4xl" aria-hidden>
              — Aditya
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 lg:pl-8">
          <Eyebrow index="01" label="About" />
          <SplitHeading
            text="I like software that is designed before it is typed — and data that explains itself."
            accent={["designed", "explains"]}
            className="mt-6 font-display text-[clamp(2.4rem,5.4vw,4.4rem)] leading-[0.98]"
          />

          <Reveal stagger={0.1} className="mt-10 max-w-2xl space-y-5 text-lg leading-relaxed text-mute">
            <p>
              I&apos;m <span className="text-bone">{site.name}</span>, a developer based in {site.location} working across
              the stack: React and Next.js in the browser, Node, Express and TypeScript on the server, MongoDB and MySQL
              underneath.
            </p>
            <p>
              Alongside the web work I do data analysis — cleaning datasets with Python and Pandas, querying them with SQL,
              and presenting what they say in Excel and Tableau dashboards.
            </p>
          </Reveal>

          <Reveal stagger={0.12} as="ol" className="mt-14 divide-y divide-line border-y border-line">
            {principles.map((p, i) => (
              <li key={p.title} className="grid gap-2 py-6 sm:grid-cols-[4rem_1fr] sm:gap-6">
                <span className="font-display text-3xl text-saffron">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-label text-xl tracking-wide text-bone">{p.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-mute">{p.body}</p>
                </div>
              </li>
            ))}
          </Reveal>

          <Reveal stagger={0.08} as="dl" className="mt-12 grid gap-6 sm:grid-cols-3">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="font-label text-xs uppercase tracking-[0.22em] text-faint">{f.label}</dt>
                <dd className="mt-2 text-bone">{f.value}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
