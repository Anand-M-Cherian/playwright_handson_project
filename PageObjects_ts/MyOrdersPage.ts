import { type Expect, type Locator, type Page } from '@playwright/test';

export class MyOrdersPage {
    page: Page;
    expect: Expect;

    constructor(page, expect) {
        this.page = page;
        this.expect = expect;
    }

    async viewOrder(orderId: string) {
        await this.page.getByRole('table')
            .getByRole('row')
            .filter({hasText: orderId})
            .getByRole('button', {name: 'View'})
            .click();
    }
}