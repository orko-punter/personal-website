"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/data/nav";

// One pill nav for every page. On the home page it sits on the black hero, so it goes solid black.
export function Nav() {
  const pathname = usePathname();
  const onDark = pathname === "/";

  return (
    <header
      className={`sticky top-0 z-50 ${
        onDark ? "bg-[#0b0b0a] text-[#f6f5f1]" : "bg-background/85 text-foreground backdrop-blur-md border-b border-border"
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 px-5 sm:px-6 py-2 sm:py-0 sm:h-16">
        <Link href="/" className="py-2 sm:py-0 font-display text-[21px] font-semibold tracking-[-0.04em] inline-flex items-baseline shrink-0">
          Anish<span className="ml-[3px] inline-block h-[7px] w-[7px] rounded-full bg-[#d4400f]" aria-hidden />
        </Link>
        <ul className="order-last flex w-full items-center justify-between gap-1 -mx-2 sm:order-none sm:ml-auto sm:w-auto sm:justify-end sm:mx-0 sm:-mr-2">
          {navLinks.map((link) => {
            const isActive = !link.href.startsWith("/#") && pathname?.startsWith(link.href);
            return (
              <li key={link.href} className={link.label === "About" ? "hidden sm:block" : undefined}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`block whitespace-nowrap rounded-full px-2 min-[380px]:px-3 sm:px-3.5 py-2.5 font-display text-[13.5px] min-[380px]:text-[14.5px] font-medium transition-colors ${
                    isActive
                      ? onDark ? "bg-[#f6f5f1] text-[#0b0b0a]" : "bg-foreground text-background"
                      : "opacity-70 hover:opacity-100 hover:bg-current/10"
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
