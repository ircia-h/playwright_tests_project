import { test, expect } from "@playwright/test";
import { loginValidUser } from "./helpers";
import { loginData } from "../test-data/login.data";

test.describe("payment tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await loginValidUser(page, loginData.userId, loginData.password);
    await page.getByRole("link", { name: "płatności" }).click();
  });

  test("positive simple payment test", async ({ page }) => {
    //Arrange
    const transferReceiver = "Jan Nowak";
    const transferAccountTo = "12 3456 7890 1234 4567 8912 35874";
    const transferAmount = "222";
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`;

    //Act
    await page.getByTestId("transfer_receiver").fill(transferReceiver);
    await page.getByTestId("form_account_to").fill(transferAccountTo);
    await page.getByTestId("form_amount").fill(transferAmount);
    await page.getByRole("button", { name: "wykonaj przelew" }).click();

    await page.getByTestId("close-button").click();

    //Assert
    await expect(page.locator("#show_messages")).toHaveText(expectedMessage);
  });
});
