// Type-safe token references for TypeScript components
// Maps to CSS custom properties in tokens.css

export const spacing = {
  "1": "var(--space-1)",
  "2": "var(--space-2)",
  "3": "var(--space-3)",
  "4": "var(--space-4)",
  "5": "var(--space-5)",
  "6": "var(--space-6)",
  "8": "var(--space-8)",
  "10": "var(--space-10)",
  "12": "var(--space-12)",
  "16": "var(--space-16)",
} as const;

export const radius = {
  none: "var(--radius-none)",
  sm: "var(--radius-sm)",
  md: "var(--radius-md)",
} as const;

export const duration = {
  instant: "var(--duration-instant)",
  fast: "var(--duration-fast)",
  base: "var(--duration-base)",
  slow: "var(--duration-slow)",
  slower: "var(--duration-slower)",
} as const;

export const easing = {
  linear: "var(--ease-linear)",
  in: "var(--ease-in)",
  out: "var(--ease-out)",
  inOut: "var(--ease-in-out)",
  spring: "var(--ease-spring)",
} as const;

// Type exports for component props
export type Spacing = keyof typeof spacing;
export type Radius = keyof typeof radius;
export type Duration = keyof typeof duration;
export type Easing = keyof typeof easing;
