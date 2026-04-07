import ProjectGrid from "@/components/ProjectGrid";

export const metadata = {
  title: "Works — Marlay",
};

export default function WorkPage() {
  return (
    <section className="pt-28 pb-20">
      {/* Title */}
      <div className="px-10 mb-10 flex items-start justify-center">
        <h1
          className="font-black uppercase text-[#1A1A1A] leading-none"
          style={{ fontSize: "clamp(80px, 12vw, 160px)" }}
        >
          WORKS
          <sup className="ml-3 inline-flex items-center align-super">
            <span className="text-sm font-normal text-[#6B7280] border border-[#E5E7EB] px-3 py-1 rounded-full">
              ©21 — 26
            </span>
          </sup>
        </h1>
      </div>

      {/* Grid */}
      <ProjectGrid />
    </section>
  );
}
