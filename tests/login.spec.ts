import { test, expect } from "@playwright/test";
import { loginData, invalidLoginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { DesktopPage } from "../pages/desktop.page";

test.describe("login tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("positive login test with valid credentials", async ({ page }) => {
    //Arrange
    const expectedUsername = "Jan Demobankowy";

    //Act
    const loginPage = new LoginPage(page);
    loginPage.loginValidUser(loginData.userId, loginData.password);

    //Assert
    const desktopPage = new DesktopPage(page);
    await expect(desktopPage.username).toHaveText(expectedUsername);
  });

  test("negative login test with invalid username", async ({ page }) => {
    //Arrange
    const expectedErrorMessage = "identyfikator ma min. 8 znaków";

    //Act
    const loginPage = new LoginPage(page);
    loginPage.loginInvalidUser(
      invalidLoginData.userId,
      invalidLoginData.password
    );

    //Assert
    await expect(loginPage.loginButton).toHaveAttribute("disabled", "");
    await expect(loginPage.loginErrorMessage).toHaveText(expectedErrorMessage);
  });

  test("negative login test with invalid password", async ({ page }) => {
    //Arrange
    const expectedErrorMessage = "hasło ma min. 8 znaków";

    //Act
    const loginPage = new LoginPage(page);
    loginPage.loginInvalidUser(
      invalidLoginData.userId,
      invalidLoginData.password
    );

    //Assert
    await expect(loginPage.loginButton).toHaveAttribute("disabled", "");
    await expect(loginPage.passwordErrorMessage).toHaveText(
      expectedErrorMessage
    );
  });
});
