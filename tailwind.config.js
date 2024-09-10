/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        Black: '#101010',
        DarkBlue: '#2A2C41',
        DarkerBlue: '#000014',
        Yellow: '#FDBF50',
        Beige: '#D4CDCD',
        Beige2: '#BEB6A8',
        Beige3: '#A2947A',
        DarkBeige: '#ACA08C',
        White: '#F4F4F8',
        'white-18': 'rgba(255, 255, 255, 0.18)',
        DarkPink: '#FF506D',
        LightPink: '#FFA8B7',
        LighterPink: '#ffe5e8',
        Blue: '#50A0FF',
        Cyan: '#5BEDDE',
      },
      backdropFilter: {
        'blur-2': 'blur(2px)',
      },
      boxShadow: {
        custom: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      screens: {
        'lg1': '1523px',
        'lg': '1280px',
        'lg2': '1100px',
        'md1': '900px',
        'md2': '700px',
        'md3': '560px',
        'md4': '950px',
        'sm2': '500px',
        'sm3': '400px',
        'xs': '450px',
        'xl': '1200px',
        'xl2': '1600px',
      },
      maxWidth: {
        '10ch': '10ch',
        '144ch': '144ch'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
