import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { writing } from "@/data/writing";
import { ReadingProgress } from "@/components/ReadingProgress";

export function generateStaticParams() {
  return writing.map((piece) => ({ slug: piece.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const piece = writing.find((p) => p.slug === slug);
  return { title: piece?.title ?? "Writing" };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const piece = writing.find((p) => p.slug === slug);

  if (!piece) notFound();

  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <ReadingProgress />
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors"
      >
        <ArrowLeft size={14} />
        All writing
      </Link>

      <h1 className="mt-6 text-3xl font-semibold text-foreground">{piece.title}</h1>
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-muted">
        <span>
          {piece.date} · {piece.readTime}
        </span>
        {piece.mediumUrl && (
          <a
            href={piece.mediumUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-accent hover:underline"
          >
            Read on Medium
            <ArrowUpRight size={12} />
          </a>
        )}
      </div>

      <div
        className="post-content mt-8 leading-relaxed text-foreground/90"
        dangerouslySetInnerHTML={{ __html: piece.contentHtml }}
      />
    </article>
  );
}
