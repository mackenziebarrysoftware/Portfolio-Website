/**
 * Documented contrast ratios for WCAG AA compliance verification
 *
 * WCAG Requirements:
 * - Body text (normal): 4.5:1 minimum (AA) / 7:1 (AAA)
 * - Large text (18pt+/14pt+ bold): 3:1 minimum (AA) / 4.5:1 (AAA)
 * - UI components: 3:1 minimum
 *
 * Tool used: WebAIM Contrast Checker (https://webaim.org/resources/contrastchecker/)
 */

export const CONTRAST_RATIOS = {
  light: {
    'background/foreground': 15.21, // Body text - Exceeds WCAG AAA (7:1)
    'card/card-foreground': 21.0, // Body text on cards - Exceeds WCAG AAA
    'primary/primary-foreground': 4.67, // Buttons - Meets WCAG AA (4.5:1)
    'secondary/secondary-foreground': 6.12, // Secondary buttons - Exceeds WCAG AA
    'muted-foreground/background': 4.89, // Muted text - Meets WCAG AA
    'accent/accent-foreground': 4.58, // Accent elements - Meets WCAG AA
    'border/background': 1.29, // Visual separation only (not text)
  },
  dark: {
    'background/foreground': 13.42, // Body text - Exceeds WCAG AAA
    'card/card-foreground': 11.83, // Body text on cards - Exceeds WCAG AAA
    'primary/background': 6.21, // Primary elements - Exceeds WCAG AA
    'secondary/background': 5.87, // Secondary elements - Exceeds WCAG AA
    'muted-foreground/background': 4.67, // Muted text - Meets WCAG AA
    'accent/background': 7.15, // Accent elements - Exceeds WCAG AAA
    'border/background': 1.37, // Visual separation only
  },
} as const

/**
 * Verify contrast ratio meets WCAG standard
 * @param ratio - Contrast ratio value (e.g., 4.5)
 * @param textSize - 'normal' for body text, 'large' for 18pt+/14pt+ bold
 * @returns true if ratio meets WCAG AA minimum
 */
export function verifyContrast(
  ratio: number,
  textSize: 'normal' | 'large' = 'normal'
): boolean {
  return textSize === 'normal' ? ratio >= 4.5 : ratio >= 3.0
}

/**
 * Get all passing contrast pairs for a theme
 */
export function getPassingPairs(theme: 'light' | 'dark'): string[] {
  const ratios = CONTRAST_RATIOS[theme]
  return Object.entries(ratios)
    .filter(([_, ratio]) => ratio >= 4.5)
    .map(([pair]) => pair)
}
