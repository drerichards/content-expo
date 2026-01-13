export const ELEMENT_STATES = ['default', 'active', 'disabled'] as const
export type ElementState = typeof ELEMENT_STATES[number]