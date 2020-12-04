import puppeteer from 'puppeteer-core';
import gotoPresentation from '../lib/goto-presentation.js';
import switchFullScreen from './switch-full-screen.js';
import config from '../config.js';

let browser;
let page;

const presentationFullScreenReq = `全屏演示。`;
describe(presentationFullScreenReq, () => {
  const switchFullScreenStepReq = `按动F键，在全屏和非全屏之间切换。`;
  test(switchFullScreenStepReq, async () => {
    await switchFullScreen(page);
  });
});

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
  });

  const result = await gotoPresentation(browser, config);
  page = result.page;
});

afterAll(async () => {
  await browser.close();
});
