import { Locator } from '@playwright/test';

/** A component object: one product card, reusable wherever it appears. */
export class InventoryItem {
  readonly name: Locator;
  readonly price: Locator;
  readonly addButton: Locator;
  readonly removeButton: Locator;

  constructor(root: Locator) {
    this.name = root.getByTestId('inventory-item-name');
    this.price = root.getByTestId('inventory-item-price');
    this.addButton = root.getByRole('button', { name: 'Add to cart' });
    this.removeButton = root.getByRole('button', { name: 'Remove' });
  }

  async add(): Promise<void> {
    await this.addButton.click();
  }

  async remove(): Promise<void> {
    await this.removeButton.click();
  }
}
