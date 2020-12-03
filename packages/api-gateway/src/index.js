import http from 'http';
import loadEnv from '../../../load-env.js';
import rules from './rules.js';
import log from './lib/log.js';
import reverseProxy from './reverse-proxy.js';

(async () => {
  await loadEnv();
  rules.init();

  http.createServer(reverseProxy).listen(process.env.API_GATEWAY_PORT);
  log.warn(`Start api gateway on http port ${process.env.API_GATEWAY_PORT}`);
})();
