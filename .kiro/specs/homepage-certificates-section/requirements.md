# Requirements Document

## Introduction

Add a certificates preview section to the homepage that showcases the latest professional certifications and achievements. This section will display 3 recent certificates with a "View More" button linking to the full certificates page.

## Glossary

- **Certificate Section**: A dedicated section on the homepage displaying certificate previews
- **Certificate Preview**: A card showing certificate title, issuer, date, and image
- **View More Button**: A call-to-action button that navigates to the full certificates page
- **Contentful Integration**: Dynamic content fetching from Contentful CMS
- **Homepage**: The main landing page at `/` route

## Requirements

### Requirement 1

**User Story:** As a visitor, I want to see recent certificates on the homepage, so that I can quickly assess the professional qualifications and achievements.

#### Acceptance Criteria

1. WHEN a user visits the homepage THEN the system SHALL display a certificates section between the projects and blog sections
2. WHEN the certificates section loads THEN the system SHALL fetch the 3 most recent certificates from Contentful ordered by issue date
3. WHEN certificates are displayed THEN the system SHALL show certificate title, issuer, issue date, and certificate image for each entry
4. WHEN no certificates are available THEN the system SHALL display a placeholder message indicating certificates will appear when added
5. WHEN certificates load successfully THEN the system SHALL include a "View More" button that links to `/certificates`

### Requirement 2

**User Story:** As a visitor, I want to click on certificate previews, so that I can view the full certificate details or credential URL.

#### Acceptance Criteria

1. WHEN a user clicks on a certificate image THEN the system SHALL open the credential URL in a new tab if available
2. WHEN a certificate has no credential URL THEN the system SHALL open an image modal showing the full certificate image
3. WHEN displaying certificate cards THEN the system SHALL show visual hover effects to indicate interactivity
4. WHEN a certificate has a category THEN the system SHALL display a colored category badge
5. WHEN certificate images fail to load THEN the system SHALL display a fallback placeholder image

### Requirement 3

**User Story:** As a visitor, I want the certificates section to match the homepage design, so that the user experience feels cohesive and professional.

#### Acceptance Criteria

1. WHEN the certificates section renders THEN the system SHALL use consistent typography and spacing with other homepage sections
2. WHEN displaying certificate cards THEN the system SHALL use the same card styling as projects and blog previews
3. WHEN in light mode THEN the system SHALL adapt certificate section colors to match the light theme
4. WHEN on mobile devices THEN the system SHALL display certificates in a responsive grid layout
5. WHEN the section loads THEN the system SHALL include a section header with icon and description matching other sections

### Requirement 4

**User Story:** As a content manager, I want the certificates section to automatically update, so that new certificates appear on the homepage without manual intervention.

#### Acceptance Criteria

1. WHEN new certificates are published in Contentful THEN the system SHALL automatically include them in the homepage display
2. WHEN certificates are reordered by issue date THEN the system SHALL reflect the new order on the homepage
3. WHEN certificate content is updated in Contentful THEN the system SHALL display the updated information after rebuild
4. WHEN the Contentful connection fails THEN the system SHALL gracefully handle the error without breaking the homepage
5. WHEN certificates are unpublished THEN the system SHALL exclude them from the homepage display