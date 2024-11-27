import { expect } from "@playwright/test";

export class PaymentPage {
    constructor(page) {
        this.page = page
        this.discountCode = page.frameLocator('.active-discount-container').locator('[data-qa="discount-code"]')
        this.discountCodeInput = page.locator('[data-qa="discount-code-input"]')
        this.submitDiscountButton = page.locator('[data-qa="submit-discount-button"]')
        this.discountActivatedMessage = page.locator('[data-qa="discount-active-message"]')
        this.totalPrice = page.locator('[data-qa="total-value"]')
        this.totalPriceWithDiscount = page.locator('[data-qa="total-with-discount-value"]')

        this.creditCardOwnerInput = page.locator('[data-qa="credit-card-owner"]')
        this.creditCardNumberInput = page.locator('[data-qa="credit-card-number"]')
        this.validUntilInput = page.locator('[data-qa="valid-until"]')
        this.creditCardCVCinput = page.locator('[data-qa="credit-card-cvc"]')
        this.payButton = page.locator('[data-qa="pay-button"]')
    
    }

    activateDiscount = async () => {
        await this.discountCode.waitFor()
        const code = await this.discountCode.innerText()
        await this.discountCodeInput.waitFor()
        await this.discountCodeInput.fill(code)
        await expect(this.discountCodeInput).toHaveValue(code)

        await expect(this.discountActivatedMessage).toBeHidden()
        await expect(this.totalPriceWithDiscount).toBeHidden()
        
        await this.submitDiscountButton.waitFor()
        await this.submitDiscountButton.click()
        await expect(this.discountActivatedMessage).toBeVisible()
        expect(await this.discountActivatedMessage.innerText()).toBe("Discount activated!")

        await this.totalPriceWithDiscount.waitFor()
        const totalPriceValueAsText = await this.totalPrice.innerText()
        const extractNumberTotalPrice = await totalPriceValueAsText.split("$")
        const onlyNumberTotalPrice = parseInt((extractNumberTotalPrice[0]), 10)

        const discountPriceValueAsText = await this.totalPriceWithDiscount.innerText()
        const extractNumberDiscountPrice = await discountPriceValueAsText.split("$")
        const onlyNumberDiscountPrice = parseInt((extractNumberDiscountPrice[0]), 10)

        expect(onlyNumberDiscountPrice).toBeLessThan(onlyNumberTotalPrice)
      
    }

    fillPaymentdetails = async (paymentDetailsData) => {
        await this.creditCardOwnerInput.waitFor()
        await this.creditCardOwnerInput.fill(paymentDetailsData.creditCardOwner)
        await this.creditCardNumberInput.fill(paymentDetailsData.creditCardNumber)
        await this.validUntilInput.fill(paymentDetailsData.validUntil)
        await this.creditCardCVCinput.fill(paymentDetailsData.creditCardCVC)

    }

    payForOrder = async () => {
        await this.payButton.waitFor()
        await this.payButton.click()

        await this.page.waitForURL(/\/thank-you/, {timeout: 2000})

        expect(await this.page.locator("h1").innerText()).toBe("Thank you for shopping with us!")

    }
}