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
        'tactical-black': '#0A0A0A',
        'tactical-section': '#111111',
        'tactical-card': '#161616',
        'neon-lime': '#B4F000',
        'tactical-magenta': '#FF2E88',
        'tactical-cyan': '#00F0FF',
        'soft-white': '#EAEAEA',
        'muted-gray': '#666666',
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