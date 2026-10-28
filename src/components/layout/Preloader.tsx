"use client";

import { useRef, useState } from "react";
import { gsap, markIntroDone, useGSAP } from "@/lib/gsap";
import { site } from "@/content/site";

/** Brief curtain that writes the name, then lifts to reveal the hero. */
export function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useGSAP(
    () => {
      const finish = () => {
        markIntroDone();
        setGone(true);
      };

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        finish();
        return;
      }

      const tl = gsap.timeline({ onComplete: finish });
      tl.from("[data-letter]", { yPercent: 120, duration: 0.8, ease: "expo.out", stagger: 0.045 })
        .from("[data-rule]", { scaleX: 0, duration: 0.7, ease: "expo.inOut" }, "<0.15")
        .to("[data-letter]", { yPercent: -120, duration: 0.55, ease: "expo.in", stagger: 0.025 }, "+=0.25")
        .to(ref.current, { yPercent: -100, duration: 0.85, ease: "expo.inOut" }, "-=0.2")
        // Hero listens for this; fire it while the curtain is still lifting so the two overlap.
        .call(markIntroDone, [], "-=0.55");
    },
    { scope: ref },
  );

  if (gone) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="preloader fixed inset-0 z-[80] flex flex-col items-center justify-center gap-5 bg-ink-2"
    >
      <p className="flex overflow-hidden font-display text-6xl text-bone sm:text-8xl">
        {site.firstName.split("").map((ch, i) => (
          <span key={i} data-letter className="inline-block">
            {ch}
          </span>
        ))}
      </p>
      <span data-rule className="h-px w-40 origin-left bg-saffron" />
    </div>
  );
}
