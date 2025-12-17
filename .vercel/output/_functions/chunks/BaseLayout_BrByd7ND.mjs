import { c as createComponent, m as maybeRenderHead, b as renderScript, a as renderTemplate, d as createAstro, e as addAttribute, r as renderComponent, u as unescapeHTML, g as renderSlot, h as renderHead } from './astro/server_Cs80HLQR.mjs';
import 'piccolore';
/* empty css                             */
import 'clsx';

const $$CustomCursor = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="cursor-container" class="fixed inset-0 pointer-events-none hidden lg:block" style="z-index: 99999; mix-blend-mode: exclusion;" data-astro-cid-ofxtmv4x> <!-- Main cursor dot --> <div id="cursor-dot" class="fixed w-3 h-3 bg-white rounded-full pointer-events-none opacity-0
           transition-opacity duration-300" style="transform: translate(-50%, -50%); z-index: 100001;" data-astro-cid-ofxtmv4x></div> <!-- Cursor ring/follower --> <div id="cursor-ring" class="fixed w-8 h-8 border border-white/80 rounded-full pointer-events-none opacity-0
           transition-all duration-100 ease-out" style="transform: translate(-50%, -50%); z-index: 100000;" data-astro-cid-ofxtmv4x></div> <!-- Cursor glow --> <div id="cursor-glow" class="fixed w-40 h-40 bg-white/5 rounded-full pointer-events-none blur-2xl opacity-0
           transition-all duration-300 ease-out" style="transform: translate(-50%, -50%); z-index: 99999;" data-astro-cid-ofxtmv4x></div> </div> ${renderScript($$result, "/Users/madaldho/Portofolio Baru/src/components/CustomCursor.astro?astro&type=script&index=0&lang.ts")} `;
}, "/Users/madaldho/Portofolio Baru/src/components/CustomCursor.astro", void 0);

const $$ThemeToggle = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<button class="theme-toggle relative w-12 h-12 rounded-full flex items-center justify-center
         bg-dark-surface hover:bg-dark-surface-2
         transition-all duration-300 ease-out-expo
         interactive border border-dark-border hover:border-primary
         group focus-ring" aria-label="Toggle theme" title="Toggle dark/light mode" data-cursor-hover data-astro-cid-x3pjskd3> <!-- Sun Icon (shown in dark mode) --> <svg class="sun-icon w-5 h-5 text-accent transition-all duration-300 absolute
           group-hover:rotate-90 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-x3pjskd3> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" data-astro-cid-x3pjskd3></path> </svg> <!-- Moon Icon (shown in light mode) --> <svg class="moon-icon w-5 h-5 text-dark-bg transition-all duration-300 absolute hidden
           group-hover:-rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-x3pjskd3> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" data-astro-cid-x3pjskd3></path> </svg> </button> ${renderScript($$result, "/Users/madaldho/Portofolio Baru/src/components/ThemeToggle.astro?astro&type=script&index=0&lang.ts")} `;
}, "/Users/madaldho/Portofolio Baru/src/components/ThemeToggle.astro", void 0);

