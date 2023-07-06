import { Page } from "@playwright/test";
import { SideMenuComponent } from "../components/side-menu.component";

export class PaymentPage {
  constructor(private page: Page) {}

  popupCloseButton = this.page.getByTestId("close-button");
  messageTextLabel = this.page.locator("#show_messages");

  sideMenu = new SideMenuComponent(this.page);

  // transfer controls
  transferReceiverInput = this.page.getByTestId("transfer_receiver");
  transferToAccountInput = this.page.getByTestId("form_account_to");
  transferAmountInput = this.page.getByTestId("form_amount");
  transferExecuteButton = this.page.getByRole("button", {
    name: "wykonaj przelew",
  });

  public async transferToAccountExecute(
    transferReceiver: string,
    transferToAccountNumber: string,
    transferAmount: string
  ) {
    await this.transferReceiverInput.fill(transferReceiver);
    await this.transferToAccountInput.fill(transferToAccountNumber);
    await this.transferAmountInput.fill(transferAmount);
    await this.transferExecuteButton.click();
  }
}
