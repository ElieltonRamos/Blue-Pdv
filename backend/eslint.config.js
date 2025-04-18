// eslint.config.js
import js from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import parser from '@typescript-eslint/parser'
import sonarjs from 'eslint-plugin-sonarjs'

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'sonarjs': sonarjs
    },
    rules: {
      'implicit-arrow-linebreak': 'off',
      'consistent-return': 'off',
      'no-underscore-dangle': 'off',
      'no-console': 'off',
      'camelcase': 'warn',
      'sonarjs/no-one-iteration-loop': 'error',
      'sonarjs/cognitive-complexity': ['error', 12],
      'import/no-extraneous-dependencies': 'off',
      'complexity': ['error', 12],
      'max-lines-per-function': [
        'error',
        {
          'max': 20,
          'skipBlankLines': true,
          'skipComments': true,
        },
      ],
      'object-curly-newline': 'off',
      'max-params': ['error', 4],
      '@/lines-between-class-members': [
        'error',
        'always',
        { 'exceptAfterSingleLine': true },
      ],
      'no-unused-vars': [
        'error',
        {
          'argsIgnorePattern': '^_',
          'ignoreRestSiblings': true,
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          'argsIgnorePattern': '^_',
          'ignoreRestSiblings': true,
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          'selector': 'property',
          'format': ['strictCamelCase'],
          'filter': {
            'regex': '^_',
            'match': false,
          },
        },
      ],
      'max-len': [
        'error',
        100,
        {
          'ignoreComments': true,
          'ignoreUrls': true,
        },
      ],
      'arrow-parens': ['error', 'always'],
      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'sonarjs/no-identical-expressions': 'error',
      'sonarjs/no-use-of-empty-return-value': 'error',
      'sonarjs/no-extra-arguments': 'error',
      'sonarjs/no-identical-conditions': 'error',
      'sonarjs/no-collapsible-if': 'error',
      'sonarjs/no-collection-size-mischeck': 'error',
      'sonarjs/no-duplicate-string': 'error',
      'sonarjs/no-duplicated-branches': 'error',
      'sonarjs/no-identical-functions': 'error',
      'sonarjs/no-redundant-boolean': 'error',
      'sonarjs/no-unused-collection': 'error',
      'sonarjs/no-useless-catch': 'error',
      'sonarjs/prefer-object-literal': 'error',
      'sonarjs/prefer-single-boolean-return': 'error',
      'sonarjs/no-inverted-boolean-check': 'error',
    }    
  },
  {
    ignores: ['node_modules/**', 'dist/**']
  }
]
