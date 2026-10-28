import { ArrowUp } from "lucide-react";
import { SocialIcon } from "@/components/ui/BrandIcon";
import { navLinks, site, socials } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink-2">
      <div className="container-page grid gap-10 py-14 md:grid-cols-12 md:items-end">
        <div className="md:col-span-5">
          <p className="font-display text-5xl leading-none text-bone">
            Aditya <span className="text-saffron">Shankar</span>
          </p>
          <p className="mt-3 text-sm text-mute">
            {site.role} · {site.location}
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-4">
          <ul className="grid grid-cols-3 gap-x-4 gap-y-2 font-label text-sm tracking-wide">
            {navLinks.map(({ id, label }) => (
              <li key={id}>
                <a href={`#${id}`} className="text-mute transition-colors hover:text-saffron">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex flex-wrap gap-2 md:col-span-3 md:justify-end" aria-label="Social profiles">
          {socials.map((s) => (
            <li key={s.key}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${s.label} (opens in a new tab)`}
                className="grid size-10 place-items-center rounded-full border border-line text-mute transition-colors duration-300 hover:border-saffron hover:text-saffron"
              >
                <SocialIcon name={s.key} className="size-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="container-page flex flex-wrap items-center justify-between gap-4 border-t border-line py-6 text-sm text-faint">
        <p>
          © {site.year} {site.name}. Built with Next.js, Tailwind CSS and GSAP.
        </p>
        <a href="#home" className="inline-flex items-center gap-2 font-label tracking-wide text-mute hover:text-saffron">
          Back to top <ArrowUp className="size-4" aria-hidden />
        </a>
      </div>
    </footer>
  );
}
