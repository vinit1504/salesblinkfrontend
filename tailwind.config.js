/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      screens: {
        'sm': '640px',
        'md': '768px',
        'xs': '980px', 
        'xl': '1280px',
      },
    },
  },
  plugins: [],
};
