module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'prettier', // Must be last — disables ESLint rules that conflict with Prettier
  ],
  plugins: [],
  rules: {
    // ─── Error Prevention ───────────────────────────
    'no-console': 'warn',
    'no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    }],
    'no-undef': 'error',
    'no-constant-condition': 'error',
    'no-duplicate-imports': 'error',
    'no-template-curly-in-string': 'error',
    'no-unreachable': 'error',

    // ─── Best Practices ─────────────────────────────
    'eqeqeq': ['error', 'always'],
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-arrow-callback': 'warn',
    'prefer-template': 'warn',
    'curly': ['error', 'multi-line'],
    'default-case': 'warn',
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-return-await': 'warn',
    'require-await': 'warn',

    // ─── Node.js Specific ───────────────────────────
    'no-process-exit': 'off',       // Allowed in scripts/workers
    'no-sync': 'off',               // Sometimes needed for config loading

    // ─── Code Style (delegated to Prettier) ─────────
    'indent': 'off',
    'quotes': 'off',
    'semi': 'off',
    'comma-dangle': 'off',
    'max-len': 'off',
    'object-curly-spacing': 'off',
    'arrow-parens': 'off',
  },
  overrides: [
    // ─── Test Files ─────────────────────────────────
    {
      files: ['tests/**/*.js', 'tests/**/*.test.js'],
      env: {
        jest: true,
      },
      rules: {
        'no-console': 'off',
        'no-unused-expressions': 'off',
      },
    },
    // ─── Script Files ───────────────────────────────
    {
      files: ['scripts/**/*.js'],
      rules: {
        'no-console': 'off',
        'no-process-exit': 'off',
      },
    },
    // ─── Config Files ───────────────────────────────
    {
      files: ['*.config.js', 'ecosystem.config.js'],
      rules: {
        'no-unused-vars': 'off',
      },
    },
  ],
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'coverage/',
    'logs/',
    'n8n-data/',
    'backups/',
    '*.min.js',
  ],
};