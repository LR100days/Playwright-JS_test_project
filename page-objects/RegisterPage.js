export class RegisterPage {
    constructor(page) {
        this.page = page
        this.emailInput = page.getByPlaceholder('E-Mail');
        this.passwordInput = page.getByPlaceholder('Password')
        this.registerButton = page.locator('[type="submit"]')

    }

    signUpAsNewUser = async (email, password) => {
        await this.emailInput.waitFor()
        await this.emailInput.fill(email)
        await this.passwordInput.fill(password)
        await this.registerButton.click()
        await this.page.waitForURL(/\/delivery-details/, {timeout: 2000})
        
    }
}