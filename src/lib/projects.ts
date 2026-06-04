export type GalleryImage = {
  src: string;
  alt: string;
  orientation: "landscape" | "portrait";
};

export interface Project {
  id: number;
  slug: string;
  title: string;
  titleKey: string;
  imagePath: string;
  bg: string;
  accent: "white" | "black";
  textColor: string;
  descriptionKey: string;
  category: string;
  clients: string[];
  year: number;
  gallery: GalleryImage[];
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "football",
    title: "Football",
    titleKey: "project.football.title",
    imagePath: "/images/work-football.jpg",
    bg: "bg-neutral-800",
    accent: "white",
    textColor: "text-white",
    descriptionKey: "project.football.desc",
    category: "Sports",
    clients: ["Dario Tonini"],
    year: 2024,
    gallery: [],
  },
  {
    id: 2,
    slug: "travel",
    title: "Travel",
    titleKey: "project.travel.title",
    imagePath: "/images/work-travel.jpg",
    bg: "bg-neutral-700",
    accent: "white",
    textColor: "text-white",
    descriptionKey: "project.travel.desc",
    category: "Travel",
    clients: ["Dario Tonini"],
    year: 2024,
    gallery: [],
  },
  {
    id: 3,
    slug: "rugby",
    title: "Rugby",
    titleKey: "project.rugby.title",
    imagePath: "/images/work-rugby.jpg",
    bg: "bg-neutral-800",
    accent: "white",
    textColor: "text-white",
    descriptionKey: "project.rugby.desc",
    category: "Sports",
    clients: ["Section Paloise", "Supersevens", "Stade Toulousain"],
    year: 2023,
    gallery: [
      { src: "/images/carousel/carousel-01.jpg", alt: "Rugby 1", orientation: "landscape" },
      { src: "/images/carousel/carousel-02.jpg", alt: "Rugby 2", orientation: "portrait" },
      { src: "/images/carousel/carousel-03.jpg", alt: "Rugby 3", orientation: "landscape" },
      { src: "/images/carousel/carousel-04.jpg", alt: "Rugby 4", orientation: "portrait" },
      { src: "/images/carousel/carousel-05.jpg", alt: "Rugby 5", orientation: "landscape" },
      { src: "/images/carousel/carousel-06.jpg", alt: "Rugby 6", orientation: "landscape" },
      { src: "/images/carousel/carousel-07.jpg", alt: "Rugby 7", orientation: "portrait" },
      { src: "/images/carousel/carousel-08.jpg", alt: "Rugby 8", orientation: "landscape" },
      { src: "/images/carousel/carousel-09.jpg", alt: "Rugby 9", orientation: "portrait" },
      { src: "/images/carousel/carousel-10.jpg", alt: "Rugby 10", orientation: "landscape" },
      { src: "/images/carousel/carousel-11.jpg", alt: "Rugby 11", orientation: "landscape" },
      { src: "/images/carousel/carousel-12.jpg", alt: "Rugby 12", orientation: "portrait" },
    ],
  },
  {
    id: 4,
    slug: "tour-de-france",
    title: "Tour de France",
    titleKey: "project.tourdefrance.title",
    imagePath: "/images/work-tour de france.jpg",
    bg: "bg-neutral-700",
    accent: "white",
    textColor: "text-white",
    descriptionKey: "project.tourdefrance.desc",
    category: "Sports",
    clients: ["Dario Tonini"],
    year: 2024,
    gallery: [],
  },
  {
    id: 5,
    slug: "running",
    title: "Running",
    titleKey: "project.running.title",
    imagePath: "/images/work-course.jpg",
    bg: "bg-neutral-800",
    accent: "white",
    textColor: "text-white",
    descriptionKey: "project.running.desc",
    category: "Sports",
    clients: ["Dario Tonini"],
    year: 2023,
    gallery: [],
  },
  {
    id: 6,
    slug: "others-sports",
    title: "Others Sports",
    titleKey: "project.otherssports.title",
    imagePath: "/images/work-others sports.jpg",
    bg: "bg-neutral-700",
    accent: "white",
    textColor: "text-white",
    descriptionKey: "project.otherssports.desc",
    category: "Sports",
    clients: ["Dario Tonini"],
    year: 2024,
    gallery: [],
  },
  {
    id: 7,
    slug: "artisanat",
    title: "Artisanat",
    titleKey: "project.artisanat.title",
    imagePath: "/images/gallery/volumaker/1.jpg",
    bg: "bg-neutral-800",
    accent: "white",
    textColor: "text-white",
    descriptionKey: "project.artisanat.desc",
    category: "Artisanat",
    clients: ["Dario Tonini"],
    year: 2024,
    gallery: [],
  },
];

export const carouselProjects = [
  { slug: "football", title: "MARLAY", imagePath: "/images/photo1.jpg" },
  { slug: "travel", title: "GARDEN", imagePath: "/images/photo2.jpg" },
  { slug: "rugby", title: "STUDIO ARCT", imagePath: "/images/photo3.jpg" },
  { slug: "tour-de-france", title: "KORA", imagePath: "/images/photo4.jpg" },
  { slug: "running", title: "STUDIO 17", imagePath: "/images/photo5.jpg" },
  { slug: "others-sports", title: "SHIP STUDIO", imagePath: "/images/photo6.jpg" },
];
