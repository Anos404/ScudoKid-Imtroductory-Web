"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface CounterItem {
  value: string;
  label: string;
}

const STATS_DATA: CounterItem[] = [
  { value: "6h+", label: "Avg Screen Time Tackled" },
  { value: "45s", label: "SOS Emergency Response" },
  { value: "100", label: "Addiction Score Scale" },
  { value: "4", label: "UN SDG Goals Addressed" },
];

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const counterContainerRefs = useRef<HTMLDivElement[]>([]);
  const labelRefs = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Heading fade up
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: isReduced ? 0 : 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }

    // Rolling numbers animation
    counterContainerRefs.current.forEach((counter) => {
      if (!counter) return;
      let idx = 0;

      Array.from(counter.children).forEach((child) => {
        if (child.tagName === "DIV" && child.classList.contains("overflow-hidden")) {
          const column = child.firstElementChild as HTMLElement;
          if (!column) return;
          const targetDigit = parseInt(column.getAttribute("data-target") || "0", 10);
          const currentIdx = idx;
          idx++;

          if (isReduced) {
            gsap.set(column, { y: `-${10 * targetDigit}%` });
            return;
          }

          gsap.to(column, {
            y: `-${10 * targetDigit}%`,
            duration: 1.5,
            delay: currentIdx * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: child,
              start: "top 85%",
            },
          });
        } else if (child.tagName === "SPAN") {
          idx += (child.textContent || "").length;
        }
      });
    });

    // Label fades
    labelRefs.current.forEach((label, i) => {
      if (!label) return;
      gsap.fromTo(
        label,
        { opacity: 0, y: isReduced ? 0 : 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: label,
            start: "top 85%",
            once: true,
          },
        }
      );
    });
  }, []);

  const renderRollingNumber = (val: string, counterIdx: number) => {
    const chars = val.split("");
    return (
      <div
        ref={(el) => {
          if (el) counterContainerRefs.current[counterIdx] = el;
        }}
        className="flex items-end gap-[0.05em] max-[1025px]:gap-0 font-medium text-[3.5vw] max-[1025px]:text-[6.5vw] max-md:text-[10vw]"
        style={{ fontWeight: 500, color: "#ffffff" }}
      >
        {chars.map((char, i) => {
          const isDigit = !isNaN(parseInt(char, 10));
          if (!isDigit) {
            return (
              <span key={i} style={{ color: "#ffffff" }}>
                {char}
              </span>
            );
          }
          return (
            <div key={i} className="overflow-hidden inline-block relative h-[1em] w-[0.6em]">
              <div className="flex flex-col" data-target={char}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
                  <span key={digit} className="leading-none" style={{ color: "#ffffff" }}>
                    {digit}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black text-white max-[1025px]:h-fit"
    >
      <img
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={2400}
        height={1600}
        decoding="async"
        className="pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover"
        style={{ color: "transparent" }}
        src="/assets/media/trust.1duiqfdptb6qh.webp"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black/55" />

      <div className="relative z-10 flex h-full w-full pb-2 items-center justify-center px-[10vw] max-[1025px]:px-[3vw] max-[1025px]:py-[10vw] max-md:p-[7vw] max-md:py-[15vw]">
        <div className="relative h-[75vh] w-full max-w-360 overflow-hidden rounded-[1.6vw] max-[1025px]:h-full max-[1025px]:rounded-[4vw] max-md:rounded-[4vw]">
          <div className="overflow-hidden pointer-events-none absolute inset-0">
            <img
              alt="ScudoKid Ecosystem Protection & Trust"
              loading="lazy"
              width={1440}
              height={736}
              decoding="async"
              className="w-full h-full translate-y-[-5%] object-cover scale-110"
              style={{ color: "transparent" }}
              src="/assets/media/trust.1duiqfdptb6qh.webp"
            />
          </div>

          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black/25" />

          <div className="relative max-[1025px]:mt-[5vh] flex h-full flex-col justify-between p-[3.5vw] max-[1025px]:h-auto max-[1025px]:min-h-[100vw] max-[1025px]:gap-[10vw] max-[1025px]:p-[6vw] max-md:min-h-[175vw] max-md:gap-[12vw] max-md:p-[7vw]">
            <h2
              ref={headingRef}
              className="font-heading w-[55%] max-[1025px]:w-[90%] leading-[1.05] font-normal tracking-[-0.02em] max-[1025px]:text-[5vw] max-md:text-[10vw] opacity-0"
            >
              Engineered for Proven Child Safety Impact
            </h2>

            <div className="grid grid-cols-4 gap-[3vw] max-[1025px]:grid-cols-1 max-[1025px]:gap-y-[7vw] max-md:gap-y-[9vw]">
              {STATS_DATA.map((item, idx) => (
                <div key={item.label} className="flex flex-col">
                  <div className="flex h-[3.2vw] items-end leading-none **:leading-none max-[1025px]:h-[7vw] max-md:h-[11vw]">
                    {renderRollingNumber(item.value, idx)}
                  </div>

                  <div className="mt-[1.2vw] h-px w-full bg-white/50 max-[1025px]:mt-[2vw] max-[1025px]:w-[55%] max-md:mt-[3vw] max-md:w-[62%]" />

                  <span
                    ref={(el) => {
                      if (el) labelRefs.current[idx] = el;
                    }}
                    className="mt-[0.9vw] text-22 tracking-wide text-white/85 max-[1025px]:mt-[2vw] max-[1025px]:text-[2.8vw] max-md:mt-[2.5vw] max-md:text-[4vw] opacity-0"
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
