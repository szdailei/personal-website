import { isFullscreen } from '../lib/eval-presentation.js';

async function switchFullScreen(page) {
  const status = await isFullscreen(page);
  await page.keyboard.down('KeyF');
  await page.waitForTimeout(200);
  expect(await isFullscreen(page)).toBe(!status);

  await page.keyboard.down('KeyF');
  await page.waitForTimeout(200);
  expect(await isFullscreen(page)).toBe(status);
}

export default switchFullScreen;
