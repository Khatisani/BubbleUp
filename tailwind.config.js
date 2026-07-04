/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bubble: {
          cream: '#FFF9F9',
          blush: '#FFE5E9',
          rose: '#FFA3B1',
          magenta: '#FF6B8B',
          dark: '#4A3538',
        }
      }
    },
  },
  plugins: [],
}