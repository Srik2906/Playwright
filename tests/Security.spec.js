import { test, expect, request } from '@playwright/test';
import APIUtils from '../utils/APIUtils';
const loginPayload = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" }

let response



test('Security test', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client/'); // Replace with the actual login URL
    await page.locator('#userEmail').fill('anshika@gmail.com')
    await page.locator('#userPassword').fill('Iamking@000')
    await page.locator('#login').click()
    await page.waitForLoadState('networkidle')
    await page.locator('button[routerLink*="myorders"]').click()
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',
         async route => {
            await route.continue({url:'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=67951f9ee2b5443b1f36420b'})
        }
    )

    await page.locator('td button.btn').first().click()
    await expect(page.locator('p.blink_me').getByText('You are not authorize to view this order')).toBeVisible()

})