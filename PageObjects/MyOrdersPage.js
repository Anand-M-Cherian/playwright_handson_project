class MyOrdersPage {
    constructor(page, expect) {
        this.page = page;
        this.expect = expect;
    }

    async viewOrder(orderId) {
        await this.page.getByRole('table')
            .getByRole('row')
            .filter({hasText: orderId})
            .getByRole('button', {name: 'View'})
            .click();
    }
}

module.exports = {MyOrdersPage};