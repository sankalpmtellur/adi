"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

interface ProjectImageProps {
  src: StaticImageData;
  alt: string;
  sizes: string;
  className?: string;
  imgClassName?: string;
}

/** Image that wipes open as it enters and drifts slightly while scrolling past. */
export function ProjectImage({ src, alt, sizes, className = "", imgClassName = "" }: ProjectImageProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.fromTo(
          ref.current,
          { clipPath: "inset(12% 8% 12% 8%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.4,
            ease: "expo.out",
            scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
          },
        );
        gsap.fromTo(
          "img",
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={`relative overflow-hidden bg-ink-3 ${className}`}>
      <div className="absolute -inset-y-[7%] inset-x-0">
        <Image
          src={src}
          alt={alt}
          fill
          placeholder="blur"
          sizes={sizes}
          className={`object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04] ${imgClassName}`}
        />
      </div>
    </div>
  );
}
