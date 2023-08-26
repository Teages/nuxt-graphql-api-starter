/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './*.vue',
  ],
  theme: {
    container: {
      center: true,
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['[data-theme=light]'],
        },
        dark: {
          ...require('daisyui/src/theming/themes')['[data-theme=dracula]'],
          primary: '#a5b4fc',
          secondary: '#d8b4fe',
          accent: '#ffb86b',
        },
      },
    ],
    logs: false,
  },
}
