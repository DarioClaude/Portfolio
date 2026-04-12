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

export const projects: Project[] = [
  {
    id: 1,
    slug: "football",
    title: "Football",
    imagePath: "/images/work-football.jpg",
    bg: "bg-neutral-800",
    accent: "white",
    textColor: "text-white",
    descriptionKey: "project.football.desc",
    category: "Sports",
    client: "Dario Tonini",
    year: 2024,
    gallery: [],
  },
  {
    id: 2,
    slug: "travel",
    title: "Travel",
    imagePath: "/images/work-travel.jpg",
    bg: "bg-neutral-700",
    accent: "white",
    textColor: "text-white",
    descriptionKey: "project.travel.desc",
    category: "Travel",
    client: "Dario Tonini",
    year: 2024,
    gallery: [],
  },
  {
    id: 3,
    slug: "rugby",
    title: "Rugby",
    imagePath: "/images/work-rugby.jpg",
    bg: "bg-neutral-800",
    accent: "white",
    textColor: "text-white",
    descriptionKey: "project.rugby.desc",
    category: "Sports",
    client: "Dario Tonini",
    year: 2023,
    gallery: [],
  },
  {
    id: 4,
    slug: "tour-de-france",
    title: "Tour de France",
    imagePath: "/images/work-tour de france.jpg",
    bg: "bg-neutral-700",
    accent: "white",
    textColor: "text-white",
    descriptionKey: "project.tourdefrance.desc",
    category: "Sports",
    client: "Dario Tonini",
    year: 2024,
    gallery: [],
  },
  {
    id: 5,
    slug: "running",
    title: "Running",
    imagePath: "/images/work-course.jpg",
    bg: "bg-neutral-800",
    accent: "white",
    textColor: "text-white",
    descriptionKey: "project.running.desc",
    category: "Sports",
    client: "Dario Tonini",
    year: 2023,
    gallery: [],
  },
  {
    id: 6,
    slug: "others-sports",
    title: "Others Sports",
    imagePath: "/images/work-others sports.jpg",
    bg: "bg-neutral-700",
    accent: "white",
    textColor: "text-white",
    descriptionKey: "project.otherssports.desc",
    category: "Sports",
    client: "Dario Tonini",
    year: 2024,
    gallery: [],
  },
];

/** Carousel entries — original project names for the hero section.
 *  Slugs point to the actual sport-project pages so clicks resolve. */
export const carouselProjects = [
  { slug: "football", title: "MARLAY", imagePath: "/images/photo1.jpg" },
  { slug: "travel", title: "GARDEN", imagePath: "/images/photo2.jpg" },
  { slug: "rugby", title: "STUDIO ARCT", imagePath: "/images/photo3.jpg" },
  { slug: "tour-de-france", title: "KORA", imagePath: "/images/photo4.jpg" },
  { slug: "running", title: "STUDIO 17", imagePath: "/images/photo5.jpg" },
  { slug: "others-sports", title: "SHIP STUDIO", imagePath: "/images/photo6.jpg" },
];
