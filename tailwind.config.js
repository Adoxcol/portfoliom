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
        // Hunter Association license theme
        ink: 'rgb(var(--color-ink) / <alpha-value>)',
        section: 'rgb(var(--color-section) / <alpha-value>)',
        card: 'rgb(var(--color-card) / <alpha-value>)',
        scarlet: 'rgb(var(--color-scarlet) / <alpha-value>)',
        'scarlet-glow': 'rgb(var(--color-scarlet-glow) / <alpha-value>)',
        ember: 'rgb(var(--color-ember) / <alpha-value>)',
        blood: 'rgb(var(--color-blood) / <alpha-value>)',
        obsidian: 'rgb(var(--color-obsidian) / <alpha-value>)',
        gold: 'rgb(var(--color-gold) / <alpha-value>)',
        'gold-deep': 'rgb(var(--color-gold-deep) / <alpha-value>)',
        chain: 'rgb(var(--color-chain) / <alpha-value>)',
        bone: 'rgb(var(--color-bone) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        inter: ['Inter', 'sans-serif'],
        'ibm-plex-mono': ['IBM Plex Mono', 'monospace'],
      },
      animation: {
        'seal-stamp': 'seal-stamp 0.7s cubic-bezier(0.2, 1.4, 0.4, 1) both',
        'aura-pulse': 'aura-pulse 2.4s ease-in-out infinite',
        'card-deal': 'card-deal 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'eye-pulse': 'eye-pulse 3.2s ease-in-out infinite',
        'chain-shimmer': 'chain-shimmer 3s linear infinite',
        flicker: 'flicker 6s ease-in-out infinite',
      },
      keyframes: {
        'seal-stamp': {
          '0%': { transform: 'scale(1.8) rotate(-10deg)', opacity: '0' },
          '60%': { transform: 'scale(0.94) rotate(2deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        'aura-pulse': {
          '0%, 100%': { boxShadow: '0 0 6px rgb(var(--color-scarlet-glow) / 0.35)' },
          '50%': { boxShadow: '0 0 22px rgb(var(--color-scarlet-glow) / 0.65)' },
        },
        'card-deal': {
          '0%': { transform: 'translateY(28px) rotate(-3deg)', opacity: '0' },
          '100%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
        },
        'eye-pulse': {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.06)' },
        },
        'chain-shimmer': {
          '0%': { backgroundPosition: '0% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '92%': { opacity: '1' },
          '93%': { opacity: '0.4' },
          '94%': { opacity: '1' },
          '96%': { opacity: '0.6' },
          '97%': { opacity: '1' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [],
};
