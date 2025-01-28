import { test, expect } from '@playwright/test';
import POManager from '../PageObjects/POManager';
import testData from '../utils/testData/ecommerce.json'



let pomanager, loginPage, cartPage, dashboardPage, orderPage, order_id


testData.forEach(testData => {
    
        test.beforeEach(async ({ page }) => {
            pomanager = new POManager(page)
            loginPage = pomanager.getLoginPage()
            dashboardPage = pomanager.getDashboardPage()
            cartPage = pomanager.getCartPage()
            orderPage = pomanager.getOrderPage()
            await loginPage.login(testData.username, testData.password)
        })





        test(`E-commerce flow for ${testData.productName} `, async ({ page }) => {
            await dashboardPage.addToCart(testData.productName)
            await cartPage.goToCart()
            expect(await page.locator('div.cartSection h3').textContent() === testData.productName)

            await cartPage.checkout()
            await cartPage.placeOrder()
            await expect(page.locator('h1.hero-primary')).toHaveText('Thankyou for the order.')

            order_id = await orderPage.getOrderID()
            await orderPage.goToOrders()
            await orderPage.viewLatesOrder(order_id)
            await expect(page.locator('div.col-text')).toHaveText(order_id)


        })
    
})





