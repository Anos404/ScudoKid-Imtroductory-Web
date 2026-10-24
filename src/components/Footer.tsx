"use client";

import React, { useEffect, useRef, useState } from "react";
import StoreButton from "./ui/StoreButton";
import HoverText from "./ui/HoverText";
import ApkDownloadModal from "./ApkDownloadModal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<HTMLDivElement[]>([]);
  const [downloadHover, setDownloadHover] = useState(false);

  const [apkModalOpen, setApkModalOpen] = useState(false);

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
    // Listen for download hover events dispatched from CTA or elsewhere
    const handleCustomHover = (e: Event) => {
      const customEvent = e as CustomEvent<boolean>;
      setDownloadHover(Boolean(customEvent.detail));
    };
    window.addEventListener("scudo-download-hover", handleCustomHover);
    return () => window.removeEventListener("scudo-download-hover", handleCustomHover);
  }, []);

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
      className="relative z-20 w-full text-white overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0D2626 0%, #163E3E 35%, #1F5A5A 70%, #2D8B8B 100%)",
      }}
    >
      <div className="relative flex min-h-[85vh] w-full flex-col justify-between px-[5%] pt-[6vw] pb-[2.5vw] max-[1025px]:min-h-0 max-[1025px]:h-auto max-[1025px]:px-[7%] max-[1025px]:pt-[12vw] max-[1025px]:pb-0 max-md:pt-[16vw]">
        {/* Hands animation + phone mockup */}
        <div
          className="absolute bottom-0 left-1/2 w-[22vw] -translate-x-1/2 z-10 cursor-pointer max-[1025px]:static max-[1025px]:left-auto max-[1025px]:order-3 max-[1025px]:mt-[12vw] max-[1025px]:mb-0 max-[1025px]:w-[55vw] max-[1025px]:translate-x-0 max-[1025px]:self-center max-md:w-[72vw]"
          onMouseEnter={() => setDownloadHover(true)}
          onMouseLeave={() => setDownloadHover(false)}
        >
          <div className="relative w-full">
            <img
              alt="ScudoKid Child App with Active Protection and SOS"
              loading="lazy"
              width={600}
              height={900}
              decoding="async"
              className="h-auto w-full object-contain select-none pointer-events-none drop-shadow-2xl"
              style={{ color: "transparent" }}
              src="/assets/media/scudokid-footer-phone.svg"
            />

            {/* Hands wrapper */}
            <div className="absolute inset-0 pointer-events-none overflow-visible">
              {/* Left Hand */}
              <svg
                className={`absolute w-[56%] top-[34%] -left-[24%] transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                  downloadHover
                    ? "translate-x-[56%] -translate-y-[6%] rotate-[18deg]"
                    : "translate-x-0 translate-y-0 rotate-[-12deg]"
                }`}
                style={{
                  filter: "drop-shadow(0 12px 20px rgba(0,0,0,0.35))",
                  transformOrigin: "20% 50%",
                }}
                viewBox="0 0 180 140"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="skinL" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FED7AA" />
                    <stop offset="100%" stopColor="#FDBA74" />
                  </linearGradient>
                  <linearGradient id="sleeveL" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0F172A" />
                    <stop offset="100%" stopColor="#1E293B" />
                  </linearGradient>
                </defs>
                <path d="M 0 52 L 42 42 Q 48 40 52 46 L 48 98 Q 44 104 38 102 L 0 92 Z" fill="url(#sleeveL)" />
                <path d="M 40 42 C 45 40 50 44 52 48 L 48 96 C 46 102 42 104 38 102" stroke="#475569" strokeWidth="2.5" fill="none" />
                <path d="M 48 48 C 62 46 82 43 100 46 C 110 48 116 56 118 65 L 118 84 C 116 93 105 99 92 98 C 76 97 60 96 46 94 Z" fill="url(#skinL)" />
                <path d="M 85 48 C 89 34 95 24 105 21 C 112 19 118 24 116 32 C 114 39 107 45 102 49 Z" fill="url(#skinL)" stroke="#FB923C" strokeWidth="1.5" />
                <path d="M 114 54 C 128 52 144 52 154 56 C 160 59 160 65 154 69 C 144 73 128 72 116 70 Z" fill="url(#skinL)" stroke="#FB923C" strokeWidth="1.5" />
                <path d="M 116 68 C 130 67 148 67 158 71 C 164 74 163 80 157 83 C 146 86 130 84 116 82 Z" fill="url(#skinL)" stroke="#FB923C" strokeWidth="1.5" />
                <path d="M 114 80 C 127 79 142 80 151 84 C 156 87 156 92 150 95 C 140 98 126 96 113 93 Z" fill="url(#skinL)" stroke="#FB923C" strokeWidth="1.5" />
                <path d="M 108 92 C 120 92 134 94 142 98 C 147 101 146 105 141 107 C 132 110 119 107 107 102 Z" fill="url(#skinL)" stroke="#FB923C" strokeWidth="1.5" />
              </svg>

              {/* Right Hand */}
              <svg
                className={`absolute w-[56%] top-[34%] -right-[24%] transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                  downloadHover
                    ? "-translate-x-[56%] -translate-y-[6%] rotate-[-18deg]"
                    : "translate-x-0 translate-y-0 rotate-[12deg]"
                }`}
                style={{
                  filter: "drop-shadow(0 12px 20px rgba(0,0,0,0.35))",
                  transformOrigin: "80% 50%",
                }}
                viewBox="0 0 180 140"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="skinR" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FED7AA" />
                    <stop offset="100%" stopColor="#FDBA74" />
                  </linearGradient>
                  <linearGradient id="sleeveR" x1="100%" y1="0%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#0F172A" />
                    <stop offset="100%" stopColor="#1E293B" />
                  </linearGradient>
                </defs>
                <path d="M 180 52 L 138 42 Q 132 40 128 46 L 132 98 Q 136 104 142 102 L 180 92 Z" fill="url(#sleeveR)" />
                <path d="M 140 42 C 135 40 130 44 128 48 L 132 96 C 134 102 138 104 142 102" stroke="#475569" strokeWidth="2.5" fill="none" />
                <path d="M 132 48 C 118 46 98 43 80 46 C 70 48 64 56 62 65 L 62 84 C 64 93 75 99 88 98 C 104 97 120 96 134 94 Z" fill="url(#skinR)" />
                <path d="M 95 48 C 91 34 85 24 75 21 C 68 19 62 24 64 32 C 66 39 73 45 78 49 Z" fill="url(#skinR)" stroke="#FB923C" strokeWidth="1.5" />
                <path d="M 66 54 C 52 52 36 52 26 56 C 20 59 20 65 26 69 C 36 73 52 72 64 70 Z" fill="url(#skinR)" stroke="#FB923C" strokeWidth="1.5" />
                <path d="M 64 68 C 50 67 32 67 22 71 C 16 74 17 80 23 83 C 34 86 50 84 64 82 Z" fill="url(#skinR)" stroke="#FB923C" strokeWidth="1.5" />
                <path d="M 66 80 C 53 79 38 80 29 84 C 24 87 24 92 30 95 C 40 98 54 96 67 93 Z" fill="url(#skinR)" stroke="#FB923C" strokeWidth="1.5" />
                <path d="M 72 92 C 60 92 46 94 38 98 C 33 101 34 105 39 107 C 48 110 61 107 73 102 Z" fill="url(#skinR)" stroke="#FB923C" strokeWidth="1.5" />
              </svg>

              {/* Sparkles / Celebration burst when joined */}
              <div
                className={`absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                  downloadHover ? "scale-100 opacity-100 delay-150" : "scale-0 opacity-0 pointer-events-none"
                }`}
              >
                <svg width="70" height="70" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="30" fill="#FDE047" fillOpacity="0.3" filter="blur(6px)" />
                  <path d="M 50 18 Q 50 45 23 50 Q 50 55 50 82 Q 50 55 77 50 Q 50 45 50 18 Z" fill="#FACC15" />
                  <path d="M 74 22 Q 74 30 66 33 Q 74 36 74 44 Q 74 36 82 33 Q 74 30 74 22 Z" fill="#FEF08A" />
                  <path d="M 26 62 Q 26 70 18 73 Q 26 76 26 84 Q 26 76 34 73 Q 26 70 26 62 Z" fill="#FEF08A" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Upper footer links & logo */}
        <div className="relative flex justify-between gap-[4vw] max-[1025px]:order-1 max-[1025px]:flex-col max-[1025px]:gap-[12vw]">
          {/* Left column */}
          <div className="flex w-[38vw] flex-col max-[1025px]:w-full">
            <div
              ref={(el) => {
                if (el) elementsRef.current[0] = el;
              }}
              className="flex items-center gap-3"
            >
              <div className="relative overflow-hidden rounded-xl bg-white p-1.5 shadow-lg">
                <img
                  alt="ScudoKid Logo"
                  loading="lazy"
                  width={52}
                  height={52}
                  decoding="async"
                  className="h-[3.2vw] w-auto max-[1025px]:h-[7.5vw] max-md:h-[10vw] object-contain rounded-lg"
                  src="/assets/media/scudokid-logo.jpg"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-[1.8vw] font-bold text-white max-[1025px]:text-[4.2vw] max-md:text-[5.5vw] leading-tight">
                  Scudo<span className="text-[#34D399]">Kid</span>
                </span>
                <span className="text-[0.65vw] max-[1025px]:text-[1.8vw] max-md:text-[2.2vw] uppercase tracking-wider text-[#A7F3D0] font-medium">
                  AI Child Safety Ecosystem
                </span>
              </div>
            </div>

            <p
              ref={(el) => {
                if (el) elementsRef.current[1] = el;
              }}
              className="text-24 mt-[1.6vw] w-[30vw] leading-normal text-white/90 max-[1025px]:mt-[4vw] max-[1025px]:w-[80vw] max-[1025px]:text-[2.8vw] max-md:w-full max-md:text-[4vw]"
            >
              AI-Driven Comprehensive Child Safety &amp; Monitoring Ecosystem. Designed to protect children through proactive anomaly detection, non-punitive habits, and parental intelligence.
            </p>

            <div className="mt-[1.2vw] text-[1.05vw] text-[#A7F3D0] font-medium max-[1025px]:text-[2.4vw] max-md:text-[3.5vw] leading-relaxed">
              <p className="font-semibold text-white">Next-Generation Child Safety Platform</p>
              <p className="text-white/80 text-[0.9vw] max-[1025px]:text-[2vw] max-md:text-[3vw] mt-0.5">
                Proactive AI Behavioral Analysis · Haversine Geo-Fencing · Real-Time Telemetry
              </p>
            </div>

            <div
              ref={(el) => {
                if (el) elementsRef.current[2] = el;
              }}
              className="mt-[2vw] flex gap-3 max-[1025px]:mt-[6vw] max-[1025px]:flex-col max-[1025px]:items-start max-[1025px]:gap-3 max-md:gap-3 relative z-10"
              onMouseEnter={() => setDownloadHover(true)}
              onMouseLeave={() => setDownloadHover(false)}
            >
              <StoreButton
                store="apk"
                variant="primary"
                scale={0.85}
                href="#download-apk"
                onClick={(e) => {
                  e.preventDefault();
                  setApkModalOpen(true);
                }}
              />
              <StoreButton
                store="web"
                variant="light"
                scale={0.85}
                href="#ecosystem"
              />
            </div>
          </div>

          {/* Right navigation lists */}
          <div className="flex gap-[7vw] max-[1025px]:flex max-[1025px]:justify-between max-[1025px]:w-full max-[1025px]:grid-cols-2 max-[1025px]:gap-x-[4vw] max-[1025px]:gap-y-0">
            {/* ECOSYSTEM */}
            <div className="flex flex-col">
              <span className="text-22 tracking-wide text-white font-bold max-[1025px]:text-[2.8vw] max-md:text-[5vw]!">
                ECOSYSTEM
              </span>
              <div className="mt-[1.4vw] flex flex-col gap-[0.3vw] max-[1025px]:mt-[4vw] max-[1025px]:gap-[2.5vw]">
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
                          setApkModalOpen(true);
                        }
                      }}
                      showLine
                      className="font-body text-22 tracking-wide max-[1025px]:text-[2.8vw] max-md:text-[4vw] text-white"
                      containerClassName="text-white"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* RESEARCH & IMPACT */}
            <div className="flex flex-col">
              <span className="text-22 tracking-wide text-white font-bold max-[1025px]:text-[2.8vw] max-md:text-[5vw]!">
                RESEARCH &amp; IMPACT
              </span>
              <div className="mt-[1.4vw] flex flex-col gap-[0.3vw] max-[1025px]:mt-[4vw] max-[1025px]:gap-[2.5vw]">
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
                      className="font-body text-22 tracking-wide max-[1025px]:text-[2.8vw] max-md:text-[4vw] text-white"
                      containerClassName="text-white"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="relative flex items-end justify-between max-[1025px]:order-2 max-[1025px]:mt-[14vw] max-[1025px]:items-start">
          <p className="text-22 text-white/90 max-[1025px]:text-[2.8vw] max-md:text-[4vw]">
            © 2026 ScudoKid Child Safety Ecosystem. All Rights Reserved.
          </p>

          <div>
            <HoverText
              text="Back To Top"
              href="#"
              onClick={handleBackToTop}
              showLine
              className="font-body text-22 tracking-tight max-[1025px]:text-[2.6vw] max-md:text-[3.6vw] text-white"
              containerClassName="text-white"
            />
          </div>
        </div>
      </div>

      {/* APK Modal */}
      <ApkDownloadModal
        isOpen={apkModalOpen}
        onClose={() => setApkModalOpen(false)}
      />
    </footer>
  );
}
