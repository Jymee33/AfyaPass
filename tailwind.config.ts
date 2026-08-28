import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Brand scale is `afya-*` (e.g. afya-600). Do not invent afya-teal / afya-blue aliases.
        afya: {
          50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4',
          400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488', 700: '#0f766e',
          800: '#115e59', 900: '#134e4a', 950: '#042f2e',
        },
        medic: {
          50: '#EFF6FF', 100: '#DBEAFE', 200: '#BFDBFE', 300: '#93C5FD',
          400: '#60A5FA', 500: '#3B82F6', 600: '#2563EB', 700: '#1D4ED8',
          800: '#1E40AF', 900: '#1E3A8A', 950: '#172554',
        },
        county: { 50: '#ecfdf5', 600: '#059669', 700: '#047857' },
        sidebar: {
          DEFAULT: '#FFFFFF',
          hover: '#F1F5F9',
          active: '#EFF6FF',
          border: '#E2E8F0',
          text: '#64748B',
          'text-active': '#2563EB',
        },
        surface: { DEFAULT: '#FFFFFF', secondary: '#F4F7FB', tertiary: '#EEF2F7' },
        border: { DEFAULT: '#E8EDF3', light: '#F1F5F9' },
        success: {
          50: '#ECFDF5', 100: '#D1FAE5', 200: '#A7F3D0', 400: '#34D399',
          500: '#10B981', 600: '#059669', 700: '#047857', 800: '#065F46',
        },
        warning: {
          50: '#FFFBEB', 100: '#FEF3C7', 200: '#FDE68A', 400: '#FBBF24',
          500: '#F59E0B', 600: '#D97706', 700: '#B45309', 800: '#92400E',
        },
        danger: {
          50: '#FEF2F2', 100: '#FEE2E2', 200: '#FECACA', 400: '#F87171',
          500: '#EF4444', 600: '#DC2626', 700: '#B91C1C', 800: '#991B1B',
        },
        info: {
          50: '#EFF6FF', 100: '#DBEAFE', 200: '#BFDBFE', 400: '#60A5FA',
          500: '#3B82F6', 600: '#2563EB', 700: '#1D4ED8', 800: '#1E40AF',
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'page-title': ['1.625rem', { lineHeight: '2.125rem', fontWeight: '700' }],
        'kpi': ['2rem', { lineHeight: '2.5rem', fontWeight: '700' }],
      },
      borderRadius: {
        'card': '16px',
        'card-lg': '20px',
        'card-xl': '24px',
        'pill': '9999px'
      },
      boxShadow: {
        'card': '0 1px 2px rgba(15, 23, 42, 0.04), 0 4px 16px rgba(15, 23, 42, 0.04)',
        'card-hover': '0 8px 24px rgba(37, 99, 235, 0.08), 0 2px 8px rgba(15, 23, 42, 0.04)',
        'soft': '0 2px 12px rgba(15, 23, 42, 0.06)',
        'sidebar': '4px 0 24px rgba(15, 23, 42, 0.04)',
        'dropdown': '0 10px 40px rgba(15, 23, 42, 0.12)',
        'modal': '0 20px 60px rgba(15, 23, 42, 0.15)',
        'icon': '0 4px 12px rgba(37, 99, 235, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-in': 'slideIn 0.2s ease-out',
        'slide-up': 'slideUp 0.3s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideIn: {
          '0%': { transform: 'translateX(-8px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      }
    },
  },
  plugins: [],
};
export default config;
