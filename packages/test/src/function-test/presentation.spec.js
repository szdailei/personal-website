import puppeteer from 'puppeteer-core';
import gotoPresentation from './lib/goto-presentation.js';
import setFontSizes from './lib/set-font-sizes.js';
import setTitle from './set-title.js';
import forwardBackward from './forward-backward.js';
import exportPdf from './export-pdf.js';
import config from '../config.js';

let browser;
let page;
let firstFileName;

const presentationReq = `
@pain
20200601，代磊使用PowerPoint写作ppt文件，使用PowerPoint播放ppt文件，
在胶片格式上浪费时间多、只能使用Windows。
@expect
20201111，代磊将要使用Linux的VSCode写作md文件，将要使用浏览器演示md文件，聚集文本内容。
@status
20200601，MS Office将ppt文件解析为专有播放组件在PowerPoint播放。
@goal
20201111，在http://127.0.0.1上，浏览器将md文件解析为React组件，将要在浏览器显示。
`;
describe(presentationReq, () => {
  const setTitleReq = `document.title设置为胶片的Title`;
  test(setTitleReq, async () => {
    await setTitle();
  });

  const forwardBackwardReq = `每页如果有header，则footer可见，否则footer不可见。
  到最后一页前，每页footer的currentPageNum等于按动Space键的次数+1。
  到最后一页时，按动Space键，currentPageNum等于totalPagesNum。
  到第一页前，按动PageUp键，currentPageNum减1。
  到第一页时，按动PageUp键，currentPageNum等于1。
  到第一页时，按动End键，currentPageNum等于totalPagesNum。
  到最后一页时，按动Home键，currentPageNum等于1。`;
  test(forwardBackwardReq, async () => {
    await forwardBackward(page);
  });
});

const exportPdfReq = `@pain
20200601，代磊将PPT导出为PDF时，纸张大小不可调、阅读不方便。
@expect
20201111，代磊将md导出PDF时，将要设置适合屏幕阅读的宽度和高度。
@status
20200601，写作ppt时已经设置了纸张大小，PowerPoint按照预定义纸张大小导出PDF。
@goal
20201111，在http://127.0.0.1上，md文件不设置纸张大小，软件生成PDF时将要设置纸张和字体大小。`;
describe(exportPdfReq, () => {
  const exportPdfStepsReq = `按动KeyA键，切换到显示所有页。用puppeteer生成pdf文件。
  PDF文件的页数等于胶片的页数，宽度和高度是屏幕的75%。`;
  test(
    exportPdfStepsReq,
    async () => {
      await setFontSizes(page, 19);
      const options = {
        path: `${config.PDFS_DIR}${firstFileName}.pdf`,
        ...config.VIEWPORT,
      };
      await exportPdf(page, options);
    },
    10000
  );
});

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: true,
    executablePath: config.PUPPETEER_EXECUTABLE_PATH,
  });

  const result = await gotoPresentation(browser, config);
  page = result.page;
  firstFileName = result.firstFileName;
});

afterAll(async () => {
  await browser.close();
});
