/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'new-yellow': '#f1cd30'
      },
      fontFamily: {
        'dm-sans': 'DM Sans',
        'poppins': 'Poppins'
      }
    },
  },
  plugins: [],
}

