class OrderConfirmationPage {
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
        let orderId = await this.orderIdLabel.textContent();
        return orderId.split('|')[1].trim().split('|')[0].trim();
    }

    async goToMyOrders() {
        await this.myOrdersLink.click();
    }
}

module.exports = {OrderConfirmationPage};