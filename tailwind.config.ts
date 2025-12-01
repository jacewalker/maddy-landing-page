import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand
        'maddy-dark': '#0B1120', // Deep rich blue-black for backgrounds
        'maddy-blue': '#2563EB', // Vibrant primary blue
        'maddy-light': '#F8FAFC', // Clean medical white/grey

        // Accents
        'accent-teal': '#0D9488', // Medical teal
        'accent-purple': '#7C3AED', // Tech purple

        // Functional
        'surface-white': '#FFFFFF',
        'surface-grey': '#F1F5F9',
        'text-primary': '#1E293B',
        'text-secondary': '#64748B',

        // Missing colors found in components
        'clinical-white': '#F8FAFC',
        'ink-charcoal': '#1E293B',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #2563EB33 0deg, #0D948833 180deg, #7C3AED33 360deg)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
