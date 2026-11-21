import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { writing } from "@/data/writing";
import { Reveal } from "@/components/Reveal";
import { palette } from "@/data/profile";

export const metadata = {
  title: "Writing",
};

export default function BlogPage() {
  const sorted = [...writing].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <section className="mx-auto max-w-5xl px-5 sm:px-6 pt-16 pb-24">
      <Reveal>
        <p className="eyebrow">Writing</p>
        <h1 className="display mt-4 text-[clamp(42px,6.4vw,84px)]">Essays, stories &amp; <em>letters</em></h1>
        <p className="mt-5 max-w-[60ch] text-[17px] text-muted">{sorted.length} pieces on travel, identity, work and food, newest first.</p>
      </Reveal>

      <div className="mt-12 grid gap-3">
        {sorted.map((piece, i) => {
          const c = palette[i % palette.length];
          return (
            <Reveal key={piece.slug} delay={Math.min(i, 6) * 0.04}>
              <Link
                href={`/blog/${piece.slug}`}
                className="lift group block rounded-[22px] border border-border bg-surface px-5 py-5 sm:px-7 sm:py-6"
              >
                <div className="flex flex-wrap items-center gap-2">
                  {piece.tags.slice(0, 2).map((tag, k) => (
                    <span
                      key={tag}
                      className="rounded-full px-2.5 py-1 text-[12px] font-semibold"
                      style={k === 0 ? { background: c.tint, color: `color-mix(in srgb, ${c.ink} 55%, #111)` } : { background: "#efede7", color: "#4a4944" }}
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="ml-auto text-[13px] text-muted whitespace-nowrap">
                    {new Date(piece.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })} · {piece.readTime}
                  </span>
                </div>
                <h2 className="mt-3 flex items-center gap-2 font-display text-[clamp(21px,2.4vw,26px)] font-semibold leading-tight tracking-[-0.03em]">
                  {piece.title}
                  <ArrowUpRight size={18} className="shrink-0 opacity-40 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                </h2>
                <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-muted">{piece.excerpt}</p>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
