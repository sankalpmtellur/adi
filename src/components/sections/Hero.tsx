"use client";

import Image from "next/image";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { useRef } from "react";
import aditya from "@/assets/aditya.jpg";
import { ButtonLink } from "@/components/ui/Button";
import { SocialIcon } from "@/components/ui/BrandIcon";
import { site, socials } from "@/content/site";
import { gsap, MOTION_OK, onIntroDone, useGSAP } from "@/lib/gsap";

const FLAG_COLORS = ["var(--color-sky)", "var(--color-bone)", "var(--color-ember)", "var(--color-jade)", "var(--color-saffron)"];

/** A string of prayer flags — the same ones fluttering in the hero photograph. */
function PrayerFlags() {
  const count = 11;
  const flags = Array.from({ length: count }, (_, i) => {
    const t = (i + 0.5) / count;
    // Point on the quadratic curve M0,8 Q210,58 420,8.
    const x = 420 * t;
    const y = (1 - t) ** 2 * 8 + 2 * (1 - t) * t * 58 + t ** 2 * 8;
    return { x, y, color: FLAG_COLORS[i % FLAG_COLORS.length] };
  });

  return (
    <svg viewBox="0 0 420 100" className="w-full overflow-visible" aria-hidden>
      <path d="M0 8 Q210 58 420 8" fill="none" stroke="var(--color-mute)" strokeWidth="1" opacity="0.6" />
      {flags.map((f, i) => (
        <g key={i} data-flag transform={`translate(${f.x - 12} ${f.y})`}>
          <path d="M0 0 H24 V30 L12 25 L0 30 Z" fill={f.color} opacity="0.88" />
        </g>
      ))}
    </svg>
  );
}