const languages = {
  en: "English",
  id: "Bahasa Indonesia"
};
const defaultLang = "en";
const ui = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.blog": "Blog",
    "nav.certificates": "Certificates",
    "nav.contact": "Contact",
    // Hero Section
    "hero.greeting": "Hi, I'm",
    "hero.name": "Muhamad Ali Ridho",
    "hero.title": "Tech Enthusiast",
    "hero.subtitle": "Exploring AI, IoT, Web Development, and more",
    "hero.description": "Building the future one project at a time. Passionate about emerging technologies and creating innovative solutions.",
    "hero.cta.projects": "View Projects",
    "hero.cta.contact": "Get in Touch",
    // About Section
    "about.title": "About Me",
    "about.subtitle": "Get to know me better",
    "about.description": "I'm a passionate tech enthusiast with a deep interest in artificial intelligence, Internet of Things (IoT), and web development. I love exploring new technologies and creating innovative solutions that make a difference.",
    "about.skills": "Technical Expertise",
    "about.skillsDesc": "Technologies and tools I work with",
    "about.interests": "Tech Interests",
    "about.journey": "My Journey",
    "about.downloadResume": "Download Resume",
    // Projects Section
    "projects.title": "Featured Projects",
    "projects.subtitle": "Some of my recent work",
    "projects.viewAll": "View All Projects",
    "projects.liveDemo": "Live Demo",
    "projects.sourceCode": "Source Code",
    "projects.category.web": "Web Development",
    "projects.category.mobile": "Mobile Development",
    "projects.category.iot": "IoT Projects",
    "projects.category.ai-ml": "AI/ML Projects",
    "projects.category.other": "Other Projects",
    // Blog Section
    "blog.title": "Latest Blog Posts",
    "blog.subtitle": "Thoughts, tutorials, and insights",
    "blog.readMore": "Read More",
    "blog.viewAll": "View All Posts",
    "blog.publishedOn": "Published on",
    "blog.readTime": "min read",
    // Contact Section
    "contact.title": "Get In Touch",
    "contact.subtitle": "Let's work together",
    "contact.description": "I'm always interested in new opportunities and collaborations. Feel free to reach out!",
    "contact.email": "Email",
    "contact.social": "Social Media",
    "contact.location": "Jakarta, Indonesia",
    // Footer
    "footer.copyright": "All rights reserved",
    "footer.builtWith": "Built with",
    "footer.and": "and",
    // Common
    "common.loading": "Loading...",
    "common.error": "Something went wrong",
    "common.tryAgain": "Try Again",
    "common.close": "Close",
    "common.open": "Open",
    "common.menu": "Menu",
    "common.language": "Language",
    "common.theme": "Theme",
    "common.lightMode": "Light Mode",
    "common.darkMode": "Dark Mode",
    // SEO
    "seo.title": "Muhamad Ali Ridho - Tech Enthusiast | AI, IoT & Web Development Portfolio",
    "seo.description": "Portfolio of Muhamad Ali Ridho, a Tech Enthusiast exploring AI, IoT, Web Development, and more. Building the future one project at a time.",
    "seo.keywords": "Muhamad Ali Ridho, madaldho, Tech Enthusiast, Full Stack Developer, Web Development, AI Development, IoT Projects, JavaScript Developer, React Developer, Node.js Developer, Tech Blog, Programming Portfolio, Indonesia Developer, Jakarta Tech",
    // Certificates
    "certificates.title": "My Certificates",
    "certificates.subtitle": "Professional certifications and achievements that showcase my expertise",
    // Skills Descriptions (Data)
    "skills.webDev.name": "Web Development",
    "skills.webDev.desc": "Building modern, performant, and scalable web applications using the latest technologies.",
    "skills.design.name": "Design & Creative",
    "skills.design.desc": "Creating visually stunning designs and engaging multimedia content.",
    "skills.marketing.name": "Digital Marketing",
    "skills.marketing.desc": "Optimizing online presence and driving growth through data-driven strategies.",
    "skills.tools.name": "Tools & Platforms",
    "skills.tools.desc": "Leveraging powerful tools to streamline workflows and enhance productivity.",
    // Journey Descriptions (Data)
    "journey.2020.title": "Started Digital Journey",
    "journey.2020.desc": "Began exploring the world of digital creativity. Learned basic web design and discovered my passion for visual communication.",
    "journey.2021.title": "First Web Projects",
    "journey.2021.desc": "Built my first websites using HTML, CSS, and JavaScript. Started understanding the fundamentals of user experience.",
    "journey.2022.title": "Design & Marketing",
    "journey.2022.desc": "Expanded into graphic design and digital marketing. Learned to create cohesive brand experiences across platforms.",
    "journey.2023.title": "Freelance Work",
    "journey.2023.desc": "Started taking on freelance projects. Helped small businesses establish their digital presence.",
    "journey.2024.title": "Growing Skills",
    "journey.2024.desc": "Deepened expertise in modern web frameworks and advanced design tools. Focus on creating impactful digital experiences.",
    "journey.2025.title": "The Journey Continues",
    "journey.2025.desc": "Always learning, always creating. Excited to take on new challenges and help more brands succeed digitally.",
    // Additional Section Headers
    "section.blog.label": "From My Blog",
    "section.blog.desc": "Sharing insights, tutorials, and discoveries from my tech journey",
    "section.certificates.label": "Achievements",
    "section.projects.label": "My Work",
    "section.projects.desc": "A collection of projects across different technology domains",
    "section.techStack": "Tech Stack",
    // Categories
    "category.all": "All",
    "category.web": "Web",
    "category.mobile": "Mobile",
    "category.iot": "IoT",
    "category.aiMl": "AI/ML",
    "category.design": "Design"
  },
  id: {
    // Navigation
    "nav.home": "Beranda",
    "nav.about": "Tentang",
    "nav.projects": "Proyek",
    "nav.blog": "Blog",
    "nav.certificates": "Sertifikat",
    "nav.contact": "Kontak",
    // Hero Section
    "hero.greeting": "Halo, saya",
    "hero.name": "Muhamad Ali Ridho",
    "hero.title": "Tech Enthusiast",
    "hero.subtitle": "Mengeksplorasi AI, IoT, Web Development, dan lainnya",
    "hero.description": "Membangun masa depan satu proyek pada satu waktu. Bersemangat tentang teknologi baru dan menciptakan solusi inovatif.",
    "hero.cta.projects": "Lihat Proyek",
    "hero.cta.contact": "Hubungi Saya",
    // About Section
    "about.title": "Tentang Saya",
    "about.subtitle": "Mengenal saya lebih dekat",
    "about.description": "Saya seorang penggemar teknologi yang bersemangat dengan minat mendalam pada kecerdasan buatan, Internet of Things (IoT), dan pengembangan web.",
    "about.skills": "Keahlian Teknis",
    "about.skillsDesc": "Teknologi dan alat yang sering saya gunakan",
    "about.interests": "Minat Teknologi",
    "about.journey": "Perjalanan Saya",
    "about.downloadResume": "Unduh Resume",
    // Projects Section
    "projects.title": "Proyek Unggulan",
    "projects.subtitle": "Beberapa karya terbaru saya",
    "projects.viewAll": "Lihat Semua Proyek",
    "projects.liveDemo": "Demo Langsung",
    "projects.sourceCode": "Kode Sumber",
    "projects.category.web": "Pengembangan Web",
    "projects.category.mobile": "Pengembangan Mobile",
    "projects.category.iot": "Proyek IoT",
    "projects.category.ai-ml": "Proyek AI/ML",
    "projects.category.other": "Proyek Lainnya",
    "projects.viewLive": "Lihat Langsung",
    "projects.viewSource": "Lihat Kode",
    "projects.viewProject": "Lihat Detail",
    // Categories
    "category.all": "Semua",
    "category.web": "Web",
    "category.mobile": "Mobile",
    "category.iot": "IoT",
    "category.aiMl": "AI/ML",
    "category.design": "Desain",
    // Blog Section
    "blog.title": "Postingan Blog Terbaru",
    "blog.subtitle": "Pemikiran, tutorial, dan wawasan",
    "blog.readMore": "Baca Selengkapnya",
    "blog.viewAll": "Lihat Semua Postingan",
    "blog.publishedOn": "Dipublikasikan pada",
    "blog.readTime": "menit baca",
    // Contact Section
    "contact.title": "Mari Berkolaborasi",
    "contact.subtitle": "Mari bekerja sama",
    "contact.description": "Saya selalu tertarik dengan peluang dan kolaborasi baru. Jangan ragu untuk menghubungi saya!",
    "contact.email": "Email",
    "contact.social": "Media Sosial",
    "contact.location": "Jakarta, Indonesia",
    // Footer
    "footer.copyright": "Semua hak dilindungi",
    "footer.builtWith": "Dibuat dengan",
    "footer.and": "dan",
    // Common
    "common.loading": "Memuat...",
    "common.error": "Terjadi kesalahan",
    "common.tryAgain": "Coba Lagi",
    "common.close": "Tutup",
    "common.open": "Buka",
    "common.menu": "Menu",
    "common.language": "Bahasa",
    "common.theme": "Tema",
    "common.lightMode": "Mode Terang",
    "common.darkMode": "Mode Gelap",
    // SEO
    "seo.title": "Muhamad Ali Ridho - Tech Enthusiast | Portfolio AI, IoT & Web Development",
    "seo.description": "Portfolio Muhamad Ali Ridho, seorang Tech Enthusiast yang mengeksplorasi AI, IoT, Web Development, dan lainnya. Membangun masa depan satu proyek pada satu waktu.",
    "seo.keywords": "Muhamad Ali Ridho, madaldho, Tech Enthusiast, Full Stack Developer, Web Development, AI Development, Proyek IoT, JavaScript Developer, React Developer, Node.js Developer, Tech Blog, Portfolio Programming, Developer Indonesia, Jakarta Tech",
    // Certificates
    "certificates.title": "Sertifikat Saya",
    "certificates.subtitle": "Sertifikasi profesional dan pencapaian yang menunjukkan keahlian saya",
    "certificates.viewAll": "Lihat Semua Sertifikat",
    // Skills Descriptions (Data)
    "skills.webDev.name": "Pengembangan Web",
    "skills.webDev.desc": "Membangun aplikasi web modern, berkinerja tinggi, dan skalabel menggunakan teknologi terbaru.",
    "skills.design.name": "Desain & Kreatif",
    "skills.design.desc": "Menciptakan desain visual yang memukau dan konten multimedia yang menarik.",
    "skills.marketing.name": "Pemasaran Digital",
    "skills.marketing.desc": "Mengoptimalkan kehadiran online dan mendorong pertumbuhan melalui strategi berbasis data.",
    "skills.tools.name": "Alat & Platform",
    "skills.tools.desc": "Memanfaatkan alat canggih untuk menyederhanakan alur kerja dan meningkatkan produktivitas.",
    // Journey Descriptions (Data)
    "journey.2020.title": "Memulai Perjalanan Digital",
    "journey.2020.desc": "Mulai menjelajahi dunia kreativitas digital. Belajar desain web dasar dan menemukan passion dalam komunikasi visual.",
    "journey.2021.title": "Proyek Web Pertama",
    "journey.2021.desc": "Membangun website pertama menggunakan HTML, CSS, dan JavaScript. Mulai memahami dasar-dasar pengalaman pengguna (UX).",
    "journey.2022.title": "Desain & Pemasaran",
    "journey.2022.desc": "Merambah ke desain grafis dan pemasaran digital. Belajar menciptakan pengalaman brand yang kohesif di berbagai platform.",
    "journey.2023.title": "Pekerjaan Freelance",
    "journey.2023.desc": "Mulai mengerjakan proyek freelance. Membantu bisnis kecil membangun kehadiran digital mereka.",
    "journey.2024.title": "Mengembangkan Keahlian",
    "journey.2024.desc": "Memperdalam keahlian dalam framework web modern dan alat desain tingkat lanjut. Fokus menciptakan pengalaman digital yang berdampak.",
    "journey.2025.title": "Perjalanan Berlanjut",
    "journey.2025.desc": "Selalu belajar, selalu berkarya. Bersemangat untuk mengambil tantangan baru dan membantu lebih banyak brand sukses secara digital.",
    // Additional Section Headers
    "section.blog.label": "Dari Blog Saya",
    "section.blog.desc": "Berbagi wawasan, tutorial, dan penemuan dari perjalanan teknologi saya",
    "section.certificates.label": "Pencapaian",
    "section.projects.label": "Karya Saya",
    "section.projects.desc": "Koleksi proyek di berbagai domain teknologi",
    "section.techStack": "Stack Teknologi"
  }
};

