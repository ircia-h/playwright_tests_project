import { test, expect, selectors, Page } from "@playwright/test";

export async function loginValidUser(
  page: Page,
  username: string,
  password: string
) {
  await page.getByTestId("login-input").fill(username);
  await page.getByTestId("password-input").fill(password);
  await page.getByTestId("login-button").click();
}

export async function loginInvalidUser(
  page: Page,
  username: string,
  password: string
) {
  await page.getByTestId("login-input").fill(username);
  await page.getByTestId("password-input").fill(password);
  await page.getByTestId("password-input").blur();
}
