import { test, expect } from '@playwright/test';
let webContext,page

test.beforeAll( async({browser}) => {
    const context = await browser.newContext()
    page = await context.newPage()
    await page.goto('https://rahulshettyacademy.com/client/'); // Replace with the actual login URL
    await page.getByPlaceholder('email@example.com').fill('anshika@gmail.com')
    await page.getByPlaceholder('enter your passsword').fill('Iamking@000')
    await page.getByRole('button',{name:'Login'}).click()
    await page.waitForLoadState('networkidle')
    webContext = await browser.newContext({storageState:'state.json'})

})

test('Client app login', async ({  }) => {
    // Navigate to the login page
    page = await webContext.newPage()
    await page.goto('https://rahulshettyacademy.com/client/')
    const products = page.locator('.card-body')
    const cartSection = page.locator('div.cartSection h3')
    const table = page.locator('tbody')
    const tiles = await page.locator('.card-body b').allTextContents()
    console.log(tiles)
    const count = await products.count()
    console.log(count)
    for (let i = 0; i < count; i++) {
        if (await products.nth(i).locator('b').textContent() === "Banarsi Saree") {
            await products.nth(i).locator('button:has-text(" Add To Cart")').click()
        }
    }
    await page.locator('button[routerLink*="cart"]').click()
    expect(await cartSection.textContent() === 'Banarsi Saree')
    await page.locator('button[type="button"]:has-text("Checkout")').click()
    const expiryDropdown = page.locator('select.input.ddl').last()
    await expiryDropdown.selectOption('28')
    await page.locator('div.form__cc div.row div[class="field"] input[class="input txt"]').fill('Srikanth')
    await page.locator('input[placeholder*="Country"]').pressSequentially('ind')
    await page.locator('section.ta-results').waitFor()
    const countryDropdown = page.locator('section.ta-results button')
    const countryCount = await countryDropdown.count()
    for (let i = 0; i < countryCount; i++) {
        if (await countryDropdown.nth(i).locator('span').textContent() === " India") {
            await countryDropdown.nth(i).click()
            break
        }

    }
    await page.locator('a.btnn.action__submit').click()
    await expect(page.locator('h1.hero-primary')).toHaveText('Thankyou for the order.')
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
 
