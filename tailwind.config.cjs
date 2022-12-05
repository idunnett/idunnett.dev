/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 3s ease-in forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0%' },
          to: { opacity: '100%' },
        },
      },
    },
  },
  plugins: [require('tw-elements/dist/plugin')],
}
