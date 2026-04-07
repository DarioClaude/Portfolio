export interface Project {
  slug: string;
  name: string;
  bg: string;
  accent: "white" | "black";
  textColor: string;
  description: string;
}

export const projects: Project[] = [
  {
    slug: "marlay",
    name: "MARLAY",
    bg: "bg-sky-300",
    accent: "white",
    textColor: "text-white",
    description: "Brand identity & portfolio website for a creative developer studio.",
  },
  {
    slug: "garden",
    name: "GARDEN",
    bg: "bg-amber-50",
    accent: "black",
    textColor: "text-gray-900",
    description: "E-commerce platform for a sustainable botanical brand.",
  },
  {
    slug: "studio-arct",
    name: "STUDIO ARCT",
    bg: "bg-gradient-to-br from-gray-100 to-gray-200",
    accent: "black",
    textColor: "text-gray-900",
    description: "Creative agency branding and digital presence redesign.",
  },
  {
    slug: "kora",
    name: "KORA",
    bg: "bg-gray-900",
    accent: "white",
    textColor: "text-white",
    description: "Data visualization dashboard for fintech analytics.",
  },
  {
    slug: "studio-17",
    name: "STUDIO 17",
    bg: "bg-gradient-to-br from-amber-900 to-gray-900",
    accent: "white",
    textColor: "text-white",
    description: "Photography studio website with immersive gallery.",
  },
  {
    slug: "ship-studio",
    name: "SHIP STUDIO",
    bg: "bg-gray-700",
    accent: "white",
    textColor: "text-white",
    description: "Product design studio portfolio with 3D showcases.",
  },
  {
    slug: "cirro",
    name: "CIRRO",
    bg: "bg-gray-300",
    accent: "black",
    textColor: "text-gray-900",
    description: "Cloud infrastructure platform with minimal UI design.",
  },
  {
    slug: "volumaker",
    name: "VOLUMAKER",
    bg: "bg-gradient-to-br from-amber-500 to-orange-600",
    accent: "white",
    textColor: "text-white",
    description: "Audio production SaaS with real-time collaboration tools.",
  },
  {
    slug: "para-bellum",
    name: "PARA BELLUM",
    bg: "bg-gradient-to-br from-purple-900 to-black",
    accent: "white",
    textColor: "text-white",
    description: "Luxury streetwear brand identity and e-commerce experience.",
  },
];
