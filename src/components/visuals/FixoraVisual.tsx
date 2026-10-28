"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

type State = "pending" | "accepted" | "rejected" | "in_progress" | "completed" | "cancelled";

const W = 150;
const H = 40;

// Layout of the booking state machine as implemented in Fixora's booking service.
const nodes: Record<State, { x: number; y: number; label: string }> = {
  pending: { x: 165, y: 16, label: "pending" },
  accepted: { x: 60, y: 112, label: "accepted" },
  rejected: { x: 280, y: 112, label: "rejected" },
  in_progress: { x: 60, y: 208, label: "in_progress" },
  completed: { x: 0, y: 304, label: "completed" },
  cancelled: { x: 190, y: 304, label: "cancelled" },
};

const edges: [State, State][] = [
  ["pending", "accepted"],
  ["pending", "rejected"],
  ["accepted", "in_progress"],
  ["in_progress", "completed"],
  ["in_progress", "cancelled"],
];

/** The happy path the animation walks, with the event each step emits on the booking bus. */
const happyPath: { state: State; event: string }[] = [
  { state: "pending", event: "booking:created" },
  { state: "accepted", event: "booking:accepted" },
  { state: "in_progress", event: "PATCH /bookings/:id/status" },
  { state: "completed", event: "booking:completed" },
];

function edgePath(from: State, to: State) {
  const a = nodes[from];
  const b = nodes[to];
  const x1 = a.x + W / 2;
  const y1 = a.y + H;
  const x2 = b.x + W / 2;
  const y2 = b.y;
  const my = (y1 + y2) / 2;
  return `M${x1} ${y1} C${x1} ${my} ${x2} ${my} ${x2} ${y2 - 6}`;
}

export function FixoraVisual() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2, paused: true });
        tl.set("[data-node] rect", { fill: "var(--color-ink-3)", stroke: "var(--color-line)" })
          .set("[data-node] text", { fill: "var(--color-mute)" })
          .set("[data-edge-flow]", { strokeDashoffset: 1, autoAlpha: 0 })
          .set("[data-log]", { autoAlpha: 0.25, x: 0 })
          .set("[data-rating]", { autoAlpha: 0, y: 8 });

        happyPath.forEach(({ state }, i) => {
          const prev = happyPath[i - 1]?.state;
          if (prev) {
            tl.to(`[data-edge-flow="${prev}-${state}"]`, { autoAlpha: 1, strokeDashoffset: 0, duration: 0.6, ease: "power2.inOut" });
            tl.to(`[data-node="${prev}"] rect`, { fill: "var(--color-ink-3)", duration: 0.3 }, "<");
          }
          tl.to(`[data-node="${state}"] rect`, { fill: "rgb(244 178 62 / 0.16)", stroke: "var(--color-saffron)", duration: 0.35 })
            .to(`[data-node="${state}"] text`, { fill: "var(--color-saffron)", duration: 0.35 }, "<")
            .to(`[data-log="${i}"]`, { autoAlpha: 1, x: 4, duration: 0.35 }, "<")
            .to({}, { duration: 0.55 });
        });
        tl.to("[data-rating]", { autoAlpha: 1, y: 0, duration: 0.5 }).to({}, { duration: 1.4 });

        gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            end: "bottom 10%",
            onToggle: (self) => (self.isActive ? tl.play() : tl.pause()),
          },
        });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="relative flex h-full flex-col justify-center gap-6 p-6 sm:p-8">
      <figure className="mx-auto w-full max-w-[34rem]">
        <svg
          viewBox="-4 0 442 352"
          className="w-full"
          role="img"
          aria-label="Fixora booking lifecycle: pending moves to accepted or rejected; accepted moves to in progress; in progress ends as completed or cancelled."
        >
          <defs>
            <marker id="fx-arrow" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0 0 L8 4 L0 8 Z" fill="var(--color-faint)" />
            </marker>
          </defs>
          {edges.map(([from, to]) => (
            <g key={`${from}-${to}`}>
              <path d={edgePath(from, to)} fill="none" stroke="var(--color-faint)" strokeWidth="1.2" markerEnd="url(#fx-arrow)" />
              <path
                data-edge-flow={`${from}-${to}`}
                d={edgePath(from, to)}
                fill="none"
                stroke="var(--color-saffron)"
                strokeWidth="2"
                pathLength={1}
                strokeDasharray="1"
                strokeDashoffset="1"
                opacity="0"
              />
            </g>
          ))}
          {(Object.keys(nodes) as State[]).map((key) => {
            const n = nodes[key];
            const terminal = key === "rejected" || key === "cancelled";
            return (
              <g key={key} data-node={key}>
                <rect
                  x={n.x}
                  y={n.y}
                  width={W}
                  height={H}
                  rx={H / 2}
                  fill="var(--color-ink-3)"
                  stroke="var(--color-line)"
                  strokeDasharray={terminal ? "4 4" : undefined}
                />
                <text
                  x={n.x + W / 2}
                  y={n.y + H / 2 + 5}
                  textAnchor="middle"
                  fill="var(--color-mute)"
                  className="font-label text-[15px] tracking-wide"
                >
                  {n.label}
                </text>
              </g>
            );
          })}
        </svg>
      </figure>

      <div className="rounded-2xl border border-line bg-ink/70 p-5 font-mono text-[0.8rem] leading-relaxed">
        <p className="mb-3 flex items-center gap-2 font-label text-xs uppercase tracking-[0.2em] text-faint">
          <span className="size-1.5 rounded-full bg-jade" aria-hidden /> bookingEvents
        </p>
        <ol className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
          {happyPath.map(({ event }, i) => (
            <li key={event} data-log={i} className="text-bone/90">
              <span className="text-faint">{String(i + 1).padStart(2, "0")} </span>
              {event}
            </li>
          ))}
        </ol>
        <p data-rating className="mt-4 border-t border-line pt-3 text-jade">
          review added → provider rating recalculated
        </p>
      </div>
    </div>
  );
}
