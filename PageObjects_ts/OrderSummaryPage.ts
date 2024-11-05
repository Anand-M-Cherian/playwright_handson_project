import { type Expect, type Locator, type Page } from '@playwright/test';

export class OrderSummaryPage {
    page: Page;
    expect: Expect;

    constructor(page, expect) {
        this.page = page;
        this.expect = expect;
    }

    async validateOrderId(orderId: string) {
        return await this.expect(this.page.locator('div')
            .filter({hasText: 'Order Id'})
            .locator('div.-main')
        ).toContainText(orderId);
    }
}
