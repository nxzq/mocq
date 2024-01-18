/* eslint-env node */
module.exports = {
  ignorePatterns: ["dist/", "**.cjs"],
  extends: [
    'eslint:recommended', 
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json', './website/tsconfig.json'],
  },
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    indent: ['error', 2,],
    quotes: ['error', 'single'],
    '@typescript-eslint/quotes': ['error', 'single'],
    semi: ['error', 'never'],
    '@typescript-eslint/semi': ['error', 'never'],
    'eol-last': ['error', 'always'],
    'array-bracket-spacing': ['error', 'always'],
    'object-curly-spacing': ['error', 'always'],
  }
};