"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ApkDownloadModal from "./ApkDownloadModal";

interface ComparisonRow {
  capability: string;
  category: "ai" | "safety" | "platform";
  scudo: { supported: boolean; detail: string };
  familyLink: { supported: boolean | "partial"; detail: string };
  qustodio: { supported: boolean | "partial"; detail: string };
  bark: { supported: boolean | "partial"; detail: string };
}

const COMPARISON_DATA: ComparisonRow[] = [
  {
    capability: "AI Behavioral Risk Score (Low / Med / High)",
    category: "ai",
    scudo: { supported: true, detail: "Real-time AI telemetry analysis with 7 & 30-day risk trend forecasting." },
    familyLink: { supported: false, detail: "Basic daily screen usage only" },
    qustodio: { supported: false, detail: "Rule-based category quotas" },
    bark: { supported: false, detail: "Text content keyword match only" },
  },
  {
    capability: "Digital Addiction Quantification (0–100)",
    category: "ai",
    scudo: { supported: true, detail: "Weighted formula: night usage ratio, session length, and app-switching frequency." },
    familyLink: { supported: false, detail: "No addiction scoring" },
    qustodio: { supported: false, detail: "No addiction scoring" },
    bark: { supported: false, detail: "No addiction scoring" },
  },
  {
    capability: "ML Anomaly Detection (Isolation Forest)",
    category: "ai",
    scudo: { supported: true, detail: "Trained on rolling 7-day data baseline. Flags >2σ deviations with zero alert fatigue." },
    familyLink: { supported: false, detail: "Not available" },
    qustodio: { supported: false, detail: "Static rule triggers only" },
    bark: { supported: "partial", detail: "Keyword sentiment flags only" },
  },
  {
    capability: "Real-Time Geo-Fencing (< 45s alerts)",
    category: "safety",
    scudo: { supported: true, detail: "Haversine formula GPS validation with instant push + SMS emergency trigger." },
    familyLink: { supported: false, detail: "Manual location check only" },
    qustodio: { supported: true, detail: "Geo-fence zones included" },
    bark: { supported: false, detail: "Check-in request only" },
  },
  {
    capability: "AI Positive Reward System & Mini-Games",
    category: "safety",
    scudo: { supported: true, detail: "Unlocks Flappy Bird & Tic-Tac-Toe when children meet healthy habit targets." },
    familyLink: { supported: false, detail: "Punishment / lockout only" },
    qustodio: { supported: false, detail: "Hard blocking only" },
    bark: { supported: false, detail: "Notification alerts only" },
  },
  {
    capability: "In-App Family WebRTC Video & Audio Calls",
    category: "safety",
    scudo: { supported: true, detail: "End-to-end encrypted family group chat, voice, and video calls inside the app." },
    familyLink: { supported: false, detail: "Requires external Google Meet" },
    qustodio: { supported: false, detail: "No in-app calling" },
    bark: { supported: false, detail: "No calling platform" },
  },
  {
    capability: "Unified Web Portal + Android App",
    category: "platform",
    scudo: { supported: true, detail: "Seamless Next.js parent portal + Android APK sharing one DB and AI engine." },
    familyLink: { supported: "partial", detail: "Mobile app only, limited web" },
    qustodio: { supported: true, detail: "Web and multi-OS apps" },
    bark: { supported: "partial", detail: "Fragmented extensions" },
  },
  {
    capability: "Cross-Platform AI Insights Dashboard",
    category: "platform",
    scudo: { supported: true, detail: "Gemini-powered natural language digests summarizing child digital growth." },
    familyLink: { supported: false, detail: "Raw app bar charts only" },
    qustodio: { supported: "partial", detail: "Limited activity breakdown" },
    bark: { supported: false, detail: "Raw alert logs only" },
  },
  {
    capability: "Optimized for Developing Regions (UN SDGs)",
    category: "platform",
    scudo: { supported: true, detail: "Lightweight telemetry, low data consumption, built for developing families." },
    familyLink: { supported: false, detail: "Requires high-bandwidth ecosystem" },
    qustodio: { supported: false, detail: "Expensive monthly subscriptions" },
    bark: { supported: false, detail: "$14+/mo US-centric billing" },
  },
];

