import ProjectGrid from "@/components/ProjectGrid";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Works — Dario Tonini",
};

export default function WorkPage() {
  return (
    <>
      <section className="pt-24 md:pt-28 pb-12 md:pb-20">
        {/* Title — Brutalist Swiss typography */}
        <div className="px-5 md:px-10 mb-10 md:mb-16">
          <h1 className="font-black uppercase text-[#1A1A1A] text-[20vw] md:text-[15vw] leading-[0.8] tracking-[-0.05em]">
            WORKS
            <sup className="ml-2 inline-flex items-center align-top">
              <span className="text-[14px] font-normal text-[#6B7280] border border-[#E5E7EB] px-3 py-1 rounded-full tracking-normal">
                ©21 — 26
              </span>
            </sup>
          </h1>
        </div>

        {/* Grid */}
        <ProjectGrid />
      </section>
      <Footer />
    </>
  );
}
