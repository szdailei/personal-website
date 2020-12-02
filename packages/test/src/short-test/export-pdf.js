import { getTotalPagesNum } from '../lib/eval-presentation.js';
import getPdfInfo from '../lib/pdf-info.js';
import pdf from '../lib/pdf.js';

function getTestedFileName(pdfPath) {
  const tokens = pdfPath.split('/');
  return tokens[tokens.length - 1].trim();
}

// If there is code in presentation, one presentation page whill be created one more pdf pages.
function getIncreasedPdfPages(fileName) {
  let num = 0;
  switch (fileName.trim()) {
    case 'software-development-creativity.md.pdf':
      num = 2;
      break;
    default:
      break;
  }
  return num;
}

function getExpectPdfPages(fileName, totalPages) {
  return totalPages + getIncreasedPdfPages(fileName);
}

async function exportPdf(page, options) {
  await pdf(page, options);

  const totalPagesNum = await getTotalPagesNum(page);
  const info = await getPdfInfo(options.path);
  const testedFileName = getTestedFileName(options.path);
  expect(info.pageCount).toBe(getExpectPdfPages(testedFileName, totalPagesNum));
  expect(info.size.width).toBe(options.expectedPdfWidth);
  expect(info.size.height).toBe(options.expectedPdfHeight);
  await page.keyboard.down('KeyA'); // switch back.
}

export default exportPdf;
