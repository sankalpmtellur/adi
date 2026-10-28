"use client";

import { Moon, Sun } from "lucide-react";
import { THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

function applyTheme(next: Theme) {
  const root = document.documentElement;
  root.classList.add("theme-transition");
  root.setAttribute("data-theme", next);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    // Storage can be unavailable (private mode); the theme still applies for this visit.
  }
  window.setTimeout(() => root.classList.remove("theme-transition"), 500);
}

/** Icons swap through CSS (the `light:` variant), so server and client markup always match. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const toggle = () => {
    const current = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
    applyTheme(current === "light" ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      title="Toggle theme"
      className={`group grid size-11 place-items-center rounded-full border border-line text-bone transition-colors duration-300 hover:border-saffron hover:text-saffron ${className}`}
    >
      <Sun className="size-[1.1rem] transition-transform duration-500 ease-out-expo group-hover:rotate-45 light:hidden" aria-hidden />
      <Moon className="hidden size-[1.1rem] transition-transform duration-500 ease-out-expo group-hover:-rotate-12 light:block" aria-hidden />
    </button>
  );
}
