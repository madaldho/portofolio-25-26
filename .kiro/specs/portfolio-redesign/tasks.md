# Implementation Plan

## Phase 1: Project Setup & Foundation

- [x] 1. Initialize Astro project with Tailwind CSS

  - [x] 1.1 Create new Astro project with TypeScript template
    - Run `npm create astro@latest` with TypeScript strict mode
    - Configure astro.config.mjs for static site generation
    - _Requirements: 8.1_
  - [x] 1.2 Install and configure Tailwind CSS
    - Install tailwindcss, postcss, autoprefixer
    - Create tailwind.config.mjs with custom theme colors and fonts
    - Set up CSS variables for dark/light mode
    - _Requirements: 7.1, 7.4_
  - [x] 1.3 Set up project structure and base files
    - Create folder structure: components, layouts, pages, data, styles, content
    - Create global.css with CSS variables and base styles
    - Create animations.css with keyframe definitions
    - _Requirements: 8.1_
  - [x] 1.4 Configure Google Fonts
    - Add Inter, Space Grotesk, and JetBrains Mono fonts
    - Configure font-family in Tailwind config
    - _Requirements: 8.1_

- [x] 2. Create data layer and content collections

  - [x] 2.1 Create profile data file (src/data/profile.ts)
    - Define profile interface and export profile data
    - Include name, title, tagline, rotatingTexts, bio, photo, contact info
    - _Requirements: 1.1, 1.6_
  - [x] 2.2 Create skills data file (src/data/skills.ts)
    - Define SkillCategory and Skill interfaces
    - Organize skills by domain (Languages, Frameworks, Tools, Hardware/IoT)
    - _Requirements: 4.3_
  - [x] 2.3 Write property test for skills data organization
    - **Property 3: Skills Data Organization**
    - **Validates: Requirements 4.3**
  - [x] 2.4 Create tech interests data file (src/data/interests.ts)
    - Define TechInterest interface
    - Include id, name, icon, description, currentlyLearning, color
    - _Requirements: 4.6, 5.1, 5.2_
  - [x] 2.5 Write property test for tech interests data completeness
    - **Property 5: Tech Interests Data Completeness**
    - **Validates: Requirements 4.6, 5.1, 5.2**
  - [x] 2.6 Create social links data file (src/data/socials.ts)
    - Define SocialLink interface
    - Include platform, url, icon for each social media
    - _Requirements: 6.4_
  - [x] 2.7 Write property test for social links data validation
    - **Property 11: Social Links Data Validation**
    - **Validates: Requirements 6.4**
  - [x] 2.8 Create journey milestones data file (src/data/journey.ts)
    - Define JourneyMilestone interface
    - Include year, title, description for each milestone
    - _Requirements: 4.4_
  - [x] 2.9 Write property test for journey timeline chronological order
    - **Property 4: Journey Timeline Chronological Order**
    - **Validates: Requirements 4.4**
  - [x] 2.10 Set up Astro content collections for projects
    - Create src/content/config.ts with project schema
    - Define Zod schema for project validation
    - _Requirements: 3.1, 3.5_
  - [x] 2.11 Write property test for project data schema validation
    - **Property 1: Project Data Schema Validation**
    - **Validates: Requirements 3.1, 3.5**

- [x] 3. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Phase 2: Core Layout & Navigation

- [x] 4. Create base layout and theme system

  - [x] 4.1 Create BaseLayout.astro component
    - Include HTML head with meta tags, fonts, styles
    - Set up body with theme class handling
    - Include slot for page content
    - _Requirements: 8.2, 8.4_
  - [x] 4.2 Write property test for meta tags generation
    - **Property 10: Meta Tags Generation Completeness**
    - **Validates: Requirements 8.2, 8.4**
  - [x] 4.3 Implement theme toggle functionality
    - Create ThemeToggle.astro component with sun/moon icons
    - Implement client-side script for theme switching
    - Handle localStorage persistence
    - Handle system preference detection
    - _Requirements: 7.1, 7.2, 7.3, 7.4_
  - [x] 4.4 Write property test for theme toggle round trip
    - **Property 8: Theme Toggle Round Trip**
    - **Validates: Requirements 7.1, 7.3**
  - [x] 4.5 Write property test for system theme preference detection
    - **Property 9: System Theme Preference Detection**
    - **Validates: Requirements 7.2**

