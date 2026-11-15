"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
} from "react";

// Page switching: a wall of ribs rises from the bottom to cover the screen,
// the route changes behind it, then the ribs keep travelling up and out.

const RIBS = 12;
const RIB_DELAY_MS = 35;
const RIB_DURATION_MS = 600;
const PHASE_MS = RIB_DURATION_MS + RIBS * RIB_DELAY_MS;

type Phase = "idle" | "cover" | "reveal";

const NavigateContext = createContext<(href: string) => void>(() => {});

export function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const phaseRef = useRef<Phase>("idle");

  const changePhase = (next: Phase) => {
    phaseRef.current = next;
    setPhase(next);
  };

  const navigate = useCallback(
    (href: string) => {
      if (href === pathname || phaseRef.current !== "idle") return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        router.push(href);
        return;
      }

      changePhase("cover");
      window.setTimeout(() => router.push(href), PHASE_MS);
    },
    [pathname, router],
  );

  // The new page has rendered behind the ribs: let them leave.
  useEffect(() => {
    if (phaseRef.current !== "cover") return;
    changePhase("reveal");
    const timer = window.setTimeout(() => changePhase("idle"), PHASE_MS);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return (
    <NavigateContext.Provider value={navigate}>
      {children}
      <div className={`transition transition-${phase}`} aria-hidden="true">
        {Array.from({ length: RIBS }, (_, index) => (
          <span key={index} style={{ transitionDelay: `${index * RIB_DELAY_MS}ms` }} />
        ))}
      </div>
    </NavigateContext.Provider>
  );
}

// Use this instead of next/link for any link between pages of the site.
export function TransitionLink({ href, onClick, ...rest }: ComponentProps<typeof Link> & { href: string }) {
  const navigate = useContext(NavigateContext);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    const opensElsewhere = event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0;
    if (event.defaultPrevented || opensElsewhere) return;
    event.preventDefault();
    navigate(href);
  };

  return <Link href={href} onClick={handleClick} {...rest} />;
}
