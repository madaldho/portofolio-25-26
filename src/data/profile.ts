export interface Profile {
  name: string;
  title: string;
  tagline: string;
  rotatingTexts: string[];
  bio: string;
  photo: string;
  location: string;
  email: string;
  resumeUrl?: string;
}

export interface MultilingualProfile {
  en: Profile;
  id: Profile;
}

export const profiles: MultilingualProfile = {
  en: {
    name: "Muhamad Ali Ridho",
    title: "Tech Enthusiast",
    tagline: "Building the future one project at a time",
    rotatingTexts: [
      "I create innovative solutions",
      "I explore AI technologies",
      "I build WoW Projects",
      "I develop web applications",
      "I love emerging tech",
    ],
    bio: `Passionate tech enthusiast with a deep interest in artificial intelligence, Internet of Things (IoT), and web development. I love exploring new technologies and creating innovative solutions that make a difference.

From building AI-powered applications to developing IoT systems and crafting modern web experiences - I enjoy the entire technology stack. Every project is an opportunity to learn something new and push the boundaries of what's possible.

When I'm not coding, you'll find me researching the latest tech trends, experimenting with new frameworks, or contributing to open-source projects.`,
    photo: "/profile-photo.jpg",
    location: "Jakarta, Indonesia",
    email: "aldhoproject@gmail.com",
    resumeUrl: "/resume-en.pdf",
  },
  id: {
    name: "Muhamad Ali Ridho",
    title: "Tech Enthusiast",
    tagline: "Membangun masa depan satu proyek pada satu waktu",
    rotatingTexts: [
      "Saya menciptakan solusi inovatif",
      "Saya mengeksplorasi teknologi AI",
      "Saya membangun proyek WoW",
      "Saya mengembangkan aplikasi web",
      "Saya menyukai teknologi baru",
    ],
    bio: `Tech enthusiast yang bersemangat dengan minat mendalam pada artificial intelligence, digital marketing dan web development. Saya suka mengeksplorasi teknologi baru dan menciptakan solusi inovatif yang membuat perbedaan.

Dari membangun aplikasi bertenaga AI hingga mengembangkan sistem IoT dan menciptakan pengalaman web modern - saya menikmati seluruh teknologi stack. Setiap proyek adalah kesempatan untuk mempelajari sesuatu yang baru dan mendorong batas-batas dari apa yang mungkin.

Ketika saya tidak coding, Anda akan menemukan saya meneliti tren teknologi terbaru, bereksperimen dengan framework baru, atau berkontribusi pada proyek open-source.`,
    photo: "/profile-photo.jpg",
    location: "Jakarta, Indonesia",
    email: "aldhoproject@gmail.com",
    resumeUrl: "/resume-id.pdf",
  },
};

// Helper function to get profile based on language
export function getProfile(lang: 'en' | 'id' = 'en'): Profile {
  return profiles[lang];
}

// Backward compatibility - default to English profile
export const profile: Profile = profiles.en;

export default profile;
