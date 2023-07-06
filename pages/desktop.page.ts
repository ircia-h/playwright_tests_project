import { Page } from "@playwright/test";
import { SideMenuComponent } from "../components/side-menu.component";

export class DesktopPage {
  constructor(private page: Page) {}

  sideMenu = new SideMenuComponent(this.page);

  usernameLabel = this.page.getByTestId("user-name");
  messageTextLabel = this.page.getByTestId("message-text");
  popupCloseButton = this.page.getByTestId("close-button");

  // fast transfer controls
  transferReceiverDropdown = this.page.locator("#widget_1_transfer_receiver");
  transferAmountInput = this.page.locator("#widget_1_transfer_amount");
  transferTitleInput = this.page.locator("#widget_1_transfer_title");
  transferExecuteButton = this.page.locator("#execute_btn");

  // mobile topup controls
  topupReceiverDropdown = this.page.locator("#widget_1_topup_receiver");
  topupAmountInput = this.page.locator("#widget_1_topup_amount");
  topupAgreementCheckbox = this.page.locator(
    "#uniform-widget_1_topup_agreement span"
  );
  topupExecuteButton = this.page.locator("#execute_phone_btn");

  public async fastTransferExecute(
    transferReceiver: string,
    transferAmount: string,
    transferTitle: string
  ) {
    await this.transferReceiverDropdown.selectOption(transferReceiver);
    await this.transferAmountInput.fill(transferAmount);
    await this.transferTitleInput.fill(transferTitle);
    await this.transferExecuteButton.click();
  }

  public async mobileTopupExecute(topupReceiver: string, topupAmount: string) {
    await this.topupReceiverDropdown.selectOption(topupReceiver);
    await this.topupAmountInput.fill(topupAmount);
    await this.topupAgreementCheckbox.click();
    await this.topupExecuteButton.click();
  }
}
