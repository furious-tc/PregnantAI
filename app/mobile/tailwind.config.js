/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'pregnancy-pink': '#fdf2f8',
        'pregnancy-beige': '#fef7f0',
        'pregnancy-mint': '#f0fdfa',
        'pregnancy-sky': '#f0f9ff',
        'soft-pink': '#fbcfe8',
        'soft-beige': '#fed7aa',
        'soft-mint': '#a7f3d0',
        'soft-sky': '#bae6fd',
        primary: '#4F7CAC',
        success: '#37B26C',
        warning: '#F6C343',
        danger: '#E05263',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '20px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '32px',
      },
    },
  },
  plugins: [],
}
