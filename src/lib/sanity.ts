import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source);
}

// ─── GROQ Queries ───────────────────────────────────────────────

/** All projects, ordered by display order */
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

/** Single project by slug */
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

/** First 6 projects for the carousel */
export const carouselProjectsQuery = `
  *[_type == "project"] | order(order asc) [0...6] {
    _id,
    title,
    slug,
    "coverUrl": coverImage.asset->url
  }
`;

// ─── TypeScript Types (from Sanity) ──────────────────────────────

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
