import { expect } from "@playwright/test";
import { isDesktopViewport } from "../utils/isDesktopViewport";

export class Navigation {
    constructor(page) {
        this.page = page
        this.basketCounter = page.locator('[data-qa="header-basket-count"]');
        this.checkoutButton = page.getByRole('link', { name: 'Checkout' });
        this.burgerButton = page.locator('[data-qa="burger-button"]');
    }

    getBasketCount = async () => {
        const text = await this.basketCounter.innerText();
        return parseInt(text, 10)
    }

    goToCheckout = async () => {
        //If test is running for mobile browser:
        if (!isDesktopViewport(this.page)) {
            await this.burgerButton.waitFor()
            await this.burgerButton.click()
        }
        //
        
        await this.checkoutButton.waitFor();
        await this.checkoutButton.click();
    
        await this.page.waitForURL("/basket");
        const title = this.page.locator("h1");
        await expect (title).toHaveText("Basket");
    }

}