function getLangFromUrl(url) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang;
  return defaultLang;
}
function useTranslations(lang) {
  return function t(key) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}
function useTranslatedPath(lang) {
  return function translatePath(path, l = lang) {
    return l === defaultLang ? path : `/${l}${path}`;
  };
}
function getLocalizedUrl(url, locale) {
  if (locale === defaultLang && true) {
    return url;
  }
  return `/${locale}${url}`;
}
function removeLocaleFromUrl(url) {
  const segments = url.split("/");
  if (segments[1] in ui) {
    segments.splice(1, 1);
  }
  return segments.join("/") || "/";
}
function getAlternateLanguages(currentUrl) {
  const currentLang = getLangFromUrl(currentUrl);
  const route = removeLocaleFromUrl(currentUrl.pathname);
  return Object.keys(ui).map((lang) => ({
    lang,
    url: getLocalizedUrl(route, lang),
    label: ui[lang]["common.language"] || lang
  })).filter((item) => item.lang !== currentLang);
}
function getLocalizedMetadata(lang) {
  const t = useTranslations(lang);
  return {
    title: t("seo.title"),
    description: t("seo.description"),
    keywords: t("seo.keywords")
  };
}
function formatDate(date, lang) {
  const locale = lang === "id" ? "id-ID" : "en-US";
  let dateObj;
  if (typeof date === "string") {
    dateObj = new Date(date);
  } else {
    dateObj = date;
  }
  if (isNaN(dateObj.getTime())) {
    return lang === "id" ? "Tanggal tidak valid" : "Invalid date";
  }
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(dateObj);
}

