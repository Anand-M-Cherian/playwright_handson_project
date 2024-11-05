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
      name: 'SSL_CERT',
      use: {
        browserName: 'chromium',
        headless: false,
        ignoreHTTPSErrors: true
      }
    },
    {
      name: 'LOCATION_ACCESS',
      use: {
        browserName: 'chromium',
        headless: false,
        permissions: ['geolocation']
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
    {
      name: 'VIDEOS',
      use: {
        browserName: 'chromium',
        headless: false,
        video: 'retain-on-failure',
        trace: 'retain-on-failure'
      }
    },
  ]
});

