/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        merriweather: ["Merriweather", "Noto Sans KR"],
        "abril-fatface": ["Abril Fatface"],
        "nanum-pen-script": ["Nanum Pen Script"],
        "noto-sans-kr": ["Noto Sans KR"],
      },
      backgroundImage: {
        main: "url('assets/images/main.avif')",
      },
    },
  },
  plugins: [],
};
