export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  username?: string;
}

export const socialLinks: SocialLink[] = [
  {
    platform: "Threads",
    url: "https://www.threads.net/@madaldho",
    icon: "threads",
    username: "@madaldho",
  },
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/muhamad-ali-ridho/",
    icon: "linkedin",
    username: "Muhamad Ali Ridho",
  },
  {
    platform: "Instagram",
    url: "https://www.instagram.com/madaldho/",
    icon: "instagram",
    username: "@madaldho",
  },
  {
    platform: "Email",
    url: "mailto:hi@muhamadaliridho.me",
    icon: "mail",
    username: "hi@muhamadaliridho.me",
  },
];

export default socialLinks;
