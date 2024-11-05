class CartPage{
    constructor(page, expect) {
        this.page = page;
        this.expect = expect;
        this.checkkoutBtn = page.getByRole('button', {name: 'Checkout'});
    }

    async validateProductPrice(requriedProduct, expectedPrice) {
        return await this.expect(this.page
            .getByRole('list')
            .filter({ hasText:  requriedProduct})
            .locator('div.cartSection')
            .locator('p').nth(1)
        ).toContainText('MRP ' + expectedPrice);
    }

    async checkout() {
        this.checkkoutBtn.click();
    }
}

module.exports = {CartPage};