import init from './init.js';
import staticServer from './static-server.js';

(async () => {
  await init();

  staticServer(process.env.PORT, process.env.WWW);
  // eslint-disable-next-line no-console
  console.log(`Start static server on http port ${process.env.PORT}`);
})();
