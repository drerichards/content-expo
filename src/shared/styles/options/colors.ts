export const COLORS = [
  // neutrals
  "neutral-0",
  "neutral-1",
  "neutral-2",
  "neutral-3",

  // blues
  "blue-1",
  "blue-2",
  "blue-3",

  // teals
  "teal-1",
  "teal-2",

  // oranges
  "orange-1",
  "orange-2",

  // accents
  "yellow-1",
  "green-1",
] as const;

export type Color = (typeof COLORS)[number];
