import { test as setup, expect } from '@playwright/test';
import { env } from '../src/utils/config-loader';

const authFile = 'playwright/.auth/user.json';

setup('authenticate once and save the session', async ({ page }) => {
  await page.goto('/');
  await page.getByPlaceholder('Username').fill(env.username);
  await page.getByPlaceholder('Password').fill(env.password);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/inventory/);

  await page.context().storageState({ path: authFile });
});
