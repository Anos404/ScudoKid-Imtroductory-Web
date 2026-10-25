import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import IntroOverlay from "@/components/IntroOverlay";
import { ThemeProvider } from "@/context/ThemeContext";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata: Metadata = {
  metadataBase: new URL("https://scudokid.com"),
  title: "ScudoKid — AI-Driven Child Safety & Monitoring Ecosystem",
  description:
    "An AI-powered unified child safety ecosystem connecting Parent Web Portal, Child Mobile App, and Super Admin Panel with real-time risk scoring, anomaly detection, geo-fencing, and non-punitive habit coaching.",
  icons: {
    icon: "/assets/media/scudokid-logo.png",
    apple: "/assets/media/scudokid-logo.png",
  },
  openGraph: {
    title: "ScudoKid — AI-Driven Child Safety & Monitoring Ecosystem",
    description:
      "An AI-powered unified child safety ecosystem connecting Parent Web Portal, Child Mobile App, and Super Admin Panel with real-time risk scoring, anomaly detection, geo-fencing, and non-punitive habit coaching.",
    images: [
      {
        url: "/assets/media/scudokid-logo.png",
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
    <html lang="en" className="kyntra-fonts" id="top" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const stored = localStorage.getItem('scudokid-theme');
                if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                  document.documentElement.style.colorScheme = 'dark';
                } else {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.style.colorScheme = 'light';
                }
              } catch (e) {}
            `,
          }}
        />
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
          href="/assets/media/scudokid-logo.png"
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
      <body className="bg-white dark:bg-[#070F0F] text-black dark:text-slate-100 transition-colors duration-500">
        <ThemeProvider>
          <SmoothScroll />
          <IntroOverlay />
          <div className="kyntra-page relative bg-white dark:bg-[#070F0F] transition-colors duration-500">
            {children}
          </div>
          <ThemeToggle variant="floating" />
        </ThemeProvider>
      </body>
    </html>
  );
}
