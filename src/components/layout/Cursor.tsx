"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** A soft ring that trails the pointer and swells over links. Desktop, full-motion only. */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)", () => {
      const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });
      let shown = false;

      const move = (e: PointerEvent) => {
        if (!shown) {
          gsap.set(el, { x: e.clientX, y: e.clientY });
          gsap.to(el, { autoAlpha: 1, duration: 0.3 });
          shown = true;
        }
        xTo(e.clientX);
        yTo(e.clientY);
        const interactive = (e.target as Element | null)?.closest("a, button, [data-cursor]");
        gsap.to(el, { scale: interactive ? 2.4 : 1, duration: 0.35, ease: "power3.out", overwrite: "auto" });
      };
      const hide = () => {
        gsap.to(el, { autoAlpha: 0, duration: 0.3 });
        shown = false;
      };

      window.addEventListener("pointermove", move, { passive: true });
      document.documentElement.addEventListener("pointerleave", hide);
      return () => {
        window.removeEventListener("pointermove", move);
        document.documentElement.removeEventListener("pointerleave", hide);
      };
    });
  });

  return (
    <div
      ref={ref}
      aria-hidden
      className="cursor-dot pointer-events-none fixed left-0 top-0 z-[70] -ml-2.5 -mt-2.5 size-5 rounded-full border border-saffron/80 opacity-0 mix-blend-difference"
    />
  );
}
