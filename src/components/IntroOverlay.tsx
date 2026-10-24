"use client";

import React, { useEffect, useState } from "react";
import gsap from "gsap";

export default function IntroOverlay() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) {
      setVisible(false);
      return;
    }

    const timer = setTimeout(() => {
      const el = document.getElementById("intro-overlay");
      if (el) {
        gsap.to(el, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => setVisible(false),
        });
      } else {
        setVisible(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      id="intro-overlay"
      data-intro-overlay="true"
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100svh",
        backgroundColor: "#ffffff",
        zIndex: 9999,
        pointerEvents: "none",
        opacity: 1,
      }}
    />
  );
}
