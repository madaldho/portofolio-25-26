# Design Document: Portfolio Redesign - Tech Enthusiast

## Overview

Website portfolio modern untuk Muhamad Ali Ridho sebagai Tech Enthusiast menggunakan Astro framework. Design ini mengutamakan visual impact tinggi, animasi smooth, dan pengalaman interaktif yang memorable. Website akan menampilkan keberagaman skill dan interest di berbagai bidang teknologi.

### Design Philosophy

- **Brutalist Meets Elegance**: Raw, bold typography dengan sentuhan refined - bukan template generic
- **Cinematic Experience**: Setiap scroll seperti menonton film - dramatic reveals, smooth transitions
- **Interactive Art**: Website sebagai karya seni interaktif, bukan sekadar portfolio
- **Memorable & Unique**: Pengunjung akan ingat website ini karena berbeda dari yang lain
- **Performance-First**: Animasi yang smooth tanpa mengorbankan performa

### Signature Design Elements (Yang Membuat Berbeda)

1. **Liquid Cursor**: Custom cursor dengan efek liquid/blob yang mengikuti mouse
2. **Text Distortion**: Hover effect pada text dengan glitch/distortion effect
3. **Magnetic Buttons**: Tombol yang "tertarik" ke arah cursor
4. **Scroll-Triggered Reveals**: Konten muncul dengan dramatic effect saat scroll
5. **Noise Texture Overlay**: Subtle grain texture untuk feel premium
6. **Asymmetric Layouts**: Layout yang tidak simetris, lebih artistic
7. **Large Typography**: Heading yang sangat besar (clamp sizing)
8. **Blend Mode Effects**: Overlay dan blend modes untuk visual yang unik
9. **Marquee/Infinite Scroll Text**: Running text untuk section dividers
10. **3D Perspective Cards**: Project cards dengan real 3D depth

### Color Palette (Premium & Bold)

```
Primary: #FF3D00 (Vibrant Orange-Red) - Bold, energetic
Secondary: #00FF88 (Neon Green) - Tech, futuristic accent
Accent: #FFE600 (Electric Yellow) - Highlights
Dark Background: #0A0A0A (Almost black)
Dark Surface: #141414
Light Background: #F5F5F0 (Warm white)
Light Surface: #FFFFFF
Text Primary Dark: #FFFFFF
Text Primary Light: #0A0A0A
Gradient Primary: linear-gradient(135deg, #FF3D00, #FF6B35)
Gradient Accent: linear-gradient(135deg, #00FF88, #00D4AA)
```

### Typography (Statement Making)

- **Display/Hero**: Clash Display or Satoshi (Extra Bold, Dramatic)
- **Headings**: Space Grotesk (Bold, Modern)
- **Body**: Inter (Clean, Readable)
- **Code/Tech**: JetBrains Mono (Monospace for tech feel)
- **Accent/Labels**: Uppercase, letter-spacing wide

### Visual Effects Library

