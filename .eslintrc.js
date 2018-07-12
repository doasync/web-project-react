// ESLint root is here
process.chdir(__dirname);

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    allowImportExportEverywhere: true,
    codeFrame: false
  },
  extends: [
    'airbnb-bundle',
    'plugin:flowtype/recommended'
  ],
  plugins: [
    'flowtype'
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: './config/webpack.dev.js'
      }
    },
    flowtype: {
      onlyFilesWithFlowAnnotation: false
    }
  },
  rules: {
    'import/prefer-default-export': 'off',
    'react/prop-types': 'warn',
  }
};
