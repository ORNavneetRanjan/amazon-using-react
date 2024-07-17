/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.jsx",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'custom': '1fr 1fr 4fr 1fr 1fr 1fr',
      }
    },
  },
  plugins: [],
}

