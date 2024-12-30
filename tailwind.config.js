/** @type {import('tailwindcss').Config} */
const colors = {
  primaryText: '#000000',
  levelEasy: '#119200',
  levelMedium: '#D38900',
  levelHard: '#D30000',
  white: '#FFFFFF',
  dark: '#1F3D4A',
  gray: '#CECECE',
};

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      dark: colors.dark,
      gray: colors.gray,
      accentRed: '#FF0000',
      accentGreen: '#119200',
      accentOrange: '#D38900',
      accentBlue: '#00BBFF',
      accentYellow: '#F5FE00',
      accentPink: '#E800B5',
      disabledBg: '#8A8A8A',
      header: {
        text: colors.dark,
        textAccent: '#f26419',
        bg: colors.white,
        logoBg: colors.dark,
      },
      challenge: {
        text: colors.primaryText,
        bg: colors.white,
        levelEasy: colors.levelEasy,
        levelMedium: colors.levelMedium,
        levelHard: colors.levelHard,
      },
      startScreen: {
        bg: colors.white,
        logoBg: colors.dark,
        text: colors.dark,
        link: {
          text: colors.white,
          bg: colors.dark,
        },
      },
    },

    extend: {
      backgroundImage: {
        gradientBody: 'linear-gradient(#0F2027, #1F3D4A, #0F2027)',
      },
      boxShadow: {
        logoShadow:
          '0px 13px 27px -5px rgba(50, 50, 93, 0.25), 0px 8px 16px -8px rgba(0, 0, 0, 0.3)',
      },
      screens: {
        xs: '15rem',
      },
    },
  },
  plugins: [],
};
