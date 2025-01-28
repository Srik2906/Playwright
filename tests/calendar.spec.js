import { test, expect } from '@playwright/test';


test('Calendar validation' ,async({page}) => {
const month  = "6"
const date = "15"
const year = "2027"
const expected = [month,date,year]
await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers')
await page.locator('div.react-date-picker__inputGroup').click()
await page.locator('.react-calendar__navigation__label').click()
await page.locator('.react-calendar__navigation__label').click()
await page.getByText(year).click()
await page.locator('.react-calendar__tile.react-calendar__year-view__months__month').nth(Number(month)-1).click()
await page.locator('.react-calendar__month-view__days button').filter({hasText:date}).click()
const results =   page.locator('.react-date-picker__inputGroup input:visible')
const count = await results.count()
for (let i=0;i<count;i++){
    const value = await results.nth(i).getAttribute('value')
    expect(value).toEqual(expected[i])
}


})