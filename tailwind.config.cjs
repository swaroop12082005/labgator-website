/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#D4AF37',
        secondary: '#C9A227',
        accent: '#F5C542',
        bg: '#F8F6F1',
        surface: '#FFFFFF'
      },
      fontFamily: {
        display: ['Bebas Neue', 'ui-serif', 'Georgia'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['DM Mono', 'ui-monospace', 'monospace']
      }
    }
  },
  plugins: [],
}
