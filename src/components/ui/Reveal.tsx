"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Animate each direct child in turn instead of the wrapper as one block. */
  stagger?: number;
  y?: number;
  delay?: number;
  id?: string;
}

/** Fades content up as it scrolls into view. Content is fully visible without JS or with reduced motion. */
export function Reveal({ children, as: Tag = "div", className, stagger, y = 36, delay = 0, id }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const targets = stagger ? Array.from(el.children) : el;
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.from(targets, {
          y,
          autoAlpha: 0,
          duration: 1.05,
          delay,
          ease: "expo.out",
          stagger: stagger ?? 0,
          scrollTrigger: { trigger: el, start: "top 86%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className} id={id}>
      {children}
    </Tag>
  );
}

interface SplitHeadingProps {
  text: string;
  as?: ElementType;
  className?: string;
  /** Words to tint with the accent colour. */
  accent?: string[];
}

/** Headline whose words rise out of clipping masks when scrolled into view. */
export function SplitHeading({ text, as: Tag = "h2", className, accent = [] }: SplitHeadingProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.from("[data-word]", {
          yPercent: 110,
          rotate: 4,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.06,
          scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
        });
      });
    },
    { scope: ref },
  );

  const words = text.split(" ");
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="line-mask" aria-hidden>
          <span
            data-word
            className={`inline-block will-change-transform ${accent.includes(word) ? "text-saffron" : ""}`}
          >
            {word}
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}

export function Eyebrow({ index, label }: { index: string; label: string }) {
  return (
    <p className="flex items-center gap-3 font-label text-sm uppercase tracking-[0.22em] text-mute">
      <span className="text-saffron">{index}</span>
      <span className="h-px w-10 bg-line" aria-hidden />
      {label}
    </p>
  );
}
