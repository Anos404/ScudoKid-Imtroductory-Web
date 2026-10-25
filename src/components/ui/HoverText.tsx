"use client";

import React, { useState } from "react";

interface HoverTextProps {
  text: string;
  className?: string;
  showLine?: boolean;
  showArrow?: boolean;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  hoverColor?: string;
  baseColor?: string;
  arrowClassName?: string;
  containerClassName?: string;
  lineClassName?: string;
  role?: string;
  "data-mobile-menu-row"?: string;
  target?: string;
  rel?: string;
}

const HoverText = React.forwardRef<HTMLAnchorElement, HoverTextProps>(function HoverText(
  {
    text,
    className = "",
    showLine = false,
    showArrow = false,
    href = "#",
    onClick,
    hoverColor,
    baseColor,
    arrowClassName = "",
    containerClassName = "",
    lineClassName = "",
    target,
    rel,
    ...rest
  },
  ref
) {
  const [isHovered, setIsHovered] = useState(false);

  const getHoverColor = () => {
    if (hoverColor) return hoverColor;
    const key = text.trim().toLowerCase();
    if (key === "get started") return "#000000";
    if (key === "parent portal") return "#000000";
    if (key === "read article" || key === "read paper") return "rgba(255,255,255,0.7)";
    if (key === "all articles" || key === "all research") return "#ffffff";
    if (key === "download scudokid app" || key === "launch scudokid portal" || key === "explore portal") return "#ffffff";
    if (key === "book your first service" || key === "explore ecosystem") return "#ffffff";
    if (key === "discover more") return "#ffffff";
    if (key === "back to top") return "#ffffff";
    return "#ffffff";
  };

  const currentColor = isHovered ? getHoverColor() : baseColor || undefined;

  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      target={target}
      rel={rel}
      style={{ color: currentColor }}
      className={`inline-flex items-center cursor-pointer gap-2 no-underline transition-colors duration-500 ease-[cubic-bezier(0.625,0.05,0,1)] motion-reduce:transition-none ${containerClassName}`}
      {...rest}
    >
      <div className="relative overflow-hidden">
        <span className="inline-block relative w-fit whitespace-nowrap">
          <span
            data-text={text}
            className={`overflow-hidden relative inline-block leading-[1.25] h-[1.25em] whitespace-nowrap ${className}`}
          >
            {text.split("").map((char, index) => (
              <span
                key={index}
                style={{
                  display: "inline-block",
                  position: "relative",
                  textShadow: "0px 1.3em currentColor",
                  transform: isHovered
                    ? "translateY(-1.3em) rotate(0.001deg)"
                    : "translateY(0em) rotate(0.001deg)",
                  transition: "transform 0.6s cubic-bezier(0.625, 0.05, 0, 1)",
                  transitionDelay: `${index * 0.006}s`,
                  whiteSpace: "pre",
                  willChange: "transform",
                }}
              >
                {char}
              </span>
            ))}
          </span>

          {showLine && (
            <span
              aria-hidden="true"
              className={`absolute left-0 bottom-[15%] w-full bg-current ${lineClassName}`}
              style={{
                height: "1.5px",
                transform: isHovered ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: isHovered ? "left center" : "right center",
                transition: "transform 0.5s cubic-bezier(0.625, 0.05, 0, 1)",
              }}
            />
          )}
        </span>
      </div>

      {showArrow && (
        <div
          className={`flex size-[1.18em] items-center justify-start overflow-hidden ${arrowClassName}`}
        >
          <div
            className="flex h-full w-max"
            style={{
              transform: isHovered ? "translateX(5%)" : "translateX(-100%)",
              transition: "transform 0.5s cubic-bezier(0.625, 0.05, 0, 1)",
              willChange: "transform",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-right h-full w-full flex-none"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-right h-full w-full flex-none"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </div>
        </div>
      )}
    </a>
  );
});

export default HoverText;
