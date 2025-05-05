import { test as setup,  expect } from "@playwright/test";
import { LogInPage } from "../../pages/loginPage";
import 'dotenv/config'

setup("User login", async ({page}) => {
        const username = process.env.USER_NAME;
        const password = process.env.PASSWORD;
        const loginPage = new LogInPage(page);
        await loginPage.doLogin(username, password);
        await expect(page.locator("#submit").filter( {hasText: /Log out/}), "Login attempt was unsuccessful").toBeVisible();
        await page.context().storageState({path: "./.auth/user.json"});
    })