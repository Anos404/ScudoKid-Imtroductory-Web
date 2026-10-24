"use client";

import React, { useEffect, useRef, useState } from "react";
import ArrowButton from "./ui/ArrowButton";
import HoverText from "./ui/HoverText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Article {
  title: string;
  date: string;
  image: string;
}

const ARTICLES: Article[] = [
  {
    title: "Quantifying Digital Addiction with Unsupervised ML & Telemetry",
    date: "October 2026",
    image: "/assets/media/blog1.41sziov0xtki9.webp",
  },
  {
    title: "Why Non-Punitive Child Safety Builds Stronger Family Trust",
    date: "September 2026",
    image: "/assets/media/blog2.2-u2d703v7nxx.webp",
  },
  {
    title: "Sub-45s Geo-Fencing Architecture Using Haversine & WebSockets",
    date: "August 2026",
    image: "/assets/media/blog3.1p2xpkxbs5ocg.webp",
  },
  {
    title: "Democratizing AI Child Safety in Developing Regions: A Field Study",
    date: "July 2026",
    image: "/assets/media/blog4.0c3673g_6n_kt.webp",
  },
  {
    title: "Tackling Alert Fatigue with 3-Tier Event Classification",
    date: "June 2026",
    image: "/assets/media/blog5.18gxpcz4g_jlw.webp",
  },
];

export default function Resources() {
  const [scrollIndex, setScrollIndex] = useState(0);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const allArticlesRef = useRef<HTMLDivElement>(null);
  const arrowsRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const maxIndex = ARTICLES.length - 1;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Fades for section header & buttons
    [headingRef.current, paragraphRef.current, allArticlesRef.current, arrowsRef.current].forEach(
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

    // Rail entrance
    const rail = railRef.current;
    if (rail) {
      if (isReduced || window.innerWidth <= 1025) {
        gsap.set(rail, { xPercent: 0, opacity: 1 });
      } else {
        gsap.fromTo(
          rail,
          { xPercent: 30, opacity: 0 },
          {
            xPercent: 0,
            opacity: 1,
            duration: 1.8,
            ease: "power4.out",
            scrollTrigger: { trigger: rail, start: "top 85%", once: true },
          }
        );
      }
    }
  }, []);

  const handlePrev = () => {
    setScrollIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setScrollIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section
      id="resources"
      className="relative w-full overflow-hidden bg-white py-[7%] text-black max-[1025px]:py-[10%]"
    >
      <div className="px-[5%] max-[1025px]:px-[7%]">
        <h2
          ref={headingRef}
          className="font-heading w-[55vw] text-[3.8vw] leading-[1.1] font-normal tracking-[-0.02em] max-[1025px]:w-full max-[1025px]:text-[6vw] max-md:text-[9vw] opacity-0"
        >
          Research, Papers &amp; Engineering Insights
        </h2>

        <p
          ref={paragraphRef}
          className="text-24 mt-[1.6vw] max-w-[34vw] leading-[1.6] text-black max-[1025px]:mt-[3vw] max-[1025px]:max-w-full max-[1025px]:text-[2.6vw] max-md:text-[4vw] opacity-0"
        >
          Scientific and architectural publications authored for the ScudoKid child safety ecosystem.
        </p>
      </div>

      <div className="mt-[4vw] flex items-stretch gap-[3vw] pl-[5%] max-[1025px]:pl-0 max-[1025px]:mt-[8vw] max-[1025px]:flex-col max-[1025px]:gap-[6vw]">
        {/* Left Column Controls */}
        <div className="flex w-[24%] pb-[2vw] shrink-0 flex-col justify-between max-[1025px]:contents">
          <div ref={allArticlesRef} className="w-fit max-[1025px]:order-1 max-[1025px]:px-[7%] opacity-0">
            <HoverText
              text="All Research"
              href="#"
              className="text-22 tracking-tight max-[1025px]:text-[2.4vw] max-md:text-[3.6vw] text-white"
              containerClassName="w-fit rounded-full max-[1025px]:mb-7 bg-[#2D8B8B] px-[1.8vw] py-[0.7vw] text-white max-[1025px]:px-20 max-[1025px]:py-5"
            />
          </div>

          <div ref={arrowsRef} className="w-fit max-[1025px]:order-3 max-[1025px]:px-[7%] opacity-0">
            <div className="flex items-center gap-[0.8vw] max-[1025px]:gap-3">
              <ArrowButton
                direction="prev"
                onClick={handlePrev}
                disabled={scrollIndex === 0}
              />
              <ArrowButton
                direction="next"
                onClick={handleNext}
                disabled={scrollIndex >= maxIndex - 1}
              />
            </div>
          </div>
        </div>

        {/* Right Carousel Track */}
        <div ref={railRef} className="relative min-w-0 flex-1 max-[1025px]:order-2">
          <div className="w-full overflow-hidden">
            <div
              ref={containerRef}
              className="flex w-full select-none cursor-grab active:cursor-grabbing pr-[5%] max-[1025px]:px-[7%] gap-[1.5vw] max-[1025px]:gap-[3.5vw] max-md:gap-[5vw] transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{
                transform: `translateX(-${scrollIndex * 31.5}vw)`,
                touchAction: "pan-y",
              }}
            >
              {ARTICLES.map((article) => (
                <div key={article.title} className="shrink-0">
                  <article className="group relative h-[34vw] overflow-hidden w-[30vw] shrink-0 rounded-[1.4vw] max-[1025px]:h-[52vw] max-[1025px]:w-[42vw] max-md:h-[110vw] max-md:w-[82vw] max-md:rounded-[4vw] cursor-pointer">
                    <img
                      alt={article.title}
                      draggable={false}
                      loading="lazy"
                      decoding="async"
                      className="object-cover rounded-lg overflow-hidden transition-transform duration-700 ease-out group-hover:scale-105"
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
                      src={article.image}
                    />

                    {/* Bottom overlay panel */}
                    <div className="absolute inset-x-0 bottom-0 rounded-t-lg bg-black/40 px-[1.8vw] py-[1.6vw] backdrop-blur-md max-md:px-[6vw] max-md:py-[6vw] transition-all duration-500 transform translate-y-[35%] group-hover:translate-y-0">
                      <h3 className="w-[90%] text-30 leading-[1.2] font-normal text-white max-[1025px]:text-[3vw] max-md:text-[6vw]">
                        {article.title}
                      </h3>

                      <p className="text-18 mt-[0.9vw] text-white/70 max-md:mt-[3vw]">
                        {article.date}
                      </p>

                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <HoverText
                          text="Read Article"
                          href="#"
                          showLine
                          className="text-22 tracking-tight text-white max-[1025px]:text-[3vw]"
                          containerClassName="mt-[1.4vw] text-white max-md:mt-[5vw]"
                        />
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
