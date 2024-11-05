class OrderSummaryPage {
    constructor(page, expect) {
        this.page = page;
        this.expect = expect;
    }

    async validateOrderId(orderId) {
        return await this.expect(this.page.locator('div')
            .filter({hasText: 'Order Id'})
            .locator('div.-main')
        ).toContainText(orderId);
    }
}

module.exports = {OrderSummaryPage};