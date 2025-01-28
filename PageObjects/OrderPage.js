class OrderPage {
    constructor(page) {
        this.page = page
        this.orderIDText = page.locator('label.ng-star-inserted')
        this.orderButton = page.locator('button[routerLink*="myorders"]')
        this.table = page.locator('tbody')
    }


    async getOrderID() {
        let order_id = await this.orderIDText.textContent()
        order_id = order_id.split('| ')
        order_id = order_id[1]
        return order_id
    }

    async goToOrders() {
        await this.orderButton.click()
    }

    async viewLatesOrder(order_id) {
        await this.table.waitFor()
        const order_count = await this.table.locator('tr').count()
        for (let i = 0; i < order_count; i++) {
            const row_order_id = await this.table.locator('tr').locator('th').nth(i).textContent()
            if (order_id.includes(row_order_id)) {
                await this.table.locator('tr td button').nth(i).first().click()
                break
            }

        }

    


    }
}
export default OrderPage