// The scripts block from the project's package.json, rendered as a terminal session.
const lines = [
  { cmd: "npm start", out: "react-scripts start" },
  { cmd: "npm run build", out: "react-scripts build" },
  { cmd: "npm test", out: "react-scripts test" },
];

export function MarathonVisual() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-line bg-ink font-mono text-[0.8rem] shadow-2xl shadow-black/40">
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-3" aria-hidden>
        <span className="size-2.5 rounded-full bg-ember/80" />
        <span className="size-2.5 rounded-full bg-saffron/80" />
        <span className="size-2.5 rounded-full bg-jade/80" />
        <span className="ml-3 font-label text-xs tracking-wide text-faint">aditya_shankar_project</span>
      </div>
      <ol className="flex-1 space-y-3 p-5" aria-label="Available npm scripts">
        {lines.map((l) => (
          <li key={l.cmd}>
            <p className="text-bone">
              <span className="text-jade">$</span> {l.cmd}
            </p>
            <p className="text-faint">&gt; {l.out}</p>
          </li>
        ))}
        <li aria-hidden className="text-bone">
          <span className="text-jade">$</span>{" "}
          <span className="inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-saffron motion-reduce:animate-none" />
        </li>
      </ol>
    </div>
  );
}
