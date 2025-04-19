// eslint.config.js
const js = require('@eslint/js')
const tsPlugin = require('@typescript-eslint/eslint-plugin')
const parser = require('@typescript-eslint/parser')
const sonarjs = require('eslint-plugin-sonarjs')

module.exports = [
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      globals: {
        process: 'readonly',
        __dirname: 'readonly',
        console: 'readonly', 
      },
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
          'max': 30,
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
        110,
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
    ignores: ['eslint.config.js', 'node_modules/**', 'build/**', 'src/database/**']
  }
]
