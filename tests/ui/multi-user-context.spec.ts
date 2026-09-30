// tests/ui/multi-user-context.spec.ts
import { test, expect } from '@fixtures';
import { LoginPage } from '@pages/login.page';
import { InventoryPage } from '@pages/inventory.page';
import { CartPage } from '@pages/cart.page';
import { env } from '@utils/config-loader';

test('separate browser contexts do not share cart contents', async ({ browser }) => {
  const contexts = [];

  try {
    const ownerContext = await browser.newContext({ baseURL: env.baseUrl });
    contexts.push(ownerContext);

    const otherContext = await browser.newContext({ baseURL: env.baseUrl });
    contexts.push(otherContext);

    const ownerPage = await ownerContext.newPage();
    const ownerLogin = new LoginPage(ownerPage);

    await ownerLogin.goto();
    await ownerLogin.login(env.username, env.password);

    const ownerInventory = new InventoryPage(ownerPage);
    await expect(ownerInventory.title).toHaveText('Products');

    await ownerInventory.item('Sauce Labs Bike Light').add();
    await expect(ownerInventory.cartBadge).toHaveText('1');

    const otherPage = await otherContext.newPage();
    const otherLogin = new LoginPage(otherPage);

    await otherLogin.goto();
    await otherLogin.login(env.username, env.password);

    const otherInventory = new InventoryPage(otherPage);
    await expect(otherInventory.title).toHaveText('Products');

    await otherInventory.openCart();

    const otherCart = new CartPage(otherPage);
    await expect(otherCart.title).toHaveText('Your Cart');
    await expect(otherCart.items).toHaveCount(0);
  } finally {
    await Promise.all(contexts.map((context) => context.close()));
  }
});