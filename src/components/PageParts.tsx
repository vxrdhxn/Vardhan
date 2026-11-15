import type { ReactNode } from "react";
import { TransitionLink } from "@/components/PageTransition";

// Shared pieces for the inner pages: the big title and the link to the next page.

export function PageTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className="page-title">
      <span className="rise">
        <span>{children}</span>
      </span>
    </h1>
  );
}

export function NextPage({ href, label, name }: { href: string; label: string; name: string }) {
  return (
    <TransitionLink className="next-page" href={href} data-cursor="Go">
      <span className="next-page-label">{label}</span>
      <span className="next-page-name">{name}</span>
    </TransitionLink>
  );
}
