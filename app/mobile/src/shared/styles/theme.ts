export const theme = {
  colors: {
    // Pregnancy specific colors
    pregnancy: {
      pink: '#fdf2f8',
      beige: '#fef7f0',
      mint: '#f0fdfa',
      sky: '#f0f9ff',
    },
    soft: {
      pink: '#fbcfe8',
      beige: '#fed7aa',
      mint: '#a7f3d0',
      sky: '#bae6fd',
    },
    // Main colors
    primary: '#4F7CAC',
    success: '#37B26C',
    warning: '#F6C343',
    danger: '#E05263',
    // System colors
    bg: '#FFFFFF',
    text: '#1F2937',
  },
  radii: {
    sm: 8,
    md: 12,
    lg: 20,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    '2xl': 32,
  },
  font: {
    base: 16,
    lineHeight: 1.4,
  },
} as const;

export type Theme = typeof theme;
