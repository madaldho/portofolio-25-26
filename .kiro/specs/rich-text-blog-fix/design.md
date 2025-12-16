# Rich Text Blog Rendering - Design Document

## Architecture Overview

The rich text rendering system consists of three main components:

1. **Server-side rendering** - Initial HTML generation during build
2. **Client-side theme adaptation** - Dynamic re-rendering for theme changes
3. **CSS styling system** - Theme-aware styling using custom properties

## Component Structure

### RichText.astro Component
- **Purpose**: Render Contentful rich text documents to HTML
- **Props**: `content` (Document), `className` (optional string)
- **Features**: 
  - Server-side rendering with default theme
  - Client-side re-rendering for theme changes
  - Data attribute for content storage

### Rich Text Utility (richText.ts)
- **Purpose**: Convert Contentful rich text to styled HTML
- **Functions**:
  - `renderRichText(document, isLightMode)` - Main rendering function
  - `extractPlainText(document)` - Extract text for reading time
  - `calculateReadingTime(document)` - Calculate estimated reading time
  - `getExcerpt(document, maxLength)` - Generate content excerpts

## Rendering Pipeline

### 1. Build Time (SSR)
```
Contentful Rich Text Document
↓
renderRichText(content, false) // Default to dark mode
↓
HTML with CSS classes and inline styles
↓
Static HTML in build output
```

### 2. Runtime (Client-side)
```
Page Load
↓
Theme Detection (body.classList.contains('light'))
↓
Re-render if theme differs from default
↓
Update DOM with theme-appropriate HTML
```

### 3. Theme Change
```
Theme Toggle Event
↓
MutationObserver detects body class change
↓
Re-render all rich text content
↓
Smooth transition to new theme
```

## Styling System

### CSS Custom Properties
```css
/* Dark Theme (Default) */
--color-dark-surface: #141414
--color-dark-border: #2A2A2A
--font-mono: 'JetBrains Mono', monospace

/* Light Theme */
--color-light-surface: #FFFFFF
--color-light-border: #E5E5E5
```

### Rich Text Elements

#### Headings (H1-H6)
- **Dark Mode**: White text with proper hierarchy
- **Light Mode**: Dark text with same hierarchy
- **Spacing**: Consistent margins for visual rhythm

#### Paragraphs
- **Line Height**: 1.7 for optimal readability
- **Spacing**: 1rem margin between paragraphs
- **Color**: Semi-transparent for better hierarchy

#### Code Blocks
- **Background**: Surface color with border
- **Font**: JetBrains Mono for consistency
- **Scrolling**: Horizontal scroll for long lines
- **Syntax**: Future enhancement for highlighting

#### Lists
- **Indentation**: 1.5rem padding-left
- **Markers**: Disc for unordered, decimal for ordered
- **Spacing**: 0.5rem between items

#### Tables
- **Responsive**: Horizontal scroll on mobile
- **Borders**: Consistent with theme colors
- **Headers**: Distinct background color
- **Padding**: 1rem for comfortable reading

#### Images
- **Responsive**: max-width: 100%
- **Styling**: Rounded corners and shadow
- **Optimization**: Contentful image API parameters
- **Captions**: Centered, muted text

#### Links
- **Color**: Primary brand color
- **Hover**: Lighter shade with transition
- **External**: Icon indicator and new tab
- **Focus**: Visible outline for accessibility

## Theme Adaptation Strategy

### Server-Side Rendering
- Default to dark mode for initial render
- Prevents flash of unstyled content
- Ensures consistent initial experience

### Client-Side Re-rendering
- Detect theme on page load
- Re-render if different from default
- Use MutationObserver for theme changes
- Debounce re-rendering for performance

### CSS Transitions
- Smooth color transitions between themes
- Maintain layout stability during changes
- Use CSS custom properties for easy switching

## Performance Considerations

### Bundle Size
- Import rich text utility dynamically
- Only load when needed for theme changes
- Tree-shake unused render options

### Rendering Performance
- Cache rendered HTML when possible
- Minimize DOM manipulations
- Use efficient selectors for updates

### Memory Management
- Clean up MutationObserver on unmount
- Avoid memory leaks in SPA navigation
- Efficient JSON parsing for content data

## Accessibility Features

### Semantic HTML
- Proper heading hierarchy (H1-H6)
- List semantics for screen readers
- Table headers and captions

### Color Contrast
- WCAG AA compliance in both themes
- Sufficient contrast for all text
- Focus indicators for interactive elements

### Keyboard Navigation
- Tab order for links and buttons
- Skip links for long content
- Focus management for dynamic content

## Error Handling

### Graceful Degradation
- Fallback to plain text if rendering fails
- Error boundaries for component failures
- Console warnings for debugging

### Content Validation
- Type checking for Contentful documents
- Null/undefined checks for safety
- Default values for missing content

## Future Enhancements

### Syntax Highlighting
- Integrate Prism.js or similar
- Language detection from code blocks
- Theme-aware syntax colors

### Interactive Elements
- Expandable code blocks
- Copy-to-clipboard functionality
- Image zoom/lightbox

### Performance Optimizations
- Virtual scrolling for long content
- Lazy loading for embedded assets
- Service worker caching

### Advanced Typography
- Custom font loading
- Typography scale adjustments
- Reading mode enhancements