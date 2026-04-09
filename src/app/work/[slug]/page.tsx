import { notFound } from "next/navigation";
import Image from "next/image";
import { projects } from "@/lib/projects";
import Footer from "@/components/Footer";
import ProjectDetailContent from "@/components/ProjectDetailContent";

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
        {/* Hero image */}
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

        <ProjectDetailContent
          title={project.title}
          descriptionKey={project.descriptionKey}
          nextProjectSlug={nextProject.slug}
          nextProjectTitle={nextProject.title}
        />
      </section>
      <Footer />
    </>
  );
}
