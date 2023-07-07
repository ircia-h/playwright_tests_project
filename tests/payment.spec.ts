import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { PaymentPage } from "../pages/payment.page";
import { DesktopPage } from "../pages/desktop.page";

test.describe("payment tests", () => {
  let paymentPage: PaymentPage;
  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    const loginPage = new LoginPage(page);
    await loginPage.loginValidUser(loginData.userId, loginData.password);

    const desktopPage = new DesktopPage(page);
    await desktopPage.sideMenu.paymentMenuOptionLink.click();

    paymentPage = new PaymentPage(page);
  });

  test("positive simple payment test", async ({ page }) => {
    //Arrange
    const transferReceiver = "Jan Nowak";
    const transferAccountTo = "12 3456 7890 1234 4567 8912 35874";
    const transferAmount = "222";
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`;

    //Act
    await paymentPage.transferToAccountExecute(
      transferReceiver,
      transferAccountTo,
      transferAmount
    );
    await paymentPage.popupCloseButton.click();

    //Assert
    await expect(paymentPage.messageTextLabel).toHaveText(expectedMessage);
  });
});
