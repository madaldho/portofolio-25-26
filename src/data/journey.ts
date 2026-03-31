export interface JourneyMilestone {
  year: string;
  title: string;
  description: string;
  icon?: string;
  highlight?: boolean;
}

export const journeyMilestones: JourneyMilestone[] = [
  {
    year: "2017",
    title: "PERMADANA Management Services Section",
    description: "I help with magazines, agriculture, libraries and documentation.",
    icon: "briefcase",
  },
  {
    year: "2018",
    title: "Learn Videografer & Editor",
    description: "I learned how to edit videos for school needs.",
    icon: "palette",
  },
  {
    year: "2019-2020",
    title: "Digital Marketer",
    description: "I tried the world of online digital marketing which is very fast developing.",
    icon: "trending",
    highlight: true,
  },
  {
    year: "2021-2024",
    title: "Web Developer",
    description: "I'm learning to make a website from an online wordpress CMS invitation to coding now.",
    icon: "code",
    highlight: true,
  },
];

export default journeyMilestones;
