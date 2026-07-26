import Link from "next/link";
import { writing } from "@/data/writing";
import { Reveal } from "@/components/Reveal";

export const metadata = {
  title: "Writing",
};

export default function BlogPage() {
  const sorted = [...writing].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <Reveal>
        <h1 className="text-2xl font-semibold text-foreground">Writing</h1>
        <p className="mt-2 text-muted">A repo of essays, stories, and letters.</p>
      </Reveal>

      <div className="mt-10 divide-y divide-border">
        {sorted.map((piece, i) => (
          <Reveal key={piece.slug} delay={i * 0.05}>
            <Link href={`/blog/${piece.slug}`} className="group block py-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h2 className="text-foreground group-hover:text-accent transition-colors">
                  {piece.title}
                </h2>
                <span className="text-xs font-mono text-muted whitespace-nowrap">
                  {piece.date} · {piece.readTime}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {piece.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-sm text-muted">{piece.excerpt}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
