import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  protected readonly path = '/';

  readonly username = this.page.getByPlaceholder('Username');
  readonly password = this.page.getByPlaceholder('Password');
  readonly loginButton = this.page.getByRole('button', { name: 'Login' });
  readonly errorMessage = this.page.getByTestId('error');

  async login(username: string, password: string): Promise<void> {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}
