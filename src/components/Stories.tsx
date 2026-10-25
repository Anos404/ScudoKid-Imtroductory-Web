"use client";

import React, { useEffect, useRef, useState } from "react";
import ArrowButton from "./ui/ArrowButton";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Story {
  name: string;
  meta: string;
  quote: string;
  image: string;
}

const STORIES: Story[] = [
  {
    name: "Sarah Jenkins",
    meta: "Parent of 2 · Early ScudoKid Pilot Family",
    quote:
      "“The non-punitive approach completely transformed our household dynamic. Instead of fighting over hard screen locks, my 10-year-old takes pride in maintaining his 6-day habit streak to earn his Flappy Bird mini-game rewards.”",
    image: "/assets/media/sarah.421om4_1rin5r.webp",
  },
  {
    name: "Dr. Farooq Ahmed",
    meta: "Educational Researcher & Parent",
    quote:
      "“The Isolation Forest anomaly model is remarkably accurate. When my son experienced an unexpected spike in late-night gaming, ScudoKid gently flagged the deviation without throwing false alarms or causing alert fatigue.”",
    image: "/assets/media/james.3q2ap-0j9ziko.webp",
  },
  {
    name: "Ayesha Siddiqui",
    meta: "Working Mother of 3 · Karachi Pilot",
    quote:
      "“The one-tap SOS feature gives me peace of mind every single day. Knowing my daughter can broadcast her exact live GPS location to both parents in under 45 seconds with Twilio SMS backup is invaluable.”",
    image: "/assets/media/priya.2x66i3s4enqsw.webp",
  },
  {
    name: "Dr. Tariq Memon",
    meta: "Academic Advisor · Child AI Research",
    quote:
      "“ScudoKid proves that sophisticated AI child safety shouldn't be a privilege limited to high-income nations. It is tailored for accessibility, robust privacy, and genuine trust between parent and child.”",
    image: "/assets/media/daniel.2nbusuabhs95u.webp",
  },
  {
    name: "Marcus Vance",
    meta: "Father of 2 · Co-Parenting User",
    quote:
      "“Managing geofences and viewing Gemini's plain-language weekly summaries has replaced hours of deciphering raw usage logs. The web portal gives both parents full visibility in one click.”",
    image: "/assets/media/marcus.3kzcdjovw68uj.webp",
  },
];