- [x] 5. Create navigation component

  - [x] 5.1 Create Navigation.astro component
    - Build responsive navigation with logo and links
    - Implement sticky header with blur backdrop on scroll
    - Add mobile hamburger menu with animation
    - _Requirements: 2.1, 2.2, 2.3, 2.4_
  - [x] 5.2 Implement active section detection
    - Create utility function for scroll-based active section
    - Highlight current section in navigation
    - _Requirements: 2.2_
  - [x] 5.3 Write property test for navigation active section detection
    - **Property 12: Navigation Active Section Detection**
    - **Validates: Requirements 2.2**
  - [x] 5.4 Implement smooth scroll behavior
    - Add smooth scroll to section links
    - Handle scroll offset for sticky header
    - _Requirements: 2.1_

- [x] 6. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Phase 3: Hero Section

- [x] 7. Build hero section with animations

  - [x] 7.1 Create Hero.astro component structure
    - Build hero layout with name, title, tagline
    - Add CTA buttons (View Projects, Contact Me)
    - Include animated background pattern
    - _Requirements: 1.1, 1.4_
  - [x] 7.2 Implement rotating text animation
    - Create text rotation logic with typewriter effect
    - Cycle through rotatingTexts array
    - _Requirements: 1.6_
  - [x] 7.3 Write property test for rotating text cycle completeness
    - **Property 13: Rotating Text Cycle Completeness**
    - **Validates: Requirements 1.6**
  - [x] 7.4 Add staggered text reveal animation
    - Implement CSS animations for text entrance
    - Add animation delays for staggered effect
    - _Requirements: 1.2_
  - [x] 7.5 Implement parallax scroll effect
    - Add scroll-based transform to hero elements
    - Create smooth parallax movement
    - _Requirements: 1.5_

- [x] 8. Create custom cursor effect
  - [x] 8.1 Create CustomCursor.astro component
    - Build custom cursor element with glow effect
    - Track mouse position with smooth following
    - Add magnetic effect near interactive elements
    - _Requirements: 1.3, 10.4_

## Phase 4: About & Skills Section

- [x] 9. Build about section
  - [x] 9.1 Create About.astro component
    - Build layout with photo and bio content
    - Add creative frame/mask effect for photo
    - Implement text reveal animations on scroll
    - _Requirements: 4.1, 4.2_
  - [x] 9.2 Create Skills.astro component
    - Display skill categories with icons
    - Show skills with visual representations
    - Add hover animations for skill items
    - _Requirements: 4.3, 4.5_
  - [x] 9.3 Create Journey.astro timeline component
    - Build timeline visualization
    - Display milestones with year, title, description
    - Add scroll-triggered animations
    - _Requirements: 4.4_

## Phase 5: Tech Interests Section

- [x] 10. Build tech interests section
  - [x] 10.1 Create TechInterests.astro component
    - Build grid layout for interest cards
    - Display icon, name, description for each interest
    - Show currentlyLearning items
    - _Requirements: 5.1, 5.2, 5.5_
  - [x] 10.2 Add interest card hover animations
    - Implement hover effect with expanded details
    - Add staggered entrance animations
    - _Requirements: 5.3, 5.4_

## Phase 6: Projects Section

- [x] 11. Build projects showcase

  - [x] 11.1 Create Projects.astro section component
    - Build section layout with title and filter buttons
    - Implement category filter functionality
    - _Requirements: 3.6_
  - [x] 11.2 Write property test for project category filter
    - **Property 2: Project Category Filter Correctness**
    - **Validates: Requirements 3.6**
  - [x] 11.3 Create ProjectCard.astro component
    - Build card with thumbnail, title, description, tags
    - Add 3D tilt effect on hover
    - Show category badge and tech stack
    - _Requirements: 3.1, 3.2_
  - [x] 11.4 Add staggered entrance animations
    - Implement scroll-triggered fade-in for cards
    - Add animation delays for stagger effect
    - _Requirements: 3.4_
  - [x] 11.5 Create project detail page template
    - Create src/pages/projects/[slug].astro
    - Display full project details, gallery, links
    - _Requirements: 3.3, 3.5_
  - [x] 11.6 Add sample project content
    - Create 3-4 sample project markdown files
    - Include variety of categories (web, mobile, iot, ai-ml)
    - _Requirements: 3.1_

