import { test, expect } from "@playwright/test";

test.skip("Product page add to basket", async ({page}) => {
    await page.goto("/");
    const addToBasketButton = page.locator('[data-qa="product-button"]').first();
    await addToBasketButton.waitFor();
    await expect (addToBasketButton).toHaveText('Add to Basket');
    
    const basketCounter = page.locator('[data-qa="header-basket-count"]');
    await expect (basketCounter).toHaveText('0');

    await addToBasketButton.click()
    await expect (addToBasketButton).toHaveText('Remove from Basket');
    await expect (basketCounter).toHaveText('1');

    const checkoutButton = page.locator('[data-qa="desktop-nav-link"]').last();
    await checkoutButton.waitFor();
    await checkoutButton.click();

    await page.waitForURL("/basket");
    const title = page.locator("h1");
    await expect (title).toHaveText("Basket");
    await page.pause();

})