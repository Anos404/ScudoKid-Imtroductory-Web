"use client";

import React, { useEffect, useRef, useState } from "react";
import ApkDownloadModal from "./ApkDownloadModal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Cta() {
  const [apkModalOpen, setApkModalOpen] = useState(false);
  const btnWrapRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    [headingRef.current, btnWrapRef.current, subtextRef.current].forEach((el) => {
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
  }, []);

  return (
    <>
      <section
        id="cta"
        className="relative flex min-h-[70vh] w-full flex-col items-center justify-center bg-[#F7FAF9] px-[5%] py-20 text-center border-t border-[#DCE6E4]"
      >
        <div className="mx-auto max-w-4xl space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#E2F3F1] border border-[#2D8B8B]/30 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1A4F4F]">
            Get Started with ScudoKid
          </span>

          <h2
            ref={headingRef}
            className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight opacity-0"
          >
            Empower Your Family with Proactive Child Safety
          </h2>

          <p
            ref={subtextRef}
            className="mx-auto max-w-2xl text-base sm:text-lg text-gray-600 leading-relaxed opacity-0"
          >
            Download the Android Child Mobile App APK or launch the Parent Web Portal demo to experience proactive AI risk scoring, real-time geo-fencing, and positive habit rewards.
          </p>

          <div
            ref={btnWrapRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 opacity-0"
          >
            {/* Primary APK Download Button */}
            <button
              type="button"
              onClick={() => setApkModalOpen(true)}
              className="flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-[#2D8B8B] hover:bg-[#206E6E] px-8 py-4 text-base font-bold text-white shadow-lg transition-all active:scale-95"
            >
              <svg className="size-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download Child APK (34 MB)</span>
            </button>

            {/* Parent Portal Button */}
            <a
              href="#ecosystem"
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-white hover:bg-gray-100 border border-gray-300 px-8 py-4 text-base font-bold text-gray-800 shadow-sm transition-all"
            >
              <svg className="size-5 shrink-0 text-[#2D8B8B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M3 9h18" />
                <path d="M9 21V9" />
              </svg>
              <span>Explore Parent Portal</span>
            </a>
          </div>

          <div className="pt-2 text-xs text-gray-500">
            <span>Compatible with Android 9.0+ • Next.js Parent Web Dashboard • Built for Family Digital Wellbeing</span>
          </div>
        </div>
      </section>

      {/* APK Modal */}
      <ApkDownloadModal
        isOpen={apkModalOpen}
        onClose={() => setApkModalOpen(false)}
      />
    </>
  );
}