```css
/* Noise Texture Overlay */
.noise-overlay {
  background-image: url("data:image/svg+xml,..."); /* grain pattern */
  opacity: 0.03;
  pointer-events: none;
}

/* Text Glitch Effect */
.glitch-text:hover {
  animation: glitch 0.3s infinite;
}

/* Magnetic Button Effect */
.magnetic-btn {
  transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
}

/* Smooth Reveal Animation */
.reveal {
  clip-path: inset(100% 0 0 0);
  animation: reveal 1s cubic-bezier(0.77, 0, 0.175, 1) forwards;
}
```

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Astro Application                       │
├─────────────────────────────────────────────────────────────┤
│  Pages (src/pages/)                                          │
│  ├── index.astro (Homepage with all sections)               │
│  ├── blog/index.astro (Blog listing page)                   │
│  ├── blog/[slug].astro (Blog post pages)                    │
│  ├── projects/[slug].astro (Project detail pages)           │
│  └── preview/[...slug].astro (Content preview pages)        │
├─────────────────────────────────────────────────────────────┤
│  Layouts (src/layouts/)                                      │
│  ├── BaseLayout.astro (Common layout with nav, footer)      │
│  ├── BlogLayout.astro (Blog-specific layout)                │
│  └── ProjectLayout.astro (Project-specific layout)          │
├─────────────────────────────────────────────────────────────┤
│  Components (src/components/)                                │
│  ├── Navigation.astro                                        │
│  ├── Hero.astro                                              │
│  ├── About.astro                                             │
│  ├── TechInterests.astro                                     │
│  ├── Projects.astro                                          │
│  ├── ProjectCard.astro                                       │
│  ├── Blog/BlogCard.astro                                     │
│  ├── Blog/BlogContent.astro                                  │
│  ├── RichText.astro (Contentful rich text renderer)         │
│  ├── Contact.astro                                           │
│  ├── Footer.astro                                            │
│  ├── ThemeToggle.astro                                       │
│  └── CustomCursor.astro (Client-side component)             │
├─────────────────────────────────────────────────────────────┤
│  Styles (src/styles/)                                        │
│  ├── global.css (CSS variables, base styles)                │
│  └── animations.css (Keyframes, transitions)                │
├─────────────────────────────────────────────────────────────┤
│  Utils (src/utils/)                                          │
│  ├── contentful.ts (Contentful client & API functions)      │
│  ├── richText.ts (Rich text rendering utilities)            │
│  └── imageOptimization.ts (Image processing utilities)      │
├─────────────────────────────────────────────────────────────┤
│  Data (src/data/)                                            │
│  ├── profile.ts (Personal info, bio - static data)          │
│  ├── skills.ts (Skills organized by domain - static data)   │
│  ├── interests.ts (Tech interests data - static data)       │
│  └── socials.ts (Social media links - static data)          │
├─────────────────────────────────────────────────────────────┤
│                        Contentful CMS                       │
│  ├── Content Types:                                          │
│  │   ├── Project (title, description, images, tech stack)   │
│  │   ├── BlogPost (title, content, excerpt, tags)           │
│  │   ├── TechStack (name, category, proficiency)            │
│  │   └── Testimonial (name, role, content, avatar)          │
│  └── Assets: Images, documents, media files                 │
└─────────────────────────────────────────────────────────────┘
```

### Tech Stack

- **Framework**: Astro 4.x
- **CMS**: Contentful (Headless CMS)
- **Styling**: Tailwind CSS 3.x
- **Animations**: CSS Animations + GSAP (for complex animations)
- **Icons**: Lucide Icons or Phosphor Icons
- **Fonts**: Google Fonts (Inter, Space Grotesk, JetBrains Mono)
- **Rich Text**: @contentful/rich-text-html-renderer
- **Image Optimization**: Astro Image + Contentful Images API
- **Deployment**: Vercel or Netlify with Contentful webhooks

## Components and Interfaces

### 1. Navigation Component

```typescript
interface NavigationProps {
  links: NavLink[];
  currentSection: string;
  isScrolled: boolean;
}

interface NavLink {
  label: string;
  href: string;
  icon?: string;
}
```

**Behavior:**

- Fixed position at top
- Transparent on hero, blur backdrop when scrolled
- Active link highlighting based on scroll position
- Mobile hamburger menu with slide animation

### 2. Hero Component

```typescript
interface HeroProps {
  name: string;
  title: string;
  tagline: string;
  rotatingTexts: string[];
  ctaButtons: CTAButton[];
}

interface CTAButton {
  label: string;
  href: string;
  variant: "primary" | "secondary";
}
```

**Animations:**

- Staggered text reveal on load
- Rotating text with typewriter effect
- Floating tech icons in background
- Parallax on scroll

### 3. About Component

```typescript
interface AboutProps {
  photo: string;
  bio: string;
  highlights: string[];
  journey: JourneyMilestone[];
}

