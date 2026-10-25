"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface FaqItem {
  id: string;
  question: string;
  answers: string[];
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    question: "What makes ScudoKid different from Google Family Link, Bark, and Qustodio?",
    answers: [
      "Unlike existing solutions that rely on blunt, punishment-only lockdowns or generate excessive false alarms, ScudoKid is built on an AI-driven, non-punitive philosophy that combines behavioral risk scoring (Low/Med/High) with quantified digital addiction detection (0–100).",
      "ScudoKid also features integrated WebRTC family calls, in-app reward mini-games for healthy habits, and is specifically optimized to democratize child safety for families in developing regions.",
    ],
  },
  {
    id: "faq-2",
    question: "How does the AI Behavior Analysis & Addiction Detection work?",
    answers: [
      "Every 45–60 seconds, the child device streams lightweight telemetry including night-time usage ratio, session frequency, average session duration, and app-switch velocity.",
      "Our AI microservice executes an Isolation Forest classifier trained on a 7-day rolling baseline to detect deviations greater than 2σ (e.g. an unexpected 6-hour screen spike) and computes a 0–100 addiction score.",
    ],
  },
  {
    id: "faq-3",
    question: "How does ScudoKid solve parental alert fatigue?",
    answers: [
      "ScudoKid implements a smart 3-tier event classification: Informational events (such as category updates or routine check-ins) are logged to the dashboard with no push alert; Warning events trigger an in-app banner; and Critical events (like SOS or explicit threats) activate Twilio SMS and siren push alerts immediately.",
    ],
  },
  {
    id: "faq-4",
    question: "How does the Emergency SOS button work?",
    answers: [
      "In genuine distress, the child taps the center SOS button. Within 45 seconds, high-precision GPS coordinates, an instant high-priority push notification, and an SMS via Twilio are broadcast to all registered parents alongside an audible in-app siren.",
    ],
  },
  {
    id: "faq-5",
    question: "What technology stack powers the ScudoKid ecosystem?",
    answers: [
      "ScudoKid is built as a 3-tier distributed client-server ecosystem: Next.js/React with Tailwind CSS and ShadCN UI for the web portals, Android (Kotlin / React Native) with Firebase SDK for the child mobile app, Node.js/Express with TypeORM and PostgreSQL/Redis for the backend, and Python (TensorFlow, Scikit-learn, Gemma/Gemini) for the AI engine.",
    ],
  },
];

