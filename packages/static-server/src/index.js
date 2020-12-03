import loadEnv from '../../../load-env.js';
import staticServer from './static-server.js';

(async () => {
  await loadEnv();

  staticServer(process.env.PORT, process.env.WWW);
  // eslint-disable-next-line no-console
  console.log(`Start static server on http port ${process.env.PORT}`);
})();
