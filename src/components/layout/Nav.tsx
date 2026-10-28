"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navLinks, site, socials, type SectionId } from "@/content/site";
import { SocialIcon } from "@/components/ui/BrandIcon";
import { useLenis } from "./SmoothScroll";

function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>("home");

  useEffect(() => {
    const sections = navLinks
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    // A thin band across the middle of the viewport: whichever section crosses it is current.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}

export function Nav() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 480 && y > prev && !open);
  });

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const toggle = toggleRef.current;
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open, lenis]);

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden ? -110 : 0 }}
        transition={{ duration: reduce ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <nav
          aria-label="Primary"
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border px-3 py-2 transition-[background-color,border-color,backdrop-filter] duration-500 sm:px-4 ${
            scrolled || open ? "border-line bg-ink/80 backdrop-blur-xl" : "border-transparent bg-transparent"
          }`}
        >
          <a
            href="#home"
            className="flex items-center gap-2 rounded-full px-2 py-1 font-display text-2xl leading-none text-bone"
            aria-label={`${site.name} — back to top`}
          >
            <span className="text-saffron">A</span>
            <span className="-ml-1.5">S</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.slice(1, -1).map(({ id, label }) => (
              <li key={id} className="relative">
                {active === id ? (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-bone/[0.07]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "true" : undefined}
                  className={`relative block rounded-full px-4 py-2 font-label text-[0.95rem] tracking-wide transition-colors duration-300 ${
                    active === id ? "text-saffron" : "text-mute hover:text-bone"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden items-center gap-1.5 rounded-full bg-saffron px-5 py-2.5 font-label text-[0.95rem] tracking-wide text-ink transition-colors duration-300 hover:bg-bone sm:inline-flex"
            >
              Let&apos;s talk <ArrowUpRight className="size-4" aria-hidden />
            </a>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-11 place-items-center rounded-full border border-line text-bone md:hidden"
            >
              {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduce ? 0 : 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-ink-2 px-6 pb-10 pt-28 md:hidden"
          >
            <ul className="space-y-1">
              {navLinks.map(({ id, label }, i) => (
                <motion.li
                  key={id}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: reduce ? 0 : 0.18 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={`#${id}`}
                    onClick={(e) => {
                      // Lenis is paused while the menu is open, so scroll explicitly after resuming it.
                      e.preventDefault();
                      lenis?.start();
                      document.body.style.overflow = "";
                      setOpen(false);
                      if (lenis) lenis.scrollTo(`#${id}`, { offset: -80 });
                      else document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
                    }}
                    className={`flex items-baseline gap-4 py-1 font-display text-5xl ${
                      active === id ? "text-saffron" : "text-bone"
                    }`}
                  >
                    <span className="font-label text-sm text-faint">0{i + 1}</span>
                    {label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="space-y-5">
              <a href={`mailto:${site.email}`} className="block font-label text-lg text-mute">
                {site.email}
              </a>
              <ul className="flex gap-3">
                {socials.map((s) => (
                  <li key={s.key}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="grid size-11 place-items-center rounded-full border border-line text-mute"
                    >
                      <SocialIcon name={s.key} className="size-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
