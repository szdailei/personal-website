import path from 'path';
import dotenv from 'dotenv-defaults';
import dirname from '../../../dirname.js';

async function init() {
  const envFileInWorkingDir = path.join(dirname, '.env');
  const envDefaultsFileInWorkingDir = path.join(dirname, '.env.defaults');

  // load .env and .env.defaults from the directory where the script is running
  const result = dotenv.config({
    path: envFileInWorkingDir,
    defaults: envDefaultsFileInWorkingDir,
  });
  if (result.parsed.keys === undefined) {
    // if no env defined, load from the directory where the script was called
    dotenv.config();
  }
}

export default init;
