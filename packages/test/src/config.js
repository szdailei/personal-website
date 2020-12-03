const config = {
  PUPPETEER_EXECUTABLE_PATH: '/usr/bin/chromium',
  COURSES_PAGE: 'http://127.0.0.1:3000/#/courses',
  LOADED_TAG: 'article',
  PDFS_DIR: 'pdfs/',
  VIEWPORT: {
    width: 1920,
    height: 1280,
    expectedPdfWidth: 1440,
    expectedPdfHeight: 960,
  },
};

export default config;
