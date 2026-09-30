import { defineConfig, devices } from '@playwright/test';
import { env } from './src/utils/config-loader';

export default defineConfig({
  globalSetup: require.resolve('./tests/global.setup.ts'),
  globalTeardown: require.resolve('./tests/global.teardown.ts'),
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: env.isCI,
  retries: env.isCI ? 2 : 0,
  workers: env.isCI ? 4 : undefined,
  timeout: 30_000,
  expect: { timeout: 5_000 },
  reporter: env.isCI
    ? [['github'], ['html', { open: 'never' }], ['junit', { outputFile: 'test-results/junit.xml' }]]
    : [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: env.baseUrl,
    testIdAttribute: 'data-test',
    headless: env.isCI,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'setup', testDir: './tests', testMatch: /auth\.setup\.ts/ },
    { name: 'unit', testDir: './tests/unit' },
    {
      name: 'chromium-ui',
      testDir: './tests/ui',
      use: { ...devices['Desktop Chrome'], storageState: 'playwright/.auth/user.json' },
      dependencies: ['setup'],
    },
    { name: 'api', testDir: './tests/api' },
  ],
});
