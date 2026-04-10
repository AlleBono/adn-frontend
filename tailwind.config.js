/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#FF9500",
        "brand-light": "#FFF3E0",
      },
    },
  },
  plugins: [],
};
