export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Skill {
  name: string;
  icon?: string;
  level?: SkillLevel;
}

export interface SkillCategory {
  name: string;
  icon: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Web Development",
    icon: "globe",
    skills: [
      { name: "HTML/CSS", level: "advanced" },
      { name: "JavaScript", level: "intermediate" },
      { name: "React", level: "intermediate" },
      { name: "Astro", level: "intermediate" },
      { name: "TailwindCSS", level: "advanced" },
    ],
  },
  {
    name: "Design & Creative",
    icon: "palette",
    skills: [
      { name: "Figma", level: "intermediate" },
      { name: "Canva", level: "advanced" },
      { name: "UI/UX Design", level: "intermediate" },
      { name: "Graphic Design", level: "intermediate" },
      { name: "Video Editing", level: "beginner" },
    ],
  },
  {
    name: "Digital Marketing",
    icon: "trending",
    skills: [
      { name: "Social Media Marketing", level: "advanced" },
      { name: "Content Strategy", level: "intermediate" },
      { name: "SEO", level: "intermediate" },
      { name: "Google Analytics", level: "intermediate" },
      { name: "Email Marketing", level: "beginner" },
    ],
  },
  {
    name: "Tools & Platforms",
    icon: "tool",
    skills: [
      { name: "Git/GitHub", level: "intermediate" },
      { name: "Notion", level: "advanced" },
      { name: "Google Workspace", level: "advanced" },
      { name: "WordPress", level: "intermediate" },
    ],
  },
];

export default skillCategories;
