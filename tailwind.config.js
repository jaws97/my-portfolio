/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rye: ['Rye', 'serif'],
        caveat: ['Caveat', 'cursive'],
        'im-fell': ['"IM Fell English SC"', 'serif'],
      }
    },
  },
  plugins: [],
}