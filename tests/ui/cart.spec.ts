import { test, expect } from '@fixtures';

test('an added item appears in the cart', async ({ inventoryPage, cartPage }) => {
  await inventoryPage.goto();
  await inventoryPage.item('Sauce Labs Bike Light').add();

  await inventoryPage.openCart();

  await expect(cartPage.itemNames).toHaveText(['Sauce Labs Bike Light']);
});
