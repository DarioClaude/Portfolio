import { projects as localProjects, carouselProjects as localCarousel } from "./projects";
import { sanityClient, allProjectsQuery, carouselProjectsQuery, projectBySlugQuery } from "./sanity";
import type { SanityProject, SanityCarouselProject } from "./sanity";
import type { Project, GalleryImage } from "./projects";

const isSanityConfigured = !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

/** Convert a Sanity project to the local Project format */
function toLocalProject(sp: SanityProject): Project {
  return {
    id: 0,
    slug: sp.slug.current,
    title: sp.title,
    imagePath: sp.coverUrl,
    bg: "",
    accent: "white",
    textColor: "text-white",
    descriptionKey: "", // Not used when Sanity provides description directly
    category: sp.category,
    client: sp.client,
    year: sp.year,
    gallery: (sp.gallery || []).map((g, i) => ({
      src: g.url,
      alt: `${sp.title} — photo ${i + 1}`,
      orientation: g.format,
    })),
    // Store raw description for direct use
    _description: sp.description,
  } as Project & { _description: string };
}

/** Get all projects — Sanity if configured, else local */
export async function getAllProjects(): Promise<Project[]> {
  if (!isSanityConfigured) return localProjects;

  try {
    const data = await sanityClient.fetch<SanityProject[]>(allProjectsQuery);
    return data.map(toLocalProject);
  } catch {
    return localProjects;
  }
}

/** Get a single project by slug */
export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  if (!isSanityConfigured) return localProjects.find((p) => p.slug === slug);

  try {
    const data = await sanityClient.fetch<SanityProject | null>(projectBySlugQuery, { slug });
    if (!data) return localProjects.find((p) => p.slug === slug);
    return toLocalProject(data);
  } catch {
    return localProjects.find((p) => p.slug === slug);
  }
}

/** Get carousel projects (first 6) */
export async function getCarouselProjects() {
  if (!isSanityConfigured) return localCarousel;

  try {
    const data = await sanityClient.fetch<SanityCarouselProject[]>(carouselProjectsQuery);
    return data.map((sp) => ({
      id: 0,
      slug: sp.slug.current,
      title: sp.title,
      imagePath: sp.coverUrl,
      bg: "",
      accent: "white" as const,
      textColor: "text-white",
      descriptionKey: "",
      category: "",
      client: "",
      year: 0,
      gallery: [] as GalleryImage[],
    }));
  } catch {
    return localCarousel;
  }
}
