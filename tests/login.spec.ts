import { test, expect, selectors } from '@playwright/test';

test.describe('login tests', () => {
  test('positive login test with valid credentials', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');

    await page.getByTestId('login-input').fill('testerLO');
    await page.getByTestId('password-input').fill('qwerty12');
    await page.getByTestId('login-button').click();

    await page.getByTestId('user-name').click();
    
    await expect(page.getByTestId('user-name')).toHaveText('Jan Demobankowy');
  });

  test('negative login test with invalid username', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');

    await page.getByTestId('login-input').fill('tester');
    await page.getByTestId('password-input').fill('qwerty12');

    await expect(page.getByTestId('login-button')).toHaveAttribute('disabled', '');
    await expect(page.getByTestId('error-login-id')).toHaveText('identyfikator ma min. 8 znaków');
  });

  test('negative login test with invalid password', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');

    await page.getByTestId('login-input').fill('testerLO');
    await page.getByTestId('password-input').fill('qwerty');
    await page.getByTestId('password-input').blur();
    
    await expect(page.getByTestId('login-button')).toHaveAttribute('disabled', '');
    await expect(page.getByTestId('error-login-password')).toHaveText('hasło ma min. 8 znaków');
  });

});