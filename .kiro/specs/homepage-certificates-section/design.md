# Design Document

## Overview

This design implements a certificates preview section for the homepage that displays the 3 most recent certificates from Contentful. The section will be positioned between the Projects and Blog sections, maintaining visual consistency with the existing homepage design while providing an engaging showcase of professional achievements.

## Architecture

### Component Structure
```
HomePage
├── Hero
├── About  
├── TechInterests
├── Projects
├── CertificatesPreview (NEW)
├── BlogPreview
└── Contact
```

### Data Flow
1. **Homepage Load** → Fetch certificates from Contentful
2. **Certificate Data** → Filter and sort by issue date (desc)
3. **Display Logic** → Show 3 most recent certificates
4. **User Interaction** → Handle clicks and navigation

## Components and Interfaces

### CertificatesPreview Component

**Location**: `src/components/CertificatesPreview.astro`

**Props**: None (fetches data internally)

**Functionality**:
- Fetches certificates using `getCertificates()` from contentful utils
- Displays 3 most recent certificates
- Handles error states and loading fallbacks
- Provides navigation to full certificates page

### Certificate Card Structure
```typescript
interface CertificateCard {
  title: string;
  issuer: string;
  issueDate: string;
  category?: string;
  certificateImage?: ContentfulAsset;
  imageUrl?: string;
  credentialUrl?: string;
}
```

## Data Models

### Certificate Display Data
- **Source**: Contentful `certificate` content type
- **Sorting**: By `issueDate` descending
- **Limit**: 3 certificates maximum
- **Fallback**: Graceful handling when no certificates exist

### Image Handling
- **Primary**: Contentful uploaded certificate image
- **Secondary**: URL fallback field
- **Tertiary**: Default placeholder image from Unsplash

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Certificate Count Limit
*For any* certificates data from Contentful, the homepage section should display at most 3 certificates regardless of total available certificates
**Validates: Requirements 1.2**

### Property 2: Date Ordering Consistency  
*For any* set of certificates with issue dates, the displayed certificates should be ordered by issue date in descending order (newest first)
**Validates: Requirements 1.2, 4.2**

### Property 3: Image Fallback Chain
*For any* certificate without a valid certificate image, the system should display either the imageUrl fallback or default placeholder image
**Validates: Requirements 2.5**

### Property 4: Navigation Consistency
*For any* certificate with a credential URL, clicking the certificate should open the URL in a new tab; otherwise it should open an image modal
**Validates: Requirements 2.1, 2.2**

### Property 5: Responsive Layout Preservation
*For any* screen size, the certificates section should maintain proper grid layout and readability
**Validates: Requirements 3.4**

## Error Handling

### Contentful Connection Failures
- **Graceful Degradation**: Show empty state message
- **No Breaking**: Homepage continues to function normally
- **User Feedback**: Clear indication that certificates will appear when available

### Image Loading Failures
- **Fallback Chain**: certificateImage → imageUrl → placeholder
- **Alt Text**: Descriptive alternative text for accessibility
- **Loading States**: Proper loading indicators

### Missing Data Handling
- **Empty Certificates**: Show "No certificates yet" message
- **Missing Fields**: Use sensible defaults and validation
- **Broken Links**: Prevent navigation to invalid URLs

## Testing Strategy

### Unit Testing
- Certificate data fetching and filtering
- Image URL generation and fallback logic
- Click handler behavior for different certificate types
- Responsive grid layout rendering

### Property-Based Testing
- **Library**: fast-check for TypeScript
- **Iterations**: Minimum 100 test runs per property
- **Coverage**: All correctness properties listed above
- **Generators**: Random certificate data with various field combinations

### Integration Testing
- Contentful API integration
- Homepage section rendering
- Navigation flow to certificates page
- Cross-browser compatibility

## Implementation Notes

### Section Positioning
- Insert between `<Projects />` and `<BlogPreview />` in homepage
- Maintain consistent section spacing and padding
- Use same background treatment as other sections

### Visual Design Consistency
- **Typography**: Match existing section headers and body text
- **Cards**: Use same elevation and hover effects as project cards
- **Colors**: Respect dark/light mode theme variables
- **Spacing**: Follow established grid system and margins

### Performance Considerations
- **Image Optimization**: Use Contentful image transformation API
- **Lazy Loading**: Implement for certificate images
- **Caching**: Leverage Astro's static generation for performance
- **Bundle Size**: Minimal impact on homepage load time