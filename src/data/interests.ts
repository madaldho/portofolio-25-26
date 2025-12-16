export interface TechInterest {
  id: string;
  name: string;
  icon: string;
  description: string;
  currentlyLearning?: string[];
  color: string;
}

export const techInterests: TechInterest[] = [
  {
    id: "web-dev",
    name: "Web Development",
    icon: "globe",
    description: "Building modern, performant, and scalable web applications using the latest technologies.",
    currentlyLearning: ["HTML/CSS", "JavaScript", "React", "Astro", "TailwindCSS"],
    color: "#3B82F6", // Blue
  },
  {
    id: "design-creative",
    name: "Design & Creative",
    icon: "palette",
    description: "Creating visually stunning designs and engaging multimedia content.",
    currentlyLearning: ["Figma", "Canva", "UI/UX Design", "Graphic Design", "Video Editing"],
    color: "#EC4899", // Pink
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    icon: "trending",
    description: "Optimizing online presence and driving growth through data-driven strategies.",
    currentlyLearning: ["Social Media Marketing", "Content Strategy", "SEO", "Google Analytics", "Email Marketing"],
    color: "#10B981", // Green
  },
  {
    id: "tools",
    name: "Tools & Platforms",
    icon: "tools",
    description: "Leveraging powerful tools to streamline workflows and enhance productivity.",
    currentlyLearning: ["Git/GitHub", "Notion", "Google Workspace", "WordPress"],
    color: "#F59E0B", // Orange
  },
];

export default techInterests;
