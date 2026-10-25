"use client";

import React from "react";

interface StoreButtonProps {
  store: "apple" | "google" | "apk" | "web";
  variant?: "primary" | "light";
  scale?: number;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}

export default function StoreButton({
  store,
  variant = "light",
  scale = 1,
  href = "#",
  onClick,
  className = "",
}: StoreButtonProps) {
  const isPrimary = variant === "primary";

  const defaultBg = isPrimary ? "#2D8B8B" : "#ffffff";
  const defaultBorder = isPrimary ? "#2D8B8B" : "#DCE6E4";
  const defaultText = isPrimary ? "#ffffff" : "#16212E";

  const getSubtext = () => {
    switch (store) {
      case "apk":
        return "Android v1.0.0 (34 MB)";
      case "web":
        return "Parent Web Dashboard";
      case "apple":
        return "Download on the";
      case "google":
      default:
        return "Get it on";
    }
  };

  const getMainText = () => {
    switch (store) {
      case "apk":
        return "Download APK";
      case "web":
        return "Parent Portal";
      case "apple":
        return "App Store";
      case "google":
      default:
        return "Google Play";
    }
  };

  const renderIcon = () => {
    if (store === "apk") {
      return (
        <svg
          className="size-6 max-[1025px]:size-7 shrink-0 text-current"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Android Robot Head / Download Icon */}
          <path d="M12 2a4 4 0 0 0-4 4v1h8V6a4 4 0 0 0-4-4z" fill="currentColor" opacity="0.3" />
          <path d="M12 2v6" />
          <path d="m8 6-2-2" />
          <path d="m16 6 2-2" />
          <path d="M4 11a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
          <path d="M12 12v5" />
          <path d="m9 15 3 3 3-3" />
        </svg>
      );
    }

    if (store === "web") {
      return (
        <svg
          className="size-6 max-[1025px]:size-7 shrink-0 text-current"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        </svg>
      );
    }

    if (store === "apple") {
      return (
        <svg
          className="size-6 max-[1025px]:size-7 shrink-0 text-current"
          viewBox="0 0 36 41"
          fill="none"
        >
          <path
            d="M10.8273 40.982C6.85125 40.4749 2.91537 33.233 1.6989 29.8163C-0.754111 22.9267 -0.555913 13.6941 7.14735 10.3648C11.267 8.58502 12.9465 10.2123 16.6713 11.0838C19.7189 11.7971 20.8415 10.6288 23.54 9.94513C27.7969 8.86587 31.4038 10.4659 34.124 13.7245C27.4165 17.3627 28.2454 27.3184 35.253 30.0659C35.3132 30.3499 33.8849 33.034 33.6297 33.481C32.2014 35.9862 29.1225 40.6121 26.0404 40.982H24.7597C23.3443 40.7245 22.1214 39.8603 20.7404 39.5176C19.3594 39.175 17.7722 39.2039 16.4474 39.5152C15.0031 39.8546 13.7336 40.6908 12.27 40.982C11.8134 40.9411 11.2726 41.0382 10.8289 40.982H10.8273Z"
            fill="currentColor"
          />
          <path
            d="M25.4777 -0.00415039C25.9263 3.14937 24.2235 6.59257 21.6598 8.38679C20.3984 9.26945 18.7983 9.97157 17.2264 9.80788C16.9022 8.21667 17.3572 6.48986 18.0986 5.06636C19.5165 2.34213 22.3932 0.293549 25.4777 -0.00415039Z"
            fill="currentColor"
          />
        </svg>
      );
    }

    return (
      <svg
        className="size-6 max-[1025px]:size-7 shrink-0 text-current"
        viewBox="0 0 31 34"
        fill="none"
      >
        <path
          d="M14.4788 16.2401L0.128296 31.1835C0.29305 31.7487 0.584668 32.2694 0.981195 32.7063C1.37772 33.1433 1.86882 33.4851 2.41752 33.7061C2.96621 33.9272 3.55821 34.0216 4.14893 33.9822C4.73964 33.9429 5.31369 33.7709 5.82785 33.4792L21.9748 24.3388L14.4788 16.2401Z"
          fill="#EA4335"
        />
        <path
          d="M28.9896 13.6999L22.0069 9.72491L14.1473 16.5802L22.039 24.3176L28.9683 20.3851C29.4108 20.1565 29.8036 19.8432 30.1239 19.4632C30.4443 19.0833 30.6859 18.6441 30.835 18.171C30.9841 17.6979 31.0376 17.2002 30.9925 16.7065C30.9474 16.2128 30.8046 15.7328 30.5723 15.2942C30.2098 14.6155 29.6511 14.0602 28.9683 13.6999H28.9896Z"
          fill="#FBBC04"
        />
        <path
          d="M0.128321 2.82715C0.042936 3.14615 -0.000201538 3.47486 7.07851e-07 3.80495V30.2057C-0.000201538 30.5358 0.042936 30.8645 0.128321 31.1835L14.9707 16.6227L0.128321 2.82715Z"
          fill="#4285F4"
        />
        <path
          d="M14.5857 17.0053L22.0069 9.72492L5.88131 0.542052C5.27447 0.189386 4.58462 0.00239053 3.88166 7.60152e-06C3.03259 -0.00166477 2.20625 0.272654 1.52862 0.781147C0.850985 1.28964 0.359224 2.00441 0.128296 2.81651L14.5857 17.0053Z"
          fill="#34A853"
        />
      </svg>
    );
  };

  const colorClasses = isPrimary
    ? "bg-[#2D8B8B] hover:bg-[#206E6E] border-[#2D8B8B] text-white"
    : "bg-white dark:bg-[#0D1A1A] border-[#DCE6E4] dark:border-emerald-500/25 text-[#16212E] dark:text-white hover:bg-gray-50 dark:hover:bg-[#122323]";

  return (
    <a
      aria-label={`${getMainText()} - ${getSubtext()}`}
      href={href}
      onClick={onClick}
      className={`group flex items-center gap-3.5 rounded-full border px-5 py-3 transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] w-auto shrink-0 select-none cursor-pointer ${colorClasses} ${className}`}
    >
      <div className="flex shrink-0 items-center justify-center">
        {renderIcon()}
      </div>

      <div className="flex flex-col text-left leading-tight">
        <span className="text-[11px] font-medium opacity-80 uppercase tracking-wide">
          {getSubtext()}
        </span>
        <span className="font-heading text-base font-bold tracking-tight whitespace-nowrap">
          {getMainText()}
        </span>
      </div>
    </a>
  );
}

