/**
 * Animation utility types and helpers
 */

export type AnimationType =
  | "fade-in"
  | "fade-out"
  | "slide-in-up"
  | "slide-in-down"
  | "slide-in-left"
  | "slide-in-right"
  | "scale-in"
  | "scale-out";

export type TransitionType = "all" | "colors" | "transform" | "opacity";

export type AnimationSpeed = "fast" | "base" | "slow" | "slower";

export type StaggerIndex = 1 | 2 | 3 | 4 | 5;

/**
 * Build animation data attributes
 */
export function buildAnimationAttrs(
  animation?: AnimationType,
  options?: {
    stagger?: StaggerIndex;
    speed?: AnimationSpeed;
  },
): Record<string, string | undefined> {
  return {
    "data-animate": animation,
    "data-stagger": options?.stagger?.toString(),
    "data-speed": options?.speed,
  };
}

/**
 * Build transition data attributes
 */
export function buildTransitionAttrs(
  transition?: TransitionType,
  speed?: AnimationSpeed,
): Record<string, string | undefined> {
  return {
    "data-transition": transition,
    "data-speed": speed,
  };
}

/**
 * Stagger children animations
 */
export function getStaggerDelay(
  index: number,
  baseDelay: number = 150,
): number {
  return index * baseDelay;
}
