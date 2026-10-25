"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "@/context/ThemeContext";

export default function SectionBreak() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { theme } = useTheme();

  const text =
    "Child safety shouldn't feel like surveillance. ScudoKid builds digital responsibility through positive reinforcement, transparent boundaries, and proactive AI protection.";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const heading = headingRef.current;
    if (!section || !heading) return;

    const chars = heading.querySelectorAll<HTMLSpanElement>(".tf-char");
    if (!chars.length) return;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const isDark = theme === "dark";
    const initialBase = isDark ? "#94a3b8" : "#111111";
    const midColor = isDark ? "#64748b" : "#aaaaaa";
    const highlightColor = isDark ? "#34D399" : "#2D8B8B";

    // Reset base colors when theme changes
    gsap.set(chars, { color: initialBase, clearProps: "opacity" });

    if (isReduced) {
      const anim = gsap.to(chars, {
        color: highlightColor,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "bottom 85%",
          scrub: 0.6,
        },
      });
      return () => {
        anim.kill();
      };
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        end: "bottom 85%",
        scrub: 0.6,
      },
    });

    tl.to(chars, {
      color: midColor,
      opacity: 0.65,
      duration: 4.2,
      stagger: 0.5,
      ease: "sine.inOut",
    });

    tl.to(
      chars,
      {
        color: highlightColor,
        opacity: 1,
        duration: 5,
        stagger: 0.5,
        ease: "sine.inOut",
      },
      "+=0.6"
    );

    return () => {
      tl.kill();
    };
  }, [theme]);

  return (
    <section
      id="scudo-section-break"
      ref={sectionRef}
      className="relative h-screen w-full bg-white dark:bg-[#070F0F] transition-colors duration-500"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-x-hidden">
        <div className="tf-text-wrapper relative z-10 mx-auto text-center w-[75%] max-[1025px]:w-[86%] max-md:w-[82%]">
          <h3
            ref={headingRef}
            className="tf-heading leading-[1.4] tracking-[-0.03em] font-heading font-medium! text-[5vw] max-[1025px]:text-[6vw] max-md:text-[9vw]!"
            style={{ opacity: 1 }}
          >
            {text.split("").map((char, index) => (
              <span
                key={index}
                className="tf-char inline-block text-[#111111] dark:text-slate-400"
                style={{
                  willChange: "color, opacity",
                  whiteSpace: char === " " ? "pre" : "normal",
                }}
              >
                {char}
              </span>
            ))}
          </h3>
        </div>
      </div>
    </section>
  );
}
