async function pdf(page, options) {
  await page.keyboard.down('KeyA'); // switch to all pages mode.
  await page.pdf(options);
}

export default pdf;
