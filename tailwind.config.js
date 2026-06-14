/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vault: {
          bg: '#0B132B',      // Deep navy background
          panel: '#1C2541',   // Sleek slate-blue panels
          accent: '#48CAE4',  // Vibrant electric blue/cyan accent
          text: '#F8FAFC',    // Light slate text
          muted: '#94A3B8',   // Muted slate text
          border: '#3A4468',  // Panel borders
          dark: '#070C1B',    // Darkest navy
          darker: '#040710',  // Deep dark
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
