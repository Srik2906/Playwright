import test, { expect } from '@playwright/test'

test('First playwright test', async ({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://rahulshettyacademy.com/loginpagePractise")
    console.log(await page.title())
    await page.locator('#username').fill('rahulshettyacademy')
    await page.locator('#password').fill('learning')
    await page.locator('#terms').check()
    await expect(page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck()
    await expect(page.locator('#terms')).not.toBeChecked()

    await page.locator('#terms').uncheck()

    await page.locator('#signInBtn').click()
    // try {
    //     let errorMessage = await page.locator("[style*='block']").textContent()
    //     expect(errorMessage).toContain('Incorrect')
    // }
    // catch (error) {
    //     console.warn('Error locating or verifying the error message:', error.message);
    // }

    await page.locator('h4.card-title a').first().waitFor()
    let productList = await page.locator('h4.card-title a').allTextContents()
    console.log(productList)


})

test('second playwright test', async ({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://rahulshettyacademy.com/loginpagePractise")
    console.log(await page.title())
    const documentLink =  page.locator('.blinkingText').first()

    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'),
            documentLink.click()
        ])
    const newpageTitle = await newPage.title()
    console.log(newpageTitle)
    const text = await newPage.locator(".red").textContent()
    const arrayText = text.split('@')[1] 
    const username = arrayText.split(" ")[0]
    console.log(username)
    await page.locator('#username').fill(username)
    await page.pause()
    
   
})