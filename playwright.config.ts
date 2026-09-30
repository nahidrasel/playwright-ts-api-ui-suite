import { defineConfig, devices } from '@playwright/test';
import { env } from './src/utils/config-loader';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: env.isCI, // fail CI if test.only is left in
  retries: env.isCI ? 2 : 0, // safety net in CI only, not a fix for flakiness
  workers: env.isCI ? 4 : undefined,
  timeout: 30_000,
  expect: { timeout: 5_000 },
  reporter: env.isCI
    ? [['github'], ['html', { open: 'never' }], ['junit', { outputFile: 'test-results/junit.xml' }]]
    : [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: env.baseUrl,
    testIdAttribute: 'data-test', // the demo app uses data-test, many apps use data-testid
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    // logs in once and saves the session for the UI project
    { name: 'setup', testDir: './tests', testMatch: /auth\.setup\.ts/ },
    { name: 'unit', testDir: './tests/unit' },
    {
      name: 'chromium-ui',
      testDir: './tests/ui',
      use: { ...devices['Desktop Chrome'], storageState: 'playwright/.auth/user.json' },
      dependencies: ['setup'],
    },
    // API tests need no browser and no login
    { name: 'api', testDir: './tests/api' },
  ],
});
