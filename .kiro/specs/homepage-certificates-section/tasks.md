# Implementation Plan

- [x] 1. Create CertificatesPreview component
  - Create new Astro component at `src/components/CertificatesPreview.astro`
  - Import and use `getCertificates` function from contentful utils
  - Implement certificate data fetching with error handling
  - Add limit of 3 certificates and sort by issue date descending
  - _Requirements: 1.2, 1.4, 4.1, 4.4_

- [x] 2. Design certificate card layout
  - Create responsive grid layout for certificate cards
  - Implement certificate image display with fallback chain
  - Add certificate title, issuer, and issue date display
  - Include category badge with color coding
  - Add hover effects and interactive states
  - _Requirements: 1.3, 2.3, 2.4, 3.2, 3.4_

- [x] 3. Implement certificate interaction handlers
  - Add click handler for certificate cards
  - Implement credential URL opening in new tab
  - Create image modal for certificates without credential URLs
  - Add proper cursor and visual feedback for interactions
  - _Requirements: 2.1, 2.2, 2.3_

- [x] 4. Add section header and styling
  - Create section header with icon and description
  - Implement "View More" button linking to `/certificates`
  - Apply consistent typography and spacing with other sections
  - Add light/dark mode theme support
  - _Requirements: 1.5, 3.1, 3.3_

- [x] 5. Handle empty and error states
  - Implement placeholder message for no certificates
  - Add graceful error handling for Contentful failures
  - Create fallback image for broken certificate images
  - Ensure homepage doesn't break with missing data
  - _Requirements: 1.4, 2.5, 4.4_

- [x] 6. Integrate into homepage
  - Add CertificatesPreview component to homepage
  - Position between Projects and BlogPreview sections
  - Test homepage layout and section flow
  - Verify responsive behavior across devices
  - _Requirements: 1.1, 3.4_

- [x] 7. Add image modal functionality
  - Create reusable image modal component
  - Implement modal open/close functionality
  - Add keyboard navigation (ESC to close)
  - Include backdrop click to close
  - Style modal to match existing design system
  - _Requirements: 2.2_

- [ ]* 8. Write unit tests for certificate display
  - Test certificate data fetching and filtering
  - Test image URL generation and fallback logic
  - Test click handlers for different certificate types
  - Test responsive grid layout rendering
  - _Requirements: 1.2, 1.3, 2.1, 2.2_

- [ ]* 9. Write property tests for certificate logic
  - **Property 1: Certificate Count Limit** - Test that at most 3 certificates are displayed
  - **Property 2: Date Ordering Consistency** - Test certificates are ordered by issue date descending
  - **Property 3: Image Fallback Chain** - Test image fallback logic works correctly
  - **Property 4: Navigation Consistency** - Test click behavior based on credential URL presence
  - **Validates: Requirements 1.2, 2.1, 2.2, 2.5, 4.2**

- [x] 10. Test integration and polish
  - Test Contentful integration end-to-end
  - Verify homepage performance impact
  - Test cross-browser compatibility
  - Polish animations and transitions
  - _Requirements: 3.1, 4.1, 4.3_

- [x] 11. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.