export interface Section {
  id: string;
  top: number;
  height: number;
}

/**
 * Determines the active section based on scroll position.
 * Returns the section whose top boundary is closest to but not below the current scroll position.
 */
export function getActiveSection(
  scrollPosition: number,
  sections: Section[],
  offset: number = 100
): string | null {
  if (sections.length === 0) {
    return null;
  }

  const adjustedScroll = scrollPosition + offset;
  let activeSection: string | null = null;

  // Sort sections by top position
  const sortedSections = [...sections].sort((a, b) => a.top - b.top);

  for (const section of sortedSections) {
    if (adjustedScroll >= section.top) {
      activeSection = section.id;
    } else {
      break;
    }
  }

  // If no section found (scrolled above all sections), return first section
  if (activeSection === null && sortedSections.length > 0) {
    activeSection = sortedSections[0].id;
  }

  return activeSection;
}

/**
 * Calculates smooth scroll target position with offset for sticky header
 */
export function getScrollTarget(elementTop: number, headerOffset: number = 80): number {
  return Math.max(0, elementTop - headerOffset);
}

/**
 * Checks if scroll position is within a section's bounds
 */
export function isWithinSection(
  scrollPosition: number,
  section: Section,
  offset: number = 0
): boolean {
  const adjustedScroll = scrollPosition + offset;
  return adjustedScroll >= section.top && adjustedScroll < section.top + section.height;
}
