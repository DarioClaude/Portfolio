import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/lib/projects";
import ProjectCardVisual from "@/components/ProjectCardVisual";
import Footer from "@/components/Footer";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return { title: `${project.name} — Dario Tonini` };
}

export default function ProjectDetailPage({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === params.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <>
      <section className="pt-24 pb-20">
        {/* Hero image */}
        <div className="px-10 mb-12">
          <div className="w-full rounded-2xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
            <ProjectCardVisual project={project} />
          </div>
        </div>

        {/* Project info */}
        <div className="px-10 max-w-3xl">
          <h1 className="text-5xl font-black uppercase tracking-tight text-[#1A1A1A] mb-4">
            {project.name}
          </h1>
          <p className="text-lg text-[#6B7280] leading-relaxed mb-8">
            {project.description}
          </p>
          <div className="flex gap-4 text-sm text-[#9CA3AF]">
            <span className="border border-[#E5E7EB] px-3 py-1 rounded-full">Photography</span>
            <span className="border border-[#E5E7EB] px-3 py-1 rounded-full">Art Direction</span>
            <span className="border border-[#E5E7EB] px-3 py-1 rounded-full">Visual Design</span>
          </div>
        </div>

        {/* Next project */}
        <div className="px-10 mt-24 border-t border-[#E5E7EB] pt-12">
          <p className="text-xs uppercase tracking-[2px] text-[#9CA3AF] mb-4">Next project</p>
          <Link
            href={`/work/${nextProject.slug}`}
            className="text-3xl font-black uppercase text-[#1A1A1A] hover:opacity-60 transition-opacity"
            data-cursor-hover
          >
            {nextProject.name} →
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
