import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        google: {
          blue: '#4285F4',
          red: '#EA4335',
          yellow: '#FBBC04',
          green: '#34A853',
        },
        io: {
          bg: '#000000',
          surface: 'rgba(255, 255, 255, 0.06)',
          muted: 'rgba(255, 255, 255, 0.65)',
          subtle: 'rgba(255, 255, 255, 0.45)',
          border: 'rgba(255, 255, 255, 0.12)',
        },
      },
      fontFamily: {
        google: ['Google Sans Flex', 'Google Sans', 'Product Sans', 'system-ui', 'sans-serif'],
        sans: ['Google Sans Flex', 'Google Sans', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: {
        pill: '9999px',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in',
        'slide-up': 'slideUp 0.4s ease-out',
        float: 'photoFloat 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
