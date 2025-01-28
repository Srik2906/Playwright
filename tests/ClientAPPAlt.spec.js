import { test, expect } from '@playwright/test';
import exp from 'constants';

test('Client app login', async ({ page }) => {
    // Navigate to the login page
    const products = page.locator('.card-body')
    const cartSection = page.locator('div.cartSection h3')
    const table = page.locator('tbody')
    console.log(products)
    await page.goto('https://rahulshettyacademy.com/client/'); // Replace with the actual login URL
    await page.getByPlaceholder('email@example.com').fill('anshika@gmail.com')
    await page.getByPlaceholder('enter your passsword').fill('Iamking@000')
    await page.getByRole('button',{name:'Login'}).click()
    await page.waitForLoadState('networkidle')
    const tiles = await page.locator('.card-body b').allTextContents()
    console.log(tiles)
    const count = await products.count()
    console.log(count)
    await products.filter({hasText:"Banarsi Saree"}).getByRole('button',{name:" Add To Cart"}).click()
    await page.getByRole('listitem').getByRole('button',{name:"Cart"}).click()
    await page.getByText('Bararasi Saree').isVisible()
    await page.getByRole('button',{name:"Checkout"}).click()
    const expiryDropdown = page.locator('select.input.ddl').last()
    await expiryDropdown.selectOption('28')
    await page.locator('div.form__cc div.row div[class="field"] input[class="input txt"]').fill('Srikanth')
    await page.getByPlaceholder('Select Country').pressSequentially('ind')
    await page.getByRole('button',{name:"India"}).nth(1).click()
    await page.getByText('Place Order ').click()
    await expect(page.getByText('Thankyou for the order.')).toBeVisible()
    let order_id = await page.locator('label.ng-star-inserted').textContent()
    order_id = order_id.split('| ')
    order_id = order_id[1]
    console.log(order_id)
    await page.locator('button[routerLink*="myorders"]').click()
    await table.waitFor()
    const order_count = await table.locator('tr').count()
    for (let i = 0; i < order_count; i++) {
        const row_order_id = await table.locator('tr').locator('th').nth(i).textContent()
        if (order_id.includes(row_order_id)) {
            await table.locator('tr td button').nth(i).first().click()
            break
        }

    }

   await expect(page.locator('div.col-text')).toHaveText(order_id)
    
})   
