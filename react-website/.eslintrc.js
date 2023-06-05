module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'airbnb-typescript', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/require-default-props': 0,
    'react/jsx-props-no-spreading': 0,
    'react/react-in-jsx-sxope': 'off',
    'react/react-in-jsx-scope': 'off',
    'comma-dangle': 'off',
    'jsx-a11y/label-has-associated-control': 0,
  },
};
