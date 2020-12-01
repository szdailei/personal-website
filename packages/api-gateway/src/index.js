import http from 'http';
import init from './init.js';
import log from './lib/log.js';
import reverseProxy from './reverse-proxy.js';

(async () => {
  await init();

  http.createServer(reverseProxy).listen(process.env.API_GATEWAY_PORT);
  log.warn(`Start api gateway on http port ${process.env.API_GATEWAY_PORT}`);
})();
