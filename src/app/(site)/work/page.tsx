import ProjectGrid from "@/components/ProjectGrid";
import WorkTitle from "@/components/WorkTitle";
import WorkIdentity from "@/components/WorkIdentity";
import WorkCopyright from "@/components/WorkCopyright";
import WorkMobileScroll from "@/components/WorkMobileScroll";

export const metadata = {
  title: "Work — Dario Tonini",
};

export default function WorkPage() {
  return (
    <>
      <WorkMobileScroll />
      <section style={{ paddingTop: "clamp(96px, 10vw, 112px)", paddingBottom: "clamp(48px, 5vw, 80px)" }}>
        {/* Title */}
        <div style={{ padding: "0 clamp(20px, 3vw, 40px)", marginBottom: "clamp(40px, 5vw, 64px)" }}>
          <WorkTitle />
        </div>

        {/* Grid */}
        <div className="relative">
          <ProjectGrid />
        </div>
      </section>

      {/* Footer — copyright left, identity right */}
      <div className="flex justify-between items-start" style={{ padding: "0 clamp(20px, 3vw, 40px) clamp(32px, 3vw, 48px)" }}>
        <WorkCopyright />
        <WorkIdentity />
      </div>
    </>
  );
}
