"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    let lenis: Lenis | null = null;
    try {
      lenis = new Lenis({
        duration: 1.35,
        lerp: 0.075,
        smoothWheel: true,
        wheelMultiplier: 0.8,
        touchMultiplier: 0.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      // Synchronize Lenis with GSAP ScrollTrigger
      lenis.on("scroll", ScrollTrigger.update);

      const tickerFn = (time: number) => {
        lenis?.raf(time * 1000);
      };
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);

      // Expose globally for components that need lenis.scrollTo()
      (window as unknown as { lenis: Lenis }).lenis = lenis;

      // Handle scroll restoration
      if (!window.location.hash) {
        try {
          window.history.scrollRestoration = "manual";
        } catch {
          // ignore
        }
        window.scrollTo(0, 0);
      }

      return () => {
        gsap.ticker.remove(tickerFn);
        lenis?.destroy();
      };
    } catch (err) {
      console.warn("Lenis initialization error:", err);
    }
  }, []);

  return null;
}
