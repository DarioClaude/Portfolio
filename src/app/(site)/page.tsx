import HeroCarousel from "@/components/HeroCarousel";
import ProjectGrid from "@/components/ProjectGrid";
import WorkTitle from "@/components/WorkTitle";
import WorkIdentity from "@/components/WorkIdentity";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <div className="md:hidden">
        <section style={{ paddingTop: "clamp(48px, 5vw, 64px)", paddingBottom: "clamp(48px, 5vw, 80px)" }}>
          <div style={{ padding: "0 clamp(20px, 3vw, 40px)", marginBottom: "clamp(40px, 5vw, 64px)" }}>
            <WorkTitle />
          </div>
          <div className="relative">
            <ProjectGrid />
          </div>
        </section>
        <div className="flex justify-end" style={{ padding: "0 clamp(20px, 3vw, 40px) clamp(32px, 3vw, 48px)" }}>
          <WorkIdentity />
        </div>
      </div>
    </>
  );
}
