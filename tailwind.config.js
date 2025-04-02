/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        sidebar: "300px auto", // for sidebar layout
        "sidebar-collapsed": "64px auto", // for collapsed sidebar layout
      },
      colors: {
        "primary": "#ea580c", // Customizing Tailwind's default blue color
        "light-pg": "#8D97B5", // Light purple-gray color
      },
      fontFamily: {
        tb: ["Plus Jakarta Sans", "sans-serif"],
        tbPop: ["Poppins", "sans-serif"],
        tbMon: ["Montserrat", "sans-serif"],
      },
      backgroundColor: {
        "base-bg": "#F4F7FE",
      },
    },
  },
};