- [x] 12. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Phase 7: Contact Section

- [x] 13. Build contact section
  - [x] 13.1 Create Contact.astro component
    - Build contact form with name, email, message fields
    - Add social media links with icons
    - Implement entrance animations
    - _Requirements: 6.1, 6.4, 6.5_
  - [x] 13.2 Implement form validation
    - Create validation utility functions
    - Validate email format, required fields
    - Display inline error messages
    - _Requirements: 6.2, 6.3_
  - [x] 13.3 Write property test for contact form validation
    - **Property 6: Contact Form Validation Round Trip**
    - **Validates: Requirements 6.2, 6.3**
  - [x] 13.4 Write property test for email validation
    - **Property 7: Email Validation Correctness**
    - **Validates: Requirements 6.3**
  - [x] 13.5 Implement form submission handling
    - Add form submission with success/error states
    - Display success confirmation message
    - _Requirements: 6.2_

## Phase 8: Footer & Final Polish

- [x] 14. Create footer and final components
  - [x] 14.1 Create Footer.astro component
    - Build footer with copyright, social links
    - Add back-to-top button
    - _Requirements: 6.4_
  - [x] 14.2 Add micro-interactions throughout
    - Implement button hover/click animations
    - Add link underline animations
    - Polish all interactive element transitions
    - _Requirements: 10.1, 10.2, 10.5_
  - [x] 14.3 Implement skeleton loading states
    - Add skeleton components for images
    - Show loading states before content appears
    - _Requirements: 10.3_

## Phase 9: UI/UX Fixes & Polish

- [ ] 15. Fix UI/UX issues and improve design consistency

  - [x] 15.1 Fix z-index hierarchy and layering issues
    - Standardize z-index values across all components
    - Create consistent layering system
    - Fix cursor and overlay conflicts
    - _Requirements: 10.1, 10.2_
  - [ ] 15.2 Improve color contrast and accessibility
    - Fix light mode color contrast issues
    - Improve text readability across all themes
    - Enhance button and interactive element visibility
    - _Requirements: 7.4, 9.1, 9.2_
  - [ ] 15.3 Polish mobile experience
    - Disable custom cursor on mobile devices properly
    - Improve touch interactions and hover states
    - Fix mobile navigation and spacing issues
    - _Requirements: 9.1, 2.4_
  - [ ] 15.4 Enhance visual hierarchy and clarity
    - Improve section spacing and typography scale
    - Add better visual separation between sections
    - Clarify interactive elements and their purposes
    - _Requirements: 10.1, 10.5_

## Phase 10: Contentful CMS Integration

- [ ] 16. Set up Contentful integration

  - [ ] 15.1 Install Contentful dependencies
    - Install contentful SDK and rich text renderer
    - Configure environment variables for Contentful
    - Set up TypeScript types for Contentful responses
    - _Requirements: 11.1_
  - [ ] 15.2 Create Contentful utility functions
    - Create contentful.ts with API client setup
    - Implement functions for fetching projects and blog posts
    - Add error handling and fallback mechanisms
    - _Requirements: 11.1, 11.5_
  - [ ] 15.3 Write property test for Contentful API response validation
    - **Property 14: Contentful API Response Validation**
    - **Validates: Requirements 11.1, 11.4**
  - [ ] 15.4 Create rich text renderer component
    - Build RichText.astro component for rendering Contentful rich text
    - Handle embedded assets and entries
    - Add syntax highlighting for code blocks
    - _Requirements: 11.3, 13.4_
  - [ ] 15.5 Write property test for rich text rendering consistency
    - **Property 15: Rich Text Rendering Consistency**
    - **Validates: Requirements 11.3, 12.5, 13.4**

- [ ] 16. Create Contentful content types

  - [ ] 16.1 Set up Project content type in Contentful
    - Create Project content type with all required fields
    - Configure field validations and relationships
    - Add sample project entries
    - _Requirements: 12.1_
  - [ ] 16.2 Set up Blog Post content type in Contentful
    - Create Blog Post content type with rich text content
    - Configure tags, featured image, and metadata fields
    - Add sample blog post entries
    - _Requirements: 13.1_
  - [ ] 16.3 Write property test for blog post data completeness
    - **Property 16: Blog Post Data Completeness**
    - **Validates: Requirements 13.1, 13.2**
  - [ ] 16.4 Set up Tech Stack content type in Contentful
    - Create Tech Stack content type for technologies
    - Link to projects and organize by categories
    - _Requirements: 12.1_
  - [ ] 16.5 Write property test for Contentful asset URL validation
    - **Property 20: Contentful Asset URL Validation**
    - **Validates: Requirements 12.3, 13.2**

