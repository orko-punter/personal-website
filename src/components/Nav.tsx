"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/#projects" },
  { label: "Writing", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

const sectionIds = ["about", "projects", "contact"];

export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (!isHome) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHome]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-border">
      <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-mono text-sm text-foreground hover:text-accent transition-colors">
          ~/home
        </Link>
        <ul className="flex items-center gap-5 text-sm">
          {links.map((link) => {
            const sectionId = link.href.startsWith("/#") ? link.href.slice(2) : null;
            const isActive =
              (sectionId && isHome && activeSection === sectionId) ||
              (!sectionId && link.href !== "/" && pathname?.startsWith(link.href));
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
