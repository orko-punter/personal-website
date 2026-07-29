"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/data/nav";

export function Nav() {
  const pathname = usePathname();

  // The homepage has its own radial nav built into Hero.tsx instead of this
  // sticky bar — see CLAUDE.md.
  if (pathname === "/") return null;

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-border">
      <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-mono text-sm text-foreground hover:text-accent transition-colors">
          ~/home
        </Link>
        <ul className="flex items-center gap-5 text-sm">
          {navLinks.map((link) => {
            const isActive = !link.href.startsWith("/#") && pathname?.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`transition-colors hover:text-accent ${
                    isActive ? "text-accent" : "text-muted"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
