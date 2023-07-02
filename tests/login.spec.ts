import { test, expect } from "@playwright/test";
import { loginValidUser, loginInvalidUser } from "./helpers";
import { loginData, invalidLoginData } from "../test-data/login.data";

test.describe("login tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("positive login test with valid credentials", async ({ page }) => {
    //Arrange
    const expectedUsername = "Jan Demobankowy";

    //Act
    await loginValidUser(page, loginData.userId, loginData.password);
    await page.getByTestId("user-name").click();

    //Assert
    await expect(page.getByTestId("user-name")).toHaveText(expectedUsername);
  });

  test("negative login test with invalid username", async ({ page }) => {
    //Arrange
    const expectedErrorMessage = "identyfikator ma min. 8 znaków";

    //Act
    await loginInvalidUser(page, invalidLoginData.userId, loginData.password);

    //Assert
    await expect(page.getByTestId("login-button")).toHaveAttribute(
      "disabled",
      ""
    );
    await expect(page.getByTestId("error-login-id")).toHaveText(
      expectedErrorMessage
    );
  });

  test("negative login test with invalid password", async ({ page }) => {
    //Arrange
    const expectedErrorMessage = "hasło ma min. 8 znaków";

    //Act
    await loginInvalidUser(page, loginData.userId, invalidLoginData.password);

    //Assert
    await expect(page.getByTestId("login-button")).toHaveAttribute(
      "disabled",
      ""
    );
    await expect(page.getByTestId("error-login-password")).toHaveText(
      expectedErrorMessage
    );
  });
});
