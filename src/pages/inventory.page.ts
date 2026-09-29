import { BasePage } from './base.page';
import { InventoryItem } from '@components/inventory-item.component';

export class InventoryPage extends BasePage {
  protected readonly path = '/inventory.html';

  readonly title = this.page.getByTestId('title');
  readonly items = this.page.getByTestId('inventory-item');
  readonly cartBadge = this.page.getByTestId('shopping-cart-badge');
  readonly cartLink = this.page.getByTestId('shopping-cart-link');

  /** Scope actions to one product so we never act on the wrong row. */
  item(name: string): InventoryItem {
    return new InventoryItem(this.items.filter({ hasText: name }));
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
