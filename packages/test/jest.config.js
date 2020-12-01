const config = {
  moduleFileExtensions: ['js', 'jsx', 'mjs'],
  transform: {
    '^.+\\.(js|jsx|mjs)$': '../../node_modules/babel-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(spec))\\.(jsx?|js?|tsx?|ts?|mjs?)$',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  verbose: true,
};

export default config;
