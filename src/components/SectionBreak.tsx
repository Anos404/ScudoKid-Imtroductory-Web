"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SectionBreak() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

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

    if (isReduced) {
      gsap.to(chars, {
        color: "#111111",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "bottom 85%",
          scrub: 0.6,
        },
      });
      return;
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
      color: "#dddddd",
      opacity: 0.55,
      duration: 4.2,
      stagger: 0.5,
      ease: "sine.inOut",
    });

    tl.to(
      chars,
      {
        color: "#2D8B8B",
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
  }, []);

  return (
    <section
      id="scudo-section-break"
      ref={sectionRef}
      className="relative h-screen w-full"
      style={{ backgroundColor: "#ffffff" }}
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
                className="tf-char inline-block"
                style={{
                  color: "#111111",
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
