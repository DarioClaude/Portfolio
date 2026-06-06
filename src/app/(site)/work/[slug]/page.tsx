import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import ProjectDetailClient from "@/components/ProjectDetailClient";

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

  return (
    <ProjectDetailClient
      slug={project.slug}
      gallery={project.gallery}
    />
  );
}
