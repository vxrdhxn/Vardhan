"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { TransitionLink } from "@/components/PageTransition";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Skills", href: "/skills" },
  { label: "About", href: "/about" },
];

export default function Nav() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isCompact, setIsCompact] = useState(true);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // The bar is open and spread out only at the very top of Home, where the
  // hero leaves room for it. Scroll down, or go to any other page, and it
  // pulls in to a compact pill.
  useEffect(() => {
    const update = () => setIsCompact(pathname !== "/" || window.scrollY > 60);

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [pathname]);

  const nextTheme = theme === "dark" ? "light" : "dark";

  // "/work/openpm" still counts as being inside Work.
  const isCurrent = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <nav className={isCompact ? "nav is-compact" : "nav"} aria-label="Main">
      <button
        type="button"
        className="nav-theme"
        onClick={() => setTheme(nextTheme)}
        aria-label={`Switch to ${nextTheme} theme`}
      >
        <span className={`theme-dot theme-dot-${theme}`} aria-hidden="true" />
      </button>
      {LINKS.map((link) => (
        <TransitionLink
          key={link.href}
          href={link.href}
          className={isCurrent(link.href) ? "is-current" : undefined}
          aria-current={isCurrent(link.href) ? "page" : undefined}
        >
          {link.label}
        </TransitionLink>
      ))}
      <TransitionLink className="nav-talk" href="/contact">
        Contact
      </TransitionLink>
    </nav>
  );
}
