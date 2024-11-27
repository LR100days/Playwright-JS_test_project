import { expect } from "@playwright/test";

export class Checkout {
    constructor(page) {
        this.page = page
        this.basketCards = page.locator('[data-qa="basket-card"]');
        this.basketItemPrice = page.locator('[data-qa="basket-item-price"]');
        this.removeFromBasketButton = page.locator('[data-qa="basket-card-remove-item"]');
        this.countinueToCheckoutButton = page.locator('[data-qa="continue-to-checkout"]')

    }

    removeCheapestProduct = async () => {
        await this.basketCards.first().waitFor();
        const itemsBeforeRemoval = await this.basketCards.count()
        await this.basketItemPrice.first().waitFor();
        const allPricesText = await this.basketItemPrice.allInnerTexts();
        const justNumbers = allPricesText.map((element) => {
            const withoutDollarSign = element.replace("$", "")
            return parseInt(withoutDollarSign, 10)
        })
        const smallestPrice = Math.min(...justNumbers)
        const smallestPriceIdx = justNumbers.indexOf(smallestPrice)
        const specificRemoveButton = this.removeFromBasketButton.nth(smallestPriceIdx)
        await specificRemoveButton.waitFor()
        await specificRemoveButton.click()
        await expect(this.basketCards).toHaveCount(itemsBeforeRemoval - 1)
        //await this.page.pause()
    }


    continueToCheckout = async () => {
        await this.countinueToCheckoutButton.waitFor()
        await this.countinueToCheckoutButton.click()
        await this.page.waitForURL(/\/login/, {timeout: 2000})

    }
}