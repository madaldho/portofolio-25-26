# Project Structure & Organization

## Root Directory

```
portfolio/
├── .astro/           # Astro generated files (auto-generated)
├── .kiro/            # Kiro AI assistant configuration
├── dist/             # Production build output
├── node_modules/     # Dependencies
├── public/           # Static assets served directly
├── scripts/          # Build and setup scripts
└── src/              # Source code
```

## Source Code Organization (`src/`)

### Components (`src/components/`)

- **Main Components**: `Hero.astro`, `About.astro`, `Projects.astro`, `Contact.astro`
- **UI Components**: `Navigation.astro`, `Footer.astro`, `ThemeToggle.astro`, `CustomCursor.astro`
- **Utility Components**: `RichText.astro` for Contentful rich text rendering
- **Admin Components**: `admin/` subfolder for CMS management interfaces

### Content (`src/content/`)

- **Collections**: Defined in `config.ts` with Zod schemas
- **Projects**: Markdown files in `projects/` with frontmatter validation
- **Schema**: Strict typing with categories: `web`, `mobile`, `iot`, `ai-ml`, `other`

### Data (`src/data/`)

- **Static Data**: TypeScript files for profile, skills, interests, journey, socials
- **Test Files**: Co-located `.test.ts` files for data validation
- **Type Safety**: All data exports are strongly typed

### Pages (`src/pages/`)

- **Main Pages**: `index.astro` (homepage), `sitemap.xml.ts`
- **Blog**: Dynamic routing with `[slug].astro` pattern
- **Admin**: Protected admin interface in `admin-aldho/`
- **API Routes**: RESTful endpoints in `api/` for CMS operations

### Utilities (`src/utils/`)

- **Core Utils**: `contentful.ts`, `richText.ts`, `cmsManager.ts`
- **Validation**: `validation.ts`, `projectValidation.ts` with Zod schemas
- **UI Utils**: `theme.ts`, `navigation.ts`, `rotatingText.ts`
- **Testing**: `__tests__/` subfolder and co-located `.test.ts` files

### Styles (`src/styles/`)

- **Global Styles**: `global.css` with CSS custom properties
- **Animations**: `animations.css` for custom animations and transitions

## File Naming Conventions

- **Components**: PascalCase (e.g., `CustomCursor.astro`)
- **Pages**: kebab-case for routes (e.g., `[slug].astro`)
- **Utilities**: camelCase (e.g., `contentful.ts`)
- **Data Files**: camelCase (e.g., `interests.ts`)
- **Test Files**: `*.test.ts` suffix

## Content Structure

- **Project Frontmatter**: Required fields include `title`, `description`, `thumbnail`, `category`, `technologies`, `publishedAt`
- **Optional Fields**: `liveUrl`, `sourceUrl`, `featured`, `gallery`
- **Categories**: Enum validation ensures consistent categorization

## Testing Organization

- **Unit Tests**: Co-located with source files using `.test.ts` suffix
- **Test Utils**: Dedicated `__tests__/` folders for complex test suites
- **Property Testing**: Uses `fast-check` for robust validation testing
