import { expect, Page } from "@playwright/test";
import { SideMenuComponent } from "../../components/side-menu.component"
import { test } from "../../fixtures/page.fixture"
import path from "path";

async function markTreePathCheckboxes(treePath: string, checkBoxToggle: boolean, page: Page) {

    const parsedPath = treePath.split("/");

    const elementLocator = page.locator("label").filter({ has: page.getByText(parsedPath[0]) });
    await expect(elementLocator, `Path not found: ${treePath}`).toBeVisible();
    const elementExpandButtonLocator = page.locator("span").filter({ has: elementLocator }).getByTitle("Toggle");
    if (parsedPath.length > 1) {
        await expect(elementExpandButtonLocator, `Path not found: ${treePath}`).toBeVisible();
        await elementExpandButtonLocator.click();
        await markTreePathCheckboxes(treePath.split(`${parsedPath[0]}/`)[1], checkBoxToggle, page);
    }
    else {
        checkBoxToggle ? await elementLocator.locator(".rct-checkbox").check() : await elementLocator.locator(".rct-checkbox").uncheck();
    }
};

test.describe("Basic elements handling", {
    annotation: {
        type: "exercise",
        description: "This set is to practice basic elements handling: checkboxes, radiobuttons, drag-n-drop, mouse actions"
    }
}, () => {

    test("Checkboxes", async ({ page }) => {
        const sideMenu = new SideMenuComponent(page);
        await sideMenu.chooseSubMenuOption(sideMenu.elementsMenu, "Check Box");
        await page.waitForLoadState("domcontentloaded");

        const path = "Home/Desktop/Commands";
        await markTreePathCheckboxes(path, true, page);
        const resultLabel = page.locator("#result").filter({ hasText: 'commands' })
        expect(resultLabel, "Incorrectly selected checkboxes").toBeVisible();
    });

    test("Radiobuttons", async ({ page }) => {
        const sideMenu = new SideMenuComponent(page);
        await sideMenu.chooseSubMenuOption(sideMenu.elementsMenu, "Radio Button");
        await page.waitForLoadState("domcontentloaded");
        await page.locator('label').filter({ hasText: 'Impressive' }).check();

        await expect(page.getByText("You have selected ").filter({ hasText: "Impressive" })).toBeVisible();

    })

    test("Mouse clicks", async ({ page }) => {
        const sideMenu = new SideMenuComponent(page);
        await sideMenu.chooseSubMenuOption(sideMenu.elementsMenu, "Buttons");

        await page.getByRole("button").filter({ hasText: "Double Click Me" }).click({ clickCount: 2 });
        await expect(page.locator("#doubleClickMessage")).toHaveText("You have done a double click");

        await page.getByRole("button").filter({ hasText: "Right Click Me" }).click({ button: "right" });
        await expect(page.locator("#rightClickMessage")).toHaveText("You have done a right click");

        await page.getByText("Click Me", { exact: true }).click({ button: "left" });
        await expect(page.locator("#dynamicClickMessage")).toHaveText("You have done a dynamic click");
    });

    test("Files upload", async ({ page }) => {
        const sideMenu = new SideMenuComponent(page);
        await sideMenu.chooseSubMenuOption(sideMenu.elementsMenu, "Upload and Download");

        await page.locator("#uploadFile").setInputFiles(
            {
                name: "testFile.txt",
                mimeType: "text/plain",
                buffer: Buffer.from("this is a test")
            }
        );

        await expect(page.getByText("C:\\fakepath\\testFile.txt")).toBeVisible();
    })

    test("Drag and drop", async ({ page }) => {
        const sideMenu = new SideMenuComponent(page);
        await sideMenu.chooseSubMenuOption(sideMenu.interactionsMenu, "Droppable");

        await page.locator("#draggable").dragTo(page.locator("#droppableExample-tabpane-simple").getByText("Drop here"));
        await expect(page.locator("#droppableExample-tabpane-simple").getByText("Dropped!")).toBeVisible();
    })

    test("Drag and drop - manual", async ({ page }) => {
        const sideMenu = new SideMenuComponent(page);
        await sideMenu.chooseSubMenuOption(sideMenu.interactionsMenu, "Droppable");

        await page.locator("#droppableExample-tab-accept").click();

        await page.locator("#acceptDropContainer").getByText("Acceptable", { exact: true }).hover();
        await page.mouse.down();
        await page.locator("#acceptDropContainer").getByText("Drop here").hover();
        await page.mouse.up();

        await expect(page.locator("#acceptDropContainer").getByText("Dropped!")).toBeVisible();
    })


})