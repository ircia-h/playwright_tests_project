import { Page } from "@playwright/test";
import { SideMenuComponent } from "../components/side-menu.component";

export class LoginPage {
  constructor(private page: Page) {}

  sideMenu = new SideMenuComponent(this.page);

  loginInput = this.page.getByTestId("login-input");
  passwordInput = this.page.getByTestId("password-input");
  loginButton = this.page.getByTestId("login-button");
  passwordErrorMessage = this.page.getByTestId("error-login-password");
  loginErrorMessage = this.page.getByTestId("error-login-id");

  async executeLoginValidUser(
    username: string,
    password: string
  ): Promise<void> {
    await this.loginInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async executeLoginInvalidUser(
    username: string,
    password: string
  ): Promise<void> {
    await this.loginInput.fill(username);
    await this.passwordInput.fill(password);
    await this.passwordInput.blur();
  }
}
