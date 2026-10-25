"use client";

import React, { useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

const DETAILED_MATRIX = [
  {
    capability: "AI Behavioral Risk Scoring",
    description: "Multi-factor real-time scoring that computes Low, Medium, and High threat levels from device telemetry over 7 and 30-day windows.",
    scudo: "Included (Real-time telemetry)",
    familyLink: "Not available (Usage minutes only)",
    qustodio: "Not available (App blocking only)",
    bark: "Not available (Keyword scans only)",
    category: "AI & Intelligence",
  },
  {
    capability: "Digital Addiction Quantification",
    description: "Quantified index (0–100) combining night usage ratio, session frequencies, app switch velocity, and sleep disruption.",
    scudo: "Included (0–100 Index)",
    familyLink: "Not available",
    qustodio: "Not available",
    bark: "Not available",
    category: "AI & Intelligence",
  },
  {
    capability: "Machine Learning Anomaly Detection",
    description: "Isolation Forest unsupervised ML model trained on a 7-day personal rolling baseline to flag statistical deviations (>2σ).",
    scudo: "Included (Isolation Forest ML)",
    familyLink: "Not available",
    qustodio: "Not available",
    bark: "Partial (Heuristic language flags)",
    category: "AI & Intelligence",
  },
  {
    capability: "Real-Time Geo-Fencing & Alerts",
    description: "Parents draw interactive safe zones on maps. GPS positions are continuously checked with Haversine formula for <45s alerts.",
    scudo: "Included (< 45s breach alerts)",
    familyLink: "Not available (Location lookup only)",
    qustodio: "Included",
    bark: "Not available (Manual check-ins only)",
    category: "Location & Safety",
  },
  {
    capability: "AI Positive Reinforcement System",
    description: "Unlocks reward mini-games (Flappy Bird, Tic-Tac-Toe) and bonus screen time when healthy digital habits and sleep routines are maintained.",
    scudo: "Included (Mini-games & Habit streaks)",
    familyLink: "Not available (Punitive locks only)",
    qustodio: "Not available (Lockouts only)",
    bark: "Not available (Email alerts only)",
    category: "Child Psychology",
  },
  {
    capability: "Transparent Non-Punitive Notices",
    description: "Teaches digital citizenship by displaying educational notices when content is blocked rather than silent surveillance.",
    scudo: "Included (Educational context)",
    familyLink: "Partial (Generic blocked screen)",
    qustodio: "Partial (Basic restriction screen)",
    bark: "Not available (Silent surveillance)",
    category: "Child Psychology",
  },
  {
    capability: "In-App Encrypted Video & Voice Calls",
    description: "Integrated family hub with WebRTC audio/video calls, Socket.io family group messaging, and instant SOS dispatch.",
    scudo: "Included (WebRTC & Socket.io)",
    familyLink: "Not available (Requires Google Meet)",
    qustodio: "Not available",
    bark: "Not available",
    category: "Communication",
  },
  {
    capability: "Unified 3-Platform Architecture",
    description: "Parent Web Portal (Next.js), Child Mobile App (Android APK), and Super Admin Panel unified on one backend and database.",
    scudo: "Included (100% Unified Backend)",
    familyLink: "Partial (Mobile-first, sparse web)",
    qustodio: "Included (Multi-app ecosystem)",
    bark: "Partial (Browser extensions & app)",
    category: "Architecture",
  },
  {
    capability: "Affordable for Developing Regions",
    description: "Designed for families in developing regions with low-bandwidth telemetry and accessible pricing.",
    scudo: "Included (UN SDGs 3, 4, 10, 16)",
    familyLink: "Partial (Free but high bandwidth)",
    qustodio: "No ($55–$140/yr USD)",
    bark: "No ($14/month USD)",
    category: "Accessibility",
  },
];

export default function ComparePage() {
  const [activeTab, setActiveTab] = useState<string>("All");

  const categories = ["All", "AI & Intelligence", "Location & Safety", "Child Psychology", "Communication", "Architecture", "Accessibility"];

  const filteredData = activeTab === "All"
    ? DETAILED_MATRIX
    : DETAILED_MATRIX.filter((item) => item.category === activeTab);

  return (
    <div className="min-h-screen bg-[#F7FAF9] dark:bg-[#070F0F] text-[#16212E] dark:text-slate-100 font-body transition-colors duration-500">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-[#070F0F]/90 backdrop-blur-md border-b border-[#DCE6E4] dark:border-emerald-500/20 px-6 py-4 transition-colors duration-500">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/assets/media/scudokid-logo.png"
              alt="ScudoKid Logo"
              width={42}
              height={42}
              className="size-10 shrink-0 object-contain group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="font-heading text-lg font-bold text-gray-900 dark:text-white leading-tight">
                Scudo<span className="text-[#2D8B8B] dark:text-[#34D399]">Kid</span>
              </span>
              <span className="text-[10px] text-[#2D8B8B] dark:text-emerald-400 font-semibold uppercase tracking-wider">
                Competitive Analysis
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle variant="header" />
            <Link
              href="/"
              className="text-sm font-semibold text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white transition-colors hidden sm:block"
            >
              ← Back to Overview
            </Link>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
              }}
              className="inline-flex items-center gap-2 rounded-full bg-[#2D8B8B] hover:bg-[#206E6E] px-4 py-2 text-xs font-bold text-white shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Child APK
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-gray-500 dark:text-slate-400 font-medium">
          <Link href="/" className="hover:text-[#2D8B8B] dark:hover:text-[#34D399]">Home</Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white font-semibold">Competitive Analysis</span>
        </nav>

        {/* Hero Section */}
        <div className="rounded-3xl bg-gradient-to-br from-[#1A4F4F] via-[#206E6E] to-[#2D8B8B] p-8 md:p-12 text-white shadow-lift relative overflow-hidden mb-12">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1 text-xs font-semibold text-emerald-200 border border-white/20">
              Comparative Analysis &amp; Benchmark Study
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mt-4 leading-tight">
              ScudoKid vs. Existing Parental Control Tools
            </h1>
            <p className="mt-4 text-sm sm:text-base text-emerald-100 leading-relaxed font-normal">
              A comprehensive technical comparison evaluating ScudoKid against Google Family Link, Qustodio, and Bark across AI behavioral telemetry, non-punitive habits, emergency response, and accessibility.
            </p>

            <div className="mt-6 flex flex-wrap gap-4 text-xs font-medium text-emerald-100/90">
              <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-emerald-400" /> Proactive AI Risk Scoring</span>
              <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-emerald-400" /> 0–100 Digital Addiction Index</span>
              <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-emerald-400" /> Non-Punitive Reward Games</span>
              <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-emerald-400" /> UN SDGs 3, 4, 10, 16</span>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
                activeTab === cat
                  ? "bg-[#2D8B8B] text-white shadow-sm"
                  : "bg-white dark:bg-[#0D1818] text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-[#142626] border border-gray-200 dark:border-emerald-500/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-3xl bg-white dark:bg-[#0C1515] border border-[#DCE6E4] dark:border-emerald-500/20 shadow-card">
          <table className="w-full text-left border-collapse min-w-[780px]">
            <thead>
              <tr className="border-b border-[#DCE6E4] dark:border-emerald-500/20 bg-gray-50/80 dark:bg-[#081010]/90">
                <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 w-[35%]">
                  Feature / Capability
                </th>
                <th className="py-4 px-4 text-center bg-[#E2F3F1]/70 dark:bg-[#0E2827]/90 border-x border-[#2D8B8B]/20 dark:border-emerald-500/30 w-[23%]">
                  <div className="font-heading text-base font-bold text-[#1A4F4F] dark:text-emerald-300">
                    ScudoKid ✓
                  </div>
                  <span className="text-[10px] text-[#206E6E] dark:text-emerald-400 font-medium block">
                    Our AI Ecosystem
                  </span>
                </th>
                <th className="py-4 px-4 text-center text-xs font-semibold text-gray-600 dark:text-slate-300 w-[14%]">
                  Google Family Link
                </th>
                <th className="py-4 px-4 text-center text-xs font-semibold text-gray-600 dark:text-slate-300 w-[14%]">
                  Qustodio
                </th>
                <th className="py-4 px-4 text-center text-xs font-semibold text-gray-600 dark:text-slate-300 w-[14%]">
                  Bark
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE6E4] dark:divide-white/10 text-xs">
              {filteredData.map((row, idx) => (
                <tr
                  key={row.capability}
                  className={`hover:bg-gray-50/60 dark:hover:bg-white/[0.03] transition-colors ${
                    idx % 2 === 0 ? "bg-white dark:bg-[#0C1515]" : "bg-gray-50/30 dark:bg-[#081010]/40"
                  }`}
                >
                  <td className="py-4 px-6 align-top">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-100 dark:bg-emerald-950/60 text-gray-600 dark:text-emerald-300 border border-transparent dark:border-emerald-500/25 mb-1">
                      {row.category}
                    </span>
                    <p className="font-bold text-gray-900 dark:text-white text-sm">{row.capability}</p>
                    <p className="text-gray-500 dark:text-slate-400 mt-1 leading-snug">{row.description}</p>
                  </td>

                  {/* ScudoKid */}
                  <td className="py-4 px-4 text-center align-middle bg-[#E2F3F1]/40 dark:bg-[#0E2827]/50 border-x border-[#2D8B8B]/20 dark:border-emerald-500/30 font-semibold text-[#1A4F4F]">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100/70 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-transparent dark:border-emerald-500/30 font-bold">
                      <svg className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{row.scudo}</span>
                    </div>
                  </td>

                  {/* Family Link */}
                  <td className="py-4 px-4 text-center align-middle text-gray-600 dark:text-slate-400">
                    <span className={row.familyLink.includes("Not") ? "text-rose-500 dark:text-rose-400 font-medium" : "text-gray-700 dark:text-slate-300"}>
                      {row.familyLink}
                    </span>
                  </td>

                  {/* Qustodio */}
                  <td className="py-4 px-4 text-center align-middle text-gray-600 dark:text-slate-400">
                    <span className={row.qustodio.includes("Not") || row.qustodio.includes("No") ? "text-rose-500 dark:text-rose-400 font-medium" : "text-gray-700 dark:text-slate-300"}>
                      {row.qustodio}
                    </span>
                  </td>

                  {/* Bark */}
                  <td className="py-4 px-4 text-center align-middle text-gray-600 dark:text-slate-400">
                    <span className={row.bark.includes("Not") || row.bark.includes("No") ? "text-rose-500 dark:text-rose-400 font-medium" : "text-gray-700 dark:text-slate-300"}>
                      {row.bark}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 5 Structural Flaws of Legacy Systems Solved by ScudoKid */}
        <section className="mt-16">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            The 5 Major Problems with Existing Solutions (and How ScudoKid Solves Them)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-white dark:bg-[#0D1818] p-6 border border-gray-200 dark:border-emerald-500/20 shadow-sm transition-colors duration-500">
              <span className="text-xs font-bold text-rose-500 dark:text-rose-400 uppercase tracking-wider block mb-1">Problem 1</span>
              <h3 className="font-heading font-bold text-base text-gray-900 dark:text-white">No Unified Platform</h3>
              <p className="text-xs text-gray-600 dark:text-slate-300 mt-2 leading-relaxed">
                Parents currently juggle 3–4 disconnected tools for location tracking, app control, screen limits, and browsing logs. ScudoKid consolidates Parent Web Portal, Child Mobile App, and Super Admin into one single database and backend.
              </p>
            </div>

            <div className="rounded-2xl bg-white dark:bg-[#0D1818] p-6 border border-gray-200 dark:border-emerald-500/20 shadow-sm transition-colors duration-500">
              <span className="text-xs font-bold text-rose-500 dark:text-rose-400 uppercase tracking-wider block mb-1">Problem 2</span>
              <h3 className="font-heading font-bold text-base text-gray-900 dark:text-white">Alert Fatigue &amp; False Positives</h3>
              <p className="text-xs text-gray-600 dark:text-slate-300 mt-2 leading-relaxed">
                Existing apps flood parents with every minor action until alerts are ignored. ScudoKid uses a 3-tier smart classification: Informational (logged silently), Warning (push banner), and Critical (siren + Twilio SMS).
              </p>
            </div>

            <div className="rounded-2xl bg-white dark:bg-[#0D1818] p-6 border border-gray-200 dark:border-emerald-500/20 shadow-sm transition-colors duration-500">
              <span className="text-xs font-bold text-rose-500 dark:text-rose-400 uppercase tracking-wider block mb-1">Problem 3</span>
              <h3 className="font-heading font-bold text-base text-gray-900 dark:text-white">Zero Addiction Quantification</h3>
              <p className="text-xs text-gray-600 dark:text-slate-300 mt-2 leading-relaxed">
                Tools measure simple minutes without evaluating behavioral addiction. ScudoKid computes a mathematical 0–100 score analyzing night usage ratio, session frequencies, app switch velocity, and sleep disruption.
              </p>
            </div>

            <div className="rounded-2xl bg-white dark:bg-[#0D1818] p-6 border border-gray-200 dark:border-emerald-500/20 shadow-sm transition-colors duration-500">
              <span className="text-xs font-bold text-rose-500 dark:text-rose-400 uppercase tracking-wider block mb-1">Problem 4</span>
              <h3 className="font-heading font-bold text-base text-gray-900 dark:text-white">Blind to Behavioral Anomalies</h3>
              <p className="text-xs text-gray-600 dark:text-slate-300 mt-2 leading-relaxed">
                Sudden screen time spikes from 2h to 6h go unnoticed unless parents manually check logs. ScudoKid&apos;s Isolation Forest machine learning model flags deviations greater than 2 standard deviations automatically.
              </p>
            </div>

            <div className="rounded-2xl bg-white dark:bg-[#0D1818] p-6 border border-gray-200 dark:border-emerald-500/20 shadow-sm md:col-span-2 transition-colors duration-500">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-1">Problem 5 &amp; The ScudoKid Difference</span>
              <h3 className="font-heading font-bold text-base text-gray-900 dark:text-white">Punishment-Only Enforcement vs. Positive Reinforcement</h3>
              <p className="text-xs text-gray-600 dark:text-slate-300 mt-2 leading-relaxed">
                Hard blocking and cold screen freezes damage parent-child trust, leading children to seek workarounds. ScudoKid rewards healthy habits: meeting screen targets and sleep schedules unlocks in-app mini-games (Flappy Bird &amp; Tic-Tac-Toe) and grants bonus time approved by parents.
              </p>
            </div>
          </div>
        </section>

        {/* Download & Portal Banner */}
        <section className="mt-16 rounded-3xl bg-white dark:bg-[#0C1515] border border-[#2D8B8B]/30 dark:border-emerald-500/30 p-8 md:p-10 shadow-lift flex flex-col md:flex-row items-center justify-between gap-6 transition-colors duration-500">
          <div>
            <h3 className="font-heading text-2xl font-bold text-gray-900 dark:text-white">
              Ready to Protect Your Child Intelligently?
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-300 mt-1.5 max-w-xl">
              Get the official ScudoKid Child Mobile App APK or launch the Parent Web Portal demo to experience the complete ecosystem.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
              }}
              className="inline-flex items-center gap-2 rounded-full bg-[#2D8B8B] hover:bg-[#206E6E] px-6 py-3 text-sm font-bold text-white shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Child APK
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/15 px-6 py-3 text-sm font-semibold text-gray-800 dark:text-white transition-colors"
            >
              Back to Overview
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
