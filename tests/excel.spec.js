import { test, expect } from '@playwright/test';
import writeExcel from '../utils/ExcelUtils';
let filePath
test('Excel upload validation' ,async ({page}) =>{
    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html')
    const downloadPromose =  page.waitForEvent('download')
    await page.getByRole('button',{name:'Download'}).click()
    await downloadPromose
    await writeExcel(filePath='/Users/srikanthkrishnan/Downloads/download.xlsx')
    await page.locator('#fileinput').setInputFiles('/Users/srikanthkrishnan/Downloads/download.xlsx')
    await expect(page.locator('#row-0').filter({has: page.getByRole('cell', { name: '350' })})).toBeVisible()


})