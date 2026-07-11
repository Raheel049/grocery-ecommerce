/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          brand: {
            dark: "#0B0F19",
            card: "#111827",
            emerald: "#10B981",
            teal: "#14B8A6",
          }
        },
      },
    },
    plugins: [],
  }