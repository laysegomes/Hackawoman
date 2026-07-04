/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        handset: "0 30px 80px rgba(33, 16, 57, 0.18)",
      },
    },
  },
  plugins: [],
};
