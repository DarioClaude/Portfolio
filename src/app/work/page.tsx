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

        {/* Grid */}
        <div className="relative">
          <ProjectGrid />
        </div>
      </section>

      {/* Identity block — matches home page bottom-right section */}
      <div className="px-5 md:px-10 pb-8 md:pb-12">
        <WorkIdentity />
      </div>
    </>
  );
}
