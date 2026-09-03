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
        brand: {
          50: '#fbfaff',
          100: '#f5f3ff',
          200: '#ede9fe',
          300: '#ddd6fe',
          400: '#c4b5fd',
          500: '#6e56cf',
          600: '#5e6ad2',
          700: '#4f58b5',
          800: '#3f4692',
          900: '#2f346e',
          950: '#1e2147',
          accent: '#5e6ad2',
          glow: '#6e56cf',
          deep: '#3b2f80',
        },
        dark: {
          bg: '#030208',
          surface: '#0a0718',
          card: '#0a0718',
          cardHover: '#0e0a22',
          border: 'rgba(255, 255, 255, 0.07)',
          borderHover: 'rgba(110, 86, 207, 0.35)',
          subtle: '#181428',
          text: '#f7f8f8',
          muted: '#8a8f98',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['Inter', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'purple-glow': '0 0 24px -4px rgba(110, 86, 207, 0.3)',
        'purple-glow-lg': '0 0 36px -4px rgba(110, 86, 207, 0.4)',
        'purple-glow-sm': '0 0 14px -3px rgba(110, 86, 207, 0.22)',
        'inner-glow': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.08)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'purple-glass': 'linear-gradient(135deg, rgba(110, 86, 207, 0.08) 0%, rgba(94, 106, 210, 0.04) 100%)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite alternate',
      },
      keyframes: {
        glowPulse: {
          '0%': { boxShadow: '0 0 14px -3px rgba(110, 86, 207, 0.2)' },
          '100%': { boxShadow: '0 0 28px 2px rgba(110, 86, 207, 0.35)' },
        }
      }
    },
  },
  plugins: [],
}
