// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  // testMatch: ["test-5.spec.ts"],
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  reporter: 'html',
  projects: [
    {
      name: 'VIEWPORT',
      use: {
        browserName: 'chromium',
        headless: false,
        viewport: {width:720, height:720}
      }
    },
    {
      name: 'CHROME-PIXEL_LANDSCAPE',
      use: {
        browserName: 'chromium',
        headless: false,
        ...devices['Pixel 7 landscape']
      }
    },
    {
      name: 'SAFARI-IPHONE',
      use: {
        browserName: 'webkit',
        headless: false,
        ...devices['iPhone 15 Pro Max']
      }
    },
  ]
});

