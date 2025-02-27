/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        sidebar: "300px auto", //for sidebar layout
        "sidebar-collapsed": "64px auto", //for collapsed sidebar layout
      },
      fontFamily: {
        tb: ["Plus Jakarta Sans", "sans-serif"],
        tbPop: ["Poppins", "sans-serif"],
        tbMon: ["Montserrat", "sans-serif"],
      },
      backgroundColor: {
        'base-bg': '#F4F7FE',
      },
      colors: {
        'light-pg': '#8D97B5',
      }
    },
  },
};
