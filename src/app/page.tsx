import MagneticCursor from "@/components/MagneticCursor";
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import WorksSection from "@/components/WorksSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-white text-black min-h-screen">
      <MagneticCursor />
      <Header />
      <HeroCarousel />
      <WorksSection />
      <Footer />
    </main>
  );
}
