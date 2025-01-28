import { test, expect, request } from '@playwright/test';
import APIUtils from '../utils/APIUtils'
const loginPayload = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" }
const fakePayload = {data:[],message:"No Orders"}
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
    const setTokenInLocalStorage = ((value) => {
        window.localStorage.setItem('token', value)
    })
    await page.addInitScript(setTokenInLocalStorage, response.token)
    // Navigate to the login page
    await page.goto('https://rahulshettyacademy.com/client/');
    page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
        async route=>{
            await page.request.fetch(route.request())
            await route.fulfill(
                {
                    
                    path : 'fake.json'
                }
            )
        }
    )
    await page.locator('button[routerLink*="myorders"]').click()
    await expect(page.getByText(" You have No Orders to show at this time.")).toBeVisible()
    
})   
