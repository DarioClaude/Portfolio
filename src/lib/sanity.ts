import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});

const builder = imageUrlBuilder({ projectId, dataset });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source);
}

// ─── GROQ Queries ───────────────────────────────────────────────

export const allProjectsQuery = `
  *[_type == "project"] | order(order asc) {
    _id,
    title,
    slug,
    description,
    category,
    client,
    year,
    "coverUrl": coverImage.asset->url,
    gallery[] {
      "url": asset->url,
      format
    }
  }
`;

export const projectBySlugQuery = `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    category,
    client,
    year,
    "coverUrl": coverImage.asset->url,
    gallery[] {
      "url": asset->url,
      format
    }
  }
`;

export const carouselProjectsQuery = `
  *[_type == "project"] | order(order asc) [0...6] {
    _id,
    title,
    slug,
    "coverUrl": coverImage.asset->url
  }
`;

// ─── TypeScript Types ────────────────────────────────────────────

export interface SanityProject {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  category: string;
  client: string;
  year: number;
  coverUrl: string;
  gallery: {
    url: string;
    format: "landscape" | "portrait";
  }[];
}

export interface SanityCarouselProject {
  _id: string;
  title: string;
  slug: { current: string };
  coverUrl: string;
}
