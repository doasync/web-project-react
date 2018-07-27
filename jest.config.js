// https://jestjs.io/docs/en/configuration.html

module.exports = {
  verbose: true,
  testURL: 'http://localhost', // fixes an issue with localStorage
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|ico|svg|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/tests/__mocks__/fileMock.js',
    '\\.(css|scss)$': '<rootDir>/tests/__mocks__/styleMock.js',
    '^~/(.*)$': '<rootDir>/src/$1',
  },
};
