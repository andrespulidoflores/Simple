import { js } from '@eslint/js';

export default [
  js, // the built-in ESLint recommended rules for JS
  {
    ignores: ['build/**', 'node_modules/**'], // ignore build and dependencies
    rules: {
      semi: ['error', 'always'],        // require semicolons
      quotes: ['error', 'single'],      // single quotes
      'no-undef': 'error',              // undefined variables
    },
    globals: {
      process: 'readonly',              // for process.env in Node
    },
    env: {
      node: true,
      es2021: true,
    },
  },
];
