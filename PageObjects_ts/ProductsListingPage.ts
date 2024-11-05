import { type Expect, type Locator, type Page } from '@playwright/test';

export class ProductsListingPage {
    page: Page;
    expect: Expect;
    productDescriptions: Locator;
    cartBtn:Locator;

    constructor(page, expect) {
        this.page = page;
        this.expect = expect;
        this.productDescriptions = page.locator('div.card-body');
        this.cartBtn = page.getByRole('button', {name: /.+cart.+/i});
    }

    async getProductPrice(requriedProduct: string) {
        const price = await this.productDescriptions
            .filter({ hasText:  requriedProduct})
            .locator('div').locator('div')
            .textContent();
        return price;
    }

    async addProductToCart(requriedProduct: string) {
        await this.productDescriptions
            .filter({ hasText:  requriedProduct})
            .getByRole('button').filter({ hasText: 'add to cart'})
            .click();
    }

    async goToCartPage() {
        await this.cartBtn.click();
    }
}