export default function Comparison() {
  const [apkModalOpen, setApkModalOpen] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: isReduced ? 0 : 25 },
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

  const renderBadge = (val: boolean | "partial") => {
    if (val === true) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold shadow-sm">
          <svg className="size-3.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Included
        </span>
      );
    }
    if (val === "partial") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold">
          <span className="size-1.5 rounded-full bg-amber-500" />
          Partial
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-100 text-xs font-medium">
        <svg className="size-3 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
        None
      </span>
    );
  };

  return (
    <>
      <section id="comparison" className="w-full bg-[#F7FAF9] py-20 px-[5%] max-md:py-14 border-y border-[#DCE6E4]">
        <div className="mx-auto max-w-400">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#E2F3F1] border border-[#2D8B8B]/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#1A4F4F]">
                Competitive Analysis
              </span>
              <h2
                ref={headingRef}
                className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 leading-tight tracking-tight"
              >
                Why ScudoKid Outperforms Legacy Parental Controls
              </h2>
              <p className="text-gray-600 text-base sm:text-lg mt-3 leading-relaxed">
                Traditional solutions rely on harsh lockouts and blind surveillance that breed resentment. ScudoKid introduces proactive AI telemetry, non-punitive habits, and positive reinforcement.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/compare"
                className="inline-flex items-center gap-2 rounded-full bg-white hover:bg-gray-50 border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-800 shadow-sm transition-all"
              >
                Full Matrix Breakdown →
              </Link>
              <button
                type="button"
                onClick={() => setApkModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-[#2D8B8B] hover:bg-[#206E6E] px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all active:scale-95"
              >
                Download Child APK
              </button>
            </div>
          </div>

          {/* Responsive Comparison Table Container */}
          <div
            ref={containerRef}
            className="overflow-x-auto rounded-3xl bg-white border border-[#DCE6E4] shadow-card"
          >
            <table className="w-full text-left border-collapse min-w-[760px]">
              <thead>
                <tr className="border-b border-[#DCE6E4] bg-gray-50/80">
                  <th className="py-5 px-6 text-xs font-bold uppercase tracking-wider text-gray-500 w-[38%]">
                    Safety &amp; AI Capability
                  </th>
                  <th className="py-5 px-4 text-center bg-[#E2F3F1]/70 border-x border-[#2D8B8B]/20 w-[22%]">
                    <div className="flex items-center justify-center gap-2">
                      <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-heading text-base font-bold text-[#1A4F4F]">
                        ScudoKid
                      </span>
                    </div>
                    <span className="text-[10px] text-[#206E6E] font-medium block mt-0.5">
                      Proactive AI Ecosystem
                    </span>
                  </th>
                  <th className="py-5 px-4 text-center text-xs font-semibold text-gray-600 w-[13%]">
                    Google Family Link
                  </th>
                  <th className="py-5 px-4 text-center text-xs font-semibold text-gray-600 w-[13%]">
                    Qustodio
                  </th>
                  <th className="py-5 px-4 text-center text-xs font-semibold text-gray-600 w-[14%]">
                    Bark
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DCE6E4]">
                {COMPARISON_DATA.map((row, idx) => (
                  <tr
                    key={row.capability}
                    className={`transition-colors hover:bg-gray-50/50 ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                    }`}
                  >
                    <td className="py-4 px-6 align-top">
                      <p className="font-semibold text-gray-900 text-sm">
                        {row.capability}
                      </p>
                      <p className="text-xs text-gray-500 mt-1 leading-snug">
                        {row.scudo.detail}
                      </p>
                    </td>

                    {/* ScudoKid Column */}
                    <td className="py-4 px-4 text-center align-middle bg-[#E2F3F1]/40 border-x border-[#2D8B8B]/20">
                      {renderBadge(row.scudo.supported)}
                    </td>

                    {/* Family Link Column */}
                    <td className="py-4 px-4 text-center align-middle">
                      {renderBadge(row.familyLink.supported)}
                    </td>

                    {/* Qustodio Column */}
                    <td className="py-4 px-4 text-center align-middle">
                      {renderBadge(row.qustodio.supported)}
                    </td>

                    {/* Bark Column */}
                    <td className="py-4 px-4 text-center align-middle">
                      {renderBadge(row.bark.supported)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quick Pillar Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
            <div className="rounded-2xl bg-white p-6 border border-[#DCE6E4] shadow-sm">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[#E2F3F1] text-[#2D8B8B] mb-4">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-base text-gray-900">Democratized &amp; Accessible</h3>
              <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                While commercial platforms charge upwards of $100/yr, ScudoKid is engineered specifically for developing regions and emerging families (UN SDGs 3, 4, 10, 16).
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 border border-[#DCE6E4] shadow-sm">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[#E2F3F1] text-[#2D8B8B] mb-4">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-base text-gray-900">Zero Alert Fatigue</h3>
              <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                Smart 3-tier classification (Informational, Warning, Critical) prevents parents from being overwhelmed by harmless notifications, keeping attention on real threats.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 border border-[#DCE6E4] shadow-sm">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[#E2F3F1] text-[#2D8B8B] mb-4">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-base text-gray-900">Positive Reinforcement</h3>
              <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                Rather than punishing kids with cold blockouts, ScudoKid unlocks rewards like Flappy Bird and Tic-Tac-Toe mini-games when children maintain healthy digital habits.
              </p>
            </div>
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
