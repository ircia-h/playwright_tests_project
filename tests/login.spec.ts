import { test, expect } from "@playwright/test";
import { loginData, invalidLoginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { DesktopPage } from "../pages/desktop.page";

test.describe("login tests", () => {
  let loginPage: LoginPage;
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    loginPage = new LoginPage(page);
  });

  test("positive login test with valid credentials", async ({ page }) => {
    //Arrange
    const expectedUsername = "Jan Demobankowy";

    //Act
    await loginPage.loginValidUser(loginData.userId, loginData.password);

    //Assert
    const desktopPage = new DesktopPage(page);
    await expect(desktopPage.usernameLabel).toHaveText(expectedUsername);
  });

  test("negative login test with invalid username", async ({ page }) => {
    //Arrange
    const expectedErrorMessage = "identyfikator ma min. 8 znaków";

    //Act
    await loginPage.loginInvalidUser(
      invalidLoginData.userId,
      loginData.password
    );

    //Assert
    await expect(loginPage.loginButton).toHaveAttribute("disabled", "");
    await expect(loginPage.loginErrorMessage).toHaveText(expectedErrorMessage);
  });

  test("negative login test with invalid password", async ({ page }) => {
    //Arrange
    const expectedErrorMessage = "hasło ma min. 8 znaków";

    //Act
    await loginPage.loginInvalidUser(
      loginData.userId,
      invalidLoginData.password
    );

    //Assert
    await expect(loginPage.loginButton).toHaveAttribute("disabled", "");
    await expect(loginPage.passwordErrorMessage).toHaveText(
      expectedErrorMessage
    );
  });
});
