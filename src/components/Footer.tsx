"use client";

import React, { useEffect, useRef } from "react";
import StoreButton from "./ui/StoreButton";
import HoverText from "./ui/HoverText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<HTMLDivElement[]>([]);

  const services = [
    { label: "Parent Web Portal", href: "#ecosystem" },
    { label: "Child Mobile App (APK)", href: "#download-apk", isApk: true },
    { label: "Competitive Comparison", href: "/compare" },
    { label: "Super Admin Panel", href: "#ecosystem" },
    { label: "AI Behavior Engine", href: "#smarter" },
  ];
  const connect = [
    { label: "Anomaly Detection ML", href: "#smarter" },
    { label: "Addiction Scoring (0–100)", href: "#smarter" },
    { label: "UN SDG 3, 4, 10, 16", href: "#stories" },
    { label: "Privacy & Safe Habits", href: "#how-it-works" },
    { label: "System Architecture", href: "#features" },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const els = elementsRef.current.filter(Boolean);
    els.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: isReduced ? 0 : 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.1 + i * 0.04,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    });
  }, []);

  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="footer"
      ref={footerRef}
      className="relative z-20 w-full text-white overflow-hidden bg-[linear-gradient(135deg,#091F1F_0%,#0F3333_35%,#164E4D_70%,#206E6E_100%)] dark:bg-[linear-gradient(135deg,#040D0D_0%,#071616_35%,#0A2221_70%,#0D2F2E_100%)] border-t border-transparent dark:border-emerald-500/15 transition-colors duration-500"
    >
      <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 pt-16 lg:pt-24 pb-10 flex flex-col justify-between">
        {/* Main Grid: 3 Clean Dedicated Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 xl:gap-8 items-center">
          {/* Left Column: Brand, details, buttons */}
          <div className="lg:col-span-4 xl:col-span-4 flex flex-col items-start space-y-5">
            <div
              ref={(el) => {
                if (el) elementsRef.current[0] = el;
              }}
              className="flex items-center gap-3.5"
            >
              <img
                alt="ScudoKid Logo"
                loading="lazy"
                width={56}
                height={56}
                decoding="async"
                className="size-13 sm:size-14 object-contain transition-transform duration-300 hover:scale-105"
                src="/assets/media/scudokid-logo.png"
              />
              <div className="flex flex-col">
                <span className="font-heading text-2xl sm:text-3xl font-bold text-white leading-tight">
                  Scudo<span className="text-[#34D399]">Kid</span>
                </span>
                <span className="text-xs uppercase tracking-widest text-[#A7F3D0] font-semibold">
                  AI Child Safety Ecosystem
                </span>
              </div>
            </div>

            <p
              ref={(el) => {
                if (el) elementsRef.current[1] = el;
              }}
              className="text-sm sm:text-base leading-relaxed text-emerald-50/90 max-w-sm font-normal"
            >
              AI-Driven Comprehensive Child Safety &amp; Monitoring Ecosystem. Designed to protect children through proactive anomaly detection, non-punitive habits, and parental intelligence.
            </p>

            <div className="rounded-2xl bg-white/5 dark:bg-white/[0.04] border border-white/10 p-3.5 max-w-sm backdrop-blur-sm space-y-1">
              <p className="font-semibold text-xs sm:text-sm text-white">Next-Generation Child Safety Platform</p>
              <p className="text-emerald-200/80 text-[11px] sm:text-xs leading-relaxed">
                Proactive AI Behavioral Analysis · Haversine Geo-Fencing · Real-Time Telemetry
              </p>
            </div>

            {/* Store Action Buttons */}
            <div
              ref={(el) => {
                if (el) elementsRef.current[2] = el;
              }}
              className="flex flex-wrap items-center gap-3 pt-1"
            >
              <StoreButton
                store="apk"
                variant="primary"
                href="#download-apk"
                onClick={(e) => {
                  e.preventDefault();
                  // APK not implemented yet - inert click
                }}
              />
              <StoreButton
                store="web"
                variant="light"
                href="#ecosystem"
              />
            </div>
          </div>

          {/* Center Column: Phone Mockup with Native Splash Screen */}
          <div className="lg:col-span-3 xl:col-span-3 flex justify-center items-center my-6 lg:my-0">
            <div className="relative w-[210px] sm:w-[240px] lg:w-[250px] xl:w-[275px] select-none transition-transform duration-500 hover:scale-[1.02]">
              <img
                alt="ScudoKid Child App Splash Screen on Mobile"
                loading="lazy"
                width={600}
                height={900}
                decoding="async"
                className="h-auto w-full object-contain pointer-events-none drop-shadow-[0_25px_35px_rgba(0,0,0,0.55)]"
                src="/assets/media/scudokid-footer-phone.svg"
              />
            </div>
          </div>

          {/* Right Column: Navigation Lists */}
          <div className="lg:col-span-5 xl:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-6 xl:gap-10 sm:justify-items-start lg:justify-items-end">
            {/* ECOSYSTEM */}
            <div className="flex flex-col space-y-4">
              <span className="text-sm font-bold tracking-wider uppercase text-emerald-300">
                Ecosystem
              </span>
              <div className="flex flex-col space-y-2.5">
                {services.map((item, idx) => (
                  <div
                    key={item.label}
                    ref={(el) => {
                      if (el) elementsRef.current[3 + idx] = el;
                    }}
                  >
                    <HoverText
                      text={item.label}
                      href={item.href}
                      onClick={(e) => {
                        if (item.isApk) {
                          e.preventDefault();
                          // APK not implemented yet
                        }
                      }}
                      showLine
                      className="font-body text-sm tracking-wide text-white/90 hover:text-white whitespace-nowrap"
                      containerClassName="text-white whitespace-nowrap"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* RESEARCH & IMPACT */}
            <div className="flex flex-col space-y-4">
              <span className="text-sm font-bold tracking-wider uppercase text-emerald-300">
                Research &amp; Impact
              </span>
              <div className="flex flex-col space-y-2.5">
                {connect.map((item, idx) => (
                  <div
                    key={item.label}
                    ref={(el) => {
                      if (el) elementsRef.current[8 + idx] = el;
                    }}
                  >
                    <HoverText
                      text={item.label}
                      href={item.href}
                      showLine
                      className="font-body text-sm tracking-wide text-white/90 hover:text-white whitespace-nowrap"
                      containerClassName="text-white whitespace-nowrap"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-emerald-100/70">
          <p>© 2026 ScudoKid Child Safety Ecosystem. All Rights Reserved.</p>

          <div>
            <HoverText
              text="Back To Top"
              href="#"
              onClick={handleBackToTop}
              showLine
              className="font-body text-xs sm:text-sm tracking-wide text-emerald-200 hover:text-white"
              containerClassName="text-white"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
