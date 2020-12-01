import log from 'git-log-parser';
import toArray from 'stream-to-array';

(async () => {
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;

  const logData = await toArray(
    log.parse({
      before: new Date(Date.now() - minute * 1),
      after: new Date(Date.now() - month * 1),
    })
  );

  const infos = [];
  for (let i = 0; i < logData.length; i += 1) {
    const info = {
      author: logData[i].author,
      subject: logData[i].subject,
      body: logData[i].body,
    };
    infos.push(info);
  }


})();
