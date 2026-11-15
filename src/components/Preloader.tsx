"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// The startup sequence, shown once per browser session. The whole screen is
// a wall of dark glass ribs:
// 1. The name rises in, letter by letter.
// 2. A light travels across the ribs from left to right as the counter runs
//    from [0%] to [100%]. The ribs are the progress bar.
// 3. The name slides away and the ribs lift off one after another, the same
//    way they do between pages, revealing the site.
//
// A tiny script in layout.tsx decides, before the first paint, whether the
// preloader should show (it sets data-preloading on <html>). When the ribs
// start to lift, this component fires a "preloader:done" event so the page
// headline can begin its own entrance at the right moment.

const NAME = "Vardhan";
const RIBS = 24;

// How bright a rib is, given how far the light has travelled past it.
// Just reached: fades in. Behind the light: settles to a soft glow.
function glowAt(distancePastRib: number): number {
  if (distancePastRib <= 0) return 0;
  if (distancePastRib < 1) return distancePastRib;
  return 0.3 + 0.7 * Math.exp(-(distancePastRib - 1) * 0.45);
}

export default function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const html = document.documentElement;
    if (!root || !html.hasAttribute("data-preloading")) return;

    try {
      sessionStorage.setItem("intro-seen", "1");
    } catch {
      // Storage can be blocked. The intro then simply plays on every load.
    }

    const finish = () => {
      html.removeAttribute("data-preloading");
    };

    const scope = gsap.context(() => {
      // Phones show fewer ribs, so only count the ones actually on screen.
      const glows = gsap.utils
        .toArray<HTMLElement>(".preloader-glow")
        .filter((glow) => glow.offsetParent !== null);
      const progress = { value: 0 };

      const showProgress = () => {
        if (numberRef.current) numberRef.current.textContent = String(Math.round(progress.value));

        // The light runs a little past the last rib so the end is not abrupt.
        const lightPosition = (progress.value / 100) * (glows.length + 3);
        glows.forEach((glow, index) => {
          glow.style.opacity = String(glowAt(lightPosition - index));
        });
      };

      gsap.set(".preloader-char", { yPercent: 115, visibility: "visible" });

      gsap
        .timeline({ onComplete: finish })
        .to(".preloader-char", { yPercent: 0, duration: 0.9, ease: "power4.out", stagger: 0.04 })
        .to(progress, { value: 100, duration: 1.9, ease: "power2.inOut", onUpdate: showProgress }, 0.2)
        .to(".preloader-char", { yPercent: -115, duration: 0.6, ease: "power3.in", stagger: 0.02 }, "+=0.25")
        .to(".preloader-count", { opacity: 0, duration: 0.3 }, "<")
        .add(() => {
          window.dispatchEvent(new Event("preloader:done"));
        }, ">-0.1")
        .to(".preloader-rib", {
          scaleY: 0,
          transformOrigin: "top",
          duration: 0.7,
          ease: "power3.inOut",
          stagger: 0.03,
        });
    }, root);

    return () => {
      scope.revert();
      finish();
    };
  }, []);

  return (
    <div ref={rootRef} className="preloader" aria-hidden="true">
      <div className="preloader-ribs">
        {Array.from({ length: RIBS }, (_, index) => (
          <span key={index} className="preloader-rib">
            <span className="preloader-glow" />
          </span>
        ))}
      </div>

      <div className="preloader-centre">
        <span className="preloader-name">
          {NAME.split("").map((character, index) => (
            <span key={index} className="preloader-char-mask">
              <span className="preloader-char">{character}</span>
            </span>
          ))}
        </span>
        <span className="preloader-count">
          [<span ref={numberRef}>0</span>%]
        </span>
      </div>
    </div>
  );
}
