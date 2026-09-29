import { BasePage } from './base.page';

export class CartPage extends BasePage {
  protected readonly path = '/cart.html';

  readonly items = this.page.getByTestId('inventory-item');
  readonly itemNames = this.page.getByTestId('inventory-item-name');
}
