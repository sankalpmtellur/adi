"use client";

import { Check, Copy, Mail } from "lucide-react";
import { useRef, useState } from "react";
import { SocialIcon } from "@/components/ui/BrandIcon";
import { Eyebrow, Reveal, SplitHeading } from "@/components/ui/Reveal";
import { site, socials } from "@/content/site";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked (insecure origin, permissions); the mailto link still works.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 font-label text-sm tracking-wide text-mute transition-colors duration-300 hover:border-bone/40 hover:text-bone"
    >
      {copied ? <Check className="size-4 text-jade" aria-hidden /> : <Copy className="size-4" aria-hidden />}
      {copied ? "Copied" : "Copy address"}
      <span className="sr-only" aria-live="polite">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </button>
  );
}

export function Contact() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-drift]",
          { xPercent: 8 },
          {
            xPercent: -22,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="contact" className="relative isolate overflow-hidden border-t border-line pb-16 pt-28 sm:pt-36">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-24 -z-10 overflow-hidden">
        <p data-drift className="text-outline whitespace-nowrap font-display text-[clamp(8rem,26vw,24rem)] leading-none opacity-35">
          Aditya Shankar · Aditya Shankar
        </p>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 size-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(244_178_62/0.12),transparent)]"
      />

      <div className="container-page">
        <Eyebrow index="05" label="Contact" />
        <SplitHeading
          text="Have something worth building? Let's talk."
          accent={["building?"]}
          className="mt-6 max-w-5xl font-display text-[clamp(3rem,8.5vw,7.5rem)] leading-[0.9]"
        />

        <Reveal stagger={0.1} className="mt-14 flex flex-col gap-8">
          <p className="max-w-xl text-lg leading-relaxed text-mute">
            A project, a role or just a question about something on this page — email is the quickest way to reach me.
          </p>
          <div>
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex max-w-full items-center gap-4 rounded-full bg-saffron py-3 pl-3 pr-6 text-ink transition-colors duration-300 hover:bg-bone sm:gap-5 sm:pr-8"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-ink text-saffron transition-transform duration-500 ease-out-expo group-hover:-rotate-12 sm:size-14">
                <Mail className="size-5 sm:size-6" aria-hidden />
              </span>
              <span className="min-w-0 truncate font-label text-lg tracking-wide sm:text-2xl md:text-3xl">{site.email}</span>
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <CopyEmail />
            {socials.slice(0, 2).map((s) => (
              <a
                key={s.key}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 font-label text-sm tracking-wide text-mute transition-colors duration-300 hover:border-bone/40 hover:text-bone"
              >
                <SocialIcon name={s.key} className="size-4" />
                {s.label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
