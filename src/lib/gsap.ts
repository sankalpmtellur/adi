"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/** Animations only run inside this media query; reduced-motion users get the static layout. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

const INTRO_DONE = "portfolio:intro-done";
let introDone = false;

/** Called by the preloader as its curtain lifts. */
export function markIntroDone() {
  if (introDone) return;
  introDone = true;
  window.dispatchEvent(new Event(INTRO_DONE));
}

/** Runs `cb` once the intro has finished — immediately if it already has. Returns a cleanup. */
export function onIntroDone(cb: () => void): () => void {
  if (introDone) {
    cb();
    return () => {};
  }
  window.addEventListener(INTRO_DONE, cb, { once: true });
  return () => window.removeEventListener(INTRO_DONE, cb);
}

export { gsap, ScrollTrigger, useGSAP };
