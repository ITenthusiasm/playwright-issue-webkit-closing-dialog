import { test as it, expect } from "@playwright/test";

it.describe("Failing Cases for closing `dialog`s with `Escape` in WebKit on Linux", () => {
  it("Fails to close `dialog`s when `Escape` is pressed on a `[contenteditable]` element", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      document.body.innerHTML = `
        <dialog>
          <div contenteditable="true">Edit Me</div>
          <button type="button">Click Me</button>
        </dialog>
      `;
    });

    const dialog = page.locator("dialog");

    await it.step("Works with <button>", async () => {
      const button = dialog.locator("button");
      await dialog.evaluate((node: HTMLDialogElement) => node.showModal());
      await expect(dialog).toHaveJSProperty("open", true);
      await expect(button).toBeVisible();

      await button.press("Escape");
      await expect(dialog).toHaveJSProperty("open", false);
      await expect(button).not.toBeVisible();
    });

    await it.step("Fails with [contenteditable]", async () => {
      const widget = dialog.locator("[contenteditable]");
      await dialog.evaluate((node: HTMLDialogElement) => node.showModal());
      await expect(dialog).toHaveJSProperty("open", true);
      await expect(widget).toBeVisible();

      await widget.press("Escape");
      await expect(dialog).toHaveJSProperty("open", false);
      await expect(widget).not.toBeVisible();
    });
  });
});
