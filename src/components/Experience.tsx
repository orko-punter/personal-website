import { experience } from "@/data/experience";
import { palette } from "@/data/profile";
import { Reveal } from "@/components/Reveal";

export function Experience() {
  return (
    <section className="mx-auto max-w-5xl px-5 sm:px-6 pt-16 pb-24">
      <Reveal>
        <p className="eyebrow">Experience</p>
        <h1 className="display mt-4 text-[clamp(42px,6.4vw,84px)]">Where I&apos;ve <em>worked</em></h1>
        <p className="mt-5 max-w-[60ch] text-[17px] text-muted">Strategy, consulting, product and engineering: four places, one habit of turning messy problems into numbers people act on.</p>
      </Reveal>
      <div className="mt-12 grid gap-4">
        {experience.map((entry, i) => {
          const c = palette[i % palette.length];
          return (
            <Reveal key={`${entry.company}-${entry.role}`} delay={i * 0.05}>
              <article className="lift rounded-[26px] border border-border bg-surface p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="rounded-full px-3 py-1 text-[12.5px] font-semibold" style={{ background: c.tint, color: `color-mix(in srgb, ${c.ink} 55%, #111)` }}>
                    {entry.start} — {entry.end}
                  </span>
                </div>
                <h2 className="mt-4 font-display text-[clamp(24px,3vw,32px)] font-semibold leading-tight tracking-[-0.03em]">
                  {entry.role} <span className="font-serif italic font-normal text-accent">at</span>{" "}
                  {entry.companyUrl ? (
                    <a href={entry.companyUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-2 underline-offset-4 hover:text-accent" style={{ textDecorationColor: c.ink }}>
                      {entry.company}
                    </a>
                  ) : entry.company}
                </h2>
                <p className="mt-3 max-w-[70ch] text-[16px] leading-relaxed text-foreground/85">{entry.summary}</p>
                {entry.highlights && entry.highlights.length > 0 && (
                  <ul className="mt-5 grid gap-3">
                    {entry.highlights.map((point) => (
                      <li key={point} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                        <span aria-hidden className="mt-[9px] h-2 w-2 shrink-0 rounded-full" style={{ background: c.ink }} />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
