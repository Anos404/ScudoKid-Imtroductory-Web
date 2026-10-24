import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import IntroOverlay from "@/components/IntroOverlay";

export const metadata: Metadata = {
  metadataBase: new URL("https://scudokid.com"),
  title: "ScudoKid — AI-Driven Child Safety & Monitoring Ecosystem",
  description:
    "An AI-powered unified child safety ecosystem connecting Parent Web Portal, Child Mobile App, and Super Admin Panel with real-time risk scoring, anomaly detection, geo-fencing, and non-punitive habit coaching.",
  openGraph: {
    title: "ScudoKid — AI-Driven Child Safety & Monitoring Ecosystem",
    description:
      "An AI-powered unified child safety ecosystem connecting Parent Web Portal, Child Mobile App, and Super Admin Panel with real-time risk scoring, anomaly detection, geo-fencing, and non-punitive habit coaching.",
    images: [
      {
        url: "/assets/media/scudokid-logo.jpg",
        width: 1024,
        height: 1024,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ScudoKid — AI-Driven Child Safety & Monitoring Ecosystem",
    description:
      "An AI-powered unified child safety ecosystem connecting Parent Web Portal, Child Mobile App, and Super Admin Panel with real-time risk scoring, anomaly detection, geo-fencing, and non-punitive habit coaching.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="kyntra-fonts" id="top">
      <head>
        <link
          rel="preload"
          href="/assets/media/3a11180d498b75c0-s.p.2028s2bhlck6k.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/assets/media/5c285b27cdda1fe8-s.p.2_mbdogr7ni8i.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/media/scudokid-logo.jpg"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/media/scudokid-hero-watermark.svg"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/media/scudokid-hero-phone.svg"
          fetchPriority="high"
        />
      </head>
      <body>
        <SmoothScroll />
        <IntroOverlay />
        <div className="kyntra-page relative">{children}</div>
      </body>
    </html>
  );
}
