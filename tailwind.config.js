/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         colors: {
            color1: "#1C2833",
            color2: "#2C3E50",
            color3: "#34495E",
            fontcolor: "#ECF0F1",
         },
      },
   },
   plugins: [],
};
