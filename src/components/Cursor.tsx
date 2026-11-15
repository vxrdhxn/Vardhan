"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// The animated part of the cursor.
//
// Normally the pointer is a native ring cursor (see "The pointer itself" in
// globals.css), so it is always exactly where the mouse is. This component
// adds a green disc that reacts to what is underneath:
//   - over a link or button it swells into a soft halo behind the ring
//   - over anything with a data-cursor attribute the ring disappears and the
//     disc takes over as the cursor, showing that attribute as a label,
//     for example data-cursor="Open"
// Mouse and trackpad only.

// How closely the disc follows: 1 = stuck to the pointer, lower = more glide.
const GLIDE_AS_HALO = 0.2; // decorative, so it can drift
const GLIDE_AS_CURSOR = 0.6; // it is the cursor now, so it stays tight

export default function Cursor() {
  const followerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const follower = followerRef.current;
    const label = labelRef.current;
    if (!follower || !label) return;

    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!hasFinePointer || reduceMotion) return;

    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let frame = 0;
    let hasPosition = false;
    let state = "";
    let glideAmount = GLIDE_AS_HALO;

    // Tells the stylesheet the disc is running, so it is safe to hide the
    // native cursor over labelled elements.
    document.documentElement.classList.add("has-cursor-follow");

    // Glide toward the pointer, and stop the loop once we have arrived.
    const glide = () => {
      x += (targetX - x) * glideAmount;
      y += (targetY - y) * glideAmount;
      follower.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      const hasArrived = Math.abs(targetX - x) < 0.1 && Math.abs(targetY - y) < 0.1;
      frame = hasArrived ? 0 : requestAnimationFrame(glide);
    };

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;

      // First movement: start on the pointer instead of flying in from 0,0.
      if (!hasPosition) {
        hasPosition = true;
        x = targetX;
        y = targetY;
      }
      if (!frame) frame = requestAnimationFrame(glide);

      const element = event.target instanceof Element ? event.target : null;
      const labelled = element?.closest("[data-cursor]");
      const clickable = element?.closest("a, button");
      const nextState = labelled ? `label:${labelled.getAttribute("data-cursor")}` : clickable ? "halo" : "";

      // Only touch the DOM when what is under the pointer changes.
      if (nextState !== state) {
        state = nextState;
        glideAmount = labelled ? GLIDE_AS_CURSOR : GLIDE_AS_HALO;
        if (labelled) label.textContent = labelled.getAttribute("data-cursor");
        follower.classList.toggle("is-label", Boolean(labelled));
        follower.classList.toggle("is-halo", !labelled && Boolean(clickable));
      }
    };

    const onLeave = () => {
      state = "";
      glideAmount = GLIDE_AS_HALO;
      follower.classList.remove("is-label", "is-halo");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("has-cursor-follow");
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // A new page means the element under the pointer is gone: shrink away.
  useEffect(() => {
    followerRef.current?.classList.remove("is-label", "is-halo");
  }, [pathname]);

  return (
    <div ref={followerRef} className="cursor-follow" aria-hidden="true">
      <span className="cursor-disc" />
      <span ref={labelRef} className="cursor-label" />
    </div>
  );
}
