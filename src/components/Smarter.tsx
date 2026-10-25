"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SmarterCard {
  id: number;
  title: string;
  description: string;
  icon: string;
  bg: string;
  border?: string;
  textColor?: string;
}

const SMARTER_CARDS: SmarterCard[] = [
  {
    id: 1,
    title: "Telemetry\nIngestion",
    description:
      "Child mobile app streams daily screen time, app category switches, and GPS coordinates every 45-60s via low-power background service.",
    icon: "/assets/media/device-int.2av8zoo8l_0t9.svg",
    bg: "#2D8B8B",
  },
  {
    id: 2,
    title: "Addiction\nDetection",
    description:
      "Weighted mathematical formula scores digital addiction (0–100) using night usage ratio, daily session frequency, and app switch rate.",
    icon: "/assets/media/energy.3mpiysm5ns4jp.svg",
    bg: "#0d0d0d",
    border: "1px solid rgba(255,255,255,0.25)",
    textColor: "#2D8B8B",
  },
  {
    id: 3,
    title: "Isolation Forest\nAnomaly ML",
    description:
      "Machine learning classifier trained on a 7-day rolling data baseline. Automatically flags behavioral deviations > 2σ without false alarm fatigue.",
    icon: "/assets/media/system.1ljjyh27kp9zx.svg",
    bg: "#2D8B8B",
  },
  {
    id: 4,
    title: "Smart Alert\nClassification",
    description:
      "Events triaged into Informational (dashboard), Warning (push banner), and Critical (siren + Twilio SMS), keeping parents calm and responsive.",
    icon: "/assets/media/priority.25ha3b0f2gwif.svg",
    bg: "#0d0d0d",
    border: "1px solid rgba(255,255,255,0.25)",
    textColor: "#2D8B8B",
  },
  {
    id: 5,
    title: "Gemini AI\nWeekly Digests",
    description:
      "LLM synthesis translates thousands of telemetry points into compassionate, actionable weekly progress summaries for parents.",
    icon: "/assets/media/cloud.3sharn5600nmt.svg",
    bg: "#2D8B8B",
  },
];