function RotatingBadge() {
  return (
    <a
      href="#work"
      aria-label="Scroll to selected work"
      className="group relative grid size-28 place-items-center rounded-full bg-ink/90 backdrop-blur sm:size-32"
    >
      <svg viewBox="0 0 120 120" className="absolute inset-0 animate-spin-slow motion-reduce:animate-none" aria-hidden>
        <defs>
          <path id="badge-circle" d="M60 60 m-46 0 a46 46 0 1 1 92 0 a46 46 0 1 1 -92 0" />
        </defs>
        <text className="fill-bone font-label text-[11.5px] uppercase tracking-[0.32em]">
          <textPath href="#badge-circle">Full-stack · Data · Design ·</textPath>
        </text>
      </svg>
      <span className="grid size-11 place-items-center rounded-full bg-saffron text-ink transition-transform duration-500 ease-out-expo group-hover:rotate-45">
        <ArrowDown className="size-5" aria-hidden />
      </span>
    </a>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
        tl.from("[data-char]", { yPercent: 118, duration: 1.3, stagger: 0.045 })
          .from("[data-hi]", { autoAlpha: 0, y: 16, rotate: -14, duration: 0.9 }, 0.35)
          .fromTo(
            "[data-frame]",
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut" },
            0,
          )
          .from("[data-photo]", { scale: 1.35, duration: 1.9, ease: "expo.out" }, 0.2)
          .from("[data-flag]", { scaleY: 0, autoAlpha: 0, transformOrigin: "50% 0%", duration: 0.7, stagger: 0.04 }, 0.7)
          .from("[data-fade]", { y: 28, autoAlpha: 0, duration: 1, stagger: 0.08 }, 0.55)
          .from("[data-badge]", { scale: 0, rotate: -90, duration: 1.1 }, 0.9);

        const stop = onIntroDone(() => tl.play());

        // Flags flutter gently and endlessly, each slightly out of phase.
        gsap.to("[data-flag] path", {
          rotation: () => gsap.utils.random(-9, 9),
          skewY: () => gsap.utils.random(-6, 6),
          transformOrigin: "50% 0%",
          duration: () => gsap.utils.random(1.4, 2.4),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          repeatRefresh: true,
        });

        // Parallax on the way out.
        const scrub = { trigger: ref.current, start: "top top", end: "bottom top", scrub: true };
        gsap.fromTo("[data-photo-wrap]", { yPercent: -8 }, { yPercent: 8, ease: "none", scrollTrigger: scrub });
        gsap.to("[data-name]", { yPercent: -18, ease: "none", scrollTrigger: scrub });

        return stop;
      });
    },
    { scope: ref },
  );

  const nameLines = [site.firstName, site.lastName];

  return (
    <section ref={ref} id="home" className="relative isolate overflow-hidden pb-16 pt-28 sm:pt-32 lg:min-h-[100svh] lg:pb-20">
      {/* Warm light behind the portrait and faint editorial column rules */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 -z-10 size-[42rem] rounded-full bg-[radial-gradient(closest-side,rgb(244_178_62/0.16),transparent)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 container-page">
        <div className="grid h-full grid-cols-4 border-x border-line/50 lg:grid-cols-12">
          {Array.from({ length: 3 }, (_, i) => (
            <span key={i} className="border-r border-line/40 last:border-r-0 lg:col-span-4" />
          ))}
        </div>
      </div>

      <div className="container-page grid items-end gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <p data-fade className="mb-6 flex items-center gap-3 font-label text-sm uppercase tracking-[0.25em] text-mute">
            <span className="size-1.5 rounded-full bg-jade" aria-hidden />
            {site.role} · {site.location}
          </p>

          <div data-name className="relative">
            <span
              data-hi
              className="absolute -top-3 left-1 -rotate-6 font-script text-2xl text-saffron sm:-top-5 sm:text-4xl"
              aria-hidden
            >
              hi, I&apos;m
            </span>
            <h1
              aria-label={site.name}
              className="pt-6 font-display text-[clamp(4.2rem,15vw,10.5rem)] font-semibold leading-[0.8] tracking-tight sm:pt-8"
            >
              {nameLines.map((line, li) => (
                <span key={line} aria-hidden className={`line-mask block whitespace-nowrap ${li === 1 ? "pl-[0.4em] text-saffron" : ""}`}>
                  {line.split("").map((ch, ci) => (
                    <span key={ci} data-char className="inline-block will-change-transform">
                      {ch}
                    </span>
                  ))}
                </span>
              ))}
            </h1>
          </div>

          <p data-fade className="mt-8 max-w-xl text-lg leading-relaxed text-mute sm:text-xl">
            I build full-stack web apps in <span className="text-bone">TypeScript, React, Next.js and Node</span> — typed
            Express APIs and MongoDB models underneath, considered interfaces on top. On the side, I turn raw datasets into
            dashboards with <span className="text-bone">Python, SQL and Tableau</span>.
          </p>

          <div data-fade className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href="#work" icon={<ArrowDown className="size-4" aria-hidden />}>
              View my work
            </ButtonLink>
            <ButtonLink href="#contact" variant="ghost" icon={<ArrowUpRight className="size-4" aria-hidden />}>
              Contact me
            </ButtonLink>
          </div>

          <ul data-fade className="mt-9 flex flex-wrap items-center gap-2" aria-label="Profiles">
            {socials.slice(0, 4).map((s) => (
              <li key={s.key}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-full border border-line px-3.5 py-2 text-sm text-mute transition-colors duration-300 hover:border-bone/40 hover:text-bone"
                >
                  <SocialIcon name={s.key} className="size-3.5 transition-colors group-hover:text-saffron" />
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[26rem] lg:col-span-5 lg:mr-0 lg:max-w-none">
          <div className="relative z-10 -mb-6 px-2">
            <PrayerFlags />
          </div>
          <div
            data-frame
            className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem] border border-line bg-ink-3"
          >
            {/* Oversized so the parallax drift never exposes an edge. */}
            <div data-photo-wrap className="absolute inset-x-0 -top-[10%] h-[120%] will-change-transform">
              <Image
                data-photo
                src={aditya}
                alt="Aditya Shankar on a suspension bridge strung with prayer flags, above a mountain river"
                fill
                preload
                placeholder="blur"
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 26rem, 90vw"
                className="object-cover object-[50%_42%] will-change-transform"
              />
            </div>
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <p
              data-fade
              className="absolute bottom-5 right-5 flex items-center gap-2 rounded-full bg-ink/70 px-3.5 py-1.5 font-label text-sm text-bone backdrop-blur"
            >
              <MapPin className="size-3.5 text-saffron" aria-hidden /> {site.location}
            </p>
          </div>
          <div data-badge className="absolute -bottom-10 -left-6 z-10 sm:-left-12">
            <RotatingBadge />
          </div>
        </div>
      </div>
    </section>
  );
}
