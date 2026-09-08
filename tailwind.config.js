/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        void: '#030712',
        surface: {
          950: '#030712',
          900: '#070b14',
          850: '#0b111e',
          800: '#111827',
          750: '#151f33',
          700: '#1e293b',
          600: '#334155',
        },
        brand: {
          orange: '#ff6426',
          amber: '#f59e0b',
          yellow: '#eab308',
          sky: '#38bdf8',
          cyan: '#06b6d4',
          blue: '#0284c7',
          pink: '#ec4899',
          rose: '#f43f5e',
          violet: '#8b5cf6',
          emerald: '#10b981',
        },
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Outfit', 'system-ui', 'sans-serif'],
        display: ['Syne', 'Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 25s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow 4s ease-in-out infinite alternate',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { opacity: '0.35', transform: 'scale(0.98)' },
          '100%': { opacity: '0.75', transform: 'scale(1.03)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      boxShadow: {
        'glow-orange': '0 0 50px -10px rgba(255, 100, 38, 0.4)',
        'glow-yellow': '0 0 50px -10px rgba(234, 179, 8, 0.4)',
        'glow-sky': '0 0 50px -10px rgba(56, 189, 248, 0.4)',
        'glow-pink': '0 0 50px -10px rgba(236, 72, 153, 0.4)',
      },
    },
  },
  plugins: [],
};
