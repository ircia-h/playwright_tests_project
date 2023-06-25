import { test, expect, selectors } from "@playwright/test";
import { loginValidUser, loginInvalidUser } from "./helpers";

const url = "https://demo-bank.vercel.app/";
const username = "testerLO";
const password = "qwerty12";

test.describe("desktop tests", () => {
  test("positive simple transfer test", async ({ page }) => {
    //Arrange
    const receiverId = "2";
    const transferAmount = "90";
    const transferTitle = "Cele charytatywne";
    const transferReceipient = "Chuck Demobankowy";

    //Act
    await page.goto(url);
    await loginValidUser(page, username, password);

    await page.locator("#widget_1_transfer_receiver").selectOption(receiverId);
    await page.locator("#widget_1_transfer_amount").fill(transferAmount);
    await page.locator("#widget_1_transfer_title").fill(transferTitle);
    await page.locator("#execute_btn").click();

    //Assert
    await expect(page.locator(".ui-dialog-titlebar")).toBeVisible();
    await page.getByTestId("close-button").click();

    await expect(page.getByTestId("message-text")).toHaveText(
      `Przelew wykonany! ${transferReceipient} - ${transferAmount},00PLN - ${transferTitle}`
    );
  });

  test("positive phone top-up test", async ({ page }) => {
    //Arrange
    const topupReceiver = "500 xxx xxx";
    const topupAmount = "70";

    //Act
    await page.goto(url);
    await loginValidUser(page, username, password);

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
      `Doładowanie wykonane! ${topupAmount},00PLN na numer ${topupReceiver}`
    );
  });
});
