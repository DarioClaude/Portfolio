import ProjectGrid from "@/components/ProjectGrid";
import Footer from "@/components/Footer";
import WorkTitle from "@/components/WorkTitle";

export const metadata = {
  title: "Works — Dario Tonini",
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
        <ProjectGrid />
      </section>
      <Footer />
    </>
  );
}
