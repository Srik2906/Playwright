import { expect } from "@playwright/test"
class CartPage {
    constructor(page) {
        this.page = page
        this.cartButton = page.locator('button[routerLink*="cart"]')
        this.cartSection = page.locator('div.cartSection h3')
        this.checkoutButton = page.locator('button[type="button"]:has-text("Checkout")')
        this.expiryDrodown = page.locator('select.input.ddl').last()
        this.nameOnCard = page.locator('div.form__cc div.row div[class="field"] input[class="input txt"]')
        this.countrySearch = page.locator('input[placeholder*="Country"]')
        this.sectionResults = page.locator('section.ta-results')
        this.countryDropdown = page.locator('section.ta-results button')
        this.placeOrderButton = page.locator('a.btnn.action__submit')
    }

    async goToCart() {
        await this.cartButton.click()
        


    }

    async checkout() {
        await this.checkoutButton.click()
    }

    async placeOrder() {
        await this.expiryDrodown.selectOption('28')
        await this.nameOnCard.fill('Srikanth')
        await this.countrySearch.pressSequentially('ind')
        await this.sectionResults.waitFor()
        const countryCount = await this.countryDropdown.count()
        for (let i = 0; i < countryCount; i++) {
            if (await this.countryDropdown.nth(i).locator('span').textContent() === " India") {
                await this.countryDropdown.nth(i).click()
                break
            }

        }
        await this.placeOrderButton.click()
       
    }
}

export default CartPage