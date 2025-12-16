# Cursor & Contentful Branding Fixes

## Problem Statement

1. **Custom cursor visibility issues** - Cursor disappears or becomes invisible when hovering over certain elements like cards
2. **Rich text formatting inconsistency** - Blog content from Contentful doesn't match the original formatting with proper spacing and hierarchy
3. **Unwanted branding** - "Powered by Contentful" text appears throughout the site

## User Stories

### As a website visitor
- I want the custom cursor to be visible at all times when using desktop
- I want to see properly formatted blog content that matches the original Contentful formatting
- I want a clean interface without third-party branding

### As a content creator
- I want my rich text content to display exactly as formatted in Contentful
- I want proper heading hierarchy and spacing
- I want consistent typography across all content

## Acceptance Criteria

### Custom Cursor Fixes
- [ ] Cursor remains visible when hovering over all interactive elements
- [ ] Cursor has proper z-index to appear above all content
- [ ] Cursor animations work smoothly without flickering
- [ ] Cursor effects (hover states) work on all clickable elements

### Rich Text Formatting
- [ ] Headings (H1-H6) display with proper hierarchy and spacing
- [ ] Paragraphs have appropriate line height and margins
- [ ] Lists display with correct indentation and spacing
- [ ] Code blocks have proper styling and syntax highlighting
- [ ] Blockquotes have distinctive styling
- [ ] Links maintain proper styling and hover effects

### Branding Removal
- [ ] All "Powered by Contentful" text is removed from blog pages
- [ ] All "Powered by Contentful" text is removed from certificate pages
- [ ] All "Powered by Contentful" text is removed from preview components
- [ ] Site maintains clean, professional appearance

### Theme Compatibility
- [ ] All fixes work properly in both dark and light themes
- [ ] Rich text content adapts correctly to theme changes
- [ ] Cursor remains visible in both themes

## Technical Requirements

### Cursor Implementation
- Remove `mix-blend-difference` that causes visibility issues
- Use proper z-index values for layering
- Maintain smooth animations and interactions

### Rich Text Rendering
- Improve spacing and typography in render options
- Use proper CSS classes for better visual hierarchy
- Ensure theme-aware styling for all elements

### Code Quality
- Clean removal of branding without breaking functionality
- Maintain accessibility standards
- Ensure responsive design principles

## Success Metrics

- Custom cursor is visible and functional across all pages
- Rich text content displays with proper formatting and spacing
- No "Powered by Contentful" branding visible anywhere
- Consistent user experience across themes
- No layout shifts or visual glitches