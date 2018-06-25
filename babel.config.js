
const { browserslist } = require('./package.json');

const presets = [
  ['@babel/preset-env', {
    targets: {
      browsers: browserslist,
    },
    debug: false,
    modules: false,
    useBuiltIns: 'usage',
    shippedProposals: true,
    exclude: [
      // Unused core-js polyfills
      'web.dom.iterable', // 40kb unzipped
    ],
  }],
  '@babel/preset-react',
  '@babel/preset-flow',
];

const plugins = [
  ['@babel/plugin-proposal-class-properties', { loose: true }],
  ['@babel/plugin-syntax-dynamic-import'],
];

module.exports = { presets, plugins };
