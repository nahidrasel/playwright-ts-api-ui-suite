import { test, expect } from '@fixtures';

test('an added item appears in the cart', async ({ inventoryPage, cartPage }) => {
  await inventoryPage.goto();
  await inventoryPage.item('Sauce Labs Bike Light').add();

  await inventoryPage.openCart();

  await expect(cartPage.title).toHaveText('Your Cart');
  await expect(cartPage.itemNames).toHaveText(['Sauce Labs Bike Light']);
  await expect(cartPage.cartBadge).toHaveText('1');
  await expect(cartPage.cartLink).toBeVisible();
});
