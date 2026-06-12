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
  coverPath?: string;
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
    gallery: [
      { src: "/images/gallery/travel/1.jpg", alt: "Travel 1", orientation: "landscape" },
      { src: "/images/gallery/travel/2.jpg", alt: "Travel 2", orientation: "landscape" },
      { src: "/images/gallery/travel/3.jpg", alt: "Travel 3", orientation: "landscape" },
      { src: "/images/gallery/travel/4.jpg", alt: "Travel 4", orientation: "landscape" },
      { src: "/images/gallery/travel/5.jpg", alt: "Travel 5", orientation: "landscape" },
      { src: "/images/gallery/travel/6.jpg", alt: "Travel 6", orientation: "landscape" },
      { src: "/images/gallery/travel/7.jpg", alt: "Travel 7", orientation: "landscape" },
      { src: "/images/gallery/travel/8.jpg", alt: "Travel 8", orientation: "landscape" },
      { src: "/images/gallery/travel/9.jpg", alt: "Travel 9", orientation: "landscape" },
      { src: "/images/gallery/travel/10.jpg", alt: "Travel 10", orientation: "landscape" },
      { src: "/images/gallery/travel/11.jpg", alt: "Travel 11", orientation: "landscape" },
      { src: "/images/gallery/travel/12.jpg", alt: "Travel 12", orientation: "landscape" },
      { src: "/images/gallery/travel/13.jpg", alt: "Travel 13", orientation: "landscape" },
      { src: "/images/gallery/travel/14.jpg", alt: "Travel 14", orientation: "landscape" },
      { src: "/images/gallery/travel/15.jpg", alt: "Travel 15", orientation: "landscape" },
      { src: "/images/gallery/travel/16.jpg", alt: "Travel 16", orientation: "landscape" },
      { src: "/images/gallery/travel/17.jpg", alt: "Travel 17", orientation: "landscape" },
      { src: "/images/gallery/travel/18.jpg", alt: "Travel 18", orientation: "landscape" },
      { src: "/images/gallery/travel/19.jpg", alt: "Travel 19", orientation: "landscape" },
      { src: "/images/gallery/travel/20.jpg", alt: "Travel 20", orientation: "landscape" },
      { src: "/images/gallery/travel/21.jpg", alt: "Travel 21", orientation: "landscape" },
      { src: "/images/gallery/travel/22.jpg", alt: "Travel 22", orientation: "landscape" },
      { src: "/images/gallery/travel/23.jpg", alt: "Travel 23", orientation: "landscape" },
      { src: "/images/gallery/travel/24.jpg", alt: "Travel 24", orientation: "landscape" },
      { src: "/images/gallery/travel/25.jpg", alt: "Travel 25", orientation: "landscape" },
    ],
  },
  {
    id: 3,
    slug: "rugby",
    title: "Rugby",
    titleKey: "project.rugby.title",
    imagePath: "/images/gallery/rugby/6.jpg",
    coverPath: "/images/gallery/rugby/2.jpg",
    bg: "bg-neutral-800",
    accent: "white",
    textColor: "text-white",
    descriptionKey: "project.rugby.desc",
    category: "Sports",
    clients: ["Section Paloise", "Supersevens", "Stade Toulousain", "Union Bordeaux Bègles"],
    year: 2023,
    gallery: [
      { src: "/images/gallery/rugby/1.jpg", alt: "Rugby 1", orientation: "landscape" },
      { src: "/images/gallery/rugby/2.jpg", alt: "Rugby 2", orientation: "portrait" },
      { src: "/images/gallery/rugby/6.jpg", alt: "Rugby 6", orientation: "landscape" },
      { src: "/images/gallery/rugby/4.jpg", alt: "Rugby 4", orientation: "portrait" },
      { src: "/images/gallery/rugby/5.jpg", alt: "Rugby 5", orientation: "portrait" },
      { src: "/images/gallery/rugby/3.jpg", alt: "Rugby 3", orientation: "landscape" },
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
    title: "Other Sports",
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
