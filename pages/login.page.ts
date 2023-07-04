import { Page } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  loginInput = this.page.getByTestId("login-input");
  passwordInput = this.page.getByTestId("password-input");
  loginButton = this.page.getByTestId("login-button");
  passwordErrorMessage = this.page.getByTestId("error-login-password");
  loginErrorMessage = this.page.getByTestId("error-login-id");

  public async loginValidUser(username: string, password: string) {
    await this.loginInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  public async loginInvalidUser(username: string, password: string) {
    await this.loginInput.fill(username);
    await this.passwordInput.fill(password);
    await this.passwordInput.blur();
  }
}
