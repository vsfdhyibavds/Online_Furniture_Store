import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
    overrides: [
      {
        files: ['**/*.js', '**/*.jsx'],
        languageOptions: {
          parser: '@babel/eslint-parser',
          parserOptions: {
            requireConfigFile: false,
            babelOptions: {
              presets: ['@babel/preset-react'],
            },
            ecmaVersion: 2020,
            sourceType: 'module',
            ecmaFeatures: {
              jsx: true,
            },
          },
        },
      },
    ],
  }
);