export default function Stories() {
  const [current, setCurrent] = useState(0);
  const [stripIndex, setStripIndex] = useState(1);
  const zCounterRef = useRef(1);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const stripWrapperRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  const imageRefs = useRef<HTMLDivElement[]>([]);
  const textRefs = useRef<HTMLDivElement[]>([]);

  const D = STORIES.length;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Fades for section header & cards
    [headingRef.current, paragraphRef.current, cardRef.current, stripWrapperRef.current].forEach(
      (el) => {
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
      }
    );
  }, []);

  const goTo = (index: number) => {
    const next = ((index % D) + D) % D;
    if (next === current) return;

    const prev = current;
    setCurrent(next);
    setStripIndex(index);

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clipActive = "inset(0%)";
    const clipIdle = "inset(50%)";

    const nextImg = imageRefs.current[next];
    const prevText = textRefs.current[prev];
    const nextText = textRefs.current[next];

    if (isReduced) {
      imageRefs.current.forEach((im, i) => {
        if (im) im.style.clipPath = i === next ? clipActive : clipIdle;
      });
      textRefs.current.forEach((t, i) => {
        if (t) t.style.opacity = i === next ? "1" : "0";
      });
      return;
    }

    if (nextImg) {
      zCounterRef.current++;
      gsap.set(nextImg, { zIndex: zCounterRef.current, clipPath: clipIdle, autoAlpha: 1 });
      gsap.to(nextImg, {
        clipPath: clipActive,
        duration: 0.6,
        ease: "power2.inOut",
        overwrite: "auto",
      });
    }

    if (prevText) {
      gsap.to(prevText, { autoAlpha: 0, duration: 0.24, ease: "power2.in" });
    }

    if (nextText) {
      gsap.fromTo(
        nextText,
        { autoAlpha: 0, y: 15 },
        { autoAlpha: 1, y: 0, duration: 0.5, delay: 0.24, ease: "power3.out", overwrite: "auto" }
      );
    }
  };

  return (
    <section
      id="stories"
      className="relative w-full overflow-hidden bg-white dark:bg-[#070F0F] py-[7%] text-black dark:text-white max-[1025px]:py-[20%] transition-colors duration-500"
    >
      <div className="pl-[5%] max-[1025px]:px-[7%]">
        <h2
          ref={headingRef}
          className="font-heading w-[48vw] text-[3.8vw] leading-[1.1] font-normal tracking-[-0.02em] max-[1025px]:w-[82%] max-[1025px]:text-[6vw] max-md:text-[9vw] text-black dark:text-white opacity-0"
        >
          Real Families. Proven Digital Wellness.
        </h2>

        <p
          ref={paragraphRef}
          className="text-24 mt-[1.6vw] max-w-[42vw] tracking-wide leading-[1.6] text-black/80 dark:text-slate-300 max-[1025px]:mt-[6vw] max-[1025px]:max-w-full max-[1025px]:text-[2.6vw] max-md:text-[4vw] opacity-0"
        >
          Discover how ScudoKid&apos;s proactive AI models and trust-first safety architecture empower parents and children every day.
        </p>
      </div>

      <div className="mt-[4vw] max-[1025px]:mt-[12vw] grid grid-cols-[minmax(0,1fr)_36vw] pl-[5%] max-[1025px]:px-[7%] items-start gap-[1.5vw] max-[1025px]:grid-cols-1 max-[1025px]:gap-[8vw]">
        {/* Main testimonial card */}
        <div
          ref={cardRef}
          className="border-[#2D8B8B] dark:border-emerald-500/30 bg-white dark:bg-[#0D1818] shadow-xl dark:shadow-[0_15px_35px_rgba(0,0,0,0.6)] relative min-h-[23.5vw] overflow-hidden rounded-[1.6vw] border px-[3vw] py-[3.2vw] max-[1025px]:min-h-0 max-md:rounded-[5vw] max-md:p-[7vw] opacity-0 transition-colors duration-500"
        >
          <div className="flex items-start gap-[2.6vw] max-[1025px]:flex-col max-[1025px]:gap-[5vw] max-md:gap-[6vw]">
            {/* Square image stack */}
            <div className="relative aspect-square w-[18vw] shrink-0 overflow-hidden rounded-[1.1vw] max-[1025px]:w-[30vw] max-[1025px]:rounded-[2.5vw] max-md:w-[45vw] max-md:rounded-[4vw]">
              {STORIES.map((s, idx) => (
                <div
                  key={s.name}
                  ref={(el) => {
                    if (el) imageRefs.current[idx] = el;
                  }}
                  className="absolute inset-0"
                  style={{
                    clipPath: idx === 0 ? "inset(0%)" : "inset(50%)",
                    zIndex: idx === 0 ? 1 : 0,
                    willChange: "clip-path",
                  }}
                >
                  <img
                    alt={s.name}
                    draggable={false}
                    loading="lazy"
                    decoding="async"
                    className="object-cover grayscale"
                    style={{
                      position: "absolute",
                      height: "100%",
                      width: "100%",
                      left: 0,
                      top: 0,
                      right: 0,
                      bottom: 0,
                      color: "transparent",
                    }}
                    src={s.image}
                  />
                </div>
              ))}
            </div>

            {/* Testimonial Quote & Author */}
            <div className="relative flex flex-1 flex-col justify-start">
              <svg
                className="h-auto w-16"
                width="79"
                height="59"
                viewBox="0 0 79 59"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M60.5663 58.4512C70.7473 58.4512 79.0005 50.1957 79.0005 40.0111C79.0005 29.8302 70.7473 21.5747 60.5663 21.5747C60.5663 21.5747 60.6555 14.7251 66.2201 4.86679C66.8382 2.89148 65.7364 0.787945 63.7598 0.173382C62.3574 -0.267754 60.8817 0.161037 59.9288 1.15918C47.1337 15.1539 42.1252 31.6248 42.1252 40.0111C42.1252 50.1957 50.3783 58.4512 60.5663 58.4512Z"
                  fill="#2D8B8B"
                />
                <path
                  d="M18.4413 58.4512C28.6223 58.4512 36.8755 50.1955 36.8755 40.0111C36.8755 29.8302 28.6223 21.5747 18.4413 21.5747C18.4413 21.5747 18.5305 14.7251 24.0951 4.86679C24.7132 2.89148 23.6112 0.787949 21.6348 0.173386C20.2324 -0.26775 18.7567 0.161041 17.8039 1.15919C5.0087 15.1539 6.86646e-05 31.6248 6.86646e-05 40.0111C6.86646e-05 50.1957 8.25326 58.4512 18.4413 58.4512Z"
                  fill="#2D8B8B"
                />
              </svg>

              <div className="relative mt-[1.4vw] max-md:mt-[5vw]">
                {/* Spacer for heights */}
                <div aria-hidden="true" className="invisible">
                  <p className="text-24 leading-[1.4] text-black dark:text-slate-200 max-[1025px]:text-[2.4vw] max-md:text-[4vw]">
                    {STORIES[0].quote}
                  </p>
                  <p className="mt-[1.6vw] text-[1.55vw] max-[1025px]:text-[2.6vw] max-md:mt-[6vw] max-md:text-[4.4vw]">
                    {STORIES[0].name}
                  </p>
                  <p className="text-22 mt-[0.1vw] max-[1025px]:text-[2vw] max-md:text-[3.6vw]">
                    {STORIES[0].meta}
                  </p>
                </div>

                {/* Animated absolute blocks */}
                {STORIES.map((s, idx) => (
                  <div
                    key={s.name}
                    ref={(el) => {
                      if (el) textRefs.current[idx] = el;
                    }}
                    className="absolute inset-x-0 top-0"
                    style={{
                      opacity: idx === 0 ? 1 : 0,
                      visibility: idx === 0 ? "visible" : "hidden",
                    }}
                  >
                    <p className="text-24 leading-[1.4] text-black dark:text-slate-200 max-[1025px]:text-[2.4vw] max-md:text-[4vw]">
                      {s.quote}
                    </p>
                    <p className="mt-[1.6vw] text-[1.55vw] text-[#2D8B8B] dark:text-[#34D399] font-bold max-[1025px]:text-[4vw] max-md:mt-[6vw] max-md:text-[5vw]">
                      {s.name}
                    </p>
                    <p className="mt-[0.1vw] text-22 text-black/70 dark:text-slate-400 max-[1025px]:text-[2vw] max-md:text-[3.6vw]">
                      {s.meta}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right controls & avatar strip */}
        <div className="flex w-full flex-col items-end gap-[2vw] max-[1025px]:items-start">
          <div className="pr-[7vw] max-[1025px]:pr-0">
            <div className="flex items-center gap-[0.8vw] max-[1025px]:gap-3">
              <ArrowButton direction="prev" onClick={() => goTo(current - 1)} />
              <ArrowButton direction="next" onClick={() => goTo(current + 1)} />
            </div>
          </div>

          {/* Avatar Strip Carousel */}
          <div
            ref={stripWrapperRef}
            style={{
              ["--exp-bleed-desktop" as string]: "min(calc(13vw * 0.4 + 1.6vw), 1.5vw)",
              ["--exp-bleed-tablet" as string]: "min(calc(25vw * 0.4 + 1.6vw), 1.5vw)",
              ["--exp-bleed-mobile" as string]: "min(calc(26vw * 0.4 + 3vw), 1.5vw)",
            }}
            className="exp-clip -ml-(--exp-bleed) w-[calc(100%+var(--exp-bleed))] overflow-hidden [--exp-bleed:var(--exp-bleed-desktop)] max-[1025px]:hidden [--exp-bleed:var(--exp-bleed-tablet)] max-md:[--exp-bleed:var(--exp-bleed-mobile)] opacity-0"
          >
            <div className="w-full">
              <div
                ref={stripRef}
                className="flex w-full select-none cursor-grab active:cursor-grabbing exp-strip will-change-transform"
                style={{
                  transform: `translateX(-${current * 14.6}vw)`,
                  transition: "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
                }}
              >
                {[...STORIES, ...STORIES].map((s, idx) => {
                  const storyIndex = idx % D;
                  const isCurrent = storyIndex === current;
                  return (
                    <div
                      key={idx}
                      onClick={() => goTo(storyIndex)}
                      className="shrink-0 cursor-pointer"
                    >
                      <div className="pr-[1.6vw] max-md:pr-[3vw]">
                        <div
                          aria-hidden="true"
                          className={`relative block aspect-square w-[13vw] overflow-hidden rounded-[1vw] max-[1025px]:w-[25vw] max-md:w-[26vw] max-md:rounded-[3vw] transition-opacity duration-500 ${
                            isCurrent ? "opacity-0" : "opacity-100 hover:opacity-80"
                          }`}
                        >
                          <img
                            alt={s.name}
                            draggable={false}
                            loading="lazy"
                            decoding="async"
                            className="object-cover"
                            style={{
                              position: "absolute",
                              height: "100%",
                              width: "100%",
                              left: 0,
                              top: 0,
                              right: 0,
                              bottom: 0,
                              color: "transparent",
                            }}
                            src={s.image}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