const $$Astro$3 = createAstro("https://muhamadaliridho.me");
const $$LanguagePicker = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$LanguagePicker;
  const lang = getLangFromUrl(Astro2.url);
  const translatePath = useTranslatedPath(lang);
  const currentRoute = removeLocaleFromUrl(Astro2.url.pathname);
  return renderTemplate`${maybeRenderHead()}<div class="language-picker relative group" data-astro-cid-dkurt46j> <button class="language-toggle-btn flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 transition-all duration-200 text-white w-full justify-between focus:outline-none focus:ring-2 focus:ring-primary/50" aria-label="Select Language" data-astro-cid-dkurt46j> <div class="flex items-center gap-2" data-astro-cid-dkurt46j> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-dkurt46j> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" data-astro-cid-dkurt46j></path> </svg> <span class="text-sm font-medium" data-astro-cid-dkurt46j> ${lang === "id" ? "ID" : "EN"} </span> </div> <svg class="language-chevron w-3 h-3 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-dkurt46j> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-astro-cid-dkurt46j></path> </svg> </button> <div class="language-menu absolute right-0 top-full mt-2 w-48 bg-dark-surface/95 backdrop-blur-xl rounded-lg shadow-xl border border-dark-border opacity-0 invisible transform scale-95 transition-all duration-200 z-50 origin-top-right group-hover:block nav-dropdown" data-astro-cid-dkurt46j> ${Object.entries(languages).map(([langCode, label]) => renderTemplate`<a${addAttribute(translatePath(currentRoute, langCode), "href")}${addAttribute(`flex items-center gap-3 px-4 py-3 text-sm hover:bg-white/10 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${lang === langCode ? "bg-primary/20 text-primary font-medium" : "text-white/80 hover:text-white"}`, "class")} data-astro-cid-dkurt46j> <div class="flex items-center gap-2" data-astro-cid-dkurt46j> ${langCode === "id" ? renderTemplate`<span class="text-lg" data-astro-cid-dkurt46j>🇮🇩</span>` : renderTemplate`<span class="text-lg" data-astro-cid-dkurt46j>🇺🇸</span>`} <span data-astro-cid-dkurt46j>${label}</span> </div> ${lang === langCode && renderTemplate`<svg class="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20" data-astro-cid-dkurt46j> <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" data-astro-cid-dkurt46j></path> </svg>`} </a>`)} </div> </div> ${renderScript($$result, "/Users/madaldho/Portofolio Baru/src/components/LanguagePicker.astro?astro&type=script&index=0&lang.ts")} `;
}, "/Users/madaldho/Portofolio Baru/src/components/LanguagePicker.astro", void 0);

