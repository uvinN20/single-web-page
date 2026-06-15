/** @type {import('tailwindcss').Config} */
export default {
  // Tell Tailwind WHERE your Vue files are so it scans them for class names
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Our brand navy — used everywhere as bg-[#1B2A6B]
        brand: {
          DEFAULT: '#1B2A6B',
          light:   '#2D3FBF',
          dark:    '#0d1f5c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}