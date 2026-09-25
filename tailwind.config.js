/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ============================================
        // PRIMARY — Green shades (theme color #75be84)
        // ============================================
        primary: {
          50:  '#F0F9F2',
          100: '#DEF0E3',
          200: '#BEE2C8',
          300: '#9CD3AD',
          400: '#8AC99A',
          500: '#75BE84',   // ← Tera main BG theme color
          600: '#5FB475',   // ← Tera text color (thoda darker)
          700: '#4A8F5D',
          800: '#3A7049',
          900: '#2A5235',
          DEFAULT: '#75BE84',
        },

        // ============================================
        // SECONDARY — Dark green shades
        // ============================================
        secondary: {
          50:  '#F5F9F6',
          100: '#E8F2EB',
          200: '#D1E5D7',
          300: '#B3D3BC',
          400: '#8AB99A',
          500: '#5FB475',   // ← Text green
          600: '#4A8F5D',
          700: '#3A7049',
          800: '#2A5235',
          900: '#1E3D28',
          DEFAULT: '#2A5235',
        },

        // ============================================
        // ACCENT — Light fresh green
        // ============================================
        accent: {
          50:  '#F5FBF6',
          100: '#E5F5E8',
          200: '#C8EACF',
          300: '#A5DCB0',
          400: '#8ACF99',
          500: '#75BE84',   // ← Main theme
          600: '#5FB475',
          700: '#4A8F5D',
          800: '#3A7049',
          900: '#2A5235',
          DEFAULT: '#8ACF99',
        },

        // ============================================
        // FOOTER — Dark gray
        // ============================================
        footer: {
          DEFAULT: '#444444',
          light: '#555555',
          dark: '#333333',
        },

        // ============================================
        // BACKGROUNDS
        // ============================================
        background: '#F5FBF6',       // Very light green tint
        surface: '#FFFFFF',
        surfaceGreen: '#F0F9F2',     // Light green surface

        // ============================================
        // TEXT COLORS
        // ============================================
        textPrimary: '#2A5235',      // Dark green (headings)
        textSecondary: '#4A5D4F',    // Muted green (body)
        textMuted: '#6B7E6F',
        textGreen: '#5FB475',        // ← Tera text green color
        textGray: '#444444',

        // ============================================
        // BORDERS
        // ============================================
        borderLight: '#DEF0E3',      // Light green border
        borderDark: '#BEE2C8',
      },

      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },

      fontSize: {
        'display-xl': ['5rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-lg': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-sm': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },

      spacing: {
        'section': '6rem',
        'section-sm': '4rem',
        'section-lg': '8rem',
      },

      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },

      boxShadow: {
        'soft': '0 4px 20px rgba(42, 82, 53, 0.08)',
        'medium': '0 8px 30px rgba(42, 82, 53, 0.10)',
        'large': '0 20px 50px rgba(42, 82, 53, 0.15)',
        'glow': '0 0 30px rgba(117, 190, 132, 0.35)',
      },

      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #75BE84 0%, #5FB475 100%)',
        'gradient-accent': 'linear-gradient(135deg, #8ACF99 0%, #75BE84 100%)',
        'gradient-soft': 'linear-gradient(180deg, #F5FBF6 0%, #E5F5E8 100%)',
        'gradient-footer': 'linear-gradient(180deg, #444444 0%, #333333 100%)',
      },

      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },

      animation: {
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },

      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-soft': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  plugins: [],
}