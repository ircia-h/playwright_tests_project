import { Locator, Page } from "@playwright/test";

export class SideMenuComponent {
  readonly page: Page;
  readonly alertsWindowsFormsMenu: Locator;
  readonly elementsMenu: Locator;
  readonly interactionsMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.alertsWindowsFormsMenu = this.page.getByText("Alerts, Frame & Windows");
    this.elementsMenu = this.page.getByText("Elements");
    this.interactionsMenu = this.page.getByText("Interactions");
  }

  async chooseSubMenuOption(menuOption: Locator, subMenuOption: string) {
    await menuOption.click();
    await this.page.getByText(subMenuOption, { exact: true }).click();
  }
}
