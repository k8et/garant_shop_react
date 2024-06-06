/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'blue-gradient': 'linear-gradient(180deg, #745EEC 0%, #5D4BEC 100%)',
        'red-gradient': 'linear-gradient(180deg, #EC5E5E 0%, #EC4B4B 100%)',
      },
    },
  },
  plugins: [],
};
