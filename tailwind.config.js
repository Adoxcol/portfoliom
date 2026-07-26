/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        // Tactical interface colors
        'tactical-black': 'rgb(var(--color-tactical-black) / <alpha-value>)',
        'tactical-section': 'rgb(var(--color-tactical-section) / <alpha-value>)',
        'tactical-card': 'rgb(var(--color-tactical-card) / <alpha-value>)',
        'neon-lime': 'rgb(var(--color-neon-lime) / <alpha-value>)',
        'tactical-magenta': 'rgb(var(--color-tactical-magenta) / <alpha-value>)',
        'tactical-cyan': 'rgb(var(--color-tactical-cyan) / <alpha-value>)',
        'soft-white': 'rgb(var(--color-soft-white) / <alpha-value>)',
        'muted-gray': 'rgb(var(--color-muted-gray) / <alpha-value>)',
      },
      fontFamily: {
        'space-grotesk': ['Space Grotesk', 'monospace'],
        'ibm-plex-mono': ['IBM Plex Mono', 'monospace'],
        'jetbrains-mono': ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'flicker': 'flicker 2s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scanline': 'scanline 8s linear infinite',
        'pulse-neon': 'pulse-neon 1.5s ease-in-out infinite alternate',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px currentColor' },
          '100%': { boxShadow: '0 0 20px currentColor, 0 0 30px currentColor' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'pulse-neon': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0.6' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [],
};
