import { test as base, expect } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { InventoryPage } from '@pages/inventory.page';
import { CartPage } from '@pages/cart.page';
import { PostClient, type NewPost, type Post } from '@api/post.client';
import { buildPost } from '@data/post.factory';
import { buildApiHeaders, env } from '@utils/config-loader';

type CreatedPost = {
  data: NewPost;
  status: number;
  body: Post;
};

type Fixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  postClient: PostClient;
  createdPost: CreatedPost;
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

  createdPost: async ({ postClient }, use) => {
    const data = buildPost();
    const response = await postClient.create(data);

    try {
      await use({ data, status: response.status, body: response.body });
    } finally {
      const postId = response.body.id;
      if (response.status === 201 && Number.isInteger(postId) && postId > 0) {
        const cleanupResponse = await postClient.remove(postId);
        expect(cleanupResponse.status).toBe(200);
      }
    }
  },
});

export { expect };
