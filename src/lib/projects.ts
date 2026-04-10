export type GalleryImage = {
  src: string;
  alt: string;
  orientation: "landscape" | "portrait";
};

export interface Project {
  id: number;
  slug: string;
  title: string;
  imagePath: string;
  bg: string;
  accent: "white" | "black";
  textColor: string;
  descriptionKey: string;
  category: string;
  client: string;
  year: number;
  gallery: GalleryImage[];
}

function generateGallery(slug: string, count: number, pattern: ("landscape" | "portrait")[]): GalleryImage[] {
  return Array.from({ length: count }, (_, i) => ({
    src: `/images/gallery/${slug}/${i + 1}.jpg`,
    alt: `${slug} — photo ${i + 1}`,
    orientation: pattern[i % pattern.length],
  }));
}

const patternA: ("landscape" | "portrait")[] = ["landscape", "portrait", "portrait", "landscape", "landscape", "portrait", "landscape", "portrait"];
const patternB: ("landscape" | "portrait")[] = ["portrait", "landscape", "landscape", "portrait", "portrait", "landscape", "portrait", "landscape"];

export const projects: Project[] = [
  {
    id: 1,
    slug: "marlay",
    title: "MARLAY",
    imagePath: "/images/photo1.jpg",
    bg: "bg-sky-300",
    accent: "white",
    textColor: "text-white",
    descriptionKey: "project.marlay.desc",
    category: "Portrait",
    client: "Marlay Studio",
    year: 2024,
    gallery: generateGallery("marlay", 8, patternA),
  },
  {
    id: 2,
    slug: "garden",
    title: "GARDEN",
    imagePath: "/images/photo2.jpg",
    bg: "bg-amber-50",
    accent: "black",
    textColor: "text-gray-900",
    descriptionKey: "project.garden.desc",
    category: "Editorial",
    client: "Garden Botanics",
    year: 2023,
    gallery: generateGallery("garden", 8, patternB),
  },
  {
    id: 3,
    slug: "studio-arct",
    title: "STUDIO ARCT",
    imagePath: "/images/photo3.jpg",
    bg: "bg-gradient-to-br from-gray-100 to-gray-200",
    accent: "black",
    textColor: "text-gray-900",
    descriptionKey: "project.studioarct.desc",
    category: "Branding",
    client: "Studio Arct",
    year: 2023,
    gallery: generateGallery("studio-arct", 8, patternA),
  },
  {
    id: 4,
    slug: "kora",
    title: "KORA",
    imagePath: "/images/photo4.jpg",
    bg: "bg-gray-900",
    accent: "white",
    textColor: "text-white",
    descriptionKey: "project.kora.desc",
    category: "Fine Art",
    client: "Kora Agency",
    year: 2024,
    gallery: generateGallery("kora", 8, patternB),
  },
  {
    id: 5,
    slug: "studio-17",
    title: "STUDIO 17",
    imagePath: "/images/photo5.jpg",
    bg: "bg-gradient-to-br from-amber-900 to-gray-900",
    accent: "white",
    textColor: "text-white",
    descriptionKey: "project.studio17.desc",
    category: "Portrait",
    client: "Studio 17",
    year: 2022,
    gallery: generateGallery("studio-17", 8, patternA),
  },
  {
    id: 6,
    slug: "ship-studio",
    title: "SHIP STUDIO",
    imagePath: "/images/photo6.jpg",
    bg: "bg-gray-700",
    accent: "white",
    textColor: "text-white",
    descriptionKey: "project.shipstudio.desc",
    category: "Editorial",
    client: "Ship Studio",
    year: 2024,
    gallery: generateGallery("ship-studio", 8, patternB),
  },
  {
    id: 7,
    slug: "cirro",
    title: "CIRRO",
    imagePath: "/images/photo7.jpg",
    bg: "bg-gray-300",
    accent: "black",
    textColor: "text-gray-900",
    descriptionKey: "project.cirro.desc",
    category: "Fine Art",
    client: "Cirro Collective",
    year: 2023,
    gallery: generateGallery("cirro", 8, patternA),
  },
  {
    id: 8,
    slug: "volumaker",
    title: "VOLUMAKER",
    imagePath: "/images/photo8.jpg",
    bg: "bg-gradient-to-br from-amber-500 to-orange-600",
    accent: "white",
    textColor: "text-white",
    descriptionKey: "project.volumaker.desc",
    category: "Branding",
    client: "Volumaker",
    year: 2022,
    gallery: generateGallery("volumaker", 8, patternB),
  },
  {
    id: 9,
    slug: "para-bellum",
    title: "PARA BELLUM",
    imagePath: "/images/photo9.jpg",
    bg: "bg-gradient-to-br from-purple-900 to-black",
    accent: "white",
    textColor: "text-white",
    descriptionKey: "project.parabellum.desc",
    category: "Editorial",
    client: "Para Bellum",
    year: 2024,
    gallery: generateGallery("para-bellum", 8, patternA),
  },
];

export const carouselProjects = projects.slice(0, 6);
