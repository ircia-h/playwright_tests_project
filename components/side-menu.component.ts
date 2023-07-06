import { Page } from "@playwright/test";

export class SideMenuComponent {
  constructor(private page: Page) {}

  paymentMenuOptionLink = this.page.getByRole("link", { name: "płatności" });
}
