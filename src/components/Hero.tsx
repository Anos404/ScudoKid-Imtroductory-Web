"use client";

import React, { useEffect, useRef, useState } from "react";
import StoreButton from "./ui/StoreButton";
import ApkDownloadModal from "./ApkDownloadModal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Hero() {
  const [apkModalOpen, setApkModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const storeGoogleRef = useRef<HTMLDivElement>(null);
  const storeAppleRef = useRef<HTMLDivElement>(null);
  const ratingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Background gradient fade-in
    if (gradientRef.current) {
      gsap.to(gradientRef.current, {
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
      });
    }

    // Mockup entrance animation
    if (mockupRef.current) {
      gsap.fromTo(
        mockupRef.current,
        { yPercent: isReduced ? 0 : 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: isReduced ? 0.4 : 1.3,
          ease: isReduced ? "linear" : "power3.out",
        }
      );
    }

    // Mockup parallax scroll
    if (innerRef.current && sectionRef.current && !isReduced) {
      gsap.to(innerRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.2,
        },
      });
    }

    // Text reveals
    const textEls = [
      { el: headingRef.current, delay: 0.4, y: 30 },
      { el: paragraphRef.current, delay: 0.55, y: 25 },
      { el: storeGoogleRef.current, delay: 0.7, y: 20 },
      { el: storeAppleRef.current, delay: 0.8, y: 20 },
      { el: ratingRef.current, delay: 0.9, y: 15 },
    ];

    textEls.forEach(({ el, delay, y }) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: isReduced ? 0 : y },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
        }
      );
    });
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="kyntra-hero relative min-h-screen h-full w-full bg-white overflow-hidden"
      >
        {/* Background gradient & giant logo watermark */}
        <div className="pointer-events-none absolute inset-0">
          <div
            ref={gradientRef}
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[115vh] max-[1025px]:h-[105vh] opacity-0"
            style={{ willChange: "opacity" }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(180deg,#000000_0%,#000000_18%,#081C1B_32%,#0F3836_46%,#164E4D_60%,#206E6E_72%,#2D8B8B_84%,#E2F3F1_94%,#ffffff_100%)]" />
          </div>
          <img
            alt="ScudoKid"
            fetchPriority="high"
            loading="eager"
            width={1752}
            height={349}
            decoding="async"
            className="absolute left-1/2 top-[24vh] max-[1025px]:top-[12vh] w-[92vw] max-w-400 -translate-x-1/2 select-none"
            style={{ color: "transparent" }}
            src="/assets/media/scudokid-hero-watermark.svg"
          />
        </div>

        <div className="relative z-10 mx-auto flex min-h-screen max-w-400 items-center gap-[10vw] px-[5vw] pb-[8vh] pt-[36vh] max-[1025px]:flex-col-reverse max-[1025px]:items-start max-[1025px]:justify-end max-[1025px]:gap-[8vw] max-[1025px]:px-[7vw] max-[1025px]:pb-12 max-[1025px]:pt-[18vh] max-md:gap-8">
          {/* Left phone mockup */}
          <div className="flex w-[33%] shrink-0 justify-center max-[1025px]:w-full max-md:w-full">
            <div
              ref={mockupRef}
              className="ml-20 h-auto w-[25vw] will-change-transform max-[1025px]:ml-0 max-[1025px]:w-[58vw] max-md:w-[74vw] max-w-[340px]"
            >
              <div ref={innerRef} className="will-change-transform">
                <img
                  alt="ScudoKid child mobile app with Active Protection and healthy habit streaks"
                  fetchPriority="high"
                  loading="eager"
                  width={884}
                  height={1779}
                  decoding="async"
                  className="h-auto w-full object-contain drop-shadow-2xl"
                  style={{ color: "transparent" }}
                  src="/assets/media/scudokid-hero-phone.svg"
                />
              </div>
            </div>
          </div>

          {/* Right content */}
          <div className="flex w-[60%] flex-col gap-[3vw] pt-[26vh] max-[1025px]:w-full max-[1025px]:gap-[5vw] max-[1025px]:pt-0 max-[1025px]:text-left max-md:gap-5">
            <h1
              ref={headingRef}
              className="font-heading max-[1025px]:leading-[1.2] text-black max-[1025px]:mx-0 max-[1025px]:text-white max-md:max-w-none opacity-0"
            >
              AI Protection for
              <br />
              Every Child&apos;s World
            </h1>

            <p
              ref={paragraphRef}
              className="w-[30vw] text-22 leading-[1.6] max-[1025px]:leading-[1.7] tracking-wide text-black max-[1025px]:mx-0 max-[1025px]:w-full max-[1025px]:max-w-[85%] max-[1025px]:text-white max-md:max-w-none opacity-0"
            >
              ScudoKid is an introductory child safety ecosystem featuring a real-time Android Child Mobile App, proactive AI risk scoring, and a complete Parent Web Portal.
            </p>

            <div className="space-y-[1.2vw] mt-[-1vh] max-[1025px]:w-full max-[1025px]:space-y-4 max-md:space-y-4">
              <div className="flex flex-wrap items-center gap-3.5 max-[1025px]:w-full max-[1025px]:flex-row max-[1025px]:gap-3 max-md:flex-col max-md:items-stretch">
                <div ref={storeGoogleRef} className="opacity-0">
                  <StoreButton
                    store="apk"
                    variant="primary"
                    href="#download-apk"
                    onClick={(e) => {
                      e.preventDefault();
                      setApkModalOpen(true);
                    }}
                  />
                </div>

                <div ref={storeAppleRef} className="opacity-0">
                  <StoreButton
                    store="web"
                    variant="light"
                    href="#ecosystem"
                  />
                </div>
              </div>

              <div
                ref={ratingRef}
                className="flex items-center gap-2 text-20 text-black max-[1025px]:justify-start max-[1025px]:text-white opacity-0"
              >
                <span className="text-[#10B981] font-semibold">4.9 ★ </span>
                <span className="text-20 text-black max-[1025px]:text-white">
                  AI-Driven Child Safety &amp; Monitoring ·{" "}
                  <span className="font-semibold text-black max-[1025px]:text-white">Next-Gen Family Protection</span> · 2026
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive APK Download Modal */}
      <ApkDownloadModal
        isOpen={apkModalOpen}
        onClose={() => setApkModalOpen(false)}
      />
    </>
  );
}
