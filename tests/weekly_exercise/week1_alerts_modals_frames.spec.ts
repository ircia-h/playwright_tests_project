import { Dialog, expect, Frame, FrameLocator } from "@playwright/test"
import { test } from "../../fixtures/page.fixture"
import 'dotenv/config'
import { SideMenuComponent } from "../../components/side-menu.component";

test.describe("Alerts handling", {
    annotation: {
        type: "exploratory",
        description: "This set containts tests for dialog, modals handling"
    }
}, () => {

    let dialogMessage = "";
    test.beforeEach(async ({ page }) => {
        const sideMenu = new SideMenuComponent(page);
        await sideMenu.chooseSubMenuOption(sideMenu.alertsWindowsFormsMenu, "Alerts");
    });

    test("Normal alert handling", async ({ page }) => {
        page.on('dialog', dialog => {
            dialogMessage = dialog.message();
            dialog.accept();
        });
        await page.locator("#alertButton").click();
        expect(dialogMessage, "Wrong dialog message").toBe("You clicked a button");
    })

    test("Normal alert with waiting", async ({ page }) => {
        page.on("dialog", dialog => {
            dialogMessage = dialog.message();
            dialog.accept();
        })
        await page.locator("#timerAlertButton").click();
        await page.waitForEvent("dialog", { timeout: 15_000 });
        expect(dialogMessage, "Wrong dialog message").toBe("This alert appeared after 5 seconds");
    });

    test("Confirm dialog handling", async ({ page }) => {
        const dialogHandler = (dialog: Dialog) => {
            dialog.dismiss();
            page.off("dialog", dialogHandler);
        }
        page.on("dialog", dialogHandler);
        await page.locator("#confirmButton").click();

        await expect(page.locator("#confirmResult"), "Wrong dialog confirmation").toContainText("Cancel");

        page.on("dialog", async (dialog) => await dialog.accept());
        await page.locator("#confirmButton").click();
        await expect(page.locator("#confirmResult"), "Wrong dialog confirmation").toContainText("Ok");
    });

    test("Prompt box handling", async ({ page }) => {
        const username = process.env.USER_NAME;
        page.on("dialog", dialog => dialog.accept(username));
        await page.locator("#promtButton").click();

        await expect(page.locator("#promptResult"), "Wrong dialog confirmation").toContainText(username!);
    });
})

test.describe("Modals handling", () => {
    test.beforeEach(async ({ page }) => {
        const sideMenu = new SideMenuComponent(page);
        await sideMenu.chooseSubMenuOption(sideMenu.alertsWindowsFormsMenu, "Modal Dialogs");
    })

    test("Small modal", async ({ page }) => {
        await page.getByRole("button", { name: "Small modal" }).click();
        await expect(page.getByRole("dialog")).toBeVisible();
        await page.getByRole("dialog").filter({ has: page.locator(".close") }).click();
        await expect(page.getByRole("dialog")).not.toBeVisible();
    })
})

test.describe("iFrames handling", () => {
    test.beforeEach(async ({ page }) => {
        const sideMenu = new SideMenuComponent(page);
        await sideMenu.chooseSubMenuOption(sideMenu.alertsWindowsFormsMenu, "Nested Frames");
        await expect(page.getByText("Sample Nested Iframe page.")).toBeVisible();
    })

    test("iFrames handling", async ({ page }) => {
        test.setTimeout(15_000);
        await page.pause();
        const parentFrame = page.locator("#frame1").contentFrame();
        await expect(parentFrame.getByText("Parent frame")).toBeVisible();

        const childFrame = parentFrame.locator("iframe").contentFrame();
        await expect(childFrame.getByText("Child Iframe")).toBeVisible();
    })
})