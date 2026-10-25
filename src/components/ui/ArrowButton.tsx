"use client";

import React, { useRef, useState } from "react";

interface ArrowButtonProps {
  direction: "prev" | "next";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function ArrowButton({
  direction,
  onClick,
  disabled = false,
  className = "",
}: ArrowButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0, scale: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || !btnRef.current) return;
    const r = btnRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top, scale: 1 });
    setHovered(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || !btnRef.current) return;
    const r = btnRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top, scale: 1 });
  };

  const handleMouseLeave = () => {
    setPos((prev) => ({ ...prev, scale: 0 }));
    setHovered(false);
  };

  const isPrev = direction === "prev";
  const label = isPrev ? "Previous slide" : "Next slide";

  return (
    <button
      ref={btnRef}
      type="button"
      aria-label={label}
      aria-disabled={disabled ? "true" : "false"}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative inline-flex size-[3.2vw] min-h-11 min-w-11 items-center justify-center overflow-hidden rounded-full border transition-all duration-300 select-none max-[1025px]:size-18 max-md:size-12 ${
        disabled
          ? "pointer-events-none cursor-default opacity-40 bg-white dark:bg-[#070F0F]"
          : "cursor-pointer bg-white dark:bg-[#0D1818]"
      } ${className}`}
      style={{ borderColor: "#2D8B8B" }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute aspect-square rounded-full"
        style={{
          width: "350%",
          backgroundColor: "#2D8B8B",
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: `translate(-50%, -50%) scale(${pos.scale})`,
          transition: "transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      />
      <span
        className="relative z-10 flex items-center justify-center transition-colors duration-300"
        style={{ color: hovered && !disabled ? "#ffffff" : "#2D8B8B" }}
      >
        <svg
          className="size-4"
          width="21"
          height="18"
          viewBox="0 0 21 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isPrev ? (
            <path
              d="M0.000108719 9.05508C0.0665569 9.10795 0.141867 9.15202 0.199457 9.21371C3.08335 12.0778 5.96282 14.942 8.84229 17.8061C8.90431 17.8678 8.95304 17.9427 9.00177 18C9.54223 17.4536 10.0561 16.9337 10.5611 16.4225C8.50562 14.378 6.41468 12.2982 4.32374 10.2228C4.33703 10.2007 4.34589 10.1743 4.35918 10.1523C10.4415 10.1523 14.4645 10.1523 20.5557 10.1523C20.5557 9.38115 20.5557 8.64529 20.5557 7.88739C14.4645 7.88739 10.4459 7.88739 4.33703 7.88739C6.45455 5.78556 8.54548 3.70575 10.6187 1.64357C10.0738 1.09278 9.55552 0.577234 8.97519 0C8.94861 0.04847 8.9176 0.136597 8.85558 0.198286C5.97169 3.07124 3.08335 5.93978 0.199457 8.80832C0.141867 8.86561 0.0665569 8.91408 0.000108719 8.96695C0.000108719 8.99339 0.000108719 9.02423 0.000108719 9.05508Z"
              fill="currentColor"
            />
          ) : (
            <path
              d="M20.5556 9.05508C20.4891 9.10795 20.4138 9.15202 20.3562 9.21371C17.4723 12.0778 14.5928 14.942 11.7134 17.8061C11.6514 17.8678 11.6026 17.9427 11.5539 18C11.0134 17.4536 10.4996 16.9337 9.99455 16.4225C12.05 14.378 14.141 12.2982 16.2319 10.2228C16.2186 10.2007 16.2098 10.1743 16.1965 10.1523C10.1142 10.1523 6.09118 10.1523 0 10.1523C0 9.38115 0 8.64529 0 7.88739C6.09118 7.88739 10.1097 7.88739 16.2186 7.88739C14.1011 5.78556 12.0102 3.70575 9.93696 1.64357C10.4818 1.09278 11.0001 0.577234 11.5805 0C11.6071 0.04847 11.6381 0.136597 11.7001 0.198286C14.584 3.07124 17.4723 5.93978 20.3562 8.80832C20.4138 8.86561 20.4891 8.91408 20.5556 8.96695C20.5556 8.99339 20.5556 9.02423 20.5556 9.05508Z"
              fill="currentColor"
            />
          )}
        </svg>
      </span>
    </button>
  );
}
