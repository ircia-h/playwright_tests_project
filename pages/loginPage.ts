import { Locator, Page } from "@playwright/test";

export class LogInPage {
    readonly page: Page;
    readonly loginInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.loginInput = page.getByPlaceholder("Username");
        this.passwordInput = page.locator("#password");
        this.loginButton = page.getByRole("button").filter({hasText: /Login/});
    }

    public async doLogin(username: string, password: string) {
        await this.page.goto("/login");
        await this.loginInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}