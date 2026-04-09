export interface Project {
  id: number;
  slug: string;
  title: string;
  imagePath: string;
  bg: string;
  accent: "white" | "black";
  textColor: string;
  descriptionKey: string;
}

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
  },
];

// First 6 projects used in the carousel
export const carouselProjects = projects.slice(0, 6);
