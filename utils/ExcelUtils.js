import ExcelJS from 'exceljs'


async function writeExcel(filePath) {
    let output = { row: null, column: null }
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.readFile(filePath)
    const worksheet = workbook.worksheets[0]
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, columnNumber) => {
            if (cell.value === "Mango") {
                output.row = rowNumber
                output.column = columnNumber + 2

            }
        })


    })
    if (output.row !== null && output.column !== null) {
        const cell = worksheet.getCell(output.row, output.column)
        cell.value = "350"
        await workbook.xlsx.writeFile(filePath)


    }
}

export default writeExcel
