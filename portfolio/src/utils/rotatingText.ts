/**
 * Rotating text cycle utilities
 */

export interface RotatingTextState {
  texts: string[];
  currentIndex: number;
}

/**
 * Gets the next index in the rotation cycle
 */
export function getNextIndex(currentIndex: number, totalTexts: number): number {
  if (totalTexts <= 0) return 0;
  return (currentIndex + 1) % totalTexts;
}

/**
 * Gets the current text based on index
 */
export function getCurrentText(texts: string[], index: number): string {
  if (texts.length === 0) return '';
  const safeIndex = Math.abs(index) % texts.length;
  return texts[safeIndex];
}

/**
 * Simulates a full cycle through all texts
 * Returns true if all texts are visited exactly once before returning to start
 */
export function simulateFullCycle(texts: string[]): string[] {
  if (texts.length === 0) return [];
  
  const visited: string[] = [];
  let currentIndex = 0;
  
  for (let i = 0; i < texts.length; i++) {
    visited.push(texts[currentIndex]);
    currentIndex = getNextIndex(currentIndex, texts.length);
  }
  
  return visited;
}

/**
 * Checks if the cycle returns to the first text after completing all texts
 */
export function cycleReturnsToStart(texts: string[], cycles: number): boolean {
  if (texts.length === 0) return true;
  
  let currentIndex = 0;
  const totalIterations = texts.length * cycles;
  
  for (let i = 0; i < totalIterations; i++) {
    currentIndex = getNextIndex(currentIndex, texts.length);
  }
  
  // After complete cycles, should be back at start
  return currentIndex === 0;
}
