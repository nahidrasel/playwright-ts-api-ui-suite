import { test as base, expect } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { InventoryPage } from '@pages/inventory.page';
import { CartPage } from '@pages/cart.page';
import { PostClient } from '@api/post.client';
import { buildApiHeaders, env } from '@utils/config-loader';

type Fixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  postClient: PostClient;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page, page.getByTestId('inventory-item')));
  },

  // Own API context so it works from any project; shows setup + teardown around use().
  postClient: async ({ playwright }, use) => {
    const request = await playwright.request.newContext({
      baseURL: env.apiUrl,
      extraHTTPHeaders: buildApiHeaders(env.apiHeaders, env.apiToken),
    });
    await use(new PostClient(request));
    await request.dispose(); // teardown
  },
});

export { expect };
