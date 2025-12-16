export interface JourneyMilestone {
  year: string;
  title: string;
  description: string;
  icon?: string;
  highlight?: boolean;
}

export const journeyMilestones: JourneyMilestone[] = [
  {
    year: "2020",
    title: "Started Digital Journey",
    description: "Began exploring the world of digital creativity. Learned basic web design and discovered my passion for visual communication.",
    icon: "rocket",
  },
  {
    year: "2021",
    title: "First Web Projects",
    description: "Built my first websites using HTML, CSS, and JavaScript. Started understanding the fundamentals of user experience.",
    icon: "code",
  },
  {
    year: "2022",
    title: "Design & Marketing",
    description: "Expanded into graphic design and digital marketing. Learned to create cohesive brand experiences across platforms.",
    icon: "palette",
    highlight: true,
  },
  {
    year: "2023",
    title: "Freelance Work",
    description: "Started taking on freelance projects. Helped small businesses establish their digital presence.",
    icon: "briefcase",
  },
  {
    year: "2024",
    title: "Growing Skills",
    description: "Deepened expertise in modern web frameworks and advanced design tools. Focus on creating impactful digital experiences.",
    icon: "trending",
    highlight: true,
  },
  {
    year: "2025",
    title: "The Journey Continues",
    description: "Always learning, always creating. Excited to take on new challenges and help more brands succeed digitally.",
    icon: "star",
    highlight: true,
  },
];

export default journeyMilestones;