export default function Faq() {
  const [openId, setOpenId] = useState<string>("faq-1");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const regionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
  }, []);

  const toggleItem = (id: string) => {
    const isCurrentlyOpen = openId === id;
    const newId = isCurrentlyOpen ? "" : id;
    setOpenId(newId);

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dur = isReduced ? 0 : 0.45;

    // Animate closing of currently open
    if (openId && regionRefs.current[openId]) {
      const region = regionRefs.current[openId]!;
      gsap.killTweensOf(region);
      gsap.to(region, {
        height: 0,
        duration: dur,
        ease: "power2.out",
        onComplete: () => {
          region.style.overflow = "hidden";
        },
      });
    }

    // Animate opening of target
    if (!isCurrentlyOpen && regionRefs.current[id]) {
      const region = regionRefs.current[id]!;
      gsap.killTweensOf(region);
      region.style.height = "auto";
      region.style.overflow = "hidden";
      const h = region.scrollHeight;
      region.style.height = "0px";

      gsap.to(region, {
        height: h,
        duration: dur,
        ease: "power2.out",
        onComplete: () => {
          region.style.height = "auto";
          region.style.overflow = "visible";
        },
      });
    }
  };

  return (
    <section id="faq" className="kyntra-container relative w-full bg-white dark:bg-[#070F0F] text-black dark:text-white transition-colors duration-500">
      <div className="mx-auto max-w-400">
        <h2
          ref={headingRef}
          className="font-heading mb-[4vw] leading-[1.15] font-normal tracking-[-0.02em] max-[1025px]:mb-[8vw] max-[1025px]:text-[6vw] max-md:text-[8vw] text-black dark:text-white opacity-0"
        >
          Frequently Asked Questions
        </h2>

        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              aria-expanded={isOpen ? "true" : "false"}
              aria-controls={`faq-a-${index + 1}`}
              id={`faq-q-${index + 1}`}
              onClick={() => toggleItem(item.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleItem(item.id);
                }
              }}
              className="cursor-pointer group relative rounded-lg transition-[padding,color] duration-500 ease-[cubic-bezier(0.215,0.61,0.355,1)] aria-expanded:py-3 has-[+[aria-expanded=true]]:[&_[data-line-draw]]:opacity-0 max-md:rounded-[4.5vw]"
            >
              {/* Expanding Blue Background Pill */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
              >
                <div
                  className={`absolute inset-0 origin-top bg-[#2D8B8B] transition-transform duration-500 ease-[cubic-bezier(0.215,0.61,0.355,1)] motion-reduce:transition-none ${
                    isOpen ? "scale-y-100" : "scale-y-0"
                  }`}
                />
              </div>

              {/* Separator line */}
              <div
                data-line-draw="true"
                className={`absolute right-[1.3vw] bottom-0 left-[1.3vw] z-2 h-px bg-black dark:bg-white/15 transition-opacity duration-300 max-md:right-0 max-md:left-0 ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
              />

              {/* Question Row */}
              <div
                className={`flex w-full items-center justify-between gap-6 relative z-2 font-heading font-normal transition-colors duration-500 ease-[cubic-bezier(0.215,0.61,0.355,1)] gap-[2vw] pl-6 text-[1.65vw] max-[1025px]:text-[5vw] max-md:text-[6vw]! py-[1.6vw] pr-[1.4vw] text-left max-md:py-[5vw] max-md:pr-[5vw] max-md:pl-[5vw] max-[1025px]:py-[3vw] max-[1025px]:pr-[3vw] max-[1025px]:pl-[3vw] ${
                  isOpen ? "text-white" : "text-black dark:text-white"
                }`}
              >
                <div className="flex-1">
                  <div>{item.question}</div>
                </div>

                <div className="shrink-0">
                  <div
                    data-open={isOpen ? "" : undefined}
                    className={`flex h-[2.4vw] w-[2.4vw] items-center justify-center rounded-full transition-colors duration-500 max-md:h-[9vw] max-md:w-[9vw] max-[1025px]:h-[6vw] max-[1025px]:w-[6vw] ${
                      isOpen
                        ? "bg-white text-[#2D8B8B]"
                        : "bg-[#2D8B8B] text-white"
                    }`}
                  >
                    <span
                      className="relative flex h-full w-full items-center justify-center"
                      aria-hidden="true"
                    >
                      <span className="absolute h-[1.5px] w-[40%] bg-current" />
                      <span
                        className={`absolute h-[1.5px] w-[40%] bg-current transition-transform duration-500 ease-[cubic-bezier(0.215,0.61,0.355,1)] motion-reduce:transition-none ${
                          isOpen ? "rotate-0" : "rotate-90"
                        }`}
                      />
                    </span>
                  </div>
                </div>
              </div>

              {/* Accordion Content Panel */}
              <div
                ref={(el) => {
                  regionRefs.current[item.id] = el;
                }}
                id={`faq-a-${index + 1}`}
                role="region"
                aria-labelledby={`faq-q-${index + 1}`}
                style={{
                  height: isOpen ? "auto" : "0px",
                  overflow: isOpen ? "visible" : "hidden",
                }}
                className="relative z-2"
              >
                <div className="w-[70%] pl-7 space-y-[1vw] pr-[2vw] pb-[1.8vw] text-22 leading-[1.6] font-normal text-white/90 max-md:w-[90%] max-md:space-y-[4vw] max-md:pr-[6vw] max-md:pb-[6vw] max-md:pl-[5vw] max-md:text-[4vw] max-[1025px]:w-[90%] max-[1025px]:pr-[4vw] max-[1025px]:pb-[3vw] max-[1025px]:pl-[3vw] max-[1025px]:text-[2.7vw]">
                  <div>
                    {item.answers.map((ans, aIdx) => (
                      <p key={aIdx} className={aIdx > 0 ? "mt-2" : ""}>
                        {ans}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
