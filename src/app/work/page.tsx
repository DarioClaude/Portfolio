import ProjectGrid from "@/components/ProjectGrid";
import WorkTitle from "@/components/WorkTitle";
import WorkIdentity from "@/components/WorkIdentity";

export const metadata = {
  title: "Work — Dario Tonini",
};

export default function WorkPage() {
  return (
    <>
      <section className="pt-24 md:pt-28 pb-12 md:pb-20">
        {/* Title — Brutalist Swiss typography */}
        <div className="px-5 md:px-10 mb-10 md:mb-16">
          <WorkTitle />
        </div>

        {/* Grid + progressive blur fade at bottom */}
        <div className="relative">
          <ProjectGrid />
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 z-10 bg-gradient-to-t from-white to-transparent backdrop-blur-[2px]"
          />
        </div>
      </section>

      {/* Identity block — matches home page bottom-right section */}
      <div className="px-5 md:px-10 pb-8 md:pb-12">
        <WorkIdentity />
      </div>
    </>
  );
}
