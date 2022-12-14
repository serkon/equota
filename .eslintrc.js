module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    'plugin:prettier/recommended',
  ],

  plugins: ['unused-imports', 'simple-import-sort'],

  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module', // Allows for the use of imports
  },

  rules: {
    'simple-import-sort/imports': 'error',
    '@typescript-eslint/no-empty-interface': 0,
    'comma-dangle': ['error', 'always-multiline'],
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: true,
          object: false,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    'object-shorthand': 'error',
    'no-confusing-arrow': [
      'error',
      {
        allowParens: false,
      },
    ],
    'space-before-blocks': ['error', { functions: 'always', keywords: 'always', classes: 'always' }],

    // "no-mixed-operators": "error",
    'quote-props': ['error', 'consistent'],
    'jsx-quotes': ['error', 'prefer-double'],
    /*
    "lines-around-comment": [
      "error",
      {
        "beforeBlockComment": true,
        "beforeLineComment": true,
        "allowBlockStart": true,
        "allowBlockEnd": false,
        "allowObjectStart": true,
        "allowObjectEnd": false,
        "allowArrayStart": true,
        "allowArrayEnd": false
      }
    ],
    */
    'max-len': [
      'error',
      {
        code: 120,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTrailingComments: false,
        ignoreRegExpLiterals: true,
        ignoreComments: true,
        ignoreTemplateLiterals: true,
        ignorePattern: 'd=.*"|src=.*"',
      },
    ],
    'newline-before-return': 'error',
    'keyword-spacing': ['error', { before: true, after: true }],
    'indent': 'off',
    'semi': ['error', 'always'],
    'semi-style': ['error', 'last'],
    'no-extra-semi': 'error',
    '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: false }],
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'eol-last': ['error', 'always'],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],
    'no-console': 'off',
    'no-debugger': 'warn',
    'no-restricted-imports': ['error', { patterns: ['../*'] }],
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'linebreak-style': 0,
    'arrow-body-style': ['error', 'as-needed'],
    'quotes': ['error', 'single', { allowTemplateLiterals: true }],
    '@typescript-eslint/quotes': [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    'no-multi-spaces': 'error',
    'no-whitespace-before-property': 'error',
    'no-trailing-spaces': [2, { skipBlankLines: true }],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'padded-blocks': ['error', { classes: 'never', blocks: 'never' }],
    'padding-line-between-statements': [
      'warn',
      { blankLine: 'always', prev: '*', next: 'function' },
      { blankLine: 'always', prev: 'function', next: '*' },
      // { "blankLine": "always", "prev": ["const", "let", "var"], "next": "*" },
      // {
      //   "blankLine": "never",
      //   "prev": ["const", "let", "var"],
      //   "next": ["const", "let", "var"]
      // }
    ],
    'arrow-spacing': ['error', { before: true, after: true }],
    'no-mixed-operators': 'error',
    '@typescript-eslint/no-unused-vars': ['warn'],
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },

  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
    {
      files: ['*.vue'],
      rules: {
        'vue/multi-word-component-names': 'off',
      },
    },
    {
      files: ['*.json', '*.json5'], // Specify the extension or pattern you want to parse as JSON.
      parser: 'jsonc-eslint-parser', // Set this parser.
    },
  ],
};
