"use client";

import React, { useEffect, useRef } from "react";
import HoverText from "./ui/HoverText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface StepData {
  title: string;
  description: string;
}

const STEPS: StepData[] = [
  {
    title: "QR & 6-Digit Pairing",
    description: "Parent generates a linking code on the web portal. Child scans to bind device and start 45-second telemetry.",
  },
  {
    title: "Baseline Habit Learning",
    description: "AI engine observes daily screen time, bedtime routines, and safe perimeter locations over 7 rolling days.",
  },
  {
    title: "Active Protection & Rules",
    description: "Safe web filtering, bedtime limits, and geofence guards run silently without lagging the device.",
  },
  {
    title: "Reward Habits & Peace of Mind",
    description: "Children earn mini-games for keeping within limits; parents receive calm, triaged alerts only when it matters.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Fades for heading & lead paragraph
    [headingRef.current, paragraphRef.current, buttonRef.current].forEach((el) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: isReduced ? 0 : 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    const steps = stepRefs.current.filter(Boolean);
    if (!steps.length || !sectionRef.current) return;

    const lines: SVGLineElement[] = [];
    const dots: SVGCircleElement[] = [];
    const blocks: HTMLElement[] = [];

    steps.forEach((step) => {
      const svg = step.querySelector("svg");
      if (svg) {
        const lineElements = svg.querySelectorAll("line");
        if (lineElements[1]) lines.push(lineElements[1]);
        const circle = svg.querySelector("circle");
        if (circle) dots.push(circle);
      }
      const block = step.querySelector<HTMLElement>(".step-block");
      if (block) blocks.push(block);
    });

    const accent = "#2D8B8B";

    if (isReduced) {
      lines.forEach((l) => gsap.set(l, { strokeDasharray: "none", strokeDashoffset: 0 }));
      dots.forEach((d) => gsap.set(d, { fill: accent, attr: { cy: 150 } }));
      blocks.forEach((b) => {
        gsap.set(b, { opacity: 1 });
        const t = b.querySelector(".step-title");
        if (t) gsap.set(t, { color: accent });
      });
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "10% 55%",
        end: "90% 70%",
        scrub: 0.4,
      },
    });

    lines.forEach((line, i) => {
      const dot = dots[i];
      gsap.set(line, { strokeDasharray: 150, strokeDashoffset: 150 });
      if (i === 0 && dot) tl.to(dot, { fill: accent, duration: 0.1 });
      tl.to(line, { strokeDashoffset: 0, ease: "none" });
      if (dot) tl.fromTo(dot, { attr: { cy: 0 } }, { attr: { cy: 150 }, ease: "none" }, "<");
      if (i > 0 && dot) tl.to(dot, { fill: accent, duration: 0.1 }, "<0.1");
    });

    blocks.forEach((b) => {
      const title = b.querySelector(".step-title");
      const cfg = { trigger: b, start: "top 65%", end: "top 45%", scrub: 0.2 };
      gsap.fromTo(b, { opacity: 0.3 }, { opacity: 1, ease: "power2.out", scrollTrigger: cfg });
      if (title) gsap.fromTo(title, { color: "currentColor" }, { color: accent, ease: "none", scrollTrigger: cfg });
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="kyntra-container relative w-full bg-white dark:bg-[#070F0F] text-black dark:text-white transition-colors duration-500"
    >
      <div className="mx-auto flex max-w-400 flex-col gap-[2vw] max-[1025px]:gap-[8vw] text-center">
        <h2
          ref={headingRef}
          className="font-heading leading-[1.15] font-normal tracking-[-0.02em] max-[1025px]:text-[6vw] max-md:text-[8vw] text-black dark:text-white opacity-0"
        >
          How ScudoKid Works
        </h2>

        <p
          ref={paragraphRef}
          className="text-24 mx-auto tracking-wide w-[60vw] leading-[1.6] text-black/80 dark:text-slate-300 max-[1025px]:max-w-full max-[1025px]:w-full opacity-0"
        >
          ScudoKid makes child protection proactive and seamless in four simple steps—from rapid device pairing to positive reinforcement and fatigue-free alerts.
        </p>
      </div>

      <div className="relative mx-auto mt-[5vw] max-[1025px]:mt-[5vh] flex w-full flex-col items-center">
        {STEPS.map((step, idx) => (
          <div
            key={step.title}
            ref={(el) => {
              if (el) stepRefs.current[idx] = el;
            }}
            className="flex mb-[2vw] w-full flex-col items-center"
          >
            <svg width="20" height="150" className="overflow-visible">
              <line x1="10" y1="0" x2="10" y2="150" stroke="#D1D5DB" className="dark:stroke-white/20" strokeWidth="1" />
              <line x1="10" y1="0" x2="10" y2="150" stroke="#2D8B8B" strokeWidth="1" />
              <circle cx="10" cy="0" r="6" fill="#f8f8f8" className="dark:fill-[#070F0F]" stroke="#2D8B8B" strokeWidth="1" />
            </svg>

            <div className="step-block mt-[2vw] mb-[1vw] max-[1025px]:mt-[6vw] max-[1025px]:mb-[4vw] space-y-[1vw] text-center max-[1025px]:space-y-[1vh]">
              <h3 className="step-title font-heading text-[1.65vw] font-normal max-md:text-[6vw] text-black dark:text-white">
                {step.title}
              </h3>
              <p className="text-22 text-[#333333] dark:text-slate-300">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div ref={buttonRef} className="mt-[4vw] flex justify-center opacity-0">
        <HoverText
          text="Explore Ecosystem"
          href="#features"
          showArrow
          className="font-body text-22 tracking-tight max-md:text-[3.5vw] text-white"
          arrowClassName="text-white"
          containerClassName="rounded-full px-[2.5vw] py-[1vw] text-white max-md:px-[6vw] max-md:py-[3vw] bg-[#2D8B8B]"
        />
      </div>
    </section>
  );
}
