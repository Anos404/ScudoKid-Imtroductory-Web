"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface ApkDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ApkDownloadModal({ isOpen, onClose }: ApkDownloadModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.origin + "/downloads/scudokid-child-v1.0.apk");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-3xl bg-white dark:bg-[#0A1414] shadow-2xl border border-gray-100 dark:border-emerald-500/20 transition-all transform animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-[#1A4F4F] via-[#206E6E] to-[#2D8B8B] p-6 text-white relative">
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-5 right-5 flex size-9 items-center justify-center rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors"
          >
            ✕
          </button>

          <div className="flex items-center gap-4">
            <img
              src="/assets/media/scudokid-logo.png"
              alt="ScudoKid Logo"
              width={56}
              height={56}
              className="size-14 shrink-0 object-contain"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading text-2xl font-bold text-white">ScudoKid Child App</h3>
                <span className="rounded-full bg-emerald-400/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-300 border border-emerald-400/30">
                  v1.0.0 APK
                </span>
              </div>
              <p className="text-xs text-emerald-100/90 mt-1">
                Android Ecosystem • Family Digital Wellness &amp; Safety
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Quick Specs Grid */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl bg-gray-50 dark:bg-[#0D1818] border border-gray-100 dark:border-white/10 p-3">
              <span className="text-[11px] text-gray-500 dark:text-slate-400 font-medium block">File Size</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white mt-0.5 block">34.2 MB</span>
            </div>
            <div className="rounded-2xl bg-gray-50 dark:bg-[#0D1818] border border-gray-100 dark:border-white/10 p-3">
              <span className="text-[11px] text-gray-500 dark:text-slate-400 font-medium block">OS Requirement</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white mt-0.5 block">Android 9.0+</span>
            </div>
            <div className="rounded-2xl bg-gray-50 dark:bg-[#0D1818] border border-gray-100 dark:border-white/10 p-3">
              <span className="text-[11px] text-gray-500 dark:text-slate-400 font-medium block">Architecture</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white mt-0.5 block">ARM64 / Univ</span>
            </div>
          </div>

          {/* Download & QR Action Row */}
          <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-[#E2F3F1]/50 dark:bg-[#0E2827]/60 border border-[#2D8B8B]/20 dark:border-emerald-500/30">
            {/* SVG QR Code */}
            <div className="size-28 shrink-0 bg-white p-2 rounded-xl shadow-sm border border-[#2D8B8B]/20 flex flex-col items-center justify-center">
              <svg
                viewBox="0 0 100 100"
                className="size-full"
                shapeRendering="crispEdges"
              >
                {/* Simulated QR matrix for clean display */}
                <rect width="100" height="100" fill="#ffffff" />
                {/* Top-left position marker */}
                <rect x="5" y="5" width="28" height="28" fill="#1A4F4F" rx="3" />
                <rect x="9" y="9" width="20" height="20" fill="#ffffff" rx="2" />
                <rect x="13" y="13" width="12" height="12" fill="#2D8B8B" rx="1" />
                {/* Top-right position marker */}
                <rect x="67" y="5" width="28" height="28" fill="#1A4F4F" rx="3" />
                <rect x="71" y="9" width="20" height="20" fill="#ffffff" rx="2" />
                <rect x="75" y="13" width="12" height="12" fill="#2D8B8B" rx="1" />
                {/* Bottom-left position marker */}
                <rect x="5" y="67" width="28" height="28" fill="#1A4F4F" rx="3" />
                <rect x="9" y="71" width="20" height="20" fill="#ffffff" rx="2" />
                <rect x="13" y="75" width="12" height="12" fill="#2D8B8B" rx="1" />
                {/* Data bits */}
                <rect x="38" y="10" width="6" height="6" fill="#2D8B8B" />
                <rect x="48" y="10" width="6" height="6" fill="#1A4F4F" />
                <rect x="58" y="10" width="6" height="6" fill="#2D8B8B" />
                <rect x="38" y="24" width="6" height="6" fill="#1A4F4F" />
                <rect x="48" y="24" width="6" height="6" fill="#2D8B8B" />
                <rect x="58" y="24" width="6" height="6" fill="#1A4F4F" />
                <rect x="10" y="38" width="6" height="6" fill="#2D8B8B" />
                <rect x="24" y="38" width="6" height="6" fill="#1A4F4F" />
                <rect x="38" y="38" width="24" height="24" fill="#206E6E" rx="3" />
                <rect x="44" y="44" width="12" height="12" fill="#ffffff" rx="2" />
                <rect x="47" y="47" width="6" height="6" fill="#2D8B8B" />
                <rect x="68" y="38" width="6" height="6" fill="#2D8B8B" />
                <rect x="82" y="38" width="6" height="6" fill="#1A4F4F" />
                <rect x="38" y="68" width="6" height="6" fill="#1A4F4F" />
                <rect x="48" y="68" width="6" height="6" fill="#2D8B8B" />
                <rect x="58" y="68" width="6" height="6" fill="#1A4F4F" />
                <rect x="68" y="68" width="8" height="8" fill="#2D8B8B" />
                <rect x="80" y="68" width="8" height="8" fill="#1A4F4F" />
                <rect x="68" y="80" width="8" height="8" fill="#1A4F4F" />
                <rect x="80" y="80" width="8" height="8" fill="#2D8B8B" />
              </svg>
            </div>

            <div className="flex-1 text-center sm:text-left space-y-2.5">
              <div>
                <p className="text-xs font-bold text-[#1A4F4F] dark:text-emerald-300 uppercase tracking-wider">
                  Scan to Download on Phone
                </p>
                <p className="text-[12px] text-gray-600 dark:text-slate-300 mt-0.5">
                  Point your Android camera at the QR code to begin the instant APK download.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <a
                  href="/downloads/scudokid-child-v1.0.apk"
                  download="scudokid-child-v1.0.apk"
                  className="inline-flex items-center gap-2 rounded-full bg-[#2D8B8B] hover:bg-[#206E6E] px-4 py-2.5 text-xs font-bold text-white shadow-md transition-all active:scale-95"
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Direct Download APK (34.2 MB)
                </a>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white dark:bg-[#0D1818] hover:bg-gray-100 dark:hover:bg-[#142626] border border-gray-200 dark:border-white/15 px-3 py-2 text-xs font-semibold text-gray-700 dark:text-slate-200 transition-colors"
                >
                  {copied ? "✓ Copied Link" : "Copy Link"}
                </button>
              </div>
            </div>
          </div>

          {/* 3-Step Setup Guide */}
          <div>
            <h4 className="font-heading text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="flex size-5 items-center justify-center rounded-full bg-[#2D8B8B] text-white text-[10px]">
                i
              </span>
              Quick Installation Guide
            </h4>
            <div className="space-y-2.5 text-xs text-gray-600 dark:text-slate-300">
              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-gray-50 dark:bg-[#0D1818] border border-gray-100 dark:border-white/10">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#2D8B8B]/15 text-[#2D8B8B] dark:text-emerald-400 font-bold text-xs">
                  1
                </span>
                <p>
                  <strong className="text-gray-900 dark:text-white">Download the APK:</strong> Tap the button above on your child&apos;s Android device to start downloading.
                </p>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-gray-50 dark:bg-[#0D1818] border border-gray-100 dark:border-white/10">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#2D8B8B]/15 text-[#2D8B8B] dark:text-emerald-400 font-bold text-xs">
                  2
                </span>
                <p>
                  <strong className="text-gray-900 dark:text-white">Allow Installation:</strong> If prompted by Android, enable <em>&quot;Install unknown apps&quot;</em> for your browser or files app.
                </p>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-gray-50 dark:bg-[#0D1818] border border-gray-100 dark:border-white/10">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#2D8B8B]/15 text-[#2D8B8B] dark:text-emerald-400 font-bold text-xs">
                  3
                </span>
                <p>
                  <strong className="text-gray-900 dark:text-white">Pair with Family:</strong> Open ScudoKid, scan the QR code or enter the 6-digit pairing code generated in your Parent Portal.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 dark:bg-[#070F0F] p-4 border-t border-gray-100 dark:border-white/10 flex items-center justify-between text-xs text-gray-500 dark:text-slate-400">
          <span>Need help pairing? Visit the Parent Portal</span>
          <button
            onClick={onClose}
            className="rounded-full px-4 py-1.5 bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 text-gray-800 dark:text-white font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
