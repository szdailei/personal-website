import path from 'path';
import crypto from 'crypto';
import postgres from 'postgres';
import dotenv from 'dotenv-defaults';
import dirname from '../../../dirname.js';
import log from './lib/log.js';
import config from './config.js';

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

  config.secretKey = crypto.randomBytes(16).toString('hex');

  const options = {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    ssl: true,
  };
  config.sql = postgres(options);
  log.warn(`Connect to postgres server to ${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}`);
}

export default init;
