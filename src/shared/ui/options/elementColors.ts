// System-level allowed options for visual elements

export const ELEMENT_COLORS = [
    'blue-1',
    'blue-2',
    'blue-3',
    'teal-1',
    'teal-2',
    'orange-1',
    'orange-2',
    'yellow-1',
    'green-1',
] as const

export type ElementColor = typeof ELEMENT_COLORS[number]