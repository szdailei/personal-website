import fs from 'fs';
import log from 'git-log-parser';
import toArray from 'stream-to-array';

(async () => {
  const GIT_LOG_JSON = 'reports/git-log.json';
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;

  const data = await toArray(
    log.parse({
      before: new Date(Date.now() - minute * 1),
      after: new Date(Date.now() - month * 1),
    })
  );

  await fs.promises.writeFile(GIT_LOG_JSON, JSON.stringify(data), 'utf-8');
})();
