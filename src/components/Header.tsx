"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import HoverText from "./ui/HoverText";
import ThemeToggle from "./ThemeToggle";
import gsap from "gsap";

export default function Header() {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [scrolledDown, setScrolledDown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const drawerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLAnchorElement[]>([]);
  const lastYRef = useRef(0);

  useEffect(() => {
    // Reveal header after 1 second
    const timer = setTimeout(() => {
      setHeaderVisible(true);
    }, 1000);

    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 150);
      if (y > lastYRef.current && y > 100) {
        setScrolledDown(true);
      } else if (y < lastYRef.current) {
        setScrolledDown(false);
      }
      lastYRef.current = y;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Animate mobile drawer
  useEffect(() => {
    const drawer = drawerRef.current;
    if (!drawer) return;

    const rows = rowsRef.current.filter(Boolean);
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (menuOpen) {
      document.body.style.overflow = "hidden";
      gsap.set(drawer, { autoAlpha: 1 });
      if (isReduced) {
        gsap.set(drawer, { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 });
        gsap.set(rows, { opacity: 1, y: 0 });
      } else {
        const tl = gsap.timeline();
        tl.fromTo(
          drawer,
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.5, ease: "power3.inOut" }
        ).fromTo(
          rows,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.05,
            clearProps: "opacity,transform",
          },
          0.18
        );
      }
    } else {
      document.body.style.overflow = "";
      if (isReduced) {
        gsap.set(drawer, { autoAlpha: 0 });
      } else {
        const tl = gsap.timeline();
        tl.to(rows, {
          opacity: 0,
          y: 12,
          duration: 0.2,
          ease: "power2.in",
          stagger: { each: 0.02, from: "end" },
        })
          .to(
            drawer,
            { clipPath: "inset(0% 0% 100% 0%)", duration: 0.38, ease: "power3.inOut" },
            0.06
          )
          .set(drawer, { autoAlpha: 0 });
      }
    }
  }, [menuOpen]);

  const [apkModalOpen, setApkModalOpen] = useState(false);

  const scrollToHash = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/")) {
      setMenuOpen(false);
      return;
    }
    e.preventDefault();
    setMenuOpen(false);
    if (href === "#top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  let headerClass =
    "fixed inset-x-0 top-0 z-50 px-[3vw] py-[1.1vw] transition-all duration-700 ease-out max-[1025px]:px-[5%] max-[1025px]:py-[4%] ";
  if (!headerVisible) {
    headerClass += "-translate-y-full";
  } else if (scrolledDown) {
    headerClass += "-translate-y-full max-[1025px]:translate-y-0";
  } else {
    headerClass += "translate-y-0";
  }
  if (scrolled) {
    headerClass += " bg-black/40 backdrop-blur-lg border-b border-white/10";
  }

  const navLinks = [
    { label: "Ecosystem", href: "#ecosystem" },
    { label: "Features", href: "#features" },
    { label: "AI Engine", href: "#smarter" },
    { label: "Comparison", href: "/compare" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Impact", href: "#stories" },
    { label: "FAQs", href: "#faq" },
  ];

  return (
    <>
      <header className={headerClass}>
        <div className="flex items-center justify-between">
          <a
            className="relative z-60 flex items-center group"
            aria-label="ScudoKid home"
            href="/"
          >
            <div className="flex items-center gap-2.5">
              <img
                alt="ScudoKid Logo"
                fetchPriority="high"
                loading="eager"
                width={48}
                height={48}
                decoding="async"
                className="h-[2.8vw] w-auto max-[1025px]:h-[7.2vw] max-md:h-[9.5vw] object-contain transition-transform duration-300 group-hover:scale-105"
                src="/assets/media/scudokid-logo.png"
              />
              <div className="flex flex-col">
                <span className="font-heading text-[1.4vw] font-bold tracking-tight text-white max-[1025px]:text-[3.8vw] max-md:text-[4.8vw] leading-tight">
                  Scudo<span className="text-[#34D399]">Kid</span>
                </span>
                <span className="text-[0.55vw] max-[1025px]:text-[1.6vw] max-md:text-[2vw] uppercase tracking-wider text-[#A7F3D0] font-medium leading-none">
                  Introductory &amp; APK
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="flex items-center gap-[2vw] max-[1025px]:hidden">
            {navLinks.map((link) => (
              <HoverText
                key={link.label}
                text={link.label}
                href={link.href}
                onClick={(e) => scrollToHash(e, link.href)}
                showLine
                className="font-body text-20"
                containerClassName="mt-[0.3vw] text-white/90 hover:text-white"
              />
            ))}
          </nav>

          {/* Desktop Dual CTA + Theme Toggle */}
          <div className="flex items-center gap-3 max-[1025px]:hidden">
            <ThemeToggle variant="header" />

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
              }}
              className="flex items-center gap-2 rounded-full bg-[#2D8B8B] hover:bg-[#206E6E] px-4 py-2 text-sm font-bold text-white shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download APK</span>
            </button>

            <HoverText
              text="Parent Portal"
              href="#cta"
              onClick={(e) => scrollToHash(e, "#cta")}
              showArrow
              className="font-body text-18 tracking-tight text-black dark:text-white"
              arrowClassName="text-black dark:text-white"
              containerClassName="rounded-full bg-white dark:bg-[#102020] dark:border dark:border-emerald-500/30 px-4 py-2 text-black dark:text-white"
            />
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen ? "true" : "false"}
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-60 hidden h-[6vw] w-[7vw] shrink-0 items-center justify-center max-[1025px]:flex max-md:h-[8vw] max-md:w-[9vw]"
          >
            <span className="relative block h-[3vw] w-[5.5vw] max-md:h-[4vw] max-md:w-[7vw]">
              <span
                className={`absolute left-0 top-[10%] h-px w-full bg-white transition-all duration-300 ${
                  menuOpen ? "translate-y-[1.2vw] rotate-45 max-md:translate-y-[1.6vw]" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[50%] h-px w-full bg-white transition-all duration-300 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-[90%] h-px w-full bg-white transition-all duration-300 ${
                  menuOpen ? "translate-y-[-1.2vw] -rotate-45 max-md:translate-y-[-1.6vw]" : ""
                }`}
              />
            </span>
          </button>
        </div>

        {/* Fullscreen Mobile Drawer */}
        <div
          ref={drawerRef}
          style={{
            clipPath: "inset(0% 0% 100% 0%)",
            visibility: "hidden",
            opacity: 0,
          }}
          className="fixed inset-0 z-50 hidden h-dvh bg-black px-[6%] pb-8 pt-[24vw] max-[1025px]:block max-md:pt-[28vw] overflow-y-auto"
        >
          <nav className="flex h-full flex-col justify-between">
            <div className="flex flex-col gap-4 max-md:gap-5">
              {navLinks.map((link, idx) => (
                <HoverText
                  key={link.label}
                  ref={(el) => {
                    if (el) rowsRef.current[idx] = el as unknown as HTMLAnchorElement;
                  }}
                  text={link.label}
                  href={link.href}
                  onClick={(e) => scrollToHash(e, link.href)}
                  showLine
                  className="font-heading text-3xl font-semibold leading-tight text-white"
                  containerClassName="mt-1 text-white"
                  data-mobile-menu-row="true"
                />
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-6 border-t border-white/15">
              <div className="flex items-center justify-between pb-1">
                <span className="text-sm font-semibold text-white/80">Theme Mode</span>
                <ThemeToggle variant="header" />
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                }}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#2D8B8B] text-base font-bold text-white shadow-lg active:scale-95 cursor-pointer"
              >
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Child APK (34 MB)
              </button>

              <HoverText
                ref={(el) => {
                  if (el) rowsRef.current[navLinks.length] = el as unknown as HTMLAnchorElement;
                }}
                text="Launch Parent Portal"
                href="#cta"
                onClick={(e) => scrollToHash(e, "#cta")}
                showArrow
                className="font-body text-base font-semibold text-black"
                arrowClassName="text-black"
                containerClassName="h-12 w-full justify-center rounded-full bg-white px-6 text-black"
                data-mobile-menu-row="true"
              />
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
