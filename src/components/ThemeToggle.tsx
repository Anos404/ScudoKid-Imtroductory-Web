"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";

interface ThemeToggleProps {
  variant?: "header" | "floating" | "inline";
  className?: string;
}

export default function ThemeToggle({
  variant = "header",
  className = "",
}: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme();

  // If not mounted yet on client, check document class if available to avoid flash
  const isDark = mounted
    ? theme === "dark"
    : typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark");

  const label = isDark ? "Switch to light mode" : "Switch to dark mode";
  const title = `${label} (Press D)`;

  if (variant === "floating") {
    return (
      <aside
        aria-label="Theme switch"
        className="fixed bottom-6 right-6 z-50 flex items-center select-none"
      >
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={label}
          title={title}
          className={`group relative flex size-11 items-center justify-center rounded-full border transition-all duration-300 shadow-xl backdrop-blur-md cursor-pointer hover:scale-110 active:scale-95 ${
            isDark
              ? "bg-[#0E1E1E]/90 border-emerald-500/40 text-emerald-300 hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(52,211,153,0.35)] hover:bg-[#142828]"
              : "bg-white/95 border-gray-200 text-amber-500 hover:border-[#2D8B8B] hover:shadow-[0_4px_16px_rgba(45,139,139,0.25)] hover:bg-white"
          } ${className}`}
        >
          {/* Animated Celestial Icon - Pure Icon, No Text */}
          <div className="relative size-5 shrink-0 flex items-center justify-center pointer-events-none">
            {/* Sun Icon */}
            <svg
              className={`size-5 text-amber-500 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] absolute ${
                isDark
                  ? "rotate-90 scale-0 opacity-0"
                  : "rotate-0 scale-100 opacity-100"
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="4" fill="#FBBF24" fillOpacity="0.35" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>

            {/* Moon Icon with Stars */}
            <svg
              className={`size-5 text-[#34D399] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] absolute ${
                isDark
                  ? "rotate-0 scale-100 opacity-100"
                  : "-rotate-90 scale-0 opacity-0"
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path
                d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"
                fill="#34D399"
                fillOpacity="0.25"
              />
              <path d="M19 3v3" strokeWidth="1.5" />
              <path d="M20.5 4.5h-3" strokeWidth="1.5" />
            </svg>
          </div>
        </button>
      </aside>
    );
  }

  // Header / Compact variant: Circular Icon Button with NO text
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={title}
      className={`relative inline-flex size-9 items-center justify-center rounded-full border transition-all duration-300 select-none cursor-pointer hover:scale-110 active:scale-95 ${
        isDark
          ? "bg-[#0E1E1E]/80 border-emerald-500/30 text-emerald-300 hover:border-emerald-400 hover:bg-[#142929] hover:shadow-[0_0_12px_rgba(52,211,153,0.3)]"
          : "bg-white/90 border-white/30 text-amber-500 hover:bg-white hover:border-white hover:shadow-md shadow-sm"
      } ${className}`}
    >
      <div className="relative size-4.5 shrink-0 flex items-center justify-center pointer-events-none">
        {/* Sun */}
        <svg
          className={`size-4.5 text-amber-500 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] absolute ${
            isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100"
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" fill="#FBBF24" fillOpacity="0.35" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>

        {/* Moon */}
        <svg
          className={`size-4.5 text-[#34D399] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] absolute ${
            isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path
            d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"
            fill="#34D399"
            fillOpacity="0.25"
          />
          <path d="M19 3v3" strokeWidth="1.5" />
          <path d="M20.5 4.5h-3" strokeWidth="1.5" />
        </svg>
      </div>
    </button>
  );
}

