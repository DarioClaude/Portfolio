import { notFound } from "next/navigation";
import Image from "next/image";
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
      <section className="pt-24 pb-20">
        {/* Hero cover image */}
        <div className="px-5 md:px-10 mb-12">
          <div className="w-full rounded-[4px] overflow-hidden relative" style={{ aspectRatio: "16/9" }} data-protected>
            <Image
              src={project.imagePath}
              alt={project.title}
              fill
              className="object-cover"
              sizes="100vw"
              quality={90}
              priority
              draggable={false}
            />
          </div>
        </div>

        {/* Project info: title, description, tags */}
        <ProjectDetailContent
          title={project.title}
          descriptionKey={project.descriptionKey}
        />

        {/* Shooting gallery */}
        {project.gallery.length > 0 && (
          <div className="px-5 md:px-10 mt-16 md:mt-24">
            <ShootingGallery images={project.gallery} />
          </div>
        )}

        {/* Next project */}
        <NextProjectLink
          slug={nextProject.slug}
          title={nextProject.title}
          imagePath={nextProject.imagePath}
        />
      </section>
      <Footer />
    </>
  );
}
