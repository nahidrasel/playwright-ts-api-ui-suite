import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  protected readonly path = '/cart.html';

  readonly title = this.page.getByTestId('title');
  readonly items: Locator;
  readonly itemNames: Locator;
  readonly cartBadge = this.page.getByTestId('shopping-cart-badge');
  readonly cartLink = this.page.getByTestId('shopping-cart-link');

  constructor(page: Page, items: Locator = page.getByTestId('inventory-item')) {
    super(page);
    this.items = items;
    this.itemNames = items.getByTestId('inventory-item-name');
  }
}
