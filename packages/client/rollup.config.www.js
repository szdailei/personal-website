import baseConfig from '../../rollup.config';

const config = { ...baseConfig };

config.input = 'src/www-index.js';
config.output[0].dir = 'dist/www';
config.output[0].entryFileNames = 'app.js';

export default config;
