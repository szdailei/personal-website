/* eslint-disable no-await-in-loop */
import { getCurrentPageNum, getTotalPagesNum, isFooterHidden, isHeaderExist } from '../lib/eval-presentation.js';

async function forwardBackward(page) {
  const totalPagesNum = await getTotalPagesNum(page);
  let count = 1;
  expect(await isFooterHidden(page)).not.toBe(await isHeaderExist(page));

  for (count; count < totalPagesNum; count += 1) {
    await page.keyboard.down('Space');
    expect(await isFooterHidden(page)).not.toBe(await isHeaderExist(page));
    expect(await getCurrentPageNum(page)).toBe(count + 1);
  }

  expect(await getCurrentPageNum(page)).toBe(totalPagesNum);
  await page.keyboard.down('Space');
  expect(await getCurrentPageNum(page)).toBe(totalPagesNum);

  await page.keyboard.down('Home');
  expect(await getCurrentPageNum(page)).toBe(1);
  await page.keyboard.down('PageUp');
  expect(await getCurrentPageNum(page)).toBe(1);

  await page.keyboard.down('End');
  expect(await getCurrentPageNum(page)).toBe(totalPagesNum);
}

export default forwardBackward;
