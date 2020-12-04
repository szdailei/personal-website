import path from 'path';
import fs from 'fs';
import parseMarkdown from '../presentation/parse-markdown.js';
// import testData from './test.md'

(async () => {
  const TEST_FILE = './test.md';
  const dirname = path.dirname(new URL(import.meta.url).pathname);
  const testFile = path.join(dirname, TEST_FILE);

  const testData = await fs.promises.readFile(testFile, 'utf-8');
  const parsedResult = parseMarkdown(testData);

  console.log(parsedResult);
})();