interface JourneyMilestone {
  year: string;
  title: string;
  description: string;
}
```

### 4. Tech Interests Component

```typescript
interface TechInterest {
  id: string;
  name: string;
  icon: string;
  description: string;
  currentlyLearning?: string[];
  color: string;
}
```

### 5. Skills Component

```typescript
interface SkillCategory {
  name: string;
  icon: string;
  skills: Skill[];
}

interface Skill {
  name: string;
  icon?: string;
  level?: "beginner" | "intermediate" | "advanced";
}
```

### 6. Project Card Component

```typescript
interface Project {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  category: ProjectCategory;
  technologies: string[];
  liveUrl?: string;
  sourceUrl?: string;
  featured: boolean;
}

type ProjectCategory = "web" | "mobile" | "iot" | "ai-ml" | "other";
```

### 7. Contact Form Component

```typescript
interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ContactFormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
}
```

### 8. Theme Toggle Component

```typescript
interface ThemeState {
  theme: "light" | "dark";
  systemPreference: "light" | "dark";
}
```

### 9. Contentful Integration Components

```typescript
// Contentful Client Configuration
interface ContentfulConfig {
  spaceId: string;
  accessToken: string;
  previewAccessToken: string;
  environment: string;
  host?: string;
}

// Blog Post from Contentful
interface BlogPost {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  title: string;
  slug: string;
  excerpt: string;
  content: Document; // Contentful Rich Text
  featuredImage: ContentfulAsset;
  tags: string[];
  publishDate: string;
  readingTime?: number;
}

// Project from Contentful
interface ContentfulProject {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  title: string;
  slug: string;
  description: Document; // Contentful Rich Text
  shortDescription: string;
  thumbnail: ContentfulAsset;
  gallery: ContentfulAsset[];
  category: ProjectCategory;
  technologies: TechStack[];
  liveUrl?: string;
  sourceUrl?: string;
  featured: boolean;
  completedDate: string;
}

// Tech Stack from Contentful
interface TechStack {
  sys: { id: string };
  name: string;
  category: "language" | "framework" | "tool" | "platform";
  icon?: ContentfulAsset;
  proficiency: "beginner" | "intermediate" | "advanced";
  color?: string;
}

// Contentful Asset
interface ContentfulAsset {
  sys: { id: string };
  title: string;
  description?: string;
  file: {
    url: string;
    details: {
      size: number;
      image?: {
        width: number;
        height: number;
      };
    };
    fileName: string;
    contentType: string;
  };
}

// Rich Text Renderer Props
interface RichTextProps {
  content: Document;
  className?: string;
}
```

## Data Models

### Profile Data

```typescript
// src/data/profile.ts
export const profile = {
  name: "Muhamad Ali Ridho",
  title: "Tech Enthusiast",
  tagline: "Exploring technology, one project at a time",
  rotatingTexts: [
    "I explore AI & Machine Learning",
    "I build web applications",
    "I tinker with IoT devices",
    "I develop mobile apps",
    "I love cloud technologies",
  ],
  bio: "...",
  photo: "/images/profile.jpg",
  location: "Indonesia",
  email: "contact@muhamadaliridho.me",
};
```

### Skills Data

```typescript
// src/data/skills.ts
export const skillCategories: SkillCategory[] = [
  {
    name: "Programming Languages",
    icon: "code",
    skills: [
      { name: "JavaScript", level: "advanced" },
      { name: "TypeScript", level: "intermediate" },
      { name: "Python", level: "intermediate" },
      // ...
    ]
  },
  {
    name: "Frameworks & Libraries",
    icon: "layers",
    skills: [...]
  },
  {
    name: "Tools & Platforms",
    icon: "tool",
    skills: [...]
  },
  {
    name: "Hardware & IoT",
    icon: "cpu",
    skills: [...]
  }
];
```

### Tech Interests Data

```typescript
// src/data/interests.ts
export const techInterests: TechInterest[] = [
  {
    id: "ai-ml",
    name: "AI & Machine Learning",
    icon: "brain",
    description: "Fascinated by how machines can learn and make decisions",
    currentlyLearning: ["TensorFlow", "LangChain"],
    color: "#6366F1",
  },
  {
    id: "iot",
    name: "Internet of Things",
    icon: "wifi",
    description: "Love connecting physical devices to the digital world",
    currentlyLearning: ["ESP32", "Home Assistant"],
    color: "#10B981",
  },
  // ...
];
```

### Contentful Content Models

```typescript
// Contentful Content Type Definitions

