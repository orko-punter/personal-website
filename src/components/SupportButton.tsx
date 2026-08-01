import { Coffee } from "lucide-react";

export function SupportButton({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 rounded-full border border-accent px-5 py-2.5 text-sm font-medium text-accent transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:bg-accent hover:text-white"
    >
      <Coffee className="h-4 w-4" />
      {label}
    </a>
  );
}
