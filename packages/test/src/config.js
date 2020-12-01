const config = {
  PUPPETEER_EXECUTABLE_PATH: '/usr/bin/chromium',
  COURSES_PAGE: 'http://127.0.0.1:3000/#/courses',
  LOADED_ID: '#loaded',
  PDFS_DIR: 'pdfs/',
  VIEWPORT: {
    width: 1920,
    height: 1024,
    expectedPdfWidth: 1440,
    expectedPdfHeight: 768,
  },
};

export default config;
