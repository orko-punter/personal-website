import { experience } from "@/data/experience";
import { Reveal } from "@/components/Reveal";

export function Experience() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <Reveal>
        <h2 className="text-sm font-mono text-accent mb-10">Experience</h2>
      </Reveal>
      <div className="space-y-12 border-l border-border pl-6">
        {experience.map((entry, i) => (
          <Reveal key={`${entry.company}-${entry.role}`} delay={i * 0.05} className="group relative">
            <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent transition-all duration-300 group-hover:scale-150 group-hover:shadow-[0_0_10px_var(--accent)]" />
            <div className="-mx-3 rounded-lg px-3 py-2 transition-colors duration-300 group-hover:bg-surface">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h3 className="text-foreground font-medium">
                  {entry.role} ·{" "}
                  {entry.companyUrl ? (
                    <a
                      href={entry.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      {entry.company}
                    </a>
                  ) : (
                    <span className="text-accent">{entry.company}</span>
                  )}
                </h3>
                <span className="text-xs font-mono text-muted whitespace-nowrap">
                  {entry.start} — {entry.end}
                </span>
              </div>
              <p className="mt-2 text-sm text-foreground/80 leading-relaxed">{entry.summary}</p>
              {entry.highlights && entry.highlights.length > 0 && (
                <ul className="mt-3 space-y-1.5">
                  {entry.highlights.map((point) => (
                    <li key={point} className="text-sm text-muted flex gap-2">
                      <span className="text-accent">–</span>
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
