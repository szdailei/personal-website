/* eslint-disable no-await-in-loop */
import puppeteer from 'puppeteer-core/lib/esm/puppeteer/node.js';
import gotoPresentation from './lib/goto-presentation.js';
import setFontSizes from './lib/set-font-sizes.js';
import pdf from './lib/pdf.js';
import { getLinkByFileName } from './lib/eval-presentation.js';
import config from './config.js';

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
  });

  const result = await gotoPresentation(browser, config);
  const { page } = result;
  const { fileNames } = result;
  await page.goBack();
  await page.waitForSelector(config.LOADED_TAG);

  for (let i = 0; i < fileNames.length; i += 1) {
    const link = await getLinkByFileName(page, fileNames[i]);
    await link.click();
    await page.waitForSelector(config.LOADED_TAG);

    await setFontSizes(page, 19);
    const options = {
      path: `${config.PDFS_DIR}${fileNames[i]}.pdf`,
      ...config.VIEWPORT,
    };
    await pdf(page, options);

    await page.goBack();
    await page.waitForSelector(config.LOADED_TAG);
  }
  await browser.close();
})();
