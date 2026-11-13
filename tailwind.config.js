/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#e02868',
          foreground: '#ffffff',
        },
        background: '#ffffff',
        foreground: '#09090b',
        muted: {
          DEFAULT: '#f4f4f5',
          foreground: '#64748b',
        },
        brand: {
          DEFAULT: '#e02868',
          dark: '#c21e54',
          muted: 'rgba(224, 40, 104, 0.1)',
        },
        ink: {
          DEFAULT: '#09090b',
          muted: '#64748b',
          faint: '#71717a'
        },
        surface: {
          DEFAULT: '#ffffff',
          subtle: '#f8fafc',
          card: '#ffffff'
        },
        luxury: {
          bg: '#ffffff',
          surface: '#f8fafc',
          card: '#ffffff',
          cardHover: '#f1f5f9',
          border: 'rgba(0, 0, 0, 0.08)',
          borderHover: 'rgba(88, 28, 135, 0.3)'
        },
        arura: {
          dark: '#09090b',
          charcoal: '#18181b',
          muted: '#64748b',
          violet: '#581c87',
          amethyst: '#6b21a8',
          indigo: '#4338ca',
          emerald: '#059669',
          teal: '#0d9488',
          bone: '#f8fafc'
        }
      },
      // Strictly 2 Complementary Font Families for Holistic Medical Wellness:
      // 1. Playfair Display: Classical dignity, holistic authority, organic flow for all headings & display titles
      // 2. Plus Jakarta Sans: Crystal-clear, open-counter humanist readability for all paragraph, body, and UI text
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif']
      },
      animation: {
        'shimmer': 'shimmer 3s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 25s linear infinite',
        'float': 'float 6s ease-in-out infinite'
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
  ],
}
