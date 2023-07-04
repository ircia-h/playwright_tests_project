import { Page } from "@playwright/test";

export class PaymentPage {
  constructor(private page: Page) {}

  popupCloseButton = this.page.getByTestId("close-button");
  messageText = this.page.locator("#show_messages");

  // transfer controls
  transferReceiver = this.page.getByTestId("transfer_receiver");
  transferToAccountNumber = this.page.getByTestId("form_account_to");
  transferAmount = this.page.getByTestId("form_amount");
  transferExecuteButton = this.page.getByRole("button", {
    name: "wykonaj przelew",
  });

  public async transferToAccountExecute(
    transferReceiver: string,
    transferToAccountNumber: string,
    transferAmount: string
  ) {
    await this.transferReceiver.fill(transferReceiver);
    await this.transferToAccountNumber.fill(transferToAccountNumber);
    await this.transferAmount.fill(transferAmount);
    await this.transferExecuteButton.click();
  }
}
