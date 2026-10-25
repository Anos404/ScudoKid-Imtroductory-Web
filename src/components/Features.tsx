"use client";

import React, { useEffect, useRef } from "react";
import HoverText from "./ui/HoverText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface FeatureCardItem {
  icon: string;
  label: string;
}

interface FeatureCardData {
  id: number;
  title: string;
  description: string;
  items: FeatureCardItem[];
}

const CARDS: FeatureCardData[] = [
  {
    id: 1,
    title: "AI Behavior & Risk Engine",
    description:
      "Continuous behavioral telemetry evaluation producing real-time Low, Medium, and High risk classifications with 7-day and 30-day predictive trends.",
    items: [
      { icon: "/assets/media/system.1ljjyh27kp9zx.svg", label: "Isolation Forest ML" },
      { icon: "/assets/media/energy.3mpiysm5ns4jp.svg", label: "0–100 Addiction Score" },
      { icon: "/assets/media/property.0y95hmeo9n5f-.svg", label: "Risk Classification" },
      { icon: "/assets/media/home.1e0bnzohlcyhs.svg", label: "Natural Language AI" },
    ],
  },
  {
    id: 2,
    title: "Real-Time Geo-Fencing",
    description:
      "Parents draw interactive safe zones on Google Maps. The backend uses the Haversine formula to validate GPS telemetry and send instant breach alerts within 45 seconds.",
    items: [
      { icon: "/assets/media/property.0y95hmeo9n5f-.svg", label: "Live GPS Telemetry" },
      { icon: "/assets/media/safety.3hh0dlt0zo116.svg", label: "Interactive Safe Zones" },
      { icon: "/assets/media/priority.25ha3b0f2gwif.svg", label: "< 45s Breach Alerts" },
      { icon: "/assets/media/service-history.3n7_yamh0i5pn.svg", label: "Encrypted Route History" },
    ],
  },
  {
    id: 3,
    title: "Smart Web & App Filtering",
    description:
      "Category-based blocking for adult, gambling, and dangerous content, paired with non-punitive notices that explain rules transparently to children.",
    items: [
      { icon: "/assets/media/safety.3hh0dlt0zo116.svg", label: "Adult Content Auto-Filter" },
      { icon: "/assets/media/system.1ljjyh27kp9zx.svg", label: "Custom Allow / Block" },
      { icon: "/assets/media/service-record.2mydt4w_cs4c-.svg", label: "Browsing History Audit" },
      { icon: "/assets/media/experts.1dw-q85wy5pb_.svg", label: "Transparent Notices" },
    ],
  },
  {
    id: 4,
    title: "Family Hub & Emergency SOS",
    description:
      "Seamless family connection with end-to-end encrypted messaging, WebRTC audio/video calling, and an instant one-tap emergency SOS broadcast.",
    items: [
      { icon: "/assets/media/priority.25ha3b0f2gwif.svg", label: "One-Tap SOS Siren" },
      { icon: "/assets/media/personnel-ass.3ngq7ekvlqbv9.svg", label: "Socket.io Family Chat" },
      { icon: "/assets/media/dev-api.124sc8_i0wupz.svg", label: "WebRTC Video & Voice" },
      { icon: "/assets/media/professionals.26noz0r-sqeot.svg", label: "Co-Parent Management" },
    ],
  },
  {
    id: 5,
    title: "AI Reward & Positive Habits",
    description:
      "Transforming parental control from adversarial restriction into positive reinforcement—unlocking reward mini-games when daily targets are met.",
    items: [
      { icon: "/assets/media/energy.3mpiysm5ns4jp.svg", label: "Healthy Habit Streaks" },
      { icon: "/assets/media/cloud.3sharn5600nmt.svg", label: "Flappy Bird & Tic-Tac-Toe" },
      { icon: "/assets/media/service-schedule.43kag2h2c_iwe.svg", label: "Bedtime Automation" },
      { icon: "/assets/media/book-service.1n8g1qif9waan.svg", label: "Parent Approval Flow" },
    ],
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // Header text fades
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

      const pinWrapper = pinWrapperRef.current;
      const cards = cardRefs.current.filter(Boolean);

      if (!pinWrapper || !cards.length || isReduced) return;

      const getTabOffset = () => (window.innerWidth <= 768 ? 16 : 26);

      // Card 0 is in place
      gsap.set(cards[0], { yPercent: 0, y: 0, scale: 1, opacity: 1 });

      // Cards 1..4 start offscreen below the deck and fully hidden
      cards.slice(1).forEach((card) => {
        gsap.set(card, {
          yPercent: 100,
          y: 0,
          scale: 1,
          opacity: 0,
        });
      });

      const tl = gsap.timeline();

      // Transitions for cards 1 to 4
      cards.slice(1).forEach((card, idx) => {
        const step = idx; // 0, 1, 2, 3
        const targetStackY = (step + 1) * getTabOffset();

        // Card slides up from below and settles into the stacked deck
        tl.fromTo(
          card,
          {
            yPercent: 100,
            y: 0,
            opacity: 0,
          },
          {
            yPercent: 0,
            y: targetStackY,
            opacity: 1,
            ease: "power1.out",
            duration: 1,
          },
          step
        );

        // Previous cards scale down slightly to create deck depth
        for (let prev = 0; prev <= step; prev++) {
          tl.to(
            cards[prev],
            {
              scale: 1 - (step + 1 - prev) * 0.018,
              ease: "none",
              duration: 1,
            },
            step
          );
        }
      });

      // Pin the cards wrapper cleanly with ScrollTrigger
      ScrollTrigger.create({
        trigger: pinWrapper,
        start: "top 85px", // Pins 85px from top of viewport, cleanly below fixed header
        end: () => `+=${(cards.length - 1) * 550}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.3,
        animation: tl,
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

  return (
    <section id="features" ref={sectionRef} className="kyntra-container w-full bg-white dark:bg-[#070F0F] text-black dark:text-white !pb-0 !mb-0 transition-colors duration-500">
      <div className="mx-auto pb-0 max-w-400">
        <div className="max-w-[46vw] max-[1025px]:max-w-full">
          <h2
            ref={headingRef}
            className="font-heading leading-[1.12] font-normal tracking-[-0.02em] text-black dark:text-white opacity-0"
          >
            Comprehensive Child Safety Architecture
          </h2>

          <p
            ref={paragraphRef}
            className="text-24 max-[1025px]:pb-[7vh] mt-[1.6vw] max-[1025px]:mt-[6vw] max-w-[32vw] tracking-wide leading-normal text-black/80 dark:text-slate-300 max-[1025px]:max-w-full opacity-0"
          >
            The more ScudoKid understands your child&apos;s digital rhythm, the more effectively it shields them from online hazards and screen addiction.
          </p>
        </div>
      </div>

      {/* Pinned Stacking Cards Deck */}
      <div
        ref={pinWrapperRef}
        className="relative z-10 w-full mt-8 pb-12 motion-reduce:pb-0 bg-white dark:bg-[#070F0F] transition-colors duration-500"
      >
        <div className="relative mx-auto h-[480px] max-[1440px]:h-[450px] max-[1025px]:h-[68vh] max-md:h-[78vh] w-full max-w-400 motion-reduce:h-fit">
          {CARDS.map((card, idx) => (
            <div
              key={card.id}
              ref={(el) => {
                if (el) cardRefs.current[idx] = el;
              }}
              style={{
                zIndex: idx + 1,
                borderRadius: "28px",
                transformOrigin: "top center",
                willChange: "transform, opacity",
              }}
              className="absolute inset-x-0 top-0 flex h-[380px] max-[1440px]:h-[360px] max-[1025px]:h-[60vh] max-md:h-[70vh] flex-col overflow-hidden border px-[2.4vw] py-[2vw] max-[1025px]:py-[3vh] motion-reduce:static motion-reduce:mb-[3vw] motion-reduce:h-fit max-[1025px]:px-[5vw] max-md:px-[6vw] max-md:py-6 bg-white dark:bg-[#0D1818] text-black dark:text-white border-black/15 dark:border-emerald-500/25 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.12)] dark:shadow-[0_15px_35px_-10px_rgba(0,0,0,0.6)] transition-colors duration-500"
            >
              <h3
                className="text-44 font-normal font-heading tracking-[-0.01em] max-[1440px]:text-[2.2vw] max-[1025px]:text-[4.4vw] max-md:text-[6.4vw] max-[1025px]:mb-[3vw] text-[#2D8B8B] dark:text-[#34D399]"
              >
                {card.title}
              </h3>

              <div
                className="my-[1.2vw] max-[1025px]:hidden h-px w-full bg-black/15 dark:bg-white/10"
              />

              <div className="flex pt-[1.5vh] items-start justify-between gap-[3vw] max-[1025px]:min-h-0 max-[1025px]:flex-1 max-[1025px]:flex-col max-[1025px]:gap-[4vw] max-[1025px]:pt-0 max-md:overflow-y-auto max-md:motion-reduce:overflow-y-visible">
                {/* Grid of 4 items */}
                <div className="grid w-[48%] grid-cols-2 gap-y-[1.4vw] max-[1025px]:order-2 max-[1025px]:w-full max-[1025px]:grid-cols-1 max-[1025px]:gap-y-0">
                  {card.items.map((item, itemIdx) => {
                    const isEven = itemIdx % 2 === 0;
                    const isTop = itemIdx < 2;
                    return (
                      <div
                        key={item.label}
                        className={`flex items-center w-[90%] gap-[1.1vw] max-[1025px]:w-[70%] max-[1025px]:gap-[3vw] max-[1025px]:py-[2vw] max-[1025px]:pr-0 max-[1025px]:pl-0 max-md:w-[85%] max-md:gap-[4vw] max-md:py-[2.5vw] border-black/15 dark:border-white/10 ${
                          isEven
                            ? "border-r pr-[2vw] max-[1025px]:border-r-0"
                            : "pl-[2vw] max-[1025px]:border-t"
                        } ${!isTop ? "max-[1025px]:border-t" : ""}`}
                      >
                        <span
                          className="flex size-[3.2vw] shrink-0 items-center justify-center rounded-[0.6vw] max-[1025px]:rounded-md max-[1025px]:size-[6vw] max-md:size-[12vw] max-w-[48px] max-h-[48px] bg-[#2D8B8B] dark:bg-[#164E4D]"
                        >
                          <img
                            alt=""
                            aria-hidden="true"
                            loading="lazy"
                            width={40}
                            height={40}
                            decoding="async"
                            className="w-[2vw] h-auto object-contain max-[1025px]:size-[3vw] max-md:size-[6vw] max-w-[30px]"
                            style={{ color: "transparent" }}
                            src={item.icon}
                          />
                        </span>
                        <span className="text-22 max-[1025px]:text-[3vw] max-md:text-[4.4vw] text-black dark:text-slate-100">
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Right description & Discover More button */}
                <div className="flex w-[40%] flex-col items-start gap-[1.6vw] max-[1025px]:contents">
                  <p className="text-22 w-[90%] leading-relaxed max-[1025px]:order-1 max-[1025px]:w-full max-[1025px]:text-[2.9vw] max-md:text-[4.4vw] text-black/80 dark:text-slate-300">
                    {card.description}
                  </p>

                  <HoverText
                    text="Discover More"
                    href="#how-it-works"
                    showArrow
                    className="text-[1.05vw] max-[1025px]:text-[2.4vw] max-md:text-[4.4vw] text-white"
                    arrowClassName="text-white"
                    containerClassName="rounded-full px-[1.8vw] py-[0.8vw] max-[1025px]:order-3 max-[1025px]:mt-auto max-[1025px]:self-start max-[1025px]:px-[6vw] max-[1025px]:py-[2.6vw] max-md:px-[7vw] max-md:py-[4vw] bg-[#2D8B8B] hover:bg-[#206E6E] text-white"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
