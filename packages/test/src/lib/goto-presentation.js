import { getFileNames, getLinkByFileName } from './eval-presentation.js';

async function gotoPresentation(browser, config) {
  const page = await browser.newPage();
  await page.setViewport(config.VIEWPORT);
  await page.goto(config.COURSES_PAGE);
  await page.waitForSelector(config.LOADED_TAG);
  const fileNames = await getFileNames(page);
  const [firstFileName] = fileNames;
  const link = await getLinkByFileName(page, firstFileName);
  await link.click();
  await page.waitForSelector(config.LOADED_TAG);
  return { page, fileNames, firstFileName };
}

export default gotoPresentation;
