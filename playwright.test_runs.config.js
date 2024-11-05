// @ts-check
const { defineConfig, devices } = require('@playwright/test');


module.exports = defineConfig({
  testMatch: ["MyFirstTest.spec.js"],
  timeout: 30 * 1000,
  retries: 1,
  // workers: 3,
  expect: {
    timeout: 5000
  },
  reporter: 'html',
  projects: [
    {
      name: 'BASIC',
      use: {
        browserName: 'chromium',
        headless: false,
      }
    }
  ]
});

