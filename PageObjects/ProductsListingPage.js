class ProductsListingPage {
    constructor(page, expect) {
        this.page = page;
        this.expect = expect;
        this.productDescriptions = page.locator('div.card-body');
        this.cartBtn = page.getByRole('button', {name: /.+cart.+/i});
    }

    async getProductPrice(requriedProduct) {
        const price = await this.productDescriptions
            .filter({ hasText:  requriedProduct})
            .locator('div').locator('div')
            .textContent();
        return price;
    }

    async addProductToCart(requriedProduct) {
        await this.productDescriptions
            .filter({ hasText:  requriedProduct})
            .getByRole('button').filter({ hasText: 'add to cart'})
            .click();
    }

    async goToCartPage() {
        await this.cartBtn.click();
    }
}

module.exports = {ProductsListingPage};