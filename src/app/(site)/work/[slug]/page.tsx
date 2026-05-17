import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import Footer from "@/components/Footer";
import ProjectDetailContent from "@/components/ProjectDetailContent";
import ShootingGallery from "@/components/ShootingGallery";
import NextProjectLink from "@/components/NextProjectLink";

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
        {/* Header: Title + Description + Metadata */}
        <ProjectDetailContent
          title={project.title}
          descriptionKey={project.descriptionKey}
          category={project.category}
          client={project.client}
          year={project.year}
        />

        {/* Gallery — masonry 3-col */}
        {project.gallery.length > 0 && (
          <div style={{ marginTop: "clamp(56px, 6vw, 80px)" }}>
            <ShootingGallery images={project.gallery} />
          </div>
        )}

        {/* Next project */}
        <div className="max-w-5xl mx-auto">
          <NextProjectLink
            slug={nextProject.slug}
            title={nextProject.title}
            imagePath={nextProject.imagePath}
          />
        </div>
      </section>
      <Footer />
    </>
  );
}
