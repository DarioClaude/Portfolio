import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import ProjectDetailContent from "@/components/ProjectDetailContent";
import ProjectGallery from "@/components/ProjectGallery";
import NextProjectLink from "@/components/NextProjectLink";
import WorkCopyright from "@/components/WorkCopyright";
import WorkIdentity from "@/components/WorkIdentity";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return { title: `${project.title} — Dario Tonini` };
}

export default function ProjectDetailPage({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === params.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <>
      <section style={{ paddingTop: "clamp(112px, 12vw, 144px)", paddingBottom: "80px" }}>
        <ProjectDetailContent
          title={project.title}
          category={project.category}
          clients={project.clients}
        />

        <div style={{ marginTop: "clamp(56px, 6vw, 80px)" }}>
          <ProjectGallery images={project.gallery} />
        </div>

        <div className="max-w-5xl mx-auto">
          <NextProjectLink
            slug={nextProject.slug}
            title={nextProject.title}
            imagePath={nextProject.imagePath}
          />
        </div>
      </section>

      <div className="border-t border-[#E5E7EB]" />
      <div className="flex justify-between items-end" style={{ padding: "clamp(24px, 3vw, 40px) clamp(20px, 3vw, 40px) clamp(32px, 3vw, 48px)" }}>
        <WorkCopyright />
        <WorkIdentity />
      </div>
    </>
  );
}
