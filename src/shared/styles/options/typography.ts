// src/shared/styles/options/typography.ts

export const TYPOGRAPHY = ["body", "title", "meta"] as const;

export type Typography = (typeof TYPOGRAPHY)[number];
