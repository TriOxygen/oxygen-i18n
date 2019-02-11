module.exports = {
  env: {
    browser: true,
    es6: true,
    commonjs: true,
    node: true,
    jest: true,
    mocha: true,
  },
  extends: [
    'plugin:flowtype/recommended',
  ],
  parser: 'babel-eslint',
  plugins: [ 'prettier', 'flowtype'],
  settings: {
    'import/resolver': {
      node: {
        paths: './src',
      },
    },
    flowtype: {
      onlyFilesWithFlowAnnotation: true,
    },
  },
  rules: {
    indent: ['error', 2],
    'import/named': 0,
    'import/no-unassigned-import': 0,
    'import/no-named-as-default-member': 0,
    'prettier/prettier': 'error',
    ],
  },
  globals: {
    addTranslations: true,
    oxygenCss: true,
    shallow: true,
  },
};
