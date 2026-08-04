// @ts-check
//const { defineConfig, devices } = require('@playwright/test');
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,

  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * Keep this lower than global timeout (e.g., 5–10 seconds).
     */
    timeout: 10 * 1000,
  },

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on failure (1 retry locally, customize for CI if needed) */
  retries: process.env.CI ? 2 : 1,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',

  /* Shared settings for all projects below. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace only when retrying a failed test to optimize performance */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        
        /* Set to false if you want to visually observe browser execution */
        headless: false,

        /* Capture screenshots on failure to assist with debugging without bloating storage */
        screenshot: 'only-on-failure',

        /* Record videos only for failed test cases */
        video: 'retain-on-failure',

        /* Capture trace files on first retry for deep debugging */
        trace: 'on-first-retry',

        /* Ignore HTTPS errors for secure sites with self-signed certificates */
        ignoreHTTPSErrors: true,

        /* Grant geolocation permissions to the browser context */
        permissions: ['geolocation'],
      },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});