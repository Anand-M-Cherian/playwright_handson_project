class PaymentPage {
    constructor(page, expect) {
        this.page = page;
        this.expect = expect;
        this.countryTextbox = page.getByPlaceholder('Select Country');
        this.dropDownCountryList = page.locator('section.ta-results');
        this.cvvTextBox = page.locator('div.field')
                            .filter({hasText: 'CVV Code'})
                            .getByRole('textbox');
        this.nameOnCardTextbox = page.locator('div.field')
                                    .filter({hasText: 'Name on Card'})
                                    .getByRole('textbox');
        this.applyCouponTextbox = page.locator('div.field')
                                    .filter({hasText: 'Apply Coupon'})
                                    .getByRole('textbox');
        this.applyCouponBtn = page.getByRole('button', {name: 'Apply Coupon'});
        this.couponAppliedMessage = page.locator('div.field')
                                            .filter({hasText: 'Apply Coupon'})
                                            .getByRole('paragraph');
        this.userEmail = page.locator('div.user__name')
                            .locator('label');
        this.placeOrderBtn = page.locator('div.actions')
                                .locator('a');
    }

    async selectCountry(country) {
        const countryRegex = new RegExp('^\\s' + country + '$', 'i');
        await this.countryTextbox.pressSequentially(country, {delay: 500});
        await this.dropDownCountryList
            .getByRole('button')
            .filter({hasText: countryRegex})
            .click({delay: 1000});
    }

    async validateSelectedCOuntry(country) {
        return await this.expect(this.countryTextbox).toHaveValue(country);
    }

    async enterCVV(cvv) {
        await this.cvvTextBox.fill(cvv);
    }

    async enterNameOnCard(name) {
        await this.nameOnCardTextbox.fill(name);
    }

    async applyCoupon(couponCode) {
        await this.applyCouponTextbox.fill(couponCode);
        await this.applyCouponBtn.click();
    }

    async validateCouponApplied() {
        return await this.expect(this.couponAppliedMessage).toContainText('* Coupon Applied');
    }

    async validateEmailId(emailId) {
        return await this.expect(this.userEmail).toContainText(emailId);
    }

    async placeOrder() {
        await this.placeOrderBtn.click();
    }
}

module.exports = {PaymentPage};