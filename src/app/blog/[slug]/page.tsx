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
        className="pill min-h-10 px-4 text-[14px]"
      >
        <ArrowLeft size={14} />
        All writing
      </Link>

      <h1 className="display mt-8 text-[clamp(38px,5.6vw,64px)]">{piece.title}</h1>
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13.5px] text-muted">
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
        className="post-content mt-10 text-[17.5px] leading-[1.7] text-foreground/90"
        dangerouslySetInnerHTML={{ __html: piece.contentHtml }}
      />
    </article>
  );
}
