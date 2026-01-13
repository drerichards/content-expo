// src/shared/styles/options/density.ts

export const DENSITIES = ["tight", "md", "loose"] as const;

export type Density = (typeof DENSITIES)[number];
