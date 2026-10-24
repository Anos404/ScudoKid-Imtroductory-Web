import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import SectionBreak from "@/components/SectionBreak";
import Features from "@/components/Features";
import Smarter from "@/components/Smarter";
import Comparison from "@/components/Comparison";
import HowItWorks from "@/components/HowItWorks";
import Stats from "@/components/Stats";
import Stories from "@/components/Stories";
import Resources from "@/components/Resources";
import Faq from "@/components/Faq";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Header />
      <Hero />
      <About />
      <SectionBreak />
      <Features />
      <Smarter />
      <Comparison />
      <HowItWorks />
      <Stats />
      <Stories />
      <Resources />
      <Faq />
      <Cta />
      <Footer />
    </main>
  );
}
