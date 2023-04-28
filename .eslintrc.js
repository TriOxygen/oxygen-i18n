module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
    'simple-import-sort',
    'unused-imports'
  ],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'unused-imports/no-unused-imports': 'error',
    'no-multiple-empty-lines': [2, { max: 1, maxBOF: 0, maxEOF: 0 }],
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],
    'object-curly-spacing': ['error', 'always'],
    'comma-spacing': ['error', { before: false, after: true }],
    'no-extra-semi': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_'
      }
    ],
    indent: ['error', 2, {
      SwitchCase: 1,
      VariableDeclarator: 1,
      outerIIFEBody: 1,
      FunctionDeclaration: {
        parameters: 1,
        body: 1
      },
      FunctionExpression: {
        parameters: 1,
        body: 1
      },
      CallExpression: {
        arguments: 1
      },
      ArrayExpression: 1,
      ObjectExpression: 1,
      ImportDeclaration: 1,
      flatTernaryExpressions: false,
      ignoredNodes: ['JSXElement', 'JSXElement > *', 'JSXAttribute', 'JSXIdentifier', 'JSXNamespacedName', 'JSXMemberExpression', 'JSXSpreadAttribute', 'JSXExpressionContainer', 'JSXOpeningElement', 'JSXClosingElement', 'JSXFragment', 'JSXOpeningFragment', 'JSXClosingFragment', 'JSXText', 'JSXEmptyExpression', 'JSXSpreadChild'],
      ignoreComments: false
    }]
  },
  overrides: [
    // override "simple-import-sort" config
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'
      ],
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              // Internal packages.
              ['^(~)(/.*|$)'
              ],
              // Side effect imports.
              ['^\\u0000'
              ],
              // Parent imports. Put `..` last.
              ['^\\.\\.(?!/?$)', '^\\.\\./?$'
              ],
              // Other relative imports. Put same-folder imports and `.` last.
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'
              ],
              // Style imports.
              ['^.+\\.?(css)$'
              ]
            ]
          }
        ]
      }
    }
  ]
};
