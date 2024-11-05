const ExcelJs = require('exceljs');
const { test, expect } = require('@playwright/test');

test('Learn how to print all cells of a sheet', async ({page}) => {
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile('resources/download.xlsx');
    const worksheet = workbook.getWorksheet('Sheet1');
    worksheet.eachRow((row, rowNumber) => {
        let rowContent = '\n';
        row.eachCell((cell, colNumber) => {
            rowContent = rowContent + cell.value + '\t\t|' 
        })
        console.log(rowContent);
    })
});

test('Get the row and column number of a Apple', async ({page}) => {
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile('resources/download.xlsx');
    const worksheet = workbook.getWorksheet('Sheet1');
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === 'Apple') {
                console.log('row : ' + rowNumber + '\n' + 'col : ' + colNumber);
            }
        })
    })
});

test('Change cell contents of Apple to Pineapple', async ({page}) => {
    let cell_coordinates = {
        row: -1,
        column: -1
    };

    // find the cell
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile('resources/download.xlsx');
    const worksheet = workbook.getWorksheet('Sheet1');
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === 'Mango') {
                cell_coordinates.row = rowNumber;
                cell_coordinates.column = colNumber;
            }
        })
    })
    
    // throw error if cell not found
    if (cell_coordinates.row === -1 || cell_coordinates.column === -1) {
        throw new Error('Cell not found');
    }

    // update the cell
    const cell = worksheet.getCell(cell_coordinates.row, cell_coordinates.column);
    cell.value = 'Cucumber New';

    // save workbook
    await workbook.xlsx.writeFile('resources/download.xlsx');
});

test('Increase price of Kiwi by 100', async ({page}) => {
    let cell_coordinates = {
        row: -1,
        column: -1
    };

    // find the cell
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile('resources/download.xlsx');
    const worksheet = workbook.getWorksheet('Sheet1');
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === 'Kivi') {
                cell_coordinates.row = rowNumber;
                cell_coordinates.column = colNumber;
            }
        })
    })
    
    // throw error if cell not found
    if (cell_coordinates.row === -1 || cell_coordinates.column === -1) {
        throw new Error('Cell not found');
    }

    // update the cell
    const cell = worksheet.getCell(cell_coordinates.row, cell_coordinates.column + 2);
    cell.value += 100;

    // save workbook
    await workbook.xlsx.writeFile('resources/download.xlsx');
});