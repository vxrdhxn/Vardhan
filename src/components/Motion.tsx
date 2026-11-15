"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

// Motion shared by every page:
// 1. Lenis smooth scrolling, driven by GSAP's ticker.
// 2. On each page: headlines (.rise) slide up, supporting content (.fade-in)
//    fades in, and on Home the intro paragraph lights up word by word.

export default function Motion() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis();
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Runs once per page, right after the new page has rendered.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    lenisRef.current?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);

    const scope = gsap.context(() => {});

    const play = () => scope.add(() => {
      gsap.from(".rise > span", {
        yPercent: 110,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.09,
        delay: 0.35,
      });

      gsap.from(".fade-in", {
        opacity: 0,
        y: 24,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.7,
      });

      // Project boards: as each one scrolls into view its tiles wipe open
      // from the bottom, one after another, while the picture inside each
      // tile eases back from slightly zoomed in.
      gsap.utils.toArray<HTMLElement>(".showcase").forEach((board) => {
        const trigger = { trigger: board, start: "top 78%" };

        gsap.from(board.querySelectorAll(".showcase-head > *"), {
          opacity: 0,
          y: 24,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: trigger,
        });
        gsap.fromTo(
          board.querySelectorAll(".tile"),
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.2,
            ease: "power4.out",
            stagger: 0.09,
            scrollTrigger: trigger,
          },
        );
        gsap.fromTo(
          board.querySelectorAll(".tile-inner"),
          { scale: 1.25 },
          { scale: 1, duration: 1.7, ease: "power3.out", stagger: 0.09, scrollTrigger: trigger },
        );
      });

      // About page: the ribs covering the photo lift off one after another,
      // and the photo eases back from slightly zoomed in.
      if (document.querySelector(".portrait")) {
        gsap.to(".portrait-ribs i", {
          scaleY: 0,
          duration: 0.9,
          ease: "power3.inOut",
          stagger: 0.06,
          delay: 0.7,
        });
        gsap.from(".portrait-photo img", { scale: 1.25, duration: 1.8, ease: "power3.out", delay: 0.7 });
      }

      // Skills page: each row builds itself as it scrolls into view. The
      // divider draws across, the group name rises, its ribs grow, and the
      // skill pills drop in one after another.
      gsap.utils.toArray<HTMLElement>(".skill-row").forEach((row) => {
        gsap
          .timeline({ scrollTrigger: { trigger: row, start: "top 88%" }, delay: 0.5 })
          .fromTo(row, { "--line": 0 }, { "--line": 1, duration: 1, ease: "power3.inOut" })
          .from(row.querySelector(".skill-name > span"), { yPercent: 110, duration: 0.9, ease: "power4.out" }, 0.1)
          .from(
            row.querySelectorAll(".skill-ribs i"),
            { scaleY: 0, duration: 0.6, ease: "power3.out", stagger: 0.04, clearProps: "transform" },
            0.25,
          )
          .from(
            row.querySelectorAll(".pills li"),
            { opacity: 0, y: 18, duration: 0.5, ease: "power3.out", stagger: 0.05, clearProps: "transform" },
            0.3,
          );
      });

      if (document.querySelector(".intro")) {
        // The inline symbols turn, and the ruler's pointer travels down,
        // in step with the scroll.
        gsap.to(".intro-symbol svg", {
          rotate: 360,
          ease: "none",
          scrollTrigger: { trigger: ".intro", start: "top bottom", end: "bottom top", scrub: true },
        });
        gsap.fromTo(
          ".intro-pointer",
          { top: "0%" },
          {
            top: "100%",
            ease: "none",
            scrollTrigger: { trigger: ".intro", start: "top 80%", end: "bottom 55%", scrub: true },
          },
        );

        gsap.fromTo(
          ".intro-word",
          { opacity: 0.16 },
          {
            opacity: 1,
            stagger: 0.05,
            ease: "none",
            scrollTrigger: {
              trigger: ".intro",
              start: "top 80%",
              end: "bottom 55%",
              scrub: true,
            },
          },
        );
      }
    });

    // On the very first load the startup sequence covers the page, so the
    // entrance waits until it starts to lift.
    const isPreloading = document.documentElement.hasAttribute("data-preloading");
    if (isPreloading) window.addEventListener("preloader:done", play, { once: true });
    else play();

    return () => {
      window.removeEventListener("preloader:done", play);
      scope.revert();
    };
  }, [pathname]);

  return null;
}