export default function Smarter() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // Heading & paragraph fades
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

      const track = trackRef.current;
      const pinWrapper = pinWrapperRef.current;
      if (!track || !pinWrapper) return;

      if (isReduced) {
        gsap.set(track, { x: 0, xPercent: 0 });
        return;
      }

      // Initial position
      gsap.set(track, { x: 0, xPercent: 0 });

      const getScrollDistance = () => {
        const paddingRight = window.innerWidth * 0.06;
        return Math.max(0, track.scrollWidth - window.innerWidth + paddingRight);
      };

      const tween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: pinWrapper,
        start: "top top",
        end: () => `+=${Math.max(window.innerHeight * 1.5, getScrollDistance() + 250)}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.3,
        animation: tween,
        invalidateOnRefresh: true,
      });

      const refreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);

      return () => clearTimeout(refreshTimeout);
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const tex = card.querySelector<HTMLElement>(".smarter-card-texture");
    if (!tex) return;
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    tex.style.setProperty("--tx", `${x}px`);
    tex.style.setProperty("--ty", `${y}px`);
  };

  const handleCardMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const tex = card.querySelector<HTMLElement>(".smarter-card-texture");
    if (!tex) return;
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    tex.style.setProperty("--tx", `${x}px`);
    tex.style.setProperty("--ty", `${y}px`);
    gsap.to(tex, { opacity: 0.9, duration: 0.45, ease: "power2.out", overwrite: "auto" });
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const tex = card.querySelector<HTMLElement>(".smarter-card-texture");
    if (!tex) return;
    gsap.to(tex, { opacity: 0, duration: 0.45, ease: "power2.out", overwrite: "auto" });
  };

  return (
    <section
      id="smarter"
      ref={sectionRef}
      className="relative z-10 w-full bg-white dark:bg-[#070F0F] transition-colors duration-500"
    >
      <div
        ref={pinWrapperRef}
        className="flex h-screen w-full flex-col justify-start pt-[6vh] max-md:pt-[4vh] gap-[2.5vw] max-[1025px]:gap-[4vw] max-md:gap-5 overflow-hidden motion-reduce:h-fit motion-reduce:overflow-visible"
      >
        <div className="mx-auto flex w-full max-w-400 shrink-0 flex-col gap-[1.5vw] px-[5%] max-[1025px]:px-[7%] max-md:gap-4">
          <h2
            ref={headingRef}
            className="font-heading w-[65%] max-[1025px]:w-full leading-[1.1] font-normal tracking-[-0.02em] whitespace-pre-line text-black dark:text-white opacity-0"
          >
            Every Signal Makes the ScudoKid AI Engine Smarter
          </h2>

          <div className="flex items-center justify-between gap-[4vw] max-[1025px]:flex-col max-[1025px]:items-start max-[1025px]:gap-6">
            <p
              ref={paragraphRef}
              className="text-24 max-w-[42vw] leading-normal text-black/80 dark:text-slate-300 max-[1025px]:max-w-full max-[1025px]:text-[2.6vw] max-md:text-[4vw] opacity-0"
            >
              Raw telemetry transforms into actionable parental protection through four interconnected machine learning and rule-based analytical pipelines.
            </p>
          </div>
        </div>

        {/* Horizontal scroll track with spotlight cards */}
        <div
          ref={trackRef}
          className="flex w-max shrink-0 gap-[1.9vw] px-[5%] max-[1025px]:gap-[4.4vw] max-[1025px]:px-[7%] max-md:gap-[7vw] max-md:px-[9%] will-change-transform motion-reduce:overflow-x-auto motion-reduce:w-full motion-reduce:pb-4"
        >
          {SMARTER_CARDS.map((card) => (
            <div
              key={card.id}
              onMouseMove={handleCardMouseMove}
              onMouseEnter={handleCardMouseEnter}
              onMouseLeave={handleCardMouseLeave}
              style={{
                backgroundColor: card.bg,
                border: card.border || "none",
                color: card.textColor || "#ffffff",
              }}
              className="relative flex aspect-440/477 max-[1025px]:aspect-auto max-[1025px]:h-[45vh] max-md:h-[100vw] w-[28vw] shrink-0 flex-col overflow-hidden rounded-xl p-[2vw] max-[1025px]:p-[4vw] select-none will-change-transform max-[1025px]:w-[50vw] max-md:w-[76vw] max-md:rounded-3xl max-md:p-6 cursor-pointer"
            >
              {/* Spotlight texture */}
              <img
                alt=""
                aria-hidden="true"
                loading="lazy"
                width={1024}
                height={1536}
                decoding="async"
                className="smarter-card-texture pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0 mix-blend-screen will-change-[opacity,mask-position]"
                style={{
                  color: "transparent",
                  maskImage:
                    "radial-gradient(circle 170px at var(--tx, 0px) var(--ty, 0px), #000 55%, transparent 100%)",
                  WebkitMaskImage:
                    "radial-gradient(circle 170px at var(--tx, 0px) var(--ty, 0px), #000 55%, transparent 100%)",
                }}
                src="/assets/media/card-texture.2ehejv0p_86-0.webp"
              />

              <div className="relative z-10 flex h-[45%] max-[1025px]:h-[40%] shrink-0 items-start">
                <img
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  width={70}
                  height={70}
                  decoding="async"
                  className="h-[3vw] w-[3vw] object-contain max-[1025px]:h-[5.5vw] max-[1025px]:w-[5.5vw] max-md:h-[12vw] max-md:w-[12vw]"
                  style={{ color: "transparent" }}
                  src={card.icon}
                />
              </div>

              <div className="relative z-10 flex flex-1 flex-col gap-[1.8vw] max-md:gap-6">
                <h3 className="font-heading text-44 leading-[1.15] font-normal tracking-tight whitespace-pre-line text-white max-[1025px]:text-[4vw] max-md:text-[7vw]">
                  {card.title}
                </h3>

                <p className="max-w-[96%] text-22 tracking-wide leading-[1.3] font-normal text-white max-[1025px]:text-[2.5vw] max-md:text-[3.6vw]">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
