import { type Expect, type Locator, type Page } from '@playwright/test';

export class OrderConfirmationPage {
    page: Page;
    expect: Expect;
    heroPrimaryMessage: Locator;
    orderIdLabel:Locator;
    myOrdersLink: Locator;

    constructor(page, expect) {
        this.page = page;
        this.expect = expect;
        this.heroPrimaryMessage = page.getByRole('table').getByRole('heading');
        this.orderIdLabel = page.getByRole('table')
                                .locator('label')
                                .last();
        this.myOrdersLink = page.getByRole('button', {name: 'ORDERS'});
    }

    async validateThankYouMessage() {
        return await this.expect(this.heroPrimaryMessage).toContainText(/\sthankyou for the order.\s/i);
    }

    async captureOrderId() {
        // bad type usage. NEED TO CHANGE
        let orderId: any = await this.orderIdLabel.textContent();
        
        return orderId.split('|')[1].trim().split('|')[0].trim();
    }

    async goToMyOrders() {
        await this.myOrdersLink.click();
    }
}
