import { ArrowUpRight } from "lucide-react";
import { SocialIcon } from "@/components/ui/BrandIcon";
import { Eyebrow, Reveal, SplitHeading } from "@/components/ui/Reveal";
import { socials } from "@/content/site";

export function Profiles() {
  return (
    <section id="profiles" className="relative border-t border-line bg-ink-2/60 py-28 sm:py-36">
      <div className="container-page grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Eyebrow index="04" label="Profiles" />
            <SplitHeading
              text="Find me where the code lives."
              accent={["code"]}
              className="mt-6 font-display text-[clamp(2.4rem,5vw,4rem)] leading-[0.98]"
            />
            <Reveal>
              <p className="mt-6 leading-relaxed text-mute">
                Projects on GitHub, algorithm practice on LeetCode and contests on Codeforces — all under the handle{" "}
                <span className="font-label tracking-wide text-bone">Racer_95</span>.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal stagger={0.08} as="ul" className="border-t border-line lg:col-span-8">
          {socials.map((s, i) => (
            <li key={s.key} className="border-b border-line">
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-5 overflow-hidden px-2 py-7 sm:gap-8 sm:px-4 sm:py-9"
              >
                {/* Fill sweeps in from the left on hover. */}
                <span
                  aria-hidden
                  className="absolute inset-0 origin-left scale-x-0 bg-bone/[0.04] transition-transform duration-700 ease-out-expo group-hover:scale-x-100"
                />
                <span className="relative font-label text-sm text-faint">{String(i + 1).padStart(2, "0")}</span>
                <span className="relative flex min-w-0 flex-wrap items-baseline gap-x-5 gap-y-1">
                  <span className="flex items-center gap-3 font-display text-4xl text-bone transition-colors duration-300 group-hover:text-saffron sm:text-5xl">
                    <SocialIcon name={s.key} className="size-6 shrink-0 sm:size-7" />
                    {s.label}
                  </span>
                  <span className="text-sm text-mute">
                    @{s.handle} <span className="hidden text-faint sm:inline">— {s.blurb}</span>
                  </span>
                </span>
                <span className="relative grid size-11 place-items-center rounded-full border border-line text-mute transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:border-saffron group-hover:bg-saffron group-hover:text-ink">
                  <ArrowUpRight className="size-5" aria-hidden />
                </span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