- [ ] 17. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Phase 10: Blog System Implementation

- [ ] 18. Build blog functionality

  - [ ] 18.1 Create blog listing page
    - Build blog/index.astro with paginated blog posts
    - Display blog cards with excerpts and featured images
    - Add tag filtering and search functionality
    - _Requirements: 13.2, 13.5_
  - [ ] 18.2 Write property test for blog tag filtering
    - **Property 19: Blog Tag Filtering Correctness**
    - **Validates: Requirements 13.5**
  - [ ] 18.3 Create blog post detail pages
    - Build blog/[slug].astro for individual blog posts
    - Render rich text content with proper formatting
    - Add reading time and publication metadata
    - _Requirements: 13.3, 13.6_
  - [ ] 18.4 Create blog components
    - Build BlogCard.astro for blog post previews
    - Create BlogContent.astro for full post rendering
    - Add BlogLayout.astro for consistent blog styling
    - _Requirements: 13.2, 13.3_

- [ ] 19. Update project system with Contentful

  - [ ] 19.1 Migrate Projects component to use Contentful
    - Update Projects.astro to fetch from Contentful API
    - Maintain existing filter and animation functionality
    - _Requirements: 12.1, 12.4_
  - [ ] 19.2 Update ProjectCard component for Contentful data
    - Modify ProjectCard.astro to handle Contentful project structure
    - Add support for multiple gallery images
    - _Requirements: 12.2, 12.3_
  - [ ] 19.3 Write property test for project gallery image optimization
    - **Property 17: Project Gallery Image Optimization**
    - **Validates: Requirements 12.3**
  - [ ] 19.4 Update project detail pages
    - Modify projects/[slug].astro to use Contentful data
    - Add image gallery with lightbox functionality
    - Render rich text project descriptions
    - _Requirements: 12.2, 12.5_

## Phase 11: Content Preview & Management

- [ ] 20. Implement content preview system

  - [ ] 20.1 Create preview pages
    - Build preview/[...slug].astro for content preview
    - Add authentication for preview access
    - _Requirements: 14.1_
  - [ ] 20.2 Write property test for content preview mode validation
    - **Property 18: Content Preview Mode Validation**
    - **Validates: Requirements 14.1, 14.2**
  - [ ] 20.3 Add content status indicators
    - Show draft/published status in preview mode
    - Add visual indicators for content state
    - _Requirements: 14.5_
  - [ ] 20.4 Set up webhook integration
    - Configure Contentful webhooks for content updates
    - Implement ISR (Incremental Static Regeneration) if using Vercel
    - _Requirements: 11.2_

- [ ] 21. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Phase 12: Responsive Design & Optimization

- [ ] 22. Implement responsive design

  - [ ] 22.1 Optimize mobile layout (< 768px)
    - Adjust typography sizes for blog and project content
    - Stack layouts vertically with proper spacing
    - Ensure proper touch targets for Contentful-driven content
    - _Requirements: 9.1_
  - [ ] 22.2 Optimize tablet layout (768px - 1024px)
    - Adjust grid columns for blog and project listings
    - Adapt spacing and sizing for rich text content
    - _Requirements: 9.2_
  - [ ] 22.3 Polish desktop layout (> 1024px)
    - Ensure full animations work with dynamic content
    - Optimize whitespace and proportions for all content types
    - _Requirements: 9.3_

- [ ] 23. Performance optimization

  - [ ] 23.1 Optimize Contentful images
    - Implement responsive images with Contentful Images API
    - Add proper lazy loading for gallery images
    - Use WebP format with fallbacks
    - _Requirements: 8.3, 12.3_
  - [ ] 23.2 Optimize content loading
    - Implement proper caching strategies for Contentful data
    - Add loading states for dynamic content
    - Minimize API calls with proper data fetching
    - _Requirements: 8.1, 11.5_

- [ ] 24. Final Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
