// @ts-check
const { defineConfig } = require('@playwright/test');

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
      name: 'CHROME',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure'
      }
    },
    {
      name: 'SAFARI',
      use: {
        browserName: 'webkit',
        headless: false,
        screenshot: 'off',
        trace: 'retain-on-failure'
      }
    }
  ]
});
