const ExcelJs = require('exceljs');
const { test, expect } = require('@playwright/test');

async function readExcelFile(filepath) {
    const workbook = new ExcelJs.Workbook();
    return await workbook.xlsx.readFile(filepath);
};

function getCellLocation(worksheet, search_keyword) {
    let cell_coordinates = {
        row: -1,
        column: -1
    };

    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === search_keyword) {
                cell_coordinates.row = rowNumber;
                cell_coordinates.column = colNumber;
            }
        })
    })

    return cell_coordinates;
}

function getCellContent(worksheet, cell_coordinates) {
    const cell = worksheet.getCell(cell_coordinates.row, cell_coordinates.column);
    return cell.value
};

async function updateCell(workbook, worksheet, cell_coordinates, content, filepath) {
    const cell = worksheet.getCell(cell_coordinates.row, cell_coordinates.column);
    cell.value = content;

    // save workbook
    await workbook.xlsx.writeFile(filepath);
};

function printSheet(worksheet) {
    worksheet.eachRow((row, rowNumber) => {
        let rowContent = '\n';
        row.eachCell((cell, colNumber) => {
            rowContent = rowContent + cell.value + '\t\t|' 
        })
        console.log(rowContent);
    })
}

test('Download excel, change content, upload excel and validate on webpage', async({page}) => {
    const search_keyword = 'Papaya';
    const updated_price = '799';
    
    // downloading excel file
    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', {name: 'Download'}).click();
    const download = await downloadPromise;
    await download.saveAs('resources/fruit_data.xlsx');

    // updating the price
    const filepath = 'resources/fruit_data.xlsx';
    const workbook = await readExcelFile(filepath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const cell_coordinates = getCellLocation(worksheet, search_keyword);
    cell_coordinates.column += 2;
    await updateCell(workbook, worksheet, cell_coordinates, updated_price, filepath);

    // uploading the file
    // await page.locator('input#fileinput').click();
    await page.locator('input#fileinput').setInputFiles(filepath);

    // validating the changes
    const updated_price_locator = page.getByRole('row')
        .filter({hasText: search_keyword})
        .locator('#cell-4-undefined');
    await expect(updated_price_locator).toContainText(updated_price);
});