const $$Astro$2 = createAstro("https://muhamadaliridho.me");
const $$Navigation = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Navigation;
  const lang = getLangFromUrl(Astro2.url);
  const t = useTranslations(lang);
  const translatePath = useTranslatedPath(lang);
  const navLinks = [
    { label: t("nav.home"), href: translatePath("/") },
    { label: t("nav.about"), href: translatePath("/#about") },
    { label: t("nav.projects"), href: translatePath("/#projects") },
    { label: t("nav.blog"), href: translatePath("/blog") },
    { label: t("nav.certificates"), href: translatePath("/#certificates") },
    { label: t("nav.contact"), href: translatePath("/#contact") }
  ];
  return renderTemplate`${maybeRenderHead()}<header id="navbar" class="fixed top-0 left-0 right-0 transition-all duration-500 z-navigation" data-astro-cid-pux6a34n> <nav class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between" data-astro-cid-pux6a34n> <!-- Logo --> <a href="/" class="text-2xl font-display font-bold gradient-text interactive-subtle focus-ring" data-cursor-hover data-astro-cid-pux6a34n>
MAR
</a> <!-- Desktop Navigation --> <div class="hidden md:flex items-center gap-6" data-astro-cid-pux6a34n> ${navLinks.map((link) => renderTemplate`<a${addAttribute(link.href, "href")} class="nav-link text-sm font-medium text-white/70 hover:text-white 
                 transition-colors duration-300 link-underline focus-ring"${addAttribute(link.href.replace("#", ""), "data-section")} data-cursor-hover data-astro-cid-pux6a34n> ${link.label} </a>`)} <div class="flex items-center gap-3" data-astro-cid-pux6a34n> ${renderComponent($$result, "LanguagePicker", $$LanguagePicker, { "data-astro-cid-pux6a34n": true })} ${renderComponent($$result, "ThemeToggle", $$ThemeToggle, { "data-astro-cid-pux6a34n": true })} </div> </div> <!-- Mobile Menu Button --> <button id="mobile-menu-btn" class="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5
             rounded-lg hover:bg-dark-surface transition-colors focus-ring" aria-label="Toggle menu" data-astro-cid-pux6a34n> <span class="hamburger-line w-6 h-0.5 bg-white transition-all duration-300" data-astro-cid-pux6a34n></span> <span class="hamburger-line w-6 h-0.5 bg-white transition-all duration-300" data-astro-cid-pux6a34n></span> <span class="hamburger-line w-4 h-0.5 bg-white transition-all duration-300 self-end mr-2" data-astro-cid-pux6a34n></span> </button> </nav> <!-- Mobile Menu --> <div id="mobile-menu" class="md:hidden fixed inset-0 bg-dark-bg/98 backdrop-blur-2xl
           transform translate-x-full transition-transform duration-500 ease-out-expo
           z-overlay flex flex-col pt-[72px]" data-astro-cid-pux6a34n> <!-- Gradient overlay for premium look --> <div class="absolute inset-0 bg-linear-to-b from-primary/5 via-transparent to-secondary/5 pointer-events-none" data-astro-cid-pux6a34n></div> <div class="relative flex flex-col items-center justify-start py-8 min-h-full gap-4 px-6 overflow-y-auto" data-astro-cid-pux6a34n> <!-- Close button indicator --> <div class="w-12 h-1 bg-white/20 rounded-full mb-6 shrink-0" data-astro-cid-pux6a34n></div> ${navLinks.map((link, index) => renderTemplate`<a${addAttribute(link.href, "href")} class="mobile-nav-link group text-xl md:text-2xl font-display font-bold text-white/80 
                 hover:text-white transition-all duration-300
                 opacity-0 translate-y-4 py-4 px-6 rounded-xl hover:bg-white/10
                 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white/10
                 w-full max-w-sm text-center border border-transparent hover:border-white/10
                 active:scale-95 shrink-0"${addAttribute(link.href.replace("#", ""), "data-section")}${addAttribute(`animation-delay: ${index * 0.05}s`, "style")} data-astro-cid-pux6a34n> <span class="relative" data-astro-cid-pux6a34n> ${link.label} <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" data-astro-cid-pux6a34n></span> </span> </a>`)} <!-- Divider --> <div class="w-full max-w-sm h-px bg-white/10 my-4 shrink-0" data-astro-cid-pux6a34n></div> <!-- Language and Theme controls --> <div id="mobile-controls" class="flex items-center justify-center gap-6 opacity-0 translate-y-4 transition-all duration-300 w-full max-w-sm shrink-0" data-astro-cid-pux6a34n> <div class="flex flex-col items-center gap-2" data-astro-cid-pux6a34n> <span class="text-xs text-white/70 uppercase tracking-wider" data-astro-cid-pux6a34n>Language</span> ${renderComponent($$result, "LanguagePicker", $$LanguagePicker, { "data-astro-cid-pux6a34n": true })} </div> <div class="w-px h-12 bg-white/10" data-astro-cid-pux6a34n></div> <div class="flex flex-col items-center gap-2" data-astro-cid-pux6a34n> <span class="text-xs text-white/70 uppercase tracking-wider" data-astro-cid-pux6a34n>Theme</span> ${renderComponent($$result, "ThemeToggle", $$ThemeToggle, { "data-astro-cid-pux6a34n": true })} </div> </div> <!-- Social hint --> <p class="text-white/30 text-sm mt-8 pb-8 shrink-0" data-astro-cid-pux6a34n>
