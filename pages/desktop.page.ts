import { Page } from "@playwright/test";

export class DesktopPage {
  constructor(private page: Page) {}

  username = this.page.getByTestId("user-name");
  messageText = this.page.getByTestId("message-text");
  popupCloseButton = this.page.getByTestId("close-button");

  // fast transfer controls
  transferReceiver = this.page.locator("#widget_1_transfer_receiver");
  transferAmount = this.page.locator("#widget_1_transfer_amount");
  transferTitle = this.page.locator("#widget_1_transfer_title");
  transferExecuteButton = this.page.locator("#execute_btn");

  // mobile topup controls
  topupReceiver = this.page.locator("#widget_1_topup_receiver");
  topupAmount = this.page.locator("#widget_1_topup_amount");
  topupAgreementCheckbox = this.page.locator(
    "#uniform-widget_1_topup_agreement span"
  );
  topupExecuteButton = this.page.locator("#execute_phone_btn");

  public async fastTransferExecute(
    transferReceiver: string,
    transferAmount: string,
    transferTitle: string
  ) {
    await this.transferReceiver.selectOption(transferReceiver);
    await this.transferAmount.fill(transferAmount);
    await this.transferTitle.fill(transferTitle);
    await this.transferExecuteButton.click();
  }

  public async mobileTopupExecute(topupReceiver: string, topupAmount: string) {
    await this.topupReceiver.selectOption(topupReceiver);
    await this.topupAmount.fill(topupAmount);
    await this.topupAgreementCheckbox.click();
    await this.topupExecuteButton.click();
  }
}
