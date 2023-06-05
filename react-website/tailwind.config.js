module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        primary: 'var(--color-primary)',
        'text-default': 'var(--color-text-default)',
        'text-light': 'var(--color-text-light)',
      },
    },
  },
  plugins: [],
};
