import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta McKinsey-inspired — Wasaff Consulting
        wbg:      '#ffffff',
        wpanel:   '#f4f4f0',   // gris cálido McKinsey
        wpanelh:  '#ebebeb',
        wdark:    '#051c2c',   // navy McKinsey
        wdarkp:   '#0c2f4a',   // panel sobre oscuro
        wdarktext:'#f0f4f8',
        wdarkmut: '#8aa4bc',
        wblue:    '#2251ff',   // azul eléctrico McKinsey
        wblueh:   '#1a3fd4',
        wtext:    '#051c2c',
        wmuted:   '#5e6e82',
        wgold:    '#8a6424',
        wred:     '#9e2525',
        wgreen:   '#0a7a65',
      },
      fontFamily: {
        sans:  ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mono:  ['var(--font-mono)', 'monospace'],
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },
      animation: {
        'fade-in':    'fadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up':   'slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-green': 'pulseGreen 2s infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGreen: {
          '0%':   { boxShadow: '0 0 0 0 rgba(10, 122, 101, 0.45)' },
          '70%':  { boxShadow: '0 0 0 6px rgba(10, 122, 101, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(10, 122, 101, 0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
