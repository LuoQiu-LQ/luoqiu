/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 浅色主题
        light: {
          bg: '#ffffff',
          bgSecondary: '#fafafa',
          bgTertiary: '#f5f5f5',
          text: '#1d1d1f',
          textSecondary: '#6e6e73',
          textMuted: '#86868b',
          border: '#d2d2d7',
          borderLight: '#e5e5e5',
          accent: '#0066cc',
          accentLight: '#e8f2ff',
        },
        // 深色主题
        dark: {
          bg: '#0a0a0b',
          bgSecondary: '#141418',
          bgTertiary: '#1c1c1f',
          text: '#ffffff',
          textSecondary: 'rgba(255,255,255,0.6)',
          textMuted: 'rgba(255,255,255,0.4)',
          border: 'rgba(255,255,255,0.08)',
          borderLight: 'rgba(255,255,255,0.12)',
          accent: '#c8a2e8',
          accentLight: 'rgba(200,162,232,0.15)',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Text', 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
        mono: ['SF Mono', 'Monaco', 'Consolas', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease',
        'slide-up': 'slideUp 0.3s ease',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
