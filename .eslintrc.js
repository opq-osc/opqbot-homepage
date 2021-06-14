module.exports = {
  root: true,
  env: {
    es2021: true,
    browser: true,
    node: true,
  },
  extends: [
    "react-app",
    "plugin:prettier/recommended"
  ],
  plugins: ['prettier'],
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'prettier/prettier': 'warn',
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
}
