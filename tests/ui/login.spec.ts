import { test, expect } from '@fixtures';
import { env } from '@utils/config-loader';
import { INVALID_LOGINS } from '@data/users';

// These tests exercise login itself, so start logged out.
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('valid user reaches the products page', { tag: '@smoke' }, async ({ loginPage, inventoryPage, page }) => {
    await loginPage.login(env.username, env.password);

    await expect(page).toHaveURL(/inventory/);
    await expect(inventoryPage.title).toHaveText('Products');
  });

  for (const { name, user, pass, error } of INVALID_LOGINS) {
    test(`rejects ${name}`, async ({ loginPage, page }) => {
      await loginPage.login(user, pass);

      await expect(loginPage.errorMessage).toContainText(error);
      await expect(page).not.toHaveURL(/inventory/);
    });
  }
});