// Project Content Type
const ProjectContentType = {
  name: "Project",
  fields: [
    { id: "title", name: "Title", type: "Symbol", required: true },
    { id: "slug", name: "Slug", type: "Symbol", required: true, unique: true },
    {
      id: "shortDescription",
      name: "Short Description",
      type: "Symbol",
      required: true,
    },
    {
      id: "description",
      name: "Description",
      type: "RichText",
      required: true,
    },
    {
      id: "thumbnail",
      name: "Thumbnail",
      type: "Link",
      linkType: "Asset",
      required: true,
    },
    {
      id: "gallery",
      name: "Gallery",
      type: "Array",
      items: { type: "Link", linkType: "Asset" },
    },
    {
      id: "category",
      name: "Category",
      type: "Symbol",
      validations: [{ in: ["web", "mobile", "iot", "ai-ml", "other"] }],
    },
    {
      id: "technologies",
      name: "Technologies",
      type: "Array",
      items: { type: "Link", linkType: "Entry" },
    },
    { id: "liveUrl", name: "Live URL", type: "Symbol" },
    { id: "sourceUrl", name: "Source URL", type: "Symbol" },
    { id: "featured", name: "Featured", type: "Boolean", defaultValue: false },
    {
      id: "completedDate",
      name: "Completed Date",
      type: "Date",
      required: true,
    },
  ],
};

// Blog Post Content Type
const BlogPostContentType = {
  name: "Blog Post",
  fields: [
    { id: "title", name: "Title", type: "Symbol", required: true },
    { id: "slug", name: "Slug", type: "Symbol", required: true, unique: true },
    { id: "excerpt", name: "Excerpt", type: "Text", required: true },
    { id: "content", name: "Content", type: "RichText", required: true },
    {
      id: "featuredImage",
      name: "Featured Image",
      type: "Link",
      linkType: "Asset",
      required: true,
    },
    { id: "tags", name: "Tags", type: "Array", items: { type: "Symbol" } },
    { id: "publishDate", name: "Publish Date", type: "Date", required: true },
    { id: "readingTime", name: "Reading Time (minutes)", type: "Integer" },
  ],
};

// Tech Stack Content Type
const TechStackContentType = {
  name: "Tech Stack",
  fields: [
    { id: "name", name: "Name", type: "Symbol", required: true },
    {
      id: "category",
      name: "Category",
      type: "Symbol",
      validations: [{ in: ["language", "framework", "tool", "platform"] }],
    },
    { id: "icon", name: "Icon", type: "Link", linkType: "Asset" },
    {
      id: "proficiency",
      name: "Proficiency",
      type: "Symbol",
      validations: [{ in: ["beginner", "intermediate", "advanced"] }],
    },
    { id: "color", name: "Color", type: "Symbol" },
  ],
};
```

### Contentful API Utilities

```typescript
// src/utils/contentful.ts
import { createClient } from "contentful";

export const contentfulClient = createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.CONTENTFUL_ACCESS_TOKEN,
  host: import.meta.env.CONTENTFUL_HOST || "cdn.contentful.com",
});

export const previewClient = createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.CONTENTFUL_PREVIEW_TOKEN,
  host: "preview.contentful.com",
});

