import { test, expect } from '@fixtures';

test.describe('Inventory', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
  });

  test('lists six products', async ({ inventoryPage }) => {
    await expect(inventoryPage.items).toHaveCount(6);
  });

  test('adding an item updates the cart badge', { tag: '@smoke' }, async ({ inventoryPage }) => {
    const backpack = inventoryPage.item('Sauce Labs Backpack');

    await backpack.add();

    await expect(inventoryPage.cartBadge).toHaveText('1');
    await expect(backpack.removeButton).toBeVisible();
  });

  test('removing an item clears the cart badge', async ({ inventoryPage }) => {
    const backpack = inventoryPage.item('Sauce Labs Backpack');
    await backpack.add();
    await expect(inventoryPage.cartBadge).toHaveText('1');

    await backpack.remove();

    await expect(inventoryPage.cartBadge).toHaveCount(0);
    await expect(backpack.addButton).toBeVisible();
  });
});
