import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { writing } from "@/data/writing";

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

  const paragraphs = piece.content.split("\n\n").filter(Boolean);

  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors"
      >
        <ArrowLeft size={14} />
        All writing
      </Link>

      <h1 className="mt-6 text-3xl font-semibold text-foreground">{piece.title}</h1>
      <p className="mt-2 text-xs font-mono text-muted">
        {piece.date} · {piece.readTime}
      </p>

      <div className="mt-8 space-y-4 leading-relaxed text-foreground/90">
        {paragraphs.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
