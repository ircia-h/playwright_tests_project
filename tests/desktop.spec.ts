import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { DesktopPage } from "../pages/desktop.page";

test.describe("desktop tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    const loginPage = new LoginPage(page);
    loginPage.loginValidUser(loginData.userId, loginData.password);
  });

  test("positive simple transfer test", async ({ page }) => {
    //Arrange
    const transferReceiverId = "2";
    const transferAmount = "90";
    const transferTitle = "Cele charytatywne";
    const transferReceiverName = "Chuck Demobankowy";
    const expectedErrorMessage = `Przelew wykonany! ${transferReceiverName} - ${transferAmount},00PLN - ${transferTitle}`;

    //Act
    const desktopPage = new DesktopPage(page);
    desktopPage.fastTransferExecute(
      transferReceiverId,
      transferAmount,
      transferTitle
    );
    await desktopPage.popupCloseButton.click();

    //Assert
    await expect(desktopPage.messageText).toHaveText(expectedErrorMessage);
  });

  test("positive phone top-up test", async ({ page }) => {
    //Arrange
    const topupReceiver = "500 xxx xxx";
    const topupAmount = "70";
    const expectedErrorMessage = `Doładowanie wykonane! ${topupAmount},00PLN na numer ${topupReceiver}`;

    //Act
    const desktopPage = new DesktopPage(page);
    await desktopPage.mobileTopupExecute(topupReceiver, topupAmount);
    await desktopPage.popupCloseButton.click();

    //Assert
    await expect(desktopPage.messageText).toHaveText(expectedErrorMessage);
  });
});
