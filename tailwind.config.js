/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0c0f',
        panel: '#131619',
        'panel-light': '#1a1e23',
        border: '#262b31',
        'text-primary': '#eae7e0',
        'text-dim': '#8b9299',
        amber: '#e7a13c',
        teal: '#4fa89a',
        blue: '#5b8cc4',
        danger: '#d8614f',
      },
      fontFamily: {
        serif: ['"Fraunces"', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'Menlo', 'monospace'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-dot': 'pulseDot 1.2s ease-in-out infinite',
        'glow-amber': 'glowAmber 2s ease-in-out infinite alternate',
        'fade-in-up': 'fadeInUp 0.3s ease-out forwards',
      },
      keyframes: {
        pulseDot: {
          '0%, 80%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '40%': { opacity: '1', transform: 'scale(1)' },
        },
        glowAmber: {
          '0%': { boxShadow: '0 0 6px 1px rgba(231,161,60,0.3)' },
          '100%': { boxShadow: '0 0 14px 4px rgba(231,161,60,0.55)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
