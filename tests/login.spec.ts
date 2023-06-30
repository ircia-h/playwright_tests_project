import { test, expect, selectors, Page } from "@playwright/test";
import { loginValidUser, loginInvalidUser } from "./helpers";

const username = "testerLO";
const password = "qwerty12";
const invalidUsername = "tester";
const invalidPassword = "qwerty";

test.describe("login tests", () => {
  test.beforeEach(async ({ page }) => {
    const url = "https://demo-bank.vercel.app/";
    await page.goto(url);
  });

  test("positive login test with valid credentials", async ({ page }) => {
    //Arrange
    const expectedUsername = "Jan Demobankowy";

    //Act
    await loginValidUser(page, username, password);
    await page.getByTestId("user-name").click();

    //Assert
    await expect(page.getByTestId("user-name")).toHaveText(expectedUsername);
  });

  test("negative login test with invalid username", async ({ page }) => {
    //Arrange
    const expectedErrorMessage = "identyfikator ma min. 8 znaków";

    //Act
    await loginInvalidUser(page, invalidUsername, password);

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
    await loginInvalidUser(page, username, invalidPassword);

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
