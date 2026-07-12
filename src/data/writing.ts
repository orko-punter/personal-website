// TODO: Replace with your real creative writing pieces.
// `content` supports plain paragraphs separated by blank lines.
export type WritingPiece = {
  slug: string;
  title: string;
  date: string; // e.g. "2026-03-01"
  excerpt: string;
  readTime: string; // e.g. "4 min read"
  content: string;
};

export const writing: WritingPiece[] = [
  {
    slug: "first-piece",
    title: "Your First Piece",
    date: "2026-01-15",
    excerpt: "A one-line teaser that pulls the reader in.",
    readTime: "3 min read",
    content: `This is placeholder content for your first piece of creative writing.

Replace this with your actual essay, story, or letter. Paragraphs separated by a blank line will render as separate paragraphs on the post page.`,
  },
];
