class DashboardPage {
    constructor(page) {
        this.page = page
        this.allProducts = page.locator('.card-body')
        


    }

    async addToCart(productName) {
        await this.page.waitForLoadState('networkidle')
        const count = await this.allProducts.count()
        console.log(count)
        for (let i = 0; i < count; i++) {
            if (await this.allProducts.nth(i).locator('b').textContent() === productName) {
                await this.allProducts.nth(i).locator('button:has-text(" Add To Cart")').click()
            }
        }
    }


}



export default DashboardPage