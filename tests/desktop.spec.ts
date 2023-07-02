import { test, expect, selectors } from "@playwright/test";
import { loginValidUser, loginInvalidUser } from "./helpers";
import { loginData } from "../test-data/login.data";

test.describe("desktop tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await loginValidUser(page, loginData.userId, loginData.password);
  });

  test("positive simple transfer test", async ({ page }) => {
    //Arrange
    const receiverId = "2";
    const transferAmount = "90";
    const transferTitle = "Cele charytatywne";
    const transferReceipient = "Chuck Demobankowy";
    const expectedErrorMessage = `Przelew wykonany! ${transferReceipient} - ${transferAmount},00PLN - ${transferTitle}`;

    //Act
    await page.locator("#widget_1_transfer_receiver").selectOption(receiverId);
    await page.locator("#widget_1_transfer_amount").fill(transferAmount);
    await page.locator("#widget_1_transfer_title").fill(transferTitle);
    await page.locator("#execute_btn").click();

    //Assert
    await expect(page.locator(".ui-dialog-titlebar")).toBeVisible();
    await page.getByTestId("close-button").click();

    await expect(page.getByTestId("message-text")).toHaveText(
      expectedErrorMessage
    );
  });

  test("positive phone top-up test", async ({ page }) => {
    //Arrange
    const topupReceiver = "500 xxx xxx";
    const topupAmount = "70";
    const expectedErrorMessage = `Doładowanie wykonane! ${topupAmount},00PLN na numer ${topupReceiver}`;

    //Act
    await page.locator("#widget_1_topup_receiver").selectOption(topupReceiver);
    await page.locator("#widget_1_topup_amount").fill(topupAmount);
    await page.locator("#uniform-widget_1_topup_agreement span").click();
    await page.locator("#execute_phone_btn").click();

    //Assert
    await expect(
      page.getByRole("dialog", { name: "Doładowanie wykonane" })
    ).toBeVisible();
    await page.getByTestId("close-button").click();

    await expect(page.getByTestId("message-text")).toHaveText(
      expectedErrorMessage
    );
  });
});
