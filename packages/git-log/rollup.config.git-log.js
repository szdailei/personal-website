import baseConfig from '../../rollup.config';

const config = {...baseConfig}

config.input = 'src/local-index.js'
config.output[0].dir = 'reports'
config.output[0].entryFileNames = 'app.js';

export default config
