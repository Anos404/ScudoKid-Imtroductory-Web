"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLImageElement>(null);
  const phone1Ref = useRef<HTMLDivElement>(null);
  const phone2Ref = useRef<HTMLDivElement>(null);
  const phone3Ref = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Heading & paragraph fade up
    [headingRef.current, paragraphRef.current].forEach((el) => {
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

    const phones = [phone1Ref.current, phone2Ref.current, phone3Ref.current].filter(Boolean);
    if (!phones.length) return;

    if (isReduced) {
      gsap.set(phones, { opacity: 1 });
      if (glowRef.current) gsap.set(glowRef.current, { opacity: 1 });
      return;
    }

    gsap.set(phones, { opacity: 1 });

    const mm = gsap.matchMedia();

    // Desktop glow & parallax animations
    mm.add("(min-width: 1026px)", () => {
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            once: true,
          },
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        });
      }

      if (phone1Ref.current && phone2Ref.current && phone3Ref.current) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: "#ecosystem",
              start: "30% bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          })
          .fromTo([phone2Ref.current, phone3Ref.current], { y: -72 }, { y: 72 }, 0)
          .fromTo(phone1Ref.current, { y: 72 }, { y: -72 }, 0);
      }
    });

    // Mobile fade in
    mm.add("(max-width: 1025px)", () => {
      phones.forEach((p) => {
        gsap.from(p, {
          scrollTrigger: { trigger: p, start: "top 85%", once: true },
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      id="ecosystem"
      ref={sectionRef}
      className="kyntra-container relative w-full h-full overflow-hidden bg-white text-black"
    >
      <div className="mx-auto flex max-w-400 py-[4vh] items-start justify-between gap-[6vw] max-[1025px]:flex-col max-[1025px]:gap-[6vw]">
        <h2
          ref={headingRef}
          className="font-heading w-[38vw] max-[1025px]:w-full leading-[1.15] font-normal tracking-[-0.02em] opacity-0"
        >
          Three Unified Platforms. One Comprehensive Safety Ecosystem.
        </h2>

        <p
          ref={paragraphRef}
          className="text-24 w-[33vw] max-[1025px]:w-full leading-[1.6] tracking-wide text-black/80 text-right max-[1025px]:text-left opacity-0"
        >
          ScudoKid seamlessly synchronizes the Parent Web Portal, Child Mobile App, and Super Admin Panel—empowering families with proactive AI telemetry, real-time geofencing, and healthy habit reinforcement.
        </p>
      </div>

      <div className="relative mx-auto mt-[10vw] flex max-w-400 items-start justify-center gap-[3vw] max-[1025px]:mt-[10vw] max-[1025px]:flex-col max-[1025px]:items-center max-[1025px]:gap-[8vw]">
        {/* Glow vector curve */}
        <img
          ref={glowRef}
          alt=""
          aria-hidden="true"
          loading="lazy"
          width={1920}
          height={576}
          decoding="async"
          className="pointer-events-none absolute top-[70%] left-1/2 w-screen max-w-none -translate-x-1/2 -translate-y-1/2 opacity-0 select-none max-[1025px]:hidden"
          style={{ color: "transparent" }}
          src="/assets/media/about-line.3x1s0i4oqhsdh.svg"
        />

        {/* 3 Phone mockups */}
        <div ref={phone1Ref} className="relative w-[22vw] opacity-0 max-[1025px]:w-[90%]">
          <img
            alt="ScudoKid Parent Web Portal & Family Center"
            loading="lazy"
            width={457}
            height={948}
            decoding="async"
            className="h-auto w-full object-contain drop-shadow-xl"
            style={{ color: "transparent" }}
            src="/assets/media/scudokid-about-01.svg"
          />
        </div>

        <div ref={phone2Ref} className="z-10 w-[22vw] opacity-0 max-[1025px]:w-[90%]">
          <img
            alt="ScudoKid Child App Active Protection & Reward Habits"
            loading="lazy"
            width={457}
            height={948}
            decoding="async"
            className="h-auto w-full object-contain drop-shadow-2xl"
            style={{ color: "transparent" }}
            src="/assets/media/scudokid-about-02.svg"
          />
        </div>

        <div ref={phone3Ref} className="relative w-[22vw] opacity-0 max-[1025px]:w-[90%]">
          <img
            alt="ScudoKid AI Behavior Analysis Engine & Isolation Forest ML"
            loading="lazy"
            width={457}
            height={948}
            decoding="async"
            className="h-auto w-full object-contain drop-shadow-xl"
            style={{ color: "transparent" }}
            src="/assets/media/scudokid-about-03.svg"
          />
        </div>
      </div>
    </section>
  );
}
