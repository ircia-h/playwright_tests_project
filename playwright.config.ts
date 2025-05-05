import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "https://demoqa.com",
    trace: "retain-on-failure",
    video: "off",
    screenshot: "only-on-failure"
  },

  projects: [
    {
      name: "chromium",
      testMatch: /weekly_exercise/,
      //dependencies: ["auth-setup"],
      use: {
        ...devices["Desktop Chrome"],
        storageState: "./.auth/user.json"
      },
    },
    {
      name: "auth-setup",
      testMatch: /userLogin\.spec\.ts/,
      use: { ...devices["Desktop Chrome"] },
    }
  ],
});
