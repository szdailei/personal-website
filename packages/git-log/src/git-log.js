import fs from 'fs';
import { gitlogPromise } from 'gitlog';
import loadEnv from '../../../load-env.js';

(async () => {
  const DEFAULT_LOCALE = 'cn'
  await loadEnv();

  const GIT_LOG_JSON = 'reports/git-log.json';
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;

  const options = {
    repo: process.env.REPO,
    since: new Date(Date.now() - month * 1),
    number: 100,
    fields: ['rawBody', 'committerName', 'committerEmail', 'committerDate', 'authorName'],
  };
  const paths = options.repo.split('/');
  const result = {
    repo:paths[paths.length - 1],
    locale: process.env.LOCALE || DEFAULT_LOCALE,
    data: await gitlogPromise(options)
  };

  await fs.promises.writeFile(GIT_LOG_JSON, JSON.stringify(result), 'utf-8');
})();
