import { expect } from "@playwright/test";

export class DeliveryDetails {
    constructor(page) {
        this.page = page
        this.firstNameInput = page.locator('[data-qa="delivery-first-name"]');
        this.lastNameInput = page.locator('[data-qa="delivery-last-name"]');
        this.streetInput = page.locator('[data-qa="delivery-address-street"]')
        this.postCodeInput = page.locator('[data-qa="delivery-postcode"]')
        this.cityInput = page.locator('[data-qa="delivery-city"]')
        this.countryDropdown = page.locator('[data-qa="country-dropdown"]')
        this.saveAddressButton = page.locator('[data-qa="save-address-button"]')

        this.savedAddressesList = page.locator('[data-qa="saved-address-container"]')

        this.savedAddressFirstName = page.locator('[data-qa="saved-address-firstName"]')
        this.savedAddressLastName = page.locator('[data-qa="saved-address-lastName"]')
        this.savedAddressStreetName = page.locator('[data-qa="saved-address-street"]')
        this.savedAddressPostcode = page.locator('[data-qa="saved-address-postcode"]')
        this.savedAddressCountry = page.locator('[data-qa="saved-address-country"]')

        this.continueToPaymentButton = page.locator('[data-qa="continue-to-payment-button"]')
    
    }

    fillDetails = async (userAddress) => {
        await this.firstNameInput.waitFor()
        await this.firstNameInput.fill(userAddress.firstName)
        await this.lastNameInput.fill(userAddress.lastName)
        await this.streetInput.fill(userAddress.street)
        await this.postCodeInput.fill(userAddress.postCode)
        await this.cityInput.fill(userAddress.city)
        await this.countryDropdown.selectOption(userAddress.country)
        
    }

    saveDetails = async (userAddress) => {

        const savedAdressesCountBefore = await this.savedAddressesList.count()
        await this.saveAddressButton.waitFor()
        await this.saveAddressButton.click()
        await expect(this.savedAddressesList).toHaveCount(savedAdressesCountBefore + 1)
        
        await this.savedAddressFirstName.first().waitFor()
        expect(await this.savedAddressFirstName.first().innerText()).toBe(await this.firstNameInput.inputValue())
        expect(await this.savedAddressLastName.first().innerText()).toBe(await this.lastNameInput.inputValue())
        expect(await this.savedAddressStreetName.first().innerText()).toBe(await this.streetInput.inputValue())
        expect(await this.savedAddressPostcode.first().innerText()).toBe(await this.postCodeInput.inputValue())
        expect(await this.savedAddressCountry.first().innerText()).toBe(await this.countryDropdown.inputValue())
        
    }

    continueToPayment = async () => {
        await this.continueToPaymentButton.waitFor()
        await this.continueToPaymentButton.click()
        await this.page.waitForURL(/\/payment/, {timeout: 2000})
      
    }
}