// API Functions
export async function getProjects(preview = false) {
  const client = preview ? previewClient : contentfulClient;
  const entries = await client.getEntries({
    content_type: "project",
    order: "-fields.completedDate",
  });
  return entries.items;
}

export async function getProject(slug: string, preview = false) {
  const client = preview ? previewClient : contentfulClient;
  const entries = await client.getEntries({
    content_type: "project",
    "fields.slug": slug,
    limit: 1,
  });
  return entries.items[0];
}

export async function getBlogPosts(preview = false) {
  const client = preview ? previewClient : contentfulClient;
  const entries = await client.getEntries({
    content_type: "blogPost",
    order: "-fields.publishDate",
  });
  return entries.items;
}

export async function getBlogPost(slug: string, preview = false) {
  const client = preview ? previewClient : contentfulClient;
  const entries = await client.getEntries({
    content_type: "blogPost",
    "fields.slug": slug,
    limit: 1,
  });
  return entries.items[0];
}
```

## Error Handling

### Contact Form Errors

- **Validation Errors**: Display inline error messages below each field
- **Network Errors**: Show toast notification with retry option
- **Success State**: Display success message and reset form

### Image Loading Errors

- **Fallback Images**: Use placeholder images when project thumbnails fail to load
- **Lazy Loading**: Implement intersection observer for image loading

### Theme Persistence Errors

- **LocalStorage Unavailable**: Fall back to system preference
- **Invalid Theme Value**: Default to dark mode

### Navigation Errors

- **Invalid Section**: Scroll to top if target section doesn't exist
- **Smooth Scroll Fallback**: Use instant scroll if smooth scroll not supported

## Testing Strategy

### Unit Testing Framework

- **Vitest**: For unit testing utility functions and data transformations
- **Testing Library**: For component testing if needed

### Property-Based Testing

- **fast-check**: For property-based testing of data transformations and validations
- Minimum 100 iterations per property test
- Tests tagged with format: `**Feature: portfolio-redesign, Property {number}: {property_text}**`

### Test Categories

1. **Data Validation Tests**

   - Profile data structure validation
   - Project schema validation
   - Skills data integrity

2. **Theme System Tests**

   - Theme toggle functionality
   - LocalStorage persistence
   - System preference detection

3. **Form Validation Tests**

   - Email format validation
   - Required field validation
   - Input sanitization

4. **Filter/Sort Tests**
   - Project category filtering
   - Project sorting by date

### E2E Testing (Optional)

- **Playwright**: For end-to-end testing of critical user flows
- Test navigation, theme toggle, contact form submission

## Correctness Properties

_A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees._

Based on the prework analysis, the following properties have been identified for property-based testing:

### Property 1: Project Data Schema Validation

_For any_ project in the projects collection, the project object SHALL contain all required fields: title (non-empty string), description (non-empty string), thumbnail (valid path string), category (one of: 'web', 'mobile', 'iot', 'ai-ml', 'other'), and technologies (non-empty array of strings).

**Validates: Requirements 3.1, 3.5**

### Property 2: Project Category Filter Correctness

_For any_ list of projects and any selected category filter, the filtered result SHALL contain only projects whose category matches the selected filter, and when filter is 'all', the result SHALL contain all projects.

**Validates: Requirements 3.6**

### Property 3: Skills Data Organization

_For any_ skill category in the skills data, the category SHALL have a non-empty name, a valid icon identifier, and a non-empty array of skills where each skill has at least a name property.

**Validates: Requirements 4.3**

### Property 4: Journey Timeline Chronological Order

_For any_ journey milestones array, the milestones SHALL be sortable by year in chronological order, and each milestone SHALL have year, title, and description fields.

**Validates: Requirements 4.4**

### Property 5: Tech Interests Data Completeness

_For any_ tech interest in the interests data, the interest SHALL contain id (unique string), name (non-empty string), icon (valid identifier), description (non-empty string), and color (valid hex color string).

**Validates: Requirements 4.6, 5.1, 5.2**

### Property 6: Contact Form Validation Round Trip

_For any_ valid contact form data (name: non-empty string, email: valid email format, message: non-empty string with minimum 10 characters), the validation function SHALL return success. _For any_ invalid contact form data, the validation function SHALL return specific error messages indicating which fields are invalid.

**Validates: Requirements 6.2, 6.3**

### Property 7: Email Validation Correctness

_For any_ string input to the email validator, the validator SHALL return true only for strings matching the email format pattern (contains @ symbol, has domain part, no spaces), and SHALL return false for all other strings.

**Validates: Requirements 6.3**

### Property 8: Theme Toggle Round Trip

_For any_ initial theme state, toggling the theme and then toggling again SHALL return to the original theme state. Additionally, saving a theme to localStorage and reading it back SHALL return the same theme value.

**Validates: Requirements 7.1, 7.3**

### Property 9: System Theme Preference Detection

_For any_ system color scheme preference ('light' or 'dark'), when no user preference is stored, the theme system SHALL default to the system preference.

**Validates: Requirements 7.2**

### Property 10: Meta Tags Generation Completeness

_For any_ page in the portfolio, the generated meta tags SHALL include: title, description, og:title, og:description, og:image, og:url, and twitter:card properties with non-empty values.

**Validates: Requirements 8.2, 8.4**

### Property 11: Social Links Data Validation

_For any_ social link in the socials data, the link SHALL contain platform name (non-empty string), url (valid URL format), and icon (valid identifier).

**Validates: Requirements 6.4**

### Property 12: Navigation Active Section Detection

_For any_ scroll position and array of section positions, the active section detection function SHALL return the section whose top boundary is closest to but not below the current scroll position.

**Validates: Requirements 2.2**

### Property 13: Rotating Text Cycle Completeness

_For any_ array of rotating texts and any number of cycles, the rotation SHALL cycle through all texts in order and return to the first text after completing the array.

**Validates: Requirements 1.6**

### Property 14: Contentful API Response Validation

_For any_ Contentful API response, the response SHALL contain valid entry structure with sys metadata (id, createdAt, updatedAt) and fields object, and all required fields SHALL be present according to the content type schema.

**Validates: Requirements 11.1, 11.4**

### Property 15: Rich Text Rendering Consistency

_For any_ Contentful rich text document, the rich text renderer SHALL produce valid HTML output that preserves the document structure, and embedded assets SHALL be properly resolved with valid URLs.

**Validates: Requirements 11.3, 12.5, 13.4**

### Property 16: Blog Post Data Completeness

_For any_ blog post retrieved from Contentful, the blog post SHALL contain title (non-empty string), slug (unique string), excerpt (non-empty string), content (valid rich text document), featuredImage (valid asset), and publishDate (valid date).

**Validates: Requirements 13.1, 13.2**

### Property 17: Project Gallery Image Optimization

_For any_ project with gallery images from Contentful, each image SHALL be optimized with responsive variants (webp format when supported), proper alt text, and loading states.

**Validates: Requirements 12.3**

### Property 18: Content Preview Mode Validation

_For any_ content in preview mode, the preview API SHALL return draft content when preview=true, and published content when preview=false, and the content status SHALL be clearly indicated.

**Validates: Requirements 14.1, 14.2**

### Property 19: Blog Tag Filtering Correctness

_For any_ list of blog posts and any selected tag filter, the filtered result SHALL contain only blog posts that include the selected tag in their tags array.

**Validates: Requirements 13.5**

### Property 20: Contentful Asset URL Validation

_For any_ Contentful asset, the asset URL SHALL be a valid HTTPS URL pointing to Contentful's CDN, and image assets SHALL support query parameters for resizing and format conversion.

**Validates: Requirements 12.3, 13.2**