Made with ❤️ by MAR
</p> </div> </div> </header> ${renderScript($$result, "/Users/madaldho/Portofolio Baru/src/components/Navigation.astro?astro&type=script&index=0&lang.ts")} `;
}, "/Users/madaldho/Portofolio Baru/src/components/Navigation.astro", void 0);

class SEOManager {
  primaryKeyword = "Muhamad Ali Ridho";
  siteUrl = "https://muhamadaliridho.me";
  defaultImage = "/og-image.png";
  // Generate comprehensive meta tags
  generateMetaTags(page) {
    const title = this.optimizeTitle(page.title);
    const description = this.optimizeDescription(page.description);
    const canonicalUrl = `${this.siteUrl}${page.url}`;
    const imageUrl = page.image ? `${this.siteUrl}${page.image}` : `${this.siteUrl}${this.defaultImage}`;
    return `
    <!-- Primary Meta Tags -->
    <title>${title}</title>
    <meta name="title" content="${title}" />
    <meta name="description" content="${description}" />
    <meta name="keywords" content="${this.generateKeywords(page.tags).join(", ")}" />
    <meta name="author" content="${this.primaryKeyword}" />
    <link rel="canonical" href="${canonicalUrl}" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="${page.type || "website"}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:site_name" content="${this.primaryKeyword} - Tech Portfolio" />
    ${page.publishedTime ? `<meta property="article:published_time" content="${page.publishedTime}" />` : ""}
    ${page.modifiedTime ? `<meta property="article:modified_time" content="${page.modifiedTime}" />` : ""}
    ${page.author ? `<meta property="article:author" content="${page.author}" />` : ""}
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${canonicalUrl}" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${imageUrl}" />
    <meta name="twitter:creator" content="@muhamadaliridho" />
    
    <!-- Additional SEO -->
    <meta name="robots" content="index, follow" />
    <meta name="googlebot" content="index, follow" />
    <meta name="language" content="English" />
    <meta name="revisit-after" content="7 days" />
    `;
  }
  // Generate schema markup for different page types
  generateSchemaMarkup(type, data) {
    const baseSchema = {
      "@context": "https://schema.org"
    };
    switch (type) {
      case "person":
        return {
          ...baseSchema,
          "@type": "Person",
          name: this.primaryKeyword,
          url: this.siteUrl,
          image: `${this.siteUrl}/profile-photo.jpg`,
          jobTitle: "Tech Enthusiast & Full Stack Developer",
          description: "Tech Enthusiast exploring AI, IoT, Web Development, and more. Building the future one project at a time.",
          knowsAbout: [
            "Web Development",
            "Mobile Development",
            "Internet of Things (IoT)",
            "Artificial Intelligence",
            "Machine Learning",
            "JavaScript",
            "TypeScript",
            "React",
            "Node.js",
            "Python",
            "Arduino",
            "ESP32"
          ],
          sameAs: [
            "https://github.com/muhamadaliridho",
            "https://linkedin.com/in/muhamadaliridho",
            "https://twitter.com/muhamadaliridho"
          ],
          worksFor: {
            "@type": "Organization",
            name: "Freelance Developer"
          },
          alumniOf: {
            "@type": "EducationalOrganization",
            name: "Tech University"
          }
        };
      case "article":
        return {
          ...baseSchema,
          "@type": "Article",
          headline: data?.title || "",
          description: data?.description || "",
          image: data?.image ? `${this.siteUrl}${data.image}` : `${this.siteUrl}${this.defaultImage}`,
          author: {
            "@type": "Person",
            name: this.primaryKeyword,
            url: this.siteUrl
          },
          publisher: {
            "@type": "Person",
            name: this.primaryKeyword,
            logo: {
              "@type": "ImageObject",
              url: `${this.siteUrl}/logo.png`
            }
          },
          datePublished: data?.publishedTime || (/* @__PURE__ */ new Date()).toISOString(),
          dateModified: data?.modifiedTime || (/* @__PURE__ */ new Date()).toISOString(),
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${this.siteUrl}${data?.url || ""}`
          },
          keywords: data?.tags?.join(", ") || ""
        };
      case "website":
        return {
          ...baseSchema,
          "@type": "WebSite",
          name: `${this.primaryKeyword} - Tech Portfolio`,
          description: "Tech Enthusiast exploring AI, IoT, Web Development, and more. Building the future one project at a time.",
          url: this.siteUrl,
          author: {
            "@type": "Person",
            name: this.primaryKeyword
          },
          potentialAction: {
            "@type": "SearchAction",
            target: `${this.siteUrl}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        };
      default:
        return baseSchema;
    }
  }
  // Optimize title for SEO with primary keyword
  optimizeTitle(title) {
    const titleStr = typeof title === "string" ? title : String(title || "");
    if (titleStr.toLowerCase().includes(this.primaryKeyword.toLowerCase())) {
      return titleStr;
    }
    if (titleStr.toLowerCase().includes("home") || titleStr === "Muhamad Ali Ridho") {
      return `${this.primaryKeyword} - Tech Enthusiast | AI, IoT & Web Development Portfolio`;
    }
    return `${titleStr} | ${this.primaryKeyword} - Tech Blog`;
  }
  // Optimize description for SEO
  optimizeDescription(description) {
    const desc = typeof description === "string" ? description : String(description || "");
    if (!desc.toLowerCase().includes(this.primaryKeyword.toLowerCase())) {
      return `${desc} Learn more from ${this.primaryKeyword}, a tech enthusiast exploring AI, IoT, and web development.`;
    }
    return desc;
  }
  // Generate SEO-optimized keywords
  generateKeywords(tags) {
    const baseKeywords = [
      this.primaryKeyword,
      "Tech Enthusiast",
      "Full Stack Developer",
      "Web Development",
      "AI Development",
      "IoT Projects",
      "JavaScript Developer",
      "React Developer",
      "Node.js Developer",
      "Tech Blog",
      "Programming Portfolio"
    ];
    if (tags && tags.length > 0) {
      return [...baseKeywords, ...tags];
    }
    return baseKeywords;
  }
  // Generate structured data for breadcrumbs
  generateBreadcrumbSchema(breadcrumbs) {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: `${this.siteUrl}${crumb.url}`
      }))
    };
  }
  // Generate FAQ schema for blog posts
  generateFAQSchema(faqs) {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer
        }
      }))
    };
  }
  // Generate sitemap XML
  generateSitemap(pages) {
    const urls = pages.map((page) => `
    <url>
      <loc>${this.siteUrl}${page.url}</loc>
      <lastmod>${page.lastmod || (/* @__PURE__ */ new Date()).toISOString().split("T")[0]}</lastmod>
      <priority>${page.priority || 0.8}</priority>
      <changefreq>weekly</changefreq>
    </url>`).join("");
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${this.siteUrl}</loc>
    <lastmod>${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}</lastmod>
    <priority>1.0</priority>
    <changefreq>daily</changefreq>
  </url>${urls}
</urlset>`;
  }
  // Generate robots.txt
  generateRobotsTxt() {
    return `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${this.siteUrl}/sitemap.xml

# Disallow admin areas
Disallow: /admin-aldho/

# Allow all other content
Allow: /blog/
Allow: /projects/
Allow: /about/
Allow: /contact/

# Crawl delay
Crawl-delay: 1`;
  }
  // Optimize content for keyword density
  optimizeContentForKeyword(content, targetKeyword = this.primaryKeyword) {
    const words = content.split(" ");
    const keywordCount = content.toLowerCase().split(targetKeyword.toLowerCase()).length - 1;
    const keywordDensity = keywordCount / words.length * 100;
    if (keywordDensity < 1) {
      const sentences = content.split(". ");
      if (sentences.length > 2) {
        sentences[1] += ` This article by ${targetKeyword} explores`;
        return sentences.join(". ");
      }
    }
    return content;
  }
  // Validate SEO requirements
  validateSEO(page) {
    const issues = [];
    if (!page.title) {
      issues.push("Title is missing");
    } else if (page.title.length > 60) {
      issues.push("Title is too long (should be under 60 characters)");
    } else if (!page.title.toLowerCase().includes(this.primaryKeyword.toLowerCase())) {
      issues.push(`Title should include "${this.primaryKeyword}"`);
    }
    if (!page.description) {
      issues.push("Description is missing");
    } else if (page.description.length > 160) {
      issues.push("Description is too long (should be under 160 characters)");
    } else if (page.description.length < 120) {
      issues.push("Description is too short (should be at least 120 characters)");
    }
    if (!page.url) {
      issues.push("URL is missing");
    } else if (page.url.length > 100) {
      issues.push("URL is too long");
    }
    return {
      isValid: issues.length === 0,
      issues
    };
  }
}
const seoManager = new SEOManager();

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1, _b, _c, _d;
const $$Astro$1 = createAstro("https://muhamadaliridho.me");
const $$SEO = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SEO;
  const lang = getLangFromUrl(Astro2.url);
  const localizedMeta = getLocalizedMetadata(lang);
  const alternateLanguages = getAlternateLanguages(Astro2.url);
  const {
    title = localizedMeta.title,
    description = localizedMeta.description,
    image = "/og-image.png",
    type = "website",
    publishedTime,
    modifiedTime,
    tags,
    author = "Muhamad Ali Ridho",
    canonicalUrl,
    noindex = false,
    structuredData = []
  } = Astro2.props;
  const canonical = canonicalUrl || new URL(Astro2.url.pathname, Astro2.site).toString();
  const pageData = {
    title,
    description,
    url: Astro2.url.pathname,
    image,
    type,
    publishedTime,
    modifiedTime,
    author,
    tags
  };
  const optimizedTitle = seoManager.optimizeTitle(title);
  const optimizedDescription = seoManager.optimizeDescription(description);
  const personSchema = seoManager.generateSchemaMarkup("person");
  const websiteSchema = seoManager.generateSchemaMarkup("website");
  const pageSchema = type === "article" ? seoManager.generateSchemaMarkup("article", pageData) : null;
  const breadcrumbs = [];
  if (Astro2.url.pathname !== "/") {
    breadcrumbs.push({ name: "Home", url: "/" });
    const pathSegments = Astro2.url.pathname.split("/").filter(Boolean);
    let currentPath = "";
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      if (!isLast) {
        breadcrumbs.push({
          name: segment.charAt(0).toUpperCase() + segment.slice(1),
          url: currentPath
        });
      }
    });
  }
  const breadcrumbSchema = breadcrumbs.length > 0 ? seoManager.generateBreadcrumbSchema(breadcrumbs) : null;
  const keywords = localizedMeta.keywords + (tags ? ", " + tags.join(", ") : "");
  const imageUrl = image.startsWith("http") ? image : new URL(image, Astro2.site).toString();
  return renderTemplate(_d || (_d = __template$1(["<!-- Primary Meta Tags --><title>", '</title><meta name="title"', '><meta name="description"', '><meta name="keywords"', '><meta name="author"', '><meta name="robots"', '><meta name="googlebot"', '><meta name="language"', '><meta name="revisit-after" content="7 days"><meta name="rating" content="General"><meta name="distribution" content="Global"><link rel="canonical"', '><!-- Open Graph / Facebook --><meta property="og:type"', '><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt"', '><meta property="og:site_name" content="Muhamad Ali Ridho - Tech Portfolio"><meta property="og:locale"', ">", "", '<meta property="article:author"', ">", '<!-- Twitter --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:url"', '><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image"', '><meta name="twitter:image:alt"', '><meta name="twitter:creator" content="@muhamadaliridho"><meta name="twitter:site" content="@muhamadaliridho"><!-- Additional SEO Meta Tags --><meta name="theme-color" content="#1e40af"><meta name="msapplication-TileColor" content="#1e40af"><meta name="application-name" content="Muhamad Ali Ridho Portfolio"><meta name="apple-mobile-web-app-title" content="Muhamad Ali Ridho"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="default"><meta name="format-detection" content="telephone=no"><!-- Geo Meta Tags for Local SEO --><meta name="geo.region" content="ID-JK"><meta name="geo.placename" content="Jakarta, Indonesia"><meta name="geo.position" content="-6.2088;106.8456"><meta name="ICBM" content="-6.2088, 106.8456"><!-- Schema.org Structured Data --><script type="application/ld+json">', '<\/script><script type="application/ld+json">', "<\/script>", "", "<!-- Additional Structured Data -->", '<!-- Preconnect to external domains --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="preconnect" href="https://api.fontshare.com"><link rel="preconnect" href="https://images.ctfassets.net"><!-- DNS Prefetch for performance --><link rel="dns-prefetch" href="https://www.google-analytics.com"><link rel="dns-prefetch" href="https://www.googletagmanager.com"><!-- Alternate language versions --><link rel="alternate"', "", '><link rel="alternate" hreflang="x-default"', ">", "<!-- RSS Feed (if blog exists) -->", '<!-- Verification Meta Tags (add your verification codes) --><!-- <meta name="google-site-verification" content="your-google-verification-code" /> --><!-- <meta name="msvalidate.01" content="your-bing-verification-code" /> --><!-- <meta name="yandex-verification" content="your-yandex-verification-code" /> -->'])), optimizedTitle, addAttribute(optimizedTitle, "content"), addAttribute(optimizedDescription, "content"), addAttribute(keywords, "content"), addAttribute(author, "content"), addAttribute(noindex ? "noindex, nofollow" : "index, follow", "content"), addAttribute(noindex ? "noindex, nofollow" : "index, follow", "content"), addAttribute(lang === "id" ? "Indonesian" : "English", "content"), addAttribute(canonical, "href"), addAttribute(type, "content"), addAttribute(canonical, "content"), addAttribute(optimizedTitle, "content"), addAttribute(optimizedDescription, "content"), addAttribute(imageUrl, "content"), addAttribute(optimizedTitle, "content"), addAttribute(lang === "id" ? "id_ID" : "en_US", "content"), publishedTime && renderTemplate`<meta property="article:published_time"${addAttribute(publishedTime, "content")}>`, modifiedTime && renderTemplate`<meta property="article:modified_time"${addAttribute(modifiedTime, "content")}>`, addAttribute(author, "content"), tags && tags.map((tag) => renderTemplate`<meta property="article:tag"${addAttribute(tag, "content")}>`), addAttribute(canonical, "content"), addAttribute(optimizedTitle, "content"), addAttribute(optimizedDescription, "content"), addAttribute(imageUrl, "content"), addAttribute(optimizedTitle, "content"), unescapeHTML(JSON.stringify(personSchema)), unescapeHTML(JSON.stringify(websiteSchema)), pageSchema && renderTemplate(_a$1 || (_a$1 = __template$1(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(pageSchema))), breadcrumbSchema && renderTemplate(_b || (_b = __template$1(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(breadcrumbSchema))), structuredData.map((schema) => renderTemplate(_c || (_c = __template$1(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(schema)))), addAttribute(lang, "hreflang"), addAttribute(canonical, "href"), addAttribute(new URL(removeLocaleFromUrl(Astro2.url.pathname), Astro2.site).toString(), "href"), alternateLanguages.map((altLang) => renderTemplate`<link rel="alternate"${addAttribute(altLang.lang, "hreflang")}${addAttribute(new URL(altLang.url, Astro2.site).toString(), "href")}>`), Astro2.url.pathname.startsWith("/blog") && renderTemplate`<link rel="alternate" type="application/rss+xml" title="Muhamad Ali Ridho - Tech Blog" href="/rss.xml">`);
}, "/Users/madaldho/Portofolio Baru/src/components/SEO.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://muhamadaliridho.me");
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const lang = getLangFromUrl(Astro2.url);
  const localizedMeta = getLocalizedMetadata(lang);
  const {
    title = localizedMeta.title,
    description = localizedMeta.description,
    image = "/og-image.png",
    type = "website",
    publishedTime,
    modifiedTime,
    tags,
    author = "Muhamad Ali Ridho",
    canonicalUrl,
    noindex = false,
    structuredData = []
  } = Astro2.props;
  return renderTemplate(_a || (_a = __template(["<html", '> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"', "><!-- SEO Component -->", '<!-- Fonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet"><!-- Clash Display from CDN --><link href="https://api.fontshare.com/v2/css?f[]=clash-display@700,600,500&display=swap" rel="stylesheet"><!-- Theme Script (prevent flash) --><script>\n      const theme =\n        localStorage.getItem("theme") ||\n        (window.matchMedia("(prefers-color-scheme: light)").matches\n          ? "light"\n          : "dark");\n      document.documentElement.classList.toggle("light", theme === "light");\n      document.body?.classList.toggle("light", theme === "light");\n    <\/script>', '</head> <body class="min-h-screen"> <!-- Noise Overlay --> <div class="noise-overlay"></div> <!-- Navigation --> ', " ", " <!-- Custom Cursor --> ", " </body></html>"])), addAttribute(lang, "lang"), addAttribute(Astro2.generator, "content"), renderComponent($$result, "SEO", $$SEO, { "title": title, "description": description, "image": image, "type": type, "publishedTime": publishedTime, "modifiedTime": modifiedTime, "tags": tags, "author": author, "canonicalUrl": canonicalUrl, "noindex": noindex, "structuredData": structuredData }), renderHead(), renderComponent($$result, "Navigation", $$Navigation, {}), renderSlot($$result, $$slots["default"]), renderComponent($$result, "CustomCursor", $$CustomCursor, {}));
}, "/Users/madaldho/Portofolio Baru/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $, useTranslatedPath as a, formatDate as f, getLangFromUrl as g, useTranslations as u };
