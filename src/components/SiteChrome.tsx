"use client";

import { usePathname } from "next/navigation";
import { TransitionLink } from "@/components/PageTransition";
import { person } from "@/data/projects";

// The monogram at the top of every page. It links back to Home.
export function Mark() {
  const pathname = usePathname();

  return (
    <TransitionLink
      href="/"
      // Home and Contact open on the dark wall of ribs, so the mark is white there.
      className={pathname === "/" || pathname === "/contact" ? "mark mark-on-hero" : "mark"}
      aria-label={`${person.name}, home`}
    >
      SV
    </TransitionLink>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <ul>
        {person.links.map((link) => (
          <li key={link.label}>
            <a href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
