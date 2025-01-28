import { test, expect, request } from '@playwright/test';
import APIUtils from '../utils/APIUtils';
const loginPayload = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" }

let product_id
let response 

test.beforeAll(async () => {
    const apiContext = await request.newContext()
    const apiUtils = new APIUtils(apiContext,loginPayload)
    product_id = await apiUtils.getProductID("Banarsi Saree")
    response = await apiUtils.getOrderID(product_id)
    
})


test('Client app login', async ({ page }) => {

    const table = page.locator('tbody')
    
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    },response.token)
    // Navigate to the login page
    await page.goto('https://rahulshettyacademy.com/client/'); // Replace with the actual login URL
    
    await page.locator('button[routerLink*="myorders"]').click()
    await table.waitFor()
    const order_count = await table.locator('tr').count()
    for (let i = 0; i < order_count; i++) {
        const row_order_id = await table.locator('tr').locator('th').nth(i).textContent()
        if (response.order_id.includes(row_order_id)) {
            await table.locator('tr td button').nth(i).first().click()
            break
        }

    }

    await expect(page.locator('div.col-text')).toHaveText(response.order_id)

})   
